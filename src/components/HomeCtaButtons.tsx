import { Link } from 'react-router-dom';

const primaryClass =
  'inline-flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-full bg-white px-6 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.16em] text-black shadow-[0_10px_40px_-14px_rgba(255,255,255,0.45)] transition hover:bg-amber-100 hover:shadow-[0_14px_44px_-12px_rgba(255,255,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:w-auto sm:min-w-[200px] sm:px-8';

const secondaryClass =
  'inline-flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-full border-2 border-white bg-transparent px-6 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-amber-200 hover:bg-white/[0.08] hover:text-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:w-auto sm:min-w-[200px] sm:px-8';

type HomeCtaButtonsProps = {
  className?: string;
  /** Called after navigation (e.g. close mobile menu). */
  onNavigate?: () => void;
};

export function HomeCtaButtons({ className = '', onNavigate }: HomeCtaButtonsProps) {
  return (
    <div
      className={`flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center ${className}`.trim()}
    >
      <Link to="/projects" className={primaryClass} onClick={onNavigate}>
        View projects
      </Link>
      <Link to="/contact" className={secondaryClass} onClick={onNavigate}>
        Contact me
      </Link>
    </div>
  );
}
