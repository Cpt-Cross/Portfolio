// Campaign data for /work and /gallery.
// Images are NOT listed here: they come from lib/galleries.generated.ts (keyed by
// slug) and are produced by "npm run images". This file is the hand-maintained
// story + numbers per campaign.
//
// >> THINGS TO CONFIRM (Aditya): a few dates and figures came from mixed sources
//    (your old portfolio vs the current site data vs the brief). Anything marked
//    CONFIRM below is a best guess. Correct the value, no code change needed.
//    Sorting still works regardless; only the displayed value is provisional.

export type ProjectStat = { label: string; value: string };

export type Project = {
  slug: string;        // must match a folder in work-images/ and a key in galleries.generated.ts
  op: string;          // stable tactical code shown on the card
  title: string;
  client: string;
  clearance: string;   // engagement type, kept in the existing site vocab
  role: string;        // your role, one line
  year: string;        // display label
  date: string;        // 'YYYY-MM', used only for the Newest / Oldest sort
  status: "ONGOING" | "COMPLETE";
  theatre: string;     // where / which event
  oneLine: string;     // card sub-line, result-focused
  footfall: number;    // used only for the Scale sort; 0 = not applicable (sorts last)
  categories: string[];// filter chips (see WORK_CATEGORIES)
  summary: string[];   // the campaign narrative
  stats: ProjectStat[];// shown big, numbers render green
  tags: string[];      // small descriptive labels
};

// Filter chips, ordered. Plain words on purpose so anyone can use them.
export const WORK_CATEGORIES = ["Cosplay", "Esports", "Launch", "Booth", "Government"] as const;

export const projects: Project[] = [
  {
    slug: "college-rivals",
    op: "CLGRVL-3",
    title: "College Rivals S3",
    client: "Ampverse",
    clearance: "AMPVERSE",
    role: "Cosplay invitational lead, end to end",
    year: "2026",
    date: "2026-03", // CONFIRM month
    status: "COMPLETE",
    theatre: "Cosplay Invitational, multi-city collegiate",
    oneLine: "Ran the cosplay invitational for a multi-city collegiate esports property.",
    footfall: 5000,
    categories: ["Esports", "Cosplay"],
    summary: [
      "Ran the College Rivals cosplay invitational end to end for a multi-city collegiate esports property.",
      "Drove 3,200+ community voting interactions and 800+ registration interests through an audience-led voting funnel.",
      "Shortlisted the top 25 finalists and managed them through the grand finale stage.",
    ],
    stats: [
      { label: "Voting interactions", value: "3,200+" },
      { label: "Registration interest", value: "800+" },
      { label: "Finalists", value: "Top 25" },
    ],
    tags: ["COLLEGIATE", "VOTING-FUNNEL", "TALENT-MGMT"],
  },
  {
    slug: "lenovo-techworld",
    op: "LNVO-TW",
    title: "Lenovo Tech World",
    client: "Lenovo",
    clearance: "DIRECT",
    role: "Cosplay competition design and execution",
    year: "2026", // CONFIRM: image folder says 2025, current site says 2026
    date: "2026-02", // CONFIRM month + year
    status: "COMPLETE",
    theatre: "Lenovo Tech World",
    oneLine: "Designed and ran the cosplay competition, 50+ down to 15 stage finalists.",
    footfall: 7500,
    categories: ["Launch", "Cosplay"],
    summary: [
      "Designed and ran the Lenovo Tech World cosplay competition: 50+ registrations down to 15 stage finalists.",
      "Handled format, marketing, shortlisting, and on-ground stage management.",
      "Built creator moments that turned booth and stage traffic into engaged sessions.",
    ],
    stats: [
      { label: "Registrations", value: "50+" },
      { label: "Finalists", value: "15" },
      { label: "Footfall", value: "7,500+" },
    ],
    tags: ["TECH", "COSPLAY", "ON-STAGE"],
  },
  {
    slug: "freefire-jjk",
    op: "FFMAX-JJK",
    title: "Free Fire MAX x Jujutsu Kaisen",
    client: "Garena",
    clearance: "GARENA",
    role: "College campaign talent and creator deliverables",
    year: "2026",
    date: "2026-01",
    status: "COMPLETE",
    theatre: "Multi-city college launch, Delhi + Mumbai",
    oneLine: "Cosplay and creator talent for the anime-IP college launch campaign.",
    footfall: 0,
    categories: ["Launch", "Esports"],
    summary: [
      "Managed cosplay and creator talent for the Free Fire MAX x Jujutsu Kaisen college launch campaign.",
      "Ran content deliverables with talent across 10+ colleges in Delhi and Mumbai.",
      "Drove participation and footfall on the event grounds.",
    ],
    stats: [
      { label: "Colleges", value: "10+" },
      { label: "Cities", value: "2" },
    ],
    tags: ["CAMPAIGN", "GAMING", "ANIME-IP"],
  },
  {
    slug: "comiccon-delhi",
    op: "CCXP-DEL",
    title: "Delhi Comic Con",
    client: "Lenovo x Intel",
    clearance: "DIRECT",
    role: "Booth talent activation lead",
    year: "2025",
    date: "2025-12", // CONFIRM month
    status: "COMPLETE",
    theatre: "Comic Con Delhi",
    oneLine: "Ran Lenovo x Intel booth talent ops across the three-day show.",
    footfall: 45000,
    categories: ["Booth", "Cosplay"],
    summary: [
      "Ran Lenovo x Intel booth talent activities across the three-day show.",
      "Set up influencer meets and cosplayer fan engagement at the booth.",
      "Used scheduled micro-events to pull Comic Con footfall onto the booth floor.",
    ],
    stats: [
      { label: "Event days", value: "3" },
      { label: "Footfall", value: "45,000+" },
    ],
    tags: ["BOOTH-OPS", "INFLUENCERS", "OFFLINE"],
  },
  {
    slug: "amd-gameon",
    op: "AMD-GO25",
    title: "AMD GameOn",
    client: "AMD",
    clearance: "SOLE-VENDOR",
    role: "Cosplay competition lead, host and judge",
    year: "2025",
    date: "2025-11", // confirmed: IndiaJoy 2025, Nov 1-2, Hyderabad
    status: "COMPLETE",
    theatre: "IndiaJoy 2025, Hyderabad",
    oneLine: "Owned and hosted the flagship cosplay competition on the AMD India livestream.",
    footfall: 8000,
    categories: ["Esports", "Cosplay", "Government"],
    summary: [
      "Owned the AMD GameOn cosplay competition end to end: concept, marketing, talent, and on-ground delivery.",
      "Hosted and judged the finale on AMD India's official YouTube livestream from the GameOn stage.",
      "Coordinated 50+ cosplayers at IndiaJoy, a festival backed by the Government of Telangana.",
    ],
    stats: [
      { label: "Cosplayers", value: "50+" },
      { label: "Footfall", value: "8,000+" },
      { label: "Days", value: "2" },
    ],
    tags: ["COSPLAY", "LIVE-BROADCAST", "ON-STAGE"],
  },
  {
    slug: "samsung-2025",
    op: "SMSNG-25",
    title: "Samsung Galaxy Unpacked 2025",
    client: "Samsung",
    clearance: "SOLE-VENDOR",
    role: "Cosplay and artist talent partner",
    year: "2025",
    date: "2025-07", // CONFIRM exact launch month
    status: "ONGOING",
    theatre: "Galaxy Unpacked / Galaxy Cup",
    oneLine: "Sole-vendor cosplay and artist partner, retained across launches with no re-pitch.",
    footfall: 5000,
    categories: ["Launch", "Cosplay"],
    summary: [
      "Selected exclusively, with no competitive pitch, as the cosplay and artist partner for Samsung's flagship launch.",
      "Ran the talent end to end and fully remote: sourcing, coordination, deliverables, brief to publish.",
      "Part of a partnership Samsung has retained across multiple flagship launches since 2024, with no re-bidding.",
    ],
    stats: [
      { label: "Creators", value: "4+" },
      { label: "Footfall", value: "5,000+" },
      { label: "Re-pitches", value: "0" },
    ],
    tags: ["BRAND", "RECURRING", "REMOTE-OPS"],
  },
  {
    slug: "waves-summit",
    op: "WAVES-25",
    title: "WAVES Summit 2025",
    client: "Govt. of India (via Epiko)",
    clearance: "GOVT. OF INDIA",
    role: "Talent partnerships and creator ops",
    year: "2025",
    date: "2025-05", // CONFIRM
    status: "COMPLETE",
    theatre: "WAVES Summit 2025",
    oneLine: "Talent partnerships and creator ops for a national government media summit.",
    footfall: 20000,
    categories: ["Government"],
    summary: [
      "Managed talent partnerships and creator operations for a national Government of India media summit (via Epiko).",
      "Coordinated marketing, schedules, and on-ground operations across the program.",
      "Worked alongside national security and international media teams to keep deliverables moving.",
    ],
    stats: [
      { label: "Talent", value: "10+" },
      { label: "Footfall", value: "20,000+" },
    ],
    tags: ["GOVT", "PARTNERSHIPS", "ON-GROUND"],
  },
  {
    slug: "comiccon-bengaluru",
    op: "CCXP-BLR",
    title: "Bengaluru Comic Con",
    client: "Lenovo x Intel",
    clearance: "DIRECT",
    role: "Booth talent activation",
    year: "2024-25", // CONFIRM
    date: "2024-11", // CONFIRM
    status: "COMPLETE",
    theatre: "Comic Con Bengaluru",
    oneLine: "Carried the booth talent playbook into a second city.",
    footfall: 25000, // CONFIRM: current site says 25K+, old portfolio said 30K+
    categories: ["Booth", "Cosplay"],
    summary: [
      "Planned and ran Lenovo x Intel booth talent activities across the three-day Bengaluru show.",
      "Set up influencer meets and cosplayer engagement to lift booth footfall.",
      "Carried the Delhi booth playbook into a second city.",
    ],
    stats: [
      { label: "Event days", value: "3" },
      { label: "Footfall", value: "25,000+" },
    ],
    tags: ["BOOTH-OPS", "COMMUNITY", "OFFLINE"],
  },
  {
    slug: "samsung-2024",
    op: "SMSNG-24",
    title: "Samsung Galaxy Unpacked 2024",
    client: "Samsung",
    clearance: "SOLE-VENDOR",
    role: "Cosplay and artist talent partner",
    year: "2024",
    date: "2024-07", // CONFIRM exact launch month
    status: "COMPLETE",
    theatre: "Galaxy Unpacked / Galaxy Cup",
    oneLine: "First launch of the ongoing Samsung partnership.",
    footfall: 5000,
    categories: ["Launch", "Cosplay"],
    summary: [
      "First launch of the Samsung partnership: cosplay and artist talent for the Galaxy Unpacked / Galaxy Cup window.",
      "Talent sourcing, commercials, content ideation, and on-ground execution, run remotely.",
      "Set up the working relationship Samsung has renewed at every launch since.",
    ],
    stats: [
      { label: "Creators", value: "4+" },
      { label: "Footfall", value: "5,000+" },
    ],
    tags: ["BRAND", "REMOTE-OPS", "CONSULTANCY"],
  },
  {
    slug: "riot-convergence",
    op: "RIOT-CVG",
    title: "Valorant Convergence",
    client: "Riot Games",
    clearance: "VIA MAVERIK",
    role: "Influencer and cosplay operations lead",
    year: "2024", // CONFIRM year
    date: "2024-06", // CONFIRM
    status: "COMPLETE",
    theatre: "Valorant Convergence, India",
    oneLine: "Led influencer and cosplay ops for one of India's first official Riot LAN activations.",
    footfall: 20000,
    categories: ["Esports", "Cosplay"],
    summary: [
      "Led influencer and cosplay operations for one of India's first official Riot LAN activations.",
      "Sourced talent, managed deliverables, and ran on-ground execution across the Convergence properties.",
      "Bridged Riot's global brand standards with Indian creator and cosplay execution.",
    ],
    stats: [
      { label: "Talent", value: "20+" },
      { label: "Footfall", value: "20,000+" },
    ],
    tags: ["ESPORTS", "INFLUENCER-OPS", "GLOBAL-BRAND"],
  },

  // ---- Promoted from abridged to full files (2026-06). Add images per the
  //      handoff notes. CONFIRM the dates, and add real numbers to `stats`. ----
  {
    slug: "amazon-bbd",
    op: "AMZN-BBD",
    title: "Amazon Big Billion Days 2024",
    client: "Amazon India",
    clearance: "VIA MAVERIK",
    role: "Influencer operations lead",
    year: "2024",
    date: "2024-10", // CONFIRM month (Big Billion Days usually runs in October)
    status: "COMPLETE",
    theatre: "Live commerce, Big Billion Days",
    oneLine: "Ran 15+ influencers livestreaming on Amazon India through the Big Billion Days sale.",
    footfall: 0,
    categories: ["Launch"],
    summary: [
      "Selected and managed 15+ influencers livestreaming on Amazon India during the Big Billion Days sale.",
      "Owned the operation end to end: sourcing, scheduling, briefs, and live-day coordination.",
      "Kept creators on brief through a high-volume, time-boxed sale window.",
    ],
    stats: [
      { label: "Influencers", value: "15+" },
      // CONFIRM: add real numbers if you have them (hours live, views, units moved)
    ],
    tags: ["LIVE-COMMERCE", "INFLUENCER-OPS", "AMAZON"],
  },
  {
    slug: "world-of-warships",
    op: "WOWS-25",
    title: "World of Warships",
    client: "World of Warships",
    clearance: "INDEPENDENT",
    role: "Influencer campaign lead",
    year: "2025",
    date: "2025-06", // CONFIRM month
    status: "COMPLETE",
    theatre: "Creator campaign, India",
    oneLine: "Built and ran a four-creator influencer campaign for World of Warships.",
    footfall: 0,
    categories: ["Esports"],
    summary: [
      "Built and ran a four-creator influencer campaign promoting World of Warships in India.",
      "Owned creator selection, briefing, and content coordination end to end, independently.",
    ],
    stats: [
      { label: "Creators", value: "4" },
      // CONFIRM: add real numbers if you have them (views, reach)
    ],
    tags: ["GAMING", "INFLUENCER-OPS", "INDEPENDENT"],
  },
  {
    slug: "intel-ambassador",
    op: "INTEL-AMB",
    title: "Intel Ambassador Program",
    client: "Intel India",
    clearance: "VIA MAVERIK",
    role: "Influencer selection advisor",
    year: "2024",
    date: "2024-05", // CONFIRM month
    status: "COMPLETE",
    theatre: "Brand ambassador selection",
    oneLine: "Advised Intel India on the year's influencer brand ambassadors.",
    footfall: 0,
    categories: ["Launch"],
    summary: [
      "Advised Intel India on selecting the year's influencer brand ambassadors.",
      "Brought creator-fit and audience judgement to the shortlist.",
    ],
    stats: [
      // CONFIRM: add a number if you have one (ambassadors selected, reach)
    ],
    tags: ["ADVISORY", "CREATOR-FIT", "INTEL"],
  },
  {
    slug: "viewsonic-launch",
    op: "VWSNC-LNCH",
    title: "ViewSonic Monitor Launch",
    client: "ViewSonic",
    clearance: "VIA MAVERIK",
    role: "Influencer program lead",
    year: "2024",
    date: "2024-04", // CONFIRM month
    status: "COMPLETE",
    theatre: "Long-term monitor launch program",
    oneLine: "Planned and ran a long-term influencer program around ViewSonic's monitor launches.",
    footfall: 0,
    categories: ["Launch"],
    summary: [
      "Planned and ran a long-term influencer program around ViewSonic's monitor launches.",
      "Kept a steady creator cadence across multiple launch beats.",
    ],
    stats: [
      // CONFIRM: add a number if you have one (creators, launches covered)
    ],
    tags: ["PRODUCT-LAUNCH", "INFLUENCER-OPS", "VIEWSONIC"],
  },
];

// Ops with no gallery imagery, listed for completeness on the page.
// All current ops are now full files above; add future minor ops here and the
// "ADDITIONAL OPS" strip will reappear on its own.
export type AbridgedOp = { op: string; brand: string; clearance: string; note: string };
export const abridgedOps: AbridgedOp[] = [];

// Hand-picked showcase order for the "Curated" sort (the default). Edit freely;
// reorder to taste. Any slug not listed here falls to the end, newest first.
export const CURATED_ORDER: string[] = [
  "samsung-2025",
  "amd-gameon",
  "riot-convergence",
  "lenovo-techworld",
  "college-rivals",
  "comiccon-delhi",
  "waves-summit",
  "comiccon-bengaluru",
  "samsung-2024",
  "freefire-jjk",
  "amazon-bbd",
  "world-of-warships",
  "intel-ambassador",
  "viewsonic-launch",
];
