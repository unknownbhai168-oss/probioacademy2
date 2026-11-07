import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { METHODOLOGY_STEPS } from '../data/academyData';
import { R3FSceneCanvas } from '../three/R3FSceneCanvas';

export const TeachingMethodology: React.FC = () => {
  return (
    <section
      id="methodology"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28 text-[#180F2E]"
    >
      {/* 3D Floating Elements with React Three Fiber */}
      <R3FSceneCanvas
        variant="methodology"
        className="pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-800">
            <Sparkles className="h-3 w-3 text-purple-600" />
            <span>NEET Pedagogy</span>
          </div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#180F2E] text-balance">
            A Better Way to Crack NEET Biology
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#180F2E]/85">
            A disciplined four-stage progression that guides aspirants from intuitive molecular
            comprehension to high-speed negative-marking elimination.
          </p>
        </motion.div>

        {/* Desktop Horizontal Timeline + Mobile Vertical Timeline */}
        <div className="relative mt-14">
          {/* Desktop horizontal connecting track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-8 left-10 right-10 h-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400"
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
                    className="lg:hidden absolute left-7 top-14 -bottom-8 w-0.5 bg-gradient-to-b from-violet-600 to-amber-400"
                  />
                )}

                {/* Step Node */}
                <div className="relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-[#13092D] text-amber-300 font-serif text-lg sm:text-xl font-bold shadow-md border-2 border-purple-400/50 tabular-nums">
                  {item.step}
                </div>

                {/* Step Card */}
                <div className="flex-1 lg:mt-6 rounded-2xl border border-purple-500/15 bg-[#FBF9FF] p-6 transition-all duration-200 hover:border-purple-500/40 hover:bg-white hover:shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
                    Step {item.step}
                  </p>
                  <h3 className="mt-1.5 font-serif text-2xl font-bold text-[#180F2E]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-purple-900">
                    {item.description}
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#180F2E]/80">
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
