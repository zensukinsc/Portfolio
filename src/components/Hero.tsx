import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Emblem } from './Emblem';
import { HomeCtaButtons } from './HomeCtaButtons';

/** Spring aligned with Emblem `drawLine` (outer ring custom ≈ 0.3); start via parent `delayChildren` */
const lineTransition = {
  type: 'spring' as const,
  duration: 2,
  bounce: 0,
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: lineTransition,
  },
};

const compositionVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.26,
      staggerChildren: 0.05,
    },
  },
};

const emblemFrameVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: 'easeOut',
    },
  },
};

const copyEase = [0.22, 1, 0.36, 1] as const;

type HeroProps = {
  /** Fires once after the hero's initial intro is complete. */
  onReady?: () => void;
};

export function Hero({ onReady }: HeroProps) {
  const reduce = useReducedMotion();
  const emittedReadyRef = useRef(false);
  const [playIntro, setPlayIntro] = useState(false);
  const [showHeroDetails, setShowHeroDetails] = useState(false);

  // Defer "visible" until after first paint so Framer Motion runs the intro on refresh.
  useEffect(() => {
    if (reduce) {
      setPlayIntro(true);
      return;
    }
    let innerId = 0;
    const outerId = requestAnimationFrame(() => {
      innerId = requestAnimationFrame(() => setPlayIntro(true));
    });
    return () => {
      cancelAnimationFrame(outerId);
      if (innerId) cancelAnimationFrame(innerId);
    };
  }, [reduce]);

  useEffect(() => {
    if (!playIntro) return;

    const delayMs = reduce ? 0 : 2600;
    const id = window.setTimeout(() => {
      if (emittedReadyRef.current) return;
      emittedReadyRef.current = true;
      setShowHeroDetails(true);
      onReady?.();
    }, delayMs);

    return () => window.clearTimeout(id);
  }, [playIntro, onReady, reduce]);

  return (
    <section
      id="home"
      className="box-border flex min-h-[100svh] w-full shrink-0 flex-col items-center justify-center gap-8 overflow-hidden bg-[#0a0a0a] px-5 pb-12 pt-28 md:min-h-[100vh] md:gap-10 md:px-8 md:pb-16 md:pt-32"
    >
      <motion.div
        className="relative flex w-full max-w-[100vw] flex-shrink-0 items-center justify-center md:-translate-y-[12px]"
        variants={compositionVariants}
        initial="hidden"
        animate={playIntro ? 'visible' : 'hidden'}
      >
        <motion.div
          className="pointer-events-none h-px min-w-0 flex-1 origin-right bg-white/40"
          variants={lineVariants}
          aria-hidden
        />

        <motion.div
          className="relative z-10 isolate shrink-0 rounded-full bg-[#0a0a0a] p-2 shadow-[0_0_0_1px_rgba(10,10,10,1)]"
          variants={emblemFrameVariants}
        >
          <Emblem
            inView={playIntro}
            className="h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] md:h-[400px] md:w-[400px] lg:h-[480px] lg:w-[480px]"
          />
        </motion.div>

        <motion.div
          className="pointer-events-none h-px min-w-0 flex-1 origin-left bg-white/40"
          variants={lineVariants}
          aria-hidden
        />
      </motion.div>

      <motion.div
        className={`flex w-full max-w-2xl flex-col items-center px-1 text-center ${
          showHeroDetails ? '' : 'invisible pointer-events-none'
        }`}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={
          showHeroDetails
            ? { opacity: 1, y: 0 }
            : reduce
              ? { opacity: 0, y: 0 }
              : { opacity: 0, y: 16 }
        }
        transition={{ duration: 0.75, delay: showHeroDetails ? 0.1 : 0, ease: copyEase }}
        aria-hidden={!showHeroDetails}
      >
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50 md:text-xs">
          Zensuki · Brand positioning
        </p>
        <h1 className="mt-4 font-serif text-[clamp(1.75rem,6vw,3rem)] font-black uppercase leading-[1.05] tracking-tight text-white md:mt-5 md:tracking-tighter">
          Helping startups build credibility
        </h1>
        <p className="mt-5 max-w-md font-serif text-base leading-relaxed text-white/75 md:mt-6 md:max-w-lg md:text-lg">
          Through user-centered experiences across web, brand, and motion.
        </p>
        <div className="mt-8 w-full md:mt-10">
          <HomeCtaButtons />
        </div>
      </motion.div>
    </section>
  );
}
