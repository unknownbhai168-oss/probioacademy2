import React from 'react';
import { ACADEMY_INFO } from '../data/academyData';

interface BrandLogoProps {
  theme?: 'dark' | 'light';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  theme = 'dark',
  showTagline = false,
  size = 'md',
}) => {
  const iconDimensions =
    size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-9 w-9';
  const titleSize =
    size === 'sm'
      ? 'text-base'
      : size === 'lg'
        ? 'text-2xl'
        : 'text-lg sm:text-xl';

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#101D36]';
  const taglineColor =
    theme === 'dark' ? 'text-[#F2B84B]/90' : 'text-[#2855C5]';

  return (
    <span className="inline-flex items-center gap-3 shrink-0 select-none">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`${iconDimensions} shrink-0`}
      >
        <rect
          x="3"
          y="3"
          width="58"
          height="58"
          rx="14"
          fill="#101D36"
          stroke="#F2B84B"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        {/* Royal Blue orbital knowledge arc */}
        <path
          d="M14 44C14 28.536 22.059 16 32 16C41.941 16 50 28.536 50 44"
          stroke="#2855C5"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Open academic book leaves in Warm Gold */}
        <path
          d="M15 24.5C21.2 21.5 27.4 22.4 32 26.5C36.6 22.4 42.8 21.5 49 24.5V45.5C42.8 42.5 36.6 43.4 32 47.5C27.4 43.4 21.2 42.5 15 45.5V24.5Z"
          fill="#182B4E"
          stroke="#F2B84B"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Center spine & spire */}
        <path
          d="M32 26.5V47.5"
          stroke="#F2B84B"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Zenith diamond of excellence */}
        <path
          d="M32 10.5L35.4 15L32 19.5L28.6 15L32 10.5Z"
          fill="#F2B84B"
        />
      </svg>

      <span className="flex flex-col">
        <span
          className={`font-serif font-bold tracking-tight leading-none whitespace-nowrap ${titleSize} ${textColor}`}
        >
          {ACADEMY_INFO.brandDisplay}
        </span>
        {showTagline && (
          <span
            className={`mt-1 text-[11px] font-medium tracking-wide whitespace-nowrap ${taglineColor}`}
          >
            {ACADEMY_INFO.tagline}
          </span>
        )}
      </span>
    </span>
  );
};
