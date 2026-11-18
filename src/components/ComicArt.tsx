import React from 'react';

export const ActionSparksSvg: React.FC<{ className?: string }> = ({ className = 'w-12 h-8' }) => (
  <svg viewBox="0 0 64 40" fill="none" className={className} aria-hidden="true">
    <path
      d="M14 34L6 10L20 6L22 32L14 34Z"
      fill="#FACC15"
      stroke="#0A1A3F"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M32 30L29 4L40 4L38 30H32Z"
      fill="#FACC15"
      stroke="#0A1A3F"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M46 33L51 11L60 16L50 35L46 33Z"
      fill="#FACC15"
      stroke="#0A1A3F"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

export const SpeedStopwatchSvg: React.FC<{ className?: string }> = ({ className = 'w-20 h-16' }) => (
  <svg viewBox="0 0 110 84" fill="none" className={className} aria-hidden="true">
    {/* Speed lines */}
    <path d="M4 28H34" stroke="#0A1A3F" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M12 42H30" stroke="#1250E8" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M2 56H36" stroke="#0A1A3F" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M18 18H42" stroke="#00D2FF" strokeWidth="3" strokeLinecap="round" />

    {/* Stopwatch top button */}
    <rect
      x="65"
      y="6"
      width="14"
      height="8"
      rx="2"
      transform="rotate(12 65 6)"
      fill="#1250E8"
      stroke="#0A1A3F"
      strokeWidth="3"
    />
    <path
      d="M89 20L96 15"
      stroke="#0A1A3F"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Outer casing */}
    <circle
      cx="68"
      cy="46"
      r="29"
      fill="#1250E8"
      stroke="#0A1A3F"
      strokeWidth="3.5"
    />
    {/* Clock face */}
    <circle
      cx="68"
      cy="46"
      r="21"
      fill="#FFFFFF"
      stroke="#0A1A3F"
      strokeWidth="2.5"
    />
    {/* 1-minute sector highlight */}
    <path d="M68 46V28A18 18 0 0 1 83 36L68 46Z" fill="#22D3EE" opacity="0.55" />
    {/* Ticks */}
    <path d="M68 28V32M68 60V64M50 46H54M82 46H86" stroke="#0A1A3F" strokeWidth="2.5" strokeLinecap="round" />
    {/* Hands */}
    <path
      d="M68 46V33M68 46L79 39"
      stroke="#0A1A3F"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="68" cy="46" r="3.5" fill="#FACC15" stroke="#0A1A3F" strokeWidth="2" />
  </svg>
);

export const SwirlEmblemSvg: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="#1250E8" stroke="#0A1A3F" strokeWidth="3" />
    <path
      d="M32 16.5C29.5 14 25.8 13 22.1 13.7C16.5 14.8 12.8 20.2 13.8 25.9C14.8 31.6 20.2 35.3 25.9 34.3C30.4 33.5 33.7 30 34.4 25.7H24"
      stroke="#FFFFFF"
      strokeWidth="4.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 25.7L30 18"
      stroke="#22D3EE"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

export const ChapterVectorArt: React.FC<{ chapterId: string; className?: string }> = ({
  chapterId,
  className = 'w-16 h-16',
}) => {
  switch (chapterId) {
    case 'overview':
      return <SpeedStopwatchSvg className={className} />;
    case 'quickstart':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <rect
            x="22"
            y="14"
            width="36"
            height="56"
            rx="8"
            fill="#1250E8"
            stroke="#0A1A3F"
            strokeWidth="3"
          />
          <rect
            x="27"
            y="21"
            width="26"
            height="40"
            rx="4"
            fill="#071330"
            stroke="#0A1A3F"
            strokeWidth="2"
          />
          <path
            d="M45 31C42.8 29 39.6 28.5 36.8 29.5C33.3 30.8 31.3 34.5 32.3 38.2C33.3 41.9 37 44 40.7 43C43.5 42.2 45.6 40 46 37.2H39"
            stroke="#22D3EE"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M12 18L19 22M14 8L22 15M66 14L59 20" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'earning-loops':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <path
            d="M40 10L47.5 26.5L65.5 28.8L52.2 41.2L55.7 59L40 50.2L24.3 59L27.8 41.2L14.5 28.8L32.5 26.5L40 10Z"
            fill="#FACC15"
            stroke="#0A1A3F"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M42 25L35 38H42L38 49L47 35H40L42 25Z"
            fill="#1250E8"
            stroke="#0A1A3F"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'payout-rails':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <rect
            x="10"
            y="22"
            width="52"
            height="34"
            rx="6"
            fill="#22D3EE"
            stroke="#0A1A3F"
            strokeWidth="3"
          />
          <rect
            x="16"
            y="28"
            width="40"
            height="22"
            rx="3"
            fill="#FFFFFF"
            stroke="#0A1A3F"
            strokeWidth="2"
          />
          <circle cx="36" cy="39" r="7" fill="#FACC15" stroke="#0A1A3F" strokeWidth="2.5" />
          <path d="M56 14L69 24L56 34" stroke="#1250E8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'anti-fraud':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <path
            d="M40 10L64 19V38C64 52.5 53.6 64.5 40 69C26.4 64.5 16 52.5 16 38V19L40 10Z"
            fill="#1250E8"
            stroke="#0A1A3F"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M30 39L37 46L51 31"
            stroke="#FACC15"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'api-reference':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <rect
            x="10"
            y="16"
            width="60"
            height="48"
            rx="8"
            fill="#0A1A3F"
            stroke="#0A1A3F"
            strokeWidth="3"
          />
          <path
            d="M31 32L21 40L31 48M49 32L59 40L49 48M43 29L37 51"
            stroke="#22D3EE"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'brand-mascot':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Cool duck shades + backwards cap silhouette */}
          <path
            d="M18 32C18 19.8 27.8 11 40 11C52.2 11 62 19.8 62 32H18Z"
            fill="#1250E8"
            stroke="#0A1A3F"
            strokeWidth="3"
          />
          <path d="M11 32H62" stroke="#0A1A3F" strokeWidth="4" strokeLinecap="round" />
          <rect x="17" y="38" width="20" height="13" rx="3" fill="#0A1A3F" />
          <rect x="43" y="38" width="20" height="13" rx="3" fill="#0A1A3F" />
          <path d="M37 42H43" stroke="#0A1A3F" strokeWidth="3.5" />
          <path d="M21 41L28 48M47 41L54 48" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M28 57C34 64 46 64 52 57" stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <path
            d="M16 18H64C67.3 18 70 20.7 70 24V50C70 53.3 67.3 56 64 56H34L20 66V56H16C12.7 56 10 53.3 10 50V24C10 20.7 12.7 18 16 18Z"
            fill="#FACC15"
            stroke="#0A1A3F"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M35 31C35 28 37.5 26 40.5 26C43.5 26 46 28 46 31C46 34 40.5 35 40.5 39" stroke="#0A1A3F" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="40.5" cy="46" r="2.2" fill="#0A1A3F" />
        </svg>
      );
  }
};
