import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  useCallback,
  useLayoutEffect,
  useRef,
  type RefObject,
} from 'react';

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

function sectionScrollProgress(mainEl: HTMLElement, sectionEl: HTMLElement): number {
  const st = mainEl.scrollTop;
  const T = sectionOffsetTopInMain(mainEl, sectionEl);
  const range = Math.max(1, sectionEl.offsetHeight - mainEl.clientHeight);
  return Math.min(1, Math.max(0, (st - T) / range));
}

function horizontalOffset(
  p: number,
  translateMax: number,
  textPan: number
): number {
  if (translateMax <= 0) return 0;
  if (textPan <= 0) return -p * translateMax;
  const p1 = textPan / translateMax;
  if (p <= p1) return -(p / p1) * textPan;
  const u = (p - p1) / (1 - p1);
  return -textPan - u * (translateMax - textPan);
}

const STEPS = [
  {
    num: '01',
    title: 'Situation',
    body:
      'The original website was static and did not display architectural projects, making it difficult for potential clients to evaluate the firm’s experience and design capabilities.',
  },
  {
    num: '02',
    title: 'Action',
    body:
      'I redesigned the website structure to support dynamic project content managed by administrators. I developed new information architecture and wireframes focused on project discovery, visual storytelling, and easy navigation. Interactive prototypes were created to test user flow and ensure users could quickly access project details.',
  },
  {
    num: '03',
    title: 'Result',
    body:
      'The redesigned experience allowed the company to continuously showcase updated architectural projects, improving transparency, strengthening digital credibility and supporting better client decision-making.',
  },
] as const;

type JourneyStep = (typeof STEPS)[number];

function DesignJourneyStep({
  step,
  stepIndex,
  sectionProgress,
  reduceMotion,
}: {
  step: JourneyStep;
  stepIndex: number;
  sectionProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const numOpacity = useTransform(
    sectionProgress,
    [stepIndex * 0.22, stepIndex * 0.22 + 0.12, stepIndex * 0.22 + 0.35],
    [0.35, 1, 1],
    { clamp: true }
  );
  const ruleScaleX = useTransform(
    sectionProgress,
    [stepIndex * 0.2 + 0.05, stepIndex * 0.2 + 0.22],
    [0, 1],
    { clamp: true }
  );

  return (
    <motion.article
      className="flex w-[min(92vw,560px)] shrink-0 flex-col items-start text-left md:w-[min(88vw,600px)]"
      initial={{ opacity: 0.88, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-12% 0px -12% 0px', amount: 0.35 }}
      transition={{
        duration: 0.55,
        delay: stepIndex * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              transition: { type: 'spring', stiffness: 320, damping: 22 },
            }
      }
    >
      <motion.span
        className="font-serif text-6xl font-light leading-none tracking-tight text-white md:text-7xl lg:text-8xl"
        style={{ opacity: numOpacity }}
      >
        {step.num}
      </motion.span>
      <motion.div
        className="mt-3 h-px w-[2.8ch] max-w-[5rem] origin-left bg-white"
        style={{ scaleX: ruleScaleX }}
        aria-hidden
      />
      <h3 className="mt-8 font-serif text-3xl font-bold tracking-tight text-white md:mt-10 md:text-4xl lg:text-5xl">
        {step.title}
      </h3>
      <p className="mt-5 max-w-prose font-serif text-base leading-relaxed text-white/90 md:mt-6 md:text-lg md:leading-relaxed">
        {step.body}
      </p>
    </motion.article>
  );
}

type NamasDesignJourneyProps = {
  scrollContainerRef: RefObject<HTMLElement | null>;
};

export function NamasDesignJourney({ scrollContainerRef }: NamasDesignJourneyProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const sectionProgress = useMotionValue(0);

  const titleSkewY = useTransform(
    sectionProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [-1.25, 0, 1.25]
  );
  const rowRotateZ = useTransform(
    sectionProgress,
    [0, 0.35, 0.65, 1],
    reduce ? [0, 0, 0, 0] : [0.2, 0, 0, -0.2]
  );
  const stickyGlow = useTransform(
    sectionProgress,
    [0, 0.25, 0.55, 0.8, 1],
    [0.05, 0.14, 0.1, 0.16, 0.06]
  );

  const syncHorizontalFromScroll = useCallback(() => {
    const mainEl = scrollContainerRef.current;
    const section = sectionRef.current;
    const row = rowRef.current;
    const vp = viewportRef.current;
    const title = titleRef.current;
    if (!mainEl || !section || !vp) {
      x.set(0);
      sectionProgress.set(0);
      return;
    }
    const vpW = vp.clientWidth;
    if (vpW <= 0) {
      x.set(0);
      sectionProgress.set(0);
      return;
    }
    const tw = title?.offsetWidth ?? 0;
    const rowW = row?.scrollWidth ?? 0;
    const vpScrollW = vp.scrollWidth;
    const totalScrollW = Math.max(rowW, vpScrollW);
    const translateMax = Math.max(0, totalScrollW - vpW);
    const textPan = Math.max(0, tw - vpW);

    const p = sectionScrollProgress(mainEl, section);
    sectionProgress.set(p);
    x.set(horizontalOffset(p, translateMax, textPan));
  }, [scrollContainerRef, sectionProgress, x]);

  const mainScrollAttachedRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let cancelled = false;
    const ro = new ResizeObserver(syncHorizontalFromScroll);
    if (rowRef.current) ro.observe(rowRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (titleRef.current) ro.observe(titleRef.current);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener('resize', syncHorizontalFromScroll);
    const fonts = document.fonts;
    const onFonts = () => syncHorizontalFromScroll();
    if (fonts?.addEventListener) {
      fonts.addEventListener('loadingdone', onFonts);
    }
    void fonts?.ready?.then(syncHorizontalFromScroll);

    const attachMainScroll = () => {
      const mainEl = scrollContainerRef.current;
      if (!mainEl) {
        if (!cancelled) requestAnimationFrame(attachMainScroll);
        return;
      }
      mainScrollAttachedRef.current = mainEl;
      mainEl.addEventListener('scroll', syncHorizontalFromScroll, { passive: true });
      syncHorizontalFromScroll();
    };
    attachMainScroll();
    requestAnimationFrame(() => {
      requestAnimationFrame(syncHorizontalFromScroll);
    });

    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener('resize', syncHorizontalFromScroll);
      fonts?.removeEventListener?.('loadingdone', onFonts);
      mainScrollAttachedRef.current?.removeEventListener(
        'scroll',
        syncHorizontalFromScroll
      );
      mainScrollAttachedRef.current = null;
    };
  }, [syncHorizontalFromScroll, scrollContainerRef]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full shrink-0"
      style={{ height: '500vh' }}
      aria-label="Design journey"
    >
      <div className="sticky top-0 flex h-[100vh] max-h-[100vh] min-h-[100vh] flex-col overflow-hidden overflow-y-hidden border-t border-white/10 bg-black pt-24 md:pt-28">
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]"
          style={{ opacity: stickyGlow }}
          aria-hidden
        />
        <div className="relative z-10 flex min-h-0 w-full min-w-0 flex-1 flex-col justify-start overflow-x-hidden pb-6 md:pb-8">
          <div
            ref={viewportRef}
            style={{ width: '100%' }}
            className="relative flex h-full min-h-0 w-full min-w-0 max-w-full flex-1 items-start overflow-x-hidden overflow-y-hidden"
          >
            <motion.div
              ref={rowRef}
              style={{ x, rotateZ: rowRotateZ }}
              className="will-change-transform flex w-max min-w-max shrink-0 items-start gap-10 pl-4 md:gap-16 md:pl-8 lg:gap-24 lg:pl-12"
            >
              <div
                ref={titleRef}
                className="flex shrink-0 items-start self-start pr-2 md:pr-6"
              >
                <motion.h2
                  className="select-none whitespace-nowrap font-serif uppercase leading-[0.82] tracking-[-0.03em] text-white"
                  style={{
                    skewY: titleSkewY,
                    fontSize: 'clamp(20rem, min(100vw, 100vh), 1002rem)',
                    fontWeight: 900,
                  }}
                >
                  Design Journey
                </motion.h2>
              </div>

              <div className="flex shrink-0 items-start gap-12 pr-8 md:gap-20 md:pr-16 lg:gap-28 lg:pr-24">
                {STEPS.map((step, stepIndex) => (
                  <DesignJourneyStep
                    key={step.num}
                    step={step}
                    stepIndex={stepIndex}
                    sectionProgress={sectionProgress}
                    reduceMotion={!!reduce}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
