"use client";

import Link from "next/link";
import RoomCard from "../common/RoomCard";
import { PRICING } from "@/lib/rooms";

const featured = [
  {
    id: "premium" as const,
    image: "/gallery/g22.png",
    title: "Premium Room",
    guests: 2,
    size: 320,
  },
  {
    id: "standard" as const,
    image: "/gallery/g18.png",
    title: "Standard Room",
    guests: 2,
    size: 240,
  },
  {
    id: "premium" as const,
    image: "/forest-view.png",
    title: "The Signature Stay",
    guests: 2,
    size: 320,
  },
];

export default function FeaturedRooms() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#F6EADF]">
      <div className="w-full px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="text-[#e6a34d] font-bold tracking-[0.3em] text-[10px] md:text-[11px] uppercase mb-6">
            Accommodations
          </p>
          <h2 className="text-[#1a1a1a] text-3xl md:text-[48px] font-normal leading-tight mb-4 tracking-tight">
            Featured Rooms & Suites
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Two room categories, three meal plans. Pick your dates — we'll
            quote a transparent total.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {featured.map((room, index) => (
            <Link key={index} href={`/rooms?room=${room.id}#book`}>
              <RoomCard
                image={room.image}
                price={PRICING[room.id].off.ep}
                title={room.title}
                guests={room.guests}
                size={room.size}
              />
            </Link>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a1a1a] text-white text-xs uppercase tracking-[0.25em] font-bold hover:bg-[#e6a34d] hover:text-[#1a1a1a] transition-colors"
          >
            Explore all rooms
          </Link>
        </div>
      </div>
    </section>
  );
}
