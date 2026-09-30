import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Quote,
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

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

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

  const romanNumber = data.roman || ROMAN_NUMERALS[data.no - 1] || `${data.no}`;
  const totalRoman = ROMAN_NUMERALS[totalSlides - 1] || `${totalSlides}`;

  const getSlideIcon = (num: number) => {
    switch (num) {
      case 1:
        return <Award className="w-4 h-4 text-[#B8862B]" />;
      case 2:
        return <Sun className="w-4 h-4 text-[#B8862B]" />;
      case 3:
        return <BookOpen className="w-4 h-4 text-[#B8862B]" />;
      case 4:
        return <Compass className="w-4 h-4 text-[#B8862B]" />;
      case 5:
        return <Shield className="w-4 h-4 text-[#B8862B]" />;
      case 6:
        return <Layers className="w-4 h-4 text-[#B8862B]" />;
      case 7:
        return <Sparkles className="w-4 h-4 text-[#B8862B]" />;
      case 8:
        return <Heart className="w-4 h-4 text-[#B8862B]" />;
      case 9:
        return <Globe className="w-4 h-4 text-[#B8862B]" />;
      case 10:
        return <Feather className="w-4 h-4 text-[#B8862B]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#B8862B]" />;
    }
  };

  return (
    <section className="relative w-full bg-[#FAF4E6] text-[#2A1A0E] p-5 sm:p-7 lg:p-10 flex flex-col justify-between overflow-hidden border-4 border-double border-[#7A1F1F] shadow-[0_20px_60px_rgba(26,15,7,0.7),inset_0_0_90px_rgba(184,134,43,0.12)] rounded-2xl parchment-vignette">
      {/* Ornate Corner Flourishes on the Main Parchment Slide */}
      <div className="absolute top-2 left-2 text-[#B8862B] text-xs pointer-events-none select-none opacity-70 font-heading">
        ❖
      </div>
      <div className="absolute top-2 right-2 text-[#B8862B] text-xs pointer-events-none select-none opacity-70 font-heading">
        ❖
      </div>
      <div className="absolute bottom-2 left-2 text-[#B8862B] text-xs pointer-events-none select-none opacity-70 font-heading">
        ❖
      </div>
      <div className="absolute bottom-2 right-2 text-[#B8862B] text-xs pointer-events-none select-none opacity-70 font-heading">
        ❖
      </div>

      {/* Top Header Row */}
      <div className="relative z-10 space-y-2 mb-3">
        <BlurReveal delay={0.05} yOffset={10}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            {/* Chapter Header */}
            <div className="flex items-center gap-2 text-xs font-heading font-semibold tracking-widest text-[#7A1F1F] uppercase">
              <span className="w-2 h-2 rotate-45 bg-[#B8862B] inline-block shadow-sm"></span>
              <span>{data.kicker}</span>
            </div>

            {/* Slide Index Badge & Restart */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-heading bg-[#F1E4C3] text-[#4A3220] px-3.5 py-1 rounded-full border border-[#B8862B]/60 shadow-sm font-semibold cursor-default flex items-center gap-1.5">
                {getSlideIcon(data.no)}
                <span>FOLIO {romanNumber} DE {totalRoman}</span>
              </span>

              {data.no === totalSlides && onRestart && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    onRestart();
                  }}
                  className="px-3.5 py-1 rounded-full bg-[#7A1F1F] hover:bg-[#9E2D2D] text-[#FAF7F0] font-heading text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer border border-[#B8862B]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  RESTART
                </button>
              )}
            </div>
          </div>
        </BlurReveal>

        {/* Title: Cinzel Decorative */}
        <BlurReveal delay={0.12} yOffset={15}>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-wide text-[#2A1A0E] leading-tight drop-shadow-sm uppercase">
            {data.title}
          </h2>
        </BlurReveal>

        {/* Thin Gold Divider Under Subtitles */}
        <BlurReveal delay={0.15} yOffset={5}>
          <div className="relative flex items-center justify-center my-2">
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#B8862B] to-transparent opacity-60"></div>
            <div className="mx-2 text-[#7A1F1F] text-xs">❦</div>
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#B8862B] to-transparent opacity-60"></div>
          </div>
        </BlurReveal>

        {/* Subtitle: EB Garamond */}
        <BlurReveal delay={0.18} yOffset={10}>
          <p className="text-base sm:text-lg lg:text-xl font-body text-[#3D2717] max-w-4xl leading-relaxed italic">
            {data.sub}
          </p>
        </BlurReveal>
      </div>

      {/* Main Grid: Alternating Layout (Photo Left or Right) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch my-2">
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
              className="relative flex-1 bg-[#2A1A0E] rounded-xl overflow-hidden border-2 border-[#B8862B] shadow-2xl transition-all duration-300 flex flex-col justify-between group p-3.5"
            >
              {/* Gold Diamond Corner Studs on Photo Frame */}
              <div className="absolute top-1 left-1 w-3 h-3 rotate-45 bg-[#D4AF37] border border-[#7A1F1F] shadow-sm z-20 pointer-events-none"></div>
              <div className="absolute top-1 right-1 w-3 h-3 rotate-45 bg-[#D4AF37] border border-[#7A1F1F] shadow-sm z-20 pointer-events-none"></div>
              <div className="absolute bottom-1 left-1 w-3 h-3 rotate-45 bg-[#D4AF37] border border-[#7A1F1F] shadow-sm z-20 pointer-events-none"></div>
              <div className="absolute bottom-1 right-1 w-3 h-3 rotate-45 bg-[#D4AF37] border border-[#7A1F1F] shadow-sm z-20 pointer-events-none"></div>

              {/* Image Frame */}
              <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-lg overflow-hidden bg-[#1A0F07] border border-[#5C3F2B]">
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
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter sepia-[0.2] contrast-105 brightness-95"
                      loading="lazy"
                    />
                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F07]/90 via-transparent to-[#1A0F07]/30 pointer-events-none"></div>

                    {/* Video Play Overlay */}
                    {data.video && (
                      <button
                        onClick={() => {
                          sounds.playScan();
                          setIsVideoPlaying(true);
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-[#1A0F07]/40 hover:bg-[#1A0F07]/60 transition-colors group/btn cursor-pointer"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#7A1F1F] hover:bg-[#9E2D2D] text-[#F1E4C3] border-2 border-[#D4AF37] flex items-center justify-center shadow-xl group-hover/btn:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-[#F1E4C3] ml-0.5" />
                        </div>
                      </button>
                    )}

                    {/* Top Ornate Banner */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#2A1A0E]/85 backdrop-blur-sm border border-[#B8862B] text-[#F1E4C3] text-[10px] font-heading tracking-widest uppercase shadow">
                      ARCHIVE • CHAPTER {romanNumber}
                    </div>
                  </>
                )}
              </div>

              {/* Photo Caption: IM Fell English Italic */}
              <div className="mt-3 px-1 py-1">
                <p className="text-sm font-caption italic text-[#FAF4E6] leading-snug">
                  {data.caption}
                </p>
                {data.credit && (
                  <p className="text-[11px] font-caption italic text-[#D4BE88] mt-1.5 pt-1.5 border-t border-[#5C3F2B]/60">
                    ❦ {data.credit}
                  </p>
                )}
              </div>

              {/* Ornate Quote Card */}
              {data.quote && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  onMouseEnter={() => sounds.playHover()}
                  className="mt-2 p-3 rounded-lg bg-[#3D2717] hover:bg-[#4A3220] border border-[#B8862B] text-xs space-y-1 transition-all duration-200 cursor-default shadow-md"
                >
                  <div className="text-[#D4AF37] font-heading font-semibold flex items-center gap-1.5 text-xs tracking-wider">
                    <Quote className="w-3.5 h-3.5 text-[#B8862B]" />
                    <span>DICTUM MAHATMA GANDHI</span>
                  </div>
                  <p className="text-[#F1E4C3] font-caption italic text-sm leading-relaxed">
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
          <div className="space-y-3">
            {data.points.map((point, idx) => {
              const isHovered = hoveredPointIdx === idx;
              const isDull = hoveredPointIdx !== null && !isHovered;

              return (
                <BlurReveal key={idx} delay={0.15 + idx * 0.06} yOffset={12}>
                  <motion.div
                    whileHover={{ scale: 1.015, x: isPhotoLeft ? 4 : -4 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    onMouseEnter={() => {
                      sounds.playHover();
                      setHoveredPointIdx(idx);
                    }}
                    onMouseLeave={() => setHoveredPointIdx(null)}
                    className={`card-tactical-interactive p-4 sm:p-4.5 rounded-xl border-2 transition-all duration-300 cursor-pointer flex items-start gap-3.5 shadow-md ${
                      isHovered
                        ? 'bg-[#7A1F1F] text-[#FAF7F0] border-[#D4AF37] shadow-[0_12px_28px_-6px_rgba(122,31,31,0.6)]'
                        : isDull
                        ? 'bg-[#F1E4C3]/70 text-[#2A1A0E] border-[#B8862B]/30 opacity-50 scale-[0.99]'
                        : 'bg-[#F1E4C3] hover:bg-[#7A1F1F] text-[#2A1A0E] border-[#B8862B]/60 shadow-[0_4px_12px_rgba(42,26,14,0.08)]'
                    }`}
                  >
                    {/* Number Stamp */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-heading font-bold transition-all shadow border ${
                        isHovered
                          ? 'bg-[#D4AF37] text-[#7A1F1F] border-white scale-110'
                          : 'bg-[#7A1F1F] text-[#F1E4C3] border-[#B8862B] group-hover:bg-[#D4AF37] group-hover:text-[#7A1F1F]'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`text-sm sm:text-base font-body leading-relaxed transition-colors ${
                          isHovered
                            ? 'text-[#FAF7F0] font-medium'
                            : 'text-[#2A1A0E] group-hover:text-[#FAF7F0]'
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
                className="p-3.5 rounded-xl bg-[#2A1A0E] text-[#F1E4C3] border-2 border-[#B8862B] shadow-lg flex items-center justify-between flex-wrap gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rotate-45 bg-[#D4AF37]"></div>
                  <span className="font-heading text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    {data.highlight}
                  </span>
                </div>

                <div className="text-xs font-heading text-[#FAF4E6]/80 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B8862B]" />
                  <span>IN MEMORIAM MAHATMA GANDHI</span>
                </div>
              </motion.div>
            </BlurReveal>
          )}
        </div>
      </div>

      {/* Ornate Footer Row */}
      <BlurReveal delay={0.28} yOffset={10}>
        <div className="relative z-10 mt-4 pt-3 border-t-2 border-[#7A1F1F]/40 flex items-center justify-between flex-wrap gap-2 text-xs font-heading">
          <div className="flex items-center gap-2 text-[#7A1F1F]">
            <span className="text-[#B8862B]">❖</span>
            <span className="font-bold tracking-wider">GANDHI JAYANTI • II OCTOBER</span>
          </div>

          <div className="text-center text-xs font-semibold text-[#7A1F1F] tracking-widest hidden sm:block">
            TRUTH • NON-VIOLENCE • PEACE • DIGNITY
          </div>

          <div className="flex items-center gap-2 text-[#5C3F2B]">
            <span className="font-bold">FOLIO {romanNumber} / {totalRoman}</span>
            <span className="text-[#B8862B]">❖</span>
          </div>
        </div>
      </BlurReveal>
    </section>
  );
};
export default GandhiSlide;
