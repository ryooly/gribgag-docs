import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Filter, Play, Search, Send, X } from 'lucide-react';
import { DOC_ARTICLES, DOC_CATEGORIES, DocArticle, DocSectionBlock } from '../data/docsData';
import { CodeBlock } from './CodeBlock';
import { ActionSparksSvg, ChapterVectorArt, SwirlEmblemSvg } from './ComicArt';
import {
  BrandSwatchGrid,
  EarningLifecycleExplorer,
  FaqAccordion,
  PayoutRailsTable,
  PhoneQuestSimulator,
  StreakRewardCalculator,
} from './InteractiveWidgets';

interface DocsWorkspaceProps {
  activeArticleId: string;
  onSelectArticle: (id: string) => void;
  onOpenSearch: () => void;
  onOpenMobileNav: () => void;
  mobileNavOpen: boolean;
  onCloseMobileNav: () => void;
}

export const DocsWorkspace: React.FC<DocsWorkspaceProps> = ({
  activeArticleId,
  onSelectArticle,
  onOpenSearch,
  onOpenMobileNav,
  mobileNavOpen,
  onCloseMobileNav,
}) => {
  const [sidebarQuery, setSidebarQuery] = useState('');

  const activeIndex = DOC_ARTICLES.findIndex((a) => a.id === activeArticleId);
  const activeArticle: DocArticle =
    DOC_ARTICLES[activeIndex >= 0 ? activeIndex : 0] ?? DOC_ARTICLES[0];

  const prevArticle = activeIndex > 0 ? DOC_ARTICLES[activeIndex - 1] : null;
  const nextArticle =
    activeIndex >= 0 && activeIndex < DOC_ARTICLES.length - 1
      ? DOC_ARTICLES[activeIndex + 1]
      : null;

  const filteredArticlesByCategory = useMemo(() => {
    const q = sidebarQuery.trim().toLowerCase();
    return DOC_CATEGORIES.map((category) => {
      const items = DOC_ARTICLES.filter((article) => {
        if (article.category !== category.id) return false;
        if (!q) return true;
        return (
          article.title.toLowerCase().includes(q) ||
          article.summary.toLowerCase().includes(q) ||
          article.keywords.some((kw) => kw.toLowerCase().includes(q))
        );
      });
      return { category, items };
    }).filter((group) => group.items.length > 0);
  }, [sidebarQuery]);

  const renderWidget = (widgetType: DocSectionBlock['widget']) => {
    switch (widgetType) {
      case 'lifecycle':
        return <EarningLifecycleExplorer />;
      case 'phone-simulator':
        return <PhoneQuestSimulator />;
      case 'streak-calculator':
        return <StreakRewardCalculator />;
      case 'payout-rails':
        return <PayoutRailsTable />;
      case 'brand-swatches':
        return <BrandSwatchGrid />;
      case 'faq-accordion':
        return <FaqAccordion />;
      default:
        return null;
    }
  };

  const handleLaunchDemo = () => {
    onSelectArticle('overview');
    onCloseMobileNav();
    window.setTimeout(() => {
      const el = document.getElementById('phone-simulator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const sidebarContent = (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="sidebar-doc-filter" className="sr-only">
          Filter documentation guides
        </label>
        <div className="relative">
          <Filter
            className="w-4 h-4 text-[#475569] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="sidebar-doc-filter"
            type="search"
            value={sidebarQuery}
            onChange={(e) => setSidebarQuery(e.target.value)}
            placeholder="Filter guides..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border-2 border-[#0A1A3F] rounded-xl text-[#0A1A3F] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#1250E8]"
          />
        </div>

        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-semibold text-[#334155] bg-white border border-[#0A1A3F]/20 hover:border-[#0A1A3F] rounded-xl transition-colors cursor-pointer"
        >
          <span className="inline-flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#1250E8]" aria-hidden="true" />
            <span>Full Knowledge Search</span>
          </span>
          <kbd className="font-mono text-[10px] text-[#64748B] border border-[#0A1A3F]/15 rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        </button>
      </div>

      {filteredArticlesByCategory.length === 0 ? (
        <div className="p-4 rounded-xl bg-white border border-[#0A1A3F]/20 text-xs text-[#475569] space-y-2">
          <p>No guides matched &ldquo;{sidebarQuery}&rdquo;.</p>
          <button
            type="button"
            onClick={() => setSidebarQuery('')}
            className="text-[#1250E8] font-semibold underline cursor-pointer"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <nav aria-label="Documentation chapters" className="space-y-6">
          {filteredArticlesByCategory.map(({ category, items }) => (
            <div key={category.id}>
              <div className="text-xs font-extrabold text-[#0A1A3F] tracking-wide mb-2 px-2">
                {category.title}
              </div>
              <ul className="space-y-1">
                {items.map((article) => {
                  const isActive = article.id === activeArticle.id;
                  return (
                    <li key={article.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectArticle(article.id);
                          onCloseMobileNav();
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer flex items-baseline gap-2 ${
                          isActive
                            ? 'bg-[#1250E8] text-white font-semibold comic-frame-sm'
                            : 'text-[#334155] hover:bg-white hover:text-[#0A1A3F] font-medium'
                        }`}
                      >
                        <span
                          className={`font-mono text-xs tabular-nums shrink-0 ${
                            isActive ? 'text-[#22D3EE]' : 'text-[#64748B]'
                          }`}
                        >
                          {article.chapterNumber}
                        </span>
                        <span className="truncate">{article.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      )}

      {/* Illustrated Quick Demo & Telegram Bot Card */}
      <div className="comic-frame-sm rounded-2xl bg-gradient-to-br from-[#1250E8] to-[#0A256E] text-white p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <SwirlEmblemSvg className="w-10 h-10 shrink-0" />
          <ActionSparksSvg className="w-10 h-6" />
        </div>
        <div>
          <div className="font-display font-bold text-sm leading-snug">
            Ready to Earn in &lt;1 Minute?
          </div>
          <p className="text-xs text-sky-100/90 mt-1 leading-relaxed">
            Launch our live Telegram bot or try the interactive 3-tap quest simulator.
          </p>
        </div>
        <div className="space-y-2">
          <a
            href="https://t.me/GrabGig_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#FACC15] text-[#0A1A3F] font-display font-extrabold text-xs border-2 border-[#0A1A3F] hover:bg-[#FDE047] transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Open @GrabGig_bot</span>
          </a>
          <button
            type="button"
            onClick={handleLaunchDemo}
            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white/12 hover:bg-white/20 text-white font-semibold text-xs border border-white/25 transition-colors cursor-pointer"
          >
            <Play className="w-3 h-3 shrink-0" aria-hidden="true" />
            <span>Try Interactive Demo</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="docs-workspace"
      className="sky-halftone-bg py-10 lg:py-12"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Mobile Sidebar Drawer */}
        {mobileNavOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden flex"
            role="dialog"
            aria-modal="true"
            aria-label="Documentation chapters drawer"
          >
            <div
              className="fixed inset-0 bg-[#0A1A3F]/50 backdrop-blur-xs"
              onClick={onCloseMobileNav}
            />
            <div className="relative w-80 max-w-[85vw] h-full bg-[#F2F9FF] border-r-2 border-[#0A1A3F] p-5 overflow-y-auto z-10">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#0A1A3F]/15">
                <span className="font-display font-bold text-lg text-[#0A1A3F]">
                  GribGag Guides
                </span>
                <button
                  type="button"
                  onClick={onCloseMobileNav}
                  aria-label="Close navigation drawer"
                  className="w-11 h-11 inline-flex items-center justify-center rounded-lg border-2 border-[#0A1A3F] bg-white text-[#0A1A3F]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {sidebarContent}
            </div>
          </div>
        )}

        {/* Mobile Chapter & Search Bar */}
        <div className="lg:hidden mb-5 flex items-center justify-between gap-2.5 bg-white comic-frame-sm rounded-xl p-2.5">
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="flex-1 min-w-0 min-h-[44px] px-3 py-2 rounded-lg bg-[#E6F3FF] border border-[#0A1A3F]/20 text-left flex items-center justify-between gap-2 cursor-pointer"
          >
            <span className="truncate text-xs font-bold text-[#0A1A3F]">
              Ch. {activeArticle.chapterNumber} · {activeArticle.title}
            </span>
            <span className="text-[11px] font-extrabold text-[#1250E8] shrink-0">Chapters</span>
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search documentation"
            className="min-h-[44px] px-3.5 py-2 rounded-lg bg-[#1250E8] text-white text-xs font-bold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Search</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            {sidebarContent}
          </aside>

          {/* Center Article Viewport */}
          <article className="lg:col-span-7 bg-white comic-frame rounded-2xl overflow-hidden min-w-0">
            {/* Illustrated Comic Sky Header Band */}
            <header className="relative px-4 sm:px-10 py-6 sm:py-8 border-b-2 border-[#0A1A3F] bg-gradient-to-r from-[#E0F4FF] via-[#F2F9FF] to-[#BAE6FD]">
              <div
                aria-hidden="true"
                className="absolute inset-0 comic-speed-stripes opacity-35 pointer-events-none"
              />

              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#1250E8] mb-2">
                    Chapter {activeArticle.chapterNumber} <span aria-hidden="true">·</span>{' '}
                    {activeArticle.readTime} <span aria-hidden="true">·</span>{' '}
                    {activeArticle.updatedAt}
                  </div>

                  <h2
                    className="font-display text-2xl sm:text-4xl font-extrabold text-[#0A1A3F] tracking-tight mb-3"
                    style={{ textWrap: 'balance' }}
                  >
                    {activeArticle.title}
                  </h2>

                  <p className="text-sm sm:text-[17px] leading-relaxed text-[#1E293B] max-w-[65ch]">
                    {activeArticle.summary}
                  </p>
                </div>

                {/* Custom Comic Vector Chapter Mascot/Spot Art */}
                <div className="hidden sm:flex shrink-0 items-center justify-center w-24 h-24 rounded-2xl bg-white comic-frame-sm p-2">
                  <ChapterVectorArt chapterId={activeArticle.id} className="w-full h-full" />
                </div>
              </div>
            </header>

            <div className="p-4 sm:p-10 min-w-0">
              {/* Mobile On-Page Quick Jump */}
              {activeArticle.headings.length > 1 && (
                <div className="lg:hidden mb-7 p-3.5 rounded-xl bg-[#F2F9FF] border border-[#0A1A3F]/15">
                  <div className="text-xs font-extrabold text-[#0A1A3F] mb-2">On this page</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    {activeArticle.headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className="text-[#1250E8] font-semibold underline decoration-[#00D2FF] underline-offset-2"
                      >
                        {h.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-9 sm:space-y-10">
                {activeArticle.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24 min-w-0">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A1A3F] mb-3">
                      {section.title}
                    </h3>

                    <div className="space-y-4 max-w-[68ch] break-words">
                      {section.paragraphs.map((p, idx) => (
                        <p
                          key={idx}
                          className="text-[15px] sm:text-base leading-[1.7] text-[#334155]"
                        >
                          {p}
                        </p>
                      ))}
                    </div>

                    {section.bullets && (
                      <ul className="mt-5 space-y-3 max-w-[68ch]">
                        {section.bullets.map((b) => (
                          <li
                            key={b.label}
                            className="p-4 rounded-xl bg-[#F2F9FF] border-2 border-[#0A1A3F]/15 hover:border-[#1250E8] transition-colors"
                          >
                            <div className="font-display font-bold text-sm text-[#0A1A3F] mb-1">
                              {b.label}
                            </div>
                            <p className="text-sm leading-relaxed text-[#334155]">{b.detail}</p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.table && (
                      <div className="my-5 overflow-x-auto comic-frame-sm rounded-xl bg-white max-w-full">
                        <table className="w-full text-left border-collapse text-sm">
                          <thead>
                            <tr className="bg-[#E6F3FF] border-b-2 border-[#0A1A3F] text-xs font-bold text-[#0A1A3F]">
                              {section.table.headers.map((header) => (
                                <th key={header} className="py-3 px-4 whitespace-nowrap">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#0A1A3F]/10">
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-[#F8FBFF]">
                                {row.cells.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`py-3 px-4 ${
                                      cIdx === 0
                                        ? 'font-semibold text-[#0A1A3F]'
                                        : 'text-[#334155]'
                                    } tabular-nums`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {section.codeTabs && <CodeBlock tabs={section.codeTabs} />}

                    {section.widget && renderWidget(section.widget)}

                    {section.callout && (
                      <div
                        className={`relative mt-6 p-4 sm:p-5 rounded-xl comic-frame-sm ${
                          section.callout.tone === 'tip'
                            ? 'bg-[#FEF9C3]'
                            : section.callout.tone === 'warning'
                              ? 'bg-[#FFE4E6]'
                              : 'bg-[#E0F4FF]'
                        }`}
                      >
                        <ActionSparksSvg className="w-9 h-6 absolute -top-3.5 right-3 sm:right-4" />
                        <div className="font-display font-bold text-sm text-[#0A1A3F] mb-1 pr-10">
                          {section.callout.title}
                        </div>
                        <p className="text-sm leading-relaxed text-[#1E293B]">
                          {section.callout.body}
                        </p>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Previous / Next Article Footer */}
              <footer className="mt-12 pt-6 border-t-2 border-[#0A1A3F]/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle ? (
                  <button
                    type="button"
                    onClick={() => onSelectArticle(prevArticle.id)}
                    className="p-4 rounded-xl border-2 border-[#0A1A3F]/25 hover:border-[#0A1A3F] bg-[#F8FBFF] text-left transition-colors cursor-pointer group"
                  >
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] mb-1">
                      <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Previous Guide</span>
                    </div>
                    <div className="font-display font-bold text-sm text-[#0A1A3F] group-hover:text-[#1250E8]">
                      {prevArticle.chapterNumber}. {prevArticle.title}
                    </div>
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextArticle && (
                  <button
                    type="button"
                    onClick={() => onSelectArticle(nextArticle.id)}
                    className="p-4 rounded-xl border-2 border-[#0A1A3F]/25 hover:border-[#0A1A3F] bg-[#F8FBFF] text-right transition-colors cursor-pointer group"
                  >
                    <div className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-[#475569] mb-1 w-full">
                      <span>Next Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <div className="font-display font-bold text-sm text-[#0A1A3F] group-hover:text-[#1250E8]">
                      {nextArticle.chapterNumber}. {nextArticle.title}
                    </div>
                  </button>
                )}
              </footer>
            </div>
          </article>

          {/* Right On-Page Table of Contents */}
          <aside className="hidden lg:block lg:col-span-2 sticky top-24">
            <div className="p-4 rounded-xl bg-white comic-frame-sm">
              <div className="text-xs font-extrabold text-[#0A1A3F] mb-3">On this page</div>
              <ul className="space-y-2 text-xs">
                {activeArticle.headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="block text-[#475569] hover:text-[#1250E8] font-semibold leading-snug transition-colors"
                    >
                      {h.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
