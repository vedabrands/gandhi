import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize, Minimize, Layers, PlayCircle } from 'lucide-react';
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
    { id: 0, label: '01 FATHER' },
    { id: 1, label: '02 MAHATMA' },
    { id: 2, label: '03 EARLY LIFE' },
    { id: 3, label: '04 S. AFRICA' },
    { id: 4, label: '05 PRINCIPLES' },
    { id: 5, label: '06 MOVEMENTS' },
    { id: 6, label: '07 DANDI' },
    { id: 7, label: '08 VISION' },
    { id: 8, label: '09 GLOBAL' },
    { id: 9, label: '10 MESSAGE' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2.5 transition-all duration-300 backdrop-blur-md bg-[#0C0F12]/85 border-b border-[#222933]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Anchor */}
        <div
          onClick={() => {
            sounds.playClick();
            onSelectSlide(0);
          }}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 rounded bg-[#B81D13] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(184,29,19,0.5)] group-hover:scale-105 transition-transform">
            ★
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg sm:text-xl tracking-wider text-white">GANDHI</span>
              <span className="font-display text-lg sm:text-xl tracking-wider text-[#B81D13]">JAYANTI</span>
            </div>
            <div className="text-[9px] font-mono text-zinc-400 tracking-widest uppercase -mt-1 hidden sm:block">
              // 02 OCTOBER TRIBUTE
            </div>
          </div>
        </div>

        {/* Center: Slide Jump Pills */}
        <div className="hidden xl:flex items-center gap-1 bg-[#141920] p-1 rounded-lg border border-[#232B36] overflow-x-auto">
          {navPills.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                sounds.playClick();
                onSelectSlide(s.id);
              }}
              className={`px-2 py-1 rounded text-[11px] font-tactical font-bold transition-all whitespace-nowrap ${
                currentSlide === s.id
                  ? 'bg-[#B81D13] text-white font-bold shadow-sm scale-105'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#141920] p-0.5 rounded-lg border border-[#232B36] text-xs font-tactical">
            <button
              onClick={() => {
                sounds.playClick();
                setViewMode('scroll');
              }}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'scroll'
                  ? 'bg-[#B81D13] text-white font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Continuous Interactive Scroll Mode"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Story</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setViewMode('deck');
              }}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'deck'
                  ? 'bg-[#B81D13] text-white font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Slide Deck Mode"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deck</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              isSoundOn
                ? 'bg-red-950/80 border-red-500/80 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                : 'bg-[#141920] border-[#232B36] text-zinc-400 hover:text-white'
            }`}
            title={isSoundOn ? 'Mute Sound FX' : 'Enable Interactive Sound FX'}
          >
            {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-[#141920] border border-[#232B36] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
