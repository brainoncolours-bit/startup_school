import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Star, ArrowUpRight, Zap, Plus, Rocket, Trophy, Activity, Cpu, AlertTriangle, Skull, Flame, Sparkles, Target, TrendingUp } from 'lucide-react';
import Chatbot from '../components/Chatbot';
import SnakeGame from '../components/SnakeGame';
import ZeroToHeroLoader from '../components/Loader';
import Pillars from '../components/Pillars';

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
// const ZeroToHeroLoader = ({ onComplete }) => {
//   const [count, setCount] = useState(0);
//   const [isHero, setIsHero] = useState(false);
//   const chars = "ERROR_0101_HERO_VOID_99";

//   useEffect(() => {
//     let current = 0;
//     const interval = setInterval(() => {
//       const inc = current > 80 ? 1 : Math.floor(Math.random() * 14) + 6;
//       current = Math.min(current + inc, 100);
//       setCount(current);
//       if (current === 100) {
//         setIsHero(true);
//         clearInterval(interval);
//         setTimeout(onComplete, 2000);
//       }
//     }, 60);
//     return () => clearInterval(interval);
//   }, [onComplete]);

//   return (
//     <motion.div
//       exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1] } }}
//       // This wrapper adds the "Global Blink" when nearing 100%
//       className={`fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden font-mono transition-colors duration-75 ${
//         count > 80 && count < 100 ? 'bg-[#e72132]' : 'bg-black'
//       } ${isHero ? 'animate-pulse bg-[#e72132]' : ''}`}
//     >
//       {/* Background Character Rain */}
//       <div className="absolute inset-0 opacity-20 flex flex-wrap gap-2 p-2 pointer-events-none break-all text-white">
//         {Array.from({ length: 60 }).map((_, i) => (
//           <motion.span 
//             key={i} 
//             animate={{ opacity: [0, 1, 0], color: count > 70 ? ["#fff", "#e72132", "#fff"] : "#fff" }} 
//             transition={{ repeat: Infinity, duration: 0.5 }}
//           >
//             {chars[Math.floor(Math.random() * chars.length)]}
//           </motion.span>
//         ))}
//       </div>

//       {/* Extreme Blink Overlay at Hero State */}
//       {isHero && (
//         <motion.div 
//           animate={{ opacity: [0, 1, 0] }}
//           transition={{ repeat: Infinity, duration: 0.1 }}
//           className="absolute inset-0 bg-white z-[60] pointer-events-none mix-blend-difference"
//         />
//       )}

//       {/* Pop-up Stickers */}
//       <AnimatePresence>
//         {count > 40 && (
//           <motion.div 
//             initial={{ scale: 0, rotate: -15 }} 
//             animate={{ scale: 1, x: [0, 5, -5, 0] }} 
//             transition={{ x: { repeat: Infinity, duration: 0.1 } }}
//             className="absolute top-10 left-10 bg-white p-4 border-4 border-black shadow-[8px_8px_0_#e72132] z-50"
//           >
//             <AlertTriangle className="text-[#e72132]" /> 
//             <p className="text-black font-black uppercase">Critical_Overload</p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="text-center z-50">
//         <motion.div
//           animate={count > 80 ? { x: [-3, 3, -3], y: [2, -2, 2] } : {}}
//           transition={{ repeat: Infinity, duration: 0.05 }}
//         >
//           <h1 
//             className={`text-[28vw] font-[1000] leading-none transition-colors ${
//               isHero ? 'text-white' : count > 80 ? 'text-black' : 'text-[#e72132]'
//             }`}
//             style={{ textShadow: count > 90 ? "10px 10px 0px #fff" : "none" }}
//           >
//             {isHero ? "HERO" : `${count}%`}
//           </h1>
//         </motion.div>
        
//         {isHero && (
//           <motion.div 
//             initial={{ scale: 0 }} 
//             animate={{ scale: [1, 1.5, 1], rotate: 360 }} 
//             transition={{ duration: 0.5 }}
//           >
//             <Trophy size={120} className="text-white mx-auto mt-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
//           </motion.div>
//         )}
//       </div>

//       {/* Red Progress Bar Container */}
//       <div className="absolute bottom-0 left-0 w-full h-10 bg-black border-t-4 border-white overflow-hidden">
//         <motion.div 
//           className="h-full bg-[#e72132]"
//           initial={{ width: "0%" }}
//           animate={{ width: `${count}%` }}
//         />
//       </div>
//     </motion.div>
//   );
// };

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

        {/*  SECTION - FOUNDATION OF GREATNESS */}
      <Pillars />

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