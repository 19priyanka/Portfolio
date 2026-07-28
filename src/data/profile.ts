import type { Profile } from '../types';

/* ---------------------------------------------------------------------------
   Source of truth: the LinkedIn profile export (July 2026). The résumé PDF in
   public/docs is older and does not include Canadian Natural at all — it is
   offered as a download but nothing on this site is derived from it except the
   skills list below.

   TODO: replace public/docs/PriyankaGautam_SoftwareResume.pdf when an updated
   résumé exists, so the download matches what the site says.
   --------------------------------------------------------------------------- */

export const profile: Profile = {
  name: 'Priyanka Gautam',
  title: 'Developer Analyst @ Canadian Natural Resources',
  location: 'Calgary, Alberta',
  avatar: '/assets/IMG_5017.jpeg',
  tagline: 'Engineer by trade. Problem-solver by habit.',
  bio: "I build software for places the network doesn't always reach. Offline-first mobile apps, industrial hardware wired into enterprise stacks, and legacy systems dragged forward without taking the business down with them. I like the problems that don't have a library for them yet.",
  musicNote:
    "Also, I love music. Not casually. It's the thing running underneath everything else, the reason a commute is bearable and the reason I get anything finished. So when it came time to build this, a record collection was the only shape that felt honest. Everything here is laid out the way I actually think about it: things worth putting on repeat, things I'm still working through, and a few tracks I'm quietly proud of.",
  stats: [
    { label: 'Building since', value: '2020' },
    { label: 'Students mentored', value: '80+' },
    { label: 'Engineering Design Fair', value: '1st place' },
    { label: 'Degree GPA', value: '3.95' },
  ],
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/priyanka-gautam-21b4271b3/',
      icon: 'linkedin',
    },
    { label: 'GitHub', href: 'https://github.com/19priyanka', icon: 'github' },
    { label: 'Email', href: 'mailto:pgautam.dev19@gmail.com', icon: 'mail' },
  ],
  resumePdf: '/docs/PriyankaGautam_SoftwareResume.pdf',

  education: {
    school: 'Schulich School of Engineering, University of Calgary',
    degree: 'B.Sc. Software Engineering, with Distinction',
    years: '2019 to 2024',
    gpa: '3.95 / 4.00',
    logo: '/assets/schulich_logo.png',
    honours: ['Graduated with distinction', 'First place, Engineering Design Fair'],
  },

  skills: [
    {
      label: 'Languages',
      items: ['C', 'C++', 'C#', 'Java', 'Python', 'JavaScript', 'TypeScript', 'VB.NET', 'SQL', 'PL/SQL', 'NRQL', 'HTML', 'CSS', 'SASS'],
    },
    {
      label: 'Frontend',
      items: ['React', 'React Native', 'Angular', 'Blazor', 'Next.js', 'Redux'],
    },
    {
      label: 'Backend & data',
      items: ['Django', 'Node.js', 'Express', 'MongoDB', 'Pandas', 'Distributed Systems'],
    },
    {
      label: 'Graphics & hardware',
      items: ['OpenGL', 'Unity', 'OpenHaptics', 'Phantom Omni', 'Blender', 'Embedded System Interfacing'],
    },
    {
      label: 'Tooling & practice',
      items: ['Git', 'Docker', 'DevOps', 'TDD', 'Jest', 'Enzyme', 'Agile', 'Scrum', 'Figma', 'Android Studio', 'iOS Development', 'System Architecture & Design', 'Linux', 'Windows'],
    },
  ],
  languages: ['English (native)', 'Hindi (native)', 'French (working)'],
  certifications: ['H2S Alive', 'Intermediate First Aid, Level C CPR', 'SCBA', 'Rescue Drag'],

  employers: [
    { name: 'Canadian Natural Resources', logo: '/assets/Canadian_Natural_Logo.svg', height: 'h-12' },
    { name: 'New Relic', logo: '/assets/new_relic_logo.png', height: 'h-9' },
    { name: 'Schulich School of Engineering', logo: '/assets/schulich_logo.png', height: 'h-14' },
  ],
};
