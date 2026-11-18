import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export interface CodeTab {
  label: string;
  language: string;
  code: string;
}

interface CodeBlockProps {
  tabs: CodeTab[];
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ tabs }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeTab = tabs[activeIdx] ?? tabs[0];
  if (!activeTab) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeTab.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const lines = activeTab.code.split('\n');

  return (
    <div className="comic-frame-sm rounded-xl overflow-hidden bg-[#0A1A3F] text-slate-100 my-5">
      <div className="flex items-center justify-between gap-4 px-4 py-2.5 bg-[#071330] border-b border-white/15">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {tabs.map((tab, idx) => {
            const active = idx === activeIdx;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => {
                  setActiveIdx(idx);
                  setCopied(false);
                }}
                className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#1250E8] text-white'
                    : 'text-sky-200/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code snippet"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-sky-100 hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#22D3EE]" aria-hidden="true" />
              <span className="text-[#22D3EE]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 overflow-x-auto text-[13px] leading-6 font-mono">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx}>
                <td className="select-none pr-4 text-right text-sky-300/40 tabular-nums align-top w-8">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-sky-50">{line || ' '}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
