import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, ExternalLink } from 'lucide-react';

const galleryImages = [
  { id: 1, url: 'public/assets/img2.jpeg', title: 'Minimal Void', category: 'Abstract' },
  { id: 2, url: 'public/assets/img12.jpeg', title: 'Chroma Flow', category: 'Gradient' },
  { id: 3, url: 'public/assets/img3.jpeg', title: 'Prism Study', category: 'Glass' },
  { id: 5, url: 'public/assets/img5.jpeg', title: 'Static Noise', category: 'Texture' },
  { id: 6, url: 'public/assets/img6.jpeg', title: 'public Matter', category: 'Abstract' },
  { id: 7, url: 'public/assets/img7.jpeg', title: 'Ethereal', category: 'Art' },
  { id: 8, url: 'public/assets/img8.jpeg', title: 'Geometric', category: 'Digital' },
  { id: 4, url: 'public/assets/img14.jpeg', title: 'Neon Pulse', category: 'Digital' },
];

const GalleryPage = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans selection:bg-red-600 selection:text-white">
      
      {/* --- BIG BOLD HEADER --- */}
      <header className="mb-24 mt-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-[14vw] md:text-[10vw] font-black tracking-tighter leading-[0.75] uppercase"
          >
            The <br />
            <span className="font-serif italic text-red-600 font-normal lowercase tracking-normal">Collection</span>
          </motion.h1>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-red-600"></div>
            <p className="text-gray-500 font-mono tracking-[0.3em] text-[10px] md:text-xs uppercase">
              Archive Labs // Selected Works 2024—2026
            </p>
          </div>
        </div>

        <nav className="flex gap-8 text-[10px] font-bold tracking-[0.2em] font-mono border-l border-white/10 pl-8">
          <button className="text-red-600 transition-colors underline underline-offset-8">ALL</button>
         
        </nav>
      </header>

      {/* --- GRID --- */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12"
      >
        {galleryImages.map((img) => (
          <motion.div
            key={img.id}
            variants={itemVars}
            className="group relative cursor-crosshair"
            onClick={() => setSelectedImg(img)}
          >
            <div className="aspect-[3/4] overflow-hidden bg-zinc-900 rounded-sm">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100"
              />
            </div>

            <div className="mt-5 flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-1">{img.title}</h3>
                <p className="text-[9px] text-zinc-500 uppercase font-mono">{img.category}</p>
              </div>
              <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                <Maximize2 size={12} className="text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/98 backdrop-blur-md"
            onClick={() => setSelectedImg(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full h-full flex flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[70vh] flex justify-center">
                <img 
                  src={selectedImg.url} 
                  className="max-w-full max-h-full object-contain shadow-2xl" 
                  alt={selectedImg.title} 
                />
                <button 
                  onClick={() => setSelectedImg(null)}
                  className="absolute -top-12 right-0 md:-right-12 text-white hover:text-red-600 transition-colors"
                >
                  <X size={32} strokeWidth={1} />
                </button>
              </div>

              <div className="mt-12 text-center">
                <span className="text-red-600 font-mono text-[10px] tracking-[0.4em] uppercase">{selectedImg.category}</span>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">{selectedImg.title}</h2>
                <button className="mt-8 flex items-center gap-3 mx-auto px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-all text-[10px] font-mono tracking-widest uppercase">
                  <ExternalLink size={14} />
                  View Full Resolution
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-40 pb-12 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-zinc-600 tracking-[0.2em]">
        <div className="flex items-center gap-4">
           <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
           <span>SYSTEM_ACTIVE // © 2026 ARCHIVE_LABS</span>
        </div>
        <span 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="hover:text-white cursor-pointer transition-colors border-b border-transparent hover:border-white"
        >
          RETURN_TO_TOP ↑
        </span>
      </footer>
    </div>
  );
};

export default GalleryPage;