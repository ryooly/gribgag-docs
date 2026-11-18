import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { DOC_ARTICLES, FAQ_ITEMS } from '../data/docsData';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectArticle: (id: string) => void;
}

interface SearchHit {
  articleId: string;
  title: string;
  subtitle: string;
  chapter: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  open,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      window.setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const results: SearchHit[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    const articleHits: SearchHit[] = DOC_ARTICLES.filter((a) => {
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q)) ||
        a.sections.some(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.paragraphs.some((p) => p.toLowerCase().includes(q))
        )
      );
    }).map((a) => ({
      articleId: a.id,
      title: a.title,
      subtitle: a.summary,
      chapter: `Chapter ${a.chapterNumber}`,
    }));

    if (!q) return articleHits;

    const faqHits: SearchHit[] = FAQ_ITEMS.filter(
      (f) =>
        f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    ).map((f) => ({
      articleId: 'faq',
      title: f.question,
      subtitle: f.answer,
      chapter: `FAQ · ${f.category}`,
    }));

    return [...articleHits, ...faqHits].slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (results.length ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          results.length ? (prev - 1 + results.length) % results.length : 0
        );
      } else if (e.key === 'Enter' && results[activeIndex]) {
        e.preventDefault();
        onSelectArticle(results[activeIndex].articleId);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, results, activeIndex, onClose, onSelectArticle]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search GribGag documentation"
    >
      <div
        className="fixed inset-0 bg-[#0A1A3F]/55 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white comic-frame rounded-2xl overflow-hidden z-10">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b-2 border-[#0A1A3F] bg-[#F2F9FF]">
          <Search className="w-5 h-5 text-[#1250E8] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search guides, payout rails, API endpoints, streaks..."
            className="w-full bg-transparent text-sm sm:text-base text-[#0A1A3F] placeholder:text-[#64748B] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-[#0A1A3F]/20 bg-white text-[#0A1A3F] hover:bg-[#E0F2FE] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#0A1A3F]/10">
          {results.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#475569]">
              No documentation entries matched &ldquo;{query}&rdquo;. Try searching for
              &ldquo;payout&rdquo;, &ldquo;streak&rdquo;, &ldquo;webhook&rdquo;, or
              &ldquo;quickstart&rdquo;.
            </div>
          ) : (
            results.map((hit, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={`${hit.articleId}-${hit.title}`}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => {
                    onSelectArticle(hit.articleId);
                    onClose();
                  }}
                  className={`w-full text-left px-5 py-3.5 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#E6F3FF]' : 'bg-white hover:bg-[#F8FBFF]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-[#1250E8] mb-0.5">
                      {hit.chapter}
                    </div>
                    <div className="font-display font-bold text-sm sm:text-base text-[#0A1A3F] truncate">
                      {hit.title}
                    </div>
                    <div className="text-xs text-[#475569] truncate">{hit.subtitle}</div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-[#1250E8]' : 'text-[#94A3B8]'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 bg-[#F8FBFF] border-t border-[#0A1A3F]/15 flex items-center justify-between text-[11px] text-[#64748B]">
          <span>Use Up/Down arrows to navigate, Enter to open</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
};
