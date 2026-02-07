import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Zap, Target, Fingerprint, Activity, Shield, Cpu, BarChart3, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- 1. 3D INTERACTIVE CARD COMPONENT ---
// Enhanced with default image visibility for mobile devices
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
      className="relative shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] h-[500px] sm:h-[550px] md:h-[600px] bg-[#f9bb1a] border-2 border-black flex flex-col justify-end group overflow-hidden cursor-crosshair transition-all duration-500 hover:shadow-[15px_15px_0px_#000]"
    >
      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />
      
      {/* MOBILE VIEW: Visible only on small screens (Default State) */}
      <div className="absolute inset-0 z-10 block sm:hidden">
         <img 
            src={member.img} 
            alt={member.name}
            className="w-full h-full object-cover grayscale contrast-125"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
         <div className="absolute bottom-6 left-6 right-6 z-20">
            <span className="text-[#a5cb3a] font-mono text-[10px] uppercase font-bold tracking-widest">{member.id}</span>
            <h3 className="text-3xl font-black italic uppercase text-white leading-none mb-1">{member.name}</h3>
            <p className="text-white/80 text-[10px] uppercase font-bold mb-4">{member.role}</p>
            <a href={member.link} target="_blank" rel="noopener noreferrer" className="inline-block p-2 bg-[#a5cb3a] rounded-full text-black">
                <Linkedin size={20} />
            </a>
         </div>
      </div>

      {/* DESKTOP VIEW: Card Front (Hidden on mobile and hidden on desktop hover) */}
      <div 
        style={{ transform: "translateZ(40px)" }} 
        className="hidden sm:block p-10 relative z-10 transition-opacity duration-300 group-hover:opacity-0"
      >
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

      {/* DESKTOP VIEW: Hover Reveal (Only on screens >= 640px) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="absolute inset-0 z-20 bg-[#a5cb3a] p-1 hidden sm:flex flex-col"
            style={{ transform: "translateZ(80px)" }}
          >
            <div className="bg-black w-full h-full p-8 flex flex-col">
                <div className="w-full h-80 bg-neutral-800 relative overflow-hidden mb-6 border border-white/10">
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity"
                    />
                    <div className="absolute top-4 left-4 z-20 bg-[#a5cb3a] text-black text-[10px] font-bold px-2 py-1">
                        LIVE_FEED // 0{member.num}
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-3xl font-black italic uppercase text-white leading-none">{member.name}</h4>
                    <div className="h-px w-full bg-white/20" />
                    <p className="text-slate-300 font-mono text-[11px] leading-relaxed uppercase tracking-tight line-clamp-3">
                        {member.bio}
                    </p>
                    <div className="pt-4">
                        <a href={member.link} target="_blank" rel="noopener noreferrer" className="text-[#a5cb3a] hover:text-white transition-colors">
                          <Linkedin size={35} />
                        </a>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        style={{ transform: "translateZ(-20px)" }}
        className="absolute -top-10 -right-10 text-[18rem] font-black text-white/[0.03] italic pointer-events-none hidden sm:block"
      >
        {member.num}
      </div>
    </motion.div>
  );
};

// --- 2. MANIFESTO SECTION ---
const ManifestoSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const cards = [
    { text: "Clarity doesn't come from overthinking.", highlight: "It comes from action.", color: "text-[#a5cb3a]", border: "border-[#a5cb3a]" },
    { text: "The world doesn't pay you for what you know.", highlight: "It pays you for what you do.", color: "text-[#ef6925]", border: "border-[#ef6925]" },
    { text: "Stop looking for the right path.", highlight: "Build it yourself.", color: "text-white", border: "border-white" }
  ];

  return (
    <section ref={ref} className="relative py-24 sm:py-40 bg-[#f2e8d5] overflow-hidden border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-6 md:flex flex-col md:flex-row gap-15 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-44 ">
          <motion.div style={{ y: y1 }} className="space-y-6">
            <h2 className="text-6xl sm:text-8xl font-black italic uppercase leading-[0.8] text-black mb-8">
              Inside the <br />
              <span className="text-[#ef6925]">Ecosystem.</span>
            </h2>
            {cards.map((card, index) => (
                <div key={index} className={`p-6 bg-black text-white border-l-8 ${card.border} shadow-[10px_10px_0px_rgba(0,0,0,0.2)] transition-transform hover:translate-x-2`}>
                    <p className="font-mono text-sm uppercase leading-relaxed">
                        "{card.text} <br />
                        <span className={`${card.color} text-lg font-bold italic`}>{card.highlight}</span>"
                    </p>
                </div>
            ))}
          </motion.div>
        </div>
        <div className="lg:col-span-7 space-y-20 mt-16 md:mt-0">
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter bg-[#ef6925] text-white inline-block px-4 py-1">What Makes Us Different?</h3>
            <p className="text-2xl font-bold uppercase text-slate-800 leading-tight">We are not an MBA. We are not theory-heavy. We are not passive learning.</p>
            <div className="grid gap-5">
              {['Live Startup Park', 'Hands-on Chaos', 'Real Outcomes'].map((item, i) => (
                <motion.div key={i} whileHover={{ x: 15 }} className="flex items-center gap-4 p-2 border-2 border-black bg-white group cursor-default">
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold">{i+1}</div>
                  <span className="font-black italic uppercase text-xl group-hover:text-[#ef6925] transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div className="space-y-10">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- 3. MAIN COMPONENT ---
const VibrantExecutiveAbout = () => {
  const navigate = useNavigate();
  const horizontalSectionRef = useRef(null);

  const { scrollYProgress: horizontalScroll } = useScroll({
    target: horizontalSectionRef,
    offset: ["start start", "end end"]
  });

  // Responsive translate: on mobile we scroll less distance
  const xTranslate = useTransform(horizontalScroll, [0, 1], ["0%", "-88%"]);

  const team = [
    { id: "LEAD-01", num: "01", name: "Abdul Rahiman", role: "Head of Startup School", img: "/assets/MHD03706.JPG", link:"https://www.linkedin.com/in/abdulrahiman619/", bio: "The guiding force behind the next generation of founders. Abdul architected the Startup School framework to turn raw ideas into market-ready ventures." },
    { id: "EXEC-06", num: "06", name: "Jeslinz Johnson", role: "Operations & Marketing Manager", img: "/assets/MHD03684.JPG", link:"https://www.linkedin.com/in/jeslinz-johnson-2b216a146/", bio: "The operational heartbeat. Jeslinz synchronizes internal workflows with outward marketing presence." },
    { id: "STRAT-02", num: "02", name: "Priyankar Sengupta", role: "Strategy", img: "/assets/MHD03664.JPG", link:"https://www.linkedin.com/in/priyankar-sengupta-085473188/", bio: "Master of long-term vision and tactical maneuvering. Priyankar maps the trajectory of growth." },
    { id: "FIN-03", num: "03", name: "Eijaz Khan", role: "Mentor Finance", img: "/assets/image.png", link:"https://www.linkedin.com/in/eijaz-khan-b25193235/", bio: "Ensuring fiscal resilience and capital optimization for startups to scale." },
    { id: "MKTG-04", num: "04", name: "Aly Sayyad", role: "Mentor Sales & Marketing", img: "/assets/MHD03615.JPG", link:"https://www.linkedin.com/in/aly-sayyad-40501a20/", bio: "The closer. Aly specializes in aggressive market entry and high-conversion tactics." },
    { id: "TECH-05", num: "05", name: "Sikta Misra", role: "Operations & Tech", img: "/assets/MHD03642.JPG", link:"https://www.linkedin.com/in/sikta/", bio: "Bridging the gap between code and execution. Sikta oversees technical stacks." },
  ];

  return (
    <div className="bg-[#f2e8d5] text-black selection:bg-[#ef6925] selection:text-white">
      
      {/* HERO */}
      <section className="h-screen relative flex items-center justify-center bg-[#ef6925] overflow-hidden border-b-[20px] border-black">
        <div className="absolute left-0 top-0 h-full w-12 sm:w-16 bg-black flex flex-col z-20 overflow-hidden">
          <motion.div className="flex flex-col items-center" animate={{ y: ["0%", "-50%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex flex-col items-center">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="text-[#ef6925] font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] py-12 [writing-mode:vertical-rl] rotate-180">STARTUP SCHOOL —</span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
        <div className="z-10 w-full max-w-7xl px-12 sm:px-24">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
            <span className="bg-white text-black border-2 border-black px-4 py-1 font-black uppercase text-sm italic mb-4 inline-block shadow-[4px_4px_0px_#000]">Status: Ready to Build</span>
            <h1 className="text-[14vw] sm:text-[10vw] font-[1000] leading-[0.8] tracking-[-0.05em] text-black uppercase">
              STARTUP <br />
              <span className="flex items-center gap-4">
                <span className="italic text-white [text-shadow:8px_8px_0px_#000]">SCHOOL</span>
                <div className="h-[2px] sm:h-[4px] flex-grow bg-black mt-4" />
              </span>
            </h1>
          </motion.div>
          <div className="mt-12 md:flex items-end justify-between gap-10">
            <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="max-w-xl p-8 bg-black text-white border-l-[12px] border-white">
              <p className="text-xl sm:text-2xl font-mono font-bold uppercase italic leading-tight">Stop watching tutorials. <br /><span className="text-[#ef6925]">Start breaking things.</span></p>
            </motion.div>
            <motion.button whileHover={{ scale: 1.1, rotate: 2 }} onClick={()=>navigate('/contact')} className="mt-10 md:mt-0 relative group">
              <div className="absolute inset-0 bg-black rounded-full translate-x-2 translate-y-2" />
              <div className="relative bg-white border-4 border-black rounded-full w-40 h-40 flex items-center justify-center text-center p-4">
                <span className="text-black font-black uppercase italic leading-none text-xl">Apply <br /> Now →</span>
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      <ManifestoSection />

      {/* ENERGY GRID */}
      <section className="py-20 sm:py-32 bg-black text-white relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-7xl font-black italic uppercase leading-none mb-4">The <span className="text-[#a5cb3a]">Experience.</span></h2>
            <p className="text-slate-400 font-mono text-sm uppercase">A 90-day immersive experience by IQue Ventures.</p>
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 gap-6">
            <VibrantCard icon={<Zap color="#a5cb3a" />} title="Mindset & Action" desc="Startups aren't built in classrooms." />
            <VibrantCard icon={<Target color="#e72132" />} title="For the Relentless" desc="Aspiring founders and future CEOs." />
          </div>
        </div>
      </section>

      {/* HORIZONTAL TEAM SECTION */}
      <section ref={horizontalSectionRef} className="relative h-[300vh] bg-[#ef6925]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x: xTranslate }} className="flex gap-4 sm:gap-16 px-6 sm:px-[10vw] relative z-10">
            <div className="shrink-0 w-[85vw] sm:w-[500px] flex flex-col justify-center">
              <h2 className="text-5xl sm:text-8xl font-black italic uppercase text-white leading-[0.8] mb-8">
                The <br /><span className="text-black">Team</span> <br />Leaders.
              </h2>
            </div>
            {team.map((member, i) => (
              <TeamCard3D key={i} member={member} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 bg-black text-center relative border-t border-white/10">
        <div className="relative z-10 px-6">
          <Fingerprint size={60} className="mx-auto text-[#a5cb3a] mb-12" />
          <h2 className="text-5xl sm:text-9xl font-black italic uppercase text-white mb-16 leading-none">Build Something <br /> <span className="text-[#a5cb3a]">Real.</span></h2>
          <button onClick={()=>navigate("/contact")} className="bg-[#e72132] text-white px-12 py-6 font-black italic uppercase tracking-[0.4em] text-xl hover:bg-white hover:text-black transition-all shadow-[10px_10px_0px_#a5cb3a]">
            Join the Dojo
          </button>
        </div>
      </section>
    </div>
  );
};

const VibrantCard = ({ icon, title, desc }) => (
  <motion.div whileHover={{ x: 20 }} className="p-10 border-2 border-white/10 rounded-3xl cursor-pointer">
    <div className="flex items-center gap-6">
      <div className="p-4 bg-white/5 rounded-2xl">{icon}</div>
      <div>
        <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter">{title}</h3>
        <p className="text-slate-500 font-bold uppercase text-xs mt-1">{desc}</p>
      </div>
    </div>
  </motion.div>
);

export default VibrantExecutiveAbout;