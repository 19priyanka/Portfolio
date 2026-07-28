import type { Playlist, Track } from '../types';

/* ---------------------------------------------------------------------------
   Content.

   Dates, titles and tenure come from the LinkedIn profile export (July 2026),
   which is the accurate source. The résumé PDF is older and omits Canadian
   Natural entirely.

   Where Spotify shows a track length, this shows `meta` — the honest number for
   that row. Tenure for a role, a timespan for a project. There is deliberately
   no mm:ss anywhere: nothing plays, and a running clock with no audio behind it
   reads as a bug rather than as a metaphor.

   TODO (Priyanka): the Off the Clock and Currently Learning tracks are written
   from a short description and are the one part of this file not sourced from a
   document. Correct the details — years played, which Corporate Challenge
   events, what you are actually working through right now.
   --------------------------------------------------------------------------- */

/* --- Projects ------------------------------------------------------------- */

const capstone: Track = {
  slug: 'coop-handheld-scanner',
  title: 'Revamped Calgary Co-Op Handheld Scanner',
  subtitle: 'Project Manager & Frontend Technical Lead · React Native, Django',
  artwork: '/assets/capstone-preview.png',
  artworkFit: 'cover',
  meta: '8 months',
  metaLabel: 'September 2023 — April 2024',
  plays: '1st place',
  year: '2024',
  tags: ['React Native', 'Django', 'Python', 'Offline-First', 'Data Sync'],
  summary:
    'Grocery store back rooms and freezer aisles are Wi-Fi dead zones, and the existing handheld scanners silently dropped inventory scans whenever staff walked into one. We rebuilt the application offline-first: scans are written locally and reconciled against a Django backend the moment signal returns, so a walk through a dead zone costs nothing. It took first place at the Engineering Design Fair.',
  highlights: [
    'Optimized data synchronization for low-connectivity environments, eliminating the scan loss that motivated the project.',
    'Led the project as Project Manager and Frontend Technical Lead.',
    'React Native client targeting the existing handheld hardware, so stores did not need new devices.',
    'Placed first in the Schulich School of Engineering Design Fair.',
  ],
  links: [{ label: 'Project poster (PDF)', href: '/docs/Handheld_App_Poster.pdf', kind: 'doc' }],
};

const getHomeSafe: Track = {
  slug: 'get-home-safe',
  title: 'GetHomeSafe',
  subtitle: 'Personal safety app · React Native, Node, MongoDB',
  artwork: '/assets/GetHomeSafeLogo.png',
  artworkFit: 'cover',
  meta: 'Project',
  metaLabel: 'Course project',
  plays: 'Privacy-first',
  tags: ['React Native', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
  summary:
    'A distributed mobile app for the walk home. It shares the minimum location necessary and monitors a session rather than tracking you continuously — a privacy-first approach that sets it apart from conventional location-sharing apps. Friends get a confirmation when you arrive.',
  highlights: [
    'Session-based monitoring rather than continuous tracking, so sharing ends when the walk does.',
    'Minimal location sharing by design, built privacy-first.',
    'TypeScript across the React Native client and the Express/MongoDB backend.',
  ],
  links: [
    { label: 'Frontend', href: 'https://github.com/19priyanka/GetHomeSafe', kind: 'code' },
    {
      label: 'Figma prototype',
      href: 'https://www.figma.com/proto/HQ3pqTTEgOCHoUBwUnG4oa/559-Presentation?node-id=112-1355&starting-point-node-id=112%3A1355',
      kind: 'design',
    },
  ],
};

const brainyBees: Track = {
  slug: 'brainy-bees',
  title: 'Brainy Bees',
  subtitle: 'Educational coding platform · React, C++',
  artwork: '/assets/BrainyBeesLogo.png',
  artworkFit: 'logo',
  meta: 'Project',
  metaLabel: 'Course project',
  plays: 'Grades 5–9',
  tags: ['React', 'C++', 'Education', 'Game Design', 'UX Research'],
  summary:
    'A coding platform for young students, built around the fact that kids do not all learn the same way. Interactive lessons, games, quizzes and personalized exercises, with gamified learning and assessment to hold attention long enough for the concepts to land.',
  highlights: [
    'Interactive lessons, games, quizzes and personalized coding exercises as first-class content types.',
    'Gamified learning and assessment built in to boost comprehension.',
    'Beginner through advanced tiers so the same platform serves a range of levels.',
  ],
  links: [
    { label: 'Live site', href: 'https://spontaneous-tulumba-bb55aa.netlify.app/', kind: 'site' },
    { label: 'Source', href: 'https://github.com/19priyanka/CPSC481_BrainyBees', kind: 'code' },
    { label: 'Walkthrough', href: 'https://youtu.be/yJtHYlctFEg', kind: 'video' },
  ],
};

const vrLayerSense: Track = {
  slug: 'vr-haptoskin-layersense',
  title: 'VR HaptoSkin Pro & VR LayerSense',
  subtitle: 'Medical training simulator · C++, OpenGL, Unity, haptics',
  artwork: '/assets/VRLogo.png',
  artworkFit: 'logo',
  meta: 'Project',
  metaLabel: 'Course project',
  plays: '+17% success',
  tags: ['C++', 'OpenGL', 'Unity', 'OpenHaptics', 'Phantom Omni', 'Blender'],
  summary:
    'A VR trainer for needle placement that varies haptic feedback per skin layer as the needle passes through it. Two feedback models were built and evaluated against each other — and the varied-feedback approach produced a 17% higher success rate than the alternative.',
  highlights: [
    'Layer-by-layer skin puncture simulation with force feedback tuned per tissue type.',
    'Delivered a 17% higher success rate through varying haptic feedback per skin layer.',
    'Built on a C++ and OpenGL core with Unity, OpenHaptics and a Phantom Omni device.',
  ],
  links: [
    {
      label: 'Source',
      href: 'https://github.com/19priyanka/VR-HaptoSkin-Pro-VR-LayerSense-',
      kind: 'code',
    },
  ],
};

const matchAid: Track = {
  slug: 'match-aid',
  title: 'MatchAid',
  subtitle: 'Volunteer matching platform · Web',
  artwork: '/assets/MatchAidLogo.png',
  artworkFit: 'logo',
  meta: 'Project',
  metaLabel: 'Course project',
  plays: 'Volunteer gap',
  tags: ['Web', 'Full Stack', 'Product Design', 'Figma'],
  summary:
    'Organizations need volunteers and volunteers want to help, and the two mostly fail to find each other. MatchAid centralizes opportunities by interest and location, and closes the loop with feedback and reporting so both sides stay accountable.',
  highlights: [
    'Opportunity discovery filtered by interest and location rather than an undifferentiated list.',
    'Two-way feedback and reporting to keep volunteers and organizations accountable.',
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
  artworkFit: 'logo',
  meta: 'Project',
  metaLabel: 'Course project',
  plays: 'CNN won',
  tags: ['Python', 'Machine Learning', 'CNN', 'SVM', 'Random Forest', 'Pandas'],
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

/* --- Experience ----------------------------------------------------------- */

const cnrl: Track = {
  slug: 'canadian-natural',
  title: 'Developer Analyst',
  subtitle: 'Canadian Natural Resources Limited · Calgary, AB',
  artwork: '/assets/Canadian_Natural_Logo.svg',
  artworkFit: 'logo',
  meta: '1 yr 9 mo',
  metaLabel: 'November 2024 — present',
  plays: 'Current role',
  year: 'Present',
  tags: ['Angular', 'Blazor', 'C#', 'VB.NET', 'SQL', 'PL/SQL', 'Legacy Modernization'],
  summary:
    'Re-architecting a large-scale, mission-critical application — the kind of work where the migration plan matters more than the framework choice, because the old system cannot go down while the new one comes up. A good deal of it sits where industrial field hardware meets the enterprise stack. Promoted from Full Stack Developer to Developer Analyst in January 2026.',
  highlights: [
    'Contributing to the re-architecture of a large-scale mission-critical application, improving scalability, performance and maintainability.',
    'Building full-stack solutions across Angular, Blazor, C#, VB.NET and SQL/PL/SQL in a complex enterprise environment.',
    'Integrating industrial hardware systems such as BSW cut analyzers with enterprise applications, ensuring field data flows accurately.',
    'Refactoring legacy modules to cut technical debt, introducing reusable patterns for long-term reliability.',
    'Partnering directly with field engineers so enhancements match how the work is actually done.',
    'Troubleshooting production issues with root-cause analysis across multiple system layers, delivering durable fixes.',
  ],
  links: [],
};

const newRelic: Track = {
  slug: 'new-relic',
  title: 'Full Stack Software Engineering Intern',
  subtitle: 'New Relic, Inc. · Distributed Tracing',
  artwork: '/assets/new_relic_logo.png',
  artworkFit: 'logo',
  meta: '2 yrs 5 mo',
  metaLabel: 'May 2021 — September 2023',
  plays: '4+ teams',
  tags: ['React', 'TypeScript', 'Java', 'Redux', 'NRQL', 'Distributed Tracing'],
  summary:
    'Built the Distributed Tracing Setup Wizard — the path that takes a customer from "tracing is misconfigured" to "tracing works" without a support ticket — plus ranking algorithms over performance signals and improvements to the internal configuration tooling other engineering teams depend on.',
  highlights: [
    'Delivered a Distributed Tracing Setup Wizard letting customers find instrumentation gaps and fix them through guided documentation.',
    'Designed an algorithm ranking monitored applications by performance signals.',
    'Built and optimized internal configuration tools, improving rate limit management and speeding up complex queries.',
    'Integrated tracing across services with 4+ product teams on 15+ projects.',
    'Partnered with Product Managers on customer engagement dashboards for data-driven evaluation of feature adoption.',
    'Diagnosed data correctness issues in query logic and ambiguous database schemas.',
  ],
  links: [],
};

const learningAssistant: Track = {
  slug: 'learning-assistant',
  title: 'Engineering Learning Assistant',
  subtitle: 'Engineering Academic Success Centre · University of Calgary',
  artwork: '/assets/schulich_logo.png',
  artworkFit: 'logo',
  meta: '4 yrs',
  metaLabel: 'May 2020 — April 2024',
  plays: '80+ mentored',
  tags: ['Mentorship', 'Data Structures', 'Operating Systems', 'Computer Networks', 'Teaching'],
  summary:
    'Four years supporting engineering students one-on-one and in groups — programming, data structures and algorithms, operating systems, computer networks and advanced engineering mathematics. Much of the job was picking up an unfamiliar language fast enough to be useful to whoever walked in.',
  highlights: [
    'Mentored and supported 80+ engineering students through one-on-one and group sessions.',
    'Tutored across programming, data structures and algorithms, operating systems, computer networks and engineering mathematics.',
    'Adapted quickly to unfamiliar languages and concepts to meet a wide range of student needs.',
  ],
  links: [],
};

const education: Track = {
  slug: 'schulich-engineering',
  title: 'B.Sc. Software Engineering, with Distinction',
  subtitle: 'Schulich School of Engineering, University of Calgary',
  artwork: '/assets/schulich_logo.png',
  artworkFit: 'logo',
  meta: '2019—2024',
  metaLabel: '2019 — 2024',
  plays: '3.95 / 4.00',
  tags: ['Software Engineering', 'Distinction', 'Design Fair Winner'],
  summary:
    'Software Engineering at Schulich, graduated with distinction on a 3.95/4.00 GPA, capped with a first-place finish at the Engineering Design Fair for the Calgary Co-Op handheld scanner rebuild.',
  highlights: [
    'B.Sc. in Software Engineering, awarded with distinction.',
    'Cumulative GPA of 3.95 out of 4.00.',
    'First place, Engineering Design Fair.',
  ],
  links: [],
};

/* --- Leadership ----------------------------------------------------------- */

const aasee: Track = {
  slug: 'aasee',
  title: 'Fundraising Assistant & Head of Media Relations',
  subtitle: 'AASEE — Advancement of Science and Engineering Education',
  meta: '3 yrs 4 mo',
  metaLabel: 'January 2020 — April 2023',
  plays: 'Two roles',
  tags: ['Fundraising', 'Grant Writing', 'Media Relations', 'Content Strategy'],
  summary:
    'Two overlapping roles at AASEE: raising money and running the public face of the organization. Grant applications and donor relationships on one side, the website and social presence on the other.',
  highlights: [
    'Built relationships with institutional donors and prepared grant applications and donor presentations.',
    'Managed donor communications, reporting and record-keeping supporting tax reporting and transparency.',
    'Led the organization\'s media and digital presence as Head of Media Relations, January 2020 to April 2022.',
    'Developed content strategies to grow engagement, and oversaw website content and accuracy.',
  ],
  links: [],
};

const mentorshipProgram: Track = {
  slug: 'schulich-mentorship',
  title: 'Schulich Student Mentorship Program',
  subtitle: 'Mentor · University of Calgary',
  artwork: '/assets/schulich_logo.png',
  artworkFit: 'logo',
  meta: 'Ongoing',
  metaLabel: 'Ongoing',
  plays: 'Incoming students',
  year: 'Ongoing',
  tags: ['Mentorship', 'Engineering', 'Community'],
  summary:
    'Guiding incoming engineering undergrads through the part nobody writes down — course selection, internship hunting, and the general question of whether feeling lost in first year is normal. It is.',
  highlights: [
    'Active mentor to incoming Schulich engineering undergraduates.',
    'Focus on course planning, internship search and navigating first-year engineering.',
  ],
  links: [],
};

const unitedWay: Track = {
  slug: 'cnqbay-united-way',
  title: 'CNQBay Charity Auction',
  subtitle: 'Head Chair · United Way campaign',
  meta: 'Annual',
  metaLabel: 'Annual campaign',
  plays: 'Head Chair',
  tags: ['Leadership', 'Fundraising', 'Event Ops'],
  summary:
    'Head Chair of the annual CNQBay online charity auction supporting United Way — running the campaign end to end, from donation sourcing through the auction platform itself and the people operating it.',
  highlights: [
    'Head Chair of the annual online charity auction in support of United Way.',
    'Ownership of the full campaign: sourcing, platform, promotion and operations.',
    'Led the volunteer team running the event.',
  ],
  links: [],
};

const residence: Track = {
  slug: 'residence-association',
  title: 'Student Representative of Residence',
  subtitle: 'Residence Student Association · University of Calgary',
  meta: '8 months',
  metaLabel: 'September 2019 — April 2020',
  plays: '$1,200 budget',
  tags: ['Leadership', 'Event Planning', 'Advocacy'],
  summary:
    'Liaison between residents and leadership in first year — running monthly community events on a small budget and carrying student concerns upward where they could actually be acted on.',
  highlights: [
    'Represented and advocated for student needs as liaison between residents and leadership.',
    'Planned and ran monthly community events to build engagement.',
    'Managed a $1,200 budget across events and initiatives.',
  ],
  links: [],
};

/* --- Community ------------------------------------------------------------ */

const cagis: Track = {
  slug: 'cagis',
  title: 'CAGIS — STEM Expert Volunteer',
  subtitle: 'Canadian Association for Girls in Science',
  artwork: '/assets/CAGISLogo.png',
  artworkFit: 'logo',
  meta: 'Ongoing',
  metaLabel: 'Ongoing',
  plays: 'Ages 7–17',
  year: 'Ongoing',
  tags: ['STEM Outreach', 'Youth', 'Workshop Design', 'Volunteering'],
  summary:
    "CAGIS is Canada's largest and longest-running STEM club for girls and gender-diverse youth aged 7 to 17, running since 1992. I design and deliver the software sessions — turning things like algorithms and debugging into activities a nine-year-old will actually want to finish.",
  highlights: [
    'Design and deliver interactive events explaining software concepts to youth aged 7–17.',
    'Build age-appropriate presentations and hands-on activities from scratch.',
    "Support CAGIS's equity, diversity, inclusion and accessibility mandate in how sessions are run.",
  ],
  links: [{ label: 'About CAGIS', href: 'https://cagis.ca/', kind: 'site' }],
};

/* --- Off the clock -------------------------------------------------------- */

const volleyball: Track = {
  slug: 'volleyball',
  title: 'Volleyball',
  subtitle: 'Corporate Challenge team · Canadian Natural',
  meta: 'Seasonal',
  metaLabel: 'Corporate Challenge',
  plays: 'Team sport',
  tags: ['Volleyball', 'Team Sport', 'Corporate Challenge'],
  summary:
    'On the Canadian Natural Corporate Challenge volleyball team. The best part of a workplace league is that it puts you on a court with people you would otherwise only ever meet in a ticket queue.',
  highlights: [
    'Member of the Corporate Challenge volleyball team.',
    'Plays regularly outside of the competition season too.',
  ],
  links: [],
};

const badminton: Track = {
  slug: 'badminton',
  title: 'Badminton',
  subtitle: 'Long-running habit',
  meta: 'Ongoing',
  metaLabel: 'Ongoing',
  plays: 'Racquet sport',
  tags: ['Badminton', 'Racquet Sport'],
  summary:
    'The other racquet in the bag. Faster than it looks, and a genuinely good way to stop thinking about a bug for ninety minutes.',
  highlights: ['Plays regularly.'],
  links: [],
};

const corporateChallenge: Track = {
  slug: 'corporate-challenge',
  title: 'Corporate Challenge',
  subtitle: 'Canadian Natural · multiple events',
  meta: 'Annual',
  metaLabel: 'Annual company competition',
  plays: 'Multi-event',
  tags: ['Corporate Challenge', 'Team Events', 'Community'],
  summary:
    'Canadian Natural runs a company-wide Corporate Challenge across a spread of events, and I sign up for as many as will have me — volleyball on the team side, plus the Cardiac Arrest Challenge and others across the season.',
  highlights: [
    'Competed across multiple Corporate Challenge events.',
    'Member of the volleyball team.',
    'Took part in the Cardiac Arrest Challenge.',
  ],
  links: [],
};

const cardiacArrest: Track = {
  slug: 'cardiac-arrest-challenge',
  title: 'Cardiac Arrest Challenge',
  subtitle: 'Corporate Challenge event · CPR and emergency response',
  meta: 'Event',
  metaLabel: 'Corporate Challenge event',
  plays: 'First aid certified',
  tags: ['CPR', 'First Aid', 'Emergency Response', 'Corporate Challenge'],
  summary:
    'A Corporate Challenge event built around cardiac arrest response — the practical side of the Level C CPR and Intermediate First Aid certification, under time pressure and in front of judges.',
  highlights: [
    'Competed in the Corporate Challenge Cardiac Arrest Challenge.',
    'Holds Intermediate First Aid with Level C CPR certification.',
  ],
  links: [],
};

/* --- Currently learning --------------------------------------------------- */

const learningAi: Track = {
  slug: 'learning-ai-tooling',
  title: 'AI-Assisted Engineering',
  subtitle: 'Claude, agentic tooling, and where it actually helps',
  meta: 'In progress',
  metaLabel: 'Currently learning',
  plays: 'Now playing',
  year: '2026',
  tags: ['AI', 'Claude', 'Developer Tooling', 'Agents'],
  summary:
    'Working through what AI tooling is genuinely good at in a production codebase and where it quietly is not — building with Claude, exploring agentic workflows, and forming opinions from use rather than from posts about it. This portfolio was built that way.',
  highlights: [
    'Building with Claude and agentic developer tooling.',
    'Evaluating where AI assistance holds up against real production constraints, and where it does not.',
  ],
  links: [],
};

/* --- Playlists ------------------------------------------------------------ */

export const playlists: Playlist[] = [
  {
    slug: 'featured',
    title: 'Featured Release',
    description:
      "The capstone. An offline-first rebuild of Calgary Co-Op's handheld scanner application, and first place at the Engineering Design Fair.",
    kind: 'album',
    blurb: 'Capstone · First place',
    cover: '/assets/capstone-preview.png',
    coverFit: 'cover',
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
    blurb: '6 builds · mobile, VR, ML, web',
    gradient: 'from-cyan-600 via-sky-900 to-elevated',
    accent: '#0e7490',
    tracks: [capstone, getHomeSafe, brainyBees, vrLayerSense, matchAid, mnist],
  },
  {
    slug: 'experience',
    title: 'On Repeat: 9-to-5',
    description:
      'Where the hours actually go. Enterprise re-architecture, observability tooling, four years of tutoring, and the degree that started it.',
    kind: 'album',
    blurb: 'Roles and education',
    gradient: 'from-amber-500 via-orange-900 to-elevated',
    accent: '#b45309',
    tracks: [cnrl, newRelic, learningAssistant, education],
  },
  {
    slug: 'mentorship',
    title: 'Paying It Forward',
    description:
      'Leadership and mentorship — the long-running series. Eighty-plus engineering students, a charity auction, and a stint running an organization\'s public face.',
    kind: 'podcast',
    blurb: 'Leadership · 80+ students',
    gradient: 'from-violet-600 via-purple-900 to-elevated',
    accent: '#6d28d9',
    tracks: [mentorshipProgram, learningAssistant, unitedWay, aasee, residence],
  },
  {
    slug: 'community',
    title: 'Community Sessions',
    description:
      'Volunteering and STEM outreach. Making software legible to people who have not been told it is for them.',
    kind: 'playlist',
    blurb: 'STEM outreach',
    gradient: 'from-rose-500 via-rose-900 to-elevated',
    accent: '#be123c',
    tracks: [cagis],
  },
  {
    slug: 'off-the-clock',
    title: 'Off the Clock',
    description:
      'Sport, competition and the things that have nothing to do with a keyboard. Volleyball, badminton, and whatever Corporate Challenge is running this year.',
    kind: 'playlist',
    blurb: 'Sport and competition',
    gradient: 'from-lime-500 via-green-900 to-elevated',
    accent: '#4d7c0f',
    tracks: [volleyball, badminton, corporateChallenge, cardiacArrest],
  },
  {
    slug: 'learning',
    title: 'Currently Learning',
    description:
      'The in-progress shelf. What I am reading, building and forming opinions about right now.',
    kind: 'playlist',
    blurb: 'In progress',
    gradient: 'from-fuchsia-500 via-indigo-900 to-elevated',
    accent: '#7e22ce',
    tracks: [learningAi],
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

export function trackCount(tracks: Track[]): string {
  return `${tracks.length} ${tracks.length === 1 ? 'track' : 'tracks'}`;
}
