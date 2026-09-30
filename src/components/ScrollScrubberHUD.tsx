import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { sounds } from './AudioController';

interface ScrollScrubberHUDProps {
  currentSlide: number;
  totalSlides: number;
  onSelectSlide: (index: number) => void;
  visible: boolean;
}

export const ScrollScrubberHUD: React.FC<ScrollScrubberHUDProps> = ({
  currentSlide,
  totalSlides,
  onSelectSlide,
  visible,
}) => {
  const { scrollYProgress, scrollY } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 220, damping: 28 });

  // Transforms
  const scrollPercent = useTransform(smoothProgress, [0, 1], [0, 100]);
  const compassRotation = useTransform(smoothProgress, [0, 1], [0, 360]);
  const laserTopWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const laserPulseX = useTransform(smoothProgress, [0, 1], ['0%', '99%']);
  const laserRailHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Dynamic percentage display state
  const [percentDisplay, setPercentDisplay] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'REST' | 'DESCEND' | 'ASCEND'>('REST');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = scrollPercent.on('change', (val) => {
      setPercentDisplay(Math.round(val));
    });
    return () => unsubscribe();
  }, [scrollPercent]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (current) => {
      if (current > lastScrollY + 2) {
        setScrollDirection('DESCEND');
      } else if (current < lastScrollY - 2) {
        setScrollDirection('ASCEND');
      }
      setLastScrollY(current);
    });
    return () => unsubscribe();
  }, [scrollY, lastScrollY]);

  if (!visible) return null;

  const sections = [
    { id: 0, label: 'I', name: 'TOPIC' },
    { id: 1, label: 'II', name: 'WHO WAS GANDHI' },
    { id: 2, label: 'III', name: 'CORE IDEAS' },
    { id: 3, label: 'IV', name: "TODAY'S WORLD" },
    { id: 4, label: 'V', name: 'AHIMSA' },
    { id: 5, label: 'VI', name: 'TRUTH ONLINE' },
    { id: 6, label: 'VII', name: 'SIMPLE LIVING' },
    { id: 7, label: 'VIII', name: 'SWADESHI' },
    { id: 8, label: 'IX', name: 'CRITICISMS' },
    { id: 9, label: 'X', name: 'VERDICT' },
  ];

  return (
    <>
      {/* Top Hairline Scroll Progress Bar (Below Navbar) */}
      <div className="fixed top-[53px] left-0 right-0 z-40 h-[3px] bg-[#1A0F07]/60 overflow-hidden pointer-events-none">
        <motion.div
          style={{ width: laserTopWidth }}
          className="h-full bg-gradient-to-r from-[#7A1F1F] via-[#D4AF37] to-[#7A1F1F] relative"
        >
          <motion.div
            style={{ left: laserPulseX }}
            className="absolute top-0 w-8 h-full bg-[#FAF7F0] blur-[2px] opacity-90"
          />
        </motion.div>
      </div>

      {/* Floating Gilded Telemetry Scrubber Rail (Right Side) */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2 select-none pointer-events-auto">
        {/* Astrolabe / Cartographic Dial HUD */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="relative bg-[#1A0F07]/95 backdrop-blur-md p-2.5 rounded-xl border-2 border-[#5C3F2B] shadow-2xl flex flex-col items-center gap-1 cursor-default text-[#F1E4C3]"
        >
          <div className="flex items-center justify-between w-full text-[10px] font-heading font-semibold text-[#D4BE88]">
            <span>FOLIO</span>
            <span className="text-[#D4AF37]">{percentDisplay}%</span>
          </div>

          {/* Rotating Gilded Compass */}
          <div className="relative w-10 h-10 flex items-center justify-center my-0.5">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-[#B8862B]/50 [border-style:dashed]"></div>
            {/* Cardinal marks */}
            <div className="absolute -top-0.5 text-[7px] font-heading text-[#D4BE88] font-bold">N</div>
            <div className="absolute -bottom-0.5 text-[7px] font-heading text-[#D4BE88] font-bold">S</div>
            <div className="absolute -left-0.5 text-[7px] font-heading text-[#D4BE88] font-bold">W</div>
            <div className="absolute -right-0.5 text-[7px] font-heading text-[#D4BE88] font-bold">E</div>

            {/* Rotating needle */}
            <motion.div
              style={{ rotate: compassRotation }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="w-0.5 h-7 bg-gradient-to-t from-[#5C3F2B] via-[#FAF7F0] to-[#D4AF37] relative rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]">
                <div className="absolute -top-1 -left-0.5 w-1.5 h-1.5 bg-[#7A1F1F] border border-[#D4AF37] rounded-full"></div>
              </div>
            </motion.div>
          </div>

          <div className="text-[8px] font-heading text-[#D4BE88] text-center uppercase tracking-wider">
            {scrollDirection}
          </div>
        </motion.div>

        {/* Section Node Rail */}
        <div className="relative bg-[#1A0F07]/95 backdrop-blur-md py-2 px-1.5 rounded-xl border-2 border-[#5C3F2B] shadow-2xl flex flex-col items-center gap-1.5">
          {/* Vertical Laser Fill Line */}
          <div className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-0.5 bg-[#3D2717] rounded-full overflow-hidden">
            <motion.div
              style={{ height: laserRailHeight }}
              className="w-full bg-gradient-to-b from-[#7A1F1F] via-[#D4AF37] to-[#7A1F1F]"
            />
          </div>

          {/* Section Nodes */}
          {sections.map((sec, idx) => {
            const isActive = currentSlide === idx;
            const isHovered = hoveredNode === idx;

            return (
              <motion.button
                key={sec.id}
                whileHover={{ scale: 1.15, x: -4 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => {
                  sounds.playHover();
                  setHoveredNode(idx);
                }}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  sounds.playClick();
                  onSelectSlide(sec.id);
                }}
                className={`relative z-10 w-6 h-6 rounded-md flex items-center justify-center font-heading text-[9px] font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#7A1F1F] text-[#FAF7F0] shadow-[0_0_12px_rgba(184,134,43,0.8)] scale-110 border border-[#D4AF37]'
                    : isHovered
                    ? 'bg-[#FAF4E6] text-[#7A1F1F] shadow-md border border-[#D4AF37]'
                    : 'bg-[#2A1A0E] text-[#D4BE88] hover:text-[#FAF7F0] border border-[#5C3F2B]'
                }`}
                title={`Jump to Folio ${sec.label}: ${sec.name}`}
              >
                {sec.label}

                {/* Tooltip on Hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-8 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-[#1A0F07] border border-[#B8862B] text-[#F1E4C3] text-[11px] font-heading font-semibold tracking-wider uppercase whitespace-nowrap shadow-xl flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]"></span>
                    {sec.name}
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Quick Back to Top Trigger */}
        <motion.button
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => sounds.playHover()}
          onClick={() => {
            sounds.playClick();
            onSelectSlide(0);
          }}
          className="p-1.5 rounded-xl bg-[#2A1A0E] hover:bg-[#7A1F1F] text-[#D4BE88] hover:text-[#FAF7F0] border border-[#5C3F2B] hover:border-[#D4AF37] transition-all shadow-lg flex items-center justify-center cursor-pointer group"
          title="Return to Genesis"
        >
          <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      </div>
    </>
  );
};
export default ScrollScrubberHUD;
