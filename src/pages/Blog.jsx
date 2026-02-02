import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Scan, Database, Maximize2, Terminal, X, ChevronDown } from 'lucide-react';

const BrutalistGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(10); // Initial load count

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 10);
  };

  return (
    <div className="bg-[#e72132] min-h-screen text-[#eee] selection:bg-black selection:text-[#f9bb1a] overflow-x-hidden">
      
      {/* --- HUD NAVIGATION --- */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-[100] border-b-4 border-black bg-[#e72132]">
        <div className="flex items-center gap-2 text-black">
          <Layers className="text-black" />
          <span className="font-black text-2xl uppercase italic tracking-tighter">GALLERY.SYS</span>
        </div>
        <div className="flex gap-4 items-center">
            <span className="hidden md:block font-mono text-[10px] text-black font-bold uppercase tracking-widest">
                STATUS: {itemsToShow >= galleryItems.length ? 'DATABASE_FULL' : 'SECTOR_GRID_ACTIVE'}
            </span>
            <div className="bg-black text-[#f9bb1a] px-4 py-2 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                <Database size={14} /> {galleryItems.length}_ASSETS
            </div>
        </div>
      </nav>

      <main className="pt-32 pb-32 px-6 md:px-12">
        {/* --- GRID SYSTEM --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {galleryItems.slice(0, itemsToShow).map((item, i) => (
            <GalleryCard 
              key={item.id} 
              item={item} 
              index={i % 10} // Animates fresh batches quickly
              onEnlarge={() => setSelectedImage(item)} 
            />
          ))}
        </div>

        {/* --- LOAD MORE TRIGGER --- */}
        {itemsToShow < galleryItems.length && (
          <div className="mt-24 flex flex-col items-center">
             <button 
              onClick={handleLoadMore}
              className="group relative bg-black text-[#f9bb1a] px-10 py-5 font-black text-xl uppercase italic border-4 border-black hover:bg-white hover:text-black transition-all active:scale-95"
            >
              <div className="absolute -inset-2 bg-white -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
              <span className="relative flex items-center gap-3">
                <Scan size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                Fetch_Next_Data_Batch
                <ChevronDown size={24} className="animate-bounce" />
              </span>
            </button>
            <p className="mt-6 font-mono text-[10px] text-black font-bold uppercase">
              Showing {itemsToShow} of {galleryItems.length} entries
            </p>
          </div>
        )}
      </main>

      {/* --- MODAL / LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md p-4 md:p-12 flex items-center justify-center cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="relative max-w-5xl w-full bg-[#f9bb1a] border-8 border-black p-2 shadow-[30px_30px_0px_#e72132]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-16 right-0 bg-[#e72132] text-black p-3 border-4 border-black hover:bg-white transition-colors"
              >
                <X size={32} strokeWidth={4} />
              </button>
              
              <img 
                src={selectedImage.img} 
                alt={selectedImage.title} 
                className="w-full h-auto max-h-[65vh] object-cover border-4 border-black shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
              />
              
              <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-end p-2 text-black">
                <div>
                  <h2 className="text-5xl font-black uppercase tracking-tighter italic leading-none">{selectedImage.title}</h2>
                  <p className="font-mono text-xs font-bold uppercase mt-2 bg-black text-[#f9bb1a] w-fit px-2 py-1">
                    {selectedImage.tag} // AUTH: {selectedImage.res}
                  </p>
                </div>
                <div className="text-right font-mono text-[11px] mt-4 md:mt-0 opacity-70">
                  <p>OBJECT_REF: {selectedImage.id}</p>
                  <p>LATENCY: 0.0004ms</p>
                  <p>STATUS: DECRYPTED</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER STATUS --- */}
      <footer className="fixed bottom-0 w-full bg-black text-[#e72132] p-2 flex justify-between font-mono text-[9px] z-[100] border-t-2 border-[#e72132]/20">
        <span className="flex gap-4">
            <span>CORE_OS_V.2.0.6</span>
            <span className="hidden sm:inline">BUFF_SIZE: 1024KB</span>
        </span>
        <span className="animate-pulse">● SYSTEM_RUNNING_STABLE</span>
        <span className="hidden sm:inline">LOAD_PT: {itemsToShow}/{galleryItems.length}</span>
      </footer>
    </div>
  );
};

const GalleryCard = ({ item, index, onEnlarge }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      className="group relative bg-[#f9bb1a] border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200"
    >
      <div className="relative h-[400px] overflow-hidden border-b-4 border-black bg-black">
        <img 
          src={item.img} 
          alt={item.title}
          className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-80"
        />
        <div className="absolute inset-0 bg-[#e72132]/20 mix-blend-multiply group-hover:bg-transparent transition-colors" />
        
        <div className="absolute top-4 left-4 flex flex-col gap-1">
            <span className="bg-black text-[#f9bb1a] text-[10px] font-black px-2 py-1 w-fit border border-[#f9bb1a]/30">{item.id}</span>
            <span className="bg-white text-black text-[10px] font-black px-2 py-1 w-fit border border-black">{item.res}</span>
        </div>

        <button 
          onClick={onEnlarge}
          className="absolute bottom-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 z-10"
        >
            <div className="bg-[#f9bb1a] p-3 border-4 border-black hover:bg-white active:scale-90 transition-all">
                <Maximize2 size={24} className="text-black" />
            </div>
        </button>
      </div>

      <div className="p-6 text-black">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-3xl font-black uppercase leading-none tracking-tighter italic">
                {item.title}
            </h3>
            <Terminal size={18} className="mt-1 opacity-50" />
        </div>
        
        <p className="text-sm font-bold leading-tight mb-8 opacity-70 border-l-2 border-black pl-3">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t-2 border-black/10">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest bg-black text-[#f9bb1a] px-2">
                TYPE_{item.tag}
            </span>
            <button 
              onClick={onEnlarge}
              className="text-[11px] font-black underline uppercase hover:text-[#e72132] transition-colors decoration-4 underline-offset-4"
            >
                ACCESS_DATA
            </button>
        </div>
      </div>
    </motion.div>
  );
};

// Expanded Dataset (21 Items)
const galleryItems = [
  { id: "IMG_001", title: "Void_Structure", description: "Monolithic remains of the silicon era.", tag: "ARCHITECTURE", res: "4K_RAW", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
  { id: "IMG_002", title: "Neural_Link", description: "Sub-dermal connectivity mapping.", tag: "BIOTECH", res: "8K_SCAN", img: "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=800" },
  { id: "IMG_003", title: "Data_Stream", description: "Visualizing the flow of packet loss.", tag: "INFRA", res: "VEC_02", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800" },
  { id: "IMG_004", title: "Heavy_Metal", description: "Industrial decay in the outer rim.", tag: "WASTE", res: "RAW_EXP", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800" },
  { id: "IMG_005", title: "Neon_Ghost", description: "Light pollution captured at 0.5Hz.", tag: "OPTICS", res: "ISO_900", img: "https://images.unsplash.com/photo-1510511459019-5dee99ccddf6?q=80&w=800" },
  { id: "IMG_006", title: "Cyber_Relic", description: "First generation hardware encryption.", tag: "HARDWARE", res: "MACRO_01", img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800" },
  { id: "IMG_007", title: "Echo_Pulse", description: "Acoustic signatures in a dead city.", tag: "AUDIO", res: "WAV_96", img: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=800" },
  { id: "IMG_008", title: "Grid_Runner", description: "Kinetic energy tracking via GPS.", tag: "KINETIC", res: "LOG_09", img: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800" },
  { id: "IMG_009", title: "Static_Rain", description: "Atmospheric interference patterns.", tag: "WEATHER", res: "SAT_SCAN", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800" },
  { id: "IMG_010", title: "Iron_Core", description: "Tectonic stabilization units.", tag: "GEOLOGY", res: "GEO_04", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800" },
  // Batch 2 (Hidden until Load More)
  { id: "IMG_011", title: "Glass_Tower", description: "Post-capitalist verticality.", tag: "ARCHITECTURE", res: "4K_RAW", img: "https://images.unsplash.com/photo-1449156003053-96421817eaa5?q=80&w=800" },
  { id: "IMG_012", title: "Binary_Dust", description: "Decompiled particle simulations.", tag: "PHYSICS", res: "PART_01", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800" },
  { id: "IMG_013", title: "Rust_Valley", description: "Oxygen-heavy oxidation fields.", tag: "WASTE", res: "MACRO_V2", img: "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?q=80&w=800" },
  { id: "IMG_014", title: "Wire_Frame", description: "Low-poly architectural blueprints.", tag: "DESIGN", res: "DXF_OUT", img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800" },
  { id: "IMG_015", title: "Signal_Fire", description: "Last known broadcast coordinates.", tag: "COMMS", res: "RF_SCAN", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800" },
  { id: "IMG_016", title: "Cold_Storage", description: "Cryogenic data preservation.", tag: "SYSTEM", res: "ICE_8", img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800" },
  { id: "IMG_017", title: "Circuit_Tree", description: "Synthetic botanical growth.", tag: "BOTANY", res: "BIO_02", img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800" },
  { id: "IMG_018", title: "Dark_Matter", description: "Non-reflective surface testing.", tag: "OPTICS", res: "VOID_X", img: "https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?q=80&w=800" },
  { id: "IMG_019", title: "Laser_Etch", description: "Molecular level branding.", tag: "HARDWARE", res: "NANO_0", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800" },
  { id: "IMG_020", title: "Final_Gate", description: "End-of-line protocol terminal.", tag: "SYSTEM", res: "END_SYS", img: "https://images.unsplash.com/photo-1506774050913-311f1347aa9c?q=80&w=800" },
  { id: "IMG_021", title: "The_Beyond", description: "Experimental data from sector 7.", tag: "UNKNOWN", res: "UNK_ERR", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800" },
];

export default BrutalistGallery;