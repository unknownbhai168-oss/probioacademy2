import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  HeartHandshake,
  Layers,
  Lightbulb,
  MessageCircleQuestion,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { WHY_CHOOSE_US, type WhyChooseItem } from '../data/academyData';

const FeatureIcon: React.FC<{ name: WhyChooseItem['iconName'] }> = ({ name }) => {
  const cls = 'h-6 w-6 text-amber-300';
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
      className="relative overflow-hidden bg-[#0B071E] py-20 sm:py-24 lg:py-28 text-white"
    >
      {/* Purplish architectural radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)',
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
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-purple-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>The ProBio Distinction</span>
          </div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
            Why Choose ProBio Academy for NEET?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-violet-200/85">
            An academic environment engineered around line-by-line NCERT mastery, 3D molecular
            reasoning, and small-batch mentorship by Shubhajit Sir.
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
              className="group rounded-2xl border border-purple-500/20 bg-[#170E38]/85 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-violet-400/60 hover:bg-[#1D1042]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950 border border-purple-500/30 transition-transform duration-200 group-hover:scale-105">
                  <FeatureIcon name={feature.iconName} />
                </div>
                <span className="font-serif text-lg font-bold text-amber-400/90 tabular-nums">
                  {feature.number}
                </span>
              </div>

              <h3 className="mt-5 font-serif text-xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-violet-200/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
