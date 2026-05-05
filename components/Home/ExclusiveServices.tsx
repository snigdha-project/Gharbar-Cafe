"use client";

import {
  faCoffee,
  faUtensils,
  faWifi,
  faCarSide,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const services = [
  {
    icon: faCoffee,
    title: "Ghar Barcafe",
    description:
      "Our signature cafe offering artisanal blends and fresh bakes.",
  },
  {
    icon: faUtensils,
    title: "Fine Dining",
    description:
      "World-class culinary experiences with locally sourced ingredients.",
  },
  {
    icon: faWifi,
    title: "High-Speed WiFi",
    description: "Stay connected with complimentary high-speed internet.",
  },
  {
    icon: faCarSide,
    title: "Airport Transfer",
    description: "Seamless transportation to and from the airport.",
  },
];

export default function ExclusiveServices() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#fffaf5]">
      <div className="w-full px-6 md:px-10 lg:px-20 max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[#e6a34d] font-bold tracking-[0.4em] text-[10px] md:text-[11px] uppercase mb-4">
            Our Facilities
          </p>
          <h2 className="text-[#1a1a1a] text-3xl md:text-[48px] font-normal tracking-tight">
            Exclusive Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-10 flex flex-col items-center text-center group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-gray-100"
            >
              {/* Circular Icon Container */}
              <div className="w-20 h-20 bg-[#fffaf5] rounded-full flex items-center justify-center mb-8 transition-colors duration-500 group-hover:bg-[#e6a34d]/10">
                <FontAwesomeIcon
                  icon={service.icon}
                  className="text-[#e6a34d] text-2xl transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text Content */}
              <h3 className="text-[#1a1a1a] text-lg font-bold tracking-tight mb-4 uppercase">
                {service.title}
              </h3>

              <p className="text-[#1a1a1a]/60 text-sm leading-relaxed max-w-[240px]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
