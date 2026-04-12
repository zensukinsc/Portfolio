import { useRef, type RefObject } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from 'framer-motion';

const RESULT_CARD_REVEAL: readonly [number, number] = [0.1, 1];

function ResultCardReveal({
  scrollYProgress,
  children,
}: {
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const [start, end] = RESULT_CARD_REVEAL;
  const bottomInset = useTransform(scrollYProgress, [start, end], [100, 0], { clamp: true });
  const clipPath = useMotionTemplate`inset(0% 0% ${bottomInset}% 0%)`;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + (end - start) * 0.18],
    [0.92, 1],
    { clamp: true }
  );
  const shadowBlur = useTransform(scrollYProgress, [start, end], [0, 28], { clamp: true });
  const shadowOpacity = useTransform(scrollYProgress, [start, end], [0, 0.35], {
    clamp: true,
  });
  const boxShadow = useMotionTemplate`0 ${shadowBlur}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`;

  return (
    <motion.div
      className="ml-4 flex min-h-0 min-w-0 flex-1 flex-col self-stretch overflow-hidden rounded-sm"
      style={{ clipPath, opacity, boxShadow }}
    >
      <div className="flex min-h-0 flex-1 flex-col justify-center rounded-sm bg-white p-10 text-center text-black [color-scheme:light] md:p-14">
        {children}
      </div>
    </motion.div>
  );
}

export type GameOverResultProps = {
  scrollContainerRef: RefObject<HTMLElement | null>;
};

export function GameOverResult({ scrollContainerRef }: GameOverResultProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: sectionRef,
    offset: ['start end', 'center center'],
    layoutEffect: false,
  });

  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 1],
    [0.45, 1, 1, 0.75]
  );
  const labelY = useTransform(scrollYProgress, [0, 0.4, 1], [12, 0, -4], {
    clamp: true,
  });
  const railScaleY = useTransform(scrollYProgress, [0, 0.35], [0.2, 1], {
    clamp: true,
  });

  return (
    <section
      ref={sectionRef}
      className="border-b border-white/10 bg-black px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex items-stretch gap-0">
          <div className="flex shrink-0 items-stretch gap-0">
            <motion.div
              className="w-[2px] shrink-0 self-stretch bg-white/70"
              style={{ scaleY: railScaleY, transformOrigin: 'top' }}
              aria-hidden
            />
            <motion.div
              className="vertical-text ml-2 flex min-h-0 items-center justify-center self-stretch px-0.5 text-[clamp(1.5rem,5.5vmin,3.75rem)] font-bold uppercase leading-none tracking-[0.2em] text-white md:ml-3 md:tracking-[0.28em]"
              style={{ opacity: labelOpacity, y: labelY }}
            >
              Result
            </motion.div>
          </div>
          <ResultCardReveal scrollYProgress={scrollYProgress}>
            <motion.p
              className="mx-auto max-w-xl font-serif text-lg italic leading-relaxed text-black/80 md:text-xl"
              initial={{ opacity: 0.85, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              Delivered a compelling documentary that communicated the realities of gaming
              addiction, promoted awareness, and demonstrated the power of visual storytelling
              in addressing youth-related social issues.
            </motion.p>
          </ResultCardReveal>
        </div>
      </div>
    </section>
  );
}
