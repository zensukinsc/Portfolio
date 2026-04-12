import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LinkedinIcon, InstagramIcon, MailIcon } from 'lucide-react';

export function Contact() {
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
      href:
        'https://mail.google.com/mail/?view=cm&fs=1&to=zengawangsc@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <section
      id="contact"
      className="box-border flex h-[100vh] max-h-[100vh] min-h-[100vh] w-full shrink-0 flex-col items-center justify-center overflow-hidden border-t border-white/10 px-6 pt-24 text-center md:pt-28">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8
          }}>
          
          <p className="text-xl md:text-3xl font-serif italic text-white/90 mb-6">
            Let me help you bring your creativity to life!
          </p>
          <div className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-white uppercase tracking-tighter mb-12">
            GET IN TOUCH!
          </div>
          <div className="flex justify-center items-center space-x-4 md:space-x-6">
            {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 group">
              
                <social.icon
                size={24}
                className="group-hover:scale-110 transition-transform" />
              
              </a>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-10 inline-block font-serif text-sm font-bold uppercase tracking-[0.2em] text-white/60 underline decoration-white/25 underline-offset-[10px] transition-colors hover:text-white hover:decoration-white/60 md:text-base"
          >
            Send a message
          </Link>
        </motion.div>
    </section>);

}
