import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenText, Compass, Scale } from 'lucide-react';
import { QUALIFICATIONS, type QualificationItem } from '../data/academyData';

const QualificationIcon: React.FC<{ name: QualificationItem['iconName'] }> = ({
  name,
}) => {
  switch (name) {
    case 'engineering':
      return <Compass className="h-6 w-6 text-amber-300" />;
    case 'law':
      return <Scale className="h-6 w-6 text-amber-300" />;
    case 'english':
      return <BookOpenText className="h-6 w-6 text-amber-300" />;
  }
};

export const Qualifications: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {QUALIFICATIONS.map((qual, idx) => (
        <motion.div
          key={qual.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.45,
            delay: idx * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group relative rounded-2xl border border-purple-500/20 bg-[#FBF9FF] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-white hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#13092D] shadow-sm transition-transform duration-200 group-hover:scale-105">
              <QualificationIcon name={qual.iconName} />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-purple-700">
              Advantage 0{idx + 1}
            </span>
          </div>

          <h3 className="mt-5 font-serif text-xl font-bold text-[#180F2E]">
            {qual.title}
          </h3>
          <p className="mt-1 text-xs font-semibold text-purple-700">
            {qual.discipline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#180F2E]/85">
            {qual.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
