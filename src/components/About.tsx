import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenCheck, Dna, Sparkles } from 'lucide-react';
import { ABOUT_HIGHLIGHTS, ACADEMY_INFO } from '../data/academyData';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative bg-[#FBF9FF] py-20 sm:py-24 lg:py-28 text-[#180F2E]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Narrative & NEET Academic Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-purple-800">
              <Sparkles className="h-3 w-3 text-purple-600" />
              <span>About {ACADEMY_INFO.brandDisplay}</span>
            </div>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#180F2E] text-balance leading-tight">
              Where Biological Concepts Meet NEET Excellence.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#180F2E]/90">
              <p>
                ProBio Academy is a dedicated academic coaching institution centered on{' '}
                <strong className="font-semibold text-purple-900">
                  NEET UG Medical Entrance Preparation
                </strong>
                . We empower Class 11, Class 12, and Droppers / Repeaters with deep conceptual
                mastery rather than blind memorisation.
              </p>
              <p>
                Mentored by {ACADEMY_INFO.teacherName}, our pedagogy spans{' '}
                <strong className="font-semibold text-purple-900">
                  {ACADEMY_INFO.teachingRange}
                </strong>
                . We bridge line-by-line NCERT theory, interactive 3D molecular structures, and
                rigorous Assertion-Reasoning deduction to ensure students score consistently above
                the 340+ threshold in NEET Biology.
              </p>
            </div>

            {/* Architectural Callout Card */}
            <div className="mt-8 rounded-2xl border border-purple-500/20 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#13092D] text-amber-300">
                  <Dna className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#180F2E]">
                    The 340+ Biology Blueprint
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#180F2E]/80">
                    Every aspirant receives line-by-line NCERT clarity, chapter-wise mock drills,
                    and unlimited personal doubt-clearing with Shubhajit Sir.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 6 Core Academic Pillars */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ABOUT_HIGHLIGHTS.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group rounded-2xl border border-purple-500/15 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-500/40 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-purple-700 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-6 rounded-full bg-amber-400/60 transition-all duration-200 group-hover:w-10 group-hover:bg-amber-400"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-[#180F2E]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#180F2E]/80">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
