import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Zap, Target, Globe, ArrowUpRight, Fingerprint, Activity, Terminal } from 'lucide-react';

const VibrantExecutiveAbout = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  // Vibrant Parallax Transforms
  const limeBlobY = useTransform(smoothScroll, [0, 1], ["0%", "150%"]);
  const redBlobY = useTransform(smoothScroll, [0, 1], ["0%", "-120%"]);
  const rotateHero = useTransform(smoothScroll, [0, 0.2], [0, -5]);

  return (
    <div ref={containerRef} className="bg-[#f2e8d5] text-black selection:bg-[#ef6925] selection:text-white overflow-x-hidden">
      
      {/* 1. THE VINTAGE NEWSPAPER HERO */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden border-b-4 border-black bg-[#f2e8d5]">
        {/* Vintage Paper Texture (Center Spread Vibe) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-60 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(160,82,45,0.08)_100%)] pointer-events-none mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#f2e8d5] opacity-20 mix-blend-color-burn pointer-events-none" />
        
        {/* Background Marquee Watermark */}
         <div className="absolute top-20 left-0 flex whitespace-nowrap opacity-[0.03] pointer-events-none select-none mix-blend-color-burn">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[20vh] font-black mr-20 text-black">ABOUT_US // MISSION // VALUES //</span>
            ))}
         </div>

        <motion.div style={{ rotate: rotateHero }} className="z-10 text-center px-6 grayscale-[0.1] sepia-[0.15]">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }}
            className="inline-flex items-center gap-2 bg-black text-[#f2e8d5] border border-black px-6 py-2 mb-10 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
          >
            <Terminal size={16} />
            <span className="font-mono text-xs font-black uppercase tracking-[0.3em]">System.Initialize(Legacy)</span>
          </motion.div>
          
          <h1 className="text-[14vw] font-black uppercase leading-[0.7] tracking-tighter text-[#1a1a1a]">
            Pure <br /> <span className="text-[#ef6925] mix-blend-multiply italic">Kinetic</span> <br /> Power.
          </h1>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <div className="w-[1px] h-12 bg-black animate-bounce" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">Protocol Start</span>
        </div>
      </section>

      {/* 2. THE ENERGY GRID (Horizontal Momentum) */}
      <section className="py-40 bg-black text-white relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-7xl md:text-9xl font-black italic uppercase leading-none mb-12">
              The <br /><span className="text-[#a5cb3a]">Pulse.</span>
            </h2>
            <p className="text-2xl font-bold leading-tight text-slate-400 border-l-8 border-[#a5cb3a] pl-8">
              Wealth is not a static number. It is a frequency. We help you tune into the highest yields of global influence.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 gap-6">
            <VibrantCard icon={<Zap color="#a5cb3a" />} title="Velocity" desc="Executing at the speed of thought." />
            <VibrantCard icon={<Target color="#e72132" />} title="Precision" desc="Zero-margin for error governance." />
            <VibrantCard icon={<Globe color="#f79e27" />} title="Domain" desc="Jurisdictional sovereignty everywhere." />
          </div>
        </div>
      </section>

      {/* 3. THE "COLOR-POP" MARQUEE */}
      <div className="py-20 bg-[#f79e27] overflow-hidden border-y-4 border-black">
        <motion.div 
          style={{ x: useTransform(smoothScroll, [0, 1], ["0%", "-50%"]) }}
          className="flex gap-20 whitespace-nowrap"
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-8xl font-black italic uppercase text-black">
              • NO LIMITS • HIGH ALPHA • SOVEREIGN •
            </span>
          ))}
        </motion.div>
      </div>

      {/* 4. THE BOARD (Vibrant Portraits) */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter">The <span className="text-[#e72132]">Board.</span></h2>
            <Activity className="text-[#a5cb3a] animate-pulse" size={48} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <MemberBox name="Aris" role="Capital Strategy" color="#a5cb3a" />
            <MemberBox name="Vance" role="Intelligence" color="#e72132" />
            <MemberBox name="Thorne" role="Logistics" color="#f79e27" />
          </div>
        </div>
      </section>

      {/* 5. THE ULTIMATUM (High Contrast CTA) */}
      <section className="py-60 bg-black text-center relative overflow-hidden">
        {/* Animated Background Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10 border-[100px] border-dashed border-white rounded-full scale-150"
        />

        <div className="relative z-10 px-6">
          <Fingerprint size={80} className="mx-auto text-[#a5cb3a] mb-12" />
          <h2 className="text-6xl md:text-9xl font-black italic uppercase text-white mb-16 leading-none">
            Accept the <br /> <span className="text-[#a5cb3a]">Contract.</span>
          </h2>
          <button className="group relative bg-[#e72132] text-white px-20 py-8 rounded-none font-black italic uppercase tracking-[0.4em] text-2xl hover:bg-[#a5cb3a] hover:text-black transition-all duration-500 shadow-[20px_20px_0px_white]">
            Initialize Access
          </button>
        </div>
      </section>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const VibrantCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ x: 20, backgroundColor: "#111" }}
    className="p-10 border-2 border-white/10 rounded-3xl transition-all cursor-pointer group"
  >
    <div className="flex items-center gap-6">
      <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-125 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-black italic uppercase tracking-tighter">{title}</h3>
        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">{desc}</p>
      </div>
      <ArrowUpRight className="ml-auto opacity-20 group-hover:opacity-100 transition-opacity" />
    </div>
  </motion.div>
);

const MemberBox = ({ name, role, color }) => (
  <div className="group relative overflow-hidden">
    <div className="aspect-[4/5] bg-slate-100 mb-8 relative overflow-hidden transition-all duration-500 group-hover:shadow-[20px_20px_0px_#000]">
       <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />
       <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity"
        style={{ backgroundColor: color }}
       />
    </div>
    <h3 className="text-4xl font-black italic uppercase tracking-tighter">{name}</h3>
    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] mt-2 opacity-50" style={{ color }}>{role}</p>
  </div>
);

export default VibrantExecutiveAbout;