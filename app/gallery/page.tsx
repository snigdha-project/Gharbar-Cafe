"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearchPlus } from "@fortawesome/free-solid-svg-icons";

// Array mapping all 25 provided images
const photos = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/g${i + 1}.png`,
  alt: `Ghar Barcafe Experience ${i + 1}`,
}));

export default function GalleryPage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#fffaf5] pt-32 pb-20 overflow-x-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        {/* Playful Header Section */}
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 text-[#e6a34d]/10 text-9xl font-black select-none z-0"
          >
            MOMENTS
          </motion.div>

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }} // Fixed: changed tracking to letterSpacing
            animate={{ opacity: 1, letterSpacing: "0.4em" }} // Fixed: changed tracking to letterSpacing
            className="relative z-10 text-[#e6a34d] font-bold text-[11px] uppercase mb-4"
          >
            A Visual Journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="relative z-10 text-[#1a1a1a] text-5xl md:text-7xl font-light tracking-tighter"
          >
            Snapshots of{" "}
            <span className="font-serif italic text-[#e6a34d]">Paradise</span>
          </motion.h1>
        </div>

        {/* Dynamic Masonry Grid with Original Colors */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layoutId={`img-${photo.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.6, delay: (index % 5) * 0.1 }}
              className="relative group cursor-pointer overflow-hidden break-inside-avoid rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500"
              onClick={() => setSelectedImg(photo.src)}
            >
              {/* Image in original color */}
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              {/* Playful Interactive Overlay */}
              <div className="absolute inset-0 bg-[#e6a34d]/20 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.2 }}
                  className="bg-white text-[#1a1a1a] w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
                >
                  <FontAwesomeIcon icon={faSearchPlus} className="text-lg" />
                </motion.div>

                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-black text-[#1a1a1a] uppercase tracking-tighter">
                    Ghar Barcafe #{photo.id}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next-Gen Spring Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#1a1a1a]/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-16"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              className="absolute top-8 right-8 text-white w-12 h-12 flex items-center justify-center rounded-full border border-white/20 z-[210]"
              onClick={() => setSelectedImg(null)}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="relative w-full h-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg}
                alt="Fullscreen View"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
