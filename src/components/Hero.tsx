import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, GraduationCap } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { R3FSceneCanvas } from '../three/R3FSceneCanvas';

interface HeroProps {
  onExploreCourses: () => void;
  onBookDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCourses, onBookDemo }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-[#101D36] text-white pt-24 pb-10 sm:pt-28 sm:pb-12"
    >
      {/* Subtle animated multi-layered midnight navy & royal blue gradient field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-ambient-gradient absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 22% 24%, rgba(40, 85, 197, 0.34) 0%, rgba(16, 29, 54, 0) 72%)',
          }}
        />
        <div
          className="animate-ambient-gradient absolute inset-0"
          style={{
            animationDelay: '-7s',
            background:
              'radial-gradient(ellipse 55% 48% at 78% 76%, rgba(242, 184, 75, 0.16) 0%, rgba(16, 29, 54, 0) 70%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.45), transparent 90%)',
          }}
        />
      </div>

      {/* Interactive 3D Floating Academic Constellation using React Three Fiber */}
      <R3FSceneCanvas
        variant="hero"
        className="absolute inset-0 z-0 opacity-95"
      />

      {/* Main Hero Content Grid */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Headline, Supporting Copy & Primary CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#F2B84B]"
            >
              {ACADEMY_INFO.name} · {ACADEMY_INFO.tagline}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-serif font-bold tracking-tight text-white text-balance leading-[1.1]"
              style={{ fontSize: 'clamp(2.35rem, 4.5vw, 4rem)' }}
            >
              Building Knowledge.{' '}
              <span className="text-[#F2B84B]">Shaping Futures.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200/95"
            >
              Discover a smarter approach to learning with personalised academic guidance,
              conceptual clarity and a commitment to excellence.
            </motion.p>

            {/* Unboxed verified academic metadata */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-300"
            >
              <span className="font-medium text-white">Mentor: {ACADEMY_INFO.teacherName}</span>
              <span aria-hidden="true" className="text-[#F2B84B]">
                ·
              </span>
              <span>{ACADEMY_INFO.teachingRange}</span>
              <span aria-hidden="true" className="text-[#F2B84B]">
                ·
              </span>
              <span>Bonhoogly, Kolkata</span>
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#F2B84B] px-6 py-3.5 text-sm sm:text-base font-semibold text-[#101D36] shadow-lg shadow-[#091121]/30 transition-all duration-150 hover:bg-[#F6C96E] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Book a Free Demo Class</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={onExploreCourses}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-[#182B4E]/80 px-6 py-3.5 text-sm sm:text-base font-medium text-white transition-all duration-150 hover:border-[#F2B84B]/70 hover:bg-[#2855C5]/40 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B84B]"
              >
                <span>Explore Our Courses</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Integrated Teacher Portrait Stage (Visible on both Mobile & Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[430px]">
              {/* Architectural outer gold & royal blue framing */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-2xl border border-[#F2B84B]/30 bg-gradient-to-br from-[#2855C5]/20 via-transparent to-[#F2B84B]/15"
              />

              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#182B4E] shadow-2xl">
                <div className="aspect-[4/4.6] w-full overflow-hidden">
                  {!imgFailed ? (
                    <img
                      src={ACADEMY_INFO.teacherPhotoUrl}
                      alt="Shubhajit Sir, Academic Mentor at ProBio Academy"
                      referrerPolicy="no-referrer"
                      onError={() => setImgFailed(true)}
                      className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#182B4E] to-[#101D36] p-8 text-center">
                      <GraduationCap className="h-14 w-14 text-[#F2B84B]" />
                      <p className="mt-4 font-serif text-xl font-semibold text-white">
                        {ACADEMY_INFO.teacherName}
                      </p>
                      <p className="mt-1 text-sm text-slate-300">{ACADEMY_INFO.brandDisplay}</p>
                    </div>
                  )}
                </div>

                {/* Measured gradient scrim integrating the portrait seamlessly into the dark navy aesthetic */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101D36] via-[#101D36]/25 to-transparent"
                />

                {/* Integrated editorial caption at base of portrait */}
                <div className="relative z-10 -mt-20 px-5 pb-5 pt-6">
                  <p className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {ACADEMY_INFO.teacherName}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#F2B84B] font-medium">
                    Engineering · LL.B. · English Honours
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 mt-8 flex justify-center">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll to About ProBio Academy"
          className="group inline-flex flex-col items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-slate-300/80 transition-colors hover:text-[#F2B84B]"
        >
          <span>Scroll</span>
          <ChevronDown className="h-4 w-4 animate-gentle-float text-[#F2B84B]" />
        </a>
      </div>
    </section>
  );
};
