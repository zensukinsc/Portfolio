import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { HomeMidCta } from './components/HomeMidCta';
import { Footer } from './components/Footer';
import { ProjectsPage } from './pages/ProjectsPage';
import { NamasDesignBuildPage } from './pages/NamasDesignBuildPage';
import { InstaKillPage } from './pages/InstaKillPage';
import { GameOverPage } from './pages/GameOverPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GoogleAnalytics } from './analytics/GoogleAnalytics';

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
  const { key: navigationKey } = useLocation();
  const mainScrollRef = useRef<HTMLElement>(null);
  const [heroReady, setHeroReady] = useState(false);
  const handleHeroReady = useCallback(() => setHeroReady(true), []);

  useLayoutEffect(() => {
    setHeroReady(false);
    // Always start home at top so below-the-fold sections appear only after scroll.
    mainScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [navigationKey]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#0a0a0a] text-white font-sans selection:bg-white selection:text-black">
      {heroReady ? <Navbar scrollContainerRef={mainScrollRef} /> : null}
      <main
        ref={mainScrollRef}
        className={`min-h-0 flex-1 overflow-x-hidden scroll-pt-24 md:scroll-pt-28 ${
          heroReady ? 'overflow-y-auto' : 'overflow-y-hidden'
        }`}
        tabIndex={-1}
      >
        <Hero key={navigationKey} onReady={handleHeroReady} />
        {heroReady ? (
          <>
            <Projects scrollContainerRef={mainScrollRef} />
            <HomeMidCta />
            <About />
            <Services scrollContainerRef={mainScrollRef} />
            <Contact />
            <Footer />
          </>
        ) : null}
      </main>
    </div>
  );
}

function RouteTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      className="h-full min-h-0"
      initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function App() {
  const location = useLocation();

  return (
    <>
      <GoogleAnalytics />
      <ScrollToHash />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <RouteTransition>
                <HomePage />
              </RouteTransition>
            }
          />
          <Route
            path="/about"
            element={
              <RouteTransition>
                <AboutPage />
              </RouteTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <RouteTransition>
                <ContactPage />
              </RouteTransition>
            }
          />
          <Route
            path="/projects"
            element={
              <RouteTransition>
                <ProjectsPage />
              </RouteTransition>
            }
          />
          <Route
            path="/projects/namas-design-build"
            element={
              <RouteTransition>
                <NamasDesignBuildPage />
              </RouteTransition>
            }
          />
          <Route
            path="/projects/insta-kill"
            element={
              <RouteTransition>
                <InstaKillPage />
              </RouteTransition>
            }
          />
          <Route
            path="/projects/game-over"
            element={
              <RouteTransition>
                <GameOverPage />
              </RouteTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
