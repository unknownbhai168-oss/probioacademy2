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
} from 'lucide-react';
import { COURSES, type CourseProgramme } from '../data/academyData';
import { AcademicCanvas3D } from '../three/AcademicCanvas3D';

interface CoursesProps {
  onSelectCourseAndBook: (courseTitle: string) => void;
}

const CourseIcon: React.FC<{ name: CourseProgramme['iconName'] }> = ({ name }) => {
  const cls = 'h-6 w-6 text-[#F2B84B]';
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
      className="group flex flex-col justify-between rounded-2xl border border-[#101D36]/12 bg-white p-6 sm:p-7 shadow-xs transition-shadow duration-200 hover:border-[#2855C5]/40 hover:shadow-xl"
    >
      <div>
        {/* Card Header: Icon + Unboxed Level Label */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#101D36] shadow-sm transition-transform duration-200 group-hover:scale-105">
            <CourseIcon name={course.iconName} />
          </div>
          <span className="text-xs font-semibold tracking-wide uppercase text-[#2855C5]">
            {course.levelLabel}
          </span>
        </div>

        {/* Course Title */}
        <h3 className="mt-5 font-serif text-2xl font-bold text-[#101D36]">
          {course.title}
        </h3>

        {/* Short Description */}
        <p className="mt-3 text-sm leading-relaxed text-[#202A3A]/85">
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
              <div className="mt-4 rounded-xl border border-[#101D36]/10 bg-[#F8F9FC] p-4">
                <p className="text-xs sm:text-sm leading-relaxed text-[#202A3A]/90">
                  {course.extendedFocus}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {course.learningHighlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-xs text-[#101D36] font-medium"
                    >
                      <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#2855C5]" />
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
      <div className="mt-6 pt-5 border-t border-[#101D36]/10 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggleExpand(course.id)}
          aria-expanded={isExpanded}
          className="flex-1 rounded-lg border border-[#101D36]/20 bg-[#F8F9FC] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#101D36] transition-colors duration-150 hover:border-[#2855C5] hover:bg-white hover:text-[#2855C5] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2855C5]"
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
        </button>

        <button
          type="button"
          onClick={() => onBookCourse(course.title)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2855C5] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all duration-150 hover:bg-[#101D36] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101D36]"
        >
          <span>Book a Class</span>
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
      className="relative overflow-hidden bg-[#F8F9FC] py-20 sm:py-24 lg:py-28 text-[#202A3A]"
    >
      {/* Subtle 3D Books & Academic Symbols Background */}
      <AcademicCanvas3D
        variant="courses"
        className="pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2855C5]">
            Academic Programmes
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#101D36] text-balance">
            Explore Our Learning Programmes
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#202A3A]/85">
            Personalised academic guidance structured across secondary, higher secondary,
            undergraduate, and Master’s-level studies.
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
