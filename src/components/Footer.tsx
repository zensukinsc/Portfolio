import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="snap-none border-t border-white/10 bg-[#0a0a0a] px-6 py-10 text-center md:py-12">
      <nav
        className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/55"
        aria-label="Footer"
      >
        {FOOTER_LINKS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-2 py-2 text-white/55 transition-colors hover:text-white"
          >
            {label}
          </Link>
        ))}
      </nav>
      <p className="font-serif text-xs italic text-white/40">
        Copyright @{currentYear} Designed by Ngawang Samten Chophel
      </p>
    </footer>
  );
}
