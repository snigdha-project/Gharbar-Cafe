"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const footerLinks = {
  quickLinks: [
    { name: "Our Story", href: "/about" },
    { name: "Accommodations", href: "/rooms" },
    { name: "Dining & Barcafe", href: "/experience" },
    { name: "Spa & Wellness", href: "/spa" },
    { name: "Journal", href: "/blogs" },
  ],
  legal: [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Cancellation Policy", href: "/refund-policy" },
    { name: "FAQ", href: "/faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#a3a3a3] pt-20 pb-10 border-t border-white/5">
      <div className="w-full px-6 md:px-10 lg:px-16">
        {/* Main Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-start">
            <div className="relative w-20 h-20">
              <Image
                src="/logo.png"
                alt="Ghar Barcafe Logo"
                fill
                className="object-contain" // Removed brightness-0 invert to keep original colors
              />
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-balance">
              A premium sanctuary where luxury meets nature, established in 2022
              to offer unparalleled hospitality experiences.
            </p>
            <div className="flex gap-6 text-xl">
              <Link
                href="#"
                className="hover:text-[#e6a34d] transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link
                href="#"
                className="hover:text-[#e6a34d] transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
              <Link
                href="#"
                className="hover:text-[#e6a34d] transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-white font-bold tracking-[0.2em] text-xs uppercase mb-8">
              Quick Links
            </h4>
            <ul className="space-y-4 text-[13px]">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:pl-5">
            <h4 className="text-white font-bold tracking-[0.2em] text-xs uppercase mb-8">
              Legal
            </h4>
            <ul className="space-y-4 text-[13px]">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h4 className="text-white font-bold tracking-[0.2em] text-xs uppercase mb-8">
              Contact Us
            </h4>
            <div className="space-y-6 text-[13px]">
              <div className="flex items-start gap-4 group">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-[#e6a34d] mt-1 group-hover:scale-110 transition-transform"
                />
                <p className="leading-6">
                  123 Serenity Lane,
                  <br />
                  Mountain View, CA 94041
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-[#e6a34d] group-hover:scale-110 transition-transform"
                />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-4 group">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-[#e6a34d] group-hover:scale-110 transition-transform"
                />
                <p>hello@gharbarcafe.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-60">
            © {new Date().getFullYear()} Ghar Barcafe. All Rights Reserved.
          </p>
          <p className="text-[10px] tracking-[0.1em] opacity-40">
            Designed with excellence in West Bengal
          </p>
        </div>
      </div>
    </footer>
  );
}
