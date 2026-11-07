import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Atom,
  Award,
  BookOpen,
  Check,
  Compass,
  GraduationCap,
  Layers,
  Sparkles,
} from 'lucide-react';
import { COURSES, type CourseProgramme } from '../data/academyData';

interface CoursesProps {
  onSelectCourseAndBook: (courseTitle: string) => void;
}

const CourseIcon: React.FC<{ name: CourseProgramme['iconName'] }> = ({ name }) => {
  const cls = 'h-6 w-6 text-amber-300';
  switch (name) {
    case 'book':
      return <BookOpen className={cls} />;
    case 'compass':
      return <Compass className={cls} />;
    case 'atom':
      return <Atom className={cls} />;
    case 'layers':
      return <Layers className={cls} />;
    case 'graduation':
      return <GraduationCap className={cls} />;
    case 'award':
      return <Award className={cls} />;
  }
};

interface CourseCardProps {
  course: CourseProgramme;
  index: number;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  onBookCourse: (courseTitle: string) => void;
}

const TiltCourseCard: React.FC<CourseCardProps> = ({
  course,
  index,
  isExpanded,
  onToggleExpand,
  onBookCourse,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 24 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5.5, -5.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5.5, 5.5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      className="group flex flex-col justify-between rounded-2xl border border-purple-500/15 bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 hover:border-purple-500/40 hover:shadow-xl"
    >
      <div>
        {/* Card Header: Icon + Unboxed Level Label */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#13092D] shadow-sm transition-transform duration-200 group-hover:scale-105">
            <CourseIcon name={course.iconName} />
          </div>
          <span className="text-xs font-bold tracking-wide uppercase text-purple-700">
            {course.levelLabel}
          </span>
        </div>

        {/* Course Title */}
        <h3 className="mt-5 font-serif text-2xl font-bold text-[#180F2E]">
          {course.title}
        </h3>

        {/* Short Description */}
        <p className="mt-3 text-sm leading-relaxed text-[#180F2E]/85">
          {course.shortDescription}
        </p>

        {/* Expandable Learn More Focus Panel */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-xl border border-purple-500/20 bg-[#FBF9FF] p-4">
                <p className="text-xs sm:text-sm leading-relaxed text-[#180F2E]/90">
                  {course.extendedFocus}
                </p>
                <ul className="mt-3 space-y-2">
                  {course.learningHighlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-xs text-[#180F2E] font-medium"
                    >
                      <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-purple-700" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Actions: Learn More & Book a Class */}
      <div className="mt-6 pt-5 border-t border-purple-500/15 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggleExpand(course.id)}
          aria-expanded={isExpanded}
          className="flex-1 rounded-xl border border-purple-500/25 bg-[#FBF9FF] px-4 py-2.5 text-xs sm:text-sm font-semibold text-purple-900 transition-colors duration-150 hover:border-purple-600 hover:bg-purple-100 hover:text-purple-950 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
          {isExpanded ? 'Show Less' : 'Syllabus & Details'}
        </button>

        <button
          type="button"
          onClick={() => onBookCourse(course.title)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-150 hover:from-violet-500 hover:to-purple-500 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-900"
        >
          <span>Enquire Batch</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        </button>
      </div>
    </motion.div>
  );
};

export const Courses: React.FC<CoursesProps> = ({ onSelectCourseAndBook }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="courses"
      className="relative overflow-hidden bg-[#FBF9FF] py-20 sm:py-24 lg:py-28 text-[#180F2E]"
    >
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
            <span>NEET UG Programmes</span>
          </div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#180F2E] text-balance">
            Target NEET &amp; Foundation Batches
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#180F2E]/85">
            Purpose-built courses for Class 11, Class 12, Droppers &amp; Pre-Medical Aspirants.
            Small batches with direct personal mentorship by Shubhajit Sir.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {COURSES.map((course, idx) => (
            <TiltCourseCard
              key={course.id}
              course={course}
              index={idx}
              isExpanded={expandedId === course.id}
              onToggleExpand={handleToggleExpand}
              onBookCourse={onSelectCourseAndBook}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
