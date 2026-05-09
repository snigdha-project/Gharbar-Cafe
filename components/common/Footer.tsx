"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";

const footerLinks = {
  quickLinks: [
    { name: "Our Story", href: "/about" },
    { name: "Accommodations", href: "/rooms" },
    { name: "Dining & Cafe", href: "/cafe" },
    { name: "Journal", href: "/blogs" },
  ],
  legal: [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Cancellation Policy", href: "/refund-policy" },
    { name: "FAQ", href: "/faq" },
  ],
  partners: [
    {
      name: "MMT",
      logo: "/av-brand-logo/mmt.avif",
      href: "https://www.makemytrip.com/hotels/ghar_bar_boutique_stay_cafe-details-dharamshala.html",
    },
    {
      name: "Goibibo",
      logo: "/av-brand-logo/goibibo.png",
      href: "https://www.goibibo.com/hotels/ghar-bar-boutique-stay-cafe-hotel-in-dharamshala-4795627346506110508/",
    },
    {
      name: "Agoda",
      logo: "/av-brand-logo/agoda.png",
      href: "https://agoda.com/ghar-bar-boutique-stay-cafe/hotel/rakkar-in.html?cid=1844104",
    },
    {
      name: "TripAdvisor",
      logo: "/av-brand-logo/Tripadvisor.png",
      href: "https://www.tripadvisor.in/Hotel_Review-g13328774-d27532600-Reviews-Ghar_Bar_Boutique_Stay_Cafe-Mohli_Lahrandi_Dharamsala_Kangra_District_Himachal_Prad.html",
    },
    {
      name: "EaseMyTrip",
      logo: "/av-brand-logo/emt.png",
      href: "https://www.easemytrip.com/hotels/ghar-bar-boutique-stay-and-cafe-4524557/",
    },
    {
      name: "JustDial",
      logo: "/av-brand-logo/JD.png",
      href: "https://www.justdial.com/Kangra/Gharbar-Boutique-Stay-cafe-Khaniara/9999P1892-1892-250414214904-T2N7_BZDET",
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#a3a3a3] pt-20 pb-10 border-t border-white/5">
      <div className="w-full px-6 md:px-10 lg:px-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-start">
            <div className="relative w-20 h-20">
              <Image
                src="/logo.png"
                alt="Gharbar Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-balance opacity-80">
              A premium sanctuary where luxury meets nature. Experience the soul
              of Dharamshala at Gharbar Boutique Stay & Cafe.
            </p>
            <div className="flex gap-6 text-xl">
              <Link
                href="https://www.instagram.com/gharbarcafe_/"
                target="_blank"
                className="hover:text-[#D4AF37] transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61577731310526"
                target="_blank"
                className="hover:text-[#D4AF37] transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-white font-bold tracking-[0.2em] text-xs uppercase mb-8">
              Explore
            </h4>
            <ul className="space-y-4 text-[13px]">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-[#D4AF37] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-[0.2em] text-xs uppercase mb-8">
              Contact Us
            </h4>
            <div className="space-y-6 text-[13px]">
              <div className="flex items-start gap-4 group">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-[#D4AF37] mt-1 group-hover:scale-110 transition-transform"
                />
                <p className="leading-6">
                  Patola RD, Village. Khanyara,
                  <br />
                  Tehsil Dharamshala, Distt. Kangra
                  <br />
                  Himachal Pradesh 176057
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-[#D4AF37] group-hover:scale-110 transition-transform"
                />
                <a
                  href="tel:+919882788885"
                  className="hover:text-white transition-colors"
                >
                  +91 9882788885
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-[#D4AF37] group-hover:scale-110 transition-transform"
                />
                <a
                  href="mailto:bookgharbar@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  bookgharbar@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Also Available In Section */}
          <div className="lg:pl-5">
            <h4 className="text-white font-bold tracking-[0.2em] text-xs uppercase mb-8">
              Also Available In
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {footerLinks.partners.map((partner) => (
                <Link
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  className="relative h-10 w-full bg-white/5 rounded-sm flex items-center justify-center p-2 hover:bg-white/10 transition-all border border-white/5"
                >
                  <div className="relative w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-60">
            © {new Date().getFullYear()} Gharbar Boutique Stay & Cafe. All
            Rights Reserved.
          </p>
          <div className="flex gap-6 text-[10px] tracking-[0.1em] uppercase">
            {footerLinks.legal.slice(0, 2).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white opacity-40"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
