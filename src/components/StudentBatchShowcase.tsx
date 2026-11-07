import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Eye,
  MapPin,
  Maximize2,
  MessageCircle,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

type BackdropMode = 'cinematic' | 'daylight' | 'clarity';

export const StudentBatchShowcase: React.FC = () => {
  const [backdropMode, setBackdropMode] = useState<BackdropMode>('cinematic');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(true);

  // Overlay styles based on chosen mode so the student photo is directly integrated into the website background
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

  return (
    <section
      id="students-batch"
      className="relative min-h-[760px] lg:min-h-[860px] scroll-mt-20 sm:scroll-mt-24 overflow-hidden pt-20 pb-24 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32 text-white"
    >
      {/* =========================================================================
          BACKGROUND LAYER: Authentic Student Batch Photograph (Directly Integrated)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {imgLoaded ? (
          <img
            src={ACADEMY_INFO.studentGroupPhotoUrl}
            alt="Shubhajit Sir's NEET Students and Classroom Batch at ProBio Academy"
            referrerPolicy="no-referrer"
            onError={() => setImgLoaded(false)}
            className="h-full w-full object-cover object-[center_35%] filter brightness-[0.88] contrast-[1.08] transition-transform duration-1000 ease-out scale-100"
          />
        ) : (
          <div className="h-full w-full bg-[#13092D]" />
        )}

        {/* Purplish Atmospheric Color Overlay (Responsive to User Mode Toggle) */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${getOverlayClasses()}`}
        />

        {/* Top and Bottom Vignette Gradients for Seamless Section Blending */}
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
          FOREGROUND CONTENT: Glassmorphic Cards Floating Over Student Background
          ========================================================================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-purple-500/20 backdrop-blur-xs">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-purple-950/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-violet-200 shadow-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Integrated Classroom Background · Baranagar Center</span>
          </div>

          {/* Interactive Background Clarity / Transparency Controls */}
          <div className="flex flex-wrap items-center gap-2">
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
                title="Classroom Daylight — reveals more yellow classroom walls and natural lighting"
              >
                Classroom Daylight
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
              onClick={() => setIsLightboxOpen(true)}
              aria-label="View photo in high-resolution full screen"
              className="inline-flex items-center gap-1.5 rounded-xl border border-violet-400/30 bg-purple-950/80 px-3 py-1.5 text-xs font-medium text-violet-200 shadow-md backdrop-blur-md transition-colors hover:bg-violet-600 hover:text-white cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5 text-amber-300" />
              <span>Enlarge Photo</span>
            </button>
          </div>
        </div>

        {/* Section Headline & Narrative */}
        <div className="mt-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance leading-[1.12]">
              Inside the Classroom:{' '}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-amber-300 bg-clip-text text-transparent">
                Where Ambition Meets Mentorship.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-violet-100/90 drop-shadow-sm">
              You are looking at the authentic classroom of{' '}
              <strong className="text-white font-semibold">ProBio Academy</strong> at Bireswar
              Dhole Lane, Baranagar. Here, Class 11, Class 12, and Dropper students gather daily to
              turn medical dreams into rigorous academic reality.
            </p>
          </motion.div>
        </div>

        {/* Floating 3-Column Glassmorphic Feature Cards Over the Student Backdrop */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Class 11 & 12 Synergy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
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
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Card 3: Interactive Doubt Clearance & Peer Synergy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
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
        </div>

        {/* Bottom Classroom Info & WhatsApp CTA Floating Glass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
                href={ACADEMY_INFO.whatsappBaseUrl + '?text=' + encodeURIComponent('Hello Sir! I saw the classroom batch photograph and would like to enquire about NEET batch timings and seat availability for Class 11 / Class 12 / Droppers.')}
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
          LIGHTBOX MODAL: Full View of the Authentic Lossless PNG Photo
          ========================================================================= */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full overflow-hidden rounded-2xl border border-purple-500/30 bg-[#0B071E] p-4 text-white shadow-2xl cursor-default"
            >
              <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                <div>
                  <p className="font-serif text-lg font-bold text-white">
                    ProBio Academy — Authentic Student Batch
                  </p>
                  <p className="text-xs text-violet-300">
                    Shubhajit Sir with NEET Aspirants at Baranagar, Kolkata (Class 11, 12 &amp; Droppers)
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

              <div className="mt-4 overflow-hidden rounded-xl bg-purple-950 flex items-center justify-center">
                <img
                  src={ACADEMY_INFO.studentGroupPhotoUrl}
                  alt="Students of ProBio Academy"
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[75vh] object-contain mx-auto"
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-violet-300">
                <span>Real Classroom Photography · Preserved in High-Resolution PNG</span>
                <span className="text-amber-300 font-medium">9/1, Bireswar Dhole Ln, Bonhoogly</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
