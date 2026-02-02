import { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Toaster } from 'sonner';
import { Helmet } from 'react-helmet-async';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isFormFocused) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.5],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isFormFocused]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isTyping = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA';
      if (isTyping) return;

      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1': scrollToSection('home'); e.preventDefault(); break;
          case '2': scrollToSection('about'); e.preventDefault(); break;
          case '3': scrollToSection('skills'); e.preventDefault(); break;
          case '4': scrollToSection('projects'); e.preventDefault(); break;
          case '5': scrollToSection('contact'); e.preventDefault(); break;
          default: break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInputFocus = () => {
    setIsFormFocused(true);
    setActiveSection('contact');
  };

  const handleInputBlur = (formRef: React.RefObject<HTMLFormElement>) => {
    setTimeout(() => {
      const activeElement = document.activeElement;
      const isStillInForm = activeElement?.closest('form') === formRef.current;
      if (!isStillInForm) {
        setIsFormFocused(false);
      }
    }, 100);
  };

  // Reduced animation counts for mobile
  const starCount = isMobile ? 20 : 50;
  const shootingStarCount = isMobile ? 1 : 3;
  const ufoCount = isMobile ? 1 : 2;
  const asteroidCount = isMobile ? 2 : 5;

  return (
    <div className="bg-black text-white overflow-x-hidden relative">
      <Helmet>
        <title>Piyush Gudhe | Full Stack Developer & AI Enthusiast</title>
        <meta name="description" content="Portfolio of Piyush Gudhe, a Full Stack Developer specializing in React, Node.js, Python, and AI integration. Crafting exceptional digital experiences." />
        <meta name="keywords" content="Full Stack Developer, React, Node.js, AI, Machine Learning, Web Development, Portfolio" />
        <meta property="og:title" content="Piyush Gudhe | Full Stack Developer" />
        <meta property="og:description" content="Crafting exceptional digital experiences with cutting-edge technology and innovative design." />
        <meta property="og:type" content="website" />
        <meta property="theme-color" content="#000000" />
      </Helmet>
      <Toaster
        position="top-right"
        richColors
        closeButton
        theme="dark"
        toastOptions={{
          style: {
            background: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
      <style>{`
        *:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 4px;
          border-radius: 4px;
        }
        
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        img {
          content-visibility: auto;
        }
      `}</style>

      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {!isMobile && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(starCount)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {[...Array(shootingStarCount)].map((_, i) => (
            <motion.div
              key={`shooting-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
              style={{
                width: '100px',
                top: `${20 + i * 30}%`,
                left: '-100px',
              }}
              animate={{
                x: ['0vw', '120vw'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 8,
                repeatDelay: 15,
              }}
            />
          ))}

          {[...Array(ufoCount)].map((_, i) => (
            <motion.div
              key={`ufo-${i}`}
              className="absolute"
              style={{
                top: `${30 + i * 40}%`,
                left: '-100px',
              }}
              animate={{
                x: ['0vw', '110vw'],
                y: [0, -20, 0, 20, 0],
              }}
              transition={{
                x: {
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  delay: i * 10,
                  ease: 'linear',
                },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              <div className="relative">
                <div className="w-16 h-6 bg-gradient-to-b from-purple-400/40 to-blue-400/40 rounded-full blur-sm" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-3 bg-cyan-400/60 rounded-t-full" />
                <motion.div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-yellow-300/50 rounded-full blur-sm"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scaleY: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          ))}

          <motion.div
            className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl"
            style={{ top: '10%', right: '10%' }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
            }}
          />

          <motion.div
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/15 blur-xl"
            style={{ bottom: '15%', left: '5%' }}
            animate={{
              y: [0, 20, 0],
              rotate: [360, 0],
            }}
            transition={{
              y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
            }}
          />

          <motion.div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 blur-3xl"
            style={{ top: '20%', left: '20%' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10 blur-3xl"
            style={{ bottom: '10%', right: '15%' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5,
            }}
          />

          {[...Array(asteroidCount)].map((_, i) => (
            <motion.div
              key={`asteroid-${i}`}
              className="absolute w-3 h-3 bg-gray-400/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: '-20px',
              }}
              animate={{
                x: ['0vw', '105vw'],
                rotate: [0, 360],
              }}
              transition={{
                x: {
                  duration: 25 + i * 5,
                  repeat: Infinity,
                  delay: i * 3,
                  ease: 'linear',
                },
                rotate: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
            />
          ))}

          <motion.div
            className="absolute pointer-events-none"
            style={{ top: '60%', right: '-100px' }}
            animate={{
              x: [0, '-120vw'],
              rotate: [0, -360],
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
              rotate: {
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            <div className="relative">
              <div className="w-8 h-6 bg-gray-300/40 rounded shadow-sm" />
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-blue-400/50" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-blue-400/50" />
            </div>
          </motion.div>

          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{
              top: '5%',
              left: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      )}

      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} scrolled={scrolled} />
      <HeroSection scrollToSection={scrollToSection} isMobile={isMobile} />
      <AboutSection isMobile={isMobile} />
      <SkillsSection />
      <ProjectsSection isMobile={isMobile} />
      <ContactSection isMobile={isMobile} onFocus={handleInputFocus} onBlur={handleInputBlur} />

      {/* OTHER PORTFOLIO SECTION */}
      <section id="other-portfolio" className="py-28 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore My Other Portfolio
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
            A different creative direction showcasing more experiments,
            interactions, and design-focused work.
          </p>

          <a
            href="https://mynewportfolio-2nd.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-12 py-4 rounded-full
                       bg-gradient-to-r from-purple-500 to-cyan-500
                       text-black font-semibold text-lg
                       hover:scale-105 transition-transform duration-300
                       shadow-[0_0_30px_rgba(139,92,246,0.6)]"
          >
            Visit Portfolio
            <span className="text-xl">↗</span>
          </a>
        </div>
      </section>

      <Footer scrollToSection={scrollToSection} isMobile={isMobile} />
    </div>
  );
};

export default Index;