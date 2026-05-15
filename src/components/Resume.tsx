import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

export const RESUME_HREF = '/resume.pdf';
export const RESUME_FILENAME = 'Resume.pdf';

const ease = [0.22, 1, 0.36, 1] as const;

const rootVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
} as const;

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.85, ease },
  },
} as const;

const titleVariants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease },
  },
} as const;

const linkVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
} as const;

export function Resume() {
  const reduce = useReducedMotion();

  return (
    <section
      id="resume"
      className="relative shrink-0 overflow-hidden border-t border-white/10 px-6 py-[min(28vh,12rem)] md:px-10 md:py-[min(32vh,14rem)]"
      aria-label="Resume"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,255,255,0.045),transparent_70%)]"
        aria-hidden
        initial={false}
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.03, 1],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto flex max-w-lg flex-col items-center text-center">
        <motion.div
          className="flex w-full flex-col items-center"
          variants={reduce ? undefined : rootVariants}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-25%' }}
        >
          <motion.div
            variants={reduce ? undefined : lineVariants}
            className="mb-10 h-px w-12 origin-center bg-gradient-to-r from-transparent via-white/35 to-transparent md:mb-12 md:w-14"
            style={{ transformOrigin: '50% 50%' }}
            aria-hidden
          />

          <motion.h2
            variants={reduce ? undefined : titleVariants}
            className="font-serif text-[clamp(2.5rem,8vw,3.75rem)] font-extralight tracking-[-0.02em] text-white"
          >
            Resume
          </motion.h2>

          <motion.div variants={reduce ? undefined : linkVariants} className="mt-12 md:mt-14">
            <motion.a
              href={RESUME_HREF}
              download={RESUME_FILENAME}
              className="group inline-flex items-center gap-2 border-b border-white/15 pb-1 text-[11px] font-medium uppercase tracking-[0.38em] text-white/45 transition-colors duration-500 hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-black md:text-xs md:tracking-[0.42em]"
              whileHover={reduce ? undefined : { y: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span>Download PDF</span>
              <motion.span
                className="inline-flex"
                aria-hidden
                animate={
                  reduce
                    ? undefined
                    : { x: [0, 3, 0], y: [0, -2, 0] }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowDownRight
                  className="h-3.5 w-3.5 opacity-60 transition-opacity duration-300 group-hover:opacity-100 md:h-4 md:w-4"
                  strokeWidth={1.5}
                />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
