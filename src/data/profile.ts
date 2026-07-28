import type { Profile } from '../types';

export const profile: Profile = {
  name: 'Priyanka Gautam',
  title: 'Developer Analyst @ Canadian Natural Resources',
  location: 'Calgary, Alberta',
  avatar: '/assets/IMG_5017.jpeg',
  tagline: 'Software engineer. Systems modernizer. Serial mentor.',
  bio: "I build software for places the network doesn't always reach — offline-first mobile apps, industrial hardware wired into enterprise stacks, and legacy systems dragged forward without taking the business down with them. I like the problems that don't have a library for them yet.",
  stats: [
    { label: 'Students mentored', value: '80+' },
    { label: 'Engineering Design Fair', value: '1st place' },
    { label: 'Shipped builds', value: '6' },
    { label: 'Based in', value: 'Calgary' },
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
  employers: [
    { name: 'Canadian Natural Resources', logo: '/assets/Canadian_Natural_Logo.svg', height: 'h-12' },
    { name: 'New Relic', logo: '/assets/new_relic_logo.png', height: 'h-9' },
    { name: 'Schulich School of Engineering', logo: '/assets/schulich_logo.png', height: 'h-14' },
  ],
};
