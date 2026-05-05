"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reviews = [
  {
    text: '"An absolutely stunning property. The attention to detail in the room and the exceptional service at the cafe made our weekend getaway truly memorable. We will definitely be back."',
    name: "Sarah Jenkins",
    location: "New York, USA",
    // Adding dynamic avatar from i.pravatar.cc
    image: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    text: '"The perfect blend of luxury and nature. The signature villa provided the privacy we wanted, and the dining experience exceeded all expectations. A hidden gem."',
    name: "David Chen",
    location: "Toronto, Canada",
    // Adding dynamic avatar from i.pravatar.cc
    image: "https://i.pravatar.cc/150?u=david",
  },
];

export default function Testimonials() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#fffaf5]">
      <div className="w-full px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[#e6a34d] font-bold tracking-[0.4em] text-[10px] md:text-[11px] uppercase mb-4">
            Testimonials
          </p>
          <h2 className="text-[#1a1a1a] text-3xl md:text-[48px] font-normal tracking-tight">
            Guest Experiences
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#f3e9df] p-10 md:p-14 flex flex-col justify-between"
            >
              <p className="text-[#1a1a1a] text-lg md:text-xl italic font-light leading-relaxed mb-12">
                {review.text}
              </p>

              <div className="flex items-center gap-5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border-2 border-white shadow-sm">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                    unoptimized // Needed for external dynamic URLs like i.pravatar.cc
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#1a1a1a] font-bold text-sm">
                    {review.name}
                  </span>
                  <span className="text-[#e6a34d] text-[11px] font-medium tracking-wide">
                    {review.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
