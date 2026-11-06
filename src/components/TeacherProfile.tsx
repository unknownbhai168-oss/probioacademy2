import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Check, GraduationCap } from 'lucide-react';
import {
  ACADEMY_INFO,
  BIO_PERSPECTIVES,
  TEACHER_BIOGRAPHY,
  TEACHING_PHILOSOPHY,
} from '../data/academyData';
import { Qualifications } from './Qualifications';
import { AcademicCanvas3D } from '../three/AcademicCanvas3D';

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
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28 text-[#202A3A]"
    >
      {/* Subtle 3D Graduation Cap & Academic Elements */}
      <AcademicCanvas3D
        variant="teacher"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-65"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2855C5]">
            Meet Your Mentor
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#101D36]">
            SHUBHAJIT SIR
          </h2>
          <p className="mt-2 text-sm sm:text-base font-medium text-[#2855C5]">
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
                className="absolute -inset-3 rounded-2xl border border-[#F2B84B]/45 bg-[#F8F9FC]"
              />
              <div className="relative overflow-hidden rounded-2xl border border-[#101D36]/15 bg-[#101D36] shadow-xl">
                <div className="aspect-[4/4.5] w-full overflow-hidden">
                  {!portraitError ? (
                    <img
                      src={ACADEMY_INFO.teacherPhotoUrl}
                      alt="Shubhajit Sir — Academic Mentor at ProBio Academy"
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitError(true)}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#101D36] p-8 text-center text-white">
                      <GraduationCap className="h-14 w-14 text-[#F2B84B]" />
                      <p className="mt-4 font-serif text-xl font-bold">
                        {ACADEMY_INFO.teacherName}
                      </p>
                    </div>
                  )}
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#101D36]/85 to-transparent"
                />
                <div className="relative z-10 -mt-14 px-6 pb-5">
                  <p className="font-serif text-lg font-bold text-white">
                    {ACADEMY_INFO.teacherName}
                  </p>
                  <p className="text-xs text-[#F2B84B] font-medium">
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
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#101D36] text-balance leading-snug">
              An Interdisciplinary Foundation Built for Clarity and Reasoning
            </h3>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#202A3A]/90">
              {TEACHER_BIOGRAPHY}
            </p>

            {/* Teaching Philosophy Summary List */}
            <div className="mt-8 rounded-xl border border-[#101D36]/10 bg-[#F8F9FC] p-6">
              <h4 className="font-serif text-base font-bold uppercase tracking-wider text-[#101D36]">
                Core Teaching Philosophy
              </h4>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TEACHING_PHILOSOPHY.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-[#202A3A]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2855C5]/12 text-[#2855C5]">
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

        {/* Part 2: Dedicated Dynamic Bio Presentation with Teacher's Image as Full Background */}
        <div
          id="dynamic-bio-stage"
          ref={bioStageRef}
          aria-label="Dynamic Mentor Bio Presentation"
          className="relative mt-16 overflow-hidden rounded-2xl border border-[#101D36]/20 bg-[#101D36] text-white shadow-2xl min-h-[520px] sm:min-h-[560px] flex items-center"
        >
          {/* Full-bleed background layer using Shubhajit Sir's actual photograph */}
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
                className="h-full w-full object-cover object-[50%_15%] sm:object-[78%_18%] opacity-65 sm:opacity-75"
              />
            </motion.div>
          )}

          {/* Measured directional dark midnight-navy scrim for >= 8:1 text contrast while keeping portrait visible */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 bg-gradient-to-t from-[#101D36] via-[#101D36]/88 to-[#101D36]/50 lg:bg-gradient-to-r lg:from-[#101D36]/96 lg:via-[#101D36]/82 lg:to-[#101D36]/30"
          />

          {/* Dynamic Interactive Bio Foreground */}
          <div className="relative z-20 w-full p-6 sm:p-10 lg:p-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F2B84B]">
                Dynamic Mentor Perspective · {ACADEMY_INFO.teacherName}
              </p>

              <h3 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance leading-tight">
                How Three Disciplines Shape Every Lesson
              </h3>

              {/* Interactive Perspective Switcher */}
              <div
                role="tablist"
                aria-label="Interdisciplinary Teaching Perspectives"
                className="mt-6 inline-flex flex-wrap gap-2 rounded-xl bg-[#091121]/75 p-1.5 border border-white/15"
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
                      className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B84B] ${
                        selected
                          ? 'bg-[#F2B84B] text-[#101D36] font-semibold shadow-sm'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
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
                    className="rounded-xl border border-white/15 bg-[#101D36]/85 p-6 shadow-lg"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#F2B84B]">
                      {activePerspective.qualificationTag}
                    </p>
                    <h4 className="mt-2 font-serif text-xl sm:text-2xl font-bold text-white">
                      {activePerspective.headline}
                    </h4>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-200">
                      {activePerspective.summary}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs sm:text-sm text-[#F6C96E]">
                        <strong className="font-semibold text-white">In the Classroom: </strong>
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
