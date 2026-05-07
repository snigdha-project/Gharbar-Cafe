"use client";

import Image from "next/image";
import Link from "next/link"; // 1. Import Link
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    /* Increased pt-48 on mobile to clear the booking bar overlap.
        Keeping md:pt-32 for larger screens where the overlap is less aggressive.
    */
    <section className="relative w-full pt-60 pb-24 md:pt-32 md:pb-32 bg-[#fffaf5] overflow-hidden">
      <div className="w-full px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: Overlapping Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[450px] md:h-[600px]"
          >
            {/* Big Image (The Room) */}
            <div className="absolute top-0 right-0 w-[85%] h-[85%] z-0">
              <Image
                src="/AboutUsSec-big.png"
                alt="Luxury Lounge"
                fill
                className="object-cover shadow-2xl"
              />
            </div>

            {/* Small Image (The Food) - Overlapping */}
            <div className="absolute bottom-0 left-0 w-[55%] h-[50%] z-10 border-[8px] md:border-[12px] border-[#fffaf5] shadow-xl">
              <Image
                src="/AboutUsSec-small.png"
                alt="Fine Dining"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <p className="text-[#e6a34d] font-bold tracking-[0.3em] text-[10px] md:text-[11px] uppercase mb-6">
              The Experience
            </p>

            <h2 className="text-[#1a1a1a] text-[32px] md:text-[48px] font-normal leading-[1.2] mb-8 tracking-tight">
              Where Nature Meets <br /> Unmatched Elegance
            </h2>

            <div className="space-y-6 text-[#1a1a1a]/70 text-[14px] md:text-[15px] leading-relaxed max-w-lg">
              <p>
                Founded in 2022, Ghar Barcafe was built on the philosophy of
                blending contemporary luxury with the raw beauty of its
                surroundings. Every detail, from the architecture to the
                locally-sourced cuisine, is designed to create an immersive
                journey for our guests.
              </p>
              <p>
                Whether you're looking for a peaceful retreat away from the city
                noise or an adventurous getaway, our tailored experiences will
                ensure memories that last a lifetime.
              </p>
            </div>

            {/* 2. Wrap the button in a Link component */}
            <Link href="/about">
              <button className="mt-10 cursor-pointer group relative px-10 py-4 border border-[#e6a34d] overflow-hidden transition-all duration-300">
                <span className="relative z-10 text-[#e6a34d] text-[11px] font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
                  Read Our Story
                </span>
                <div className="absolute inset-0 bg-[#e6a34d] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
