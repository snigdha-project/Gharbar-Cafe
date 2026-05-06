"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

const ContactPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const bookingPartners = [
    {
      name: "MakeMyTrip",
      url: "https://www.makemytrip.com/hotels/ghar_bar_boutique_stay_cafe-details-dharamshala.html",
    },
    {
      name: "Goibibo",
      url: "https://www.goibibo.com/hotels/ghar-bar-boutique-stay-cafe-hotel-in-dharamshala-4795627346506110508/",
    },
    {
      name: "Agoda",
      url: "https://agoda.com/ghar-bar-boutique-stay-cafe/hotel/rakkar-in.html?cid=1844104",
    },
    {
      name: "TripAdvisor",
      url: "https://www.tripadvisor.in/Hotel_Review-g13328774-d27532600-Reviews-Ghar_Bar_Boutique_Stay_Cafe-Mohli_Lahrandi_Dharamsala_Kangra_District_Himachal_Prad.html",
    },
    {
      name: "EaseMyTrip",
      url: "https://www.easemytrip.com/hotels/ghar-bar-boutique-stay-and-cafe-4524557/",
    },
    {
      name: "JustDial",
      url: "https://www.justdial.com/Kangra/Gharbar-Boutique-Stay-cafe-Khaniara/9999P1892-1892-250414214904-T2N7_BZDET",
    },
  ];

  return (
    <main className="bg-[#F9F5F0] min-h-screen font-sans text-[#4A4A4A]">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center bg-black">
        <div
          className="absolute inset-0 z-0 opacity-60 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }} // Add your lobby image here
        />
        <div className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#E2A856] uppercase tracking-[0.3em] text-sm mb-2 block"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl text-white font-serif"
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* Left Side: Contact Info */}
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl font-serif mb-6 text-[#111]">
            We'd Love to Hear From You
          </h2>
          <p className="mb-10 text-gray-600 leading-relaxed">
            Whether you have a question about our rooms, the property, or our
            services, our dedicated team is here to help.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="text-[#E2A856] mt-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} width={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#111]">Our Location</h4>
                <p className="text-sm">
                  Patola RD, Village. Khanyara, Tehsil Dharamshala,
                  <br />
                  Distt. Kangra (H.P.) 176057
                </p>
                <a
                  href="https://www.google.com/travel/search?..."
                  className="text-[#E2A856] text-xs font-bold uppercase mt-2 inline-block border-b border-[#E2A856]"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-[#E2A856] mt-1">
                <FontAwesomeIcon icon={faPhone} width={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#111]">Phone Number</h4>
                <p className="text-sm">+91 9882788885</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-[#E2A856] mt-1">
                <FontAwesomeIcon icon={faEnvelope} width={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#111]">Email Address</h4>
                <p className="text-sm">bookgharbar@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="uppercase tracking-widest text-xs font-bold mb-4">
              Connect With Us
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61577731310526"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#E2A856] hover:text-white transition-all"
              >
                <FontAwesomeIcon icon={faFacebookF} width={14} />
              </a>
              <a
                href="https://www.instagram.com/gharbarcafe_/"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#E2A856] hover:text-white transition-all"
              >
                <FontAwesomeIcon icon={faInstagram} width={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Zoho Form Integration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 shadow-xl rounded-sm"
        >
          <h3 className="text-2xl font-serif mb-8 text-[#111]">
            Send us a Message
          </h3>

          <form
            action="https://forms.zohopublic.in/bookgharbargm1/form/Gharbarcontact/formperma/x4AlGrg0KbUMZg8M3-mt92J3ZBDbzgg7_rqabX_iIBs/htmlRecords/submit"
            name="form"
            id="form"
            method="POST"
            acceptCharset="UTF-8"
            className="space-y-6"
          >
            <input type="hidden" name="zf_referrer_name" value="" />
            <input type="hidden" name="zf_redirect_url" value="" />
            <input type="hidden" name="zc_gad" value="" />

            <div>
              <label className="block text-xs uppercase font-bold mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="SingleLine"
                required
                className="w-full border-b border-gray-300 py-2 focus:border-[#E2A856] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold mb-2">
                Phone Number *
              </label>
              <input
                type="text"
                name="SingleLine1"
                required
                className="w-full border-b border-gray-300 py-2 focus:border-[#E2A856] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="Email"
                className="w-full border-b border-gray-300 py-2 focus:border-[#E2A856] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold mb-2">
                How can we help you?
              </label>
              <textarea
                name="MultiLine"
                rows={3}
                className="w-full border-b border-gray-300 py-2 focus:border-[#E2A856] outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E2A856] text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-[#c98e3d] transition-colors mt-4"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </section>

      {/* Booking Partners Section */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#E2A856] uppercase tracking-widest text-xs font-bold mb-2 block">
            Partners
          </span>
          <h2 className="text-3xl font-serif mb-12 text-[#111]">
            Also Available On
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bookingPartners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 border border-gray-100 flex items-center justify-center text-sm font-medium hover:shadow-md hover:border-[#E2A856] transition-all grayscale hover:grayscale-0"
              >
                {partner.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[450px] w-full bg-gray-200 overflow-hidden relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3375.9723485055043!2d76.3533242!3d32.2049873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b53d42551e2b5%3A0x6bbe90bc626e349e!2sGhar%20Bar%20Boutique%20Stay%20%26%20Cafe!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: "grayscale(1) contrast(1.2) invert(0.05)",
          }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
    </main>
  );
};

export default ContactPage;
