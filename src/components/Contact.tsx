import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { buildGeneralWhatsAppUrl } from '../utils/booking';
import { AcademicCanvas3D } from '../three/AcademicCanvas3D';

export const Contact: React.FC = () => {
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#101D36] py-20 sm:py-24 lg:py-28 text-white"
    >
      {/* Subtle 3D Illuminated Orbs & Optical Glass Spheres */}
      <AcademicCanvas3D
        variant="contact"
        className="pointer-events-none absolute inset-0 opacity-45"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Column: Direct Contact & Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2B84B]">
              Connect With Us
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
              Opening Hours &amp; Direct Contact
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              Reach out directly to {ACADEMY_INFO.teacherName} for course enquiries, demo
              timings, or in-person visits at {ACADEMY_INFO.brandDisplay}.
            </p>

            {/* Clickable Phone & Address Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={ACADEMY_INFO.phoneHref}
                className="group rounded-2xl border border-white/15 bg-[#182B4E]/80 p-5 transition-all duration-150 hover:border-[#F2B84B]/60 hover:bg-[#182B4E]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101D36] text-[#F2B84B]">
                  <Phone className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Phone / WhatsApp
                </p>
                <p className="mt-1 font-serif text-lg font-bold text-white group-hover:text-[#F2B84B] tabular-nums">
                  {ACADEMY_INFO.phoneDisplay}
                </p>
              </a>

              <a
                href={ACADEMY_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/15 bg-[#182B4E]/80 p-5 transition-all duration-150 hover:border-[#F2B84B]/60 hover:bg-[#182B4E]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101D36] text-[#F2B84B]">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Academy Location
                </p>
                <p className="mt-1 text-sm font-medium text-white group-hover:text-[#F2B84B]">
                  9/1, Bireswar Dhole Ln, Bonhoogly, Kolkata 700035
                </p>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Opening Hours Schedule & 3 Functional Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-2xl border border-white/15 bg-[#182B4E]/85 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 pb-5 border-b border-white/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#101D36] text-[#F2B84B]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Opening Hours
                  </h3>
                  <p className="text-xs text-slate-300">
                    Open all seven days for academic guidance
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3.5">
                {ACADEMY_INFO.openingHours.map((slot) => (
                  <div
                    key={slot.days}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-xl bg-[#101D36]/75 px-4 py-3.5 border border-white/10"
                  >
                    <span className="text-sm font-semibold text-white">
                      {slot.days}
                    </span>
                    <span className="text-sm font-semibold text-[#F2B84B] tabular-nums">
                      {slot.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Three Functional Action Buttons: CALL NOW, WHATSAPP, GET DIRECTIONS */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={ACADEMY_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B84B] px-4 py-3.5 text-xs sm:text-sm font-bold text-[#101D36] shadow-sm transition-all duration-150 hover:bg-[#F6C96E] whitespace-nowrap"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>CALL NOW</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 text-xs sm:text-sm font-bold text-[#091121] shadow-sm transition-all duration-150 hover:bg-[#20bd5a] whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>WHATSAPP</span>
                </a>

                <a
                  href={ACADEMY_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-[#101D36] px-4 py-3.5 text-xs sm:text-sm font-bold text-white transition-all duration-150 hover:border-[#F2B84B] hover:text-[#F2B84B] whitespace-nowrap"
                >
                  <Navigation className="h-4 w-4 shrink-0" />
                  <span>GET DIRECTIONS</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
