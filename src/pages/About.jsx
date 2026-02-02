import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Zap, Target, Fingerprint, Activity, Terminal, Shield, Cpu, BarChart3, ArrowRight } from 'lucide-react';

// --- 1. 3D INTERACTIVE CARD COMPONENT ---
const TeamCard3D = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { 
        x.set(0); 
        y.set(0); 
        setIsHovered(false);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative shrink-0 w-[90vw] sm:w-[400px] md:w-[450px] h-[500px] sm:h-[550px] md:h-[600px] bg-[#f9bb1a] border-2 border-black flex flex-col justify-end group overflow-hidden cursor-crosshair transition-all duration-500 hover:shadow-[15px_15px_0px_#000]"
    >
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />
      
      <div className="absolute top-10 right-10 text-black/5 group-hover:text-[#a5cb3a] transition-colors duration-500 z-0">
        {member.icon}
      </div>
      
      <div style={{ transform: "translateZ(40px)" }} className="p-10 relative z-10 transition-opacity duration-300 group-hover:opacity-20">
        <span className="text-black font-mono text-[10px] tracking-[0.4em] uppercase block mb-2 opacity-60">
            CLASSIFIED // {member.id}
        </span>
        <h3 className="text-5xl font-black italic uppercase text-black leading-[0.9] mb-4">
          {member.name}
        </h3>
        <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">
          {member.role}
        </p>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="absolute inset-0 z-20 bg-[#a5cb3a] p-1 flex flex-col"
            style={{ transform: "translateZ(80px)" }}
          >
            <div className="bg-black w-full h-full p-8 flex flex-col">
                <div className="w-full h-80 bg-neutral-800 relative overflow-hidden mb-6 border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10" />
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20 bg-[#a5cb3a] text-black text-[10px] font-bold px-2 py-1">
                        LIVE_FEED // 0{member.num}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h4 className="text-3xl font-black italic uppercase text-white leading-none">{member.name}</h4>
                        <span className="text-[#a5cb3a] font-mono text-xs">{member.id}</span>
                    </div>
                    <div className="h-px w-full bg-white/20" />
                    <p className="text-slate-300 font-mono text-[11px] leading-relaxed uppercase tracking-tight">
                        {member.bio}
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="border border-white/10 p-3">
                            <p className="text-[9px] text-slate-500 uppercase">Clearance</p>
                            <p className="text-sm font-bold text-[#a5cb3a]">LEVEL_MAX</p>
                        </div>
                        <div className="border border-white/10 p-3">
                            <p className="text-[9px] text-slate-500 uppercase">Status</p>
                            <p className="text-sm font-bold text-[#e72132]">ACTIVE</p>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        style={{ transform: "translateZ(-20px)" }}
        className="absolute -top-10 -right-10 text-[18rem] font-black text-white/[0.03] italic pointer-events-none"
      >
        {member.num}
      </div>
    </motion.div>
  );
};

// --- 2. NEW MANIFESTO SECTION COMPONENT ---
const ManifestoSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section ref={ref} className="relative py-24 sm:py-40 bg-[#f2e8d5] overflow-hidden border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Sticky Side */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <motion.div style={{ y: y1 }}>
            <h2 className="text-6xl sm:text-8xl font-black italic uppercase leading-[0.8] text-black mb-8">
              Inside the <br />
              <span className="text-[#ef6925]">Ecosystem.</span>
            </h2>
            <div className="p-6 bg-black text-white border-l-8 border-[#a5cb3a] shadow-[10px_10px_0px_rgba(0,0,0,0.2)]">
              <p className="font-mono text-sm uppercase leading-relaxed">
                "Clarity doesn't come from overthinking. <br />
                <span className="text-[#a5cb3a] text-lg font-bold italic">It comes from action.</span>"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Scrolling Content */}
        <div className="lg:col-span-7 space-y-20">
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter bg-[#ef6925] text-white inline-block px-4 py-1">
              What Makes Us Different?
            </h3>
            <p className="text-2xl font-bold uppercase text-slate-800 leading-tight">
                We are not an MBA. We are not theory-heavy. We are not passive learning.
            </p>
            
            <div className="grid gap-4">
              {['Live Startup Park', 'Hands-on Chaos', 'Real Outcomes'].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 15 }}
                  className="flex items-center gap-4 p-4 border-2 border-black bg-white group cursor-default"
                >
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold">{i+1}</div>
                  <span className="font-black italic uppercase text-xl group-hover:text-[#ef6925] transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div style={{ y: y2 }} className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#a5cb3a] p-8 border-4 border-black shadow-[8px_8px_0px_#000]">
                <h4 className="text-3xl font-black italic uppercase mb-4 leading-none">No Age Limit.</h4>
                <p className="font-bold uppercase text-xs">The only currency here is curiosity and commitment.</p>
              </div>
              <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_#000]">
                <h4 className="text-3xl font-black italic uppercase mb-4 leading-none">No "Idea" Needed.</h4>
                <p className="font-bold uppercase text-xs">We provide the environment; you provide the willingness to act.</p>
              </div>
            </div>

            <p className="text-lg font-mono uppercase font-bold text-slate-600 border-t-2 border-black/10 pt-8">
                At Startup School, you don’t just learn how startups work — you experience the grind, the setbacks, and the breakthroughs that define real founders.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- 3. MAIN COMPONENT ---
const VibrantExecutiveAbout = () => {
  const containerRef = useRef(null);
  const horizontalSectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: horizontalScroll } = useScroll({
    target: horizontalSectionRef,
    offset: ["start start", "end end"]
  });

  const xTranslate = useTransform(horizontalScroll, [0, 1], ["0%", "-85%"]);

  const team = [
    { 
        id: "LEAD-01", num: "01", name: "Abdul Rahiman", 
        role: "Head of Startup School", 
        icon: <Target size={48}/>,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
        bio: "The guiding force behind the next generation of founders. Abdul architected the Startup School framework to turn raw ideas into market-ready ventures."
    },
    { 
        id: "STRAT-02", num: "02", name: "Priyankar Sengupta", 
        role: "Strategy", 
        icon: <BarChart3 size={48}/>,
        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800",
        bio: "Master of long-term vision and tactical maneuvering. Priyankar maps the trajectory of growth, ensuring every move is calculated for maximum impact."
    },
    { 
        id: "FIN-03", num: "03", name: "Eijaz Khan", 
        role: "Mentor Finance", 
        icon: <Shield size={48}/>,
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800",
        bio: "Ensuring fiscal resilience and capital optimization. Eijaz provides the financial backbone necessary for startups to scale without losing momentum."
    },
    { 
        id: "MKTG-04", num: "04", name: "Aly Sayyad", 
        role: "Mentor Sales & Marketing", 
        icon: <Zap size={48}/>,
        img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800",
        bio: "The closer. Aly specializes in aggressive market entry and high-conversion sales psychological tactics to dominate the attention economy."
    },
    { 
        id: "TECH-05", num: "05", name: "Sikta Misra", 
        role: "Operations & Tech", 
        icon: <Cpu size={48}/>,
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
        bio: "Bridging the gap between code and execution. Sikta oversees the operational systems and technical stacks that power our modern infrastructure."
    },
    { 
        id: "EXEC-06", num: "06", name: "Jeslinz Johnson", 
        role: "Operations & Marketing Manager", 
        icon: <Activity size={48}/>,
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
        bio: "The operational heartbeat. Jeslinz synchronizes internal workflows with outward marketing presence to ensure a unified and efficient brand pulse."
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#f2e8d5] text-black selection:bg-[#ef6925] selection:text-white">
      
      {/* VINTAGE HERO */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden border-b-4 border-black bg-[#f2e8d5]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-60 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(239,105,37,0.12)_100%)] mix-blend-multiply" />
        
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-1/2 left-0 w-full h-32 bg-gradient-to-r from-transparent via-[#ef6925]/30 to-transparent transform -translate-y-1/2 pointer-events-none z-5"
        />
        
        <div className="z-10 text-center px-6 max-w-6xl mx-auto">
          <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-[0.8] text-[#1a1a1a] mb-6 mx-auto text-center">
            Startup <br /> <span className="text-[#ef6925] italic">School</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 tracking-wide mx-auto max-w-4xl px-4 uppercase">
            A dojo for founders. Learn by doing, build under pressure, fail fast, and rise stronger.
          </p>
        </div>
      </section>

      {/* --- NEWLY ADDED CONTENT SECTION --- */}
      <ManifestoSection />

      {/* ENERGY GRID */}
      <section className="py-20 sm:py-32 md:py-40 bg-black text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black italic uppercase leading-none mb-4">The <span className="text-[#a5cb3a]">Experience.</span></h2>
            <p className="text-slate-400 font-mono text-sm sm:text-base mb-8 uppercase tracking-tighter">
                A 90-day immersive experience by IQue Ventures for those who want outcomes, not just ideas.
            </p>
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 gap-4 sm:gap-6">
            <VibrantCard icon={<Zap color="#a5cb3a" />} title="Mindset & Action" desc="Startups aren't built in classrooms, they're built in chaos." />
            <VibrantCard icon={<Target color="#e72132" />} title="For the Relentless" desc="Aspiring founders, future CEOs, and pros ready to build." />
          </div>
        </div>
      </section>

      {/* HORIZONTAL TEAM SECTION */}
      <section ref={horizontalSectionRef} className="relative h-auto py-10 sm:h-[400vh] bg-orange-500">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x: typeof window !== 'undefined' && window.innerWidth >= 640 ? xTranslate : 0 }} className="flex gap-4 sm:gap-8 md:gap-16 px-4 sm:px-8 md:px-[10vw] relative z-10 overflow-x-auto sm:overflow-visible">
            <div className="shrink-0 w-[90vw] sm:w-[400px] md:w-[500px] flex flex-col justify-center">
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black italic uppercase text-white leading-[0.8] mb-6 sm:mb-8">
                The <br /><span className="text-[#e72132]">Team</span> <br />Leaders.
              </h2>
            </div>

            {team.map((member, i) => (
              <TeamCard3D key={i} member={member} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 sm:py-40 md:py-60 bg-black text-center relative overflow-hidden border-t border-white/10">
        <div className="relative z-10 px-4 sm:px-6">
          <Fingerprint size={60} className="mx-auto text-[#a5cb3a] mb-8 sm:mb-12 sm:w-20 sm:h-20" />
          <h2 className="text-4xl sm:text-6xl md:text-9xl font-black italic uppercase text-white mb-8 sm:mb-12 md:mb-16 leading-none px-4">
            Build Something <br /> <span className="text-[#a5cb3a]">Real.</span>
          </h2>
          <button className="bg-[#e72132] text-white px-8 sm:px-12 md:px-20 py-4 sm:py-6 md:py-8 font-black italic uppercase tracking-[0.2em] sm:tracking-[0.4em] text-base sm:text-xl md:text-2xl hover:bg-white hover:text-black transition-all shadow-[10px_10px_0px_#a5cb3a] sm:shadow-[20px_20px_0px_#a5cb3a]">
            Join the Dojo
          </button>
        </div>
      </section>
    </div>
  );
};

const VibrantCard = ({ icon, title, desc }) => (
  <motion.div whileHover={{ x: 20 }} className="p-6 sm:p-8 md:p-10 border-2 border-white/10 rounded-2xl sm:rounded-3xl cursor-pointer group">
    <div className="flex items-center gap-4 sm:gap-6">
      <div className="p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl text-sm sm:text-base">{icon}</div>
      <div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black italic uppercase tracking-tighter">{title}</h3>
        <p className="text-slate-500 font-bold uppercase text-[10px] sm:text-xs mt-1">{desc}</p>
      </div>
    </div>
  </motion.div>
);

export default VibrantExecutiveAbout;