import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Newspaper, ChevronDown, Landmark, TrendingUp, ShieldCheck, ArrowUpRight, Globe, Zap, Cpu } from 'lucide-react';

const NewspaperOpening = ({ onNavbarShow }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      if (v >= 0.3 && onNavbarShow) onNavbarShow(true);
      else if (v < 0.3 && onNavbarShow) onNavbarShow(false);
    });
    return () => unsubscribe();
  }, [smoothProgress, onNavbarShow]);

  // Timing
  const leftFold = useTransform(smoothProgress, [0, 0.45], [0, -125]);
  const rightFold = useTransform(smoothProgress, [0, 0.45], [0, 125]);
  const contentScale = useTransform(smoothProgress, [0.25, 0.6], [0.75, 1]);
  const contentOpacity = useTransform(smoothProgress, [0.35, 0.55], [0, 1]);

  // Parallax Factors
  const cardX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const cardY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);

  return (
    <div onMouseMove={handleMouseMove} className="bg-[#080a0b] text-white selection:bg-[#a5cb3a] selection:text-black">
      
      <section ref={containerRef} className="h-[400vh] relative perspective-2000">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          
          {/* THE ENHANCED WHITE SECTION */}
          <motion.div 
            style={{ 
              scale: contentScale, 
              opacity: contentOpacity, 
              transformStyle: "preserve-3d"
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 bg-[#fcfcfc] overflow-hidden"
          >
            {/* Animated Gradient Background Blobs */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] bg-gradient-to-br from-[#f79e27] to-[#ef6925]"
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[150px] bg-gradient-to-tr from-[#a5cb3a] to-[#43646b]"
            />

            {/* Interactive Grid Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <div className="max-w-7xl w-full relative z-10">
              {/* Top Bar */}
              <div className="flex justify-between items-start mb-12 border-b-4 border-black pb-6">
                <div>
                  <motion.div 
                    animate={{ backgroundColor: ["#e72132", "#f79e27", "#a5cb3a", "#e72132"] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="h-2 w-32 mb-4"
                  />
                  <h4 className="font-mono text-[10px] font-black tracking-[0.5em] uppercase text-black">
                    Institutional Alpha Stream // 2026.4
                  </h4>
                </div>
                <div className="text-right font-mono text-[10px] text-slate-400">
                  <p>LATENCY: 0.002ms</p>
                  <p className="text-[#a5cb3a] font-bold">ENCRYPTION: AES-512</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-6">
                  <motion.h2 
                    className="text-7xl md:text-[120px] font-black italic uppercase leading-[0.75] tracking-tighter"
                  >
                    <span className="text-black">Pure</span><br /> 
                    <motion.span 
                      animate={{ color: ["#e72132", "#ef6925", "#f79e27", "#e72132"] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    >
                      Monetary
                    </motion.span><br /> 
                    <span className="text-[#43646b]">Clarity.</span>
                  </motion.h2>
                  
                  {/* Executive Features */}
                  <div className="mt-12 flex gap-6">
                    <FeatureIcon icon={<Globe className="text-[#43646b]" />} label="Global Basis" />
                    <FeatureIcon icon={<Zap className="text-[#f79e27]" />} label="High Frequency" />
                    <FeatureIcon icon={<Cpu className="text-[#a5cb3a]" />} label="AI Governance" />
                  </div>
                </div>

                {/* 3D Interactive Dashboard Area */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <motion.div style={{ x: cardX, y: cardY }} className="grid grid-cols-2 gap-4">
                     <QuickStat label="NET WORTH ALPHA" value="+18.4%" trend="up" />
                     <QuickStat label="LIQUIDITY RATIO" value="0.94" trend="stable" />
                  </motion.div>
                  
                  <InteractiveCard 
                    icon={<Landmark size={28} className="text-[#a5cb3a]" />} 
                    title="Asset Velocity" 
                    desc="Real-time capital re-allocation engine."
                    mouseX={mouseX} mouseY={mouseY}
                  />
                  <InteractiveCard 
                    icon={<TrendingUp size={28} className="text-[#f79e27]" />} 
                    title="Market Yield" 
                    desc="Current optimized return: 9.42% APY."
                    mouseX={mouseX} mouseY={mouseY}
                    highlight
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* NEWSPAPER FOLDS (STAY SAME) */}
          <div className="relative w-full h-full flex z-20 pointer-events-none">
            <motion.div style={{ rotateY: leftFold, originX: 0 }} className="w-1/2 h-full bg-[#111] border-r border-white/10 flex items-center justify-end pr-12 relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
              <h1 className="text-[15vw] font-black text-white/5 uppercase select-none leading-none">THE</h1>
            </motion.div>
            <motion.div style={{ rotateY: rightFold, originX: 1 }} className="w-1/2 h-full bg-[#111] border-l border-white/10 flex items-center justify-start pl-12 relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent" />
              <h1 className="text-[15vw] font-black text-white/5 uppercase select-none leading-none">NEW.</h1>
            </motion.div>
            <motion.div style={{ opacity: useTransform(smoothProgress, [0, 0.15], [1, 0]) }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
               <Newspaper size={48} className="mb-4 text-[#ef6925]" />
               <p className="font-mono text-xs uppercase tracking-[0.6em]">Scroll to Unfold</p>
               <ChevronDown className="mt-4 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* REMAINDER OF SECTIONS (STAY SAME) */}
      <section className="py-40 bg-[#ef6925] text-black">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.9]">It’s not just a dashboard. It’s an engine.</h3>
          <p className="mt-12 text-2xl font-bold max-w-xl opacity-80 leading-snug">Most apps show you numbers. We show you the logic behind the wealth.</p>
        </div>
      </section>

      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <DetailTile title="01 / HYPER-SYNC" desc="Real-time fetching of all linked bank accounts and credit lines." />
          <DetailTile title="02 / ANOMALY DETECTOR" desc="Instant alerts for hidden charges or unexpected surges." />
          <DetailTile title="03 / LIQUID GOLD" desc="Physical gold backed by digital security, delivered in 24 hours." />
          <DetailTile title="04 / TAX OPTIMIZER" desc="Automated harvest of tax-saving opportunities across portfolios." />
        </div>
      </section>
    </div>
  );
};

// --- NEW SUB-COMPONENTS FOR THE WHITE SECTION ---

const FeatureIcon = ({ icon, label }) => (
  <div className="flex items-center gap-2 group cursor-help">
    <div className="p-2 rounded bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
  </div>
);

const QuickStat = ({ label, value, trend }) => (
  <div className="bg-white p-4 border border-slate-100 shadow-sm rounded-lg">
    <p className="text-[9px] font-bold text-slate-400 mb-1">{label}</p>
    <div className="flex items-end gap-2">
      <span className="text-xl font-black italic text-black">{value}</span>
      <span className={`text-[10px] font-bold ${trend === 'up' ? 'text-green-500' : 'text-slate-400'}`}>
        {trend === 'up' ? '▲' : '●'}
      </span>
    </div>
  </div>
);

const InteractiveCard = ({ icon, title, desc, mouseX, mouseY, highlight }) => {
  const x = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const y = useTransform(mouseY, [-0.5, 0.5], [15, -15]);

  return (
    <motion.div
      style={{ x, y, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02, x: 0, y: 0 }}
      className={`p-8 rounded-2xl border flex flex-col gap-4 relative overflow-hidden transition-all duration-500 ${
        highlight 
          ? 'bg-black text-white shadow-2xl' 
          : 'bg-white text-black shadow-xl border-slate-100'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="p-3 bg-slate-50 rounded-lg text-black">{icon}</div>
        <ArrowUpRight size={20} className={highlight ? "text-[#f79e27]" : "text-slate-300"} />
      </div>
      <div>
        <h3 className="text-2xl font-black italic uppercase tracking-tighter">{title}</h3>
        <p className={`text-sm mt-1 font-medium ${highlight ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
      </div>
      {/* Decorative Shine */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
};

const DetailTile = ({ title, desc }) => (
  <div className="bg-[#080a0b] p-16 hover:bg-[#111] transition-colors group">
    <h4 className="text-[#e72132] font-mono text-xs uppercase tracking-widest mb-6">{title}</h4>
    <p className="text-3xl font-bold mb-4 uppercase italic leading-none">{desc.split(' ')[0]} {desc.split(' ')[1]}</p>
    <p className="text-slate-500 max-w-xs">{desc}</p>
  </div>
);

export default NewspaperOpening;