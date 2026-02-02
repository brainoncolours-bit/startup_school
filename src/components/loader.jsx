import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, AlertTriangle } from 'lucide-react';

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

export default ZeroToHeroLoader;