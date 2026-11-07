import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Check, Dna, GraduationCap, Sparkles } from 'lucide-react';
import {
  ACADEMY_INFO,
  BIO_PERSPECTIVES,
  TEACHER_BIOGRAPHY,
  TEACHING_PHILOSOPHY,
} from '../data/academyData';
import { Qualifications } from './Qualifications';

export const TeacherProfile: React.FC = () => {
  const [activeLensId, setActiveLensId] = useState<string>(BIO_PERSPECTIVES[0].id);
  const [portraitError, setPortraitError] = useState(false);
  const bioStageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: bioStageRef,
    offset: ['start end', 'end start'],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.0, 1.04]);

  const activePerspective =
    BIO_PERSPECTIVES.find((p) => p.id === activeLensId) ?? BIO_PERSPECTIVES[0];

  return (
    <section
      id="teacher"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28 text-[#180F2E]"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-800">
            <Sparkles className="h-3 w-3 text-purple-600" />
            <span>Meet Your Mentor</span>
          </div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#180F2E]">
            SHUBHAJIT SIR
          </h2>
          <p className="mt-2 text-sm sm:text-base font-semibold text-purple-700">
            Founder &amp; Academic Mentor · {ACADEMY_INFO.teachingRange}
          </p>
        </motion.div>

        {/* Part 1: Prominent Portrait Frame + Biography */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-violet-400/20 to-amber-400/25 blur-sm"
              />
              <div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/30 bg-[#13092D] shadow-2xl">
                <div className="aspect-[4/4.5] w-full overflow-hidden bg-purple-950">
                  {!portraitError ? (
                    <img
                      src={ACADEMY_INFO.teacherPhotoUrl}
                      alt="Shubhajit Sir — Academic Mentor at ProBio Academy"
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitError(true)}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#13092D] p-8 text-center text-white">
                      <GraduationCap className="h-14 w-14 text-amber-300" />
                      <p className="mt-4 font-serif text-xl font-bold">
                        {ACADEMY_INFO.teacherName}
                      </p>
                    </div>
                  )}
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B071E]/90 to-transparent"
                />
                <div className="relative z-10 -mt-14 px-6 pb-5">
                  <p className="font-serif text-lg font-bold text-white">
                    {ACADEMY_INFO.teacherName}
                  </p>
                  <p className="text-xs text-amber-300 font-medium">
                    {ACADEMY_INFO.brandDisplay}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Biography & Interdisciplinary Summary */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#180F2E] text-balance leading-snug">
              An Interdisciplinary Edge Engineered for NEET UG Success
            </h3>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#180F2E]/90">
              {TEACHER_BIOGRAPHY}
            </p>

            {/* Teaching Philosophy Summary List */}
            <div className="mt-8 rounded-2xl border border-purple-500/20 bg-[#FBF9FF] p-6">
              <h4 className="font-serif text-base font-bold uppercase tracking-wider text-purple-900">
                Core NEET Teaching Principles
              </h4>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TEACHING_PHILOSOPHY.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-[#180F2E]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-600/15 text-violet-700">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Three Dedicated Qualification Cards */}
        <div className="mt-14">
          <Qualifications />
        </div>

        {/* Part 2: Dedicated Dynamic Bio Presentation with Purplish Scrim */}
        <div
          id="dynamic-bio-stage"
          ref={bioStageRef}
          aria-label="Dynamic Mentor Bio Presentation"
          className="relative mt-16 overflow-hidden rounded-3xl border border-purple-500/30 bg-[#0B071E] text-white shadow-2xl min-h-[520px] sm:min-h-[560px] flex items-center"
        >
          {/* Full-bleed background layer using Shubhajit Sir's photograph */}
          {!portraitError && (
            <motion.div
              aria-hidden="true"
              style={{ scale: bgScale }}
              className="absolute inset-0 z-0"
            >
              <img
                src={ACADEMY_INFO.teacherPhotoUrl}
                alt=""
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-[50%_15%] sm:object-[78%_18%] opacity-50 sm:opacity-60"
              />
            </motion.div>
          )}

          {/* Purplish directional scrim */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B071E] via-[#0B071E]/90 to-[#0B071E]/50 lg:bg-gradient-to-r lg:from-[#0B071E]/98 lg:via-[#0B071E]/85 lg:to-[#0B071E]/30"
          />

          {/* Dynamic Interactive Bio Foreground */}
          <div className="relative z-20 w-full p-6 sm:p-10 lg:p-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-purple-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
                <Dna className="h-3.5 w-3.5 text-cyan-400" />
                <span>Interdisciplinary NEET Edge · {ACADEMY_INFO.teacherName}</span>
              </div>

              <h3 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance leading-tight">
                How Three Disciplines Deliver 340+ in Biology
              </h3>

              {/* Interactive Perspective Switcher */}
              <div
                role="tablist"
                aria-label="Interdisciplinary Teaching Perspectives"
                className="mt-6 inline-flex flex-wrap gap-2 rounded-2xl bg-[#1D1042]/85 p-1.5 border border-purple-500/30"
              >
                {BIO_PERSPECTIVES.map((perspective) => {
                  const selected = perspective.id === activePerspective.id;
                  return (
                    <button
                      key={perspective.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveLensId(perspective.id)}
                      className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                        selected
                          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold shadow-md'
                          : 'text-violet-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {perspective.label}
                    </button>
                  );
                })}
              </div>

              {/* Animated Active Bio Lens Card */}
              <div className="mt-6 min-h-[190px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePerspective.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    role="tabpanel"
                    className="rounded-2xl border border-purple-500/25 bg-[#170E38]/90 p-6 shadow-xl backdrop-blur-md"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      {activePerspective.qualificationTag}
                    </p>
                    <h4 className="mt-2 font-serif text-xl sm:text-2xl font-bold text-white">
                      {activePerspective.headline}
                    </h4>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-violet-100/90">
                      {activePerspective.summary}
                    </p>
                    <div className="mt-4 pt-4 border-t border-purple-500/25">
                      <p className="text-xs sm:text-sm text-cyan-300">
                        <strong className="font-semibold text-white">In the NEET Classroom: </strong>
                        {activePerspective.classroomApplication}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
