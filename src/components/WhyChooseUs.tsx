import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  HeartHandshake,
  Layers,
  Lightbulb,
  MessageCircleQuestion,
  UserCheck,
} from 'lucide-react';
import { WHY_CHOOSE_US, type WhyChooseItem } from '../data/academyData';

const FeatureIcon: React.FC<{ name: WhyChooseItem['iconName'] }> = ({ name }) => {
  const cls = 'h-6 w-6 text-[#F2B84B]';
  switch (name) {
    case 'userCheck':
      return <UserCheck className={cls} />;
    case 'lightbulb':
      return <Lightbulb className={cls} />;
    case 'layers':
      return <Layers className={cls} />;
    case 'messageCircle':
      return <MessageCircleQuestion className={cls} />;
    case 'compass':
      return <Compass className={cls} />;
    case 'heartHandshake':
      return <HeartHandshake className={cls} />;
  }
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-[#101D36] py-20 sm:py-24 lg:py-28 text-white"
    >
      {/* Subtle architectural radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(40, 85, 197, 0.28) 0%, rgba(16, 29, 54, 0) 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2B84B]">
            The ProBio Distinction
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
            Why Learn With Us?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            An academic environment designed around individual clarity, structured reasoning, and
            consistent mentorship.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group rounded-2xl border border-white/12 bg-[#182B4E]/75 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#F2B84B]/50 hover:bg-[#182B4E]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#101D36] border border-white/10 transition-transform duration-200 group-hover:scale-105">
                  <FeatureIcon name={feature.iconName} />
                </div>
                <span className="font-serif text-lg font-bold text-[#F2B84B]/80 tabular-nums">
                  {feature.number}
                </span>
              </div>

              <h3 className="mt-5 font-serif text-xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
