import { motion, useReducedMotion } from 'framer-motion';
import { HomeCtaButtons } from './HomeCtaButtons';

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeMidCta() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative w-full shrink-0 overflow-hidden border-y border-white/10 bg-white/[0.04] px-6 py-16 md:px-12 md:py-24 lg:px-16"
      aria-labelledby="home-mid-cta-heading"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]"
        initial={false}
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.35, 0.7, 0.35],
                scale: [1, 1.03, 1],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: 0.65, ease }}
      >
        <h2
          id="home-mid-cta-heading"
          className="font-serif text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl md:text-4xl"
        >
          Explore work & reach out
        </h2>
        <p className="mt-4 max-w-lg font-serif text-base leading-relaxed text-white/75 md:text-lg">
          Case studies, branding, and film—then say hello when you&apos;re ready to
          collaborate.
        </p>
        <div className="mt-10 flex w-full justify-center">
          <HomeCtaButtons />
        </div>
      </motion.div>
    </section>
  );
}
