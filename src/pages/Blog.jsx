import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Zap, Activity, ChevronRight, Binary } from 'lucide-react';

const BluePrintGallery = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen bg-[#000814] text-[#00f2ff] font-mono p-4 md:p-12 overflow-hidden selection:bg-[#00f2ff] selection:text-black">
      
      {/* --- GRID OVERLAY --- */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`, size: '40px 40px', backgroundSize: '40px 40px' }} />

      {/* --- HEADER --- */}
      <header className="relative z-10 flex justify-between items-start border-b border-[#00f2ff]/30 pb-6 mb-12">
        <div>
          <h1 className="text-4xl font-light tracking-[0.2em] uppercase">Specimen_Library</h1>
          <div className="flex gap-4 mt-2 text-[10px] opacity-60">
            <span className="flex items-center gap-1"><Activity size={12}/> SENSOR_ACTIVE</span>
            <span className="flex items-center gap-1"><Binary size={12}/> DB_CONNECTED</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold italic underline">V.09-ALPHA</div>
          <div className="text-[10px] opacity-40">LOC: 51.5074° N, 0.1278° W</div>
        </div>
      </header>

      {/* --- GALLERY GRID --- */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-1">
        {specimens.map((specimen) => (
          <div 
            key={specimen.id}
            onMouseEnter={() => setHoveredId(specimen.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative border border-[#00f2ff]/20 bg-[#000814]/80 backdrop-blur-sm p-4 h-[450px] transition-all hover:border-[#00f2ff] cursor-crosshair group"
          >
            {/* CORNER BRACKETS */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f2ff]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f2ff]" />

            <div className="flex justify-between items-center mb-4 opacity-50 group-hover:opacity-100">
              <span className="text-[10px] tracking-tighter">REF_{specimen.id}</span>
              <Crosshair size={14} className="animate-spin-slow" />
            </div>

            {/* IMAGE AREA */}
            <div className="relative h-2/3 overflow-hidden bg-black border border-[#00f2ff]/10">
              <img 
                src={specimen.img} 
                className="w-full h-full object-cover opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                alt={specimen.title}
              />
              <div className="absolute inset-0 bg-[#00f2ff]/10 group-hover:bg-transparent transition-colors" />
              
              {/* SCANLINE EFFECT */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,242,255,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%]" />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <h3 className="text-lg font-bold uppercase mb-2 group-hover:text-white transition-colors">
                {specimen.title}
              </h3>
              <p className="text-[10px] leading-relaxed opacity-60 group-hover:opacity-100 line-clamp-3">
                {specimen.data}
              </p>
            </div>

            {/* ACTIVE FOOTER */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center overflow-hidden">
                <AnimatePresence>
                  {hoveredId === specimen.id && (
                    <motion.div 
                      initial={{ x: -100 }} 
                      animate={{ x: 0 }} 
                      exit={{ x: -100 }}
                      className="flex items-center gap-2 text-[10px] font-black"
                    >
                      <Zap size={10} fill="#00f2ff" /> ANALYZING_CORE...
                    </motion.div>
                  )}
                </AnimatePresence>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* --- FOOTER HUD --- */}
      <footer className="fixed bottom-0 left-0 w-full p-6 z-20 flex justify-between items-center border-t border-[#00f2ff]/10 bg-[#000814]">
        <div className="text-[9px] flex gap-8 italic">
          <span>O2_LEVELS: 98%</span>
          <span>TEMP: -42°C</span>
          <span className="animate-pulse text-red-500">WARNING: MEMORY_LEAK_IN_SECTOR_7</span>
        </div>
        <div className="h-2 w-32 bg-[#00f2ff]/20">
          <motion.div 
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="h-full bg-[#00f2ff]" 
          />
        </div>
      </footer>
    </div>
  );
};

const specimens = [
  { id: "A-01", title: "Carbon_Core", data: "Detected anomalous structural density within the main shaft of the reactor housing.", img: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=800" },
  { id: "B-22", title: "Synthetic_Eye", data: "Optical sensors calibrated to infra-red spectrum. Retinal patterns unidentified.", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" },
  { id: "C-09", title: "Void_Link", data: "Signal latency suggests the presence of a localized singularity within the network.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800" },
  { id: "D-14", title: "Plasma_Grid", data: "Energy containment failure imminent. Recommend immediate venting of primary cells.", img: "https://images.unsplash.com/photo-1461747541859-467369165dd0?q=80&w=800" },
];

export default BluePrintGallery;