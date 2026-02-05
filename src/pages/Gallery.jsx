import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Plus, Hash } from 'lucide-react';

const galleryImages = [
  { id: 1, url: '/assets/img2.jpeg', title: 'Where ideas meet execution.', category: '', year: '2026' },
  { id: 2, url: '/assets/img12.jpeg', title: 'The starting line of something big.', category: '', year: '2025' },
  { id: 3, url: '/assets/img3.jpeg', title: 'Fueling the entrepreneurial fire.', category: '', year: '2025' },
  { id: 5, url: '/assets/img5.jpeg', title: 'More than just a school', category: '', year: '2026' },
  { id: 6, url: '/assets/img6.jpeg', title: 'a community dedicated to future of business', category: '', year: '2025' },
  { id: 7, url: '/assets/img7.jpeg', title: 'Where "what if" becomes "whats next."', category: '', year: '2025' },
  { id: 8, url: '/assets/img8.jpeg', title: 'Your network is your net worth', category: '', year: '2026' },
  { id: 4, url: '/assets/img14.jpeg', title: 'The "Hard Work" Vibe', category: '', year: '2025' },
];

const GalleryPage = () => {
  const [hoveredImg, setHoveredImg] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="min-h-screen bg-red-600 text-yellow-400 font-sans overflow-x-hidden">
      
      {/* --- HOVER MODAL PREVIEW --- */}
      <AnimatePresence>
        {hoveredImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none w-[300px] h-[400px] border-4 border-yellow-400 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-900/50 backdrop-blur-sm flex flex-col">
              <img 
                src={hoveredImg.url} 
                className="w-full h-full object-cover"
                alt="hover preview"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 p-2 text-red-700 font-mono text-[10px] uppercase font-bold text-center">
                Preview Mode // {hoveredImg.title}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 p-6 md:p-12">
        {/* --- HEADER --- */}
        <header className="flex justify-between items-start mb-32">
          <div className="font-mono text-[10px] tracking-[0.5em] uppercase">
            [ Archive_Labs ] <br /> 
            <span className="text-yellow-200/50 italic">Database_v4.0</span>
          </div>
          <h1 className="text-right text-xs font-bold tracking-widest uppercase text-yellow-400">
            Index <br /> 2025—2026
          </h1>
        </header>

        {/* --- THE LIST (TABLE) --- */}
        <div className="w-full">
          <div className="grid grid-cols-12 gap-4 py-4 border-b border-yellow-400/30 text-[9px] font-mono text-yellow-200/60 uppercase tracking-widest">
            <div className="col-span-1 flex items-center gap-1"><Hash size={8} /></div>
            <div className="col-span-5 md:col-span-6">Title</div>
            {/* <div className="col-span-3 md:col-span-3">Category</div>
            <div className="col-span-3 md:col-span-2 text-right">Year</div> */}
          </div>

          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.id}
              onMouseEnter={() => setHoveredImg(img)}
              onMouseLeave={() => setHoveredImg(null)}
              onClick={() => setSelectedImg(img)}
              className="grid grid-cols-12 gap-4 py-8 md:py-12 border-b border-yellow-400/30 group cursor-pointer items-center hover:bg-yellow-400/10 transition-colors"
            >
              <div className="col-span-1 font-mono text-xs text-yellow-200/50 group-hover:text-white transition-colors">
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </div>
              
              <div className="col-span-5 md:col-span-6 flex items-center gap-4">
                <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter group-hover:pl-4 transition-all duration-500">
                  {img.title}
                </h2>
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all text-white" size={24} />
              </div>

              <div className="col-span-3 md:col-span-3 font-mono text-[10px] md:text-xs uppercase tracking-widest text-yellow-400/70">
                {img.category}
              </div>

              <div className="col-span-3 md:col-span-2 text-right font-mono text-[10px] md:text-xs text-yellow-400/50">
                // {img.year}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- FULLSCREEN CLICK VIEW --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            exit={{ clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-red-700 text-yellow-400 flex flex-col"
          >
            <div className="flex justify-between items-center p-8">
              <span className="font-mono text-xs uppercase tracking-widest">Entry_{selectedImg.id}</span>
              <button 
                onClick={() => setSelectedImg(null)}
                className="flex items-center gap-2 font-bold uppercase text-xs hover:text-white transition-colors"
              >
                Close <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row p-8 pt-0 gap-12 overflow-hidden">
                <div className="w-full md:w-2/3 h-full bg-red-800 flex items-center justify-center p-12">
                   <img src={selectedImg.url} className="w-full h-full object-contain" alt={selectedImg.title} />
                </div>
                
                <div className="w-full md:w-1/3 flex flex-col justify-end gap-12 pb-12">
                   <div>
                      <h3 className="text-8xl font-black uppercase tracking-tighter leading-none mb-4">{selectedImg.title}</h3>
                      <div className="flex gap-4 items-center">
                        <span className="px-3 py-1 border border-yellow-400 rounded-full text-[10px] font-bold uppercase">{selectedImg.category}</span>
                        <span className="font-mono text-xs">{selectedImg.year}</span>
                      </div>
                   </div>
                   
                   <p className="text-sm leading-relaxed text-yellow-100 max-w-sm">
                     A glimpse into the collaborative spirit of our cohort, where the next generation of founders connect and grow.
                   </p>

                   <div className="flex gap-4">
                      <button className="flex-1 py-4 bg-yellow-400 text-red-700 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors">
                        <Plus size={14} /> Add to Workspace
                      </button>
                      <div className="w-14 h-14 border border-yellow-400 flex items-center justify-center cursor-pointer hover:bg-yellow-400 hover:text-red-700 transition-all">
                        <ArrowUpRight size={20} />
                      </div>
                   </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="p-12 mt-20 border-t border-yellow-900/30 flex justify-between items-center">
        <div className="text-[10px] font-mono text-yellow-600/50 uppercase">
          Total_Items: {galleryImages.length} <br />
          Location: REMOTE_SERVER
        </div>
        <div className="w-8 h-8 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
      </footer>
    </div>
  );
};

export default GalleryPage;