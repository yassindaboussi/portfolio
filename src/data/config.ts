// ============================================================
//  SITE CONFIGURATION — Edit this file to update your info
// ============================================================

export const SITE = {
  name: 'Yassin Daboussi',
  title: 'Yassin Daboussi — Portfolio',
  description: 'Portfolio Full-Stack Developer',
  tagline: 'Ingénieur Full-Stack • One-man army',
  bio1: 'Ingénieur Full-Stack passionné, je construis des applications robustes et scalables de A à Z, en web, backend et mobile.',
  bio2: "J'adopte une approche « one-man army » : ma passion me pousse à aller au-delà du code, avec le souci du détail et d'une vraie expérience utilisateur.",
  stats: [
    { value: '2+', label: "Ans d'expérience" },
    { value: '30+', label: 'Projets livrés' },
    { value: '100%', label: 'Autonome' },
  ],
  contact: {
    email: 'yassin.daboussi@esprit.tn',
    phone: '+216 29 670 343',
    cal: 'https://cal.com/yassin-daboussi',
    linkedin: 'https://linkedin.com/in/yassindaboussi',
    github: 'https://github.com/yassindaboussi',
  },
  cv: '/data/CV_Daboussi_Yassin.pdf',
  ogImage: '/og-image.jpg',
  url: 'https://yassindaboussi.netlify.app',
  analytics: {
    umamiSrc: 'https://cloud.umami.is/script.js',
    umamiId: '01c6be30-6922-4c07-8d87-64236b89cfa9',
  },
};

// Tech stack shown in the Skills section
export const SKILLS = [
  { name: 'Kotlin',     icon: 'kotlin' },
  { name: 'Node.js',   icon: 'nodejs' },
  { name: 'Next.js',   icon: 'nextjs' },
  { name: 'React',     icon: 'react' },
  { name: 'Flutter',   icon: 'flutter' },
  { name: 'MongoDB',   icon: 'mongodb' },
  { name: 'MySQL',     icon: 'mysql' },

  { name: 'AWS',       icon: 'aws' },
  { name: 'Git',       icon: 'git' },
];

// Nav sections
export const NAV_ITEMS = [
  { id: 'home',     label: 'Accueil' },
  { id: 'profile',  label: 'Profil' },
  { id: 'skills',   label: 'Compétences' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact',  label: 'Contact' },
];
