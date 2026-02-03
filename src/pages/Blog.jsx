import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Shield, Eye, AlertTriangle, Crosshair, ChevronRight, Activity } from 'lucide-react';

const TerminalGallery = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Track mouse for 3D tilt effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * -20;
    setMousePos({ x, y });
  };

  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.8]), { stiffness: 100, damping: 30 });

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="bg-[#050505] min-h-[200vh] text-[#00ff41] font-mono overflow-hidden selection:bg-[#00ff41] selection:text-black"
    >
      {/* --- SCANLINE & NOISE OVERLAY --- */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 pointer-events-none z-[999] scanlines opacity-20" />

      {/* --- 3D BACKGROUND GRID --- */}
      <div className="fixed inset-0 perspective-[1000px] z-0">
        <motion.div 
          style={{ 
            rotateX: mousePos.y, 
            rotateY: mousePos.x,
          }}
          className="absolute inset-[-10%] border-[#00ff41]/20 border-[1px] grid-bg"
        />
      </div>

      {/* --- FLOATING UI ELEMENTS --- */}
      <div className="fixed top-10 left-10 z-50 mix-blend-difference">
        <div className="flex items-center gap-4 bg-black border border-[#00ff41] p-4">
          <Activity className="animate-pulse" />
          <div>
            <div className="text-[10px] leading-none">THREAT_LEVEL: LOW</div>
            <div className="text-xl font-black italic uppercase">Sector_9_Gallery</div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <motion.main 
        style={{ scale: scaleProgress }}
        className="relative z-10 pt-48 pb-64 px-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12"
      >
        {relicData.map((relic, idx) => (
          <RelicCard key={relic.id} relic={relic} index={idx} />
        ))}
      </motion.main>

      {/* --- FOOTER HUD --- */}
      <div className="fixed bottom-0 w-full p-6 flex justify-between items-end z-50 pointer-events-none">
        <div className="pointer-events-auto bg-[#00ff41] text-black px-4 py-2 font-black uppercase text-sm flex items-center gap-3">
          <Shield size={18} /> OS_ENCRYPTED_V4.2
        </div>
        <div className="text-right text-[10px] opacity-50">
          <div>COORD: {mousePos.x.toFixed(2)} / {mousePos.y.toFixed(2)}</div>
          <div>TIMESTAMP: {new Date().toISOString()}</div>
        </div>
      </div>

      <style jsx>{`
        .grid-bg {
          background-image: 
            linear-gradient(to right, #00ff41 1px, transparent 1px),
            linear-gradient(to bottom, #00ff41 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle, black, transparent 80%);
        }
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 255, 65, 0.05) 51%,
            transparent 51%
          );
          background-size: 100% 4px;
        }
      `}</style>
    </div>
  );
};

const RelicCard = ({ relic, index }) => {
  // Random staggered layout logic
  const colSpan = [ "md:col-span-6", "md:col-span-4", "md:col-span-8", "md:col-span-5" ][index % 4];
  const marginTop = index % 2 === 0 ? "mt-0" : "mt-24";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1 }}
      className={`${colSpan} ${marginTop} group relative`}
    >
      {/* Decoration lines */}
      <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#00ff41] group-hover:scale-125 transition-transform" />
      
      <div className="relative overflow-hidden border border-[#00ff41]/30 bg-black p-2 hover:border-[#00ff41] transition-colors">
        <div className="relative aspect-video overflow-hidden">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            src={relic.url} 
            className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-[#00ff41]/10 mix-blend-color group-hover:bg-transparent" />
          
          {/* Lock-on UI */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Crosshair className="text-[#00ff41] scale-[3] animate-spin-slow" />
          </div>
        </div>

        <div className="mt-4 p-4 border-t border-[#00ff41]/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] bg-[#00ff41] text-black px-2 font-bold uppercase">{relic.tag}</span>
            <span className="text-[10px] opacity-50">REF_{relic.id}</span>
          </div>
          <h3 className="text-2xl font-black uppercase tracking-widest mb-2 group-hover:translate-x-2 transition-transform">
            {relic.title}
          </h3>
          <p className="text-xs opacity-70 leading-relaxed mb-6">
            {relic.desc}
          </p>
          <button className="flex items-center gap-2 text-[10px] font-bold hover:underline">
            <Eye size={14} /> DECRYPT_DATA <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const relicData = [
  { id: "RX-90", title: "Neon_Avenue", tag: "LOC_DATA", desc: "Thermal signature detected in sector 7 sub-levels.", url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800" },
  { id: "RX-91", title: "Neural_Link", tag: "BIO_HAZARD", desc: "Direct interface with the synthetic cortex established.", url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800" },
  { id: "RX-92", title: "Void_Tower", tag: "STRUCT_FAIL", desc: "Structural integrity at 14% following the uplink.", url: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?q=80&w=800" },
  { id: "RX-93", title: "Ghost_Code", tag: "ENCRYPT", desc: "Fragmented packets found in the liquid-coolant pipes.", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800" },
  { id: "RX-94", title: "Pulse_Mod", tag: "SIGNAL_LOW", desc: "Awaiting handshake from orbital relay Alpha-6.", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800" },
  { id: "RX-95", title: "Static_Flow", tag: "DATA_LOSS", desc: "Corrupted visual feeds from the deep-sea cable.", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800" },
];

export default TerminalGallery;