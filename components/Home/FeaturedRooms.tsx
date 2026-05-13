import Image from "next/image";
import Link from "next/link";
import { PLANS, PRICING, ROOMS, formatINR } from "@/lib/rooms";

export default function FeaturedRooms() {
  return (
    <section className="relative w-full py-20 md:py-28 bg-[#fffaf5]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#a87420] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-3">
            The accommodations
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1a1a1a]">
            Two ways to settle in
          </h2>
          <p className="text-gray-600 mt-5 text-sm md:text-base max-w-xl mx-auto">
            Two room categories, three meal plans. Pick your dates — we'll
            quote a transparent total.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {ROOMS.map((room) => (
            <article
              key={room.id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_30px_80px_-50px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_80px_-30px_rgba(168,116,32,0.3)] transition-shadow"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#e6a34d]/90 text-[#1a1a1a] text-[10px] uppercase tracking-[0.18em] font-bold">
                  {room.occupancy} · {room.sizeSqFt}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a]">
                  {room.name}
                </h3>
                <p className="text-gray-600 mt-3 leading-relaxed text-sm md:text-base">
                  {room.blurb}
                </p>

                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-5 text-sm text-gray-700">
                  {room.amenities.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e6a34d] shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>

                {/* Pricing matrix */}
                <div className="mt-7 border-t border-gray-200 pt-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#a87420] mb-3">
                    Per-night rates
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {PLANS.map((plan) => (
                      <div
                        key={plan.id}
                        className="px-2 py-3 rounded-lg bg-[#fffaf5] border border-[#e6a34d]/20"
                      >
                        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#a87420]">
                          {plan.short}
                        </p>
                        <p className="text-[#1a1a1a] font-serif text-lg mt-1">
                          {formatINR(PRICING[room.id].on[plan.id])}
                        </p>
                        <p className="text-gray-500 text-[10px] mt-0.5">
                          On-season
                        </p>
                        <p className="text-[#1a1a1a] font-medium text-sm mt-2">
                          {formatINR(PRICING[room.id].off[plan.id])}
                        </p>
                        <p className="text-gray-400 text-[10px] mt-0.5">
                          Off-season
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/rooms?room=${room.id}#book`}
                  className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[#1a1a1a] border-b border-[#e6a34d] pb-1 hover:text-[#a87420] transition-colors"
                >
                  Book this room →
                </Link>
              </div>
            </article>
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
