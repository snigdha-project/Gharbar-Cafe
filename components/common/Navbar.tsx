"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ROOMS", href: "/rooms" },
  { name: "Dining & Cafe", href: "/cafe" },
  { name: "GALLERY", href: "/gallery" },
  { name: "BLOGS", href: "/blogs" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname(); // Get current route
  const isHomePage = pathname === "/"; // Check if it's the home page

  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Determine if the glass effect should be active
  // Active if: (It's not the home page) OR (It's the home page AND we've scrolled)
  const showGlassEffect = !isHomePage || isScrolled;

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          showGlassEffect
            ? "h-20 bg-white/40 backdrop-blur-xl saturate-150 border-b border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
            : "h-24 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full h-full flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center">
            <Link
              href="/"
              className={`relative flex items-center justify-center transition-all duration-700 ease-[0.23,1,0.32,1] ${
                showGlassEffect
                  ? "bg-[#111] rounded-full w-14 h-14 shadow-lg shadow-black/20"
                  : "w-20 h-20"
              }`}
            >
              <div className="relative w-[75%] h-[75%]">
                <Image
                  src="/logo.png"
                  alt="Ghar Barcafe"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-8 md:gap-14">
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative text-[13px] font-black tracking-[0.25em] transition-all duration-300 ${
                    showGlassEffect ? "text-[#111]/80" : "text-white"
                  } hover:text-[#111]`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-1/2 w-0 h-[2px] transition-all duration-300 -translate-x-1/2 group-hover:w-full ${
                      showGlassEffect ? "bg-[#111]" : "bg-[#e6a34d]"
                    }`}
                  />
                </Link>
              ))}
            </div>

            <Link
              href="/checkout"
              className="bg-[#e6a34d] text-white px-9 py-3.5 text-[10px] font-bold tracking-[0.15em] hover:bg-[#111] hover:shadow-xl transition-all duration-500 whitespace-nowrap"
            >
              BOOK NOW
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className={`lg:hidden p-2 transition-colors ${
                showGlassEffect ? "text-[#111]" : "text-white"
              }`}
            >
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[110] bg-[#0a0a0a]/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex justify-between items-center p-8">
              <div className="relative w-14 h-14 rounded-full p-2 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Ghar Barcafe"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-black transition-all"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center flex-grow gap-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index + 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group relative text-4xl font-bold text-white/50 hover:text-white transition-all uppercase tracking-[0.2em]"
                  >
                    {link.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-[#e6a34d] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 bg-[#e6a34d] text-[#111] px-16 py-6 text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all"
                >
                  BOOK NOW
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
