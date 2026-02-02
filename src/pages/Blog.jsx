import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, Scan, Database, Maximize2, Terminal } from 'lucide-react';

const BrutalistGallery = () => {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} className="bg-[#e72132] min-h-screen text-[#eee] selection:bg-black selection:text-[#f9bb1a] overflow-x-hidden">
      
      {/* --- HUD NAVIGATION --- */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-[100] border-b-4 border-black bg-[#e72132]">
        <div className="flex items-center gap-2 text-black">
          <Layers className="text-black" />
          <span className="font-black text-2xl uppercase italic tracking-tighter">GALLERY.SYS</span>
        </div>
        <div className="flex gap-4 items-center">
            <span className="hidden md:block font-mono text-[10px] text-black font-bold">STATUS: SECTOR_GRID_ACTIVE</span>
            <div className="bg-black text-[#f9bb1a] px-4 py-2 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                <Database size={14} /> 84_ASSETS
            </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 md:px-12">
        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {galleryItems.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </main>

      {/* --- FOOTER STATUS --- */}
      <footer className="fixed bottom-0 w-full bg-black text-[#e72132] p-2 flex justify-between font-mono text-[9px] z-[100]">
        <span>CORE_OS_V.2.0.6</span>
        <span className="animate-pulse">● SYSTEM_RUNNING</span>
        <span>COORD: 40.7128° N, 74.0060° W</span>
      </footer>
    </div>
  );
};

const GalleryCard = ({ item, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[#f9bb1a] border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative h-[400px] overflow-hidden border-b-4 border-black bg-black">
        <img 
          src={item.img} 
          alt={item.title}
          className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 opacity-80"
        />
        <div className="absolute inset-0 bg-[#e72132]/30 mix-blend-multiply group-hover:bg-transparent transition-colors" />
        
        {/* OVERLAY TAGS */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-black text-[#f9bb1a] text-[10px] font-black px-2 py-1 w-fit">
              {item.id}
            </span>
            <span className="bg-[#e72132] text-black text-[10px] font-black px-2 py-1 w-fit">
              {item.res}
            </span>
        </div>

        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-[#f9bb1a] p-2 border-2 border-black">
                <Maximize2 size={20} className="text-black" />
            </div>
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="p-6 text-[#e72132]">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-black uppercase leading-none tracking-tighter">
                {item.title}
            </h3>
            <Terminal size={18} className="mt-1" />
        </div>
        
        <p className="text-sm font-bold leading-tight mb-6 text-black opacity-80">
          {item.description}
        </p>

        <div className="flex items-center justify-between border-t-2 border-black/10 pt-4">
            <span className="font-mono text-[10px] font-black uppercase text-black">
                TAG // {item.tag}
            </span>
            <button className="text-[10px] font-black underline uppercase hover:text-black transition-colors">
                View_Data
            </button>
        </div>
      </div>
    </motion.div>
  );
};

const galleryItems = [
  { id: "IMG_001", title: "Void_Structure", description: "Monolithic remains of the silicon era.", tag: "ARCHITECTURE", res: "4K_RAW", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
  { id: "IMG_002", title: "Neural_Link", description: "Sub-dermal connectivity mapping.", tag: "BIOTECH", res: "8K_SCAN", img: "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=800" },
  { id: "IMG_003", title: "Data_Stream", description: "Visualizing the flow of packet loss.", tag: "INFRA", res: "VEC_02", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800" },
  { id: "IMG_004", title: "Heavy_Metal", description: "Industrial decay in the outer rim.", tag: "WASTE", res: "RAW_EXP", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800" },
  { id: "IMG_005", title: "Neon_Ghost", description: "Light pollution captured at 0.5Hz.", tag: "OPTICS", res: "ISO_900", img: "https://images.unsplash.com/photo-1510511459019-5dee99ccddf6?q=80&w=800" },
  { id: "IMG_006", title: "Cyber_Relic", description: "First generation hardware encryption.", tag: "HARDWARE", res: "MACRO_01", img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800" },
];

export default BrutalistGallery;