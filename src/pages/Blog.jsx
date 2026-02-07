import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const IMAGES = [
  { url: '/assets/img12.jpeg', title: 'VISION' },
  { url: '/assets/img9.jpeg', title: 'CLARITY' },
  { url: '/assets/img4.jpeg', title: 'Strategy' },
  { url: '/assets/img8.jpeg', title: 'Focus' },
];

export default function PerspectiveGallery() {
  const navigate = useNavigate();
  const [captures, setCaptures] = useState([]);
  const [flash, setFlash] = useState(false);

 const handleCapture = (e) => {
  // 1. Prevent capture when clicking buttons
  if (e.target.closest('button')) return;

  // 2. Check if it's a mobile device (width < 768px)
  const isMobile = window.innerWidth < 768;
  if (isMobile) return; // Exit early so no flash or polaroid happens

  // 3. If not mobile, proceed with Flash and Polaroid logic
  setFlash(true);
  setTimeout(() => setFlash(false), 150);

  const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
  const y = e.clientY || (e.touches ? e.touches[0].clientY : 0);

  const randomImg = IMAGES[Math.floor(Math.random() * IMAGES.length)];
  
  const newPhoto = {
    id: Date.now(),
    x,
    y,
    url: randomImg.url,
    rotate: Math.random() * 20 - 10,
  };

  setCaptures((prev) => [...prev, newPhoto].slice(-5));
};

  return (
    <main className="bg-red-600 text-yellow-400 overflow-x-hidden relative selection:bg-yellow-400 selection:text-red-600">
      {/* Visual Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Flash Overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section 
        onMouseDown={handleCapture}
        onTouchStart={handleCapture}
        className="h-[100dvh] flex flex-col items-start justify-center md:justify-end p-6 md:p-10 border-b border-yellow-400/30 relative overflow-hidden cursor-crosshair"
      >
        {/* Mobile Header */}
        <div className="absolute top-12 left-6 right-6 flex justify-between items-start md:hidden z-20">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono leading-none tracking-[0.2em] uppercase text-yellow-300">System // Online</span>
            <span className="text-[10px] font-mono leading-none tracking-[0.2em] opacity-40 uppercase">Lat: 12.9716° N</span>
          </div>
          <div className="text-[10px] font-mono border border-yellow-400/40 px-2 py-1 rounded italic">
            REC ●
          </div>
        </div>

        {/* Captured Polaroids Layer - HIDDEN ON MOBILE (hidden md:block) */}
        <AnimatePresence>
          {captures.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ scale: 1.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="hidden md:block absolute w-28 h-36 md:w-40 md:h-52 bg-white p-1.5 md:p-2 shadow-2xl z-10 pointer-events-none"
              style={{ 
                left: 0, 
                top: 0, 
                rotate: photo.rotate,
                x: photo.x - 56, 
                y: photo.y - 72 
              }}
            >
              <img src={photo.url} className="w-full h-24 md:h-36 object-cover bg-gray-200" alt="captured" />
              <div className="mt-2 flex flex-col font-mono text-[7px] md:text-[9px] text-black leading-tight">
                <span className="font-bold uppercase">IMG_{photo.id.toString().slice(-4)}</span>
                <span className="opacity-50">BENGALURU, IN</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Responsive Heading */}
        <div className="z-20 w-full">
          <h1 className="text-[26vw] md:text-[22vw] font-black uppercase leading-[0.75] mb-4 md:mb-8 select-none italic">
            The <br /> <span className="text-outline">Vault</span>
          </h1>
          
          <div className="flex flex-col md:flex-row justify-between w-full font-mono text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-yellow-300 gap-2">
            <span>Bengaluru // Perspective</span>
            <span className="opacity-70 md:block hidden">Click to snap / Scroll to explore</span>
            {/* Updated Mobile Text */}
            <span className="opacity-70 md:hidden block animate-pulse">Scroll to explore</span>
          </div>
        </div>

        {/* Scroll Indicator for Mobile */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:hidden flex flex-col items-center gap-2 opacity-40">
          <div className="w-[1px] h-12 bg-yellow-400" />
          <span className="font-mono text-[8px] tracking-[0.3em]">SCROLL</span>
        </div>
      </section>

      {/* Perspective Gallery Content */}
      <section className="py-12 md:py-24">
        {IMAGES.map((img, i) => (
          <PerspectiveCard key={i} {...img} />
        ))}
      </section>

      {/* Responsive Footer */}
      <footer className="h-[50vh] md:h-[70vh] flex flex-col items-center justify-center gap-6 px-6">
        <h2 className="text-xs md:text-xl font-mono uppercase tracking-[0.5em] opacity-40 italic">Next Chapter</h2>
        <button 
          className="text-4xl md:text-7xl font-black uppercase italic hover:scale-105 active:scale-95 transition-transform"
          onClick={() => navigate("/gallery")}
        >
          View More →
        </button>
      </footer>

      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 1.5px #facc15;
          color: transparent;
        }
        @media (min-width: 768px) {
          .text-outline { -webkit-text-stroke: 2px #facc15; }
        }
        @media (min-width: 1024px) {
          .text-outline { -webkit-text-stroke: 4px #facc15; }
        }
      `}</style>
    </main>
  );
}

function PerspectiveCard({ url, title }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <div ref={container} className="h-[75vh] md:h-[100vh] flex items-center justify-center px-4 md:px-8" style={{ perspective: '1200px' }}>
      <motion.div 
        style={{ scale, rotateX, opacity }}
        className="relative w-full max-w-6xl h-[400px] md:h-[600px] rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-red-800"
      >
        <img src={url} alt={title} className="w-full h-full object-cover grayscale-[10%] contrast-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-transparent flex items-end p-6 md:p-20">
          <h2 className="text-[16vw] md:text-[12vw] font-black text-yellow-400 italic tracking-tighter leading-[0.7]">
            {title}
          </h2>
        </div>
      </motion.div>
    </div>
  );
}