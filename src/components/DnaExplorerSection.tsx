import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Check,
  Dna,
  Eye,
  Info,
  Maximize2,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import {
  HyperRealisticDnaCanvas,
  type DnaRenderMode,
} from './HyperRealisticDnaCanvas';

interface DnaKeyConcept {
  id: string;
  badge: string;
  title: string;
  neetFact: string;
  details: string;
  colorClass: string;
}

const DNA_CONCEPTS: DnaKeyConcept[] = [
  {
    id: 'antiparallel',
    badge: "5' to 3' Polarity",
    title: 'Antiparallel Double Strands',
    neetFact: 'One strand runs 5’→3’ while complementary strand runs 3’→5’.',
    details:
      'Continuous sugar-phosphate backbones held by 3’–5’ phosphodiester linkages. In NEET, polarity questions frequently test replication and transcription directionality.',
    colorClass: 'border-violet-500/40 text-violet-300',
  },
  {
    id: 'grooves',
    badge: 'Groove Architecture',
    title: 'Major & Minor Grooves',
    neetFact: 'Major groove (22 Å) & Minor groove (12 Å) alternate every 34 Å turn.',
    details:
      'The angular offset of ~138° between the two glycosidic bonds creates wide major grooves where sequence-specific transcription factors bind.',
    colorClass: 'border-cyan-500/40 text-cyan-300',
  },
  {
    id: 'base-pairing',
    badge: 'Chargaff & Watson-Crick',
    title: 'Specific Base-Pairing (A=T & G≡C)',
    neetFact: 'Adenine pairs with Thymine via 2 H-bonds; Guanine pairs with Cytosine via 3 H-bonds.',
    details:
      'Uniform 20 Å diameter maintained across the helix because a purine (dual ring) always pairs with a pyrimidine (single ring). High G-C content yields higher denaturation melting temperatures (Tm).',
    colorClass: 'border-amber-500/40 text-amber-300',
  },
  {
    id: 'dimensions',
    badge: 'B-DNA Dimensions',
    title: '10 Base Pairs per Complete Turn',
    neetFact: 'Pitch of helix is 34 Å (3.4 nm); distance between consecutive base pairs is 3.4 Å (0.34 nm).',
    details:
      'High-yield numericals in NEET calculate total base pairs in human diploid cells (6.6 × 10⁹ bp) and total DNA length (2.2 metres per cell nucleus).',
    colorClass: 'border-emerald-500/40 text-emerald-300',
  },
];

export const DnaExplorerSection: React.FC = () => {
  const [renderMode, setRenderMode] = useState<DnaRenderMode>('bioluminescent');
  const [activeConceptId, setActiveConceptId] = useState<string>(DNA_CONCEPTS[0].id);

  const activeConcept =
    DNA_CONCEPTS.find((c) => c.id === activeConceptId) || DNA_CONCEPTS[0];

  return (
    <section
      id="dna-explorer"
      className="relative overflow-hidden bg-gradient-to-b from-[#0B071E] via-[#13092D] to-[#0B071E] py-20 sm:py-24 lg:py-28 text-white"
    >
      {/* Bioluminescent Background Field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-ambient-purple absolute -top-24 left-1/4 h-[520px] w-[520px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, transparent 70%)' }}
        />
        <div
          className="animate-ambient-purple absolute bottom-0 right-10 h-[480px] w-[480px] rounded-full blur-[130px]"
          style={{
            animationDelay: '-6s',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(192, 132, 252, 0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/60 px-3.5 py-1 text-xs font-semibold tracking-[0.16em] uppercase text-violet-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Interactive Molecular Biology Lab</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-tight">
              Hyper-Realistic <span className="text-violet-400">3D DNA Double Helix</span>
            </h2>
            <p className="mt-3 text-base text-violet-200/85">
              Experience the molecular elegance of life in real-time 3D. Inspect Watson-Crick base
              pairing, major/minor grooves, and high-yield NEET conceptual fundamentals.
            </p>
          </motion.div>

          {/* Render Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-violet-500/25 bg-[#1D1042]/80 p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setRenderMode('bioluminescent')}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                renderMode === 'bioluminescent'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                  : 'text-violet-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Bioluminescent Mode
            </button>
            <button
              type="button"
              onClick={() => setRenderMode('base-pairs')}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                renderMode === 'base-pairs'
                  ? 'bg-gradient-to-r from-cyan-600 to-violet-600 text-white shadow-md'
                  : 'text-violet-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Base-Pair Highlight (A-T / G-C)
            </button>
            <button
              type="button"
              onClick={() => setRenderMode('molecular-glass')}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                renderMode === 'molecular-glass'
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md'
                  : 'text-violet-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Crystallography Glass
            </button>
          </div>
        </div>

        {/* 3D DNA Canvas Stage + NEET Breakdown Panel */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Interactive 3D Canvas */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3.8] sm:aspect-[4/3.2] lg:aspect-[4/3.4] w-full rounded-2xl border border-violet-500/25 bg-gradient-to-b from-[#180E38] to-[#0E0724] shadow-2xl overflow-hidden group">
              <HyperRealisticDnaCanvas
                mode={renderMode}
                interactive={true}
                className="h-full w-full"
              />

              {/* Interactive Gesture Hint Pill */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-violet-300/80">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-purple-950/70 px-3 py-1 backdrop-blur-md">
                  <RotateCw className="h-3 w-3 text-cyan-400" />
                  <span>Click and drag to orbit DNA 360°</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-purple-950/70 px-3 py-1 backdrop-blur-md">
                  <Activity className="h-3 w-3 text-amber-400" />
                  <span>Real-time B-DNA Simulation</span>
                </span>
              </div>

              {/* Nitrogenous Base Legend Overlay */}
              <div className="pointer-events-none absolute top-4 left-4 flex flex-wrap gap-2 text-[11px] font-medium">
                <span className="inline-flex items-center gap-1 rounded-md bg-purple-950/80 px-2 py-0.5 border border-fuchsia-500/40 text-fuchsia-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[#f43f5e]" /> Adenine (A)
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-purple-950/80 px-2 py-0.5 border border-cyan-500/40 text-cyan-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[#06b6d4]" /> Thymine (T)
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-purple-950/80 px-2 py-0.5 border border-emerald-500/40 text-emerald-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[#10b981]" /> Guanine (G)
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-purple-950/80 px-2 py-0.5 border border-violet-500/40 text-violet-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[#8b5cf6]" /> Cytosine (C)
                </span>
              </div>
            </div>
          </div>

          {/* Right: High-Yield NEET Concept Selector */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="rounded-2xl border border-violet-500/25 bg-[#1D1042]/90 p-6 shadow-xl backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                High-Yield NEET UG Biology Blueprint
              </p>
              <h3 className="mt-2 font-serif text-xl sm:text-2xl font-bold text-white">
                Molecular Basis of Inheritance
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-violet-200/90 leading-relaxed">
                Click any core concept below to examine how Shubhajit Sir deconstructs complex
                biomolecular mechanisms into intuitive scoring frameworks.
              </p>

              {/* Concept Tabs */}
              <div className="mt-5 space-y-2.5">
                {DNA_CONCEPTS.map((concept) => {
                  const isSelected = concept.id === activeConcept.id;
                  return (
                    <button
                      key={concept.id}
                      type="button"
                      onClick={() => setActiveConceptId(concept.id)}
                      className={`w-full text-left rounded-xl p-3.5 border transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'border-violet-400 bg-violet-950/90 shadow-md ring-1 ring-violet-400/50'
                          : 'border-violet-500/20 bg-[#130A2E]/60 hover:border-violet-500/40 hover:bg-[#130A2E]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                          {concept.badge}
                        </span>
                        {isSelected && <Check className="h-4 w-4 text-amber-400" />}
                      </div>
                      <p className="mt-1 font-serif text-sm sm:text-base font-semibold text-white">
                        {concept.title}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Concept In-Depth NEET Callout */}
              <div className="mt-5 rounded-xl border border-violet-500/30 bg-purple-950/70 p-4">
                <div className="flex items-start gap-2.5">
                  <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-300">
                      NEET High-Yield Fact:
                    </p>
                    <p className="mt-0.5 text-xs text-white leading-relaxed">
                      {activeConcept.neetFact}
                    </p>
                    <p className="mt-2 pt-2 border-t border-violet-500/20 text-xs text-violet-200/85 leading-relaxed">
                      {activeConcept.details}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
