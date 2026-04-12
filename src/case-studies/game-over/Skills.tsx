import { useRef, type RefObject } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

const SKILLS = [
  'SCRIPTWRITING',
  'CINEMATOGRAPHY',
  'LIGHTING',
  'INTERVIEW FILMING',
  'VIDEO EDITING',
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const headerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
} as const;

const headerRule = {
  hidden: { opacity: 0, scaleX: 0 },
  show: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.55, ease },
  },
} as const;

const headerTitle = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
} as const;

function SkillLine({
  index,
  total,
  scrollYProgress,
  reduceMotion,
  children,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
  children: React.ReactNode;
}) {
  const n = total;
  const opacity = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1 / n, 1] : [0, index / n, (index + 1) / n, 1],
    index === 0 ? [0.25, 1, 1] : [0.25, 0.25, 1, 1]
  );
  const letterSpacing = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1 / n, 1] : [0, index / n, (index + 1) / n, 1],
    index === 0
      ? ['0.02em', '0.12em', '0.12em']
      : ['0.02em', '0.02em', '0.1em', '0.1em']
  );
  const skewX = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1 / n, 1] : [0, index / n, (index + 1) / n, 1],
    index === 0 ? [2, 0, 0] : [2, 2, 0, 0]
  );

  return (
    <motion.div
      style={{ opacity, letterSpacing, skewX }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              x: 6,
              textShadow: '0 0 24px rgba(255,255,255,0.2)',
              transition: { type: 'spring', stiffness: 380, damping: 24 },
            }
      }
      className="cursor-default font-serif text-3xl text-white md:text-5xl lg:text-6xl"
    >
      {children}
    </motion.div>
  );
}

export type GameOverSkillsProps = {
  scrollContainerRef: RefObject<HTMLElement | null>;
};

export function GameOverSkills({ scrollContainerRef }: GameOverSkillsProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: sectionRef,
    offset: ['start end', 'end start'],
    layoutEffect: false,
  });

  const bgGlow = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.75],
    [0.03, 0.1, 0.04]
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-6 py-32 text-white">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,255,255,0.06),transparent)]"
        style={{ opacity: bgGlow }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          variants={reduce ? undefined : headerContainer}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{ once: true, margin: '-40px' }}
          className="mb-16 flex flex-col items-center"
        >
          <motion.div
            variants={reduce ? undefined : headerRule}
            className="mb-6 h-[2px] w-8 origin-center bg-white"
          />
          <motion.h2
            variants={reduce ? undefined : headerTitle}
            className="font-serif text-4xl font-bold text-white md:text-5xl"
          >
            Skills Used
          </motion.h2>
        </motion.div>
        <div className="flex flex-col space-y-4 md:space-y-6">
          {SKILLS.map((skill, index) => (
            <SkillLine
              key={skill}
              index={index}
              total={SKILLS.length}
              scrollYProgress={scrollYProgress}
              reduceMotion={!!reduce}
            >
              {skill}
            </SkillLine>
          ))}
        </div>
      </div>
    </section>
  );
}
