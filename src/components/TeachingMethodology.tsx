import React from 'react';
import { motion } from 'framer-motion';
import { METHODOLOGY_STEPS } from '../data/academyData';
import { R3FSceneCanvas } from '../three/R3FSceneCanvas';

export const TeachingMethodology: React.FC = () => {
  return (
    <section
      id="methodology"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28 text-[#202A3A]"
    >
      {/* Subtle 3D Geometric Shapes, Books & Pens using React Three Fiber */}
      <R3FSceneCanvas
        variant="methodology"
        className="pointer-events-none absolute inset-0 opacity-45"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2855C5]">
            Teaching Methodology
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#101D36] text-balance">
            A Better Way to Learn
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#202A3A]/85">
            A clear four-stage learning progression that guides every student from foundational
            comprehension to confident mastery.
          </p>
        </motion.div>

        {/* Desktop Horizontal Timeline + Mobile Vertical Timeline */}
        <div className="relative mt-14">
          {/* Desktop horizontal connecting track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-8 left-10 right-10 h-0.5 bg-gradient-to-r from-[#2855C5] via-[#F2B84B] to-[#101D36]"
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
            {METHODOLOGY_STEPS.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.48,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex lg:flex-col items-start gap-5 lg:gap-0"
              >
                {/* Mobile vertical connecting track */}
                {idx < METHODOLOGY_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="lg:hidden absolute left-7 top-14 -bottom-8 w-0.5 bg-gradient-to-b from-[#2855C5] to-[#F2B84B]"
                  />
                )}

                {/* Step Node */}
                <div className="relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-[#101D36] text-[#F2B84B] font-serif text-lg sm:text-xl font-bold shadow-md border-2 border-[#F2B84B]/60 tabular-nums">
                  {item.step}
                </div>

                {/* Step Card */}
                <div className="flex-1 lg:mt-6 rounded-2xl border border-[#101D36]/10 bg-[#F8F9FC] p-6 transition-all duration-200 hover:border-[#2855C5]/35 hover:bg-white hover:shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#2855C5]">
                    Step {item.step}
                  </p>
                  <h3 className="mt-1.5 font-serif text-2xl font-bold text-[#101D36]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-[#101D36]/90">
                    {item.description}
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#202A3A]/80">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
