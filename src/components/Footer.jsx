import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Rocket, Globe, Shield, Zap, Github, Twitter, Instagram, ArrowUp } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const Footer = () => {
  // Mouse tracking for the "Orbital" glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const springConfig = { damping: 25, stiffness: 150 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  return (
    <footer 
      onMouseMove={handleMouseMove}
      className="relative bg-[#020205] text-white pt-32 pb-10 overflow-hidden group/footer"
    >
      {/* 1. INTERACTIVE MOUSE GLOW */}
      <motion.div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover/footer:opacity-100 transition duration-500 rounded-full bg-[radial-gradient(600px_circle_at_var(--x)_var(--y),rgba(29,168,157,0.15),transparent_80%)]"
        style={{
          '--x': useTransform(glowX, (x) => `${x}px`),
          '--y': useTransform(glowY, (y) => `${y}px`),
        }}
      />

      {/* 2. FLOATING 3D ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-[10%] opacity-20"
          style={{ color: '#f9bb1a' }}
        >
          <Globe size={120} strokeWidth={0.5} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-40 right-[15%] opacity-10"
          style={{ color: '#e72132' }}
        >
          <Shield size={180} strokeWidth={0.5} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* 3. THE 3D CTA CARD */}
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} className="mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative p-12 rounded-[3rem] border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
            style={{ background: 'linear-gradient(to bottom right, rgba(239,105,37,0.4), rgba(231,33,50,0.4))' }}
          >
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Ready to launch <br/>your legacy?</h2>
              <p className="max-w-sm" style={{ color: 'rgba(29,168,157,0.6)' }}>Join 10k+ founders building the future. Your journey starts here.</p>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(249,187,26,0.6)" }}
              whileTap={{ scale: 0.9 }}
              className="relative z-10 px-10 py-5 rounded-2xl font-black flex items-center gap-3 group"
              style={{ backgroundColor: '#f9bb1a', color: '#43646b' }}
            >
              IGNITE ENGINES <Rocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>

            {/* Background Mesh for Card */}
            <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] -z-10" style={{ backgroundColor: 'rgba(247,158,39,0.2)' }} />
          </motion.div>
        </Tilt>

        {/* 4. ANIMATED LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {[
            { title: "Explore", links: ["Ecosystem", "Marketplace", "Labs", "Terminal"] },
            { title: "Governance", links: ["DAO", "Voting", "Treasury", "Whitepaper"] },
            { title: "Build", links: ["SDK", "Documentation", "Bug Bounty", "Dev Kits"] },
            { title: "Meta", links: ["About", "Careers", "Branding", "Legal"] }
          ].map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map(link => (
                  <motion.li 
                    key={link}
                    whileHover={{ x: 10 }}
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors flex items-center gap-2 group"
                  >
                    <Zap size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#a5cb3a' }} />
                    {link}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 5. THE ULTIMATE BOTTOM BAR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            {[Github, Twitter, Instagram].map((Icon, i) => (
              <motion.a 
                key={i}
                whileHover={{ y: -5, color: '#1da89d' }}
                className="p-3 bg-white/5 rounded-full border border-white/10 text-gray-400"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex items-center gap-2 text-xs font-mono"
            style={{ color: 'rgba(165,203,58,0.5)' }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#a5cb3a' }} />
            ALL SYSTEMS NOMINAL // 2026
          </motion.div>

          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            BACK TO TOP <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;