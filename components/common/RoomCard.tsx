"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { formatINR } from "@/lib/rooms";

interface RoomCardProps {
  image: string;
  price: number;
  title: string;
  guests: number;
  size: number;
}

export default function RoomCard({
  image,
  price,
  title,
  guests,
  size,
}: RoomCardProps) {
  return (
    <div className="bg-white shadow-xl group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
      {/* Image Container */}
      <div className="relative h-64 md:h-72 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Price Tag */}
        <div className="absolute bottom-0 right-0 bg-[#e6a34d] text-[#1a1a1a] px-6 py-3 font-bold text-sm tracking-tight z-10">
          {formatINR(price)} / night
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        <h3 className="text-[#1a1a1a] text-2xl font-normal leading-tight tracking-tight">
          {title}
        </h3>

        {/* Amenities */}
        <div className="flex items-center gap-6 text-[#1a1a1a]/70 text-sm">
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon icon={faUsers} className="text-[#e6a34d]" />
            <span>{guests} Guests</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon
              icon={faExpandArrowsAlt}
              className="text-[#e6a34d]"
            />
            <span>{size} sq.ft.</span>
          </div>
        </div>

        {/* CTA — visual only; the parent <Link> handles navigation */}
        <div className="w-full mt-4 group/btn relative px-10 py-4 border border-[#e6a34d] overflow-hidden transition-all duration-300 text-center">
          <span className="relative z-10 text-[#e6a34d] text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 group-hover/btn:text-white">
            Book Room
          </span>
          <div className="absolute inset-0 bg-[#e6a34d] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}
