import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import {
  PROJECT_FILTERS,
  PORTFOLIO_PAGE_PROJECTS,
  type ProjectFilter,
} from '../data/portfolio';

const pageEase = [0.22, 1, 0.36, 1] as const;

export function ProjectsPage() {
  const mainRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  useEffect(() => {
    setHoveredProjectId(null);
  }, [filter]);

  const visible = useMemo(
    () =>
      PORTFOLIO_PAGE_PROJECTS.filter(
        (p) =>
          filter === 'all' ||
          p.categories.includes(filter as Exclude<ProjectFilter, 'all'>)
      ),
    [filter]
  );

  const filterContainerVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.06,
          delayChildren: reduceMotion ? 0 : 0.08,
        },
      },
    }),
    [reduceMotion]
  );

  const filterItemVariants = useMemo(
    () => ({
      hidden: reduceMotion
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 14 },
      visible: {
        opacity: 1,
        y: 0,
        transition: reduceMotion
          ? { duration: 0 }
          : { duration: 0.45, ease: pageEase },
      },
    }),
    [reduceMotion]
  );

  /** Stagger when each row’s animation sequence begins */
  const listContainerVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.16,
          delayChildren: reduceMotion ? 0 : 0.04,
        },
      },
    }),
    [reduceMotion]
  );

  /** Within each row: index number first, then title after a pause */
  const projectRowVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.42,
          delayChildren: 0,
        },
      },
    }),
    [reduceMotion]
  );

  const projectNumVariants = useMemo(
    () => ({
      hidden: reduceMotion
        ? { opacity: 1, x: 0 }
        : { opacity: 0, x: -20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: reduceMotion
          ? { duration: 0 }
          : { duration: 0.55, ease: pageEase },
      },
    }),
    [reduceMotion]
  );

  const projectTitleVariants = useMemo(
    () => ({
      hidden: reduceMotion
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 0, y: 32, filter: 'blur(12px)' },
      visible: reduceMotion
        ? {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0 },
          }
        : {
            opacity: 0.5,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.95, ease: pageEase },
          },
      highlight: {
        opacity: 1,
        transition: reduceMotion
          ? { duration: 0 }
          : { duration: 0.28, ease: pageEase },
      },
    }),
    [reduceMotion]
  );

  const emptyStateVariants = useMemo(
    () => ({
      hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: reduceMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: pageEase },
      },
    }),
    [reduceMotion]
  );

  const rowHover = reduceMotion
    ? undefined
    : { x: 6, transition: { duration: 0.28, ease: pageEase } };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      <Navbar scrollContainerRef={mainRef} solidHeader />
      <main
        ref={mainRef}
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden scroll-pt-24 bg-black text-white md:scroll-pt-28"
        tabIndex={-1}
      >
        <motion.div
          className="w-full text-white"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: pageEase, delay: 0.04 }
          }
        >
          <nav
            className="px-6 pt-10 pb-0 md:px-12 md:pt-12"
            aria-label="Filter projects by category"
          >
            <motion.div
              className="w-full max-w-5xl"
              role="tablist"
              variants={filterContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-wrap items-end gap-x-8 gap-y-4 md:gap-x-10 lg:gap-x-12">
                {PROJECT_FILTERS.map(({ id, label }) => {
                  const active = filter === id;
                  return (
                    <motion.button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      variants={filterItemVariants}
                      onClick={() => setFilter(id)}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -2, transition: { duration: 0.2 } }
                      }
                      whileTap={
                        reduceMotion ? undefined : { scale: 0.98 }
                      }
                      className={`font-serif text-[0.95rem] font-normal tracking-tight transition-colors sm:text-base md:text-lg ${
                        active
                          ? 'border-b-[3px] border-white pb-3 text-white md:border-b-4 md:pb-3.5'
                          : 'border-b-[3px] border-transparent pb-3 text-white/55 hover:text-white/85 md:border-b-4 md:pb-3.5'
                      }`}
                    >
                      {label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </nav>

          <div className="w-full px-6 pb-28 pt-14 pr-6 pl-6 md:px-12 md:pb-36 md:pt-16 md:pl-12 md:pr-12 lg:pl-16">
            <motion.ul
              key={filter}
              className="flex max-w-5xl flex-col gap-14 md:gap-[4.5rem] lg:gap-24"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {visible.length === 0 ? (
                <motion.li
                  className="font-serif text-lg font-normal text-white/45 md:text-xl"
                  variants={emptyStateVariants}
                >
                  No projects in this category yet.
                </motion.li>
              ) : null}
              {visible.map((project) => {
                const row = (
                  <div
                    className={`flex items-start gap-3 sm:gap-4 md:gap-5 ${
                      project.id === 'namas' ||
                      project.id === 'insta-kill' ||
                      project.id === 'game-over'
                        ? 'cursor-pointer'
                        : 'cursor-default'
                    }`}
                  >
                    <motion.span
                      className="shrink-0 pt-[0.35em] font-sans text-xs font-medium tabular-nums tracking-wide text-white md:pt-[0.4em] md:text-sm"
                      variants={projectNumVariants}
                      aria-hidden
                    >
                      {project.num}
                    </motion.span>
                    <motion.div
                      className="min-w-0 flex-1"
                      variants={projectTitleVariants}
                      animate={
                        reduceMotion
                          ? undefined
                          : hoveredProjectId === project.id
                            ? 'highlight'
                            : 'visible'
                      }
                    >
                      <p className="font-serif text-[clamp(1.85rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white md:text-[clamp(2.5rem,4.5vw,3.85rem)] lg:text-[4rem]">
                        {project.subtitle ? (
                          <>
                            <span className="block">{project.title}</span>
                            <span className="mt-1 block md:mt-1.5">
                              {project.subtitle}
                            </span>
                          </>
                        ) : (
                          <span className="block">{project.title}</span>
                        )}
                      </p>
                    </motion.div>
                  </div>
                );
                return (
                  <motion.li
                    key={project.id}
                    variants={projectRowVariants}
                    whileHover={rowHover}
                    onPointerEnter={() => setHoveredProjectId(project.id)}
                    onPointerLeave={() => setHoveredProjectId(null)}
                    className="will-change-transform"
                  >
                    {project.id === 'namas' ? (
                      <Link
                        to="/projects/namas-design-build"
                        className="block text-inherit no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
                      >
                        {row}
                      </Link>
                    ) : project.id === 'insta-kill' ? (
                      <Link
                        to="/projects/insta-kill"
                        className="block text-inherit no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
                      >
                        {row}
                      </Link>
                    ) : project.id === 'game-over' ? (
                      <Link
                        to="/projects/game-over"
                        className="block text-inherit no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
                      >
                        {row}
                      </Link>
                    ) : (
                      row
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
