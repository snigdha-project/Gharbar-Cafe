"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const blogPosts = [
  {
    date: "OCT 15, 2024",
    title: "The Art of Coffee at Ghar Barcafe",
    image: "/banner-bg.jpg",
    href: "/blogs/coffee-art",
  },
  {
    date: "OCT 10, 2024",
    title: "Top 5 Nature Trails Around the Hotel",
    image: "/banner-bg.jpg",
    href: "/blogs/nature-trails",
  },
  {
    date: "SEP 28, 2024",
    title: "Introducing Our New Seasonal Menu",
    image: "/banner-bg.jpg",
    href: "/blogs/seasonal-menu",
  },
];

export default function LatestNews() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#F6EADF]">
      <div className="w-full px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[#e6a34d] font-bold tracking-[0.4em] text-[10px] md:text-[11px] uppercase mb-4">
            Journal
          </p>
          <h2 className="text-[#1a1a1a] text-3xl md:text-[48px] font-normal tracking-tight">
            Latest News & Offers
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white group"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-[#e6a34d] text-[10px] font-bold tracking-widest mb-4">
                  {post.date}
                </p>
                <h3 className="text-[#1a1a1a] text-xl font-normal leading-snug mb-6 group-hover:text-[#e6a34d] transition-colors duration-300">
                  {post.title}
                </h3>
                <Link
                  href={post.href}
                  className="inline-flex items-center gap-3 text-[11px] font-black tracking-widest uppercase text-[#1a1a1a] group/link"
                >
                  Read More
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-[10px] transition-transform duration-300 group-hover/link:translate-x-2"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Blogs Button */}
        <div className="flex justify-center">
          <Link
            href="/blogs"
            className="group relative px-12 py-5 border border-[#e6a34d] overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 text-[#e6a34d] text-[11px] font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
              View All Blogs
            </span>
            <div className="absolute inset-0 bg-[#e6a34d] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
