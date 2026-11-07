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

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#180F2E]';
  const taglineColor =
    theme === 'dark' ? 'text-violet-300' : 'text-violet-700';

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
          fill="#13092D"
          stroke="#A855F7"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        {/* Electric Violet orbital knowledge & DNA arc */}
        <path
          d="M14 44C14 28.536 22.059 16 32 16C41.941 16 50 28.536 50 44"
          stroke="#8B5CF6"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Phosphodiester Cyan secondary helix loop */}
        <path
          d="M20 22C26 26 38 26 44 22"
          stroke="#06B6D4"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Open academic book leaves in Warm Gold */}
        <path
          d="M15 25.5C21.2 22.5 27.4 23.4 32 27.5C36.6 23.4 42.8 22.5 49 25.5V46.5C42.8 43.5 36.6 44.4 32 48.5C27.4 44.4 21.2 43.5 15 46.5V25.5Z"
          fill="#1D1042"
          stroke="#F59E0B"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Center spine & spire */}
        <path
          d="M32 27.5V48.5"
          stroke="#F59E0B"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Zenith diamond of excellence */}
        <path
          d="M32 10.5L35.4 15L32 19.5L28.6 15L32 10.5Z"
          fill="#F59E0B"
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
