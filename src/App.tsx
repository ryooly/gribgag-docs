import { useCallback, useEffect, useState } from 'react';
import { DocsWorkspace } from './components/DocsWorkspace';
import { HeroBanner } from './components/HeroBanner';
import { SearchModal } from './components/SearchModal';
import { TopBar } from './components/TopBar';
import { DOC_ARTICLES } from './data/docsData';

function getInitialArticleId(): string {
  if (typeof window === 'undefined') return 'overview';
  const hash = window.location.hash.replace('#', '');
  const matched = DOC_ARTICLES.find((a) => a.id === hash);
  return matched ? matched.id : 'overview';
}

export default function App() {
  const [activeArticleId, setActiveArticleId] = useState<string>(getInitialArticleId);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleSelectArticle = useCallback((id: string, shouldScroll = true) => {
    setActiveArticleId(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`);
      if (shouldScroll) {
        const el = document.getElementById('docs-workspace');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const matched = DOC_ARTICLES.find((a) => a.id === hash);
      if (matched) {
        setActiveArticleId(matched.id);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F9FF] text-[#0A1A3F] overflow-x-clip">
      <TopBar
        activeArticleId={activeArticleId}
        onSelectArticle={(id) => handleSelectArticle(id, true)}
        onToggleMobileNav={() => setMobileNavOpen((prev) => !prev)}
      />

      <main className="flex-1">
        <HeroBanner onJumpToArticle={(id) => handleSelectArticle(id, true)} />

        <DocsWorkspace
          activeArticleId={activeArticleId}
          onSelectArticle={(id) => handleSelectArticle(id, true)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenMobileNav={() => setMobileNavOpen(true)}
          mobileNavOpen={mobileNavOpen}
          onCloseMobileNav={() => setMobileNavOpen(false)}
        />
      </main>

      <footer className="border-t-2 border-[#0A1A3F] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-display font-extrabold text-base text-[#0A1A3F]">
              GribGag Knowledge Base
            </div>
            <p className="text-xs text-[#475569] mt-0.5">
              © 2026 GribGag. Product documentation, reward rules, and knowledge base.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs font-semibold text-[#334155]">
            <a
              href="https://t.me/GrabGig_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1250E8] hover:underline font-bold"
            >
              Telegram Bot
            </a>
            <button
              type="button"
              onClick={() => handleSelectArticle('overview', true)}
              className="hover:text-[#1250E8] cursor-pointer"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => handleSelectArticle('quickstart', true)}
              className="hover:text-[#1250E8] cursor-pointer"
            >
              Quickstart
            </button>
            <button
              type="button"
              onClick={() => handleSelectArticle('payout-rails', true)}
              className="hover:text-[#1250E8] cursor-pointer"
            >
              Payouts
            </button>
            <button
              type="button"
              onClick={() => handleSelectArticle('brand-mascot', true)}
              className="hover:text-[#1250E8] cursor-pointer"
            >
              Brand &amp; Mascot
            </button>
            <button
              type="button"
              onClick={() => handleSelectArticle('faq', true)}
              className="hover:text-[#1250E8] cursor-pointer"
            >
              FAQ
            </button>
          </div>
        </div>
      </footer>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectArticle={(id) => handleSelectArticle(id, true)}
      />
    </div>
  );
}
