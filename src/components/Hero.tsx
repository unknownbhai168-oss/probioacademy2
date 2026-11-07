import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Dna, GraduationCap, Sparkles, Users } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { HyperRealisticDnaCanvas } from './HyperRealisticDnaCanvas';
import { R3FSceneCanvas } from '../three/R3FSceneCanvas';

interface HeroProps {
  onExploreCourses: () => void;
  onBookDemo: () => void;
  onViewStudents?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCourses, onBookDemo, onViewStudents }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-[94vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-[#0B071E] text-white pt-24 pb-10 sm:pt-28 sm:pb-12"
    >
      {/* Animated Bioluminescent Purplish & Cyan Gradient Field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-ambient-purple absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 20% 25%, rgba(124, 58, 237, 0.35) 0%, rgba(11, 7, 30, 0) 70%)',
          }}
        />
        <div
          className="animate-ambient-purple absolute inset-0"
          style={{
            animationDelay: '-6s',
            background:
              'radial-gradient(ellipse 55% 50% at 80% 75%, rgba(6, 182, 212, 0.22) 0%, rgba(11, 7, 30, 0) 68%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(rgba(192, 132, 252, 0.08) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 90%)',
          }}
        />
      </div>

      {/* Floating 3D Background Objects */}
      <R3FSceneCanvas
        variant="hero"
        className="absolute inset-0 z-0 opacity-80"
      />

      {/* Main Hero Content Grid */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: NEET-Focused Headline, Details & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-purple-950/70 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Dedicated NEET UG Biology Coaching · Kolkata</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-serif font-bold tracking-tight text-white text-balance leading-[1.08]"
              style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.25rem)' }}
            >
              Master NEET Biology.{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
                Score 340+ with Confidence.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg leading-relaxed text-violet-100/90"
            >
              Specialised medical entrance preparation for{' '}
              <strong className="text-white font-semibold">Class 11, Class 12, and Droppers / Repeaters</strong>.
              Line-by-line NCERT mastery, 3D molecular visualization, and disciplined Assertion-Reasoning
              deduction guided directly by Shubhajit Sir.
            </motion.p>

            {/* Verified Target Batches Bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs sm:text-sm"
            >
              <span className="rounded-lg bg-violet-950/80 px-2.5 py-1 border border-violet-500/30 text-violet-200">
                Target NEET Droppers
              </span>
              <span className="rounded-lg bg-violet-950/80 px-2.5 py-1 border border-violet-500/30 text-violet-200">
                Class 12 Boards + NEET
              </span>
              <span className="rounded-lg bg-violet-950/80 px-2.5 py-1 border border-violet-500/30 text-violet-200">
                Class 11 NEET Foundation
              </span>
              <span className="rounded-lg bg-violet-950/80 px-2.5 py-1 border border-violet-500/30 text-violet-200">
                Class 9–10 Pre-Medical
              </span>
            </motion.div>

            {/* Primary & Secondary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                type="button"
                onClick={onBookDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-purple-900/40 transition-all duration-150 hover:from-violet-500 hover:to-fuchsia-500 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Book a Free Demo Class</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={onExploreCourses}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-[#1D1042]/80 px-6 py-3.5 text-sm sm:text-base font-semibold text-violet-200 transition-all duration-150 hover:border-violet-400 hover:bg-violet-900/50 hover:text-white whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                <span>Explore NEET Batches</span>
              </button>

              <a
                href="#dna-explorer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-5 py-3.5 text-xs sm:text-sm font-semibold text-cyan-300 transition-all duration-150 hover:border-cyan-400 hover:bg-cyan-900/50 whitespace-nowrap"
              >
                <Dna className="h-4 w-4 text-cyan-400" />
                <span>Explore 3D DNA</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Mentor & Real Student Batch Dual-Card Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center gap-4"
          >
            {/* Shubhajit Sir's Photo Card */}
            <div className="relative w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[420px]">
              <div
                aria-hidden="true"
                className="absolute -inset-2.5 rounded-2xl bg-gradient-to-tr from-violet-600/40 via-purple-500/20 to-amber-400/20 blur-sm"
              />

              <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-[#170E38] shadow-2xl">
                <div className="aspect-[4/4.3] w-full overflow-hidden bg-purple-950">
                  {!imgFailed ? (
                    <img
                      src={ACADEMY_INFO.teacherPhotoUrl}
                      alt="Shubhajit Sir, Academic Mentor at ProBio Academy"
                      referrerPolicy="no-referrer"
                      onError={() => setImgFailed(true)}
                      className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-purple-950 p-8 text-center">
                      <GraduationCap className="h-14 w-14 text-amber-400" />
                      <p className="mt-4 font-serif text-xl font-semibold text-white">
                        {ACADEMY_INFO.teacherName}
                      </p>
                      <p className="mt-1 text-sm text-violet-300">{ACADEMY_INFO.brandDisplay}</p>
                    </div>
                  )}
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B071E] via-[#0B071E]/30 to-transparent"
                />

                <div className="relative z-10 -mt-20 px-5 pb-5 pt-6">
                  <p className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {ACADEMY_INFO.teacherName}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-amber-300 font-medium">
                    Engineering · LL.B. · English Honours
                  </p>
                  <p className="mt-0.5 text-xs text-violet-300">
                    NEET UG Biology &amp; Medical Entrance Mentor
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Students Batch Preview Pill */}
            <a
              href="#students-batch"
              className="w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[420px] flex items-center justify-between gap-3 rounded-xl border border-violet-500/30 bg-[#1D1042]/90 p-3 shadow-lg transition-all hover:border-violet-400 hover:bg-[#251554]"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 overflow-hidden rounded-lg border border-violet-400/40 bg-purple-950 shrink-0">
                  <img
                    src={ACADEMY_INFO.studentGroupPhotoUrl}
                    alt="Classroom batch thumbnail"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Our NEET Classroom Batch</p>
                  <p className="text-[11px] text-violet-300">Class 11, 12 &amp; Dropper Aspirants</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                <span>View</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 mt-8 flex justify-center">
        <a
          href="#dna-explorer"
          className="group inline-flex flex-col items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-violet-300/80 transition-colors hover:text-amber-400"
        >
          <span>Explore DNA &amp; Courses</span>
          <ChevronDown className="h-4 w-4 animate-gentle-float text-amber-400" />
        </a>
      </div>
    </section>
  );
};
