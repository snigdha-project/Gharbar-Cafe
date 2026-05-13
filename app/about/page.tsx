"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faHistory, faAward } from "@fortawesome/free-solid-svg-icons";

const MotionLink = motion(Link);

const AboutUs = () => {
  return (
    <div className="bg-[#FAF3E0] min-h-screen font-sans overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-20 flex items-center justify-center bg-[#1A1A1A]">
        <div
          className="absolute inset-0 z-0 opacity-60 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/AboutUsSec-big.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#1A1A1A] z-[1]" />

        <div className="relative z-10 text-center text-white px-4">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs md:text-sm mb-4 font-bold pt-20"
          >
            Since 2024
          </motion.h4>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight"
          >
            The Soul of <br />{" "}
            <span className="italic font-light">Gharbar Boutique</span>
          </motion.h1>
        </div>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Image Frame with Homepage Gold Accent */}
            <div className="border-[1px] border-[#D4AF37] p-3 bg-white shadow-2xl">
              <img
                src="/AboutUsSec-big.png"
                alt="Boutique Heritage"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Dark Box */}
            <div className="absolute -bottom-10 -left-6 hidden lg:block w-72 bg-[#1A1A1A] p-8 text-white shadow-2xl border-l-4 border-[#D4AF37]">
              <p className="text-[#D4AF37] text-3xl font-serif mb-2">01.</p>
              <p className="text-xs uppercase tracking-[0.2em] leading-relaxed font-semibold">
                Curated for the Conscious Traveler
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 md:pl-10"
          >
            <h2 className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-bold">
              The Essence
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-snug">
              Where Every Detail <br /> Tells a Story
            </h3>
            <div className="w-20 h-1 bg-[#D4AF37]" />
            <p className="text-[#333333] leading-relaxed text-lg">
              Inspired by the serene landscapes that surround us, Gharbar was
              envisioned as a living tapestry of comfort and heritage. We
              believe that true luxury isn't just about opulence; it's about the
              feeling of being exactly where you belong.
            </p>
            <p className="text-[#555555] leading-relaxed italic border-l-2 border-[#D4AF37] pl-4">
              "Our mission was simple: create a sanctuary that breathes with the
              forest and celebrates the local spirit."
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- VALUES SECTION (The Pillars) --- */}
      <section className="bg-white py-24 px-6 border-y border-[#D4AF37]/20 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-black uppercase tracking-[0.4em] text-xs mb-4 font-bold">
              Our Philosophy
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-[#1A1A1A]">
              The Pillars of Gharbar
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: faLeaf,
                title: "Nature First",
                desc: "Our architecture respects the existing ecosystem, ensuring a seamless flow between indoor luxury and outdoor wild.",
              },
              {
                icon: faHistory,
                title: "Heritage",
                desc: "We integrate local craftsmanship and traditional aesthetics into every corner of our boutique stay.",
              },
              {
                icon: faAward,
                title: "Curated Care",
                desc: "From personalized dining to tailored excursions, your experience is crafted specifically for your journey.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group p-10 bg-[#FAF3E0] border border-transparent hover:border-[#D4AF37]/30 transition-all duration-500 text-center"
              >
                <div className="w-20 h-20 bg-[#1A1A1A] flex items-center justify-center rounded-full mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <FontAwesomeIcon
                    icon={value.icon}
                    className="text-[#D4AF37] text-3xl"
                  />
                </div>
                <h4 className="text-2xl font-serif mb-4 tracking-wide text-[#1A1A1A]">
                  {value.title}
                </h4>
                <div className="w-10 h-[1px] bg-[#D4AF37] mx-auto mb-4" />
                <p className="text-sm text-[#555555] leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative py-32 overflow-hidden bg-[#1A1A1A]">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-fixed bg-center"
          style={{ backgroundImage: "url('/AboutUsSec-big.png')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-white text-3xl md:text-6xl font-serif mb-12 leading-tight">
            Escape the Ordinary. <br />
            <span className="italic font-light text-[#D4AF37]">
              Experience the Exceptional.
            </span>
          </h2>
          <MotionLink
            href="/rooms"
            whileHover={{ scale: 1.05, backgroundColor: "#B8860B" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#D4AF37] text-[#1A1A1A] px-14 py-5 uppercase tracking-[0.2em] text-xs font-bold transition-all shadow-2xl cursor-pointer"
          >
            Plan Your Visit
          </MotionLink>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
