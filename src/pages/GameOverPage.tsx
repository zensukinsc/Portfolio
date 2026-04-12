import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { GameOverHero } from '../case-studies/game-over/Hero';
import { GameOverProjectData } from '../case-studies/game-over/ProjectData';
import { GameOverKeyArt } from '../case-studies/game-over/KeyArt';
import { GameOverSkills } from '../case-studies/game-over/Skills';
import { GameOverResult } from '../case-studies/game-over/Result';
import { GameOverDesignJourney } from '../case-studies/game-over/DesignJourney';
import { GameOverGallery } from '../case-studies/game-over/Gallery';
import { GameOverFooter } from '../case-studies/game-over/Footer';

export function GameOverPage() {
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
        <GameOverHero />
        <GameOverProjectData
          ref={projectDataSectionRef}
          scrollYProgress={projectDataScrollProgress}
        />
        <GameOverKeyArt scrollContainerRef={mainRef} />
        <GameOverSkills scrollContainerRef={mainRef} />
        <GameOverResult scrollContainerRef={mainRef} />
        <GameOverDesignJourney scrollContainerRef={mainRef} />
        <GameOverGallery scrollContainerRef={mainRef} />
        <GameOverFooter />
      </motion.main>
    </motion.div>
  );
}
