import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/booking';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40">
      <span
        aria-hidden="true"
        className="animate-whatsapp-halo absolute inset-0 rounded-full bg-[#25D366]"
      />
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ProBio Academy on WhatsApp"
        title="Chat on WhatsApp"
        className="relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-[#091121] shadow-xl shadow-[#091121]/30 transition-transform duration-200 hover:scale-108 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B84B]"
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 fill-current" />
      </a>
    </div>
  );
};
