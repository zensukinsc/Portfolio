import { useRef, type RefObject } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

const KEY_ART = '/case-studies/game-over/game-over-key-art.png';

const ease = [0.22, 1, 0.36, 1] as const;

export type GameOverKeyArtProps = {
  scrollContainerRef: RefObject<HTMLElement | null>;
};

export function GameOverKeyArt({ scrollContainerRef }: GameOverKeyArtProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: sectionRef,
    offset: ['start end', 'end start'],
    layoutEffect: false,
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [28, -28]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [0.96, 1, 0.96]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-20 md:py-28"
      aria-label="Game Over documentary key art"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 48, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, ease }}
        className="relative z-10 mx-auto max-w-5xl [perspective:1200px]"
      >
        <motion.div
          className="relative mx-auto max-w-4xl"
          style={{ y: imageY, scale: imageScale }}
          whileHover={reduce ? undefined : { scale: 1.015 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <motion.div
            className="absolute -inset-3 rounded-lg bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.05] opacity-0 blur-xl md:-inset-6"
            initial={false}
            whileHover={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.45 }}
            aria-hidden
          />
          <motion.img
            src={KEY_ART}
            alt="Game Over — The Silent Struggle of Gaming Addiction: dramatic portrait with title treatment"
            className="relative z-10 mx-auto w-full bg-black"
            loading="lazy"
            decoding="async"
            initial={reduce ? false : { clipPath: 'inset(6% 6% 6% 6%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease, delay: 0.08 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
