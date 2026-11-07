import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, MessageCircle, Navigation, Phone, Sparkles } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { buildGeneralWhatsAppUrl } from '../utils/booking';

export const Contact: React.FC = () => {
  const whatsappUrl = buildGeneralWhatsAppUrl('Hello Sir! I am interested in joining ProBio Academy for NEET UG coaching.');

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0B071E] py-20 sm:py-24 lg:py-28 text-white"
    >
      {/* Purplish ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
        }}
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
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-purple-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>Connect With Us</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
              Opening Hours &amp; Direct Contact
            </h2>
            <p className="mt-3 text-base leading-relaxed text-violet-200/85">
              Connect directly with {ACADEMY_INFO.teacherName} for NEET course enquiries, dropper
              batch availability, or demo timings at {ACADEMY_INFO.brandDisplay}.
            </p>

            {/* Clickable Phone & Address Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={ACADEMY_INFO.phoneHref}
                className="group rounded-2xl border border-purple-500/25 bg-[#170E38]/85 p-5 transition-all duration-150 hover:border-amber-400/60 hover:bg-[#1D1042]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950 border border-purple-500/30 text-amber-300">
                  <Phone className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-violet-300">
                  Phone / WhatsApp
                </p>
                <p className="mt-1 font-serif text-lg font-bold text-white group-hover:text-amber-300 tabular-nums">
                  {ACADEMY_INFO.phoneDisplay}
                </p>
              </a>

              <a
                href={ACADEMY_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-purple-500/25 bg-[#170E38]/85 p-5 transition-all duration-150 hover:border-amber-400/60 hover:bg-[#1D1042]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950 border border-purple-500/30 text-amber-300">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-violet-300">
                  Academy Location
                </p>
                <p className="mt-1 text-sm font-medium text-white group-hover:text-amber-300">
                  9/1, Bireswar Dhole Ln, Bonhoogly, Kolkata 700035
                </p>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Opening Hours Schedule & 3 Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl border border-purple-500/25 bg-[#170E38]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 pb-5 border-b border-purple-500/20">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-950 border border-purple-500/30 text-amber-300">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Opening Hours
                  </h3>
                  <p className="text-xs text-violet-300">
                    Open seven days a week for classes &amp; consultations
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3.5">
                {ACADEMY_INFO.openingHours.map((slot) => (
                  <div
                    key={slot.days}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-xl bg-purple-950/70 px-4 py-3.5 border border-purple-500/20"
                  >
                    <span className="text-sm font-semibold text-white">
                      {slot.days}
                    </span>
                    <span className="text-sm font-bold text-amber-300 tabular-nums">
                      {slot.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Three Functional Action Buttons */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={ACADEMY_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3.5 text-xs sm:text-sm font-bold text-[#13092D] shadow-sm transition-all duration-150 hover:from-amber-300 hover:to-amber-400 whitespace-nowrap"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>CALL NOW</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 text-xs sm:text-sm font-bold text-black shadow-sm transition-all duration-150 hover:bg-[#20bd5a] whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>WHATSAPP</span>
                </a>

                <a
                  href={ACADEMY_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-400/30 bg-purple-950 px-4 py-3.5 text-xs sm:text-sm font-bold text-white transition-all duration-150 hover:border-amber-400 hover:text-amber-300 whitespace-nowrap"
                >
                  <Navigation className="h-4 w-4 shrink-0" />
                  <span>DIRECTIONS</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
