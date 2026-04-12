import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const MotionLink = motion.create(Link);

const ease = [0.22, 1, 0.36, 1] as const;

const footerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
} as const;

export function InstaKillFooter() {
  const currentYear = new Date().getFullYear();
  const reduce = useReducedMotion();

  return (
    <motion.footer
      className="border-t border-white/10 bg-black"
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease }}
    >
      <motion.div
        variants={reduce ? undefined : footerVariants}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, margin: '-20px' }}
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row"
      >
        <MotionLink
          to="/projects/namas-design-build"
          variants={reduce ? undefined : itemVariants}
          className="group flex items-center gap-4 text-white/60 transition-colors hover:text-white"
          whileHover={reduce ? undefined : { x: -4 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
        >
          <motion.span
            animate={reduce ? undefined : { x: [0, -3, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-2" />
          </motion.span>
          <span className="font-serif text-sm uppercase tracking-widest">Previous</span>
        </MotionLink>
        <motion.p
          variants={reduce ? undefined : itemVariants}
          className="text-center font-serif text-xs italic text-white/40"
        >
          Copyright @{currentYear} Designed by Ngawang Samten Chophel
        </motion.p>
        <MotionLink
          to="/projects/game-over"
          variants={reduce ? undefined : itemVariants}
          className="group flex items-center gap-4 text-white/60 transition-colors hover:text-white"
          whileHover={reduce ? undefined : { x: 4 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
        >
          <span className="font-serif text-sm uppercase tracking-widest">Next</span>
          <motion.span
            animate={reduce ? undefined : { x: [0, 3, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
          </motion.span>
        </MotionLink>
      </motion.div>
    </motion.footer>
  );
}
