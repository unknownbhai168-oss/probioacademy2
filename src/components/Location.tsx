import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

export const Location: React.FC = () => {
  return (
    <section
      id="location"
      className="bg-[#F8F9FC] py-20 sm:py-24 lg:py-28 text-[#202A3A]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Column: Location Card & Directions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2855C5]">
              Campus Address
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#101D36] text-balance">
              Visit ProBio Academy
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#202A3A]/85">
              Conveniently situated in Bonhoogly, Baranagar, Kolkata for in-person academic
              coaching and parent consultations.
            </p>

            <div className="mt-7 rounded-2xl border border-[#101D36]/12 bg-white p-6 sm:p-7 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#101D36] text-[#F2B84B]">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#101D36]">
                    {ACADEMY_INFO.brandDisplay}
                  </h3>
                  <address className="mt-2 not-italic text-sm sm:text-base leading-relaxed text-[#202A3A]/90">
                    {ACADEMY_INFO.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#101D36]/10">
                <a
                  href={ACADEMY_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#2855C5] px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition-all duration-150 hover:bg-[#101D36] whitespace-nowrap"
                >
                  <Navigation className="h-4 w-4 shrink-0" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Embedded Google Maps Container */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-2xl border border-[#101D36]/15 bg-white p-2 shadow-lg">
              <div className="overflow-hidden rounded-xl bg-slate-100 aspect-[16/11] sm:aspect-[16/10] w-full">
                <iframe
                  title="ProBio Academy Location Map — 9/1, Bireswar Dhole Ln, Bonhoogly, Baranagar, Kolkata"
                  src={ACADEMY_INFO.googleMapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
