import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { RESUME_FILENAME, RESUME_HREF } from '../components/Resume';

const MotionLink = motion.create(Link);

const ease = [0.22, 1, 0.36, 1] as const;

const sectionReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease },
  },
};

const lineReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.85, ease },
  },
};

const FOCUS_AREAS = [
  {
    title: 'User-centered discovery',
    body: 'I map how real people think, choose, and act around your product—interviews, flows, and edge cases—so we design for behavior, not assumptions. That focus is what turns a startup’s first impression into something people trust.',
  },
  {
    title: 'Experiences that earn credibility',
    body: 'Credibility shows up in clarity, consistency, and care: hierarchy, motion, and craft that signal you are serious. I shape interfaces and narratives so early-stage teams look as capable as they are.',
  },
  {
    title: 'Build alongside founders',
    body: 'From Figma to production, I stay close to the build—responsive UI, states, and handoff that match the story we are telling. Startups move fast; I help you ship experiences that stay coherent as you grow.',
  },
] as const;

const TOOLS = [
  'Figma',
  'React',
  'VS Code',
  'Adobe Photoshop',
  'DaVinci Resolve',
  'Lightroom',
  'Premiere Pro',
] as const;

export function AboutPage() {
  const mainRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const containerVariants = reduce
    ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
    : sectionReveal;
  const itemVariants = reduce
    ? {
        hidden: { opacity: 1, y: 0, filter: 'blur(0px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      }
    : fadeUp;
  const lineVariants = reduce
    ? { hidden: { scaleX: 1, opacity: 1 }, visible: { scaleX: 1, opacity: 1 } }
    : lineReveal;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#0a0a0a] font-sans text-white selection:bg-white selection:text-black">
      <Navbar scrollContainerRef={mainRef} solidHeader />
      <main
        ref={mainRef}
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden scroll-pt-24 md:scroll-pt-28"
        tabIndex={-1}
      >
        <div
          className="w-full border-b border-white/10"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 55% at 12% 18%, rgba(255,255,255,0.08), transparent 58%)',
          }}
        >
          <div className="mx-auto w-full max-w-[1600px] px-6 pb-20 pt-14 md:px-12 md:pb-28 md:pt-20 lg:px-16">
            <motion.div
              className="w-full text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={itemVariants}
                className="mb-4 font-serif text-xs font-bold uppercase tracking-[0.32em] text-white/50 md:text-sm"
              >
                Zensuki
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="font-serif text-[clamp(2.75rem,9vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tighter text-white"
              >
                About
                <span className="text-outline text-transparent"> me</span>
              </motion.h1>
              <motion.div
                variants={lineVariants}
                className="mt-10 h-px w-full max-w-2xl bg-gradient-to-r from-white/45 to-transparent md:mt-12 lg:max-w-3xl"
                style={{ transformOrigin: '0% 50%' }}
                aria-hidden
              />
              <motion.p
                variants={itemVariants}
                className="mt-10 max-w-4xl font-serif text-lg leading-[1.85] text-white/88 md:text-xl lg:max-w-5xl"
              >
                I&apos;m{' '}
                <strong className="font-bold text-white">Ngawang Samten Chophel</strong>
                . I help startups build{' '}
                <strong className="font-bold text-white">credibility</strong> through{' '}
                <strong className="font-bold text-white">user-centered experiences</strong>
                —digital products, sites, and flows that feel intentional, clear, and
                worthy of trust from the first interaction.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-4xl font-serif text-lg leading-[1.85] text-white/72 md:text-xl lg:max-w-5xl"
              >
                Under the studio name Zensuki, I pair interface design with hands-on
                front-end work so strategy, visuals, and implementation stay aligned.
                Whether you are proving traction to investors or winning your first
                customers, the experience people have with your brand should reinforce
                that you are built to last.
              </motion.p>
            </motion.div>
          </div>
        </div>

        <section
          className="w-full border-b border-white/10 px-6 py-16 md:px-12 md:py-24 lg:px-16"
          aria-labelledby="about-focus-heading"
        >
          <div className="mx-auto w-full max-w-[1600px] text-left">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
            >
              <motion.h2
                id="about-focus-heading"
                variants={itemVariants}
                className="font-serif text-2xl font-bold uppercase tracking-tight text-white md:text-3xl"
              >
                How I work
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mt-4 max-w-4xl font-serif text-base leading-relaxed text-white/65 md:text-lg lg:max-w-5xl"
              >
                Every engagement is built around one thread: understand users, design
                for trust, and ship without diluting the story. Here is how that shows
                up in practice.
              </motion.p>
              <ul className="mt-12 flex w-full flex-col gap-12 md:gap-14">
                {FOCUS_AREAS.map(({ title, body }, i) => (
                  <motion.li
                    key={title}
                    variants={itemVariants}
                    className="w-full border-t border-white/10 pt-10 first:border-t-0 first:pt-0 md:pt-12 md:first:pt-0"
                  >
                    <span className="block font-sans text-xs font-semibold tabular-nums text-white/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-bold text-white md:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-4xl font-serif text-base leading-relaxed text-white/72 md:text-lg lg:max-w-5xl">
                      {body}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section
          className="w-full px-6 py-16 md:px-12 md:py-24 lg:px-16"
          aria-labelledby="about-tools-heading"
        >
          <div className="mx-auto w-full max-w-[1600px] text-left">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
            >
              <motion.h2
                id="about-tools-heading"
                variants={itemVariants}
                className="font-serif text-2xl font-bold uppercase tracking-tight text-white md:text-3xl"
              >
                Tools I reach for
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mt-4 max-w-4xl font-serif text-base leading-relaxed text-white/65 md:text-lg lg:max-w-5xl"
              >
                Design and prototyping, production UI in code, and the creative suite
                I use when imagery and motion need the same polish as the product.
              </motion.p>
              <motion.ul
                variants={itemVariants}
                className="mt-10 flex w-full flex-wrap justify-start gap-3 md:gap-4"
              >
                {TOOLS.map((tool) => (
                  <li key={tool}>
                    <span className="inline-block rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-white/80 md:text-sm">
                      {tool}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </section>

        <section className="w-full border-t border-white/10 px-6 py-16 md:px-12 md:py-20 lg:px-16">
          <motion.div
            className="mx-auto flex w-full max-w-[1600px] flex-col items-start gap-8 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-10"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="max-w-xl font-serif text-lg text-white/80 md:text-xl lg:max-w-2xl">
              Want to see the work or start a conversation?
            </p>
            <div className="flex flex-wrap gap-4">
              <MotionLink
                to="/projects"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-white bg-white px-6 py-3 font-serif text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                View projects
              </MotionLink>
              <MotionLink
                to="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-white/35 px-6 py-3 font-serif text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                Contact
              </MotionLink>
            </div>
          </motion.div>
        </section>

        <section
          className="w-full border-t border-white/10 px-6 py-14 md:px-12 md:py-16 lg:px-16"
          aria-labelledby="about-resume-heading"
        >
          <div className="mx-auto flex max-w-[1600px] flex-col gap-6 rounded-2xl border border-white/15 bg-white/[0.04] p-8 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
            <div className="max-w-xl">
              <h2
                id="about-resume-heading"
                className="font-serif text-xl font-bold uppercase tracking-tight text-white md:text-2xl"
              >
                Resume
              </h2>
              <p className="mt-3 font-serif text-base leading-relaxed text-white/65 md:text-lg">
                One-page overview for recruiters and hiring managers.
              </p>
            </div>
            <a
              href={RESUME_HREF}
              download={RESUME_FILENAME}
              className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-full bg-white px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              Download PDF
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
