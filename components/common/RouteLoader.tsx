"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RouteLoader({ label }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[8000] flex items-center justify-center bg-[#fffaf5]/95 backdrop-blur-sm">
      <div className="text-center">
        {/* Spinning gold arc + steady logo */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[#e6a34d]/20 border-t-[#e6a34d]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-2 rounded-full border border-[#e6a34d]/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <span className="absolute inset-3 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Ghar Bar Cafe"
              width={80}
              height={80}
              priority
              className="w-full h-full object-contain"
            />
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-6 text-[#a87420] uppercase text-[10px] md:text-xs font-bold tracking-[0.4em]"
        >
          {label ?? "Brewing your page…"}
        </motion.p>

        {/* shimmering line */}
        <div className="mt-5 mx-auto w-40 h-[2px] bg-[#e6a34d]/15 overflow-hidden rounded-full">
          <motion.div
            className="h-full w-12 bg-gradient-to-r from-transparent via-[#e6a34d] to-transparent"
            animate={{ x: [-48, 192] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
