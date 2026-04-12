import { motion, useReducedMotion } from 'framer-motion';
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

const paragraphVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: easeOut },
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

export function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="box-border grid h-[100vh] max-h-[100vh] min-h-[100vh] w-full shrink-0 grid-cols-1 grid-rows-[minmax(0,1fr)] overflow-hidden border-t border-white/10 pt-24 md:pt-28"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,255,255,0.06), transparent 55%)',
      }}
    >
      <div
        className="col-start-1 row-start-1 flex h-full min-h-0 items-center justify-end self-stretch justify-self-stretch pr-0 pointer-events-none select-none"
        aria-hidden
      >
        <motion.div
          className="translate-x-[10%] sm:translate-x-[14%]"
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: easeOut }}
        >
          <motion.span
            className="block font-black leading-none tracking-tight text-outline opacity-[0.12] text-[clamp(2.75rem,10vw,11rem)] md:text-[clamp(3.5rem,12vw,13rem)]"
            animate={
              prefersReducedMotion ? undefined : { y: [0, -10, 0] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 11, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            Zensuki
          </motion.span>
        </motion.div>
      </div>

      <div className="col-start-1 row-start-1 z-10 flex h-full min-h-0 w-full items-center justify-center self-stretch justify-self-stretch px-6 md:px-12">
        <div className="mx-auto w-full max-w-[1600px]">
          <motion.div
            className="grid items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-10"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div className="lg:col-span-5" variants={leftColVariants}>
              <p className="mb-5 font-serif text-xs font-bold uppercase tracking-[0.32em] text-white/45 sm:text-sm md:mb-6 md:text-base lg:text-lg">
                Who I am
              </p>
              <h2 className="font-serif text-[clamp(3.5rem,13vw,9.5rem)] font-black uppercase leading-[0.86] tracking-tighter text-white">
                About
                <br />
                <span className="text-outline text-transparent">me</span>
              </h2>
            </motion.div>

            <motion.div
              className="flex flex-col justify-center lg:col-span-7"
              variants={rightContainerVariants}
            >
              <motion.div
                className="h-px w-full origin-left bg-gradient-to-r from-white/35 to-transparent lg:max-w-md"
                variants={lineVariants}
              />

              <motion.p
                className="mt-8 max-w-2xl font-serif text-lg leading-[1.75] text-white/88 md:text-xl lg:text-2xl"
                variants={paragraphVariants}
              >
                I create digital experiences where{' '}
                <strong className="font-bold text-white">creativity</strong> meets
                purpose. By designing clear and user-centered interfaces, I help
                startups turn{' '}
                <strong className="font-bold text-white">ideas</strong> into
                digital products that build{' '}
                <strong className="font-bold text-white">credibility</strong> and
                connect with users.
              </motion.p>

              <motion.div
                className="mt-12 flex justify-end border-t border-white/15 pt-10"
                variants={ctaVariants}
              >
                <MotionLink
                  to="/about"
                  className="group inline-flex items-center gap-3 font-serif text-sm font-bold uppercase tracking-[0.2em] text-white md:text-base"
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                >
                  Get to know me more
                  <motion.span
                    className="inline-block"
                    aria-hidden
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    whileHover={{ x: 6 }}
                  >
                    →
                  </motion.span>
                </MotionLink>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
