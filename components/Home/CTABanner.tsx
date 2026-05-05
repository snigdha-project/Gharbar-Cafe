"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/banner-bg.jpg"
          alt="Ghar Barcafe Interior"
          fill
          className="object-cover"
        />
        {/* Deep dark overlay to make text pop */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-white text-4xl md:text-6xl font-light tracking-tight leading-tight mb-8"
        >
          Ready for an <br />
          <span className="font-normal">Unforgettable Stay?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-sm md:text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Book directly with us to enjoy exclusive perks, best rate guarantees,
          and tailored experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/checkout"
            className="inline-block bg-[#e6a34d] text-[#1a1a1a] px-12 py-5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-all duration-500 shadow-xl"
          >
            Book Your Stay
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
