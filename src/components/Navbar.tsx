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
            ? 'bg-[#101D36] shadow-lg shadow-[#091121]/25 border-b border-white/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Zone 1: Single-line Brand Wordmark & Emblem */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'home')}
            aria-label="ProBio Academy Home"
            className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B84B] rounded-lg"
          >
            <BrandLogo theme="dark" size="sm" />
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-8"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B84B] ${
                    isActive
                      ? 'text-[#F2B84B]'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-[#F2B84B] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleBookClick}
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#F2B84B] px-4 py-2 text-xs sm:text-sm font-semibold text-[#101D36] shadow-sm transition-all duration-150 hover:bg-[#F6C96E] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a Class
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#182B4E]/80 text-white transition-colors hover:bg-[#2855C5] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B84B]"
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
              className="absolute inset-0 bg-[#091121]/75"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="relative ml-auto flex h-full w-full max-w-xs flex-col justify-between bg-[#101D36] px-6 py-6 text-white shadow-2xl border-l border-white/10"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
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
                            ? 'bg-[#2855C5]/35 text-[#F2B84B]'
                            : 'text-white/90 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="text-xs font-semibold text-[#F2B84B]">Active</span>
                        )}
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="w-full rounded-lg bg-[#F2B84B] px-5 py-3.5 text-center text-sm font-semibold text-[#101D36] shadow-md transition-colors hover:bg-[#F6C96E] cursor-pointer"
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
