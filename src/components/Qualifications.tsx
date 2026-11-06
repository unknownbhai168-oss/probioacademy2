import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenText, Compass, Scale } from 'lucide-react';
import { QUALIFICATIONS, type QualificationItem } from '../data/academyData';

const QualificationIcon: React.FC<{ name: QualificationItem['iconName'] }> = ({
  name,
}) => {
  switch (name) {
    case 'engineering':
      return <Compass className="h-6 w-6 text-[#F2B84B]" />;
    case 'law':
      return <Scale className="h-6 w-6 text-[#F2B84B]" />;
    case 'english':
      return <BookOpenText className="h-6 w-6 text-[#F2B84B]" />;
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
          className="group relative rounded-xl border border-[#101D36]/12 bg-[#F8F9FC] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#2855C5]/40 hover:bg-white hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#101D36] shadow-sm transition-transform duration-200 group-hover:scale-105">
              <QualificationIcon name={qual.iconName} />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#2855C5]">
              Qualification 0{idx + 1}
            </span>
          </div>

          <h3 className="mt-5 font-serif text-xl font-bold text-[#101D36]">
            {qual.title}
          </h3>
          <p className="mt-1 text-xs font-medium text-[#2855C5]">
            {qual.discipline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#202A3A]/85">
            {qual.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
