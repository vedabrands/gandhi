import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Navbar } from './components/Navbar';
import { SlideDeckViewer } from './components/SlideDeckViewer';
import { ScrollScrubberHUD } from './components/ScrollScrubberHUD';
import { GandhiSlide } from './components/GandhiSlide';
import { GANDHI_SLIDES } from './components/gandhiData';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'scroll' | 'deck'>('scroll');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const totalSlides = GANDHI_SLIDES.length; // 10 slides
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Smooth Scroll with Lenis
  useEffect(() => {
    if (viewMode !== 'scroll') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [viewMode]);

  // Scroll tracking to update active slide pill in Navbar
  useEffect(() => {
    if (viewMode !== 'scroll') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const el = sectionRefs.current[i];
        if (el && el.offsetTop <= scrollPosition) {
          setCurrentSlide(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
    if (viewMode === 'scroll') {
      const el = sectionRefs.current[index];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      handleSelectSlide(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      handleSelectSlide(currentSlide - 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#2A1A0E] text-[#F1E4C3] selection:bg-[#7A1F1F] selection:text-[#F1E4C3] font-body">
      {/* 3D WebGL Background Golden Particles */}
      <BackgroundParticles />

      {/* Top Fixed Medieval Navbar */}
      <Navbar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onSelectSlide={handleSelectSlide}
      />

      {/* Real-Time Scroll Scrubber Telemetry HUD */}
      <ScrollScrubberHUD
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSelectSlide={handleSelectSlide}
        visible={viewMode === 'scroll'}
      />

      {/* Main Presentation Content View */}
      {viewMode === 'scroll' ? (
        // Continuous Interactive Scroll Mode
        <main className="relative z-10 w-full pt-16 max-w-7xl mx-auto px-2 sm:px-4 space-y-8 pb-16">
          {GANDHI_SLIDES.map((slide, idx) => (
            <div
              key={slide.no}
              ref={(el) => (sectionRefs.current[idx] = el)}
              id={`slide-${idx}`}
            >
              <GandhiSlide
                data={slide}
                totalSlides={totalSlides}
                onRestart={() => handleSelectSlide(0)}
                isActive={currentSlide === idx}
                isDeck={false}
              />
            </div>
          ))}
        </main>
      ) : (
        // Slide-by-Slide Deck Mode
        <SlideDeckViewer
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onNext={handleNextSlide}
          onPrev={handlePrevSlide}
          onSelectSlide={handleSelectSlide}
          onToggleViewMode={() => setViewMode('scroll')}
        >
          <GandhiSlide
            data={GANDHI_SLIDES[currentSlide] || GANDHI_SLIDES[0]}
            totalSlides={totalSlides}
            onRestart={() => handleSelectSlide(0)}
            isActive={true}
            isDeck={true}
          />
        </SlideDeckViewer>
      )}
    </div>
  );
};
export default App;
