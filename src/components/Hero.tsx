import { motion } from 'framer-motion';
import { Emblem } from './Emblem';

/** Spring aligned with Emblem `drawLine` (outer ring custom ≈ 0.3); start via parent `delayChildren` */
const lineTransition = {
  type: 'spring' as const,
  duration: 2,
  bounce: 0,
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: lineTransition,
  },
};

const compositionVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.26,
      staggerChildren: 0.05,
    },
  },
};

const emblemFrameVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: 'easeOut',
    },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="box-border flex h-[100vh] max-h-[100vh] min-h-[100vh] w-full shrink-0 flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 pt-24 md:pt-28"
    >
      <motion.div
        className="relative flex w-full max-w-[100vw] items-center justify-center -translate-y-[30px]"
        variants={compositionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="pointer-events-none h-px min-w-0 flex-1 origin-right bg-white/40"
          variants={lineVariants}
          aria-hidden
        />

        <motion.div
          className="relative z-10 isolate shrink-0 rounded-full bg-[#0a0a0a] p-2 shadow-[0_0_0_1px_rgba(10,10,10,1)]"
          variants={emblemFrameVariants}
        >
          <Emblem className="h-[300px] w-[300px] md:h-[450px] md:w-[450px] lg:h-[550px] lg:w-[550px]" />
        </motion.div>

        <motion.div
          className="pointer-events-none h-px min-w-0 flex-1 origin-left bg-white/40"
          variants={lineVariants}
          aria-hidden
        />
      </motion.div>
    </section>
  );
}
