import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  HelpCircle,
  ListChecks,
  Sparkles,
  Target,
  User,
  Users,
} from 'lucide-react';
import {
  STUDENT_EXPERIENCE_PILLARS,
  type ExperiencePillar,
} from '../data/academyData';

const PillarIcon: React.FC<{ name: ExperiencePillar['iconName'] }> = ({ name }) => {
  const cls = 'h-5 w-5 text-purple-700';
  switch (name) {
    case 'target':
      return <Target className={cls} />;
    case 'bookOpen':
      return <BookOpen className={cls} />;
    case 'user':
      return <User className={cls} />;
    case 'helpCircle':
      return <HelpCircle className={cls} />;
    case 'listChecks':
      return <ListChecks className={cls} />;
    case 'users':
      return <Users className={cls} />;
  }
};

export const StudentExperience: React.FC = () => {
  return (
    <section
      id="student-experience"
      className="bg-[#FBF9FF] py-20 sm:py-24 lg:py-28 text-[#180F2E]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-800">
              <Sparkles className="h-3 w-3 text-purple-600" />
              <span>Inside Every Session</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#180F2E] text-balance">
              The NEET Student Experience
            </h2>
          </motion.div>

          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#180F2E]/80">
            Thoughtful pacing, line-by-line NCERT discussions, and structured mentorship tailored
            to every medical aspirant’s strengths.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDENT_EXPERIENCE_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group rounded-2xl border border-purple-500/15 bg-white p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-500/40 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 transition-colors duration-200 group-hover:bg-[#13092D] group-hover:[&_svg]:text-amber-300">
                <PillarIcon name={pillar.iconName} />
              </div>

              <h3 className="mt-5 font-serif text-xl font-bold text-[#180F2E]">
                {pillar.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-[#180F2E]/80">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
