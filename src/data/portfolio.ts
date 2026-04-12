export type ProjectFilter =
  | 'all'
  | 'webdev'
  | 'graphic'
  | 'video';

export type PortfolioPageProject = {
  id: string;
  num: string;
  title: string;
  subtitle?: string;
  categories: Exclude<ProjectFilter, 'all'>[];
};

export const PROJECT_FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'webdev', label: 'Website Design' },
  { id: 'graphic', label: 'Graphic Design' },
  { id: 'video', label: 'Cinematography' },
];

export const PORTFOLIO_PAGE_PROJECTS: PortfolioPageProject[] = [
  {
    id: 'namas',
    num: '01',
    title: 'Namas Design and Build',
    categories: ['webdev'],
  },
  {
    id: 'insta-kill',
    num: '02',
    title: 'Insta Kill',
    categories: ['graphic'],
  },
  {
    id: 'game-over',
    num: '03',
    title: 'Game Over: The Silent Struggle of Gaming Addiction',
    categories: ['video'],
  },
];

export type FeaturedShowcaseProject = {
  title: string;
  subtitle: string;
  image: string | null;
  role: string;
  accent: string;
  /** Case-study route when the card should navigate on click */
  href?: string;
};

/** Sticky scroll section on the home page — same three works as the projects index. */
export const featuredShowcaseProjects: FeaturedShowcaseProject[] = [
  {
    title: 'Namas Design and Build',
    subtitle: 'Website redesign',
    image: '/case-studies/namas/namas-architecture-hero-screen.png',
    role: 'Web Designer',
    accent: 'from-amber-800/80 to-stone-900',
    href: '/projects/namas-design-build',
  },
  {
    title: 'INSTA KILL',
    subtitle: 'Esports Branding & Jersey Design',
    /** First gallery slide — same asset as `GALLERY_SLIDES[0]` in `case-studies/insta-kill/Gallery.tsx`. */
    image: '/case-studies/insta-kill/insta-kill-gallery-jersey.png',
    role: 'Brand Designer',
    accent: 'from-indigo-700/90 to-black',
    href: '/projects/insta-kill',
  },
  {
    title: 'GAME OVER',
    subtitle: 'The Silent Struggle of Gaming Addiction',
    image: '/case-studies/game-over/game-over-key-art.png',
    role: 'Director & Editor',
    accent: 'from-sky-600/90 to-slate-900',
    href: '/projects/game-over',
  },
];
