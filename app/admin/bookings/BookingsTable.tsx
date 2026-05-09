"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faXmark,
  faClock,
  faTrash,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  updateBookingStatusAction,
  deleteBookingAction,
  saveAdminNotesAction,
  type BookingStatus,
} from "./actions";
import { formatINR, PLANS, ROOM_TYPES } from "@/lib/rooms";

export type AdminBookingRow = {
  id: string;
  created_at: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string | null;
  room_type: "premium" | "standard";
  plan: "ep" | "cp" | "map";
  check_in: string;
  check_out: string;
  guests: number;
  rooms: number;
  total_amount: number;
  status: BookingStatus;
  special_requests: string | null;
  admin_notes: string | null;
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-amber-50 border-amber-200 text-amber-900",
  confirmed: "bg-emerald-50 border-emerald-200 text-emerald-900",
  cancelled: "bg-red-50 border-red-200 text-red-900",
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

export default function BookingsTable({
  bookings,
}: {
  bookings: AdminBookingRow[];
}) {
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");

  const filtered = bookings.filter((b) =>
    filter === "all" ? true : b.status === filter
  );

  const counts: Record<"all" | BookingStatus, number> = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {(
          ["all", "pending", "confirmed", "cancelled"] as const
        ).map((f) => {
          const on = filter === f;
          return (
            <button
              type="button"
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-colors ${
                on
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:text-[#1a1a1a]"
              }`}
            >
              {f === "all" ? "All" : STATUS_LABEL[f as BookingStatus]}
              <span
                className={`ml-2 inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full text-[10px] ${
                  on ? "bg-[#e6a34d] text-[#1a1a1a]" : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[f]}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center text-gray-500">
          {bookings.length === 0
            ? "No bookings yet. The first one will appear here."
            : "No bookings match this filter."}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <BookingRow key={b.id} booking={b} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingRow({ booking }: { booking: AdminBookingRow }) {
  const [open, setOpen] = useState(false);
  const planLabel =
    PLANS.find((p) => p.id === booking.plan)?.short ?? booking.plan;
  const roomLabel =
    ROOM_TYPES.find((r) => r.id === booking.room_type)?.label ??
    booking.room_type;

  const created = new Date(booking.created_at);
  const createdShort = created.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Summary row */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 md:px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span
          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold border ${
            STATUS_STYLES[booking.status]
          }`}
        >
          {STATUS_LABEL[booking.status]}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-medium text-[#1a1a1a] truncate">
            {booking.guest_name}{" "}
            <span className="text-gray-400 font-normal text-sm">
              · {booking.check_in} → {booking.check_out}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {roomLabel} · {planLabel} · {booking.guests} guest
            {booking.guests > 1 ? "s" : ""} · {booking.rooms} room
            {booking.rooms > 1 ? "s" : ""}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <span className="font-serif text-lg text-[#1a1a1a]">
            {formatINR(booking.total_amount)}
          </span>
          <span className="text-xs text-gray-400 w-24 text-right">
            {createdShort}
          </span>
        </div>

        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gray-200"
          >
            <div className="p-4 md:p-6 grid md:grid-cols-2 gap-6 bg-[#fffaf5]">
              {/* Left: contact + dates */}
              <div className="space-y-4">
                <Detail label="Reference">
                  <span className="font-mono text-[#1a1a1a]">
                    {booking.id.slice(0, 8)}
                  </span>
                </Detail>
                <Detail label="Email">
                  <a
                    href={`mailto:${booking.guest_email}`}
                    className="inline-flex items-center gap-2 text-[#a87420] hover:text-[#1a1a1a]"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                    {booking.guest_email}
                  </a>
                </Detail>
                {booking.guest_phone && (
                  <Detail label="Phone">
                    <a
                      href={`tel:${booking.guest_phone}`}
                      className="inline-flex items-center gap-2 text-[#a87420] hover:text-[#1a1a1a]"
                    >
                      <FontAwesomeIcon icon={faPhone} className="text-xs" />
                      {booking.guest_phone}
                    </a>
                  </Detail>
                )}
                <Detail label="Stay">
                  <p className="text-[#1a1a1a]">
                    {booking.check_in} → {booking.check_out}
                  </p>
                </Detail>
                <Detail label="Total">
                  <p className="font-serif text-xl text-[#1a1a1a]">
                    {formatINR(booking.total_amount)}
                  </p>
                </Detail>
                {booking.special_requests && (
                  <Detail label="Special requests">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {booking.special_requests}
                    </p>
                  </Detail>
                )}
              </div>

              {/* Right: status + notes + actions */}
              <div className="space-y-4">
                <Detail label="Status">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(
                      ["pending", "confirmed", "cancelled"] as BookingStatus[]
                    ).map((s) => (
                      <form key={s} action={updateBookingStatusAction}>
                        <input type="hidden" name="id" value={booking.id} />
                        <input type="hidden" name="status" value={s} />
                        <button
                          type="submit"
                          className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold border transition-colors ${
                            booking.status === s
                              ? STATUS_STYLES[s]
                              : "bg-white border-gray-200 text-gray-500 hover:border-[#1a1a1a]"
                          }`}
                          disabled={booking.status === s}
                        >
                          <FontAwesomeIcon
                            icon={
                              s === "confirmed"
                                ? faCheck
                                : s === "cancelled"
                                  ? faXmark
                                  : faClock
                            }
                            className="text-[9px] mr-1.5"
                          />
                          Mark {STATUS_LABEL[s]}
                        </button>
                      </form>
                    ))}
                  </div>
                </Detail>

                <Detail label="Internal notes">
                  <form
                    action={saveAdminNotesAction}
                    className="space-y-2 mt-1"
                  >
                    <input type="hidden" name="id" value={booking.id} />
                    <textarea
                      name="admin_notes"
                      defaultValue={booking.admin_notes ?? ""}
                      rows={3}
                      placeholder="Notes for the team (not visible to guest)…"
                      className="w-full bg-white border border-gray-300 focus:border-[#e6a34d] focus:ring-2 focus:ring-[#e6a34d]/25 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-full bg-[#1a1a1a] text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#e6a34d] hover:text-[#1a1a1a] transition-colors"
                    >
                      Save notes
                    </button>
                  </form>
                </Detail>

                <div className="pt-3 border-t border-gray-200">
                  <form action={deleteBookingAction}>
                    <input type="hidden" name="id" value={booking.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-[10px]" />
                      Delete booking
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-gray-500 mb-1">
        {label}
      </p>
      {children}
    </div>
  );
}
