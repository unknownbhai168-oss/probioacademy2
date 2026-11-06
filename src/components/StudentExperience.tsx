import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  HelpCircle,
  ListChecks,
  Target,
  User,
  Users,
} from 'lucide-react';
import {
  STUDENT_EXPERIENCE_PILLARS,
  type ExperiencePillar,
} from '../data/academyData';

const PillarIcon: React.FC<{ name: ExperiencePillar['iconName'] }> = ({ name }) => {
  const cls = 'h-5 w-5 text-[#2855C5]';
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
      className="bg-[#F8F9FC] py-20 sm:py-24 lg:py-28 text-[#202A3A]"
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2855C5]">
              Inside Every Session
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#101D36] text-balance">
              The Student Learning Experience
            </h2>
          </motion.div>

          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#202A3A]/80">
            Thoughtful pacing, open dialogue, and structured mentorship built around each student’s
            comprehension.
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
              className="group rounded-2xl border border-[#101D36]/10 bg-white p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2855C5]/35 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2855C5]/10 transition-colors duration-200 group-hover:bg-[#101D36] group-hover:[&_svg]:text-[#F2B84B]">
                <PillarIcon name={pillar.iconName} />
              </div>

              <h3 className="mt-5 font-serif text-xl font-bold text-[#101D36]">
                {pillar.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-[#202A3A]/85">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
