import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LinkedinIcon, InstagramIcon, MailIcon } from 'lucide-react';
import { HomeCtaButtons } from './HomeCtaButtons';

const socials = [
  {
    icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/ngawangsc/',
    label: 'LinkedIn',
  },
  {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/ngawangsc?igsh=Y2QxY3FwdW80aTF1',
    label: 'Instagram',
  },
  {
    icon: MailIcon,
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=zengawangsc@gmail.com',
    label: 'Email',
  },
] as const;

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      className="box-border relative flex min-h-[min(100dvh,900px)] w-full shrink-0 flex-col items-center justify-center gap-10 overflow-hidden border-t border-white/10 px-6 py-20 pt-28 text-center md:min-h-[100vh] md:gap-12 md:py-24 md:pt-32"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_45%,rgba(255,255,255,0.07),transparent_72%)]"
        initial={false}
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.3, 0.65, 0.3],
                y: [0, -10, 0],
              }
        }
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="relative flex w-full max-w-2xl flex-col items-center"
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
          Contact
        </p>
        <h2 className="mt-3 font-serif text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Let&apos;s work together
        </h2>
        <p className="mt-5 max-w-md font-serif text-base leading-relaxed text-white/75 md:text-lg">
          Tell me about your timeline, goals, and links—I&apos;ll reply by email.
        </p>

        <div className="mt-10 w-full">
          <HomeCtaButtons />
        </div>

        <div
          className="mt-12 w-full rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-8 md:mt-14 md:px-10 md:py-10"
          role="group"
          aria-label="Social profiles"
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Or connect here
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 md:gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-14 min-h-[48px] w-14 min-w-[48px] items-center justify-center rounded-full border-2 border-white text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black md:h-16 md:w-16"
              >
                <social.icon size={26} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <Link
          to="/contact"
          className="mt-10 inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/[0.06] px-8 py-3 font-sans text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-white/50 hover:bg-white/10"
        >
          Open contact form
        </Link>
      </motion.div>
    </section>
  );
}
