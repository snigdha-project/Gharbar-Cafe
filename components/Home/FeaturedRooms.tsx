"use client";
import RoomCard from "../common/RoomCard";

// Dummy data using the specified image path
const dummyRooms = [
  {
    image: "/forest-view.png",
    price: 250,
    title: "Deluxe Forest View",
    guests: 2,
    size: 45,
  },
  {
    image: "/forest-view.png", // Reusing image as per request
    price: 400,
    title: "Premium Suite",
    guests: 3,
    size: 65,
  },
  {
    image: "/forest-view.png", // Reusing image as per request
    price: 650,
    title: "The Signature Villa",
    guests: 4,
    size: 120,
  },
];

export default function FeaturedRooms() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#F6EADF]">
      <div className="w-full px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto">
        {/* Header Content */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="text-[#e6a34d] font-bold tracking-[0.3em] text-[10px] md:text-[11px] uppercase mb-6">
            Accommodations
          </p>
          <h2 className="text-[#1a1a1a] text-3xl md:text-[48px] font-normal leading-tight mb-8 tracking-tight">
            Featured Rooms & Suites
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {dummyRooms.map((room, index) => (
            <RoomCard
              key={index}
              image={room.image}
              price={room.price}
              title={room.title}
              guests={room.guests}
              size={room.size}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
