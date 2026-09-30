import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize, Minimize, Scroll, BookOpen } from 'lucide-react';
import { sounds } from './AudioController';

interface NavbarProps {
  currentSlide: number;
  totalSlides: number;
  viewMode: 'scroll' | 'deck';
  setViewMode: (mode: 'scroll' | 'deck') => void;
  onSelectSlide: (slideIndex: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSlide,
  totalSlides,
  viewMode,
  setViewMode,
  onSelectSlide,
}) => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleAudio = () => {
    const newState = sounds.toggleSound();
    setIsSoundOn(newState);
  };

  const toggleFullscreen = () => {
    sounds.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const navPills = [
    { id: 0, label: 'I • TOPIC' },
    { id: 1, label: 'II • WHO WAS GANDHI' },
    { id: 2, label: 'III • CORE IDEAS' },
    { id: 3, label: 'IV • TODAY\'S WORLD' },
    { id: 4, label: 'V • AHIMSA' },
    { id: 5, label: 'VI • TRUTH ONLINE' },
    { id: 6, label: 'VII • SIMPLE LIVING' },
    { id: 7, label: 'VIII • SWADESHI' },
    { id: 8, label: 'IX • CRITICISMS' },
    { id: 9, label: 'X • VERDICT' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2.5 transition-all duration-300 backdrop-blur-md bg-[#1A0F07]/90 border-b border-[#5C3F2B] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Anchor */}
        <div
          onClick={() => {
            sounds.playClick();
            onSelectSlide(0);
          }}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-[#7A1F1F] border border-[#B8862B] flex items-center justify-center text-[#D4AF37] font-bold text-sm shadow-[0_0_15px_rgba(184,134,43,0.3)] group-hover:scale-105 transition-transform">
            ❖
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-[#F1E4C3]">GANDHI</span>
            </div>
            <div className="text-[10px] font-heading text-[#D4BE88] tracking-widest uppercase -mt-1 hidden sm:block">
              COMMEMORATION • II OCTOBER
            </div>
          </div>
        </div>

        {/* Center: Slide Jump Pills */}
        <div className="hidden xl:flex items-center gap-1 bg-[#2A1A0E] p-1 rounded-xl border border-[#5C3F2B] overflow-x-auto">
          {navPills.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                sounds.playClick();
                onSelectSlide(s.id);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-heading font-semibold transition-all whitespace-nowrap cursor-pointer ${
                currentSlide === s.id
                  ? 'bg-[#7A1F1F] text-[#FAF7F0] border border-[#B8862B] shadow-[0_0_10px_rgba(184,134,43,0.3)] scale-105'
                  : 'text-[#D4BE88] hover:text-[#FAF7F0] hover:bg-[#3D2717]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#2A1A0E] p-0.5 rounded-xl border border-[#5C3F2B] text-xs font-heading">
            <button
              onClick={() => {
                sounds.playClick();
                setViewMode('scroll');
              }}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'scroll'
                  ? 'bg-[#7A1F1F] text-[#FAF7F0] border border-[#B8862B] font-semibold shadow'
                  : 'text-[#D4BE88] hover:text-[#FAF7F0]'
              }`}
              title="Continuous Scroll Story Mode"
            >
              <Scroll className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Story</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setViewMode('deck');
              }}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'deck'
                  ? 'bg-[#7A1F1F] text-[#FAF7F0] border border-[#B8862B] font-semibold shadow'
                  : 'text-[#D4BE88] hover:text-[#FAF7F0]'
              }`}
              title="Slide Deck Mode"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Folio</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isSoundOn
                ? 'bg-[#7A1F1F] border-[#D4AF37] text-[#FAF7F0] shadow-[0_0_10px_rgba(184,134,43,0.4)]'
                : 'bg-[#2A1A0E] border-[#5C3F2B] text-[#D4BE88] hover:text-[#FAF7F0] hover:bg-[#3D2717]'
            }`}
            title={isSoundOn ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {isSoundOn ? <Volume2 className="w-4 h-4 text-[#D4AF37]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#2A1A0E] border border-[#5C3F2B] text-[#D4BE88] hover:text-[#FAF7F0] hover:bg-[#3D2717] transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
