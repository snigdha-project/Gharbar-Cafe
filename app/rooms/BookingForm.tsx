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
} from "@fortawesome/free-solid-svg-icons";
import {
  PLANS,
  PRICING,
  ROOM_TYPES,
  formatINR,
  fromISODate,
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

  // Reset form on success
  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
      setRoomType("premium");
      setPlan("cp");
      setCheckIn(todayISO());
      setCheckOut(tomorrowISO());
      setGuests(2);
      setRooms(1);
      // Smooth-scroll to the success banner
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state?.ok]);

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

        {/* Banner: success / error */}
        <AnimatePresence>
          {state?.ok && (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-4 flex items-start gap-3"
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="text-emerald-600 mt-0.5"
              />
              <div className="text-sm text-emerald-900">
                <p className="font-semibold">Booking received.</p>
                <p>
                  Reference{" "}
                  <span className="font-mono">
                    {state.bookingId?.slice(0, 8)}
                  </span>
                  . We've emailed your confirmation and our team will reach
                  out shortly.
                </p>
              </div>
            </motion.div>
          )}
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
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </Field>
              <Field icon={faBed} label="Rooms">
                <select
                  name="rooms"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className={inputClass}
                >
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "room" : "rooms"}
                    </option>
                  ))}
                </select>
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
                <Field icon={faPhone} label="Phone">
                  <input
                    type="tel"
                    name="guest_phone"
                    placeholder="+91 99999 99999"
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
