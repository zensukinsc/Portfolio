import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';
import { Link } from 'react-router-dom';
import {
  featuredShowcaseProjects,
  type FeaturedShowcaseProject,
} from '../data/portfolio';
import { LaptopFrame } from './LaptopFrame';

const projects = [...featuredShowcaseProjects];

type ProjectItem = FeaturedShowcaseProject;

function ProjectArticle({
  project,
  lift,
  cardOpacity,
  className = '',
}: {
  project: ProjectItem;
  lift: number;
  cardOpacity: number;
  className?: string;
}) {
  const screenContent = (
    <LaptopFrame interactive={!project.href}>
      <div className="relative aspect-[4/3] max-h-[min(78vh,920px)] w-full md:aspect-[16/10]">
        {project.image ? (
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/laptop:scale-[1.02]"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        ) : (
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent}`} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/project:bg-black/50 group-focus-visible/project:bg-black/50">
          <span className="rounded-full border border-white/40 bg-black/60 px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.22em] text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-300 group-hover/project:opacity-100 group-focus-visible/project:opacity-100 md:text-sm">
            View case study
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8 lg:p-10">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-white/50 md:text-sm">
            {project.role}
          </p>
          <h3 className="mt-2 font-sans text-xl font-extrabold uppercase leading-tight tracking-tight text-white md:mt-3 md:text-2xl lg:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 max-w-2xl font-sans text-sm text-white/75 md:mt-3 md:text-base lg:text-lg">
            {project.subtitle}
          </p>
        </div>
      </div>
    </LaptopFrame>
  );

  return (
    <article
      className={`relative ${className}`.trim()}
      style={{
        opacity: cardOpacity,
        transform: `translateY(${lift}px)`,
      }}
    >
      {project.href ? (
        <div className="group/project relative w-full rounded-sm ring-1 ring-white/0 transition-[box-shadow,ring-color] duration-300 hover:ring-white/25">
          <Link
            to={project.href}
            className="relative z-10 block cursor-pointer rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label={`Open ${project.title} project`}
          >
            {screenContent}
          </Link>
        </div>
      ) : (
        <div className="group/project w-full">{screenContent}</div>
      )}
    </article>
  );
}

/** Distance from top of `main`’s scrollable content to top of `section` (px). Same idea as Services. */
function sectionOffsetTopInMain(mainEl: HTMLElement, sectionEl: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = sectionEl;
  while (node && node !== mainEl) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  if (node === mainEl) return top;
  return (
    sectionEl.getBoundingClientRect().top -
    mainEl.getBoundingClientRect().top +
    mainEl.scrollTop
  );
}

/** 0→1 while `main` scrolls through `section` — no forced jumps so opacity/split track scroll reliably. */
function scrollThroughProgress(mainEl: HTMLElement, sectionEl: HTMLElement): number {
  const st = mainEl.scrollTop;
  const top = sectionOffsetTopInMain(mainEl, sectionEl);
  const range = Math.max(1, sectionEl.offsetHeight - mainEl.clientHeight);
  const p = (st - top) / range;
  if (!Number.isFinite(p)) return 0;
  return Math.min(1, Math.max(0, p));
}

function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}

function smoothstep01(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/** Extra-soft progress for card motion (slow start / slow finish in scroll space). */
function easeSlow01(t: number): number {
  return smoothstep01(smoothstep01(t));
}

/** Scroll p at which “Latest works” is fully visible (opacity + scale) — separation does not start before this. */
const P_OPEN_END = 0.18;

/** Length of p for the separation animation (after open is complete). */
const P_SPLIT_LEN = 0.28;

/** p when split (and first project motion tied to split) reaches 1. */
const P_SPLIT_END = P_OPEN_END + P_SPLIT_LEN;

/** Scroll band after project 1 is done — physical sticky dwell + this p window before project 2 enters. */
const P_HOLD_AFTER_P1 = 0.07;

/** p when project 2 may begin animating. */
const P_AFTER_HOLD = P_SPLIT_END + P_HOLD_AFTER_P1;

/** Project 2 finishes animating here; then holds before project 3. */
const P_CARD2_END = P_AFTER_HOLD + 0.19;

/** Hold at center with project 2 fully visible before project 3 rises. */
const P_HOLD_AFTER_P2 = 0.07;

/** p when project 3 begins (after second dwell). */
const P_AFTER_HOLD_2 = P_CARD2_END + P_HOLD_AFTER_P2;

/** 0→1: title scales / fades in — completes before split begins. */
function phaseOpen(p: number): number {
  return clamp01(p / P_OPEN_END);
}

/** 0→1: “Latest” + “works” separate — only after open is full. */
function phaseSplit(p: number): number {
  if (p <= P_OPEN_END) return 0;
  return clamp01((p - P_OPEN_END) / P_SPLIT_LEN);
}

/**
 * Card 0: tied to headline split. Cards 1–2: dwell in sticky center slots; card 3: rises in same slot to p === 1.
 */
function projectMotion(
  i: number,
  p: number,
  liftPx: number,
): { lift: number; opacity: number } {
  if (i === 0) {
    const s = phaseSplit(p);
    const t = smoothstep01(s);
    return { lift: (1 - t) * liftPx, opacity: t };
  }

  if (i === 1) {
    if (p < P_AFTER_HOLD) {
      return { lift: liftPx, opacity: 0 };
    }
    if (p >= P_CARD2_END) {
      return { lift: 0, opacity: 1 };
    }
    const u = clamp01((p - P_AFTER_HOLD) / (P_CARD2_END - P_AFTER_HOLD));
    const t = easeSlow01(u);
    return { lift: (1 - t) * liftPx, opacity: t };
  }

  if (i === 2) {
    if (p < P_AFTER_HOLD_2) {
      return { lift: liftPx, opacity: 0 };
    }
    const u = clamp01((p - P_AFTER_HOLD_2) / (1 - P_AFTER_HOLD_2));
    const t = easeSlow01(u);
    return { lift: (1 - t) * liftPx, opacity: t };
  }

  return { lift: 0, opacity: 1 };
}

/** Same geometry for sticky “dwell” and final card — one vertical slot in the scrollport (below nav). */
const CENTER_SLOT_STICKY =
  'sticky top-24 z-10 flex min-h-[calc(100svh-6rem)] flex-col justify-center md:top-28 md:min-h-[calc(100svh-7rem)]';
const CENTER_SLOT_FINAL =
  'flex min-h-[calc(100svh-6rem)] flex-col justify-center md:min-h-[calc(100svh-7rem)]';
const DWELL_OUTER = 'relative min-h-[min(115vh,1200px)] w-full';

type ProjectsProps = {
  scrollContainerRef?: RefObject<HTMLElement | null>;
};

export function Projects({ scrollContainerRef }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  /** Entry travel from below — tied to scrollport height so cards read as coming from the bottom of the screen. */
  const [entryLiftPx, setEntryLiftPx] = useState(720);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Ref can still be null on first layout; `closest('main')` matches App layout and keeps scroll tied.
    const main =
      scrollContainerRef?.current ?? (section.closest('main') as HTMLElement | null);
    if (!main) return;

    const syncEntryLift = () => {
      const h = main.clientHeight;
      setEntryLiftPx(Math.max(Math.round(h * 0.94), 520));
    };

    const update = () => setP(scrollThroughProgress(main, section));

    update();
    syncEntryLift();
    main.addEventListener('scroll', update, { passive: true });
    const onResize = () => {
      update();
      syncEntryLift();
    };
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(section);
    ro.observe(main);

    return () => {
      main.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [scrollContainerRef]);

  const open = phaseOpen(p);
  const split = phaseSplit(p);
  /** 0→1 eased: drives flex-grow between the two words so separation eases in instead of snapping. */
  const splitEase = smoothstep01(split);

  const firstProject = projects[0];
  const secondProject = projects[1];
  const thirdProject = projects[2];
  const firstMotion = projectMotion(0, p, entryLiftPx);
  const secondMotion = projectMotion(1, p, entryLiftPx);
  const thirdMotion = projectMotion(2, p, entryLiftPx);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full min-h-[min(340vh,4400px)] shrink-0 border-t border-white/10 bg-black pt-24 md:pt-28"
    >
      <div className="mx-auto max-w-[1600px] pb-32 md:pb-40">
        {/* Full-bleed sticky headline — vertically centered in the scrollport (below nav) */}
        <div className="pointer-events-none sticky top-24 z-20 md:top-28">
          <div className="flex min-h-[calc(100svh-6rem)] flex-col justify-center md:min-h-[calc(100svh-7rem)]">
            <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
            <div
              style={{
                opacity: 0.15 + open * 0.85,
                transform: `scale(${0.78 + open * 0.22})`,
                transformOrigin: 'center center',
              }}
            >
              <div
                className="flex w-full items-center py-4 md:py-6"
                style={
                  {
                    '--split-ease': splitEase,
                    paddingLeft:
                      'calc((1 - var(--split-ease)) * clamp(1rem, 5vw, 2rem) + var(--split-ease) * clamp(0.2rem, 2vw, 1rem))',
                    paddingRight:
                      'calc((1 - var(--split-ease)) * clamp(1rem, 5vw, 2rem) + var(--split-ease) * clamp(0.2rem, 2vw, 1rem))',
                  } as CSSProperties
                }
              >
                {/* Side flex + growing middle: words stay centered as a pair, then ease apart — no layout snap */}
                <div className="min-w-0 flex-1" aria-hidden="true" />
                <span className="shrink-0 font-sans text-4xl font-extrabold uppercase tracking-[0.12em] text-white md:text-6xl lg:text-7xl">
                  Latest
                </span>
                <div
                  className="shrink-0"
                  style={{
                    flexGrow: splitEase * 72,
                    flexShrink: 1,
                    flexBasis: 0,
                    // Tighter gap when “together”; shrinks as the words ease apart
                    minWidth: `${Math.max(0, (1 - splitEase) * 14)}px`,
                  }}
                  aria-hidden="true"
                />
                <span className="shrink-0 font-sans text-4xl font-extrabold uppercase tracking-[0.12em] text-white/85 md:text-6xl lg:text-7xl">
                  works
                </span>
                <div className="min-w-0 flex-1" aria-hidden="true" />
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Projects 1 & 2: same sticky center slot + tall dwell; project 3: same slot height, final resting position */}
        <div className="relative z-10 mx-auto mt-8 w-full max-w-2xl px-5 pb-16 pt-6 sm:px-8 md:mt-16 md:max-w-3xl md:px-12 md:pt-10 lg:max-w-4xl lg:px-16">
          <div className={DWELL_OUTER}>
            <div className={CENTER_SLOT_STICKY}>
              <ProjectArticle
                project={firstProject}
                lift={firstMotion.lift}
                cardOpacity={firstMotion.opacity}
                className="w-full"
              />
            </div>
          </div>

          <div className={DWELL_OUTER}>
            <div className={CENTER_SLOT_STICKY}>
              <ProjectArticle
                project={secondProject}
                lift={secondMotion.lift}
                cardOpacity={secondMotion.opacity}
                className="w-full"
              />
            </div>
          </div>

          <div className="relative w-full pb-8 pt-4 md:pb-12 md:pt-8">
            <div className={CENTER_SLOT_FINAL}>
              <ProjectArticle
                project={thirdProject}
                lift={thirdMotion.lift}
                cardOpacity={thirdMotion.opacity}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
