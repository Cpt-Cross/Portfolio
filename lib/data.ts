export const profile = {
  name: 'Aditya Kumar',
  callsign: 'CAPTAIN CROSS',
  taskforce: 'TF-141',
  role: 'Community, Creator & Partnerships',
  field: 'Gaming & Creator Economy',
  location: 'Delhi, India',
  coords: '28.61°N 77.21°E',
  workMode: 'Remote-first',
  servicePeriod: '2019 · ACTIVE',
  email: 'CaptainCrossHere@gmail.com',
  photo: '/images/hero.jpg',
  links: {
    linkedin: 'https://www.linkedin.com/in/captaincross',
    twitch: 'https://www.twitch.tv/captaincrosstv',
    youtube: 'https://www.youtube.com/@CaptainCross',
    instagram: 'https://www.instagram.com/cpt.cross/',
    discord: 'CaptainCross', // username; Discord has no public profile URL
  },
  brief: [
    'Creator-economy operator with seven years across gaming, esports, and live activations.',
    'Runs equally as player, cosplayer, agency-side campaign manager, and community lead. A rare combination on the brand side of the table.',
  ],
  doctrine:
    'Brief reviews catch ~30-40% of common creator-experience friction points before they reach talent, because I was the talent.',
  roles: ['Player', 'Cosplayer', 'Creator', 'Community Lead'],
};

// Callsign bar segments with hover intel
export const callsignSegments = [
  { label: 'TF-141', intel: 'Task-force designation: solo operator, full-stack creator & partnerships.' },
  { label: 'CAPTAIN CROSS', intel: 'The gaming-world callsign. Real name: Aditya Kumar.' },
  { label: 'STATUS: ACTIVE', intel: 'Open to work: full-time, remote-first. Cleared for deployment.' },
  { label: '28.61°N 77.21°E', intel: 'Delhi, India. Operating remote-first across NA / EU / SEA / JP.' },
];

// Loadout = stats. Reframed: trust + scale + value. (Now count-up animated on scroll.)
export const loadout = [
  { value: '7+', label: 'Years deployed', sub: 'GAMING / ESPORTS / EVENTS' },
  { value: '1B+', label: 'Impressions delivered', sub: 'VERIFIED · MAVERIK PORTFOLIO' },
  { value: '25K+', label: 'Avg event footfall', sub: 'SCALE OF OPS HANDLED' },
  { value: '~16%', label: 'Avg footfall lift', sub: 'WHERE MEASURED' },
];

export const trustCallout = {
  primary: 'SAMSUNG',
  detail: 'SOLE-VENDOR PARTNER',
  meta: 'SINCE 2024 · NO RE-PITCH',
};

// Deployment log = work. Each = a mission file. (Free Fire moved to additionalOps, no strong imagery.)
export const deployments = [
  {
    op: 'AMD-GAMEON',
    brand: 'AMD GameOn',
    theatre: 'IndiaJoy 2025',
    clearance: 'SOLE-VENDOR',
    status: 'COMPLETE',
    image: '/images/work/amd-gameon.jpg',
    objectives: [
      'End-to-end ownership of the cosplay competition flagship: planning, marketing, on-ground delivery.',
      'On-stage host and judge for the finale, livestreamed on AMD India\u2019s official YouTube channel.',
      '50+ cosplayers coordinated across full production stack and prize distribution.',
      'Activation contributed to 8,000+ event footfall.',
    ],
    tags: ['COSPLAY', 'LIVE-BROADCAST', 'ON-STAGE'],
  },
  {
    op: 'SAMSUNG-GALAXY',
    brand: 'Samsung',
    theatre: 'Galaxy Cup / Unpacked · 2024-2026',
    clearance: 'SOLE-VENDOR',
    status: 'ONGOING',
    image: '/images/work/samsung.jpg',
    objectives: [
      'Selected exclusively (no competitive pitch) as cosplay and creator partner across Samsung\u2019s flagship launches.',
      'Four creators per event, fully remote execution: talent coordination, deliverables, brief-to-publish.',
      'Continuously retained across multiple flagship launches, no re-bidding.',
    ],
    tags: ['BRAND', 'RECURRING', 'REMOTE-OPS'],
  },
  {
    op: 'RIOT-CONVERGE',
    brand: 'Riot Games',
    theatre: 'Valorant Convergence (India)',
    clearance: 'VIA MAVERIK',
    status: 'COMPLETE',
    image: '/images/work/riot-convergence.jpg',
    objectives: [
      'Led influencer and cosplay operations for one of India\u2019s highest-prestige Riot brand activations.',
      'Talent sourcing, deliverables management, on-ground execution across Convergence properties.',
      'Bridged Riot\u2019s global brand standards with Indian creator/cosplay execution.',
    ],
    tags: ['ESPORTS', 'INFLUENCER-OPS', 'GLOBAL-BRAND'],
  },
  {
    op: 'LENOVO-TECHWORLD',
    brand: 'Lenovo',
    theatre: 'Tech World 2026 + Comic Con 2025',
    clearance: 'DIRECT',
    status: 'COMPLETE',
    image: '/images/work/lenovo.jpg',
    objectives: [
      'Designed and executed cosplay competition for Tech World 2026: 50+ registrations, 15 finalists.',
      'Booth activations at Comic Con Delhi (45K+ footfall) and Bengaluru (25K+ footfall).',
      'Structured creator interactions to convert booth foot-traffic into engaged sessions.',
    ],
    tags: ['COSPLAY', 'BOOTH-OPS', 'MULTI-CITY'],
  },
  {
    op: 'COLLEGE-RIVALS',
    brand: 'College Rivals S3',
    theatre: 'Cosplay Invitational · 2026',
    clearance: 'AMPVERSE',
    status: 'COMPLETE',
    image: '/images/work/college-rivals.jpg',
    objectives: [
      'End-to-end execution of the cosplay invitational for a multi-city collegiate esports property.',
      '3,200+ community voting interactions and 800+ registration interests via audience-led voting funnel.',
      'Top 25 finalists shortlisted and managed through grand finale stage execution.',
    ],
    tags: ['COLLEGIATE', 'VOTING-FUNNEL', 'TALENT-MGMT'],
  },
];

// Abridged extra ops, compact list, no imagery needed.
// >> Add more one-liners here any time; they render automatically.
export const additionalOps = [
  {
    op: 'AMAZON-BBD',
    brand: 'Amazon Big Billion Days 2024',
    clearance: 'VIA MAVERIK · 2024',
    note: 'Selected and managed 15+ influencers livestreaming on Amazon India during the Big Billion Days sale. Owned execution end-to-end.',
  },
  {
    op: 'INTEL-AMBASSADOR',
    brand: 'Intel Ambassador Program',
    clearance: 'VIA MAVERIK · 2024',
    note: 'Advised Intel India on selecting the year\u2019s influencer brand ambassadors.',
  },
  {
    op: 'VIEWSONIC-LAUNCH',
    brand: 'ViewSonic Monitor Launch',
    clearance: 'VIA MAVERIK · 2024',
    note: 'Planned and executed a long-term influencer program around ViewSonic\u2019s monitor launches.',
  },
  {
    op: 'WOWS-CAMPAIGN',
    brand: 'World of Warships',
    clearance: 'INDEPENDENT · 2025',
    note: 'Four-creator influencer campaign promoting World of Warships.',
  },
  {
    op: 'FFMAX-JJK',
    brand: 'Free Fire MAX × Jujutsu Kaisen',
    clearance: 'GARENA · 2026',
    note: 'Multi-city anime-IP crossover across 10 colleges (Delhi + Mumbai): cosplay talent and creator deliverables end-to-end.',
  },
  {
    op: 'WAVES-SUMMIT',
    brand: 'WAVES Summit 2025',
    clearance: 'GOVT. OF INDIA',
    note: 'Talent partnerships and creator operations for a national government media summit (via Epiko).',
  },
];

// Service record = career. tag = engagement type. active = currently ongoing.
type ServiceEntry = {
  unit: string;
  posting: string;
  tag: string;
  active?: boolean;
  period: string;
  theatre: string;
  summary: string[];
};

export const serviceRecord: ServiceEntry[] = [
  {
    unit: 'Independent Consultant',
    posting: 'Creator Campaigns & Live Activations',
    tag: 'INDEPENDENT',
    active: true,
    period: 'DEC 2022 - PRESENT',
    theatre: 'REMOTE',
    summary: [
      'Sole-vendor for Samsung (Galaxy Cup + Unpacked) since 2024; recurring AMD, Lenovo and Govt. of India work.',
      'Full lifecycle: strategy, talent sourcing, contract negotiation, on-ground execution, reporting.',
      'Large-scale offline activations integrating creators, cosplayers and communities at 8K-45K+ footfall events.',
    ],
  },
  {
    unit: 'GlitchOver',
    posting: 'Senior Business Development Executive',
    tag: 'CONTRACT',
    period: 'APR 2025 - AUG 2025',
    theatre: 'REMOTE',
    summary: [
      'Led a 7-member outreach and research team during early-stage growth.',
      'Built and managed a 2,000+ creator/partner pipeline via CRM (ClickUp, TeleCRM).',
      'Secured 50+ product demos and onboarded 10+ partners.',
    ],
  },
  {
    unit: 'Reelax',
    posting: 'Brand Manager',
    tag: 'CONTRACT',
    period: 'DEC 2024 - MAR 2025',
    theatre: 'REMOTE',
    summary: [
      'Closed 5 client partnerships in 4 months via outbound and relationship management.',
      'Managed end-to-end influencer campaigns from planning to reporting.',
      'Built CRM-driven outreach workflows; standardised the outbound playbook.',
    ],
  },
  {
    unit: 'Maverik Metacast',
    posting: 'Influencer Project Manager · Head of Cosplay Division',
    tag: 'FULL-TIME',
    period: 'JUL 2023 - JUN 2024',
    theatre: 'BENGALURU, IN',
    summary: [
      'Executed campaigns for Intel, Lenovo, Dell, Riot Games, ViewSonic, AOC.',
      'Managed hundreds of macro and mega influencers across portfolios.',
      'Delivered 1B+ impressions and 100M+ reach.',
    ],
  },
  {
    unit: 'Entrare Esports',
    posting: 'Co-Founder / CEO',
    tag: 'STARTUP',
    period: 'SEP 2021 - MAR 2023',
    theatre: 'NEW DELHI, IN',
    summary: [
      'Built esports operations from zero: SOPs, onboarding, training.',
      'Managed 30+ athletes and 15+ creators/cosplayers.',
      'Launched all-female Valorant roster competing in SEA-level tournaments.',
    ],
  },
  {
    unit: 'BlueStacks',
    posting: 'Senior Community Manager',
    tag: 'FULL-TIME · CONTRACT',
    period: 'FEB 2019 - FEB 2020',
    theatre: 'INDIA',
    summary: [
      'Scaled the gaming community to 200,000+ members.',
      'Led and trained a 12-member moderation team.',
      'Executed tournaments, contests, and influencer-led engagement programs.',
    ],
  },
];

// Combat record = personal gaming creds
export const combatRecord = {
  title: 'COMBAT RECORD',
  subtitle: 'PERSONAL · PROOF THE OPERATOR LIVES IN-THEATRE.',
  entries: [
    { game: 'Call of Duty: Warzone', detail: 'Semi-pro · Nvidia India tournaments', tier: 'COMPETITIVE' },
    { game: 'CS2 / Valorant', detail: 'Long-time competitive', tier: 'COMPETITIVE' },
    { game: 'DOTA 2', detail: 'Long-time competitive', tier: 'COMPETITIVE' },
    { game: 'Arma 3 · Bodycam', detail: 'Tactical-sim regular', tier: 'MIL-SIM' },
  ],
};

// Doctrine roles, now with icon + one-line descriptor for each.
export const roleDetails = [
  { role: 'Player', icon: 'Gamepad2', detail: 'Semi-pro. Competitive FPS across Warzone, CS2, Valorant & DOTA.' },
  { role: 'Cosplayer', icon: 'Drama', detail: 'Active cosplayer with industry ties, talent-side and on-stage.' },
  { role: 'Creator', icon: 'Video', detail: 'Twitch Affiliate · streamer & content creator as Captain Cross.' },
  { role: 'Community Lead', icon: 'Users', detail: 'Scaled and moderated gaming communities past 200K members.' },
];

// The professional throughline, event/activation ops (the "5th front").
export const liveActivations = {
  label: 'Live Activations & Event Ops',
  icon: 'Radar',
  detail:
    'The professional throughline tying the four together: end-to-end, creator-led activations at 8K-45K+ footfall, owned from brief to on-ground delivery.',
};

// Affiliations = brands
export const affiliations = [
  'Samsung', 'AMD', 'Lenovo', 'Riot Games', 'Garena', 'Intel',
  'Dell', 'ViewSonic', 'AOC', 'Ampverse', 'Govt. of India', 'BlueStacks',
];

export const commendation = { name: 'AORUS VOICE OF GAMING', detail: 'NATIONAL CHAMPION', year: '2019' };
