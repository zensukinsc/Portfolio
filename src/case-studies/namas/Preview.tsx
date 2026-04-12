import { useRef, type RefObject } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

const PREVIEW_IMAGE = '/case-studies/namas/namas-architecture-hero-screen.png';

const ease = [0.22, 1, 0.36, 1] as const;

export type NamasPreviewProps = {
  scrollContainerRef: RefObject<HTMLElement | null>;
};

export function NamasPreview({ scrollContainerRef }: NamasPreviewProps) {
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
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.25, 0.55, 0.25]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-dark px-6 py-32"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_65%)]"
        style={{ opacity: glowOpacity }}
        aria-hidden
      />
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
            className="absolute -inset-3 rounded-lg bg-gradient-to-br from-white/[0.12] via-transparent to-white/[0.05] opacity-0 blur-xl md:-inset-6"
            initial={false}
            whileHover={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.45 }}
            aria-hidden
          />
          <motion.img
            src={PREVIEW_IMAGE}
            alt="NAMAS Architecture hero: namas logo, NAMAS ARCHITECTURE headline, tagline Crafting spaces building dreams, and carousel indicators on a dark background"
            className="relative z-10 mx-auto w-full max-w-4xl rounded-sm border border-white/[0.06] shadow-[0_0_80px_-20px_rgba(255,255,255,0.12)]"
            loading="lazy"
            decoding="async"
            initial={reduce ? false : { clipPath: 'inset(8% 6% 8% 6%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease, delay: 0.12 }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 rounded-sm ring-1 ring-inset ring-white/[0.04]"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            aria-hidden
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
