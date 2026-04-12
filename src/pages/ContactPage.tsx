import { useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LinkedinIcon, InstagramIcon, MailIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const MotionLink = motion.create(Link);

const ease = [0.22, 1, 0.36, 1] as const;

/** Deliver to zengawangsc@gmail.com: create a free key at https://web3forms.com using that address, then set VITE_WEB3FORMS_ACCESS_KEY in `.env`. */
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as
  | string
  | undefined;

const SOCIALS = [
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

export function ContactPage() {
  const mainRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState('');

  const configured = Boolean(WEB3FORMS_ACCESS_KEY?.trim());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) {
      setStatus('error');
      setErrorMessage(
        'Add VITE_WEB3FORMS_ACCESS_KEY to your .env file (see web3forms.com).'
      );
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject:
            subject.trim() ||
            `Portfolio contact from ${name.trim() || 'visitor'}`,
          name: name.trim(),
          from_name: name.trim(),
          email: email.trim(),
          replyto: email.trim(),
          message: message.trim(),
          botcheck: '',
        }),
      });

      const data = (await res.json()) as { success?: boolean; message?: string };

      if (data.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage(
          data.message || 'Something went wrong. Please try again or email directly.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Check your connection and try again.');
    }
  }

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
          <div className="mx-auto w-full max-w-[1600px] px-6 pb-16 pt-14 md:px-12 md:pb-20 md:pt-20 lg:px-16">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
            >
              <p className="mb-3 font-serif text-xs font-bold uppercase tracking-[0.32em] text-white/50 md:text-sm">
                Zensuki
              </p>
              <h1 className="font-serif text-[clamp(2.5rem,8vw,4rem)] font-black uppercase leading-[0.95] tracking-tighter text-white">
                Contact
              </h1>
              <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-white/72 md:text-xl">
                Send a message—submissions go to{' '}
                <a
                  href="mailto:zengawangsc@gmail.com"
                  className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                >
                  zengawangsc@gmail.com
                </a>
                .
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[1600px] gap-14 px-6 py-14 md:grid-cols-2 md:gap-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <motion.section
            aria-labelledby="contact-form-heading"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
          >
            <h2
              id="contact-form-heading"
              className="font-serif text-xl font-bold uppercase tracking-tight text-white md:text-2xl"
            >
              Message
            </h2>
            {!configured ? (
              <p className="mt-4 rounded-lg border border-amber-500/35 bg-amber-500/10 px-4 py-3 font-sans text-sm leading-relaxed text-amber-100/95">
                To enable sending: sign up at{' '}
                <a
                  href="https://web3forms.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  web3forms.com
                </a>{' '}
                with <strong className="font-semibold">zengawangsc@gmail.com</strong>,
                copy your access key, and add{' '}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
                  VITE_WEB3FORMS_ACCESS_KEY=…
                </code>{' '}
                to <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">.env</code>{' '}
                in the project root, then restart the dev server.
              </p>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 font-sans text-base text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40 focus:ring-1 focus:ring-white/25"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 font-sans text-base text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40 focus:ring-1 focus:ring-white/25"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 font-sans text-base text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40 focus:ring-1 focus:ring-white/25"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 font-sans text-base leading-relaxed text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40 focus:ring-1 focus:ring-white/25"
                  placeholder="Tell me about your project…"
                />
              </div>

              {status === 'error' ? (
                <p
                  className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-100/95"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}
              {status === 'success' ? (
                <p
                  className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 font-sans text-sm text-emerald-100/95"
                  role="status"
                >
                  Thanks—your message was sent. I&apos;ll get back to you soon.
                </p>
              ) : null}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-white bg-white px-8 py-3.5 font-serif text-xs font-bold uppercase tracking-[0.22em] text-black transition-colors hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[200px]"
                whileHover={reduce || status === 'sending' ? undefined : { scale: 1.02 }}
                whileTap={reduce || status === 'sending' ? undefined : { scale: 0.98 }}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </motion.button>
            </form>
          </motion.section>

          <motion.aside
            className="flex flex-col justify-start border-t border-white/10 pt-14 md:border-t-0 md:border-l md:pl-10 md:pt-0 lg:pl-16"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <h2 className="font-serif text-xl font-bold uppercase tracking-tight text-white md:text-2xl">
              Elsewhere
            </h2>
            <p className="mt-4 max-w-md font-serif text-base leading-relaxed text-white/65">
              Prefer social or Gmail? Reach out here too.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white text-white transition-all duration-300 hover:bg-white hover:text-black md:h-16 md:w-16"
                >
                  <social.icon size={24} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <MotionLink
              to="/"
              className="mt-12 inline-flex font-serif text-sm font-bold uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white"
              whileHover={reduce ? undefined : { x: -4 }}
            >
              ← Back home
            </MotionLink>
          </motion.aside>
        </div>

        <Footer />
      </main>
    </div>
  );
}
