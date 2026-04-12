import type { ReactNode } from 'react';
import { motion, type MotionValue, useTransform } from 'framer-motion';

/** Share of gallery scroll (0–1) used for the lid opening before slides advance. */
export const GALLERY_LAPTOP_OPEN_FRACTION = 0.14;

/**
 * Maps scroll progress to lid angle and slide-only progress so the first stretch
 * of the gallery scroll opens the laptop; remaining scroll cycles slides.
 */
export function useGalleryLaptopScroll(
  scrollYProgress: MotionValue<number>,
  prefersReducedMotion: boolean
) {
  const open = GALLERY_LAPTOP_OPEN_FRACTION;
  const closedAngle = prefersReducedMotion ? 0 : -78;

  const lidRotateX = useTransform(
    scrollYProgress,
    [0, open],
    [closedAngle, 0],
    { clamp: true }
  );

  const slideProgress = useTransform(
    scrollYProgress,
    [open, 1],
    [0, 1],
    { clamp: true }
  );

  return { lidRotateX, slideProgress };
}

type GalleryLaptopShellProps = {
  lidRotateX: MotionValue<number>;
  prefersReducedMotion: boolean;
  /** Screen area only (images). Bezel + hinge + base + gloss are provided here. */
  children: ReactNode;
};

/**
 * Namas-style gallery laptop: lid rotates on X from closed → open driven by scroll.
 */
export function GalleryLaptopShell({
  lidRotateX,
  prefersReducedMotion,
  children,
}: GalleryLaptopShellProps) {
  return (
    <div className="mx-auto w-full max-w-[min(100%,34rem)] [perspective:1400px] sm:max-w-[min(100%,38rem)] md:max-w-[min(100%,42rem)]">
      <div className="relative [transform-style:preserve-3d]">
        <motion.div
          className="relative origin-[center_bottom] [transform-style:preserve-3d] will-change-transform"
          style={{ rotateX: lidRotateX }}
        >
          <div className="relative rounded-t-lg border border-white/10 bg-[#1a1a1a] p-1.5 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.85)] md:rounded-t-xl md:p-2">
            <motion.div
              className="absolute left-1/2 top-0.5 z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/25 md:top-1 md:h-2 md:w-2"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { opacity: [0.35, 1, 0.35], scale: [1, 1.15, 1] }
              }
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            />
            <div className="relative mt-1.5 aspect-[16/10] w-full overflow-hidden rounded-sm bg-zinc-950 md:mt-2 md:rounded-md">
              {children}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
        <div className="relative">
          <div className="mx-auto h-2.5 rounded-b-sm border-x border-b border-white/5 bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f] md:h-3.5" />
          <div
            className="mx-auto h-2.5 rounded-b-lg border-x border-b border-white/10 bg-[#1a1a1a] md:h-3.5 md:rounded-b-xl"
            style={{ width: '108%', marginLeft: '-4%' }}
          >
            <div className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-t-full bg-white/5 md:h-1 md:w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
