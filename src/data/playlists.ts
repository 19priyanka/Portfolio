import type { Playlist, Track } from '../types';

/* ---------------------------------------------------------------------------
   Content.

   The player metaphor maps onto real data:
     duration  months of active work, rendered mm:ss (8 months -> "8:00")
     plays     a reach metric for the work
     tags      the actual technology stack

   Values tagged VERIFY are estimates made from the résumé summary and should
   be confirmed against the real dates and metrics before this goes live.
   --------------------------------------------------------------------------- */

const capstone: Track = {
  slug: 'coop-handheld-scanner',
  title: 'Revamped Calgary Co-Op Handheld Scanner',
  subtitle: 'Capstone · React Native, Django · First place, Engineering Design Fair',
  duration: '8:00', // VERIFY: assumed an 8-month capstone cycle
  durationSeconds: 480,
  plays: '1st place',
  year: '2024',
  tags: ['React Native', 'Django', 'Offline-First', 'SQLite', 'Python'],
  summary:
    'Grocery store back rooms and freezer aisles are Wi-Fi dead zones, and the existing handheld scanners silently dropped inventory scans whenever staff walked into one. We rebuilt the application offline-first: scans are written locally and reconciled against a Django backend the moment signal returns, so a walk through a dead zone costs nothing.',
  highlights: [
    'Offline-first data layer that queues scans locally and reconciles on reconnect, eliminating the low-Wi-Fi data loss that motivated the project.',
    'React Native client targeting the existing handheld hardware, so stores did not need new devices.',
    'Django REST backend handling sync, conflict resolution and inventory reconciliation.',
    'Took first place in the Schulich School of Engineering Design Fair.',
  ],
  links: [{ label: 'Project poster (PDF)', href: '/docs/Handheld_App_Poster.pdf', kind: 'doc' }],
};

const brainyBees: Track = {
  slug: 'brainy-bees',
  title: 'Brainy Bees',
  subtitle: 'Educational platform · Web, games and quizzes',
  artwork: '/assets/BrainyBeesLogo.png',
  duration: '3:30', // VERIFY: assumed one academic term
  durationSeconds: 210,
  plays: 'Grades 5–9',
  tags: ['C++', 'Web', 'Education', 'Game Design', 'UX Research'],
  summary:
    'A coding platform for students in grades 5 through 9, built around the fact that kids do not all learn the same way. Visual learners get videos, hands-on learners get challenges, and everyone gets games — with separate tracks for beginner, intermediate and advanced users.',
  highlights: [
    'Four parallel learning modes — visual, auditory, interactive and hands-on — rather than one linear curriculum.',
    'Difficulty tiers so a beginner and an advanced student can use the same platform.',
    'Games, videos, quizzes and coding challenges as first-class content types.',
  ],
  links: [
    { label: 'Live site', href: 'https://spontaneous-tulumba-bb55aa.netlify.app/', kind: 'site' },
    { label: 'Source', href: 'https://github.com/19priyanka/CPSC481_BrainyBees', kind: 'code' },
    { label: 'Walkthrough', href: 'https://youtu.be/yJtHYlctFEg', kind: 'video' },
  ],
};

const vrLayerSense: Track = {
  slug: 'vr-haptoskin-layersense',
  title: 'VR-HaptoSkin-Pro / VR-LayerSense',
  subtitle: 'Medical training simulator · Unity, OpenGL, haptics',
  artwork: '/assets/VRLogo.png',
  duration: '4:00', // VERIFY: assumed one academic term
  durationSeconds: 240,
  plays: 'Needle accuracy',
  tags: ['C++', 'OpenGL', 'Unity', 'VR', 'Haptics'],
  summary:
    'A VR trainer for needle placement that simulates the resistance of each skin layer as the needle passes through it. Two haptic models were built and compared: HaptoSkin Pro delivers consistent feedback, LayerSense Precision varies it by layer — the question being which one actually produces better precision in trainees.',
  highlights: [
    'Layer-by-layer skin puncture simulation with force feedback tuned per tissue type.',
    'Two competing haptic feedback models built as a controlled comparison rather than a single implementation.',
    'Unity and OpenGL rendering pipeline with a C++ simulation core.',
  ],
  links: [
    {
      label: 'Source',
      href: 'https://github.com/19priyanka/VR-HaptoSkin-Pro-VR-LayerSense-',
      kind: 'code',
    },
  ],
};

const getHomeSafe: Track = {
  slug: 'get-home-safe',
  title: 'GetHomeSafe',
  subtitle: 'Personal safety app · React Native, Node, MongoDB',
  artwork: '/assets/GetHomeSafeLogo.png',
  duration: '4:00', // VERIFY: assumed one academic term
  durationSeconds: 240,
  plays: 'Low-signal safe',
  tags: ['React Native', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
  summary:
    'Location sharing for the walk home. Friends can watch your route and get a confirmation when you arrive, with the sharing path built to survive low signal — because the moment you most want someone tracking you is rarely the moment you have five bars.',
  highlights: [
    'Live route tracking with an explicit "arrived safe" confirmation, not just a dropped pin.',
    'Degrades gracefully on weak connections instead of silently failing.',
    'TypeScript across the React Native client and the Express/MongoDB backend.',
  ],
  links: [
    { label: 'Source', href: 'https://github.com/19priyanka/GetHomeSafe', kind: 'code' },
    {
      label: 'Figma prototype',
      href: 'https://www.figma.com/proto/HQ3pqTTEgOCHoUBwUnG4oa/559-Presentation?node-id=112-1355&starting-point-node-id=112%3A1355',
      kind: 'design',
    },
  ],
};

const matchAid: Track = {
  slug: 'match-aid',
  title: 'MatchAid',
  subtitle: 'Volunteer matching platform · Web',
  artwork: '/assets/MatchAidLogo.png',
  duration: '3:45', // VERIFY: assumed one academic term
  durationSeconds: 225,
  plays: 'Volunteer gap',
  tags: ['Web', 'Full Stack', 'Product Design', 'Figma'],
  summary:
    'Organizations need volunteers and volunteers want to help, and the two mostly fail to find each other. MatchAid centralizes opportunities by interest and location, and closes the loop with feedback and reporting so both sides stay accountable.',
  highlights: [
    'Opportunity discovery filtered by interest and location rather than an undifferentiated list.',
    'Two-way feedback and reporting to keep both volunteers and organizations accountable.',
    'Full design pass in Figma before implementation.',
  ],
  links: [
    { label: 'Source', href: 'https://github.com/19priyanka/MatchAid', kind: 'code' },
    { label: 'Walkthrough', href: 'https://www.youtube.com/watch?v=qqGJYLxnbPc', kind: 'video' },
    {
      label: 'Figma',
      href: 'https://www.figma.com/design/aiwWQoBjliScRLP4StmSXu/Volunteer-v2?node-id=2103-2&p=f&t=7ZSYt8MrYHypvBtV-0',
      kind: 'design',
    },
    {
      label: 'Presentation',
      href: 'https://docs.google.com/presentation/d/1zTdt8UEbLen7Cvina28zZfCKMoFrYMv25MS2jh9E0Ko/edit?usp=sharing',
      kind: 'doc',
    },
  ],
};

const mnist: Track = {
  slug: 'handwritten-digit-recognition',
  title: 'Handwritten Digit Recognition',
  subtitle: 'Model comparison study · MNIST',
  artwork: '/assets/MachineLearningLogo.png',
  duration: '2:30', // VERIFY: assumed a short term project
  durationSeconds: 150,
  plays: 'CNN won',
  tags: ['Python', 'Machine Learning', 'CNN', 'SVM', 'Random Forest'],
  summary:
    'A head-to-head comparison of Random Forest, SVM and CNN on MNIST, scored not just on accuracy but on model complexity and training cost. The CNN won on accuracy, which is the boring half of the answer — the interesting half is what each model costs to get there.',
  highlights: [
    'Three model families trained and evaluated on the same MNIST split.',
    'Compared on accuracy, complexity and computational efficiency rather than accuracy alone.',
    'CNN produced the highest accuracy of the three.',
  ],
  links: [
    {
      label: 'Notebooks',
      href: 'https://drive.google.com/drive/u/1/folders/1zQDmYtzk8F0WWuujj_U748AwjGLm4SZn',
      kind: 'code',
    },
    { label: 'Walkthrough', href: 'https://youtu.be/TbAjnlTfCkQ', kind: 'video' },
    {
      label: 'Presentation',
      href: 'https://docs.google.com/presentation/d/1bmzTm12OP0q0MxjytglE7glLdmweB-QqjSU-5Kh86Wc/edit?usp=sharing',
      kind: 'doc',
    },
  ],
};

const cnrl: Track = {
  slug: 'canadian-natural',
  title: 'Developer Analyst',
  subtitle: 'Canadian Natural Resources Limited · Calgary',
  artwork: '/assets/Canadian_Natural_Logo.svg',
  duration: '24:00', // VERIFY: tenure length is an estimate
  durationSeconds: 1440,
  plays: 'Now playing',
  year: 'Present',
  tags: ['Angular', 'Blazor', 'C#', 'VB.NET', 'SQL', 'PL/SQL'],
  summary:
    'Re-architecting mission-critical systems at scale — the kind where the migration plan matters more than the framework choice, because the old system cannot go down while the new one comes up. Much of the work sits where industrial hardware meets the enterprise stack.',
  highlights: [
    'Large-scale re-architecture of mission-critical systems, modernizing legacy code paths without interrupting operations.',
    'Integration of industrial hardware systems with the enterprise application stack.',
    'Full-stack delivery across Angular and Blazor front ends, C# and VB.NET services, and SQL/PL/SQL data layers.',
  ],
  links: [],
};

const newRelic: Track = {
  slug: 'new-relic',
  title: 'Full Stack Software Engineering Intern',
  subtitle: 'New Relic',
  artwork: '/assets/new_relic_logo.png',
  duration: '12:00', // VERIFY: internship length is an estimate
  durationSeconds: 720,
  plays: 'Shipped to prod',
  tags: ['Distributed Tracing', 'Full Stack', 'Algorithms', 'Observability'],
  summary:
    'Built the Distributed Tracing Setup Wizard — the onboarding path that takes a customer from "tracing is off" to "tracing is on" without a support ticket — plus performance-ranking algorithms and improvements to internal configuration tooling.',
  highlights: [
    'Delivered a Distributed Tracing Setup Wizard end to end, from interface through to the configuration it writes.',
    'Engineered performance-ranking algorithms surfacing the slowest paths first.',
    'Optimized internal configuration tools used by other engineering teams.',
  ],
  links: [],
};

const schulich: Track = {
  slug: 'schulich-engineering',
  title: 'B.Sc. Software Engineering, with Distinction',
  subtitle: 'Schulich School of Engineering, University of Calgary',
  artwork: '/assets/schulich_logo.png',
  duration: '60:00', // VERIFY: assumed a five-year program including internship
  durationSeconds: 3600,
  plays: 'With distinction',
  tags: ['Software Engineering', 'Distinction', 'Design Fair Winner'],
  summary:
    'Software Engineering at Schulich, graduated with distinction, capped with a first-place finish at the Engineering Design Fair for the Calgary Co-Op handheld scanner rebuild.',
  highlights: [
    'B.Sc. in Software Engineering, awarded with distinction.',
    'First place, Engineering Design Fair.',
    'Mentored 80+ engineering students across the degree.',
  ],
  links: [],
};

const mentorship: Track = {
  slug: 'schulich-mentorship',
  title: 'Schulich Student Mentorship Program',
  subtitle: 'Mentor · University of Calgary',
  artwork: '/assets/schulich_logo.png',
  duration: '18:00', // VERIFY: ongoing, length is an estimate
  durationSeconds: 1080,
  plays: '80+ mentored',
  year: 'Ongoing',
  tags: ['Mentorship', 'Engineering', 'Community'],
  summary:
    'Guiding incoming engineering undergrads through the part nobody writes down — course selection, internship hunting, and the general question of whether feeling lost in first year is normal. It is.',
  highlights: [
    'Active mentor to incoming Schulich engineering undergraduates.',
    'Over 80 students mentored to date.',
    'Focus on course planning, internship search and navigating first-year engineering.',
  ],
  links: [],
};

const unitedWay: Track = {
  slug: 'cnqbay-united-way',
  title: 'CNQBay Charity Auction',
  subtitle: 'Head Chair · United Way campaign',
  duration: '6:00', // VERIFY: annual campaign, length is an estimate
  durationSeconds: 360,
  plays: 'Annual',
  tags: ['Leadership', 'Fundraising', 'Event Ops'],
  summary:
    'Head Chair of the annual CNQBay online charity auction supporting United Way — running the campaign end to end, from donation sourcing through to the auction platform itself and the people operating it.',
  highlights: [
    'Head Chair of the annual online charity auction in support of United Way.',
    'Ownership of the full campaign: sourcing, platform, promotion and operations.',
    'Led the volunteer team running the event.',
  ],
  links: [],
};

const cagis: Track = {
  slug: 'cagis',
  title: 'CAGIS — STEM Expert Volunteer',
  subtitle: 'Canadian Association for Girls in Science',
  artwork: '/assets/CAGISLogo.png',
  duration: '14:00', // VERIFY: ongoing, length is an estimate
  durationSeconds: 840,
  plays: 'Ages 7–17',
  year: 'Ongoing',
  tags: ['STEM Outreach', 'Youth', 'Workshop Design', 'Volunteering'],
  summary:
    "CAGIS is Canada's largest and longest-running STEM club for girls and gender-diverse youth aged 7 to 17, running since 1992. I design and deliver the software sessions — turning things like algorithms and debugging into activities a nine-year-old will actually want to finish.",
  highlights: [
    'Design and deliver interactive events explaining software concepts to youth aged 7–17.',
    'Build age-appropriate presentations and hands-on activities from scratch.',
    'Mentor participants toward seeing themselves in a STEM career, in line with CAGIS\'s equity, diversity, inclusion and accessibility mandate.',
  ],
  links: [{ label: 'About CAGIS', href: 'https://cagis.ca/', kind: 'site' }],
};

export const playlists: Playlist[] = [
  {
    slug: 'featured',
    title: 'Featured Release',
    description:
      'The capstone. An offline-first rebuild of Calgary Co-Op\'s handheld scanner application, and first place at the Engineering Design Fair.',
    kind: 'album',
    gradient: 'from-emerald-600 via-emerald-800 to-elevated',
    accent: '#047857',
    tracks: [capstone],
  },
  {
    slug: 'projects',
    title: 'Shipped Builds',
    description:
      'Everything that made it out of the editor — mobile, VR, machine learning and the web, in roughly the order I would replay them.',
    kind: 'playlist',
    gradient: 'from-cyan-600 via-sky-900 to-elevated',
    accent: '#0e7490',
    tracks: [capstone, getHomeSafe, brainyBees, vrLayerSense, matchAid, mnist],
  },
  {
    slug: 'experience',
    title: 'On Repeat: 9-to-5',
    description:
      'Where the hours actually go. Enterprise re-architecture, observability tooling, and the degree that started it.',
    kind: 'album',
    gradient: 'from-amber-500 via-orange-900 to-elevated',
    accent: '#b45309',
    tracks: [cnrl, newRelic, schulich],
  },
  {
    slug: 'mentorship',
    title: 'Paying It Forward',
    description:
      'Leadership and mentorship — the long-running series. Eighty-plus engineering students and one annual charity auction.',
    kind: 'podcast',
    gradient: 'from-violet-600 via-purple-900 to-elevated',
    accent: '#6d28d9',
    tracks: [mentorship, unitedWay],
  },
  {
    slug: 'community',
    title: 'Community Sessions',
    description:
      'Volunteering and STEM outreach. Making software legible to people who have not been told it is for them.',
    kind: 'playlist',
    gradient: 'from-rose-500 via-rose-900 to-elevated',
    accent: '#be123c',
    tracks: [cagis],
  },
];

export const featuredPlaylist = playlists[0]!;

export function getPlaylist(slug: string | undefined): Playlist | undefined {
  return playlists.find((p) => p.slug === slug);
}

/** Every track, de-duplicated by slug — a track may appear in more than one playlist. */
export const allTracks: Track[] = Array.from(
  new Map(playlists.flatMap((p) => p.tracks).map((t) => [t.slug, t])).values(),
);

/** Which playlist a track should link to when surfaced outside a playlist page. */
export function playlistForTrack(trackSlug: string): Playlist | undefined {
  return playlists.find((p) => p.tracks.some((t) => t.slug === trackSlug));
}

export function totalRuntime(tracks: Track[]): string {
  const seconds = tracks.reduce((sum, t) => sum + t.durationSeconds, 0);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
}

export function formatSeconds(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60);
  return `${minutes}:${String(safe % 60).padStart(2, '0')}`;
}
