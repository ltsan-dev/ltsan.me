import { Card } from './definitions';

import colors from './ccolors';

const cards: Card[] = [
  {
    id: '1',
    type: 'Full-stack',
    rarity: 1,
    colors: [colors.fs],
    name: 'DubCards',
    desc: 'DubCards is a University of Washington-themed trading card game where users can buy, sell, favorite, and trade digital cards with friends.',
    mainTech: ['Express', 'MongoDB',  'Azure', 'Node.js', 'JavaScript'],
    sideTech: ['Mongoose', 'HTML', 'CSS'],
    link: 'https://dubcards.onrender.com', 
    dates: {
      start: new Date('2025-12-30'),
      end: new Date('2026-6-23'),
    },
  },
  {
    id: '2',
    type: 'Data-viz',
    rarity: 2,
    colors: [colors.dv],
    name: "NBA's Intl. Players",
    desc: 'An interactive data visualization that allows users to explore statistical trends and insights regarding international players in the NBA.',
    mainTech: ['P5.js', 'JavaScript'],
    sideTech: ['HTML', 'CSS'],
    link: 'https://ltsan-dev.github.io/NBA-Data-Visualization/',
    dates: {
      start: new Date('2025-09-02'),
      end: new Date('2025-12-01'),
    },
  },
  {
    id: '3',
    type: 'UI/UX',
    rarity: 2,
    colors: [colors.ui],
    name: 'UW MyCareer',
    desc: 'A mobile app prototype designed to help University of Washington students easily navigate and explore their potential career paths.',
    mainTech: ['Figma'],
    sideTech: [],
    link: 'https://figma.com/proto/8B0SUiATbq15taR0tzoWoL/Career-Path-App',
    dates: {
      start: new Date('2025-04-01'),
      end: new Date('2025-06-02'),
    },
  },
  {
    id: '4',
    type: 'Front-end',
    rarity: 2,
    colors: [colors.fe],
    name: 'Blitz Fantasy',
    desc: 'A web application that provides a complete fantasy football experience, serving up live NFL metrics and real-time league data for users.',
    mainTech: ['React', 'Firebase', 'HTML', 'JavaScript', 'CSS'],
    sideTech: ['Git'],
    link: 'https://blitz-fantasy.web.app/',
    dates: {
      start: new Date('2025-04-01'),
      end: new Date('2025-06-02'),
    },
  },
  {
    id: '5',
    type: 'Full-stack',
    rarity: 1,
    colors: [colors.fs],
    name: 'BALLER//BROWSER',
    desc: 'A fantasy basketball marketplace and lineup builder where users can browse, search, and purchase NBA players to assemble custom rosters.',
    mainTech: ['Express', 'SQL', 'R', 'JavaScript', 'Node.js'],
    sideTech: ['HTML', 'CSS'],
    link: 'https://baller-browser.onrender.com/', 
    dates: {
      start: new Date('2024-04-01'),
      end: new Date('2024-06-02'),
    },
  },
  {
    id: '6',
    type: 'Full-stack',
    rarity: 3,
    colors: [colors.fs],
    name: "LeBron's Legacy",
    desc: "A browser-based game where you step into the role of LeBron James to save humanity from alien forces, taking crucial shots from anywhere on the court using his real-world shooting statistics.",
    mainTech: ['Node.js', 'Express', 'JavaScript'],
    sideTech: ['HTML', 'CSS'],
    link: 'https://lebrons-legacy.onrender.com/',
    dates: {
      start: new Date('2024-04-01'),
      end: new Date('2024-05-01'),
    },
  }
];

export default cards;