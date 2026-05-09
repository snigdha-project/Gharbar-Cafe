import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated, logoutAction } from "@/app/admin/blog-uploader/actions";
import { supabase } from "@/lib/supabase";
import { formatINR } from "@/lib/rooms";
import BookingsTable, { type AdminBookingRow } from "./BookingsTable";

export const metadata = {
  title: "Bookings · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/blog-uploader");
  }

  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, guest_name, guest_email, guest_phone, room_type, plan, check_in, check_out, guests, rooms, total_amount, status, special_requests, admin_notes"
    )
    .order("created_at", { ascending: false });

  const bookings = (data ?? []) as AdminBookingRow[];

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const totalRevenue = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + Number(b.total_amount || 0), 0);

  return (
    <main className="bg-[#fffaf5] min-h-screen pt-28 pb-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#a87420] uppercase tracking-[0.4em] text-[10px] font-bold mb-2">
              Admin · Bookings
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] leading-tight">
              Reservation desk
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Confirm new requests, leave team notes, and track confirmed
              revenue.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/blog-uploader"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors text-xs uppercase tracking-[0.2em] font-bold"
            >
              Blog studio
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-colors text-xs uppercase tracking-[0.2em] font-bold"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        {/* stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <Stat label="Total bookings" value={String(bookings.length)} />
          <Stat label="Pending review" value={String(pendingCount)} hot={pendingCount > 0} />
          <Stat
            label="Confirmed revenue"
            value={formatINR(totalRevenue)}
            accent
          />
        </div>

        {error && (
          <div className="mb-8 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-900">
            Could not load bookings: {error.message}
          </div>
        )}

        <BookingsTable bookings={bookings} />
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  hot,
  accent,
}: {
  label: string;
  value: string;
  hot?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 border ${
        accent
          ? "bg-[#0e0e0e] text-white border-[#e6a34d]/40"
          : hot
            ? "bg-amber-50 border-amber-200"
            : "bg-white border-gray-200"
      }`}
    >
      <p
        className={`text-[10px] uppercase tracking-[0.3em] font-bold mb-2 ${
          accent ? "text-[#e6a34d]" : "text-gray-500"
        }`}
      >
        {label}
      </p>
      <p
        className={`font-serif text-3xl ${accent ? "text-white" : "text-[#1a1a1a]"}`}
      >
        {value}
      </p>
    </div>
  );
}
