import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  HeartHandshake,
  MapPin,
  Maximize2,
  MessageCircle,
  PartyPopper,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react';
import {
  ACADEMY_INFO,
  STUDENT_GALLERY_MOMENTS,
  type StudentGalleryMoment,
} from '../data/academyData';

type BackdropMode = 'cinematic' | 'daylight' | 'clarity';

export const StudentBatchShowcase: React.FC = () => {
  const [activeMomentId, setActiveMomentId] = useState<string>('classroom-batch');
  const [backdropMode, setBackdropMode] = useState<BackdropMode>('cinematic');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const activeMoment =
    STUDENT_GALLERY_MOMENTS.find((m) => m.id === activeMomentId) ||
    STUDENT_GALLERY_MOMENTS[0];

  const getOverlayClasses = () => {
    switch (backdropMode) {
      case 'daylight':
        return 'bg-gradient-to-r from-[#0B071E]/75 via-[#13092D]/60 to-[#0B071E]/70 backdrop-blur-[1px]';
      case 'clarity':
        return 'bg-gradient-to-r from-[#0B071E]/50 via-[#13092D]/35 to-[#0B071E]/45 backdrop-blur-none';
      case 'cinematic':
      default:
        return 'bg-gradient-to-r from-[#0B071E]/92 via-[#13092D]/82 to-[#0B071E]/90 backdrop-blur-[2px]';
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleNextLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % STUDENT_GALLERY_MOMENTS.length);
  };

  const handlePrevLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex(
      (prev) => (prev - 1 + STUDENT_GALLERY_MOMENTS.length) % STUDENT_GALLERY_MOMENTS.length
    );
  };

  return (
    <section
      id="students-batch"
      className="relative min-h-[760px] lg:min-h-[880px] scroll-mt-20 sm:scroll-mt-24 overflow-hidden pt-20 pb-24 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32 text-white"
    >
      {/* =========================================================================
          BACKGROUND LAYER: Active Authentic Student Photograph (Directly Integrated)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeMoment.photoUrl}
            src={activeMoment.photoUrl}
            alt={activeMoment.title}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full object-cover object-[center_32%] sm:object-[center_35%] filter brightness-[0.88] contrast-[1.08]"
          />
        </AnimatePresence>

        {/* Purplish Atmospheric Color Overlay */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${getOverlayClasses()}`}
        />

        {/* Top and Bottom Vignette Gradients for Seamless Blending */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0B071E] via-[#0B071E]/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0B071E] via-[#0B071E]/80 to-transparent"
        />

        {/* Bioluminescent Violet & Cyan Radial Accents */}
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/4 h-96 w-96 rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)' }}
        />
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT: Glassmorphic Cards & Controls Floating Over Background
          ========================================================================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Top Controls Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-purple-500/20 backdrop-blur-xs">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-purple-950/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-violet-200 shadow-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Real Student Photography · Baranagar, Kolkata</span>
          </div>

          {/* Interactive Background Clarity / Atmosphere Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-violet-300 font-medium mr-1">
              <Eye className="h-3.5 w-3.5 text-cyan-400" />
              <span>Backdrop Atmosphere:</span>
            </span>

            <div className="inline-flex rounded-xl border border-purple-500/30 bg-[#0B071E]/80 p-1 shadow-lg backdrop-blur-md">
              <button
                type="button"
                onClick={() => setBackdropMode('cinematic')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                  backdropMode === 'cinematic'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-violet-300 hover:text-white'
                }`}
                title="Cinematic Violet overlay for balanced reading"
              >
                Cinematic Violet
              </button>
              <button
                type="button"
                onClick={() => setBackdropMode('daylight')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                  backdropMode === 'daylight'
                    ? 'bg-amber-500 text-purple-950 font-semibold shadow-sm'
                    : 'text-violet-300 hover:text-white'
                }`}
                title="Daylight Warmth — reveals more natural room lighting and authentic ambiance"
              >
                Daylight Warmth
              </button>
              <button
                type="button"
                onClick={() => setBackdropMode('clarity')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                  backdropMode === 'clarity'
                    ? 'bg-cyan-500 text-purple-950 font-semibold shadow-sm'
                    : 'text-violet-300 hover:text-white'
                }`}
                title="Max Clarity — student batch photo fully prominent behind glass cards"
              >
                Max Clarity
              </button>
            </div>

            {/* Enlarge / Full-Resolution Lightbox Button */}
            <button
              type="button"
              onClick={() =>
                handleOpenLightbox(
                  activeMomentId === 'classroom-batch' ? 0 : 1
                )
              }
              aria-label="View photo in high-resolution full screen"
              className="inline-flex items-center gap-1.5 rounded-xl border border-violet-400/30 bg-purple-950/80 px-3 py-1.5 text-xs font-medium text-violet-200 shadow-md backdrop-blur-md transition-colors hover:bg-violet-600 hover:text-white cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5 text-amber-300" />
              <span>Enlarge Gallery</span>
            </button>
          </div>
        </div>

        {/* Dual-Moment Interactive Switcher Pill Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {STUDENT_GALLERY_MOMENTS.map((moment, idx) => {
            const isActive = activeMomentId === moment.id;
            return (
              <button
                key={moment.id}
                type="button"
                onClick={() => setActiveMomentId(moment.id)}
                className={`flex items-center gap-3.5 rounded-2xl p-3 border text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border-violet-400 bg-violet-950/90 shadow-xl shadow-purple-950/50 ring-2 ring-violet-400/40'
                    : 'border-violet-500/25 bg-[#0B071E]/75 hover:border-violet-400/50 hover:bg-[#13092D]/80'
                }`}
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-violet-400/30 bg-purple-950">
                  <img
                    src={moment.photoUrl}
                    alt={moment.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-violet-600/25 border-2 border-violet-400 rounded-xl" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isActive ? 'bg-emerald-400 animate-pulse' : 'bg-violet-400/60'
                      }`}
                    />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                      {moment.category}
                    </span>
                  </div>
                  <p className="mt-0.5 font-serif text-sm font-bold text-white truncate">
                    {moment.id === 'classroom-batch'
                      ? 'Daily Classroom Batch'
                      : 'Community Celebration'}
                  </p>
                  <p className="text-[11px] text-violet-300 truncate">
                    {moment.badge}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Section Headline & Narrative */}
        <div className="mt-8 max-w-3xl">
          <motion.div
            key={activeMoment.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-purple-950/70 px-3 py-1 text-xs font-semibold text-violet-300 mb-3">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>{activeMoment.badge}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance leading-[1.12]">
              {activeMoment.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-violet-100/90 drop-shadow-sm">
              {activeMoment.description}
            </p>
          </motion.div>
        </div>

        {/* Floating 3-Column Glassmorphic Feature Cards Over the Active Student Backdrop */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeMomentId === 'classroom-batch' ? (
            <>
              {/* Card 1: Class 11 & 12 Foundation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="group rounded-2xl border border-violet-400/25 bg-[#0B071E]/80 p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-[#13092D]/85"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/30 border border-violet-400/40 text-violet-300 shadow-inner group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold text-white">
                  Class 11 &amp; 12 Foundation
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-violet-200/85">
                  Dual syllabus alignment for Board examinations and NEET UG. Deep conceptual
                  grounding in cell biology, plant physiology, genetics, and human physiology.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-violet-300/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Line-by-line NCERT diagram drills</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Weekly topic-wise objective tests</span>
                  </li>
                </ul>
              </motion.div>

              {/* Card 2: Dedicated Droppers & Repeaters Batch */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="group rounded-2xl border border-amber-400/30 bg-[#0B071E]/85 p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/60 hover:bg-[#13092D]/90"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-inner group-hover:bg-amber-500 group-hover:text-purple-950 transition-colors">
                  <Target className="h-6 w-6" />
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-white">
                    Target Droppers &amp; Repeaters
                  </h3>
                  <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    Specialised
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-violet-200/85">
                  Personalized diagnosis of past attempts to eliminate negative marking, repair weak
                  concept links, and systematically target 340+ marks in NEET Biology.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-violet-300/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                    <span>Individual mistake analysis notebooks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                    <span>Negative marking control strategies</span>
                  </li>
                </ul>
              </motion.div>

              {/* Card 3: Interactive Doubt Clearance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="group rounded-2xl border border-cyan-400/25 bg-[#0B071E]/80 p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-[#13092D]/85"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-600/30 border border-cyan-400/40 text-cyan-300 shadow-inner group-hover:bg-cyan-500 group-hover:text-purple-950 transition-colors">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold text-white">
                  Fearless Doubt Clearance
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-violet-200/85">
                  An open classroom where no doubt is judged. Aspirants challenge statement-based
                  questions, dissect tricky Assertion-Reasoning traps, and build mental endurance.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-violet-300/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300 shrink-0" />
                    <span>Zero hesitation: speak up freely in every session</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300 shrink-0" />
                    <span>Real-time mentor feedback from Shubhajit Sir</span>
                  </li>
                </ul>
              </motion.div>
            </>
          ) : (
            <>
              {/* Card 1: Family & Peer Camaraderie */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="group rounded-2xl border border-violet-400/25 bg-[#0B071E]/80 p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-[#13092D]/85"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/30 border border-violet-400/40 text-violet-300 shadow-inner group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold text-white">
                  Supportive Peer Community
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-violet-200/85">
                  A motivating, warm, and ambitious circle of future doctors. Students exchange notes,
                  quiz each other on NCERT exceptions, and celebrate collective academic triumphs.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-violet-300/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Positive peer culture without toxic comparison</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Shared motivation during intense test weeks</span>
                  </li>
                </ul>
              </motion.div>

              {/* Card 2: Lifelong Mentor Bond */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="group rounded-2xl border border-amber-400/30 bg-[#0B071E]/85 p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/60 hover:bg-[#13092D]/90"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-inner group-hover:bg-amber-500 group-hover:text-purple-950 transition-colors">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-white">
                    Mentorship Beyond Textbooks
                  </h3>
                  <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    Holistic
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-violet-200/85">
                  Shubhajit Sir mentors each aspirant with genuine empathy, providing emotional
                  encouragement, exam composure coaching, and personalized career roadmaps.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-violet-300/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                    <span>Overcoming exam anxiety &amp; score slumps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                    <span>Continuous accessibility for student guidance</span>
                  </li>
                </ul>
              </motion.div>

              {/* Card 3: Celebrating Milestones */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="group rounded-2xl border border-fuchsia-400/25 bg-[#0B071E]/80 p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-[#13092D]/85"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-600/30 border border-fuchsia-400/40 text-fuchsia-300 shadow-inner group-hover:bg-fuchsia-500 group-hover:text-white transition-colors">
                  <PartyPopper className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold text-white">
                  Festive Joy &amp; Milestones
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-violet-200/85">
                  ProBio Academy celebrates festive traditions and student achievements together.
                  These memorable gatherings build memories that last well into medical college.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-violet-300/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-fuchsia-300 shrink-0" />
                    <span>Celebration of student efforts &amp; consistency</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-fuchsia-300 shrink-0" />
                    <span>Lifelong camaraderie among batch mates</span>
                  </li>
                </ul>
              </motion.div>
            </>
          )}
        </div>

        {/* Bottom Classroom Info & WhatsApp CTA Floating Glass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-2xl border border-violet-400/30 bg-[#0B071E]/90 p-5 sm:p-6 shadow-2xl backdrop-blur-lg"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-950 border border-violet-400/40 text-amber-300">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-white">
                  Limited Seats per Batch for Personalized Supervision
                </p>
                <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-violet-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    <span>Mon–Sat: 9 AM – 8 PM · Sun: 9 AM – 2 PM</span>
                  </span>
                  <span className="hidden sm:inline text-violet-500">|</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                    <span>9/1, Bireswar Dhole Ln, Bonhoogly, Baranagar</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <a
                href={
                  ACADEMY_INFO.whatsappBaseUrl +
                  '?text=' +
                  encodeURIComponent(
                    'Hello Sir! I saw the student batch and community photographs on your website and would like to enquire about NEET batch timings and seat availability for Class 11 / Class 12 / Droppers.'
                  )
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/50 transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Enquire via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => scrollToSection('admission')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-violet-400/35 bg-purple-950/80 hover:bg-violet-900/60 px-5 py-3 text-sm font-semibold text-violet-200 hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Book Center Visit</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          LIGHTBOX MODAL: High-Resolution Gallery Carousel
          ========================================================================= */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 sm:p-6 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full overflow-hidden rounded-2xl border border-purple-500/30 bg-[#0B071E] p-4 sm:p-5 text-white shadow-2xl cursor-default"
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-violet-600/30 border border-violet-400/40 px-2 py-0.5 text-[10px] font-bold text-violet-200">
                      Photo {lightboxIndex + 1} of {STUDENT_GALLERY_MOMENTS.length}
                    </span>
                    <span className="text-xs text-amber-300 font-medium">
                      {STUDENT_GALLERY_MOMENTS[lightboxIndex].category}
                    </span>
                  </div>
                  <p className="mt-1 font-serif text-lg sm:text-xl font-bold text-white">
                    {STUDENT_GALLERY_MOMENTS[lightboxIndex].title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="rounded-lg p-2 text-violet-300 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Lightbox Main Image & Navigation Arrows */}
              <div className="relative mt-4 overflow-hidden rounded-xl bg-purple-950 flex items-center justify-center min-h-[300px]">
                <img
                  src={STUDENT_GALLERY_MOMENTS[lightboxIndex].photoUrl}
                  alt={STUDENT_GALLERY_MOMENTS[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[68vh] object-contain mx-auto"
                />

                {/* Left Arrow */}
                <button
                  type="button"
                  onClick={handlePrevLightbox}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-950/80 border border-violet-400/40 text-white backdrop-blur-md hover:bg-violet-600 transition-colors cursor-pointer shadow-lg"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Right Arrow */}
                <button
                  type="button"
                  onClick={handleNextLightbox}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-950/80 border border-violet-400/40 text-white backdrop-blur-md hover:bg-violet-600 transition-colors cursor-pointer shadow-lg"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Lightbox Footer & Thumbnail Switcher */}
              <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-violet-300">
                <p className="line-clamp-2 max-w-xl">
                  {STUDENT_GALLERY_MOMENTS[lightboxIndex].description}
                </p>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {STUDENT_GALLERY_MOMENTS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className={`h-10 w-14 overflow-hidden rounded-lg border transition-all cursor-pointer ${
                        lightboxIndex === idx
                          ? 'border-violet-400 ring-2 ring-violet-400/50 scale-105'
                          : 'border-purple-500/30 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.photoUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
