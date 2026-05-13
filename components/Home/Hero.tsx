"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BookingBar from "./BookingBar";

export default function Hero() {
  return (
    <section className="relative w-full h-[95vh] flex items-center justify-center bg-[#1a1a1a]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Gharbar Cafe"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Content Styled to Match Image Exactly */}
      <div className="relative z-10 text-center px-4 mb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#e6a34d] font-bold tracking-[0.45em] text-[10px] md:text-[11px] uppercase mb-8"
        >
          Welcome to Ghar Barcafe
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white text-[44px] md:text-[84px] font-normal tracking-tight leading-[1.05] mb-8"
        >
          Find Your Perfect <br /> Escape
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-200 text-[13px] md:text-[16px] font-light tracking-wide mb-12 max-w-2xl mx-auto opacity-90"
        >
          Experience luxury, nature, and the finest hospitality in our exclusive
          retreat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/about"
            className="inline-block bg-[#e6a34d] text-gray-900 px-12 py-5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#d4923c] transition-all"
          >
            Discover More
          </Link>
        </motion.div>
      </div>

      {/* Booking Bar Overlap */}
      <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20">
        <BookingBar />
      </div>
    </section>
  );
}
