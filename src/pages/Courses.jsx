import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {  Cpu,  AlertTriangle,  Zap,  ArrowDownRight,  Fingerprint,  Activity,  Maximize2 } from 'lucide-react';

const OverloadMatrix = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Extreme background warping
  const bgSkew = useTransform(smoothProgress, [0, 1], [0, 20]);
  const bgScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.5, 1]);

  return (
    <div ref={containerRef} className="bg-[#f2e8d5] text-[#1a1a1a] font-black overflow-hidden selection:bg-[#ef6925]">
      
      {/* 1. THE "NEWSPAPER" HERO (Radical Alpha) */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden border-b-4 border-black">
        {/* Vintage Paper Overlay with Warp Effects */}
        <motion.div 
          style={{ skewY: bgSkew, scale: bgScale }}
          className="absolute inset-0 z-0"
        >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-60 mix-blend-multiply" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(160,82,45,0.08)_100%)] mix-blend-multiply" />
             <div className="absolute inset-0 bg-[#f2e8d5] opacity-20 mix-blend-color-burn" />
        </motion.div>
        
        {/* Rapid Pulsing Overlay (Subtle Ink Bleed) */}
        <motion.div 
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          className="absolute inset-0 bg-[#ef6925]/10 mix-blend-multiply pointer-events-none"
        />

        <div className="z-10 text-center relative grayscale-[0.1] sepia-[0.15]">
          <motion.div
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 flex justify-center"
          >
            <div className="px-4 py-1 bg-black text-[#f2e8d5] font-mono text-[10px] tracking-[0.5em] animate-pulse border border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
              CRITICAL ACCESS ONLY
            </div>
          </motion.div>
          <h1 className="text-[18vw] leading-[0.7] italic uppercase tracking-tighter text-[#1a1a1a] drop-shadow-none">
            RADICAL <br /> <span className="text-[#ef6925] mix-blend-multiply">ALPHA.</span>
          </h1>
          <div className="mt-12 flex items-center justify-center gap-4 text-black/70">
            <Activity size={20} />
            <span className="font-mono text-xs tracking-widest uppercase">ENROLLMENT_SEQUENCE_START</span>
          </div>
        </div>

        {/* Floating Technical HUD (Dark Ink) */}
        <div className="absolute bottom-10 left-10 text-[10px] font-mono text-black/40 space-y-1 font-bold">
          <p>LOAD_SECTOR: 0x882</p>
          <p>LATENCY: 0.002MS</p>
          <p>STATUS: UNFILTERED</p>
        </div>
      </section>

      {/* 2. THE CONTENT GATE (Pinned & Unskippable) */}
      <div className="relative">
        <ExtremeRow 
          num="01" 
          title="LIQUID WARFARE" 
          desc="The mechanics of moving 9-figure capital across borders in under 30 seconds. Zero friction. Zero footprint."
          accent="#e72132"
        />
        <ExtremeRow 
          num="02" 
          title="GHOST PROTOCOLS" 
          desc="Architecting personal and corporate layers that exist outside standard jurisdictional reach."
          accent="#a5cb3a"
          reverse
        />
        <ExtremeRow 
          num="03" 
          title="GENESIS BLOCKS" 
          desc="Final-stage legacy construction. Ensuring your power is transmitted to the next generation without leakage."
          accent="#f79e27"
        />
      </div>

      {/* 3. THE "BRAIN-MELT" DATA GRID */}
      <section className="py-40 bg-[#a5cb3a] text-black">
        <div className="max-w-full overflow-hidden whitespace-nowrap flex border-y-[10px] border-black py-10">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 text-[10vw] italic leading-none"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i}>BEYOND THE NORM // NO REGULATION // PURE CAPITAL //</span>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-40 grid grid-cols-1 md:grid-cols-3 gap-4">
           <DataPoint label="AVG EXIT" value="840M" />
           <DataPoint label="NETWORK" value="ELITE" />
           <DataPoint label="SLOTS" value="09 / 50" />
        </div>
      </section>

      {/* 4. THE ULTIMATUM (Extreme CTA) */}
      <section className="min-h-screen bg-black flex flex-col items-center justify-center relative px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#e72132_0%,_transparent_70%)] opacity-20 animate-pulse" />
        
        <div className="z-10 bg-white text-black p-10 md:p-20 max-w-5xl w-full border-[20px] border-[#e72132] relative">
          <div className="absolute -top-10 -left-10 bg-black text-white p-4">
             <Fingerprint size={48} />
          </div>
          
          <h2 className="text-7xl md:text-9xl font-black italic uppercase leading-none mb-10">
            SECURE <br /> YOUR <span className="text-[#e72132]">LEGACY.</span>
          </h2>
          
          <p className="text-2xl font-bold mb-12 leading-tight uppercase">
            Initial application requires asset verification. Not all applicants will be accepted.
          </p>

          <button className="w-full bg-black text-white py-10 text-4xl font-black italic uppercase hover:bg-[#e72132] transition-colors flex items-center justify-center gap-6 group">
            INITIATE APPLICATION <ArrowDownRight className="group-hover:rotate-45 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const ExtremeRow = ({ num, title, desc, accent, reverse }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  return (
    <section ref={ref} className={`min-h-screen flex items-center p-6 relative transition-colors duration-700 overflow-hidden ${isInView ? 'bg-[#f2e8d5] text-[#1a1a1a]' : 'bg-black text-white'}`}>
      
      {/* VINTAGE TEXTURE OVERLAYS (Only visible in light mode) */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(160,82,45,0.08)_100%)] mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#f2e8d5] opacity-20 mix-blend-color-burn" />
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-20 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-4">
             <span className="text-2xl font-mono" style={{ color: accent }}>[{num}]</span>
             <div className="h-[2px] flex-1 bg-current opacity-20" />
          </div>
          <motion.h2 
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            className="text-7xl md:text-[10vw] leading-[0.8] italic uppercase tracking-tighter"
          >
            {title}
          </motion.h2>
          <p className="text-2xl font-serif font-medium leading-tight opacity-80 italic">
            {desc}
          </p>
          <div className="flex gap-4">
             <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center animate-spin-slow">
                <Maximize2 size={16} />
             </div>
             <span className="font-mono text-[10px] uppercase font-bold self-center tracking-widest">Protocol_Detail_Expanded</span>
          </div>
        </div>

        <div className="flex-1 w-full relative">
           <motion.div 
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: -10 }}
            className="aspect-square bg-current opacity-10 absolute -inset-4 rounded-full blur-3xl"
           />
           <div className={`aspect-[4/5] bg-neutral-900 border-[10px] border-current flex items-center justify-center overflow-hidden shadow-2xl ${isInView ? 'grayscale sepia-[0.2] contrast-125' : ''}`}>
              <Cpu size={120} className="text-white animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
           </div>
        </div>

      </div>
    </section>
  );
};

const DataPoint = ({ label, value }) => (
  <div className="border-4 border-black p-10 flex flex-col items-center group hover:bg-black hover:text-white transition-all">
    <span className="font-mono text-xs font-black mb-4 tracking-[0.4em]">{label}</span>
    <span className="text-7xl font-black italic uppercase leading-none">{value}</span>
  </div>
);

export default OverloadMatrix;