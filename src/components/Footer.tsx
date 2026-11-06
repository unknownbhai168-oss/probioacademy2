import React from 'react';
import { ArrowUp, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { buildGeneralWhatsAppUrl } from '../utils/booking';
import { BrandLogo } from './BrandLogo';

const FOOTER_QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Teacher', href: '#teacher' },
  { label: 'Courses', href: '#courses' },
  { label: 'Contact', href: '#contact' },
];

export const Footer: React.FC = () => {
  const whatsappUrl = buildGeneralWhatsAppUrl();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#091121] text-slate-300 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-4">
            <BrandLogo theme="dark" showTagline={true} size="md" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Private tuition and academic coaching by {ACADEMY_INFO.teacherName}, guiding
              learners from {ACADEMY_INFO.teachingRange} with conceptual clarity and
              structured mentorship.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-base font-bold text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-300 transition-colors hover:text-[#F2B84B]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base font-bold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={ACADEMY_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 text-slate-200 transition-colors hover:text-[#F2B84B] tabular-nums"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#F2B84B]" />
                  <span>{ACADEMY_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-slate-200 transition-colors hover:text-[#25D366]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366]" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="h-4 w-4 shrink-0 text-[#F2B84B] mt-1" />
                <span>{ACADEMY_INFO.fullAddress}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Opening Hours */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base font-bold text-white">
              Opening Hours
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              {ACADEMY_INFO.openingHours.map((slot) => (
                <li key={slot.days} className="tabular-nums">
                  {slot.compact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back-to-Top Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} {ACADEMY_INFO.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to top of page"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#101D36] px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#F2B84B] hover:text-[#F2B84B] cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
