import React from 'react';
import { Menu, Send } from 'lucide-react';

interface TopBarProps {
  activeArticleId: string;
  onSelectArticle: (id: string) => void;
  onToggleMobileNav: () => void;
}

const TOP_NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'earning-loops', label: 'Earning Loops' },
  { id: 'payout-rails', label: 'Payouts' },
  { id: 'brand-mascot', label: 'Brand & FAQ' },
];

export const TopBar: React.FC<TopBarProps> = ({
  activeArticleId,
  onSelectArticle,
  onToggleMobileNav,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#0A1A3F]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-8 h-16 flex items-center justify-between gap-2 sm:gap-6 md:gap-8">
        {/* Zone 1: Brand Title (single line, clean wordmark) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleMobileNav}
            aria-label="Open documentation navigation"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border-2 border-[#0A1A3F] bg-[#F2F9FF] text-[#0A1A3F] hover:bg-[#E0F2FE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1250E8]"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onSelectArticle('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-[#0A1A3F] whitespace-nowrap shrink-0 font-display focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1250E8] rounded"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <rect
                x="1.5"
                y="1.5"
                width="29"
                height="29"
                rx="8"
                fill="#1250E8"
                stroke="#0A1A3F"
                strokeWidth="2.5"
              />
              <path
                d="M21.5 11.5C19.8 9.9 17.5 9.2 15.1 9.6C11.4 10.2 9 13.7 9.6 17.4C10.2 21.1 13.7 23.5 17.4 22.9C20.2 22.4 22.3 20.3 22.9 17.6H16.2"
                stroke="#22D3EE"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="22" cy="11.5" r="2" fill="#FACC15" />
            </svg>
            <span>GribGag</span>
          </a>
        </div>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav aria-label="Primary documentation navigation" className="hidden md:flex items-center gap-7">
          {TOP_NAV_ITEMS.map((item) => {
            const isActive = activeArticleId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectArticle(item.id)}
                className={`relative py-1 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1250E8] rounded cursor-pointer ${
                  isActive
                    ? 'text-[#1250E8] underline decoration-2 decoration-[#00D2FF] underline-offset-8'
                    : 'text-[#334155] hover:text-[#0A1A3F] hover:underline hover:decoration-2 hover:decoration-[#38BDF8] hover:underline-offset-8'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="shrink-0">
          <a
            href="https://t.me/GrabGig_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="comic-btn inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 min-h-[40px] rounded-xl bg-[#1250E8] text-white text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A1A3F]"
          >
            <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Open Bot</span>
          </a>
        </div>
      </div>
    </header>
  );
};
