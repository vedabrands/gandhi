import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Quote,
  CheckCircle2,
  Play,
  RotateCcw,
  Compass,
  Heart,
  Feather,
  Sun,
  Shield,
  Layers,
  Award,
  BookOpen,
  Globe
} from 'lucide-react';
import { SlideData } from './gandhiData';
import { sounds } from './AudioController';
import { BlurReveal } from './BlurReveal';

interface GandhiSlideProps {
  data: SlideData;
  totalSlides?: number;
  onRestart?: () => void;
  isActive?: boolean;
  isDeck?: boolean;
}

export const GandhiSlide: React.FC<GandhiSlideProps> = ({
  data,
  totalSlides = 10,
  onRestart,
  isActive = true,
  isDeck = false,
}) => {
  const isPhotoLeft = data.no % 2 === 0;
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  const getSlideIcon = (num: number) => {
    switch (num) {
      case 1:
        return <Award className="w-4 h-4" />;
      case 2:
        return <Sun className="w-4 h-4" />;
      case 3:
        return <BookOpen className="w-4 h-4" />;
      case 4:
        return <Compass className="w-4 h-4" />;
      case 5:
        return <Shield className="w-4 h-4" />;
      case 6:
        return <Layers className="w-4 h-4" />;
      case 7:
        return <Sparkles className="w-4 h-4" />;
      case 8:
        return <Heart className="w-4 h-4" />;
      case 9:
        return <Globe className="w-4 h-4" />;
      case 10:
        return <Feather className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section className="relative w-full bg-[#F5EFEB] text-[#12161A] p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-hidden border-b-4 border-[#B81D13] shadow-2xl rounded-2xl">
      {/* Subtle Background Radial Pattern & Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#12161A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Top Header Row */}
      <div className="relative z-10 space-y-2 mb-4">
        <BlurReveal delay={0.05} yOffset={10}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-tactical font-bold tracking-widest text-[#B81D13] uppercase">
              <span className="w-2.5 h-2.5 bg-[#B81D13] rounded-sm"></span>
              SECTION {String(data.no).padStart(2, '0')} // {data.kicker}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-tactical bg-[#EDE3D8] hover:bg-[#B81D13] hover:text-white transition-colors px-3 py-0.5 rounded-full border border-[#12161A]/15 font-bold cursor-default flex items-center gap-1.5">
                {getSlideIcon(data.no)}
                SLIDE {data.no} OF {totalSlides}
              </span>

              {data.no === totalSlides && onRestart && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    onRestart();
                  }}
                  className="px-3 py-0.5 rounded-full bg-[#B81D13] hover:bg-red-600 text-white font-tactical text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  RESTART
                </button>
              )}
            </div>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.12} yOffset={15}>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-[#12161A] leading-none uppercase">
            {data.title}
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.18} yOffset={10}>
          <p className="text-sm sm:text-base font-body text-[#2B303A] max-w-4xl leading-relaxed font-medium">
            {data.sub}
          </p>
        </BlurReveal>
      </div>

      {/* Main Grid: Alternating Layout (Photo Left or Right) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch my-2">
        {/* Photo Column */}
        <div
          className={`lg:col-span-5 flex flex-col justify-between ${
            isPhotoLeft ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <BlurReveal delay={0.2} yOffset={15} className="h-full flex flex-col">
            <motion.div
              whileHover={{ scale: 1.015, y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative flex-1 bg-[#10141A] rounded-2xl overflow-hidden border-2 border-[#232B36] hover:border-[#B81D13] shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(184,29,19,0.4)] transition-all duration-300 flex flex-col justify-between group p-3"
            >
              {/* Image Frame with Aspect Ratio */}
              <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden bg-black/40 border border-[#2A3442]">
                {data.video && isVideoPlaying ? (
                  <video
                    src={data.video}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img
                      src={data.photo}
                      alt={data.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter saturate-90 contrast-105"
                      loading="lazy"
                    />
                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                    {/* Video Play Overlay if video exists */}
                    {data.video && (
                      <button
                        onClick={() => {
                          sounds.playScan();
                          setIsVideoPlaying(true);
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group/btn cursor-pointer"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#B81D13] hover:bg-red-500 text-white flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        </div>
                      </button>
                    )}

                    {/* Top Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/20 text-white text-[10px] font-tactical font-bold uppercase tracking-wider">
                      HISTORICAL ARCHIVE // {String(data.no).padStart(2, '0')}
                    </div>
                  </>
                )}
              </div>

              {/* Photo Caption */}
              <div className="mt-3 px-1 py-1">
                <p className="text-xs font-mono text-zinc-300 leading-snug">
                  {data.caption}
                </p>
              </div>

              {/* Quote Card (if available) */}
              {data.quote && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  onMouseEnter={() => sounds.playHover()}
                  className="mt-2 p-3 rounded-xl bg-[#161D26] hover:bg-[#1C2633] border border-[#2B3848] hover:border-amber-500/50 text-xs font-mono space-y-1 transition-all duration-200 cursor-default"
                >
                  <div className="text-amber-400 font-tactical font-bold flex items-center gap-1.5 text-[11px]">
                    <Quote className="w-3.5 h-3.5" />
                    WORDS OF MAHATMA GANDHI
                  </div>
                  <p className="text-zinc-200 font-body text-xs italic leading-relaxed">
                    "{data.quote}"
                  </p>
                </motion.div>
              )}
            </motion.div>
          </BlurReveal>
        </div>

        {/* Content Column: Staggered Bullet Points */}
        <div
          className={`lg:col-span-7 flex flex-col justify-between space-y-3 ${
            isPhotoLeft ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          {/* Bullet Cards */}
          <div className="space-y-2.5">
            {data.points.map((point, idx) => {
              const isHovered = hoveredPointIdx === idx;
              const isDull = hoveredPointIdx !== null && !isHovered;

              return (
                <BlurReveal key={idx} delay={0.15 + idx * 0.06} yOffset={12}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: isPhotoLeft ? 4 : -4 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    onMouseEnter={() => {
                      sounds.playHover();
                      setHoveredPointIdx(idx);
                    }}
                    onMouseLeave={() => setHoveredPointIdx(null)}
                    className={`card-tactical-interactive p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer flex items-start gap-3 group ${
                      isHovered
                        ? 'bg-[#B81D13] text-white border-white/60 shadow-[0_15px_30px_-8px_rgba(184,29,19,0.55)]'
                        : isDull
                        ? 'bg-white/60 text-[#12161A] border-[#12161A]/10 opacity-45 scale-[0.99] blur-[0.2px]'
                        : 'bg-white hover:bg-[#B81D13] text-[#12161A] border-[#12161A]/15 shadow-sm'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-all shadow-sm ${
                        isHovered
                          ? 'bg-white text-[#B81D13] scale-110'
                          : 'bg-[#12161A] text-white group-hover:bg-white group-hover:text-[#B81D13]'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`text-xs sm:text-sm font-body leading-relaxed transition-colors ${
                          isHovered
                            ? 'text-white font-medium'
                            : 'text-[#1E242B] group-hover:text-white font-normal'
                        }`}
                      >
                        {point}
                      </p>
                    </div>
                  </motion.div>
                </BlurReveal>
              );
            })}
          </div>

          {/* Special Highlight Box (e.g. Presenter Tag or Thank You) */}
          {data.highlight && (
            <BlurReveal delay={0.35} yOffset={10}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                onMouseEnter={() => sounds.playHover()}
                className="p-3.5 rounded-xl bg-[#141920] text-white border border-[#232B36] shadow-lg flex items-center justify-between flex-wrap gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="font-tactical text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {data.highlight}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B81D13]" />
                  <span>MAHATMA GANDHI MEMORIAL TRIBUTE</span>
                </div>
              </motion.div>
            </BlurReveal>
          )}
        </div>
      </div>

      {/* Footer Hazard Stripe & Meta */}
      <BlurReveal delay={0.28} yOffset={10}>
        <div className="relative z-10 mt-4 pt-3 border-t-2 border-[#12161A] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-16 h-3 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_6px,#F5EFEB_6px,#F5EFEB_12px)] border border-[#B81D13]"></div>
            <span className="font-bold text-[#12161A]">GANDHI JAYANTI // 02 OCTOBER</span>
          </div>

          <div className="text-center text-xs font-bold text-[#B81D13] hidden sm:block">
            TRUTH • NON-VIOLENCE • PEACE • DIGNITY
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-600 hidden sm:inline">SLIDE {String(data.no).padStart(2, '0')} // 10</span>
            <div className="w-16 h-3 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_6px,#F5EFEB_6px,#F5EFEB_12px)] border border-[#B81D13]"></div>
          </div>
        </div>
      </BlurReveal>
    </section>
  );
};
export default GandhiSlide;
