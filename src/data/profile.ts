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
  bio: "I'm a Developer Analyst focused on how systems behave in real-world conditions, and on improving them thoughtfully. My work spans modern platforms and legacy systems, where patience, context and sound judgment matter as much as technical skill. I own work end to end — navigating ambiguity, evaluating edge cases, and making pragmatic decisions that hold up in production. I'm intentional about how changes get made, practical about timelines, and accountable for testing, deployment and follow-through. I work best where ideas are challenged respectfully and improved collaboratively.",
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
  certifications: ['H2S Alive', 'Intermediate First Aid — Level C CPR', 'SCBA', 'Rescue Drag'],

  employers: [
    { name: 'Canadian Natural Resources', logo: '/assets/Canadian_Natural_Logo.svg', height: 'h-12' },
    { name: 'New Relic', logo: '/assets/new_relic_logo.png', height: 'h-9' },
    { name: 'Schulich School of Engineering', logo: '/assets/schulich_logo.png', height: 'h-14' },
  ],
};
