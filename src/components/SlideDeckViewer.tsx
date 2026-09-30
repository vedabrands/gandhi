import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Scroll,
  BookOpen
} from 'lucide-react';
import { sounds } from './AudioController';

interface SlideDeckViewerProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectSlide: (index: number) => void;
  onToggleViewMode: () => void;
  children: React.ReactNode;
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export const SlideDeckViewer: React.FC<SlideDeckViewerProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onSelectSlide,
  onToggleViewMode,
  children,
}) => {
  const slideTitles = [
    { id: 0, title: 'TOPIC', code: 'I', tag: '21ST CENTURY' },
    { id: 1, title: 'WHO WAS GANDHI', code: 'II', tag: 'IDENTITY & LEGACY' },
    { id: 2, title: 'CORE IDEAS', code: 'III', tag: 'PHILOSOPHY' },
    { id: 3, title: "TODAY'S WORLD", code: 'IV', tag: 'MODERN CRISES' },
    { id: 4, title: 'AHIMSA', code: 'V', tag: 'NON-VIOLENCE' },
    { id: 5, title: 'TRUTH ONLINE', code: 'VI', tag: 'SATYA' },
    { id: 6, title: 'SIMPLE LIVING', code: 'VII', tag: 'SUSTAINABILITY' },
    { id: 7, title: 'SWADESHI', code: 'VIII', tag: 'LOCAL ECONOMY' },
    { id: 8, title: 'CRITICISMS', code: 'IX', tag: 'CRITICAL DISCOURSE' },
    { id: 9, title: 'VERDICT', code: 'X', tag: 'LIVING RELEVANCE' },
  ];

  // Helper for directed navigation
  const navigateTo = useCallback(
    (targetIndex: number) => {
      if (targetIndex === currentSlide || targetIndex < 0 || targetIndex >= totalSlides) return;
      sounds.playClick();
      onSelectSlide(targetIndex);
    },
    [currentSlide, totalSlides, onSelectSlide]
  );

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      sounds.playClick();
      onNext();
    }
  }, [currentSlide, totalSlides, onNext]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 0) {
      sounds.playClick();
      onPrev();
    }
  }, [currentSlide, onPrev]);

  // Keyboard Navigation Listener (Left/Right, Space, 1-9, 0, M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 'm') {
        sounds.playClick();
        onToggleViewMode();
      } else if (e.key === '0') {
        navigateTo(9);
      } else if (e.key >= '1' && e.key <= '9') {
        const slideIdx = parseInt(e.key, 10) - 1;
        if (slideIdx < totalSlides) {
          navigateTo(slideIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onToggleViewMode, navigateTo, totalSlides]);

  const currentInfo = slideTitles[currentSlide] || slideTitles[0];
  const currentRoman = ROMAN_NUMERALS[currentSlide] || `${currentSlide + 1}`;
  const totalRoman = ROMAN_NUMERALS[totalSlides - 1] || `${totalSlides}`;

  return (
    <div className="relative w-full min-h-screen bg-[#2A1A0E] pt-14 pb-20 overflow-x-hidden flex flex-col justify-between select-none">
      {/* Main Slide Transition Stage */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 flex-1 flex items-center justify-center my-auto py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.01, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full shadow-2xl rounded-2xl overflow-hidden"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Bottom Medieval Codex Scrubber HUD */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-5xl bg-[#1A0F07]/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl border-2 border-[#5C3F2B] shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col gap-2">
        {/* Interactive Milestone Timeline Scrubber */}
        <div className="relative w-full flex items-center justify-between gap-1 sm:gap-2">
          {slideTitles.map((slide, idx) => {
            const isActive = currentSlide === idx;
            const isPast = currentSlide > idx;

            return (
              <div key={slide.id} className="flex-1 flex flex-col items-center gap-1 group">
                <button
                  onClick={() => {
                    sounds.playClick();
                    navigateTo(idx);
                  }}
                  onMouseEnter={() => sounds.playHover()}
                  className="w-full relative py-1 focus:outline-none cursor-pointer"
                  title={`Jump to Folio ${slide.code}: ${slide.title}`}
                >
                  {/* Scrubber Segment Rail */}
                  <div
                    className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#7A1F1F] shadow-[0_0_12px_rgba(184,134,43,0.8)] border border-[#D4AF37] h-2'
                        : isPast
                        ? 'bg-[#5C3F2B] hover:bg-[#B8862B]'
                        : 'bg-[#3D2717] hover:bg-[#5C3F2B]'
                    }`}
                  />

                  {/* Active Pin Dot */}
                  {isActive && (
                    <motion.div
                      layoutId="activeScrubPin"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 bg-[#D4AF37] border border-[#7A1F1F] shadow-[0_0_10px_#D4AF37]"
                    />
                  )}
                </button>

                {/* Chapter Label */}
                <span
                  className={`text-[9px] font-heading font-semibold tracking-tight uppercase truncate transition-colors hidden md:block max-w-[90px] text-center ${
                    isActive ? 'text-[#D4AF37]' : 'text-[#D4BE88]/60 group-hover:text-[#D4BE88]'
                  }`}
                >
                  {slide.code} • {slide.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Primary Controls Row */}
        <div className="flex items-center justify-between pt-1 border-t border-[#3D2717] font-heading text-xs">
          {/* Left: Prev Slide Button & Current Slide Spec */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentSlide === 0
                  ? 'opacity-25 cursor-not-allowed text-[#D4BE88]/40 border border-[#3D2717]'
                  : 'bg-[#2A1A0E] text-[#FAF7F0] hover:bg-[#7A1F1F] border border-[#5C3F2B] hover:border-[#D4AF37] shadow-md hover:scale-105 active:scale-95'
              }`}
              title="Previous Folio (Left Arrow / Backspace)"
            >
              <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">PREV</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base text-[#FAF7F0] tracking-wider">
                {currentRoman}
              </span>
              <span className="text-[#5C3F2B] font-bold">/</span>
              <span className="text-[#D4BE88] font-bold">
                {totalRoman}
              </span>
              <span className="hidden lg:inline text-xs font-heading text-[#FAF4E6] font-semibold px-2.5 py-0.5 rounded-lg bg-[#2A1A0E] border border-[#5C3F2B]">
                {currentInfo.title}
              </span>
            </div>
          </div>

          {/* Center: Navigation Shortcut Guide */}
          <div className="hidden md:flex items-center gap-2 text-[10px] text-[#D4BE88] bg-[#2A1A0E] px-3.5 py-1 rounded-full border border-[#5C3F2B]">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>ARROWS (← / →), SPACE, 1-9 / 0 FOR FOLIOS, M FOR MODE</span>
          </div>

          {/* Right: Next Slide Button & Switch Mode */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onToggleViewMode();
              }}
              className="px-2.5 py-1.5 rounded-xl bg-[#2A1A0E] hover:bg-[#3D2717] text-[#D4BE88] hover:text-[#FAF7F0] border border-[#5C3F2B] transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Switch to Continuous Scroll Mode (Press M)"
            >
              <Scroll className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">STORY MODE</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentSlide === totalSlides - 1}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentSlide === totalSlides - 1
                  ? 'opacity-25 cursor-not-allowed text-[#D4BE88]/40 border border-[#3D2717]'
                  : 'bg-[#7A1F1F] text-[#FAF7F0] hover:bg-[#9E2D2D] border border-[#D4AF37] shadow-[0_0_15px_rgba(184,134,43,0.4)] hover:scale-105 active:scale-95'
              }`}
              title="Next Folio (Right Arrow / Space)"
            >
              <span className="hidden sm:inline">NEXT</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SlideDeckViewer;
