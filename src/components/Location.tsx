import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Sparkles } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

export const Location: React.FC = () => {
  return (
    <section
      id="location"
      className="bg-[#FBF9FF] py-20 sm:py-24 lg:py-28 text-[#180F2E]"
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
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-800">
              <Sparkles className="h-3 w-3 text-purple-600" />
              <span>Campus Address</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#180F2E] text-balance">
              Visit ProBio Academy
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#180F2E]/85">
              Conveniently situated in Bonhoogly, Baranagar, Kolkata for in-person NEET academic
              coaching and student consultations.
            </p>

            <div className="mt-7 rounded-3xl border border-purple-500/20 bg-white p-6 sm:p-7 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#13092D] text-amber-300">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#180F2E]">
                    {ACADEMY_INFO.brandDisplay}
                  </h3>
                  <address className="mt-2 not-italic text-sm sm:text-base leading-relaxed text-[#180F2E]/90">
                    {ACADEMY_INFO.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-purple-500/15">
                <a
                  href={ACADEMY_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-purple-900/20 transition-all duration-150 hover:from-violet-500 hover:to-purple-500 whitespace-nowrap"
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
            <div className="overflow-hidden rounded-3xl border border-purple-500/25 bg-white p-2.5 shadow-xl">
              <div className="overflow-hidden rounded-2xl bg-purple-950/20 aspect-[16/11] sm:aspect-[16/10] w-full">
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
