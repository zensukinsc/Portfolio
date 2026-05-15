import React, { forwardRef } from 'react';
import type { MotionValue } from 'framer-motion';
import { DaVinciResolveLogo, PhotoshopLogo } from './ToolLogos';
import { motion, useTransform } from 'framer-motion';

const PROJECT_DATA_LABEL = 'Project Data' as const;
const PROJECT_DATA_CHARS = [...PROJECT_DATA_LABEL];
const CHAR_COUNT = PROJECT_DATA_CHARS.length;

const PHOTOSHOP_LABEL = 'Photoshop' as const;
const DAVINCI_LABEL = 'DaVinci Resolve' as const;

const PD_SCROLL_START = 0.12;
const PD_SCROLL_END = 0.52;

const PROJECT_REVEAL: readonly [number, number] = [0.14, 0.42];
const ROLE_REVEAL: readonly [number, number] = [0.36, 0.64];
const CONTRIBUTION_REVEAL: readonly [number, number] = [0.46, 0.72];
const TOOLS_CARD_REVEAL: readonly [number, number] = [0.52, 0.88];

function ScrollRevealSection({
  scrollYProgress,
  range,
  children,
  className,
}: {
  scrollYProgress: MotionValue<number>;
  range: readonly [number, number];
  children: React.ReactNode;
  className?: string;
}) {
  const [start, end] = range;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
  const y = useTransform(scrollYProgress, [start, end], [36, 0], { clamp: true });
  const scale = useTransform(scrollYProgress, [start, end], [0.94, 1], { clamp: true });
  const rotateX = useTransform(scrollYProgress, [start, end], [4, 0], { clamp: true });
  return (
    <motion.div
      className={className}
      style={{
        opacity,
        y,
        scale,
        rotateX,
        transformPerspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
}

function ScrollRevealChar({
  char,
  revealIndex,
  scrollYProgress,
  totalChars,
  rangeStart,
  rangeEnd,
  className,
  dimOpacity,
  fullOpacity,
}: {
  char: string;
  revealIndex: number;
  scrollYProgress: MotionValue<number>;
  totalChars: number;
  rangeStart: number;
  rangeEnd: number;
  className?: string;
  dimOpacity?: number;
  fullOpacity?: number;
}) {
  const dim = dimOpacity ?? 0.12;
  const full = fullOpacity ?? 1;
  const span = rangeEnd - rangeStart;
  const t0 = rangeStart + (revealIndex / totalChars) * span;
  const t1 = rangeStart + ((revealIndex + 1) / totalChars) * span;
  const opacity = useTransform(scrollYProgress, [t0, t1], [dim, full], { clamp: true });

  return (
    <motion.span
      style={{ opacity }}
      className={['inline-block', className].filter(Boolean).join(' ')}
      aria-hidden
    >
      {char === ' ' ? '\u00a0' : char}
    </motion.span>
  );
}

function ProjectDataVerticalTitle({
  scrollYProgress,
  className,
}: {
  scrollYProgress: MotionValue<number>;
  className?: string;
}) {
  return (
    <h2
      aria-label="Project Data"
      className={`vertical-text relative font-serif italic tracking-wider [font-variant-ligatures:none] ${className ?? ''}`}
    >
      {PROJECT_DATA_CHARS.map((c, i) => (
        <ScrollRevealChar
          key={`pd-v-${i}`}
          char={c}
          revealIndex={CHAR_COUNT - 1 - i}
          scrollYProgress={scrollYProgress}
          totalChars={CHAR_COUNT}
          rangeStart={PD_SCROLL_START}
          rangeEnd={PD_SCROLL_END}
          className="text-white"
        />
      ))}
    </h2>
  );
}

function ProjectDataHorizontalTitle({
  scrollYProgress,
  className,
}: {
  scrollYProgress: MotionValue<number>;
  className?: string;
}) {
  return (
    <h2
      aria-label="Project Data"
      className={`relative min-h-[1.15em] font-serif italic text-white [font-variant-ligatures:none] ${className ?? ''}`}
    >
      {PROJECT_DATA_CHARS.map((c, i) => (
        <ScrollRevealChar
          key={`pd-h-${i}`}
          char={c}
          revealIndex={CHAR_COUNT - 1 - i}
          scrollYProgress={scrollYProgress}
          totalChars={CHAR_COUNT}
          rangeStart={PD_SCROLL_START}
          rangeEnd={PD_SCROLL_END}
          className="text-white"
        />
      ))}
    </h2>
  );
}

function ToolsCardReveal({
  scrollYProgress,
  children,
}: {
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const [start, end] = TOOLS_CARD_REVEAL;
  const maxWidth = useTransform(scrollYProgress, [start, end], [0, 560], { clamp: true });
  const opacity = useTransform(
    scrollYProgress,
    [start, start + (end - start) * 0.2],
    [0.92, 1],
    { clamp: true }
  );
  const cardY = useTransform(scrollYProgress, [start, end], [12, 0], { clamp: true });
  return (
    <motion.div
      className="ml-4 min-w-0 overflow-hidden"
      style={{ maxWidth, opacity, y: cardY }}
    >
      <div className="inline-block w-max rounded-sm bg-white p-4 text-black [color-scheme:light]">
        {children}
      </div>
    </motion.div>
  );
}

function RevealHairline({
  scrollYProgress,
  range,
  origin,
}: {
  scrollYProgress: MotionValue<number>;
  range: readonly [number, number];
  origin: 'left' | 'right';
}) {
  const [start, end] = range;
  const scaleX = useTransform(
    scrollYProgress,
    [start, start + (end - start) * 0.45],
    [0, 1],
    { clamp: true }
  );
  const opacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1], {
    clamp: true,
  });
  return (
    <motion.div
      className="h-0.5 w-24 bg-white md:w-28"
      style={{
        scaleX,
        opacity,
        transformOrigin: origin === 'left' ? 'left center' : 'right center',
      }}
      aria-hidden
    />
  );
}

function ToolsColumnAccent({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const [start] = TOOLS_CARD_REVEAL;
  const scaleY = useTransform(scrollYProgress, [start - 0.08, start + 0.2], [0.35, 1], {
    clamp: true,
  });
  return (
    <motion.div
      className="h-20 w-[2px] origin-top bg-white/70"
      style={{ scaleY }}
      aria-hidden
    />
  );
}

export type GameOverProjectDataProps = {
  scrollYProgress: MotionValue<number>;
};

export const GameOverProjectData = forwardRef<HTMLElement, GameOverProjectDataProps>(
  function GameOverProjectData({ scrollYProgress }, ref) {
    return (
      <section
        ref={ref}
        className="border-t border-white/10 bg-black py-24 px-6 md:px-12 lg:px-24"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:gap-24">
          <div className="relative hidden md:flex md:items-start md:self-start md:sticky md:top-24">
            <ProjectDataVerticalTitle
              scrollYProgress={scrollYProgress}
              className="text-6xl md:text-8xl"
            />
          </div>
          <div className="relative mb-8 md:hidden">
            <ProjectDataHorizontalTitle
              scrollYProgress={scrollYProgress}
              className="text-4xl"
            />
          </div>
          <div className="flex-1 space-y-16 pt-8">
            <div className="flex flex-col gap-20 md:gap-28 lg:ml-auto lg:max-w-3xl">
              <ScrollRevealSection
                scrollYProgress={scrollYProgress}
                range={PROJECT_REVEAL}
                className="flex max-w-xl flex-col items-start self-start"
              >
                <RevealHairline
                  scrollYProgress={scrollYProgress}
                  range={PROJECT_REVEAL}
                  origin="left"
                />
                <h4 className="mt-4 font-serif text-xl font-bold text-white md:text-2xl">
                  Project
                </h4>
                <p className="mt-4 max-w-md font-serif text-sm leading-relaxed text-white/70">
                  Game Over — The Silent Struggle of Gaming Addiction
                </p>
              </ScrollRevealSection>
              <ScrollRevealSection
                scrollYProgress={scrollYProgress}
                range={ROLE_REVEAL}
                className="flex max-w-xl flex-col items-end self-end text-right"
              >
                <RevealHairline
                  scrollYProgress={scrollYProgress}
                  range={ROLE_REVEAL}
                  origin="right"
                />
                <h4 className="mt-4 font-serif text-xl font-bold text-white md:text-2xl">
                  Role
                </h4>
                <p className="mt-4 max-w-md font-serif text-sm leading-relaxed text-white/70">
                  Script Writer, Director of Photography, Video Editor
                </p>
              </ScrollRevealSection>
              <ScrollRevealSection
                scrollYProgress={scrollYProgress}
                range={CONTRIBUTION_REVEAL}
                className="flex max-w-xl flex-col items-end self-end text-right"
              >
                <RevealHairline
                  scrollYProgress={scrollYProgress}
                  range={CONTRIBUTION_REVEAL}
                  origin="right"
                />
                <h4 className="mt-4 font-serif text-xl font-bold text-white md:text-2xl">
                  My contribution
                </h4>
                <ul className="mt-4 max-w-md list-disc list-inside space-y-2 font-serif text-sm leading-relaxed text-white/70">
                  <li>Wrote the narrative concept and script focused on gaming addiction awareness.</li>
                  <li>Directed cinematography and shot planning to match the project tone.</li>
                  <li>Edited and finished the video in post-production for final delivery.</li>
                </ul>
              </ScrollRevealSection>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-0">
                <div className="flex shrink-0 items-center gap-0">
                  <ToolsColumnAccent scrollYProgress={scrollYProgress} />
                  <div className="vertical-text ml-2 h-16 text-xs font-bold uppercase tracking-widest text-white">
                    Tools
                  </div>
                </div>
                <ToolsCardReveal scrollYProgress={scrollYProgress}>
                  <div className="flex gap-4 whitespace-nowrap">
                    <motion.div
                      className="flex flex-col items-center gap-2"
                      aria-label={PHOTOSHOP_LABEL}
                      whileHover={{ y: -3, scale: 1.06 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <PhotoshopLogo className="h-8 w-8 shrink-0" />
                      <span className="text-[10px] font-medium text-black">
                        {PHOTOSHOP_LABEL}
                      </span>
                    </motion.div>
                    <div className="w-px shrink-0 bg-gray-200" />
                    <motion.div
                      className="flex flex-col items-center gap-2"
                      aria-label={DAVINCI_LABEL}
                      whileHover={{ y: -3, scale: 1.06 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <DaVinciResolveLogo className="h-8 w-8 shrink-0" />
                      <span className="text-[10px] font-medium text-black">
                        {DAVINCI_LABEL}
                      </span>
                    </motion.div>
                  </div>
                </ToolsCardReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

GameOverProjectData.displayName = 'GameOverProjectData';
