"use client";

import React, {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUser,
  faEnvelope,
  faPhone,
  faBed,
  faMugSaucer,
  faUtensils,
  faMoon,
  faCheck,
  faCircleExclamation,
  faSackDollar,
  faIndianRupeeSign,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  MAX_GUESTS_PER_ROOM,
  PLANS,
  PRICING,
  ROOM_TYPES,
  formatINR,
  fromISODate,
  maxGuestsFor,
  maxRoomsFor,
  quoteStay,
  toISODate,
  type Plan,
  type RoomType,
} from "@/lib/rooms";
import { createBookingAction, type BookingState } from "./actions";

const planIcons: Record<Plan, typeof faMugSaucer> = {
  ep: faMoon,
  cp: faMugSaucer,
  map: faUtensils,
};

function todayISO(): string {
  return toISODate(new Date());
}

function tomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toISODate(d);
}

export default function BookingForm() {
  const searchParams = useSearchParams();

  const [roomType, setRoomType] = useState<RoomType>(
    (searchParams.get("room") as RoomType) === "standard"
      ? "standard"
      : "premium"
  );
  const [plan, setPlan] = useState<Plan>(
    (() => {
      const p = searchParams.get("plan");
      return p === "ep" || p === "cp" || p === "map" ? p : "cp";
    })()
  );
  const [checkIn, setCheckIn] = useState<string>(
    searchParams.get("checkIn") || todayISO()
  );
  const [checkOut, setCheckOut] = useState<string>(
    searchParams.get("checkOut") || tomorrowISO()
  );
  const [guests, setGuests] = useState<number>(
    Number(searchParams.get("guests") || 2)
  );
  const [rooms, setRooms] = useState<number>(
    Number(searchParams.get("rooms") || 1)
  );

  const [state, formAction, pending] = useActionState<
    BookingState | undefined,
    FormData
  >(createBookingAction, undefined);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const successBookingIdRef = useRef<string | undefined>(undefined);

  // Reset form on success + open the success modal.
  useEffect(() => {
    if (state?.ok) {
      successBookingIdRef.current = state.bookingId;
      setShowSuccess(true);
      formRef.current?.reset();
      setRoomType("premium");
      setPlan("cp");
      setCheckIn(todayISO());
      setCheckOut(tomorrowISO());
      setGuests(2);
      setRooms(1);
    }
  }, [state?.ok, state?.bookingId]);

  // Close the success modal on ESC.
  useEffect(() => {
    if (!showSuccess) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSuccess(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showSuccess]);

  const maxRooms = maxRoomsFor(roomType);
  const maxGuests = maxGuestsFor(roomType, rooms);

  // Clamp room count to the type's inventory when the room type changes.
  useEffect(() => {
    if (rooms > maxRooms) setRooms(maxRooms);
  }, [rooms, maxRooms]);

  // Clamp guest count when room type or room count drops the cap below it.
  useEffect(() => {
    if (guests > maxGuests) setGuests(maxGuests);
  }, [guests, maxGuests]);

  const quote = useMemo(() => {
    const ci = fromISODate(checkIn);
    const co = fromISODate(checkOut);
    if (!ci || !co) return null;
    return quoteStay(ci, co, roomType, plan, rooms);
  }, [checkIn, checkOut, roomType, plan, rooms]);

  const onSeasonNights =
    quote?.breakdown.filter((b) => b.season === "on").length ?? 0;
  const offSeasonNights =
    quote?.breakdown.filter((b) => b.season === "off").length ?? 0;

  return (
    <section
      id="book"
      className="relative bg-gradient-to-b from-[#fffaf5] to-[#f7eedf] py-20 md:py-28 px-4 md:px-8 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#a87420] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-3">
            Reserve a stay
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1a1a1a]">
            Book your room
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm md:text-base">
            Pricing changes by season — we'll show you the total for your dates
            in real time before you submit.
          </p>
        </div>

        {/* Error banner (success is shown as a modal — see below) */}
        <AnimatePresence>
          {state?.error && (
            <motion.div
              key="err"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 rounded-xl bg-red-50 border border-red-200 px-5 py-4 flex items-start gap-3"
            >
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-red-600 mt-0.5"
              />
              <p className="text-sm text-red-900">{state.error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <SuccessModal
          open={showSuccess}
          bookingId={successBookingIdRef.current}
          onClose={() => setShowSuccess(false)}
        />

        <form
          ref={formRef}
          action={formAction}
          className="grid lg:grid-cols-[1fr_400px] gap-8"
        >
          {/* LEFT: form fields */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.25)] space-y-8">
            {/* Room type */}
            <div>
              <Legend icon={faBed}>Room type</Legend>
              <div className="grid grid-cols-2 gap-3">
                {ROOM_TYPES.map((rt) => {
                  const on = roomType === rt.id;
                  const fromPrice = PRICING[rt.id].off.ep;
                  return (
                    <button
                      type="button"
                      key={rt.id}
                      onClick={() => setRoomType(rt.id)}
                      className={`relative px-4 py-4 rounded-xl text-left border transition-all ${
                        on
                          ? "border-[#e6a34d] bg-[#fffaf5] shadow-[0_8px_30px_-15px_rgba(168,116,32,0.4)]"
                          : "border-gray-200 hover:border-[#e6a34d]/60"
                      }`}
                    >
                      <p className="font-serif text-lg text-[#1a1a1a]">
                        {rt.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        From {formatINR(fromPrice)} / night
                      </p>
                      {on && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#e6a34d] text-white flex items-center justify-center">
                          <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="room_type" value={roomType} />
            </div>

            {/* Plan */}
            <div>
              <Legend icon={faMugSaucer}>Meal plan</Legend>
              <div className="grid sm:grid-cols-3 gap-3">
                {PLANS.map((p) => {
                  const on = plan === p.id;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setPlan(p.id)}
                      className={`relative px-4 py-4 rounded-xl text-left border transition-all ${
                        on
                          ? "border-[#e6a34d] bg-[#fffaf5]"
                          : "border-gray-200 hover:border-[#e6a34d]/60"
                      }`}
                    >
                      <span className="flex items-center gap-2 mb-1">
                        <FontAwesomeIcon
                          icon={planIcons[p.id]}
                          className="text-[#a87420] text-sm"
                        />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#a87420]">
                          {p.short}
                        </span>
                      </span>
                      <p className="text-sm font-medium text-[#1a1a1a]">
                        {p.label.replace(`${p.short} — `, "")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {p.description}
                      </p>
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="plan" value={plan} />
            </div>

            {/* Dates */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Field icon={faCalendarDays} label="Check-in">
                <input
                  type="date"
                  name="check_in"
                  value={checkIn}
                  min={todayISO()}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (e.target.value >= checkOut) {
                      const next = fromISODate(e.target.value);
                      if (next) {
                        next.setDate(next.getDate() + 1);
                        setCheckOut(toISODate(next));
                      }
                    }
                  }}
                  required
                  className={inputClass}
                />
              </Field>
              <Field icon={faCalendarDays} label="Check-out">
                <input
                  type="date"
                  name="check_out"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                  className={inputClass}
                />
              </Field>
            </div>

            {/* Guests / rooms */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Field icon={faUser} label="Guests">
                <select
                  name="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className={inputClass}
                >
                  {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-500 mt-1 normal-case tracking-normal">
                  Max {MAX_GUESTS_PER_ROOM[roomType]} per {roomType} room
                  {rooms > 1 ? ` · ${maxGuests} for ${rooms} rooms` : ""}
                </p>
              </Field>
              <Field icon={faBed} label="Rooms">
                <select
                  name="rooms"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className={inputClass}
                >
                  {Array.from({ length: maxRooms }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "room" : "rooms"}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-500 mt-1 normal-case tracking-normal">
                  {maxRooms} {roomType} room{maxRooms === 1 ? "" : "s"} at the property
                </p>
              </Field>
            </div>

            <div className="border-t border-gray-200 pt-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field icon={faUser} label="Full name" required>
                  <input
                    type="text"
                    name="guest_name"
                    placeholder="Your name"
                    required
                    className={inputClass}
                  />
                </Field>
                <Field icon={faPhone} label="Phone" required>
                  <input
                    type="tel"
                    name="guest_phone"
                    placeholder="+91 99999 99999"
                    required
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field icon={faEnvelope} label="Email" required>
                <input
                  type="email"
                  name="guest_email"
                  placeholder="you@email.com"
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Special requests (optional)">
                <textarea
                  name="special_requests"
                  rows={3}
                  placeholder="Vegetarian meals, late check-in, anniversary stay…"
                  className={textareaClass}
                />
              </Field>
            </div>
          </div>

          {/* RIGHT: live summary */}
          <aside className="space-y-4">
            <div className="bg-[#0e0e0e] text-white rounded-2xl p-6 md:p-8 sticky top-28 border border-[#e6a34d]/30 shadow-[0_30px_80px_-30px_rgba(168,116,32,0.4)]">
              <div className="flex items-center gap-2 text-[#e6a34d] uppercase tracking-[0.3em] text-[10px] font-bold mb-5">
                <FontAwesomeIcon icon={faSackDollar} />
                Stay summary
              </div>

              <Row k="Room" v={ROOM_TYPES.find((r) => r.id === roomType)?.label} />
              <Row k="Plan" v={PLANS.find((p) => p.id === plan)?.short} />
              <Row k="Check-in" v={checkIn} />
              <Row k="Check-out" v={checkOut} />
              <Row
                k="Nights"
                v={quote ? String(quote.nights) : "—"}
              />
              <Row k="Rooms × Guests" v={`${rooms} × ${guests}`} />

              {quote && (onSeasonNights > 0 || offSeasonNights > 0) && (
                <div className="mt-3 mb-3 text-[10px] uppercase tracking-[0.2em] text-white/55">
                  {onSeasonNights > 0 && (
                    <span className="inline-block mr-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#e6a34d] mr-1.5 align-middle" />
                      {onSeasonNights} on-season
                    </span>
                  )}
                  {offSeasonNights > 0 && (
                    <span className="inline-block">
                      <span className="inline-block w-2 h-2 rounded-full bg-white/40 mr-1.5 align-middle" />
                      {offSeasonNights} off-season
                    </span>
                  )}
                </div>
              )}

              <div className="border-t border-white/10 mt-5 pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                    Total
                  </span>
                  <span className="font-serif text-3xl text-[#e6a34d] flex items-center">
                    <FontAwesomeIcon
                      icon={faIndianRupeeSign}
                      className="text-2xl mr-1"
                    />
                    {quote ? quote.total.toLocaleString("en-IN") : "—"}
                  </span>
                </div>
                {quote && (
                  <p className="text-right text-white/55 text-xs mt-1">
                    {formatINR(quote.perNightAverage)} avg/night × {rooms} room
                    {rooms > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-[#e6a34d] text-[#1a1a1a] font-bold uppercase tracking-[0.2em] text-xs py-3.5 rounded-lg hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {pending ? "Sending request…" : "Request booking"}
              </button>

              <p className="text-white/50 text-[10px] mt-3 leading-relaxed">
                You'll get an instant email confirmation. Final availability
                is confirmed by our team within a few hours.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "w-full bg-white border border-gray-300 focus:border-[#e6a34d] focus:ring-2 focus:ring-[#e6a34d]/25 rounded-lg px-4 py-2.5 text-sm outline-none transition-colors";
const textareaClass =
  "w-full bg-white border border-gray-300 focus:border-[#e6a34d] focus:ring-2 focus:ring-[#e6a34d]/25 rounded-lg px-4 py-3 text-sm outline-none transition-colors leading-relaxed";

function Legend({
  icon,
  children,
}: {
  icon: typeof faBed;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-bold text-gray-700 mb-3">
      <FontAwesomeIcon icon={icon} className="text-[#a87420] text-[10px]" />
      {children}
    </div>
  );
}

function Field({
  icon,
  label,
  required,
  children,
}: {
  icon?: typeof faBed;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-bold text-gray-700 mb-1.5">
        {icon && (
          <FontAwesomeIcon icon={icon} className="text-[#a87420] text-[10px]" />
        )}
        {label}
        {required && <span className="text-red-500 normal-case">*</span>}
      </span>
      {children}
    </label>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between text-sm py-2 border-b border-white/5 last:border-0">
      <span className="text-white/55 text-[10px] uppercase tracking-[0.2em]">
        {k}
      </span>
      <span className="text-white font-medium">{v ?? "—"}</span>
    </div>
  );
}

const SUPPORT_PHONE_DISPLAY = "+91 98827 88885";
const SUPPORT_PHONE_TEL = "+919882788885";
const SUPPORT_EMAIL = "bookgharbar@gmail.com";

function SuccessModal({
  open,
  bookingId,
  onClose,
}: {
  open: boolean;
  bookingId: string | undefined;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="success-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1a1a1a] hover:bg-gray-100 transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div className="bg-[#0e0e0e] text-white px-7 pt-8 pb-6">
              <div className="w-12 h-12 rounded-full bg-[#e6a34d] text-[#1a1a1a] flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faCheck} className="text-lg" />
              </div>
              <p className="text-[#e6a34d] uppercase tracking-[0.3em] text-[10px] font-bold mb-2">
                Booking received
              </p>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight">
                Thank you — we've got your request.
              </h3>
              {bookingId && (
                <p className="text-white/65 text-sm mt-3">
                  Reference{" "}
                  <span className="font-mono text-white">
                    {bookingId.slice(0, 8)}
                  </span>
                </p>
              )}
            </div>

            <div className="px-7 py-6 space-y-5 text-sm text-gray-700 leading-relaxed">
              <p>
                To complete your payment and for any other queries, please
                contact us at:
              </p>

              <a
                href={`tel:${SUPPORT_PHONE_TEL}`}
                className="flex items-center gap-3 rounded-xl bg-[#fffaf5] border border-[#e6a34d]/30 px-4 py-3 hover:bg-[#e6a34d]/10 transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-[#e6a34d] text-[#1a1a1a] flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#a87420]">
                    Call
                  </p>
                  <p className="font-semibold text-[#1a1a1a]">
                    {SUPPORT_PHONE_DISPLAY}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-3 rounded-xl bg-[#fffaf5] border border-[#e6a34d]/30 px-4 py-3 hover:bg-[#e6a34d]/10 transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-[#e6a34d] text-[#1a1a1a] flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#a87420]">
                    Email
                  </p>
                  <p className="font-semibold text-[#1a1a1a]">
                    {SUPPORT_EMAIL}
                  </p>
                </div>
              </a>

              <p className="text-xs text-gray-500">
                We've also sent a confirmation email with your booking details.
                Our team will reach out within a few hours to confirm
                availability.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white font-bold uppercase tracking-[0.2em] text-xs py-3 rounded-lg hover:bg-[#e6a34d] hover:text-[#1a1a1a] transition-colors"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
