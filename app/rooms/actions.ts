"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import {
  MAX_GUESTS_PER_ROOM,
  PLANS,
  ROOM_TYPES,
  fromISODate,
  maxGuestsFor,
  maxRoomsFor,
  quoteStay,
  formatINR,
  type Plan,
  type RoomType,
} from "@/lib/rooms";
import { escapeHtml, sendEmail } from "@/lib/email";
import { submitToZohoForm } from "@/lib/zoho";

export type BookingState = {
  ok?: boolean;
  error?: string;
  bookingId?: string;
};

export async function createBookingAction(
  _prev: BookingState | undefined,
  formData: FormData
): Promise<BookingState> {
  const guest_name = String(formData.get("guest_name") ?? "").trim();
  const guest_email = String(formData.get("guest_email") ?? "").trim();
  const guest_phone = String(formData.get("guest_phone") ?? "").trim();
  const room_type = String(formData.get("room_type") ?? "") as RoomType;
  const plan = String(formData.get("plan") ?? "") as Plan;
  const check_in = String(formData.get("check_in") ?? "");
  const check_out = String(formData.get("check_out") ?? "");
  const guests = Number(formData.get("guests") ?? 2);
  const rooms = Number(formData.get("rooms") ?? 1);
  const special_requests =
    String(formData.get("special_requests") ?? "").trim() || null;

  // Validate
  if (!guest_name) return { error: "Please enter your name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(guest_email)) {
    return { error: "Please enter a valid email." };
  }
  if (!guest_phone) return { error: "Please enter your phone number." };
  if (!ROOM_TYPES.some((r) => r.id === room_type)) {
    return { error: "Choose a valid room type." };
  }
  if (!PLANS.some((p) => p.id === plan)) {
    return { error: "Choose a valid plan." };
  }
  const ci = fromISODate(check_in);
  const co = fromISODate(check_out);
  if (!ci || !co) return { error: "Pick valid check-in / check-out dates." };
  if (co.getTime() <= ci.getTime()) {
    return { error: "Check-out must be after check-in." };
  }
  // Disallow past check-ins (clamp at today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (ci.getTime() < today.getTime()) {
    return { error: "Check-in date can't be in the past." };
  }
  const roomCap = maxRoomsFor(room_type);
  if (!Number.isFinite(rooms) || rooms < 1 || rooms > roomCap) {
    return {
      error: `Room count must be between 1 and ${roomCap} for ${room_type} rooms.`,
    };
  }
  const guestCap = maxGuestsFor(room_type, rooms);
  if (!Number.isFinite(guests) || guests < 1 || guests > guestCap) {
    const perRoom = MAX_GUESTS_PER_ROOM[room_type];
    return {
      error:
        rooms > 1
          ? `Guests must be between 1 and ${guestCap} (max ${perRoom} per ${room_type} room).`
          : `Guests must be between 1 and ${perRoom} for a ${room_type} room.`,
    };
  }

  const quote = quoteStay(ci, co, room_type, plan, rooms);
  if (!quote) return { error: "Could not calculate price for these dates." };

  // Insert
  const { data: inserted, error: insertErr } = await supabase
    .from("bookings")
    .insert({
      guest_name,
      guest_email,
      guest_phone: guest_phone || null,
      room_type,
      plan,
      check_in,
      check_out,
      guests,
      rooms,
      total_amount: quote.total,
      pricing_breakdown: quote.breakdown,
      special_requests,
      status: "pending",
    })
    .select("id")
    .single();

  if (insertErr) {
    return { error: `Could not save booking: ${insertErr.message}` };
  }

  const bookingId: string = inserted?.id ?? "";

  // Fire-and-forget emails (don't block booking save on email failure)
  const adminEmail =
    process.env.ADMIN_EMAIL ?? "bookgharbar@gmail.com";

  const planLabel =
    PLANS.find((p) => p.id === plan)?.label ?? plan.toUpperCase();
  const roomLabel =
    ROOM_TYPES.find((r) => r.id === room_type)?.label ?? room_type;

  const userHtml = renderBookingEmail({
    title: "Your booking request is received",
    intro: `Dear ${escapeHtml(guest_name)}, thank you for booking with Ghar Bar Cafe. Our team will confirm shortly. Booking reference: <strong>${escapeHtml(bookingId.slice(0, 8))}</strong>.`,
    guestName: guest_name,
    guestEmail: guest_email,
    guestPhone: guest_phone,
    roomLabel,
    planLabel,
    checkIn: check_in,
    checkOut: check_out,
    nights: quote.nights,
    rooms,
    guests,
    total: quote.total,
    specialRequests: special_requests,
  });

  const adminHtml = renderBookingEmail({
    title: "🛎  New booking received",
    intro: `A new booking request was submitted on the website. Reference: <strong>${escapeHtml(bookingId.slice(0, 8))}</strong>.`,
    guestName: guest_name,
    guestEmail: guest_email,
    guestPhone: guest_phone,
    roomLabel,
    planLabel,
    checkIn: check_in,
    checkOut: check_out,
    nights: quote.nights,
    rooms,
    guests,
    total: quote.total,
    specialRequests: special_requests,
    isAdmin: true,
  });

  await Promise.all([
    sendEmail({
      to: guest_email,
      subject: `Booking received — Ghar Bar Cafe (${check_in} → ${check_out})`,
      html: userHtml,
      replyTo: adminEmail,
    }),
    sendEmail({
      to: adminEmail,
      subject: `New booking · ${guest_name} · ${check_in} → ${check_out}`,
      html: adminHtml,
      replyTo: guest_email,
    }),
    submitToZohoForm({
      guest_name,
      guest_email,
      guest_phone,
      room_type,
      plan,
      check_in,
      check_out,
      rooms,
      guests,
      special_requests,
    }),
  ]);

  revalidatePath("/admin/bookings");

  return { ok: true, bookingId };
}

function renderBookingEmail(p: {
  title: string;
  intro: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomLabel: string;
  planLabel: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: number;
  guests: number;
  total: number;
  specialRequests: string | null;
  isAdmin?: boolean;
}): string {
  const rows = [
    ["Guest", `${escapeHtml(p.guestName)} (${escapeHtml(p.guestEmail)})`],
    p.guestPhone ? ["Phone", escapeHtml(p.guestPhone)] : null,
    ["Room", escapeHtml(p.roomLabel)],
    ["Plan", escapeHtml(p.planLabel)],
    ["Check-in", escapeHtml(p.checkIn)],
    ["Check-out", escapeHtml(p.checkOut)],
    ["Nights", String(p.nights)],
    ["Rooms", String(p.rooms)],
    ["Guests", String(p.guests)],
    ["Total", formatINR(p.total)],
    p.specialRequests
      ? ["Special requests", escapeHtml(p.specialRequests)]
      : null,
  ].filter(Boolean) as [string, string][];

  return `<!doctype html>
<html>
<body style="margin:0;background:#fffaf5;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#fff;border:1px solid #e6a34d33;border-radius:14px;overflow:hidden;">
          <tr>
            <td style="background:#0e0e0e;color:#fff;padding:28px 32px;">
              <p style="margin:0 0 8px 0;color:#e6a34d;text-transform:uppercase;letter-spacing:0.4em;font-size:11px;font-weight:700;">Ghar Bar Cafe</p>
              <h1 style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:600;letter-spacing:0.01em;">${escapeHtml(p.title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;font-size:15px;line-height:1.65;color:#2a2a2a;">
              <p style="margin:0 0 18px 0;">${p.intro}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:8px 0 18px 0;">
                ${rows
                  .map(
                    ([k, v]) => `
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f1eadf;color:#888;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;width:38%;">${k}</td>
                    <td style="padding:10px 0;border-bottom:1px solid #f1eadf;color:#1a1a1a;font-size:15px;">${v}</td>
                  </tr>`
                  )
                  .join("")}
              </table>
              <p style="margin:18px 0 0 0;color:#666;font-size:13px;">
                ${
                  p.isAdmin
                    ? `Open the admin panel at <a href="/admin/bookings" style="color:#a87420;">/admin/bookings</a> to confirm or update this booking.`
                    : `We'll be in touch within a few hours to confirm. For anything urgent, reply to this email or call <a href="tel:+919882788885" style="color:#a87420;">+91 98827 88885</a>.`
                }
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#fffaf5;padding:18px 32px;text-align:center;color:#888;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">
              Ghar Bar Boutique Stay &amp; Cafe · Dharamshala
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
