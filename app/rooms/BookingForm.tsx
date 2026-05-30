"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faShieldHalved,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { EXTERNAL_BOOKING_URL } from "@/lib/booking";

const highlights = [
  {
    icon: faCircleCheck,
    title: "Live availability",
    body: "Real-time room inventory and confirmed rates for your exact dates.",
  },
  {
    icon: faShieldHalved,
    title: "Secure payment",
    body: "Encrypted checkout through our certified booking partner.",
  },
  {
    icon: faClock,
    title: "Instant confirmation",
    body: "Your reservation is confirmed the moment payment goes through.",
  },
];

export default function BookingForm() {
  return (
    <section
      id="book"
      className="relative bg-gradient-to-b from-[#fffaf5] to-[#f7eedf] py-20 md:py-28 px-4 md:px-8 scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#a87420] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-3">
            Reserve a stay
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1a1a1a]">
            Book your room
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
            Reservations are now handled through our secure booking partner —
            with live availability, transparent rates and instant confirmation.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-[#0e0e0e] text-white border border-[#e6a34d]/30 shadow-[0_40px_100px_-40px_rgba(168,116,32,0.45)]"
        >
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#e6a34d]/15 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full bg-[#e6a34d]/10 blur-3xl pointer-events-none"
          />

          <div className="relative px-6 md:px-14 py-14 md:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div>
              <p className="text-[#e6a34d] uppercase tracking-[0.4em] text-[10px] font-bold mb-4">
                Continue on Asiatech
              </p>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-5">
                Pick your dates,
                <br />
                <span className="italic text-[#e6a34d]">confirm in minutes.</span>
              </h3>
              <p className="text-white/65 leading-relaxed mb-9 text-sm md:text-base">
                You will be taken to our partnered booking engine in a new tab.
                Choose your room, meal plan and dates there — pricing,
                availability and payment are all handled in a single, secure
                flow.
              </p>

              <a
                href={EXTERNAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#e6a34d] text-[#1a1a1a] px-9 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-300 cursor-pointer"
              >
                Continue to booking
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <p className="text-white/40 text-[10px] mt-5 tracking-[0.18em] uppercase">
                Opens in a new tab · asiatech.in
              </p>
            </div>

            <ul className="space-y-5 lg:pl-6 lg:border-l lg:border-white/10">
              {highlights.map((h) => (
                <li key={h.title} className="flex items-start gap-4">
                  <span className="mt-1 w-10 h-10 shrink-0 rounded-full bg-[#e6a34d]/15 border border-[#e6a34d]/40 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={h.icon}
                      className="text-[#e6a34d] text-sm"
                    />
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] font-bold text-white">
                      {h.title}
                    </p>
                    <p className="text-white/60 text-sm mt-1 leading-relaxed">
                      {h.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <p className="text-center text-gray-500 text-xs mt-8 leading-relaxed">
          Trouble with the booking engine? Call us at{" "}
          <a
            href="tel:+919882788885"
            className="text-[#a87420] font-semibold hover:underline"
          >
            +91 98827 88885
          </a>{" "}
          or write to{" "}
          <a
            href="mailto:bookgharbar@gmail.com"
            className="text-[#a87420] font-semibold hover:underline"
          >
            bookgharbar@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
