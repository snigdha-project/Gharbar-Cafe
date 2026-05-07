"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCheckCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bookingPlatforms = [
    {
      name: "MakeMyTrip",
      logo: "/av-brand-logo/mmt.avif",
      url: "https://www.makemytrip.com/hotels/ghar_bar_boutique_stay_cafe-details-dharamshala.html",
    },
    {
      name: "Goibibo",
      logo: "/av-brand-logo/goibibo.png",
      url: "https://www.goibibo.com/hotels/ghar-bar-boutique-stay-cafe-hotel-in-dharamshala-4795627346506110508/",
    },
    {
      name: "Agoda",
      logo: "/av-brand-logo/agoda.png",
      url: "https://agoda.com/ghar-bar-boutique-stay-cafe/hotel/rakkar-in.html?cid=1844104",
    },
    {
      name: "TripAdvisor",
      logo: "/av-brand-logo/Tripadvisor.png",
      url: "https://www.tripadvisor.in/Hotel_Review-g13328774-d27532600-Reviews-Ghar_Bar_Boutique_Stay_Cafe-Mohli_Lahrandi_Dharamsala_Kangra_District_Himachal_Prad.html",
    },
    {
      name: "EaseMyTrip",
      logo: "/av-brand-logo/emt.png",
      url: "https://www.easemytrip.com/hotels/ghar-bar-boutique-stay-and-cafe-4524557/",
    },
    {
      name: "JustDial",
      logo: "/av-brand-logo/JD.png",
      url: "https://www.justdial.com/Kangra/Gharbar-Boutique-Stay-cafe-Khaniara/9999P1892-1892-250414214904-T2N7_BZDET",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch(form.action, {
        method: "POST",
        body: formData,
        mode: "no-cors", // Zoho often requires no-cors for simple HTML posts
      });
      // Even if it's no-cors, we assume success after the post is sent
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF3E0] min-h-screen font-sans overflow-x-hidden relative">
      {/* --- SUCCESS POPUP --- */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitted(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#1A1A1A] border-2 border-[#D4AF37] p-10 md:p-16 max-w-lg w-full text-center shadow-2xl"
            >
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-[#D4AF37] transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-[#D4AF37] text-6xl mb-6"
              />
              <h2 className="text-white text-3xl font-serif mb-4">
                Thank You!
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Your message has been received. Our team at Gharbar will get
                back to you shortly to assist with your inquiry.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#D4AF37] text-[#1A1A1A] px-10 py-3 uppercase tracking-widest font-bold text-xs hover:bg-[#B8860B] transition-colors"
              >
                Back to Site
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center bg-[#1A1A1A]">
        <div
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('/AboutUsSec-big.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-black/50 z-[1]" />

        <div className="relative z-10 text-center text-white px-4">
          <motion.h4
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            className="text-[#D4AF37] uppercase text-xs mb-4 font-bold"
          >
            Connect With Us
          </motion.h4>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif"
          >
            Contact{" "}
            <span className="italic font-light text-[#D4AF37]">Gharbar</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column: Info & Booking */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-bold mb-6">
                Reservations & Inquiries
              </h2>
              <h3 className="text-4xl font-serif text-[#1A1A1A] mb-10 leading-tight">
                We are here to host <br />
                your next escape.
              </h3>

              <div className="space-y-8 text-[#1A1A1A]">
                <a
                  href="tel:+919882788885"
                  className="flex items-center group w-fit"
                >
                  <div className="w-14 h-14 bg-[#1A1A1A] flex items-center justify-center rounded-full mr-5 group-hover:bg-[#D4AF37] transition-all duration-500 shadow-lg">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-[#D4AF37] group-hover:text-white"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                      Call Us
                    </p>
                    <p className="text-xl font-medium tracking-tight">
                      +91 9882788885
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:bookgharbar@gmail.com"
                  className="flex items-center group w-fit"
                >
                  <div className="w-14 h-14 bg-[#1A1A1A] flex items-center justify-center rounded-full mr-5 group-hover:bg-[#D4AF37] transition-all duration-500 shadow-lg">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-[#D4AF37] group-hover:text-white"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                      Email Us
                    </p>
                    <p className="text-xl font-medium tracking-tight">
                      bookgharbar@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start">
                  <div className="w-14 h-14 bg-[#1A1A1A] flex items-center justify-center rounded-full mr-5 shrink-0 shadow-lg">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                      Location
                    </p>
                    <p className="text-lg leading-relaxed max-w-sm">
                      Patola RD, Village. Khanyara, Tehsil Dharamshala, Distt.
                      Kangra (H.P.) 176057
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Platforms with Logos */}
            <div className="pt-10 border-t border-[#D4AF37]/20">
              <h4 className="text-[#1A1A1A] font-serif text-xl mb-8 italic">
                Available on Platforms
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {bookingPlatforms.map((platform, idx) => (
                  <motion.a
                    whileHover={{ y: -3 }}
                    key={idx}
                    href={platform.url}
                    target="_blank"
                    className="bg-white p-4 flex flex-col items-center justify-center shadow-sm border border-transparent hover:border-[#D4AF37]/40 transition-all rounded-sm"
                  >
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="h-8 object-contain filter grayscale hover:grayscale-0 transition-all"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Zoho Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] p-10 md:p-16 shadow-2xl"
          >
            <h3 className="text-3xl font-serif text-white mb-2">Write to Us</h3>
            <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-12">
              Reservations & Inquiries
            </p>

            <form
              action="https://forms.zohopublic.in/bookgharbargm1/form/Gharbarcontact/formperma/x4AlGrg0KbUMZg8M3-mt92J3ZBDbzgg7_rqabX_iIBs/htmlRecords/submit"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Maintain all Zoho hidden fields */}
              <input type="hidden" name="zf_referrer_name" value="" />
              <input type="hidden" name="zf_redirect_url" value="" />
              <input type="hidden" name="zc_gad" value="" />

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="SingleLine"
                  required
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                  Phone Number *
                </label>
                <input
                  type="text"
                  name="SingleLine1"
                  required
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                  Message
                </label>
                <textarea
                  name="MultiLine"
                  rows={3}
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#D4AF37] outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <motion.button
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-5 uppercase tracking-[0.3em] font-black text-xs transition-all shadow-xl ${isSubmitting ? "bg-gray-600 text-gray-400" : "bg-[#D4AF37] text-[#1A1A1A]"}`}
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
