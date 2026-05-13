"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faHistory,
  faAward,
  faPlaceOfWorship,
  faMountain,
  faMountainSun,
  faChurch,
  faMonument,
  faWater,
  faTrophy,
  faOm,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const MotionLink = motion(Link);

type NearbyPlace = {
  name: string;
  category: string;
  icon: IconDefinition;
  image: string;
  desc: string;
};

const nearbyPlaces: NearbyPlace[] = [
  {
    name: "Norbulingka Institute",
    category: "Spiritual · Heritage",
    icon: faOm,
    image: "/gallery/g1.png",
    desc: "A living monument to Tibetan culture in exile, where quiet courtyards open into ateliers of thangka painters, woodcarvers and metal-smiths still working in centuries-old traditions. The gilded Seat of Happiness temple, set among Japanese-inspired gardens and lotus pools, is one of the most contemplative spaces in the valley.",
  },
  {
    name: "Aghanjar Mahadev Temple",
    category: "Spiritual · Pilgrimage",
    icon: faPlaceOfWorship,
    image: "/gallery/g2.png",
    desc: "Hidden in the forested folds of Khanyara, a five-hundred-year-old Shiva shrine sits above a clear hill stream, reached by a short trek through deodar and birch. The walk in is part of the pilgrimage — unhurried, cool, lit by shafts of mountain light — and the temple itself rewards the climb with deep silence.",
  },
  {
    name: "Paragliding at Indrunag",
    category: "Adventure",
    icon: faMountainSun,
    image: "/gallery/g3.png",
    desc: "Step off Indrunag's grassy ridge and the Dhauladhar opens up beneath your feet — terraced fields, slate roofs and the slow shadow of clouds drifting over the valley. With certified tandem pilots and gentle thermals through most of the year, it is equal parts thrill and meditation, suited to first-timers and seasoned flyers alike.",
  },
  {
    name: "Triund Hill",
    category: "Nature · Trek",
    icon: faMountain,
    image: "/gallery/g4.png",
    desc: "A nine-kilometre walk through oak, rhododendron and slow-shifting mist opens out onto a wide green saddle — the Dhauladhar rising on one side, the Kangra valley falling away on the other. Time it for sunset: the snow catches gold, the wind drops, and the night sky is unreasonably full of stars.",
  },
  {
    name: "Dharamshala Cricket Stadium",
    category: "Sport · Iconic",
    icon: faTrophy,
    image: "/gallery/g5.png",
    desc: "Cradled by pine ridges and framed against the snow-streaked Dhauladhar, this is widely held to be one of the most beautiful cricket grounds in the world. Even outside match days, an unhurried walk along the perimeter — with the peaks at your shoulder — is reason enough to visit.",
  },
  {
    name: "St John in the Wilderness Church",
    category: "Heritage · Architecture",
    icon: faChurch,
    image: "/gallery/g6.png",
    desc: "A neo-Gothic chapel built in 1852, hidden in a quiet deodar glade between Forsyth Ganj and McLeod. Its Belgian stained glass — a gift from Lady Elgin — catches the late afternoon light, and the mossy graveyard beside it makes for an unhurried, respectful kind of pause.",
  },
  {
    name: "The War Memorial",
    category: "Heritage",
    icon: faMonument,
    image: "/gallery/g7.png",
    desc: "A landscaped tribute to the soldiers of Himachal Pradesh, set at the gateway to the region. Retired tanks, regimental plaques and quiet stone walks give way to shaded pine trails — equal parts memorial and gentle, contemplative garden.",
  },
  {
    name: "Gyuto Monastery",
    category: "Spiritual",
    icon: faPlaceOfWorship,
    image: "/gallery/g8.png",
    desc: "Founded in 1474 by a prime disciple of the 1st Dalai Lama, Gyuto is the seat of the Karmapa and one of the great houses of tantric Buddhist study. It is best known for its multiphonic chant — a low, layered sound that, once heard in the main hall, is hard to forget.",
  },
  {
    name: "Dal Lake",
    category: "Nature",
    icon: faWater,
    image: "/gallery/g9.png",
    desc: "A small, mirror-still mountain lake in Kangra, fringed by towering deodar and ringed by the surrounding ridges. Best at first light — when the mist lifts off the water, the air still smells of pine, and the only sound is birdsong from the trees.",
  },
  {
    name: "Tea Gardens",
    category: "Nature · Heritage",
    icon: faLeaf,
    image: "/gallery/g10.png",
    desc: "Hand-tended Kangra estates wrap around the lower hills in neat, sloping rows — the cool green of new shoots, the unmistakable sweet-grass scent of plucked leaf, and, at the estate factories, a short walk through the journey from bush to cup. Among the oldest tea-growing regions in India.",
  },
  {
    name: "Tsuglag Khang",
    category: "Spiritual",
    icon: faOm,
    image: "/gallery/g11.png",
    desc: "The principal Tibetan temple of McLeod Ganj and a working place of daily practice — incense, butter lamps, the steady turn of prayer wheels. On most afternoons the courtyard fills with monks in debate, punctuated by hand-claps and bursts of laughter — an entirely unforgettable experience.",
  },
  {
    name: "Namgyal Monastery",
    category: "Spiritual",
    icon: faPlaceOfWorship,
    image: "/gallery/g12.png",
    desc: "The personal monastery of His Holiness the Dalai Lama and the largest Tibetan temple outside Tibet itself. More than two hundred monks live, study and chant here, and the rhythm of the place — measured, generous, unmistakably lived-in — is something you feel the moment you step inside.",
  },
  {
    name: "Bhagsu Waterfall",
    category: "Nature · Trek",
    icon: faWater,
    image: "/gallery/g13.png",
    desc: "A short walk above the old Bhagsunag temple opens onto a clear, cold fall that drops from a rock face into a quiet pool. The pine ridge above rewards the climb with sweeping valley views, and the path back is lined with the kind of small cafés that feel as if they have always been there.",
  },
];

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

      {/* --- NEARBY ATTRACTIONS SECTION --- */}
      <section className="py-24 px-6 bg-[#FAF3E0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs mb-4 font-bold">
              Explore the Region
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-snug">
              Famous Places <br />
              <span className="italic font-light">Near Us</span>
            </h3>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-6" />
            <p className="mt-8 max-w-2xl mx-auto text-[#555555] leading-relaxed text-base md:text-lg">
              A short drive from our doors opens onto a region layered with
              Tibetan and Hindu sanctuaries, neo-Gothic colonial relics,
              hand-tended tea estates and high-Himalayan trails. A small,
              curated list of the places we send our guests to most often.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {nearbyPlaces.map((place, index) => (
              <motion.article
                key={place.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                viewport={{ once: true, margin: "-60px" }}
                className="group relative bg-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-[#1A1A1A]/85 backdrop-blur-sm text-[#D4AF37] px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] font-bold border border-[#D4AF37]/40">
                    <FontAwesomeIcon icon={place.icon} className="text-xs" />
                    {place.category}
                  </span>
                  <span className="absolute top-4 right-4 font-serif text-white/85 text-lg tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="absolute bottom-4 left-5 right-5 font-serif text-xl md:text-2xl text-white leading-snug drop-shadow-md">
                    {place.name}
                  </h4>
                </div>

                {/* Body */}
                <div className="p-7 md:p-8 flex-1 flex flex-col">
                  <div className="w-10 h-[1px] bg-[#D4AF37] mb-5 group-hover:w-16 transition-all duration-500" />
                  <p className="text-sm md:text-[15px] text-[#555555] leading-relaxed">
                    {place.desc}
                  </p>
                </div>
              </motion.article>
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
