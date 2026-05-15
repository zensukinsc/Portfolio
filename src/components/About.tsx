import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

const easeOut = [0.22, 1, 0.36, 1] as const;

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

const leftColVariants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.88, ease: easeOut },
  },
};

const rightContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.95, ease: easeOut },
  },
};

const bulletVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const POINTS = [
  'Clear UX for products and marketing sites.',
  'Brand systems that stay consistent as you ship.',
  'Hands-on front-end so design matches the build.',
] as const;

export function About() {
  return (
    <section
      id="about"
      className="box-border w-full shrink-0 overflow-hidden border-t border-white/10 py-20 md:min-h-[100vh] md:max-h-none md:py-0 md:pt-28"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,255,255,0.06), transparent 55%)',
      }}
    >
      <div className="relative mx-auto min-h-0 w-full max-w-[1600px] px-6 py-4 md:min-h-[calc(100vh-7rem)] md:px-12 md:py-16 lg:px-16">
        <div
          className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 select-none md:block"
          aria-hidden
        >
          <span className="block translate-x-[8%] font-black leading-none tracking-tight text-outline opacity-[0.1] text-[clamp(3rem,14vw,10rem)]">
            Zensuki
          </span>
        </div>

        <motion.div
          className="grid items-start gap-12 md:grid-cols-12 md:items-center md:gap-10 lg:gap-12"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="md:col-span-5" variants={leftColVariants}>
            <p className="mb-4 font-serif text-xs font-bold uppercase tracking-[0.32em] text-white/50 sm:text-sm md:mb-5">
              Who I am
            </p>
            <h2 className="font-serif text-[clamp(2.75rem,11vw,6rem)] font-black uppercase leading-[0.9] tracking-tighter text-white md:leading-[0.86]">
              About
              <br />
              <span className="text-outline text-transparent">me</span>
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center md:col-span-7"
            variants={rightContainerVariants}
          >
            <motion.div
              className="h-px w-full max-w-md origin-left bg-gradient-to-r from-white/35 to-transparent"
              variants={lineVariants}
            />

            <ul className="mt-8 space-y-4 md:mt-10 md:space-y-5">
              {POINTS.map((line) => (
                <motion.li
                  key={line}
                  variants={bulletVariants}
                  className="flex gap-3 text-left md:gap-4"
                >
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/[0.06] text-emerald-300/95">
                    <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span className="max-w-xl font-serif text-base leading-snug text-white/88 md:text-lg md:leading-relaxed">
                    {line}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-10 md:mt-12 md:flex-row md:items-center md:justify-between md:pt-12"
              variants={ctaVariants}
            >
              <p className="max-w-sm font-serif text-sm leading-relaxed text-white/55 md:text-base">
                Longer story, tools, and how I work—on the full about page.
              </p>
              <MotionLink
                to="/about"
                className="group inline-flex min-h-[48px] items-center gap-3 self-start rounded-full border-2 border-white/40 px-6 py-3 font-serif text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/10 md:self-auto md:text-sm"
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              >
                Full about page
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </MotionLink>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
