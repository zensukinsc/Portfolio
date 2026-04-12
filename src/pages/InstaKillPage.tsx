import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { InstaKillHero } from '../case-studies/insta-kill/Hero';
import { InstaKillProjectData } from '../case-studies/insta-kill/ProjectData';
import { InstaKillAbout } from '../case-studies/insta-kill/About';
import { InstaKillSkills } from '../case-studies/insta-kill/Skills';
import { InstaKillResult } from '../case-studies/insta-kill/Result';
import { InstaKillDesignJourney } from '../case-studies/insta-kill/DesignJourney';
import { InstaKillGallery } from '../case-studies/insta-kill/Gallery';
import { InstaKillFooter } from '../case-studies/insta-kill/Footer';

export function InstaKillPage() {
  const mainRef = useRef<HTMLElement>(null);
  const projectDataSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: projectDataScrollProgress } = useScroll({
    container: mainRef,
    target: projectDataSectionRef,
    offset: ['start end', 'end start'],
    layoutEffect: false,
  });

  return (
    <motion.div
      className="flex h-full min-h-0 flex-col overflow-hidden bg-[#0a0a0a] text-white font-sans selection:bg-white selection:text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Navbar scrollContainerRef={mainRef} />
      <motion.main
        ref={mainRef}
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden scroll-pt-24 md:scroll-pt-28"
        tabIndex={-1}
        initial={{ opacity: 0.92, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <InstaKillHero />
        <InstaKillProjectData
          ref={projectDataSectionRef}
          scrollYProgress={projectDataScrollProgress}
        />
        <InstaKillAbout scrollContainerRef={mainRef} />
        <InstaKillSkills scrollContainerRef={mainRef} />
        <InstaKillResult scrollContainerRef={mainRef} />
        <InstaKillDesignJourney scrollContainerRef={mainRef} />
        <InstaKillGallery scrollContainerRef={mainRef} />
        <InstaKillFooter />
      </motion.main>
    </motion.div>
  );
}
