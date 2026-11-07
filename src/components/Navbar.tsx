import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { NAV_LINKS } from '../data/academyData';

interface NavbarProps {
  onBookClassClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClassClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((item) => item.id);

    const updateActiveFromScroll = () => {
      const marker = window.innerHeight * 0.35;
      let currentId = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > 80) {
          currentId = id;
        }
      }

      setActiveSection(currentId);
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveFromScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = href;
    }
  };

  const handleBookClick = () => {
    setMobileMenuOpen(false);
    onBookClassClick();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#0B071E]/92 backdrop-blur-md shadow-lg shadow-purple-950/40 border-b border-purple-500/20'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Wordmark & Emblem */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'home')}
            aria-label="ProBio Academy Home"
            className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 rounded-lg"
          >
            <BrandLogo theme="dark" size="sm" />
          </a>

          {/* Single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-7"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 ${
                    isActive
                      ? 'text-amber-300'
                      : 'text-violet-100/80 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-violet-400 to-amber-400 transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleBookClick}
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-purple-900/30 transition-all duration-150 hover:from-violet-500 hover:to-fuchsia-500 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a Class
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-purple-500/25 bg-[#1D1042] text-white transition-colors hover:bg-violet-600 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-[#0B071E]/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="relative ml-auto flex h-full w-full max-w-xs flex-col justify-between bg-[#13092D] px-6 py-6 text-white shadow-2xl border-l border-purple-500/20"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-purple-500/20">
                  <BrandLogo theme="dark" size="sm" />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/15 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav aria-label="Mobile Menu Links" className="mt-6 flex flex-col gap-1.5">
                  {NAV_LINKS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, item.id)}
                        className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-violet-600/30 text-amber-300'
                            : 'text-violet-100/90 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="text-xs font-semibold text-amber-300">Active</span>
                        )}
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 text-center text-sm font-bold text-white shadow-md transition-all hover:from-violet-500 hover:to-fuchsia-500 cursor-pointer"
                >
                  Book a Class
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
