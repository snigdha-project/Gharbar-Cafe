"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "gbc-preloader-seen";
const TOTAL_DURATION = 2400; // ms — full intro length
const EXIT_DELAY = 250; // ms — pause at 100% before exit

const TITLE = "GHAR BAR CAFE";

export default function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedLetters, setLoadedLetters] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Mount only on client; don't show on subsequent visits in the same session.
  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // sessionStorage may be unavailable (privacy mode) — fall through
    }

    if (seen) {
      setShow(false);
      return;
    }

    // Lock scroll while the splash is on screen
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / TOTAL_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      setLoadedLetters(Math.min(TITLE.length, Math.floor(eased * TITLE.length)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // ignore
        }
        window.setTimeout(() => setShow(false), EXIT_DELAY);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Restore scroll once exit completes
  const onExitComplete = () => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  if (!mounted) return null;

  const percent = Math.round(progress * 100);

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {show && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] pointer-events-auto"
          aria-hidden
        >
          {/* curtain — splits open on exit */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#0e0e0e]"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0e0e0e]"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
          />

          {/* faint texture / ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#e6a34d]/10 blur-3xl" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[480px] h-[480px] rounded-full bg-[#e6a34d]/5 blur-3xl" />
          </div>

          {/* content — fades out before curtain splits */}
          <motion.div
            className="relative z-10 h-full w-full flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="w-full max-w-xl text-center">
              {/* tag */}
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.5em" }}
                transition={{ duration: 1, delay: 0.1 }}
                className="text-[#e6a34d] uppercase text-[10px] md:text-xs font-bold mb-8 md:mb-10"
              >
                Established 2022 · Dharamshala
              </motion.p>

              {/* logo */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 110,
                  damping: 14,
                }}
                className="mx-auto mb-8 md:mb-10 w-20 h-20 md:w-28 md:h-28 relative"
              >
                {/* rotating gold ring */}
                <motion.span
                  className="absolute inset-0 rounded-full border border-[#e6a34d]/40"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    maskImage:
                      "conic-gradient(from 0deg, transparent 0deg, black 90deg, transparent 180deg, black 270deg)",
                    WebkitMaskImage:
                      "conic-gradient(from 0deg, transparent 0deg, black 90deg, transparent 180deg, black 270deg)",
                  }}
                />
                {/* logo image */}
                <span className="absolute inset-2 rounded-full bg-[#0e0e0e] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Ghar Bar Cafe"
                    width={96}
                    height={96}
                    priority
                    className="w-full h-full object-contain p-1"
                  />
                </span>
              </motion.div>

              {/* title — staggered character reveal */}
              <h1
                aria-label={TITLE}
                className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.05em]"
              >
                {TITLE.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: i < loadedLetters ? 1 : 0,
                      y: i < loadedLetters ? 0 : 20,
                    }}
                    transition={{ duration: 0.35 }}
                    className={
                      char === " " ? "inline-block w-3 md:w-4" : "inline-block"
                    }
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

              {/* divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="origin-center mx-auto mt-6 md:mt-8 h-[1px] w-32 bg-[#e6a34d]"
              />

              {/* progress bar */}
              <div className="mt-10 md:mt-14 max-w-xs md:max-w-md mx-auto">
                <div className="flex items-center justify-between text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 mb-3">
                  <span>Brewing the page</span>
                  <span className="font-mono text-[#e6a34d] tabular-nums">
                    {percent.toString().padStart(3, "0")}%
                  </span>
                </div>
                <div className="relative h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#e6a34d] via-[#f5c879] to-[#e6a34d] rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                  {/* shimmer */}
                  <motion.div
                    className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "600%" }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
