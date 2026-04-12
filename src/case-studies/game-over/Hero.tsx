import { ArrowLeftIcon, ArrowDownIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const MotionLink = motion.create(Link);

const easeOut = [0.22, 1, 0.36, 1] as const;

const heroStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
} as const;

export function GameOverHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-black px-6 pt-24 md:px-10">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.06),transparent_55%)]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-24 top-1/3 h-64 w-64 rounded-full bg-white/[0.03] blur-3xl md:h-96 md:w-96"
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: easeOut }}
        aria-hidden
      />

      <motion.div
        variants={reduce ? undefined : heroStagger}
        initial={reduce ? false : 'hidden'}
        animate={reduce ? { opacity: 1 } : 'show'}
        className="relative z-10 mt-6 mb-8 flex items-start gap-4 md:gap-6 lg:gap-8"
      >
        <motion.div
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : undefined}
          animate={reduce ? { opacity: 1 } : undefined}
          className="shrink-0"
        >
          <MotionLink
            to="/projects"
            className="inline-flex rounded-full p-1 text-white"
            aria-label="Back to projects"
            whileHover={reduce ? undefined : { scale: 1.06, x: -2 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <motion.span
              className="relative block"
              animate={
                reduce
                  ? undefined
                  : {
                      boxShadow: [
                        '0 0 0 0 rgba(255,255,255,0)',
                        '0 0 0 8px rgba(255,255,255,0.06)',
                        '0 0 0 0 rgba(255,255,255,0)',
                      ],
                    }
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowLeftIcon className="relative z-10 h-10 w-10 stroke-[1.5] text-white md:h-12 md:w-12" />
            </motion.span>
          </MotionLink>
        </motion.div>

        <motion.div
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : undefined}
          animate={reduce ? { opacity: 1 } : undefined}
          className="min-w-0 max-w-3xl flex-1 pt-0.5 md:pt-[40px]"
        >
          <motion.h1
            className="text-3xl font-serif font-light leading-snug tracking-tight text-white/90 md:text-4xl lg:text-5xl"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: easeOut }}
            >
              Level Up or
            </motion.span>
            {' '}
            <motion.span
              className="inline-block font-serif font-semibold text-white"
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.32 }}
            >
              Burn Out
            </motion.span>
            <motion.span
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4, ease: easeOut }}
            >
              : Exploring{' '}
            </motion.span>
            <motion.span
              className="inline-block font-serif font-semibold text-white"
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.44 }}
            >
              Gaming Addiction
            </motion.span>
            <motion.span
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.52, ease: easeOut }}
            >
              {' '}
              Among{' '}
            </motion.span>
            <motion.span
              className="inline-block font-serif font-semibold text-white"
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.56 }}
            >
              Bhutanese Youth
            </motion.span>
            <motion.span
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.62, ease: easeOut }}
            >
              .
            </motion.span>
          </motion.h1>
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex flex-1 flex-col pb-16">
        <div className="mt-auto flex items-end justify-between gap-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: easeOut }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDownIcon className="h-10 w-10 stroke-[1.5] text-white md:h-12 md:w-12" />
            </motion.div>
          </motion.div>

          <div className="text-right">
            <motion.h2
              className="font-serif text-[clamp(1.75rem,7vw,4.25rem)] font-black leading-[1.05] tracking-[0.04em] text-white md:tracking-[0.08em]"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: easeOut }}
            >
              <span className="whitespace-nowrap">ESPORTS DOCUMENTARY</span>
            </motion.h2>
          </div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 hidden h-px w-[min(40vw,12rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent md:block"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.9, ease: easeOut }}
        aria-hidden
      />
    </section>
  );
}
