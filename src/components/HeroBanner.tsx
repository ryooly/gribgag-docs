import React, { useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { HERO_METRICS } from '../data/docsData';
import { ActionSparksSvg, SpeedStopwatchSvg } from './ComicArt';

interface HeroBannerProps {
  onJumpToArticle: (id: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onJumpToArticle }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b-2 border-[#0A1A3F] bg-gradient-to-b from-[#0EA5E9] via-[#38BDF8] to-[#BAE6FD]"
    >
      {/* Daytime clouds, speed lines & city skyline backdrop matching the GribGag artwork */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 comic-speed-stripes opacity-30" />

        <svg
          className="absolute bottom-0 left-0 w-full h-40 sm:h-48 text-[#7DD3FC]/75"
          preserveAspectRatio="none"
          viewBox="0 0 1440 180"
          fill="currentColor"
        >
          <path d="M0 180V120h44v-28h36v28h32V74h48v46h24v-18h40v18h36V62h54v58h28v-34h42v34h48V82h46v38h32v-22h44v22h48V56h56v64h30v-32h40v32h38V72h52v48h34v-24h46v24h44V68h50v52h36v-26h44v26h48V76h52v44h36v-20h48v20h34v60H0z" />
        </svg>

        <svg
          className="absolute top-3 left-6 w-56 h-24 text-white/40"
          viewBox="0 0 320 120"
          fill="currentColor"
        >
          <path d="M62 98h198c24 0 42-16 42-37 0-19-15-35-35-37-9-16-27-24-47-24-22 0-41 11-50 28-6-2-13-4-20-4-24 0-44 17-48 39-17 2-30 14-30 30 0 3 2 5 5 5z" />
        </svg>

        <svg
          className="absolute -top-4 right-10 w-80 h-36 text-white/50"
          viewBox="0 0 320 120"
          fill="currentColor"
        >
          <path d="M62 98h198c24 0 42-16 42-37 0-19-15-35-35-37-9-16-27-24-47-24-22 0-41 11-50 28-6-2-13-4-20-4-24 0-44 17-48 39-17 2-30 14-30 30 0 3 2 5 5 5z" />
        </svg>

        <svg
          className="absolute bottom-0 left-0 w-full h-16 text-[#F2F9FF]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 60"
          fill="currentColor"
        >
          <path d="M0 60V34c42-22 96-24 142-6 36-22 90-20 124 4 46-24 108-22 152 6 38-20 92-18 128 4 50-24 114-22 158 6 44-22 102-20 140 4 48-24 112-22 156 6 40-20 96-18 134 4 48-24 112-22 158 6 42-22 98-20 134 4 40-18 86-14 114 8v20H0z" />
        </svg>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-3 sm:px-8 pt-5 pb-8 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16">
        <div className="grid grid-cols-12 gap-2.5 sm:gap-6 lg:gap-10 items-stretch">
          {/* Left column: Comic-framed editorial proposition */}
          <div className="col-span-7 md:col-span-6 relative flex flex-col justify-between bg-white comic-frame rounded-xl sm:rounded-2xl p-3 sm:p-6 lg:p-8 min-w-0">
            {/* Signature comic sparks & speeding stopwatch in top-right */}
            <div
              aria-hidden="true"
              className="hidden sm:flex items-center gap-1 absolute -top-5 right-6 pointer-events-none"
            >
              <ActionSparksSvg className="w-11 h-7 -rotate-12" />
              <SpeedStopwatchSvg className="w-20 h-14 drop-shadow-[2px_2px_0px_#0A1A3F]" />
            </div>

            <div>
              <p className="text-[10px] sm:text-xs lg:text-sm font-bold text-[#1250E8] tracking-wide mb-1.5 sm:mb-3 sm:pr-24 leading-snug">
                GribGag Documentation <span aria-hidden="true">·</span> Knowledge Base{' '}
                <span aria-hidden="true">·</span> Earning Guide
              </p>

              <h1
                className="font-display font-extrabold text-[#0A1A3F] tracking-tight leading-[1.08] sm:leading-[1.05] mb-2 sm:mb-4"
                style={{
                  fontSize: 'clamp(1.1rem, 4.1vw, 3.35rem)',
                  textWrap: 'balance',
                }}
              >
                Earn in less than{' '}
                <span className="relative inline-block text-[#1250E8]">
                  <span>1 Minute</span>
                  <svg
                    viewBox="0 0 180 14"
                    fill="none"
                    aria-hidden="true"
                    className="w-full h-2 sm:h-3 -mt-0.5 sm:-mt-1 block"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 10C48 3 128 2 177 8"
                      stroke="#00D2FF"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                — built to verify fast.
              </h1>

              <p className="text-[11px] sm:text-sm lg:text-[17px] leading-snug sm:leading-relaxed text-[#334155] max-w-xl mb-3 sm:mb-6">
                Everything your team, partners, and creators need to understand GribGag: sub-minute
                micro-quests, daily streak multipliers, 6 instant payout rails, and real-time
                anti-fraud verification.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-1.5 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="https://t.me/GrabGig_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="comic-btn inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-5 py-2 sm:py-3 min-h-[38px] sm:min-h-[44px] rounded-lg sm:rounded-xl bg-[#1250E8] text-white font-semibold text-[11px] sm:text-base leading-tight text-center cursor-pointer sm:whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A1A3F]"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
                <span>Start Earning on Telegram</span>
              </a>

              <button
                type="button"
                onClick={() => onJumpToArticle('quickstart')}
                className="inline-flex items-center justify-start sm:justify-center gap-1 sm:gap-1.5 px-0.5 sm:px-3 py-1.5 sm:py-2.5 min-h-[36px] sm:min-h-[44px] text-[11px] sm:text-base font-bold text-[#0A1A3F] hover:text-[#1250E8] underline decoration-2 decoration-[#00D2FF] underline-offset-4 leading-tight text-left transition-colors cursor-pointer sm:whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1250E8] rounded"
              >
                <span>Read 60s Quickstart</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right column: Uploaded Mascot Artwork with comic burst accent */}
          <div className="col-span-5 md:col-span-6 flex relative min-w-0">
            <div
              aria-hidden="true"
              className="hidden sm:block absolute -top-5 -left-3 z-10 pointer-events-none"
            >
              <ActionSparksSvg className="w-12 h-8 -rotate-12" />
            </div>

            <div className="relative w-full h-full comic-frame rounded-xl sm:rounded-2xl overflow-hidden bg-[#0D47E8] min-h-[180px] lg:min-h-full">
              {!imgError ? (
                <img
                  src="/assets/aistudio/Maskot_Bebek_Kripto_di_Kota_Futuristik_4358bb02.png"
                  alt="GribGag mascot duck in blue cap and sunglasses holding smartphone with floating blue tokens in front of futuristic city plaza"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-[26%_center] md:object-center block"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 text-center bg-gradient-to-br from-[#1250E8] to-[#00D2FF] text-white">
                  <span className="font-display text-lg sm:text-3xl font-extrabold mb-1 sm:mb-2">
                    Earn in Less than 1 Minute
                  </span>
                  <span className="text-xs sm:text-sm text-sky-100">GribGag Mascot &amp; Mobile App</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width 4-column Architecture Metrics Strip */}
        <div className="mt-6 bg-white comic-frame rounded-xl overflow-hidden grid grid-cols-2 lg:grid-cols-4">
          {HERO_METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={`px-4 sm:px-5 py-4 flex flex-col justify-center relative overflow-hidden border-[#0A1A3F]/15 ${
                idx < 2 ? 'border-b-2 lg:border-b-0' : ''
              } ${idx % 2 === 0 ? 'border-r-2' : ''} ${
                idx < 3 ? 'lg:border-r-2' : 'lg:border-r-0'
              }`}
            >
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  backgroundColor:
                    idx === 0
                      ? '#1250E8'
                      : idx === 1
                        ? '#00D2FF'
                        : idx === 2
                          ? '#FACC15'
                          : '#38BDF8',
                }}
              />
              <span className="text-xs font-semibold text-[#475569] mb-1 pt-0.5">
                {metric.label}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2.5">
                <span className="font-display text-xl sm:text-2xl font-extrabold text-[#0A1A3F] tabular-nums">
                  {metric.value}
                </span>
                <span className="text-[11px] sm:text-xs text-[#1250E8] font-semibold">
                  {metric.context}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
