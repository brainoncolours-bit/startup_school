import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Orbit, Globe, Sparkles, Command, Ghost, ArrowRight, Github, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const constraintsRef = useRef(null);

  return (
    <footer className="relative bg-[#ef6925] text-black min-h-[90vh] flex flex-col justify-center items-center overflow-hidden py-20 font-sans">
      
      {/* 1. INDUSTRIAL BACKGROUND EFFECTS */}
      {/* <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] brightness-100 pointer-events-none" />
         <div className="absolute top-20 left-0 flex whitespace-nowrap opacity-10 pointer-events-none select-none animate-pulse">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[20vh] font-black mr-20 text-black">CONTACT // TRANSMISSION // ENDPOINT //</span>
            ))}
         </div>
      </div> */}

      {/* 2. THE FLOATING PHYSICS ZONE */}
      <div ref={constraintsRef} className="absolute inset-0 z-10 overflow-hidden">
        {/* These items are "draggable" and float around */}
        {[
          { Icon: Globe, top: '20%', left: '15%', color: '#000' },
          { Icon: Sparkles, top: '60%', left: '10%', color: '#000' },
          { Icon: Command, top: '15%', left: '80%', color: '#000' },
          { Icon: Ghost, top: '70%', left: '85%', color: '#000' },
        ].map((item, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4 + i, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ top: item.top, left: item.left }}
            className="absolute p-6 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-grab z-20 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-shadow"
          >
            <item.Icon size={32} style={{ color: item.color }} strokeWidth={2} />
          </motion.div>
        ))}
      </div>

      {/* 3. THE CENTRAL CONTENT */}
      <div className="relative z-30 text-center space-y-10 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="flex justify-center gap-2 mb-6">
            <span className="px-4 py-1 bg-black text-white border-2 border-transparent text-[10px] font-mono tracking-widest uppercase font-bold shadow-[4px_4px_0px_rgba(255,255,255,0.4)]">
              Final Destination
            </span>
          </div>
          <h2 className="text-7xl md:text-[10rem] font-black tracking-[ -0.05em] leading-[0.8] uppercase drop-shadow-[4px_4px_0px_rgba(255,255,255,0.4)]">
            Beyond<br/>
            <span className="text-white drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] italic font-serif lowercase px-4">the</span>
            Horizon
          </h2>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05, letterSpacing: '0.2em' }}
          className="px-12 py-5 bg-black text-white border-2 border-black hover:bg-white hover:text-black hover:border-black font-black text-sm tracking-widest uppercase transition-all shadow-[6px_6px_0px_rgba(255,255,255,0.4)]"
        >
          Initiate Contact
        </motion.button>
      </div>

      {/* 4. THE INDUSTRIAL GRID BAR */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-40 px-4">
        <div className="p-8 bg-white border-4 border-black border-double shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-center gap-10">
          
          <div className="flex items-center gap-8">
            <div className="text-left">
              <p className="text-[10px] font-mono text-black/50 uppercase tracking-[0.3em] font-bold">JOIN</p>
              <p className="text-sm font-black text-black">STARTUP SCHOOL</p>
            </div>
            <div className="h-8 w-1 bg-black" />
            <div className="text-left">
              <p className="text-[10px] font-mono text-black/50 uppercase tracking-[0.3em] font-bold">NOT AN </p>
              <p className="text-sm font-black text-[#ef6925]">MBA</p>
            </div>
          </div>

          <div className="flex gap-12 text-[11px] font-black uppercase tracking-[0.2em]">
            {['Laboratory', 'Vessels', 'Logbook', 'Signal'].map((link) => (
              <a key={link} href="#" className="hover:text-[#ef6925] transition-colors flex items-center gap-2 group decoration-2 underline-offset-4 hover:underline decoration-black">
                {link}
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-black" />
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <motion.div whileHover={{ rotate: 180 }} className="p-3 bg-black text-white border-2 border-black rounded-none cursor-pointer transition-colors hover:bg-white hover:text-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
              <Github size={18} />
            </motion.div>
            <motion.div whileHover={{ rotate: 180 }} className="p-3 bg-black text-white border-2 border-black rounded-none cursor-pointer transition-colors hover:bg-white hover:text-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
              <Twitter size={18} />
            </motion.div>
            <motion.div whileHover={{ rotate: 180 }} className="p-3 bg-black text-white border-2 border-black rounded-none cursor-pointer transition-colors hover:bg-white hover:text-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
              <Instagram size={18} />
            </motion.div>
            <motion.div whileHover={{ rotate: 180 }} className="p-3 bg-black text-white border-2 border-black rounded-none cursor-pointer transition-colors hover:bg-white hover:text-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
              <Linkedin size={18} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-10 text-[9px] font-mono text-black/40 uppercase tracking-[0.5em] font-bold">
        <span>©2026</span>
        <span>startupschool</span>
        <span>bigrip</span>
      </div>
    </footer>
  );
};

export default Footer;