import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Zap, Target, Cpu, MousePointer2, ChevronRight, Share2, Award } from 'lucide-react';

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const palette = {
    yellow: "#f9bb1a",
    golden: "#f79e27",
    orange: "#ef6925",
    red: "#e72132",
    teal: "#1da89d",
    lime: "#a5cb3a",
    slate: "#43646b",
  };

  return (
    <div ref={containerRef} className="bg-[#080c0d] text-white selection:bg-[#f9bb1a] selection:text-black">
      
      {/* SECTION 1: THE RADAR HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          {/* Rotating Radar Rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 / i, repeat: Infinity, ease: "linear" }}
              style={{ borderColor: i === 1 ? palette.teal : i === 2 ? palette.slate : palette.orange }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-20"
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-20 w-[${i * 300}px] h-[${i * 300}px]`}
              style={{ width: i * 350, height: i * 350 }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl md:text-[10rem] font-black leading-none uppercase italic tracking-tighter">
              The <span style={{ color: palette.yellow }}>Pulse</span> <br /> 
              <span className="text-outline">of Venture.</span>
            </h1>
            <div className="mt-10 flex justify-center gap-6">
              <button 
                style={{ backgroundColor: palette.teal }}
                className="group px-10 py-5 font-black uppercase text-lg flex items-center gap-3 hover:scale-110 transition-transform"
              >
                Launch Terminal <Zap fill="white" size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE MAGNETIC BENTO (Interactive Grid) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 style={{ color: palette.lime }} className="font-mono text-sm tracking-[0.5em] uppercase mb-4">// Capabilities</h2>
          <h3 className="text-5xl font-bold italic underline decoration-[#ef6925] underline-offset-8">Engineered for Velocity.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InteractiveCard 
            title="Capital Flow" 
            color={palette.teal} 
            icon={<Target size={40} />} 
            desc="Automated liquidity routing for rapid scale-ups."
          />
          <InteractiveCard 
            title="Neural Network" 
            color={palette.yellow} 
            icon={<Cpu size={40} />} 
            desc="Connect with the top 1% of founders globally."
          />
          <InteractiveCard 
            title="Market Strike" 
            color={palette.red} 
            icon={<MousePointer2 size={40} />} 
            desc="Precision entry into high-value consumer markets."
          />
        </div>
      </section>

      {/* SECTION 3: THE FLOW STATE (Scroll-Linked Timeline) */}
      <section className="relative py-40 bg-[#43646b]/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div className="sticky top-40 h-fit">
            <h2 className="text-6xl font-black uppercase leading-[0.9] mb-8">
              From <span style={{ color: palette.orange }}>Zero</span> <br /> to <span style={{ color: palette.lime }}>One.</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-sm">Watch the progression of a startup within our ecosystem.</p>
            
            {/* Visual Progress Meter */}
            <div className="mt-12 w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                style={{ scaleX: smoothProgress, backgroundColor: palette.yellow }} 
                className="h-full origin-left" 
              />
            </div>
          </div>

          <div className="space-y-40">
            <TimelineStep num="01" title="The Spark" color={palette.yellow} text="Identify the anomaly in the market that everyone else missed." />
            <TimelineStep num="02" title="The Forge" color={palette.golden} text="Intensive 48-hour build sessions to turn concepts into code." />
            <TimelineStep num="03" title="The Breach" color={palette.orange} text="Alpha testing with 10k+ early adopters in our network." />
            <TimelineStep num="04" title="The Empire" color={palette.red} text="Full-scale deployment and institutional fundraising." />
          </div>
        </div>
      </section>

      {/* SECTION 4: THE CTA (High Saturation) */}
      <section className="py-40 px-6 text-center overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{ backgroundColor: palette.teal }}
          className="max-w-5xl mx-auto p-20 relative group cursor-pointer"
        >
          <div className="absolute top-0 left-0 w-full h-full border-2 border-white translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
          
          <Share2 size={60} className="mx-auto mb-10 text-white animate-pulse" />
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-10 leading-none italic">Become <br /> Inevitable.</h2>
          <button style={{ backgroundColor: palette.darkSlate }} className="px-12 py-6 text-white text-2xl font-black uppercase tracking-widest hover:bg-black transition-colors">
            Apply to Cohort
          </button>
        </motion.div>
      </section>

      <footer className="py-10 text-center border-t border-white/5 opacity-30 text-xs font-mono tracking-[1em] uppercase">
        Empire Protocol // Est. 2026
      </footer>
    </div>
  );
};

// --- Helper Components ---

const InteractiveCard = ({ title, color, icon, desc }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * 20, y: -x * 20 });
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      style={{ borderTop: `4px solid ${color}` }}
      className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col gap-6 hover:bg-white/10 transition-colors cursor-crosshair"
    >
      <div style={{ color }}>{icon}</div>
      <h3 className="text-3xl font-black uppercase italic tracking-tighter">{title}</h3>
      <p className="text-slate-400 font-medium leading-tight">{desc}</p>
    </motion.div>
  );
};

const TimelineStep = ({ num, title, text, color }) => (
  <motion.div 
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="group"
  >
    <div style={{ color }} className="text-sm font-mono mb-2 tracking-[0.3em] font-bold">{num} // PHASE</div>
    <h4 className="text-5xl font-black uppercase mb-6 group-hover:translate-x-4 transition-transform duration-500">{title}</h4>
    <p className="text-xl text-slate-400 leading-relaxed border-l-2 pl-6" style={{ borderColor: color }}>{text}</p>
  </motion.div>
);

export default Home;