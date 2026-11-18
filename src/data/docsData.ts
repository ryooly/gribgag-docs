export type DocCategoryId =
  | 'getting-started'
  | 'mechanics'
  | 'payouts-trust'
  | 'reference';

export interface DocHeading {
  id: string;
  label: string;
}

export interface DocTableRow {
  cells: string[];
}

export interface DocSectionBlock {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: { label: string; detail: string }[];
  callout?: {
    title: string;
    body: string;
    tone: 'info' | 'tip' | 'warning';
  };
  table?: {
    headers: string[];
    rows: DocTableRow[];
  };
  codeTabs?: {
    label: string;
    language: string;
    code: string;
  }[];
  widget?:
    | 'lifecycle'
    | 'phone-simulator'
    | 'streak-calculator'
    | 'payout-rails'
    | 'brand-swatches'
    | 'faq-accordion';
}

export interface DocArticle {
  id: string;
  category: DocCategoryId;
  chapterNumber: string;
  title: string;
  summary: string;
  readTime: string;
  updatedAt: string;
  keywords: string[];
  headings: DocHeading[];
  sections: DocSectionBlock[];
}

export interface DocCategory {
  id: DocCategoryId;
  title: string;
  order: string;
}

export const DOC_CATEGORIES: DocCategory[] = [
  { id: 'getting-started', title: '01. Getting Started', order: '01' },
  { id: 'mechanics', title: '02. Earning & Streaks', order: '02' },
  { id: 'payouts-trust', title: '03. Payouts & Trust', order: '03' },
  { id: 'reference', title: '04. Brand & Support', order: '04' },
];

export const HERO_METRICS = [
  { label: 'Average Quest Time', value: '42 sec', context: 'Under 1-minute cap' },
  { label: 'Verification Latency', value: '680 ms', context: 'Median edge settle' },
  { label: 'Instant Payout Rails', value: '6 Rails', context: 'Zero hidden fees' },
  { label: 'Daily Streak Boost', value: 'Up to 2.0x', context: '30-day multiplier' },
];

export const LIFECYCLE_STAGES = [
  {
    step: '01',
    name: 'Discover',
    window: '0s – 12s',
    actor: 'Mobile Feed',
    summary:
      'User opens GribGag and selects a curated sub-minute quest or daily gag drop from the live feed.',
    guarantee: 'Pre-fetched assets ensure instant tap-to-start with zero loading spinners.',
    payload: `{
  "event": "quest.impression",
  "questId": "gag_tap_8492",
  "estimatedDurationSec": 35,
  "baseRewardCents": 45
}`,
  },
  {
    step: '02',
    name: 'Complete',
    window: '12s – 48s',
    actor: 'Quest Runner',
    summary:
      'User completes the micro-interaction—such as a 3-card swipe poll, reaction clip, or rapid trivia prompt.',
    guarantee: 'Hard 60-second timer keeps every session crisp, playful, and respectably brief.',
    payload: `{
  "event": "quest.submitted",
  "questId": "gag_tap_8492",
  "elapsedMs": 31420,
  "inputChecksum": "sha256:9f2c...b81a"
}`,
  },
  {
    step: '03',
    name: 'Verify',
    window: '48s – 49s',
    actor: 'Edge Attestation',
    summary:
      'Attestation workers validate completion timing, device integrity, and anti-bot cadence in under 800 ms.',
    guarantee: 'Validates genuine human rhythm without punishing fast fingers.',
    payload: `{
  "event": "quest.verified",
  "questId": "gag_tap_8492",
  "streakMultiplier": 1.35,
  "creditedCents": 61
}`,
  },
  {
    step: '04',
    name: 'Settle',
    window: '49s – 55s',
    actor: 'Wallet Ledger',
    summary:
      'Balance updates in real time on the user’s phone and becomes immediately eligible for instant cashout.',
    guarantee: 'Atomic double-entry ledger write triggers push receipt and webhook delivery.',
    payload: `{
  "event": "ledger.credited",
  "availableBalanceCents": 1480,
  "cashoutEligible": true,
  "settledInMs": 640
}`,
  },
];

export interface PayoutRail {
  id: string;
  name: string;
  category: 'Instant Cash' | 'Digital Wallet' | 'Crypto';
  minThreshold: string;
  settlementSpeed: string;
  fee: string;
  availability: string;
}

export const PAYOUT_RAILS: PayoutRail[] = [
  {
    id: 'rtp',
    name: 'Instant Bank (RTP / FedNow)',
    category: 'Instant Cash',
    minThreshold: '$2.00',
    settlementSpeed: '10 – 45 sec',
    fee: '$0.00',
    availability: 'US Checking Accounts',
  },
  {
    id: 'paypal',
    name: 'PayPal Express Transfer',
    category: 'Digital Wallet',
    minThreshold: '$1.00',
    settlementSpeed: '< 30 sec',
    fee: '$0.00',
    availability: '42 Countries',
  },
  {
    id: 'venmo',
    name: 'Venmo Instant Drop',
    category: 'Digital Wallet',
    minThreshold: '$1.00',
    settlementSpeed: '< 20 sec',
    fee: '$0.00',
    availability: 'United States',
  },
  {
    id: 'topup',
    name: 'Mobile Carrier Top-Up',
    category: 'Instant Cash',
    minThreshold: '$0.50',
    settlementSpeed: '15 – 60 sec',
    fee: '$0.00',
    availability: '110+ Carriers',
  },
  {
    id: 'giftcards',
    name: 'Direct Merchant Gift Codes',
    category: 'Digital Wallet',
    minThreshold: '$1.00',
    settlementSpeed: 'Immediate',
    fee: '+2% Bonus',
    availability: 'Global Catalog',
  },
  {
    id: 'usdc',
    name: 'USDC (Base / Solana)',
    category: 'Crypto',
    minThreshold: '$0.50',
    settlementSpeed: '4 – 12 sec',
    fee: '$0.00 (Sponsored)',
    availability: 'Supported Wallets',
  },
];

export const BRAND_SWATCHES = [
  {
    name: 'Electric Cobalt',
    hex: '#1250E8',
    role: 'Primary CTAs, hoodie emblem, active navigation states',
    textDark: false,
  },
  {
    name: 'Aqua Burst',
    hex: '#00D2FF',
    role: 'Headline energy accents, speed trails, cyan highlights',
    textDark: true,
  },
  {
    name: 'Daytime Sky',
    hex: '#38BDF8',
    role: 'Hero sky backdrop, gradient atmosphere, cloud framing',
    textDark: true,
  },
  {
    name: 'Cloud Canvas',
    hex: '#F2F9FF',
    role: '60% reading background for high-legibility documentation',
    textDark: true,
  },
  {
    name: 'Ink Navy',
    hex: '#0A1A3F',
    role: 'Crisp vector outlines, display typography, code surfaces',
    textDark: false,
  },
  {
    name: 'Sunburst Yellow',
    hex: '#FACC15',
    role: 'Exclamation sparks, speed bonuses, high-contrast callouts',
    textDark: true,
  },
];

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    category: 'Users & Earnings',
    question: 'Why does GribGag cap quests at less than 1 minute?',
    answer:
      'Long surveys and multi-page offerwalls create drop-off and frustration. GribGag enforces a strict 60-second completion ceiling on every sponsored poll, clip reaction, and mini-challenge so users always know the exact time commitment before tapping.',
  },
  {
    id: 'faq-2',
    category: 'Users & Earnings',
    question: 'What happens if a task takes 65 seconds instead of under 1 minute?',
    answer:
      'Users are never penalized if they read carefully. The 60-second benchmark reflects the 90th-percentile completion time measured during pre-launch QA. If a quest’s median completion time drifts above 55 seconds in production, our feed balancer automatically retires or trims steps from that campaign.',
  },
  {
    id: 'faq-3',
    category: 'Streaks & Multipliers',
    question: 'How do Streak Freezes protect my daily multiplier?',
    answer:
      'Completing at least one sub-minute quest per UTC calendar day advances your streak. Every 7 consecutive days unlocks a free Streak Freeze token (stored up to 2). If you miss a day, a freeze is applied automatically so your multiplier tier stays intact.',
  },
  {
    id: 'faq-4',
    category: 'Payouts & Ledger',
    question: 'Why was my instant cashout held for manual review?',
    answer:
      'Over 99.2% of withdrawals settle in under 45 seconds. Temporary holds only trigger when an account switches payout destination immediately after a velocity spike or logs in from a flagged emulator environment. Verified reviews clear within 4 hours.',
  },
];

export const DOC_ARTICLES: DocArticle[] = [
  {
    id: 'overview',
    category: 'getting-started',
    chapterNumber: '01',
    title: 'Platform Overview & Architecture',
    summary:
      'Understand how GribGag delivers playful, sub-minute earning quests with near-instant edge verification and zero-friction mobile payouts.',
    readTime: '4 min read',
    updatedAt: 'Updated November 2026',
    keywords: ['overview', 'architecture', '1 minute', 'quests', 'gags', 'how it works'],
    headings: [
      { id: 'philosophy', label: 'The Under-One-Minute Promise' },
      { id: 'phone-simulator', label: 'Try a 60-Second Quest' },
      { id: 'lifecycle', label: '60-Second Earning Lifecycle' },
      { id: 'system-layers', label: 'Core System Layers' },
    ],
    sections: [
      {
        id: 'philosophy',
        title: 'The Under-One-Minute Promise',
        paragraphs: [
          'GribGag is built around one non-negotiable product rule: every earning action on the platform must be discoverable, completable, and verifiable in under 60 seconds. Instead of forcing people through 15-minute questionnaires or broken ad redirects, GribGag packages partner micro-tasks, creator gags, and rapid polls into self-contained mobile cards.',
          'Because every asset is pre-warmed before the user taps Start, there are no interstitial spinners or dead handoffs. The moment the final tap lands, our edge attestation pipeline validates the submission and updates the wallet ledger in real time.',
        ],
        callout: {
          title: 'Design Constraint: Strict 60-Second Budget',
          body: 'Any campaign whose 90th-percentile completion time exceeds 58 seconds during staging QA is automatically rejected from the live feed until steps are trimmed.',
          tone: 'info',
        },
      },
      {
        id: 'phone-simulator',
        title: 'Try a 60-Second Quest',
        paragraphs: [
          'Tap through a live interactive simulation of the GribGag mobile card flow below. Watch the 60-second countdown stopwatch, answer three rapid prompts, and see instant ledger settlement.',
        ],
        widget: 'phone-simulator',
      },
      {
        id: 'lifecycle',
        title: '60-Second Earning Lifecycle',
        paragraphs: [
          'Explore each of the four atomic stages inside a standard GribGag quest session. Click any stage below to inspect its latency budget, guarantee, and event payload.',
        ],
        widget: 'lifecycle',
      },
      {
        id: 'system-layers',
        title: 'Core System Layers',
        paragraphs: [
          'GribGag separates user-facing speed from financial correctness across three independent layers:',
        ],
        bullets: [
          {
            label: 'Feed & Pre-Fetch Edge',
            detail:
              'Caches quest definitions, media thumbnails, and localization strings at the edge so mobile clients render cards in under 80 ms.',
          },
          {
            label: 'Attestation & Velocity Guard',
            detail:
              'Evaluates human interaction cadence, device integrity tokens, and completion duration windows without adding noticeable UI delay.',
          },
          {
            label: 'Double-Entry Wallet & Payout Router',
            detail:
              'Commits immutable credit entries and routes cashouts across RTP, PayPal, Venmo, carrier top-ups, gift codes, and USDC rails.',
          },
        ],
      },
    ],
  },
  {
    id: 'quickstart',
    category: 'getting-started',
    chapterNumber: '02',
    title: '60-Second Quickstart Guide',
    summary:
      'Go from zero to your first verified quest reward and webhook settlement in under a minute using the GribGag SDK or REST API.',
    readTime: '3 min read',
    updatedAt: 'Updated November 2026',
    keywords: ['quickstart', 'install', 'sdk', 'setup', 'npm', 'typescript', 'curl'],
    headings: [
      { id: 'prerequisites', label: 'Prerequisites & Keys' },
      { id: 'install-run', label: 'Install & Mount Quest Runner' },
      { id: 'verify-settlement', label: 'Confirm Local Settlement' },
    ],
    sections: [
      {
        id: 'prerequisites',
        title: 'Prerequisites & Keys',
        paragraphs: [
          'Before mounting the GribGag quest runner in your web or mobile client, generate a pair of workspace keys from your Partner Portal. Use your publishable client key (gg_pub_*) in frontend bundles and keep your secret server key (gg_live_*) strictly on your backend.',
        ],
        table: {
          headers: ['Key Prefix', 'Environment', 'Usage Scope', 'Exposure'],
          rows: [
            { cells: ['gg_pub_test_*', 'Sandbox', 'Feed fetch & simulated claims', 'Client-safe'] },
            { cells: ['gg_pub_live_*', 'Production', 'Live quest widget & attestation', 'Client-safe'] },
            { cells: ['gg_live_*', 'Production', 'Payouts, balance & webhook secrets', 'Server-only'] },
          ],
        },
      },
      {
        id: 'install-run',
        title: 'Install & Mount Quest Runner',
        paragraphs: [
          'Install the lightweight client package (14.2 kB gzipped) or call the REST API directly. Switch tabs below to copy the exact snippet for TypeScript, React Native, or cURL.',
        ],
        codeTabs: [
          {
            label: 'TypeScript SDK',
            language: 'typescript',
            code: `import { GribGagClient } from '@gribgag/sdk';

const gribgag = new GribGagClient({
  publishableKey: process.env.NEXT_PUBLIC_GRIBGAG_KEY!,
  environment: 'production',
});

// Launch a sub-minute quest for the active user
const result = await gribgag.quests.launch({
  userId: 'usr_duck_771',
  maxDurationSec: 60,
  onSettled: (receipt) => {
    console.log(\`Credited \${receipt.totalCreditedCents} cents in \${receipt.verifiedInMs}ms\`);
  },
});`,
          },
          {
            label: 'React Native',
            language: 'tsx',
            code: `import { QuestSheet, useGribGag } from '@gribgag/react-native';

export function QuickEarnButton({ userId }: { userId: string }) {
  const { openFeed, balanceCents } = useGribGag(userId);

  return (
    <QuestSheet
      onComplete={(e) => console.log('Earned:', e.creditedCents)}
      triggerLabel={\`Earn in <1m · Balance $\${(balanceCents / 100).toFixed(2)}\`}
      onPress={openFeed}
    />
  );
}`,
          },
          {
            label: 'cURL',
            language: 'bash',
            code: `# 1. Fetch eligible sub-minute quests
curl -X GET "https://api.gribgag.com/v1/quests/feed?userId=usr_duck_771&maxSec=60" \\
  -H "Authorization: Bearer gg_live_9481a2f"

# 2. Submit verified completion
curl -X POST "https://api.gribgag.com/v1/quests/claim" \\
  -H "Authorization: Bearer gg_live_9481a2f" \\
  -H "Content-Type: application/json" \\
  -d '{"userId":"usr_duck_771","questId":"gag_poll_204","elapsedMs":28400,"attestationToken":"att_demo"}'`,
          },
        ],
      },
      {
        id: 'verify-settlement',
        title: 'Confirm Local Settlement',
        paragraphs: [
          'In Sandbox mode, every quest claim settles against simulated ledger balances so you can test streak increments, edge rejections, and instant payout webhooks without moving real funds.',
        ],
        callout: {
          title: 'Sandbox Instant Test Trigger',
          body: 'Pass elapsedMs: 1200 in Sandbox to test velocity-guard rejection behavior, or elapsedMs: 28000 to simulate a clean sub-minute payout.',
          tone: 'tip',
        },
      },
    ],
  },
  {
    id: 'earning-loops',
    category: 'mechanics',
    chapterNumber: '03',
    title: 'Quests, Daily Gags & Streak Multipliers',
    summary:
      'Learn how task formats, speed bonuses, and daily streak tiers combine to drive repeat engagement without user fatigue.',
    readTime: '5 min read',
    updatedAt: 'Updated November 2026',
    keywords: ['earning', 'streaks', 'multipliers', 'calculator', 'gags', 'quests', 'rewards'],
    headings: [
      { id: 'quest-formats', label: 'Supported Quest Formats' },
      { id: 'streak-tiers', label: 'Streak Multiplier Schedule' },
      { id: 'reward-calculator', label: 'Interactive Reward & Streak Calculator' },
    ],
    sections: [
      {
        id: 'quest-formats',
        title: 'Supported Quest Formats',
        paragraphs: [
          'Every GribGag task belongs to one of four standardized mobile formats. Standardized formats guarantee predictable UI layouts, fast thumb reachability, and consistent timing under 60 seconds.',
        ],
        table: {
          headers: ['Format', 'Typical Duration', 'Base Reward', 'Verification Method'],
          rows: [
            { cells: ['3-Card Brand Pulse', '18 – 28 sec', '$0.25 – $0.60', 'Attention check + timing window'] },
            { cells: ['Clip Reaction Gag', '25 – 45 sec', '$0.35 – $0.85', 'Playback heartbeat + emoji choice'] },
            { cells: ['Speed Trivia Drop', '20 – 40 sec', '$0.30 – $1.20', 'Server-graded answer key'] },
            { cells: ['App Spotlight Check', '35 – 55 sec', '$0.75 – $2.50', 'Deep-link return attestation'] },
          ],
        },
      },
      {
        id: 'streak-tiers',
        title: 'Streak Multiplier Schedule',
        paragraphs: [
          'Completing at least one sub-minute quest each UTC day increases the user’s Streak Multiplier. Multipliers apply cleanly to base quest rewards and are funded from the loyalty reserve pool so sponsor budgets remain predictable.',
        ],
        bullets: [
          { label: 'Days 1 – 2 (Starter)', detail: '1.00x base reward with zero decay.' },
          { label: 'Days 3 – 6 (Warming Up)', detail: '1.15x reward boost on all completed quests.' },
          { label: 'Days 7 – 13 (Locked In)', detail: '1.25x reward boost plus 1 automatic Streak Freeze earned.' },
          { label: 'Days 14 – 29 (Turbo Duck)', detail: '1.40x reward boost plus priority access to Daily Gag Drops.' },
          { label: 'Day 30+ (Gold Cap)', detail: '1.60x maximum multiplier + zero minimum on PayPal & USDC cashouts.' },
        ],
      },
      {
        id: 'reward-calculator',
        title: 'Interactive Reward & Streak Calculator',
        paragraphs: [
          'Simulate how base quest rewards, streak days, and sub-30s speed bonuses combine into exact user payouts.',
        ],
        widget: 'streak-calculator',
      },
    ],
  },
  {
    id: 'payout-rails',
    category: 'payouts-trust',
    chapterNumber: '04',
    title: 'Instant Payout Rails & Settlement',
    summary:
      'Complete specifications for GribGag’s 6 instant withdrawal rails, minimums, fees, and geographic availability.',
    readTime: '4 min read',
    updatedAt: 'Updated November 2026',
    keywords: ['payouts', 'withdraw', 'paypal', 'venmo', 'rtp', 'usdc', 'gift cards', 'fees'],
    headings: [
      { id: 'rails-matrix', label: 'Supported Payout Rails' },
      { id: 'idempotency', label: 'Idempotency & Ledger Guarantees' },
    ],
    sections: [
      {
        id: 'rails-matrix',
        title: 'Supported Payout Rails',
        paragraphs: [
          'Users can cash out directly from their mobile wallet once their available balance reaches the rail minimum. Filter the table below by payout category to compare minimums, fees, and settlement windows.',
        ],
        widget: 'payout-rails',
      },
      {
        id: 'idempotency',
        title: 'Idempotency & Ledger Guarantees',
        paragraphs: [
          'Every withdrawal request requires a client-generated UUID v4 idempotency key. If a flaky cellular connection causes a retry, GribGag returns the original payout receipt rather than debiting the user’s balance twice.',
          'Failed external transfers automatically roll back to the user’s available balance within 5 seconds and notify the client via push alert and webhook.',
        ],
        callout: {
          title: 'Zero Hidden Withdrawal Fees',
          body: 'GribGag absorbs network and RTP interchange costs on standard payouts. Gift code redemptions include an additional +2% merchant bonus credit.',
          tone: 'tip',
        },
      },
    ],
  },
  {
    id: 'anti-fraud',
    category: 'payouts-trust',
    chapterNumber: '05',
    title: 'Trust, Velocity & Anti-Fraud Guardrails',
    summary:
      'How GribGag blocks automated bots and click farms while keeping genuine human sub-minute completions fast and frictionless.',
    readTime: '4 min read',
    updatedAt: 'Updated November 2026',
    keywords: ['fraud', 'security', 'bot', 'attestation', 'rate limit', 'velocity', 'trust'],
    headings: [
      { id: 'human-rhythm', label: 'Timing Windows & Human Rhythm' },
      { id: 'device-attestation', label: 'Device Integrity & Attestation' },
      { id: 'appeal-flow', label: 'False-Positive Resolution' },
    ],
    sections: [
      {
        id: 'human-rhythm',
        title: 'Timing Windows & Human Rhythm',
        paragraphs: [
          'Because GribGag rewards speed (<1 minute), our anti-fraud engine distinguishes fast human readers from headless scripts by verifying minimum physical interaction bounds rather than arbitrary long timers.',
        ],
        table: {
          headers: ['Signal', 'Acceptable Human Range', 'Automated Action on Violation'],
          rows: [
            { cells: ['Minimum Elapsed Time', '>= 2,500 ms per step', 'Silent shadow-reject; no credit issued'] },
            { cells: ['Hourly Claim Velocity', '<= 24 quests / hour', '15-minute cooldown prompt'] },
            { cells: ['Pointer / Touch Entropy', 'Natural touch jitter present', 'Step-up biometric or tap challenge'] },
            { cells: ['Concurrent Device Sessions', '1 active session / account', 'Invalidate stale session token'] },
          ],
        },
      },
      {
        id: 'device-attestation',
        title: 'Device Integrity & Attestation',
        paragraphs: [
          'Every claim payload includes a short-lived attestation token signed by Apple App Attest, Google Play Integrity, or our browser WebAuthn challenge layer. Tokens expire after 90 seconds to prevent replay attacks.',
        ],
      },
      {
        id: 'appeal-flow',
        title: 'False-Positive Resolution',
        paragraphs: [
          'If a legitimate user triggers a temporary payout hold—typically caused by switching VPN regions mid-session—they can complete a 10-second selfie or passkey re-verification directly inside the app to release funds immediately.',
        ],
      },
    ],
  },
  {
    id: 'brand-mascot',
    category: 'reference',
    chapterNumber: '06',
    title: 'Mascot, Palette & Visual Identity',
    summary:
      'Official design tokens, color palette, typography, and mascot usage guidelines drawn directly from the GribGag visual universe.',
    readTime: '3 min read',
    updatedAt: 'Updated November 2026',
    keywords: ['brand', 'mascot', 'duck', 'colors', 'palette', 'typography', 'design'],
    headings: [
      { id: 'color-system', label: 'GribGag Sky & Cobalt Color System' },
      { id: 'mascot-rules', label: 'Mascot & Voice Guidelines' },
    ],
    sections: [
      {
        id: 'color-system',
        title: 'GribGag Sky & Cobalt Color System',
        paragraphs: [
          'GribGag pairs a clean daytime sky-and-cloud reading canvas (#F2F9FF) with bold comic-vector ink borders (#0A1A3F), electric cobalt actions (#1250E8), and energetic aqua highlights (#00D2FF). Click any color card below to copy its hex value.',
        ],
        widget: 'brand-swatches',
      },
      {
        id: 'mascot-rules',
        title: 'Mascot & Voice Guidelines',
        paragraphs: [
          'Our mascot duck embodies the GribGag promise: quick-witted, sunglasses-cool, never pushy, and always holding a stopwatch or phone ready to pay out fast.',
        ],
        bullets: [
          {
            label: 'Clear & Concrete Copy',
            detail: 'State exact times and rewards ("Earn $0.45 in 35 seconds") rather than vague hype.',
          },
          {
            label: 'Crisp Ink Outlines',
            detail: 'Use 2px #0A1A3F framing with subtle hard-offset shadows on key hero and interactive cards.',
          },
          {
            label: 'Zero Clutter',
            detail: 'Keep reading surfaces bright and airy so documentation prose remains effortless to scan.',
          },
        ],
      },
    ],
  },
  {
    id: 'faq',
    category: 'reference',
    chapterNumber: '07',
    title: 'Knowledge Base & Troubleshooting FAQ',
    summary:
      'Answers to the most common operational, payout, and streak protection questions across GribGag.',
    readTime: '3 min read',
    updatedAt: 'Updated November 2026',
    keywords: ['faq', 'help', 'troubleshooting', 'support', 'streak freeze', 'hold'],
    headings: [
      { id: 'common-questions', label: 'Frequently Asked Questions' },
    ],
    sections: [
      {
        id: 'common-questions',
        title: 'Frequently Asked Questions',
        paragraphs: [
          'Filter by topic or expand any question below to view operational guidance and resolution steps.',
        ],
        widget: 'faq-accordion',
      },
    ],
  },
];
