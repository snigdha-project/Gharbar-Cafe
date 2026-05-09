// Lightweight Resend integration via fetch (no SDK dependency).
//
// Set in .env.local:
//   RESEND_API_KEY=re_xxx
//   EMAIL_FROM="Ghar Bar Cafe <bookings@yourdomain>"
//   ADMIN_EMAIL=bookgharbar@gmail.com
//
// If RESEND_API_KEY is missing, sendEmail returns { ok: false, skipped: true }
// and logs a warning — the booking still succeeds.

export type EmailResult =
  | { ok: true; id: string }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped: false; reason: string };

export async function sendEmail(args: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Ghar Bar Cafe <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(
      "[email] RESEND_API_KEY missing — skipping send. Subject:",
      args.subject
    );
    return { ok: false, skipped: true, reason: "RESEND_API_KEY not set" };
  }

  const body = {
    from,
    to: Array.isArray(args.to) ? args.to : [args.to],
    subject: args.subject,
    html: args.html,
    reply_to: args.replyTo,
  };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[email] Resend error", res.status, text);
      return { ok: false, skipped: false, reason: text };
    }
    const data = (await res.json()) as { id?: string };
    return { ok: true, id: data.id ?? "unknown" };
  } catch (err) {
    const reason = err instanceof Error ? err.message : "unknown error";
    console.error("[email] send failed", reason);
    return { ok: false, skipped: false, reason };
  }
}

/** Tiny escape so booking data can't break the HTML. */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
