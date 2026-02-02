import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Star, ArrowUpRight, Zap, Plus, Rocket, Trophy, Activity, Cpu, AlertTriangle, Skull, Flame, Sparkles, Target, TrendingUp } from 'lucide-react';
import Chatbot from '../components/Chatbot';
import SnakeGame from '../components/SnakeGame';

// --- 1. MAGNETIC WRAPPER ---
const MagneticBox = ({ children, strength = 20 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) / strength);
    y.set((clientY - centerY) / strength);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

// --- 2. CHAOTIC RED BLINK LOADER ---
const ZeroToHeroLoader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isHero, setIsHero] = useState(false);
  const chars = "ERROR_0101_HERO_VOID_99";

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const inc = current > 80 ? 1 : Math.floor(Math.random() * 14) + 6;
      current = Math.min(current + inc, 100);
      setCount(current);
      if (current === 100) {
        setIsHero(true);
        clearInterval(interval);
        setTimeout(onComplete, 2000);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1] } }}
      // This wrapper adds the "Global Blink" when nearing 100%
      className={`fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden font-mono transition-colors duration-75 ${
        count > 80 && count < 100 ? 'bg-[#e72132]' : 'bg-black'
      } ${isHero ? 'animate-pulse bg-[#e72132]' : ''}`}
    >
      {/* Background Character Rain */}
      <div className="absolute inset-0 opacity-20 flex flex-wrap gap-2 p-2 pointer-events-none break-all text-white">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.span 
            key={i} 
            animate={{ opacity: [0, 1, 0], color: count > 70 ? ["#fff", "#e72132", "#fff"] : "#fff" }} 
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            {chars[Math.floor(Math.random() * chars.length)]}
          </motion.span>
        ))}
      </div>

      {/* Extreme Blink Overlay at Hero State */}
      {isHero && (
        <motion.div 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.1 }}
          className="absolute inset-0 bg-white z-[60] pointer-events-none mix-blend-difference"
        />
      )}

      {/* Pop-up Stickers */}
      <AnimatePresence>
        {count > 40 && (
          <motion.div 
            initial={{ scale: 0, rotate: -15 }} 
            animate={{ scale: 1, x: [0, 5, -5, 0] }} 
            transition={{ x: { repeat: Infinity, duration: 0.1 } }}
            className="absolute top-10 left-10 bg-white p-4 border-4 border-black shadow-[8px_8px_0_#e72132] z-50"
          >
            <AlertTriangle className="text-[#e72132]" /> 
            <p className="text-black font-black uppercase">Critical_Overload</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center z-50">
        <motion.div
          animate={count > 80 ? { x: [-3, 3, -3], y: [2, -2, 2] } : {}}
          transition={{ repeat: Infinity, duration: 0.05 }}
        >
          <h1 
            className={`text-[28vw] font-[1000] leading-none transition-colors ${
              isHero ? 'text-white' : count > 80 ? 'text-black' : 'text-[#e72132]'
            }`}
            style={{ textShadow: count > 90 ? "10px 10px 0px #fff" : "none" }}
          >
            {isHero ? "HERO" : `${count}%`}
          </h1>
        </motion.div>
        
        {isHero && (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: [1, 1.5, 1], rotate: 360 }} 
            transition={{ duration: 0.5 }}
          >
            <Trophy size={120} className="text-white mx-auto mt-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
          </motion.div>
        )}
      </div>

      {/* Red Progress Bar Container */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-black border-t-4 border-white overflow-hidden">
        <motion.div 
          className="h-full bg-[#e72132]"
          initial={{ width: "0%" }}
          animate={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  );
};

// --- 3. MAIN SITE COMPONENT ---
export default function NeoBrutalHome() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroRotate = useTransform(smoothProgress, [0, 0.2], [0, -5]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);

  return (
    <>
      <AnimatePresence>
        {loading && <ZeroToHeroLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="bg-[#43646b] text-white selection:bg-[#e72132] selection:text-white min-h-screen cursor-none">
        
        {/* CUSTOM CURSOR - Realistic Mini Rocket */}
        <motion.div 
          className="fixed z-[999] pointer-events-none hidden md:block"
          animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
        >
          <motion.div
            animate={{ 
              rotate: -45,
              scale: isHovered ? 1.4 : 1,
              y: [0, -3, 0],
            }}
            transition={{ 
              scale: { duration: 0.2 },
              y: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-6 h-6"
          >
            {/* Rocket Body - Main Structure */}
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="relative z-20">
              {/* Rocket Nose Cone */}
              <motion.path 
                d="M8 0 L11 4 L5 4 Z" 
                fill="#1da89d" 
                stroke="#000" 
                strokeWidth="0.4"
                animate={{ fill: ["#1da89d", "#2dcfbd", "#1da89d"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {/* Rocket Body */}
              <motion.rect 
                x="5.5" 
                y="4" 
                width="5" 
                height="6" 
                fill="#43646b" 
                stroke="#000" 
                strokeWidth="0.4"
                animate={{ fill: ["#43646b", "#5a7f87", "#43646b"] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              
              {/* Window - Pulsing */}
              <motion.circle 
                cx="8" 
                cy="6.5" 
                r="1" 
                fill="#f9bb1a" 
                stroke="#fff" 
                strokeWidth="0.3"
                animate={{ 
                  fill: ["#f9bb1a", "#fff", "#f9bb1a"],
                  scale: [1, 1.15, 1]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              
              {/* Left Fin */}
              <motion.path 
                d="M5.5 7 L3 9 L5.5 9 Z" 
                fill="#a5cb3a" 
                stroke="#000" 
                strokeWidth="0.4"
                animate={{ fill: ["#a5cb3a", "#c4f04d", "#a5cb3a"] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
              
              {/* Right Fin */}
              <motion.path 
                d="M10.5 7 L13 9 L10.5 9 Z" 
                fill="#a5cb3a" 
                stroke="#000" 
                strokeWidth="0.4"
                animate={{ fill: ["#a5cb3a", "#c4f04d", "#a5cb3a"] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
              
              {/* Flame - Cyan Layer */}
              <motion.path 
                d="M6 10 L7 12 L8 10.5 L9 12 L10 10 L9 11 L8 13 L7 11 Z" 
                fill="#1da89d"
                animate={{
                  scaleY: [1, 1.3, 0.9, 1.2, 1],
                  opacity: [0.9, 0.6, 0.8, 0.7, 0.9],
                  x: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 0.15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Flame - Lime Core */}
              <motion.path 
                d="M6.5 10 L7.5 11.5 L8 10.5 L8.5 11.5 L9.5 10 L8 12 Z" 
                fill="#a5cb3a"
                animate={{
                  scaleY: [1, 1.4, 0.8, 1.3, 1],
                  opacity: [1, 0.7, 0.9, 0.8, 1],
                  x: [0, -1, 1, 0]
                }}
                transition={{
                  duration: 0.12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Flame - Hot Core */}
              <motion.circle 
                cx="8" 
                cy="10.5" 
                r="0.8"
                fill="#f9bb1a"
                animate={{
                  scale: [1, 1.5, 0.8, 1.4, 1],
                  opacity: [1, 0.5, 0.9, 0.6, 1],
                  fill: ["#f9bb1a", "#fff", "#f9bb1a", "#ffd700", "#f9bb1a"]
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
            
            {/* Exhaust Glow - Enhanced */}
            <motion.div
              animate={{
                scale: [1, 1.8, 1.2, 1.6, 1],
                opacity: [0.4, 0.15, 0.3, 0.2, 0.4],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-5 bg-gradient-to-b from-[#a5cb3a] via-[#1da89d] to-transparent rounded-full blur-[3px] rotate-45"
            />
            
            {/* Additional Glow Layer */}
            <motion.div
              animate={{
                scale: [1.2, 2, 1.5, 1.8, 1.2],
                opacity: [0.2, 0.05, 0.15, 0.08, 0.2],
              }}
              transition={{
                duration: 0.25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-6 bg-gradient-to-b from-[#f9bb1a] to-transparent rounded-full blur-[4px] rotate-45"
            />
            
            {/* Spark Particles - More Dynamic */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, -10 - i * 4, -5 - i * 3],
                  y: [0, -10 - i * 4, -5 - i * 3],
                  opacity: [1, 0, 0],
                  scale: [1, 0.5, 0]
                }}
                transition={{
                  duration: 0.5 + i * 0.1,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: "easeOut"
                }}
                className={`absolute bottom-0 left-1/2 w-0.5 h-0.5 rounded-full ${
                  i % 2 === 0 ? 'bg-[#1da89d]' : 'bg-[#a5cb3a]'
                }`}
              />
            ))}
            
            {/* Speed Lines/Vapor Trail */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`trail-${i}`}
                animate={{
                  x: [0, -15 - i * 5],
                  y: [0, -15 - i * 5],
                  opacity: [0.4, 0],
                  scaleX: [0.5, 1.5, 0]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeOut"
                }}
                className="absolute bottom-1 left-1 w-3 h-0.5 bg-gradient-to-r from-[#1da89d]/60 to-transparent rounded-full rotate-45"
              />
            ))}
            
            {/* Hover Effect - Energy Ring */}
            {isHovered && (
              <motion.div
                initial={{ scale: 1, opacity: 0 }}
                animate={{ 
                  scale: [1, 2.5, 1],
                  opacity: [0.5, 0, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 border-2 border-[#f9bb1a] rounded-full"
              />
            )}
          </motion.div>
        </motion.div>

        {/* HERO SECTION */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden bg-[#f9bb1a]">
          <motion.div style={{ rotate: heroRotate, scale: heroScale }} className="z-10 text-center px-4">
            <motion.div initial={{ y: 100, opacity: 0 }} animate={!loading ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              <h1 className="text-[18vw] sm:text-[14vw] font-[950] leading-[0.8] text-black uppercase -tracking-[0.08em]">
                Victory  <br/>In Sight
              </h1>
            </motion.div>
            
            <MagneticBox>
              <button 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="mt-8 sm:mt-12 bg-[#e72132] text-white px-6 sm:px-10 py-3 sm:py-5 text-lg sm:text-2xl font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all border-2 sm:border-4 border-black"
              >
                Enter the Void
              </button>
            </MagneticBox>
          </motion.div>

          <motion.div style={{ y: useTransform(smoothProgress, [0, 1], [0, -500]) }} className="hidden lg:block absolute top-20 left-[10%]">
            <div className="bg-[#a5cb3a] p-4 border-4 border-black shadow-[10px_10px_0px_0px_#000]">
              <Star size={80} fill="currentColor" className="text-black" />
            </div>
          </motion.div>
        </section>

        {/* MARQUEE */}
        <div className="bg-[#e72132] border-y-2 sm:border-y-4 border-black py-4 sm:py-8 overflow-hidden flex whitespace-nowrap rotate-[-1deg] scale-105 z-20 relative">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="text-3xl sm:text-5xl md:text-7xl font-black uppercase flex items-center gap-6 sm:gap-12 pr-6 sm:pr-12 text-black"
          >
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                <span>We are not an MBA.
not theory-heavy.
not passive learning.</span> <Zap className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" fill="black" />
                
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* BENTO GRID */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-[#f1f1f1]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8">
            <motion.div whileHover={{ y: -10 }} className="md:col-span-8 bg-[#1da89d] p-6 sm:p-8 md:p-12 border-2 sm:border-4 border-black shadow-[8px_8px_0px_0px_#43646b] sm:shadow-[15px_15px_0px_0px_#43646b]">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-black mb-4 sm:mb-6 uppercase">Strategy</h2>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-white max-w-lg leading-tight">
                From learning to execution, we prepare you for the real startup world.Our strategy is simple: real problems, real execution, real outcomes.
              </p>
            </motion.div>
            <motion.div whileHover={{ rotate: 5 }} className="md:col-span-4 bg-[#ef6925] flex items-center justify-center border-2 sm:border-4 border-black shadow-[8px_8px_0px_0px_#000] sm:shadow-[15px_15px_0px_0px_#000] min-h-[200px] sm:min-h-[250px]">
              <ArrowUpRight className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36" strokeWidth={3} />
            </motion.div>
          </div>
        </section>

        {/* PILLARS SECTION - FOUNDATION OF GREATNESS */}
        <section className="py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-10 bg-black text-white relative overflow-hidden">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(#e72132 2px, transparent 2px), linear-gradient(90deg, #e72132 2px, transparent 2px)',
              backgroundSize: '60px 60px'
            }}/>
          </div>

          {/* Floating Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-[15%] w-40 h-40 bg-[#f9bb1a]/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-40 left-[10%] w-60 h-60 bg-[#1da89d]/20 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="mb-16 sm:mb-24 text-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-none mb-8 border-4 border-black shadow-[6px_6px_0px_0px_#e72132]"
              >
                <Trophy className="w-6 h-6 text-[#f9bb1a] fill-[#f9bb1a]" />
                <span className="text-sm font-black uppercase tracking-wider text-black">Foundation Built Different</span>
                <Trophy className="w-6 h-6 text-[#f9bb1a] fill-[#f9bb1a]" />
              </motion.div>
              
              {/* Main Title - Stacked */}
              <div className="space-y-2 mb-8">
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="overflow-hidden"
                >
                  <h2 className="text-[18vw] sm:text-[14vw] md:text-[12vw] font-[950] leading-[0.75] uppercase -tracking-[0.08em] text-white">
                    THE
                  </h2>
                </motion.div>
                
                <motion.div 
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="overflow-hidden"
                >
                  <h2 className="text-[18vw] sm:text-[14vw] md:text-[12vw] font-[950] leading-[0.75] uppercase -tracking-[0.08em] text-[#e72132]">
                    SIX
                  </h2>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="overflow-hidden"
                >
                  <h2 className="text-[18vw] sm:text-[14vw] md:text-[12vw] font-[950] leading-[0.75] uppercase -tracking-[0.08em] text-[#f9bb1a]">
                    PILLARS
                  </h2>
                </motion.div>
              </div>

              {/* Subtitle */}
              <motion.p 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
  viewport={{ once: true }}
  /* Changed "font-black" to "font-normal" */
  className="text-lg sm:text-xl md:text-2xl font-normal text-gray-400 max-w-3xl mx-auto uppercase tracking-wide"
>
  <span className="text-white">What holds us up when the world tries to tear us down.</span>
  <br className="hidden sm:block"/>
  <span className="text-[#1da89d]">Each pillar, a promise. Each promise, unbreakable.</span>
</motion.p>
            </motion.div>

            {/* Pillars Layout - 3x2 Grid with Visual Pillar Design */}
            <div className="relative">
              {/* Top "Roof" Element */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
                className="hidden lg:block absolute -top-12 left-0 right-0 h-8 bg-white border-4 border-black shadow-[0_8px_0px_0px_#e72132] z-20"
              >
                <motion.div 
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2"
                >
                  <Star className="w-12 h-12 fill-[#f9bb1a] text-black" strokeWidth={3} />
                </motion.div>
              </motion.div>

              {/* Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative">
                {[
                  { 
                    number: "01",
                    icon: <Zap size={48} />,
                    title: 'Operations',
                    subtitle: 'Speed That Shocks',
                    desc: 'Master execution — streamline processes,manage people, and scale your businessefficiently.',
                    color: '#f9bb1a',
                    accentColor: '#000'
                  },
                  { 
                    number: "02",
                    icon: <Activity size={48} />,
                    title: 'Technology',
                    subtitle: 'Never Stops, Never Quits',
                    desc: 'Understand how tech drives innovationand learn to leverage tools, automation,and AI to build smarter businesses..',
                    color: '#ef6925',
                    accentColor: '#fff'
                  },
                  { 
                    number: "03",
                    icon: <Cpu size={48} />,
                    title: 'Finance',
                    subtitle: 'Scale Without Limits',
                    desc: 'Get control of your numbers, budgeting,funding, investor pitches, and financialsustainability simplified for non-financefounders.',
                    color: '#1da89d',
                    accentColor: '#000'
                  },
                  { 
                    number: "04",
                    icon: <Skull size={48} />,
                    title: 'AUTHENTIC',
                    subtitle: 'Real Recognizes Real',
                    desc: 'No fake vibes. No cap. No BS. Just raw, unfiltered truth and execution.',
                    color: '#e72132',
                    accentColor: '#fff'
                  },
                  { 
                    number: "05",
                    icon: <Trophy size={48} />,
                    title: 'R&D RESEARCH & DEVELOPMENT',
                    subtitle: 'Only First Place Matters',
                    desc: 'Innovate continuously. Learn to adapt,test, and evolve your product to sta',
                    color: '#a5cb3a',
                    accentColor: '#000'
                  },
                  { 
                    number: "06",
                    icon: <Rocket size={48} />,
                    title: 'SALES',
                    subtitle: 'Always Moving Forward',
                    desc: 'Turn value into revenue learn customerconversion, negotiation, and scalingtechniques that close deals faster.',
                    color: '#43646b',
                    accentColor: '#fff'
                  }
                ].map((pillar, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: idx * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="relative group"
                  >
                    {/* Pillar Structure */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      {/* Pillar Top Capital */}
                      <div 
                        className="h-6 sm:h-8 border-4 border-black mb-2"
                        style={{ backgroundColor: pillar.color }}
                      >
                        <motion.div
                          animate={{ scaleX: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      </div>

                      {/* Main Pillar Body */}
                      <div 
                        className="min-h-[400px] sm:min-h-[450px] border-4 border-black p-6 sm:p-8 relative overflow-hidden"
                        style={{ backgroundColor: pillar.color }}
                      >
                        {/* Vertical Grooves - Pillar Effect */}
                        <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0.1, 0.3, 0.1] }}
                              transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                              className="w-1 h-full bg-black"
                            />
                          ))}
                        </div>

                        {/* Pillar Number Badge */}
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-black border-4 border-white flex items-center justify-center z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                        >
                          <span className="text-2xl sm:text-3xl font-[950] text-white">{pillar.number}</span>
                        </motion.div>

                        {/* Hover Glow Effect */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/20 pointer-events-none"
                        />

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon with Circular BG */}
                          <motion.div
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="mb-6 inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)]"
                          >
                            <motion.div
                              animate={{ 
                                y: [0, -5, 0],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              style={{ color: pillar.color }}
                            >
                              {pillar.icon}
                            </motion.div>
                          </motion.div>

                          {/* Title */}
                          <motion.h3 
                            className="text-4xl sm:text-5xl font-[950] mb-2 uppercase -tracking-[0.05em] leading-none"
                            style={{ color: pillar.accentColor }}
                          >
                            {pillar.title}
                          </motion.h3>

                          {/* Subtitle */}
                          <motion.p 
                            className="text-lg sm:text-xl font-black uppercase mb-6 opacity-80"
                            style={{ color: pillar.accentColor }}
                          >
                            {pillar.subtitle}
                          </motion.p>

                          {/* Divider Line */}
                          <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ delay: idx * 0.15 + 0.5 }}
                            className="h-1 w-20 bg-black mb-6 origin-left"
                          />

                          {/* Description */}
                          <motion.p 
                            className="text-sm sm:text-base font-bold leading-relaxed"
                            style={{ color: pillar.accentColor === '#fff' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)' }}
                          >
                            {pillar.desc}
                          </motion.p>

                          {/* Bottom Accent */}
                          <motion.div
                            animate={{ 
                              scaleX: [1, 1.1, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute bottom-6 left-6 right-6 h-2 bg-black/20"
                          />
                        </div>

                        {/* Pillar Cracks/Details */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none opacity-10">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute bottom-0 bg-black"
                              style={{
                                left: `${20 + i * 30}%`,
                                width: '2px',
                                height: `${40 + i * 15}px`,
                                transform: `rotate(${-5 + i * 5}deg)`
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Pillar Base */}
                      <div 
                        className="h-4 sm:h-6 border-4 border-black mt-2 relative overflow-hidden"
                        style={{ backgroundColor: pillar.color }}
                      >
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </div>

                      {/* Shadow underneath */}
                      <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/40 blur-sm -z-10"/>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom "Foundation" Element */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                viewport={{ once: true }}
                className="hidden lg:block absolute -bottom-8 left-0 right-0 h-12 bg-black border-4 border-white z-20"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-white font-black text-xl uppercase tracking-widest"
                  >
                    UNSHAKEABLE FOUNDATION
                  </motion.span>
                </div>
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="mt-20 sm:mt-28 text-center"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(231,33,50,0.5)",
                  rotate: 2
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 sm:px-12 md:px-16 py-5 sm:py-6 md:py-8 bg-white text-black font-[950] text-xl sm:text-2xl md:text-3xl uppercase -tracking-[0.03em] border-4 border-black shadow-[10px_10px_0px_0px_#e72132] hover:shadow-[15px_15px_0px_0px_#e72132] transition-all overflow-hidden"
              >
                <motion.span className="relative z-10 flex items-center gap-3 sm:gap-4">
                  <Trophy className="w-7 h-7 sm:w-8 sm:h-8 fill-[#f9bb1a]" />
                  STAND ON THESE PILLARS
                  <Trophy className="w-7 h-7 sm:w-8 sm:h-8 fill-[#f9bb1a]" />
                </motion.span>
                
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-[#e72132]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-6 text-gray-400 font-bold text-sm sm:text-base uppercase tracking-wide"
              >
                Built to last. Designed to dominate. Ready to rise.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <footer className="min-h-[60vh] sm:min-h-[70vh] md:h-[80vh] bg-[#1da89d] text-black flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
          <motion.h2 initial={{ scale: 0.5 }} whileInView={{ scale: 1 }} className="text-[25vw] sm:text-[20vw] font-black leading-none text-black text-center mb-8 sm:mb-12">READY?</motion.h2>
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 w-full flex-wrap">
            {['Instagram', 'Twitter', 'Dribbble'].map(link => (
              <motion.button
                key={link}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 sm:border-4 border-black bg-black text-white px-8 sm:px-12 py-4 font-bold hover:bg-white hover:text-black transition-all uppercase font-black w-40 sm:w-48 text-center"
              >
                {link}
              </motion.button>
            ))}
          </div>
        </footer>
      </div>
      
      {/* Chatbot */}
      <Chatbot />
      
      {/* Snake Game */}
      <SnakeGame />
    </>
  );
}