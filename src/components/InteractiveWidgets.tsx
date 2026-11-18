import React, { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, Clock, Copy, RotateCcw, Zap } from 'lucide-react';
import {
  API_ENDPOINTS,
  BRAND_SWATCHES,
  FAQ_ITEMS,
  LIFECYCLE_STAGES,
  PAYOUT_RAILS,
} from '../data/docsData';
import { CodeBlock } from './CodeBlock';
import { ActionSparksSvg, SpeedStopwatchSvg, SwirlEmblemSvg } from './ComicArt';

const QUEST_STEPS = [
  {
    prompt: 'Which snack wins a late-night convenience store run?',
    options: ['Spicy Chips', 'Ice Cream Pint', 'Pretzel Bites'],
  },
  {
    prompt: 'How fast should instant cashout arrive?',
    options: ['Under 30 sec', 'Same day', 'Next morning'],
  },
  {
    prompt: 'Pick your daily streak bonus style:',
    options: ['1.6x Multiplier', 'Bonus Gift Code', 'Free Streak Freeze'],
  },
];

export const PhoneQuestSimulator: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'active' | 'done'>('idle');
  const [stepIdx, setStepIdx] = useState(0);
  const [elapsedTenths, setElapsedTenths] = useState(0);
  const [balanceCents, setBalanceCents] = useState(1420);

  useEffect(() => {
    if (phase !== 'active') return;
    const id = window.setInterval(() => {
      setElapsedTenths((prev) => {
        if (prev >= 599) {
          setPhase('idle');
          setStepIdx(0);
          return 0;
        }
        return prev + 1;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [phase]);

  const startQuest = () => {
    setElapsedTenths(0);
    setStepIdx(0);
    setPhase('active');
  };

  const handleAnswer = () => {
    if (stepIdx < QUEST_STEPS.length - 1) {
      setStepIdx((prev) => prev + 1);
    } else {
      setPhase('done');
      setBalanceCents((prev) => prev + 50);
    }
  };

  const remainingSec = Math.max(0, 60 - elapsedTenths / 10);
  const currentPrompt = QUEST_STEPS[stepIdx] ?? QUEST_STEPS[0];

  return (
    <div className="my-6 comic-frame rounded-2xl bg-gradient-to-br from-[#E0F4FF] via-[#F2F9FF] to-[#BAE6FD] p-5 sm:p-7 relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 comic-speed-stripes opacity-40 pointer-events-none" />

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Comic Smartphone Frame matching mascot's phone */}
        <div className="md:col-span-6 flex justify-center">
          <div className="relative">
            {phase === 'done' && (
              <div className="absolute -top-6 -right-5 z-10 pointer-events-none">
                <ActionSparksSvg className="w-14 h-9 rotate-12" />
              </div>
            )}

            <div className="w-[270px] rounded-[28px] bg-[#0A1A3F] p-2.5 shadow-[6px_6px_0px_#0A1A3F] border-2 border-[#0A1A3F]">
              {/* Speaker notch */}
              <div className="w-16 h-1.5 bg-slate-700 rounded-full mx-auto mb-2" />

              {/* Glowing cobalt phone screen */}
              <div className="rounded-[20px] bg-gradient-to-b from-[#1250E8] via-[#0D3BB8] to-[#071330] text-white p-4 min-h-[300px] flex flex-col justify-between border border-white/15">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/15">
                  <div className="flex items-center gap-2">
                    <SwirlEmblemSvg className="w-7 h-7" />
                    <span className="font-display font-bold text-sm">GribGag</span>
                  </div>
                  <div className="text-right font-mono tabular-nums">
                    <div className="text-[10px] text-sky-200">Balance</div>
                    <div className="text-sm font-bold text-[#FACC15]">
                      ${(balanceCents / 100).toFixed(2)}
                    </div>
                  </div>
                </div>

                {phase === 'idle' && (
                  <div className="my-auto py-4 text-center space-y-4">
                    <SwirlEmblemSvg className="w-16 h-16 mx-auto drop-shadow-[0_0_16px_rgba(34,211,238,0.65)]" />
                    <div>
                      <div className="font-display font-extrabold text-lg leading-tight">
                        Daily 3-Tap Pulse
                      </div>
                      <div className="text-xs text-sky-200 mt-1">
                        Reward: +$0.50 <span aria-hidden="true">·</span> Est: 18 sec
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={startQuest}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FACC15] text-[#0A1A3F] font-display font-extrabold text-sm border-2 border-[#0A1A3F] shadow-[3px_3px_0px_#0A1A3F] hover:bg-[#FDE047] transition-colors cursor-pointer"
                    >
                      Start 1-Minute Quest
                    </button>
                  </div>
                )}

                {phase === 'active' && (
                  <div className="my-auto py-2 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                      <span className="text-[#22D3EE] font-semibold">
                        Step {stepIdx + 1} / {QUEST_STEPS.length}
                      </span>
                      <span className="text-[#FACC15] font-bold">
                        {remainingSec.toFixed(1)}s left
                      </span>
                    </div>

                    <div className="font-display font-bold text-sm leading-snug">
                      {currentPrompt.prompt}
                    </div>

                    <div className="space-y-2">
                      {currentPrompt.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={handleAnswer}
                          className="w-full text-left px-3 py-2 rounded-xl bg-white/12 hover:bg-[#22D3EE] hover:text-[#0A1A3F] text-xs font-semibold border border-white/25 transition-colors cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {phase === 'done' && (
                  <div className="my-auto py-3 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#FACC15] text-[#0A1A3F] border-2 border-[#0A1A3F] flex items-center justify-center mx-auto">
                      <Zap className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-lg text-[#22D3EE]">
                        +$0.50 Credited!
                      </div>
                      <div className="text-xs text-sky-100 mt-1 font-mono tabular-nums">
                        Completed in {(elapsedTenths / 10).toFixed(1)}s · Verified in 620ms
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={startQuest}
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-white text-[#0A1A3F] font-bold text-xs border-2 border-[#0A1A3F] hover:bg-sky-50 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Replay 60s Quest</span>
                    </button>
                  </div>
                )}

                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] text-sky-200/80 font-mono tabular-nums">
                  <span>60s Ceiling Enforced</span>
                  <span>Instant Rail Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contextual explanation & live stopwatch companion */}
        <div className="md:col-span-6 space-y-4 bg-white comic-frame-sm rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-[#1250E8]">Live Interactive Preview</div>
              <h4 className="font-display font-extrabold text-xl text-[#0A1A3F]">
                Sub-Minute Mobile Flow
              </h4>
            </div>
            <SpeedStopwatchSvg className="w-16 h-12 shrink-0" />
          </div>

          <p className="text-sm leading-relaxed text-[#334155]">
            Every quest inside GribGag runs inside this standardized 3-step card shell. Answers
            attest locally as you tap, keeping verification latency under 800 ms when the final
            card clears.
          </p>

          <dl className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-[#F2F9FF] border border-[#0A1A3F]/15">
              <dt className="text-[11px] font-semibold text-[#475569]">Timer Status</dt>
              <dd className="font-mono font-bold text-sm text-[#0A1A3F] tabular-nums mt-0.5">
                {phase === 'idle'
                  ? 'Ready (60.0s)'
                  : phase === 'active'
                    ? `${(elapsedTenths / 10).toFixed(1)}s elapsed`
                    : `Done in ${(elapsedTenths / 10).toFixed(1)}s`}
              </dd>
            </div>
            <div className="p-3 rounded-xl bg-[#FEF9C3] border border-[#0A1A3F]/15">
              <dt className="text-[11px] font-semibold text-[#475569]">Simulated Wallet</dt>
              <dd className="font-mono font-bold text-sm text-[#0A1A3F] tabular-nums mt-0.5">
                ${(balanceCents / 100).toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export const EarningLifecycleExplorer: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const activeStage = LIFECYCLE_STAGES[selectedStep] ?? LIFECYCLE_STAGES[0];

  return (
    <div className="my-6 comic-frame-sm rounded-2xl bg-white overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b-2 border-[#0A1A3F] bg-[#E6F3FF]">
        {LIFECYCLE_STAGES.map((stage, idx) => {
          const isActive = idx === selectedStep;
          return (
            <button
              key={stage.step}
              type="button"
              onClick={() => setSelectedStep(idx)}
              className={`px-4 py-3.5 text-left transition-colors cursor-pointer border-r border-b sm:border-b-0 last:border-r-0 border-[#0A1A3F]/15 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1250E8] ${
                isActive
                  ? 'bg-[#1250E8] text-white'
                  : 'bg-transparent text-[#0A1A3F] hover:bg-[#D5ECFF]'
              }`}
            >
              <div className="text-[11px] font-mono tabular-nums opacity-80 mb-0.5">
                {stage.step} · {stage.window}
              </div>
              <div className="font-display font-bold text-sm sm:text-base whitespace-nowrap">
                {stage.name}
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1250E8]">
            <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              Stage {activeStage.step} <span aria-hidden="true">/</span> {activeStage.actor}{' '}
              <span aria-hidden="true">·</span> {activeStage.window}
            </span>
          </div>
          <h4 className="font-display text-xl font-bold text-[#0A1A3F]">
            {activeStage.name} Phase
          </h4>
          <p className="text-sm leading-relaxed text-[#334155]">{activeStage.summary}</p>
          <div className="p-3.5 rounded-xl bg-[#F2F9FF] border border-[#BAE6FD]">
            <div className="text-xs font-bold text-[#0A1A3F] mb-1">System Guarantee</div>
            <p className="text-xs leading-relaxed text-[#334155]">{activeStage.guarantee}</p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="text-xs font-semibold text-[#475569] mb-2">Sample Event Payload</div>
          <pre className="p-4 rounded-xl bg-[#0A1A3F] text-sky-50 text-xs font-mono leading-relaxed overflow-x-auto border border-[#0A1A3F]">
            {activeStage.payload}
          </pre>
        </div>
      </div>
    </div>
  );
};

export const StreakRewardCalculator: React.FC = () => {
  const [baseReward, setBaseReward] = useState(0.5);
  const [streakDays, setStreakDays] = useState(7);
  const [fastCompletion, setFastCompletion] = useState(true);

  const calculation = useMemo(() => {
    let multiplier = 1.0;
    let tierName = 'Starter';
    if (streakDays >= 30) {
      multiplier = 1.6;
      tierName = 'Gold Cap';
    } else if (streakDays >= 14) {
      multiplier = 1.4;
      tierName = 'Turbo Duck';
    } else if (streakDays >= 7) {
      multiplier = 1.25;
      tierName = 'Locked In';
    } else if (streakDays >= 3) {
      multiplier = 1.15;
      tierName = 'Warming Up';
    }

    const speedBonus = fastCompletion ? 0.05 : 0;
    const multipliedBase = baseReward * multiplier;
    const totalUserPayout = multipliedBase + speedBonus;
    const dailyTenQuestProjection = totalUserPayout * 10;

    return {
      multiplier,
      tierName,
      speedBonus,
      totalUserPayout,
      dailyTenQuestProjection,
    };
  }, [baseReward, streakDays, fastCompletion]);

  return (
    <div className="my-6 comic-frame-sm rounded-2xl bg-white p-5 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex items-center justify-between text-sm font-semibold text-[#0A1A3F] mb-2">
              <label htmlFor="base-reward-slider">Base Quest Reward</label>
              <span className="font-mono tabular-nums text-[#1250E8]">
                ${baseReward.toFixed(2)}
              </span>
            </div>
            <input
              id="base-reward-slider"
              type="range"
              min="0.10"
              max="2.50"
              step="0.05"
              value={baseReward}
              onChange={(e) => setBaseReward(Number(e.target.value))}
              className="w-full accent-[#1250E8] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono tabular-nums text-[#64748B] mt-1">
              <span>$0.10</span>
              <span>$1.25</span>
              <span>$2.50</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm font-semibold text-[#0A1A3F] mb-2">
              <label htmlFor="streak-days-slider">Active Daily Streak</label>
              <span className="font-mono tabular-nums text-[#1250E8]">
                {streakDays} {streakDays === 1 ? 'day' : 'days'} ({calculation.tierName})
              </span>
            </div>
            <input
              id="streak-days-slider"
              type="range"
              min="1"
              max="35"
              step="1"
              value={streakDays}
              onChange={(e) => setStreakDays(Number(e.target.value))}
              className="w-full accent-[#1250E8] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono tabular-nums text-[#64748B] mt-1">
              <span>Day 1 (1.00x)</span>
              <span>Day 7 (1.25x)</span>
              <span>Day 14 (1.40x)</span>
              <span>Day 30+ (1.60x)</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-1">
            <div>
              <div className="text-sm font-semibold text-[#0A1A3F]">Sub-30s Speed Bonus</div>
              <div className="text-xs text-[#475569]">
                Adds +$0.05 when completed cleanly in under 30 seconds
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={fastCompletion}
              onClick={() => setFastCompletion((v) => !v)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold border-2 border-[#0A1A3F] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                fastCompletion
                  ? 'bg-[#FACC15] text-[#0A1A3F]'
                  : 'bg-[#F2F9FF] text-[#475569]'
              }`}
            >
              {fastCompletion ? 'Enabled (+$0.05)' : 'Disabled'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-xl bg-[#0A1A3F] text-white p-5 space-y-4">
          <div className="text-xs font-semibold text-[#22D3EE]">Calculated Settlement</div>

          <div className="pb-4 border-b border-white/15">
            <div className="text-xs text-sky-200/80 mb-1">Net User Payout (1 Quest)</div>
            <div className="font-display text-3xl font-extrabold tabular-nums text-white">
              ${calculation.totalUserPayout.toFixed(2)}
            </div>
          </div>

          <dl className="space-y-2.5 text-xs">
            <div className="flex justify-between gap-2">
              <dt className="text-sky-200/80">Multiplier Tier</dt>
              <dd className="font-mono tabular-nums font-semibold text-[#22D3EE]">
                {calculation.multiplier.toFixed(2)}x · {calculation.tierName}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-sky-200/80">Speed Bonus</dt>
              <dd className="font-mono tabular-nums font-semibold">
                +${calculation.speedBonus.toFixed(2)}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-sky-200/80">10-Quest Session (~7 min)</dt>
              <dd className="font-mono tabular-nums font-semibold text-[#FACC15]">
                ${calculation.dailyTenQuestProjection.toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export const PayoutRailsTable: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Instant Cash' | 'Digital Wallet' | 'Crypto'>('All');

  const filteredRails = useMemo(() => {
    if (filter === 'All') return PAYOUT_RAILS;
    return PAYOUT_RAILS.filter((rail) => rail.category === filter);
  }, [filter]);

  const categories: Array<'All' | 'Instant Cash' | 'Digital Wallet' | 'Crypto'> = [
    'All',
    'Instant Cash',
    'Digital Wallet',
    'Crypto',
  ];

  return (
    <div className="my-6 comic-frame-sm rounded-2xl bg-white overflow-hidden">
      <div className="px-4 sm:px-5 py-3.5 bg-[#E6F3FF] border-b-2 border-[#0A1A3F] flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-[#0A1A3F]">Filter by Payout Category</span>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Payout category filter">
          {categories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#1250E8] text-white'
                    : 'bg-white text-[#334155] border border-[#0A1A3F]/20 hover:border-[#0A1A3F]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#0A1A3F]/15 bg-[#F8FBFF] text-xs font-bold text-[#475569]">
              <th className="py-3 px-4">Payout Rail</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4 text-right">Min Threshold</th>
              <th className="py-3 px-4 text-right">Speed</th>
              <th className="py-3 px-4 text-right">Fee</th>
              <th className="py-3 px-4">Coverage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0A1A3F]/10">
            {filteredRails.map((rail) => (
              <tr key={rail.id} className="hover:bg-[#F2F9FF] transition-colors">
                <td className="py-3 px-4 font-semibold text-[#0A1A3F] whitespace-nowrap">
                  {rail.name}
                </td>
                <td className="py-3 px-4 text-xs text-[#475569] whitespace-nowrap">
                  {rail.category}
                </td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-[#0A1A3F]">
                  {rail.minThreshold}
                </td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-[#1250E8] font-semibold">
                  {rail.settlementSpeed}
                </td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-[#0A1A3F]">
                  {rail.fee}
                </td>
                <td className="py-3 px-4 text-xs text-[#334155]">{rail.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ApiEndpointExplorer: React.FC = () => {
  const [selectedId, setSelectedId] = useState(API_ENDPOINTS[0].id);
  const endpoint = API_ENDPOINTS.find((e) => e.id === selectedId) ?? API_ENDPOINTS[0];

  return (
    <div className="my-6 comic-frame-sm rounded-2xl bg-white overflow-hidden">
      <div className="p-3 bg-[#E6F3FF] border-b-2 border-[#0A1A3F] flex flex-wrap gap-2">
        {API_ENDPOINTS.map((item) => {
          const active = item.id === endpoint.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                active
                  ? 'bg-[#0A1A3F] text-white'
                  : 'bg-white text-[#0A1A3F] border border-[#0A1A3F]/20 hover:border-[#0A1A3F]'
              }`}
            >
              <span className={active ? 'text-[#22D3EE]' : 'text-[#1250E8]'}>{item.method}</span>{' '}
              <span>{item.path}</span>
            </button>
          );
        })}
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        <div>
          <div className="text-xs font-mono font-semibold text-[#1250E8] mb-1">
            {endpoint.method} · {endpoint.path}
          </div>
          <h4 className="font-display text-xl font-bold text-[#0A1A3F] mb-1.5">
            {endpoint.title}
          </h4>
          <p className="text-sm text-[#334155]">{endpoint.description}</p>
        </div>

        <div className="overflow-x-auto border border-[#0A1A3F]/15 rounded-xl">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F8FBFF] border-b border-[#0A1A3F]/15 font-bold text-[#475569]">
                <th className="py-2.5 px-3.5">Parameter</th>
                <th className="py-2.5 px-3.5">Type</th>
                <th className="py-2.5 px-3.5">Required</th>
                <th className="py-2.5 px-3.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0A1A3F]/10">
              {endpoint.params.map((p) => (
                <tr key={p.name}>
                  <td className="py-2.5 px-3.5 font-mono font-semibold text-[#0A1A3F]">
                    {p.name}
                  </td>
                  <td className="py-2.5 px-3.5 font-mono text-[#1250E8]">{p.type}</td>
                  <td className="py-2.5 px-3.5 font-semibold text-[#334155]">{p.required}</td>
                  <td className="py-2.5 px-3.5 text-[#334155]">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock
          tabs={[
            { label: 'Request / Verify', language: 'bash', code: endpoint.requestExample },
            { label: '200 Response / Event', language: 'json', code: endpoint.responseExample },
          ]}
        />
      </div>
    </div>
  );
};

export const BrandSwatchGrid: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      window.setTimeout(() => setCopiedHex(null), 1500);
    } catch {
      setCopiedHex(null);
    }
  };

  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {BRAND_SWATCHES.map((swatch) => {
        const isCopied = copiedHex === swatch.hex;
        return (
          <button
            key={swatch.hex}
            type="button"
            onClick={() => handleCopy(swatch.hex)}
            className="text-left comic-frame-sm rounded-xl overflow-hidden bg-white hover:-translate-y-0.5 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1250E8]"
          >
            <div
              className="h-20 px-4 py-3 flex items-end justify-between border-b-2 border-[#0A1A3F]"
              style={{ backgroundColor: swatch.hex }}
            >
              <span
                className={`font-mono text-xs font-bold ${
                  swatch.textDark ? 'text-[#0A1A3F]' : 'text-white'
                }`}
              >
                {swatch.hex}
              </span>
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold ${
                  swatch.textDark ? 'text-[#0A1A3F]' : 'text-white'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </span>
            </div>
            <div className="p-3.5">
              <div className="font-display font-bold text-sm text-[#0A1A3F] mb-1">
                {swatch.name}
              </div>
              <div className="text-xs text-[#475569] leading-relaxed">{swatch.role}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);
  const [category, setCategory] = useState<string>('All');

  const categories = ['All', 'Users & Earnings', 'Streaks & Multipliers', 'Payouts & Ledger', 'Developers & Partners'];

  const visibleFaqs = useMemo(() => {
    if (category === 'All') return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) => item.category === category);
  }, [category]);

  return (
    <div className="my-6 space-y-4">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="FAQ topic filter">
        {categories.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-[#1250E8] text-white border-[#0A1A3F]'
                  : 'bg-white text-[#334155] border-[#0A1A3F]/20 hover:border-[#0A1A3F]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="comic-frame-sm rounded-2xl bg-white divide-y-2 divide-[#0A1A3F]/10 overflow-hidden">
        {visibleFaqs.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? '' : item.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F2F9FF] transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-xs font-semibold text-[#1250E8] mb-0.5">
                    {item.category}
                  </div>
                  <div className="font-display font-bold text-base text-[#0A1A3F]">
                    {item.question}
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#0A1A3F] shrink-0 transition-transform duration-150 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-[#334155] bg-[#F8FBFF]">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
