import { useEffect, useId, useState, type RefObject } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MessageCircle, X } from 'lucide-react';

const NAV_LINKS = [
  { num: '01', label: 'Home', to: '/' },
  { num: '02', label: 'About', to: '/about' },
  { num: '03', label: 'Projects', to: '/projects' },
  { num: '04', label: 'Resume', href: '/resume.pdf', download: true },
  { num: '05', label: 'Contact', to: '/contact' },
] as const;

const panelTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.07,
    },
  },
};

const listVariantsReduced = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0, staggerChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const itemVariantsReduced = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

type NavbarProps = {
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** Solid black bar (e.g. projects index) — reference layout */
  solidHeader?: boolean;
};

export function Navbar({ scrollContainerRef, solidHeader }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandOpacity, setBrandOpacity] = useState(solidHeader ? 1 : 0);
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  useEffect(() => {
    const el = scrollContainerRef?.current;
    if (!menuOpen || !el) return;
    const previous = el.style.overflow;
    el.style.overflow = 'hidden';
    return () => {
      el.style.overflow = previous;
    };
  }, [menuOpen, scrollContainerRef]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (solidHeader || !isHomePage) {
      setBrandOpacity(1);
      return;
    }

    const scrollEl = scrollContainerRef?.current;
    if (!scrollEl) {
      setBrandOpacity(0);
      return;
    }

    const updateBrandOpacity = () => {
      const fadeStart = Math.max(120, Math.round(scrollEl.clientHeight * 0.58));
      const fadeEnd = Math.max(fadeStart + 1, Math.round(scrollEl.clientHeight * 0.9));
      const progress = (scrollEl.scrollTop - fadeStart) / (fadeEnd - fadeStart);
      const clamped = Math.max(0, Math.min(1, progress));
      setBrandOpacity(clamped);
    };

    updateBrandOpacity();
    scrollEl.addEventListener('scroll', updateBrandOpacity, { passive: true });
    window.addEventListener('resize', updateBrandOpacity);

    return () => {
      scrollEl.removeEventListener('scroll', updateBrandOpacity);
      window.removeEventListener('resize', updateBrandOpacity);
    };
  }, [isHomePage, scrollContainerRef, solidHeader]);

  const panelMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { y: '-100%' },
        animate: { y: 0 },
        exit: { y: '-100%' },
        transition: panelTransition,
      };

  const listMotionVariants = reduceMotion ? listVariantsReduced : listVariants;
  const itemMotionVariants = reduceMotion ? itemVariantsReduced : itemVariants;
  const brandVisible = !isHomePage || brandOpacity >= 0.02;
  const handleBrandClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    closeMenuAfter = false
  ) => {
    if (closeMenuAfter) setMenuOpen(false);

    const target = scrollContainerRef?.current;
    const currentTop = target ? target.scrollTop : window.scrollY;
    const isAtTop = currentTop <= 8;

    // If not at top, keep user on current page and scroll to top.
    if (!isAtTop) {
      e.preventDefault();
      if (target) {
        target.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={
          solidHeader
            ? 'fixed top-0 left-0 right-0 z-50 bg-black'
            : 'fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md'
        }
      >
        <div className="flex h-24 items-center px-6 md:h-28 md:px-12">
          <div className="flex flex-1">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-black md:gap-2.5 md:px-5 md:py-2.5 md:text-[11px]"
            >
              {"LET'S TALK"}
              <MessageCircle
                className="h-3.5 w-3.5 shrink-0 opacity-95 group-hover:opacity-100 md:h-4 md:w-4"
                strokeWidth={1.75}
                aria-hidden
              />
            </Link>
          </div>

          <div className="flex flex-none justify-center">
            <Link
              to="/"
              onClick={(e) => handleBrandClick(e)}
              aria-hidden={!brandVisible}
              className="font-serif text-xl font-bold tracking-wide text-white md:text-2xl lg:text-3xl"
              style={{
                opacity: !isHomePage ? 1 : brandOpacity,
                pointerEvents: !isHomePage || brandOpacity > 0.95 ? 'auto' : 'none',
              }}
            >
              Zensuki
            </Link>
          </div>

          <div className="flex flex-1 justify-end">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
              className="inline-flex h-12 w-12 items-center justify-center text-white transition-colors hover:text-white/90 md:h-14 md:w-14"
            >
              <Menu className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[100] flex flex-col bg-white text-black"
            {...panelMotion}
          >
            <div className="flex h-24 shrink-0 items-center px-6 md:h-28 md:px-12">
              <div className="flex flex-1">
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="group inline-flex items-center gap-2 rounded-full border border-black px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-white md:gap-2.5 md:px-5 md:py-2.5 md:text-[11px]"
                >
                  {"LET'S TALK"}
                  <MessageCircle
                    className="h-3.5 w-3.5 shrink-0 group-hover:text-white md:h-4 md:w-4"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </div>

              <div className="flex flex-none justify-center">
                <Link
                  to="/"
                  onClick={(e) => handleBrandClick(e, true)}
                  className="font-serif text-xl font-bold tracking-wide md:text-2xl lg:text-3xl"
                >
                  Zensuki
                </Link>
              </div>

              <div className="flex flex-1 justify-end">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-12 w-12 items-center justify-center text-black/90 transition-colors hover:text-black md:h-14 md:w-14"
                >
                  <X className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            <nav
              className="flex min-h-0 flex-1 flex-col justify-center px-6 pb-16 pl-10 md:px-12 md:pb-20 md:pl-16 lg:pl-24"
              aria-label="Primary"
            >
              <motion.ul
                className="flex flex-col gap-10 md:gap-12 lg:gap-14"
                variants={listMotionVariants}
                initial="hidden"
                animate="visible"
              >
                {NAV_LINKS.map((item) => (
                  <motion.li key={item.label} variants={itemMotionVariants}>
                    {'href' in item ? (
                      <a
                        href={item.href}
                        download
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline gap-4 md:gap-6"
                      >
                        <span className="font-sans text-xs font-semibold tabular-nums text-black/45 md:text-sm">
                          {item.num}
                        </span>
                        <span className="font-serif text-4xl font-bold uppercase leading-none tracking-tight text-black md:text-6xl lg:text-7xl">
                          {item.label}
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline gap-4 md:gap-6"
                      >
                        <span className="font-sans text-xs font-semibold tabular-nums text-black/45 md:text-sm">
                          {item.num}
                        </span>
                        <span className="font-serif text-4xl font-bold uppercase leading-none tracking-tight text-black md:text-6xl lg:text-7xl">
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
