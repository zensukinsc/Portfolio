import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

/** Distance from top of `main`’s scrollable content to top of `section` (px). */
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

/** Scroll progress 0→1 while `main` scrolls through `section`. */
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

/** Expanded column stays a fixed “sheet” width (see reference), not full remaining space */
const EXPANDED_PANEL_W = 'clamp(300px, min(38vw, 440px), 480px)';

const SERVICES = [
  {
    id: 'web',
    title: 'Web Design & Development',
    headline: 'Sites built to convert, maintain, and grow',
    bullets: [
      'Custom Website Design',
      'Frontend Development (responsive websites)',
      'UI/UX Design (layouts, user flow)',
      'Portfolio Websites',
      'Landing Pages',
      'Website Redesign',
      'Basic SEO Setup',
      'Website Maintenance & Updates',
    ],
  },
  {
    id: 'graphic',
    title: 'Graphic Design',
    headline: 'Identity and visuals that stay consistent',
    bullets: [
      'Logo Design',
      'Brand Identity (colors, fonts, guidelines)',
      'Social Media Posts & Banners',
      'Poster & Flyer Design',
      'Business Cards & Stationery',
      'Merchandise Design (jerseys, t-shirts, etc.)',
      'UI Elements (icons, buttons, visuals)',
      'Presentation Design',
    ],
  },
  {
    id: 'video',
    title: 'Videography',
    headline: 'Stories that move with clarity and pace',
    bullets: [
      'Event Videography',
      'Short-form Content (TikTok, Reels)',
      'Promotional Videos',
      'Documentary-style Videos',
      'Video Editing',
      'Color Grading',
      'Social Media Video Content',
    ],
  },
  {
    id: 'photo',
    title: 'Photography',
    headline: 'Images crafted for print and screen',
    bullets: [
      'Portrait Photography',
      'Event Photography',
      'Product Photography',
      'Lifestyle Photography',
      'Esports / Gaming Photography',
      'Editing & Retouching',
      'Social Media Content Shoots',
    ],
  },
] as const;

/**
 * Tween (no spring overshoot): flex reflow under the cursor won’t fight hover
 * hit-testing the way springs + mouseenter/mouseleave can.
 */
const panelTween = {
  type: 'tween' as const,
  duration: 0.68,
  ease: [0.22, 1, 0.36, 1] as const,
};

const panelTransitionReduced = {
  duration: 0.68,
  ease: [0.22, 1, 0.36, 1] as const,
};

type ServicesProps = {
  scrollContainerRef: RefObject<HTMLElement | null>;
};

export function Services({ scrollContainerRef }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  /** Hover-driven panels on real pointers; touch keeps click. */
  const [useHoverPanels, setUseHoverPanels] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);

  useLayoutEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setUseHoverPanels(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  /** Hover: pick column by pointer position so flex animation can’t thrash enter/leave. */
  const columnsWrapRef = useRef<HTMLDivElement>(null);
  const pointerRafRef = useRef<number | null>(null);
  const pendingPointerRef = useRef<{ x: number; y: number } | null>(null);

  const resolveColumnIdAtPoint = useCallback((clientX: number, clientY: number) => {
    const wrap = columnsWrapRef.current;
    if (!wrap) return null;
    const kids = wrap.children;
    for (let i = 0; i < kids.length; i++) {
      const r = (kids[i] as HTMLElement).getBoundingClientRect();
      const last = i === kids.length - 1;
      const xHit = last
        ? clientX >= r.left && clientX <= r.right
        : clientX >= r.left && clientX < r.right;
      if (xHit && clientY >= r.top && clientY <= r.bottom) {
        return SERVICES[i].id;
      }
    }
    return null;
  }, []);

  const schedulePickFromPointer = useCallback(() => {
    if (pointerRafRef.current != null) return;
    pointerRafRef.current = requestAnimationFrame(() => {
      pointerRafRef.current = null;
      const pt = pendingPointerRef.current;
      if (!pt || !useHoverPanels) return;
      const id = resolveColumnIdAtPoint(pt.x, pt.y);
      if (id != null) {
        setExpandedId((prev) => (prev === id ? prev : id));
      }
    });
  }, [resolveColumnIdAtPoint, useHoverPanels]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!useHoverPanels) return;
      pendingPointerRef.current = { x: e.clientX, y: e.clientY };
      schedulePickFromPointer();
    },
    [schedulePickFromPointer, useHoverPanels]
  );

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!useHoverPanels) return;
      pendingPointerRef.current = { x: e.clientX, y: e.clientY };
      schedulePickFromPointer();
    },
    [schedulePickFromPointer, useHoverPanels]
  );

  const handlePointerLeave = useCallback(() => {
    if (!useHoverPanels) return;
    if (pointerRafRef.current != null) {
      cancelAnimationFrame(pointerRafRef.current);
      pointerRafRef.current = null;
    }
    pendingPointerRef.current = null;
    setExpandedId(null);
  }, [useHoverPanels]);

  useEffect(() => {
    return () => {
      if (pointerRafRef.current != null) {
        cancelAnimationFrame(pointerRafRef.current);
      }
    };
  }, []);

  const syncHorizontalFromScroll = useCallback(() => {
    const mainEl = scrollContainerRef.current;
    const section = sectionRef.current;
    const row = rowRef.current;
    const vp = viewportRef.current;
    const title = titleRef.current;
    if (!mainEl || !section || !vp) {
      x.set(0);
      return;
    }
    const vpW = vp.clientWidth;
    if (vpW <= 0) {
      x.set(0);
      return;
    }
    const tw = title?.offsetWidth ?? 0;
    const rowW = row?.scrollWidth ?? 0;
    const vpScrollW = vp.scrollWidth;
    const totalScrollW = Math.max(rowW, vpScrollW);
    const translateMax = Math.max(0, totalScrollW - vpW);
    const textPan = Math.max(0, tw - vpW);

    const p = sectionScrollProgress(mainEl, section);
    x.set(horizontalOffset(p, translateMax, textPan));
  }, [scrollContainerRef, x]);

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
  }, [syncHorizontalFromScroll, scrollContainerRef, expandedId]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full shrink-0"
      style={{ height: '520vh' }}
    >
      <div className="sticky top-0 flex h-[100vh] max-h-[100vh] min-h-[100vh] flex-col overflow-hidden overflow-y-hidden border-t border-white/10 bg-black pt-24 md:pt-28">
        {/*
          Top-align the row (no vertical centering) so the strip stays visually fixed while scrolling;
          only translateX on the row should move content sideways.
        */}
        <div className="relative z-10 flex min-h-0 w-full min-w-0 flex-1 flex-col justify-start overflow-x-hidden pb-6 md:pb-8">
          <div
            ref={viewportRef}
            style={{ width: '100%' }}
            className="relative flex h-full min-h-0 w-full min-w-0 max-w-full flex-1 items-start overflow-x-hidden overflow-y-hidden"
          >
            <motion.div
              ref={rowRef}
              style={{ x }}
              className="will-change-transform flex w-max min-w-max shrink-0 items-start gap-10 pl-4 md:gap-16 md:pl-8 lg:gap-24 lg:pl-12"
            >
              <div
                ref={titleRef}
                className="flex shrink-0 items-start self-start pr-2 md:pr-6"
              >
                <h2
                  className="select-none whitespace-nowrap font-serif uppercase leading-[0.82] tracking-[-0.03em] text-white"
                  style={{
                    fontSize: 'clamp(20rem, min(100vw, 100vh), 1002rem)',
                    fontWeight: 900,
                  }}
                >
                  Services
                </h2>
              </div>

              <div
                className="flex min-w-[min(94vw,1080px)] shrink-0 overflow-hidden border-x border-b border-white bg-black shadow-[0_0_60px_-20px_rgba(255,255,255,0.15)] md:min-w-[min(88vw,1120px)]"
                style={{
                  /** Same vertical basis as headline: `min(100vw, 100vh)` from your font clamp */
                  height: 'min(100vw, 100vh)',
                }}
                role="region"
                aria-label="Services"
              >
                <div
                  ref={columnsWrapRef}
                  className="flex h-full w-full min-w-0"
                  onPointerEnter={
                    useHoverPanels ? handlePointerEnter : undefined
                  }
                  onPointerMove={
                    useHoverPanels ? handlePointerMove : undefined
                  }
                  onPointerLeave={
                    useHoverPanels ? handlePointerLeave : undefined
                  }
                >
                  {SERVICES.map((service, index) => {
                    const n = String(index + 1).padStart(2, '0');
                    const isOpen = expandedId === service.id;
                    const allClosed = expandedId === null;
                    return (
                      <motion.div
                        key={service.id}
                        initial={false}
                        animate={
                          allClosed
                            ? {
                                flexGrow: 1,
                                flexShrink: 1,
                                flexBasis: 0,
                                width: 'auto',
                              }
                            : isOpen
                              ? {
                                  flexGrow: 0,
                                  flexShrink: 0,
                                  flexBasis: EXPANDED_PANEL_W,
                                  width: 'auto',
                                }
                              : {
                                  flexGrow: 1,
                                  flexShrink: 1,
                                  flexBasis: 0,
                                  width: 'auto',
                                }
                        }
                        transition={
                          prefersReducedMotion
                            ? panelTransitionReduced
                            : panelTween
                        }
                        className="relative h-full min-w-0 overflow-hidden border-r border-white"
                      >
                        {isOpen ? (
                          <div
                            id={`service-panel-${service.id}`}
                            className="flex h-full min-w-0"
                            aria-labelledby={`service-heading-${service.id}`}
                          >
                            {useHoverPanels ? (
                              <div
                                className="flex w-14 shrink-0 flex-col items-center border-r border-white/25 bg-black py-6 md:w-[4.5rem] md:py-8"
                                aria-hidden
                              >
                                <span className="font-sans text-[10px] font-medium tabular-nums text-white/45 md:text-[11px]">
                                  {n}
                                </span>
                                <div className="flex min-h-0 flex-1 items-center justify-center px-1">
                                  <span className="max-h-[min(85vh,720px)] origin-center -rotate-90 whitespace-nowrap font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white md:text-base lg:text-lg">
                                    {service.title}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setExpandedId(null)}
                                className="flex w-14 shrink-0 cursor-pointer flex-col items-center border-r border-white/25 bg-black py-6 text-left transition-colors hover:bg-white/[0.04] md:w-[4.5rem] md:py-8"
                                aria-label="Close service details"
                              >
                                <span className="font-sans text-[10px] font-medium tabular-nums text-white/45 md:text-[11px]">
                                  {n}
                                </span>
                                <div className="flex min-h-0 flex-1 items-center justify-center px-1">
                                  <span className="max-h-[min(85vh,720px)] origin-center -rotate-90 whitespace-nowrap font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white md:text-base lg:text-lg">
                                    {service.title}
                                  </span>
                                </div>
                              </button>
                            )}
                            <div className="min-h-0 min-w-0 flex-1 overflow-hidden bg-black px-4 py-6 sm:px-5 md:px-7 md:py-8">
                              <p className="font-sans text-[10px] font-medium tabular-nums text-white/40 md:text-[11px]">
                                {n}
                              </p>
                              <h3
                                id={`service-heading-${service.id}`}
                                className="mt-1.5 font-sans text-base font-bold uppercase leading-[1.15] tracking-tight text-white sm:text-lg md:text-xl"
                              >
                                {service.headline}
                              </h3>
                              <ul className="mt-5 font-sans text-sm leading-snug text-white/85 md:mt-6 md:text-[0.9375rem]">
                                {service.bullets.map((line) => (
                                  <li
                                    key={line}
                                    className="border-b border-white/15 py-3 md:py-3.5"
                                  >
                                    {line}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : useHoverPanels ? (
                          <div
                            className="flex h-full w-full flex-col items-center bg-black py-7 transition-colors hover:bg-white/[0.04] md:py-9"
                            aria-expanded={isOpen}
                            aria-controls={`service-panel-${service.id}`}
                          >
                            <span className="font-sans text-[10px] font-medium tabular-nums text-white/40 md:text-[11px]">
                              {n}
                            </span>
                            <span className="flex min-h-0 flex-1 items-center justify-center px-0.5">
                              <span className="max-h-[min(85vh,720px)] origin-center -rotate-90 whitespace-nowrap font-sans text-sm font-bold uppercase tracking-[0.14em] text-white/70 md:text-base md:tracking-[0.16em] lg:text-lg">
                                {service.title}
                              </span>
                            </span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setExpandedId(service.id)}
                            aria-expanded={isOpen}
                            aria-controls={`service-panel-${service.id}`}
                            className="flex h-full w-full flex-col items-center bg-black py-7 transition-colors hover:bg-white/[0.04] md:py-9"
                          >
                            <span className="font-sans text-[10px] font-medium tabular-nums text-white/40 md:text-[11px]">
                              {n}
                            </span>
                            <span className="flex min-h-0 flex-1 items-center justify-center px-0.5">
                              <span className="max-h-[min(85vh,720px)] origin-center -rotate-90 whitespace-nowrap font-sans text-sm font-bold uppercase tracking-[0.14em] text-white/70 md:text-base md:tracking-[0.16em] lg:text-lg">
                                {service.title}
                              </span>
                            </span>
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
