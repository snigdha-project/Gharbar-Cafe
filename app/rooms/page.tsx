import Image from "next/image";
import { Suspense } from "react";
import BookingForm from "./BookingForm";
import { PLANS, PRICING, ROOMS, formatINR } from "@/lib/rooms";
import { EXTERNAL_BOOKING_URL } from "@/lib/booking";
import RouteLoader from "@/components/common/RouteLoader";

export const metadata = {
  title: "Rooms & Booking | Ghar Bar Cafe",
  description:
    "Premium and Standard rooms in Dharamshala — book your stay with seasonal pricing across EP / CP / MAP plans.",
};

export default function RoomsPage() {
  return (
    <main className="bg-[#fffaf5] min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center bg-[#0e0e0e] overflow-hidden">
        <Image
          src="/gallery/g22.png"
          alt="Ghar Bar Cafe rooms"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-[#0e0e0e]" />
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <p className="text-[#e6a34d] uppercase tracking-[0.45em] text-[10px] md:text-xs font-bold mb-4">
            Stay with us
          </p>
          <h1 className="text-white font-serif text-4xl md:text-6xl leading-[1.05]">
            Rooms in the <span className="italic text-[#e6a34d]">hills</span>
          </h1>
          <div className="mx-auto mt-7 h-[1px] w-32 bg-[#e6a34d]" />
          <p className="text-white/70 mt-7 text-sm md:text-base leading-relaxed">
            Two room categories, three meal plans, two seasons. Pick your dates
            and we'll quote a transparent total before you submit.
          </p>
          <a
            href={EXTERNAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-10 px-7 py-3.5 rounded-full bg-[#e6a34d] text-[#1a1a1a] text-xs uppercase tracking-[0.25em] font-bold hover:bg-white transition-colors cursor-pointer"
          >
            Check availability
          </a>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="text-[#a87420] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-3">
            The accommodations
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1a1a1a]">
            Two ways to settle in
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {ROOMS.map((room) => (
            <article
              key={room.id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_30px_80px_-50px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_80px_-30px_rgba(168,116,32,0.3)] transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
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

                <a
                  href={EXTERNAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[#1a1a1a] border-b border-[#e6a34d] pb-1 hover:text-[#a87420] transition-colors cursor-pointer"
                >
                  Book this room →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SEASON CALENDAR */}
      <section className="bg-[#0e0e0e] text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <p className="text-[#e6a34d] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-3 text-center">
            Seasons
          </p>
          <h3 className="font-serif text-3xl md:text-4xl text-center">
            When does pricing change?
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="rounded-2xl border border-[#e6a34d]/40 p-6 md:p-8 bg-[#e6a34d]/5">
              <p className="text-[#e6a34d] uppercase tracking-[0.3em] text-[10px] font-bold mb-2">
                On-season
              </p>
              <p className="font-serif text-xl mb-1">Apr 10 — Jul 5</p>
              <p className="font-serif text-xl">Nov 20 — Jan 20</p>
              <p className="text-white/65 mt-4 text-sm">
                Peak Dharamshala months — long daylight, snow viewing, and the
                holiday window.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 p-6 md:p-8 bg-white/5">
              <p className="text-white/60 uppercase tracking-[0.3em] text-[10px] font-bold mb-2">
                Off-season
              </p>
              <p className="font-serif text-xl mb-1">Jul 5 — Oct 1</p>
              <p className="font-serif text-xl">Jan 20 — Apr 10</p>
              <p className="text-white/65 mt-4 text-sm">
                Slow, soft months — monsoon greens, post-monsoon clarity, and
                lower rates across all plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <Suspense fallback={<RouteLoader label="Preparing the booking desk…" />}>
        <BookingForm />
      </Suspense>
    </main>
  );
}
