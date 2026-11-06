import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenCheck } from 'lucide-react';
import { ABOUT_HIGHLIGHTS, ACADEMY_INFO } from '../data/academyData';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative bg-[#F8F9FC] py-20 sm:py-24 lg:py-28 text-[#202A3A]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Narrative & Academic Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2855C5]">
              About {ACADEMY_INFO.brandDisplay}
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#101D36] text-balance leading-tight">
              More Than Just Tuition. A Foundation for Excellence.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#202A3A]/90">
              <p>
                ProBio Academy is an academic learning institution dedicated to genuine
                conceptual understanding, structured learning, and steady individual academic
                development.
              </p>
              <p>
                Guided by {ACADEMY_INFO.teacherName}, instruction spans from{' '}
                <strong className="font-semibold text-[#101D36]">
                  {ACADEMY_INFO.teachingRange}
                </strong>
                , offering students an attentive, student-focused environment where foundational
                concepts are mastered before advancing to higher complexity.
              </p>
            </div>

            {/* Clean architectural callout card (hairline border, zero thick left accent stripe) */}
            <div className="mt-8 rounded-xl border border-[#101D36]/12 bg-white p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#101D36] text-[#F2B84B]">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#101D36]">
                    {ACADEMY_INFO.tagline}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#202A3A]/80">
                    Every learner receives patient doubt-clearing support and structured guidance
                    tailored to their academic stage and curiosity.
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
                  className="group rounded-xl border border-[#101D36]/10 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2855C5]/35 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-[#2855C5] tabular-nums">
                      0{idx + 1}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-6 rounded-full bg-[#F2B84B]/60 transition-all duration-200 group-hover:w-10 group-hover:bg-[#F2B84B]"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-[#101D36]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#202A3A]/80">
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
