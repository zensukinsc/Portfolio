import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { NamasHero } from '../case-studies/namas/Hero';
import { NamasProjectData } from '../case-studies/namas/ProjectData';
import { NamasPreview } from '../case-studies/namas/Preview';
import { NamasSkills } from '../case-studies/namas/Skills';
import { NamasResult } from '../case-studies/namas/Result';
import { NamasDesignJourney } from '../case-studies/namas/DesignJourney';
import { NamasGallery } from '../case-studies/namas/Gallery';
import { NamasFooter } from '../case-studies/namas/Footer';

export function NamasDesignBuildPage() {
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
        <NamasHero />
        <NamasProjectData
          ref={projectDataSectionRef}
          scrollYProgress={projectDataScrollProgress}
        />
        <NamasPreview scrollContainerRef={mainRef} />
        <NamasSkills scrollContainerRef={mainRef} />
        <NamasResult scrollContainerRef={mainRef} />
        <NamasDesignJourney scrollContainerRef={mainRef} />
        <NamasGallery scrollContainerRef={mainRef} />
        <NamasFooter />
      </motion.main>
    </motion.div>
  );
}
