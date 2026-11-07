import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  HeartHandshake,
  Maximize2,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

export const StudentBatchShowcase: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(true);

  return (
    <section
      id="students-batch"
      className="relative overflow-hidden bg-[#FBF9FF] py-20 sm:py-24 lg:py-28 text-[#180F2E]"
    >
      {/* Subtle purplish ambient radial highlights */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/3 -left-32 h-[450px] w-[450px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 right-0 h-[480px] w-[480px] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Real Classroom Student Photograph (PNG Format) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative violet & gold glow outline */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-violet-400/20 to-amber-400/25 blur-md"
              />

              {/* Glassmorphic Image Frame */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/30 bg-[#13092D] shadow-2xl group">
                <div className="aspect-[4/3] w-full overflow-hidden bg-purple-950">
                  {imgLoaded ? (
                    <img
                      src={ACADEMY_INFO.studentGroupPhotoUrl}
                      alt="Shubhajit Sir's NEET Students and Classroom Batch at ProBio Academy"
                      referrerPolicy="no-referrer"
                      onError={() => setImgLoaded(false)}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center text-white">
                      <Users className="h-12 w-12 text-violet-400" />
                      <p className="mt-3 font-serif text-lg font-bold">ProBio Academy Classroom Batch</p>
                      <p className="text-xs text-violet-300">NEET Aspirants at Baranagar, Kolkata</p>
                    </div>
                  )}
                </div>

                {/* Subtle dark gradient scrim at bottom */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B071E] via-[#0B071E]/60 to-transparent"
                />

                {/* Interactive Zoom / Enlarge Button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="Enlarge classroom photograph"
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/80 text-white border border-purple-400/40 backdrop-blur-md transition-all hover:bg-violet-600 hover:scale-105 cursor-pointer shadow-lg"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                {/* On-image caption badge */}
                <div className="relative z-10 -mt-16 px-6 pb-5 text-white">
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-purple-950/85 px-3 py-1 text-xs font-semibold text-violet-200 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real Classroom · Real Aspirants</span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl sm:text-2xl font-bold text-white">
                    Our NEET Classroom Community
                  </h3>
                  <p className="text-xs sm:text-sm text-violet-300">
                    Class 11, Class 12 &amp; Droppers Batch · Baranagar Center, Kolkata
                  </p>
                </div>
              </div>

              {/* Floating Batch Credibility Badge */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 hidden sm:flex items-center gap-3 rounded-2xl border border-purple-400/30 bg-white/95 p-3.5 shadow-xl backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white">
                  <Sparkles className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs font-bold text-purple-950">Engaged &amp; Motivated</p>
                  <p className="text-[11px] text-purple-800/80">Supportive Peer Learning</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Classroom Culture & Focus */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-100/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-800">
              <Users className="h-3.5 w-3.5 text-purple-700" />
              <span>Inside ProBio Academy</span>
            </div>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#180F2E] text-balance leading-tight">
              A Classroom Where Every Question Matters.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#180F2E]/85">
              Preparing for NEET UG requires consistent conceptual clarity and an open environment
              where students never feel hesitant to ask questions.
            </p>

            <p className="mt-3 text-base leading-relaxed text-[#180F2E]/85">
              At ProBio Academy, Shubhajit Sir leads interactive batch sessions for{' '}
              <strong className="font-semibold text-purple-900">
                Class 11, Class 12, and Droppers / Repeaters
              </strong>
              , fostering thoughtful peer discussion, line-by-line NCERT analysis, and one-on-one
              doubt clearance.
            </p>

            {/* Key Classroom Pillars */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-purple-500/15 bg-white p-4 shadow-xs transition-colors hover:border-purple-500/35">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#180F2E]">
                    Focused Batch Sizes &amp; Personal Mentorship
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-[#180F2E]/80 leading-relaxed">
                    Unlike overcrowded commercial factories, small batches ensure every student’s
                    progress, test speed, and weak topics are tracked individually.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-purple-500/15 bg-white p-4 shadow-xs transition-colors hover:border-purple-500/35">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#180F2E]">
                    Daily MCQ Drills &amp; Negative Marking Control
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-[#180F2E]/80 leading-relaxed">
                    Classroom practice focuses on Assertion-Reasoning questions and time management
                    tactics so aspirants gain exam hall composure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-purple-500/15 bg-white p-4 shadow-xs transition-colors hover:border-purple-500/35">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#180F2E]">
                    Dedicated Space for Droppers &amp; Repeaters
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-[#180F2E]/80 leading-relaxed">
                    Targeted guidance designed to restore confidence, eliminate past mistakes, and
                    propel repeater scores past the 340+ mark in Biology.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal for High-Resolution View */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full overflow-hidden rounded-2xl border border-purple-500/30 bg-[#0B071E] p-4 text-white shadow-2xl cursor-default"
            >
              <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                <div>
                  <p className="font-serif text-lg font-bold text-white">
                    ProBio Academy — Classroom Batch
                  </p>
                  <p className="text-xs text-violet-300">
                    Shubhajit Sir with NEET Aspirants at Baranagar, Kolkata
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="rounded-lg p-2 text-violet-300 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl bg-purple-950">
                <img
                  src={ACADEMY_INFO.studentGroupPhotoUrl}
                  alt="Students of ProBio Academy"
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[75vh] object-contain mx-auto"
                />
              </div>

              <div className="mt-3 text-center text-xs text-violet-300">
                Real Classroom Photography · Preserved in High-Resolution PNG
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
