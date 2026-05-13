// Mirror each booking to the Zoho Forms "Booking" form (free tier).
//
// Setup:
//   In .env.local set
//     ZOHO_FORM_SUBMIT_URL=https://forms.zohopublic.in/bookgharbargm1/form/Booking/formperma/vXQM3xC3Hd7AAc8Qs49lMqpL_cYTse8yIzyTB9riuik/htmlRecords/submit
//
// If the env var is missing, submitToZohoForm is a silent no-op so local dev
// still works. Failures are logged and swallowed — the booking still saves to
// Supabase and emails still send.

import type { Plan, RoomType } from "./rooms";

export type ZohoBookingPayload = {
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  room_type: RoomType;
  plan: Plan;
  check_in: string; // ISO yyyy-mm-dd
  check_out: string; // ISO yyyy-mm-dd
  rooms: number;
  guests: number;
  special_requests: string | null;
};

export type ZohoResult =
  | { ok: true }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped: false; reason: string };

const ROOM_TYPE_LABEL: Record<RoomType, string> = {
  premium: "Premium Room",
  standard: "Standard Room",
};

const PLAN_LABEL: Record<Plan, string> = {
  ep: "Room Only",
  cp: "Room + Breakfast",
  map: "Room + Breakfast + Dinner",
};

export async function submitToZohoForm(
  payload: ZohoBookingPayload
): Promise<ZohoResult> {
  const url = process.env.ZOHO_FORM_SUBMIT_URL;
  if (!url) {
    return { ok: false, skipped: true, reason: "ZOHO_FORM_SUBMIT_URL not set" };
  }

  const fd = new FormData();
  fd.set("zf_referrer_name", "");
  fd.set("zf_redirect_url", "");
  fd.set("zc_gad", "");
  fd.set("Radio", ROOM_TYPE_LABEL[payload.room_type]);
  fd.set("Radio1", PLAN_LABEL[payload.plan]);
  fd.set("Date", isoToZohoDate(payload.check_in));
  fd.set("Date1", isoToZohoDate(payload.check_out));
  fd.set("SingleLine", String(payload.guests));
  fd.set("SingleLine1", String(payload.rooms));
  fd.set("SingleLine2", payload.guest_name);
  fd.set("SingleLine3", payload.guest_phone);
  fd.set("Email", payload.guest_email);
  fd.set("MultiLine", payload.special_requests ?? "");

  try {
    const res = await fetch(url, { method: "POST", body: fd });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[zoho] submit failed", res.status, text.slice(0, 300));
      return { ok: false, skipped: false, reason: `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    const reason = err instanceof Error ? err.message : "unknown error";
    console.error("[zoho] submit threw", reason);
    return { ok: false, skipped: false, reason };
  }
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2026-05-13" → "13-May-2026" (the format the Zoho text Date field expects).
function isoToZohoDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const [, y, mm, dd] = m;
  return `${dd}-${MONTHS[Number(mm) - 1]}-${y}`;
}
