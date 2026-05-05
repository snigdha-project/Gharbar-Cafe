"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUsers,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function BookingBar() {
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState("2 Adults, 1 Room");

  const itemClass =
    "flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-center";
  const labelClass =
    "block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2";

  return (
    <div className="w-full px-4 md:px-10 max-w-[1300px] mx-auto">
      <div className="bg-white shadow-2xl flex flex-col md:flex-row items-stretch relative">
        {/* Check-In Date */}
        <div className={itemClass}>
          <label className={labelClass}>Check-In</label>
          <div className="relative flex items-center gap-3">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-[#e6a34d] text-sm"
            />
            <input
              type="date"
              className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full cursor-pointer uppercase"
              defaultValue="2026-10-24"
            />
          </div>
        </div>

        {/* Check-Out Date */}
        <div className={itemClass}>
          <label className={labelClass}>Check-Out</label>
          <div className="relative flex items-center gap-3">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-[#e6a34d] text-sm"
            />
            <input
              type="date"
              className="bg-transparent text-sm font-bold text-gray-800 outline-none w-full cursor-pointer uppercase"
              defaultValue="2026-10-28"
            />
          </div>
        </div>

        {/* Guest Dropdown */}
        <div
          className={`${itemClass} cursor-pointer hover:bg-gray-50 transition-colors`}
          onClick={() => setShowGuests(!showGuests)}
        >
          <label className={labelClass}>Guests</label>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-[#e6a34d] text-sm"
              />
              <span className="text-sm font-bold text-gray-800">{guests}</span>
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-gray-300 text-xs transition-transform ${showGuests ? "rotate-180" : ""}`}
            />
          </div>

          {/* Simple Dropdown Menu */}
          {showGuests && (
            <div className="absolute top-full left-0 md:left-auto md:right-[20%] w-full md:w-64 bg-white shadow-xl border border-gray-100 z-50 p-2">
              {["1 Adult, 1 Room", "2 Adults, 1 Room", "2 Adults, 2 Rooms"].map(
                (option) => (
                  <div
                    key={option}
                    className="p-3 text-sm hover:bg-gray-50 cursor-pointer font-medium text-gray-700"
                    onClick={() => {
                      setGuests(option);
                      setShowGuests(false);
                    }}
                  >
                    {option}
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button className="md:w-[20%] bg-[#e6a34d] text-white py-6 md:py-0 text-[10px] font-black tracking-widest uppercase hover:bg-gray-900 transition-colors duration-500">
          Check Availability
        </button>
      </div>
    </div>
  );
}
