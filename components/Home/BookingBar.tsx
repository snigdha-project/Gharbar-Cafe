"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUsers,
  faBed,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { ROOM_TYPES, toISODate, type RoomType } from "@/lib/rooms";

function todayISO(): string {
  return toISODate(new Date());
}

function tomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toISODate(d);
}

export default function BookingBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<string>(todayISO());
  const [checkOut, setCheckOut] = useState<string>(tomorrowISO());
  const [guests, setGuests] = useState<number>(2);
  const [rooms, setRooms] = useState<number>(1);
  const [roomType, setRoomType] = useState<RoomType>("premium");
  const [showGuests, setShowGuests] = useState(false);

  const guestsLabel = useMemo(
    () => `${guests} guest${guests > 1 ? "s" : ""}, ${rooms} room${rooms > 1 ? "s" : ""}`,
    [guests, rooms]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkOut <= checkIn) {
      // Push checkout 1 day after checkin if invalid
      const next = new Date(checkIn);
      next.setDate(next.getDate() + 1);
      setCheckOut(toISODate(next));
      return;
    }
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
      rooms: String(rooms),
      room: roomType,
    });
    router.push(`/rooms?${params.toString()}#book`);
  };

  const itemClass =
    "flex-1 p-5 md:p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-center";
  const labelClass =
    "block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2";

  return (
    <div className="w-full px-4 md:px-10 max-w-[1300px] mx-auto">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-2xl flex flex-col md:flex-row items-stretch relative rounded-sm"
      >
        {/* Check-In */}
        <div className={itemClass}>
          <label htmlFor="bb-checkin" className={labelClass}>
            Check-In
          </label>
          <div className="relative flex items-center gap-3">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-[#e6a34d] text-sm"
            />
            <input
              id="bb-checkin"
              type="date"
              min={todayISO()}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (e.target.value >= checkOut) {
                  const next = new Date(e.target.value);
                  next.setDate(next.getDate() + 1);
                  setCheckOut(toISODate(next));
                }
              }}
              className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full cursor-pointer uppercase"
            />
          </div>
        </div>

        {/* Check-Out */}
        <div className={itemClass}>
          <label htmlFor="bb-checkout" className={labelClass}>
            Check-Out
          </label>
          <div className="relative flex items-center gap-3">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-[#e6a34d] text-sm"
            />
            <input
              id="bb-checkout"
              type="date"
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full cursor-pointer uppercase"
            />
          </div>
        </div>

        {/* Room type */}
        <div className={itemClass}>
          <label htmlFor="bb-room" className={labelClass}>
            Room
          </label>
          <div className="relative flex items-center gap-3">
            <FontAwesomeIcon
              icon={faBed}
              className="text-[#e6a34d] text-sm"
            />
            <select
              id="bb-room"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value as RoomType)}
              className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full cursor-pointer appearance-none"
            >
              {ROOM_TYPES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-gray-300 text-xs pointer-events-none"
            />
          </div>
        </div>

        {/* Guests */}
        <div
          className={`${itemClass} cursor-pointer hover:bg-gray-50 transition-colors`}
          onClick={() => setShowGuests((v) => !v)}
        >
          <span className={labelClass}>Guests &amp; Rooms</span>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-[#e6a34d] text-sm"
              />
              <span className="text-sm font-bold text-gray-800">
                {guestsLabel}
              </span>
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-gray-300 text-xs transition-transform ${
                showGuests ? "rotate-180" : ""
              }`}
            />
          </div>

          {showGuests && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-full left-0 right-0 md:left-auto md:right-[20%] md:w-72 bg-white shadow-xl border border-gray-100 z-50 p-4 mt-1 rounded-sm"
            >
              <Counter
                label="Guests"
                value={guests}
                min={1}
                max={10}
                onChange={setGuests}
              />
              <Counter
                label="Rooms"
                value={rooms}
                min={1}
                max={5}
                onChange={setRooms}
              />
              <button
                type="button"
                onClick={() => setShowGuests(false)}
                className="w-full mt-3 px-3 py-2 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#e6a34d] hover:text-[#1a1a1a] transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="md:w-[20%] bg-[#e6a34d] text-white py-6 md:py-0 text-[10px] font-black tracking-widest uppercase hover:bg-gray-900 transition-colors duration-500"
        >
          Check Availability
        </button>
      </form>
    </div>
  );
}

function Counter({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:border-[#1a1a1a] hover:text-[#1a1a1a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-bold text-gray-800">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:border-[#1a1a1a] hover:text-[#1a1a1a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
