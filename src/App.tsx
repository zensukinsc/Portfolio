import React, { useLayoutEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectsPage } from './pages/ProjectsPage';
import { NamasDesignBuildPage } from './pages/NamasDesignBuildPage';
import { InstaKillPage } from './pages/InstaKillPage';
import { GameOverPage } from './pages/GameOverPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (pathname !== '/' || !hash) return;
    const id = hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  const mainScrollRef = useRef<HTMLElement>(null);
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#0a0a0a] text-white font-sans selection:bg-white selection:text-black">
      <Navbar scrollContainerRef={mainScrollRef} />
      <main
        ref={mainScrollRef}
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden scroll-pt-24 md:scroll-pt-28"
        tabIndex={-1}
      >
        <Hero />
        <About />
        <Services scrollContainerRef={mainScrollRef} />
        <Projects scrollContainerRef={mainScrollRef} />
        <Resume />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route
          path="/projects/namas-design-build"
          element={<NamasDesignBuildPage />}
        />
        <Route path="/projects/insta-kill" element={<InstaKillPage />} />
        <Route path="/projects/game-over" element={<GameOverPage />} />
      </Routes>
    </>
  );
}
