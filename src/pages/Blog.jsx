import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const IMAGES = [
  { url: '/assets/img9.jpeg', title: 'VISION' },
  { url: '/assets/img12.jpeg', title: 'CLARITY' },
  { url: '/assets/img4.jpeg', title: 'Strategy' },
  { url: '/assets/img8.jpeg', title: 'Focus' },
];

export default function PerspectiveGallery() {
  const navigate = useNavigate();
  const [captures, setCaptures] = useState([]);
  const [flash, setFlash] = useState(false);

  const handleCapture = (e) => {
    // Prevent capture trigger when clicking the navigation button
    if (e.target.closest('button')) return;

    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    const randomImg = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    
    const newPhoto = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      url: randomImg.url,
      rotate: Math.random() * 30 - 15,
    };

    setCaptures((prev) => [...prev, newPhoto].slice(-8)); // Optimization: keep last 8
  };

  return (
    <main className="bg-red-600 text-yellow-400 overflow-x-hidden relative selection:bg-yellow-400 selection:text-red-600">
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
        onClick={handleCapture}
        className="h-screen flex flex-col items-start justify-end p-10 border-b border-yellow-400/30 relative overflow-hidden cursor-crosshair"
      >
        {/* Snapshots Layer */}
        <AnimatePresence>
          {captures.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ scale: 2, opacity: 0, x: photo.x - 100, y: photo.y - 100 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute w-40 h-52 bg-white p-2 shadow-2xl z-10 pointer-events-none"
              style={{ 
                left: 0, 
                top: 0, 
                rotate: photo.rotate,
                x: photo.x - 80, 
                y: photo.y - 100 
              }}
            >
              <img src={photo.url} className="w-full h-36 object-cover bg-gray-200" alt="captured" />
              <div className="mt-3 flex flex-col font-mono text-[9px] text-black leading-none">
                <span className="font-bold">FILE: CAPTURE_{photo.id.toString().slice(-4)}</span>
                <span className="mt-1 opacity-50">LOC: 12.9716° N, 77.5946° E</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <h1 className="text-[22vw] font-black uppercase leading-[0.7] mb-10 select-none italic">
          The <br /> <span className="text-outline">Vault</span>
        </h1>
        
        <div className="flex justify-between w-full font-mono text-sm uppercase tracking-[0.3em] text-yellow-300 z-20">
          <span>Bengaluru // Perspective</span>
          <span className="hidden md:block">Click anywhere to snap / Scroll to explore</span>
        </div>
      </section>

      {/* Scrolling Content */}
      <section className="py-20">
        {IMAGES.map((img, i) => (
          <PerspectiveCard key={i} {...img} />
        ))}
      </section>

      {/* Footer */}
      <footer className="h-[60vh] flex flex-col items-center justify-center gap-6">
        <h2 className="text-xl font-mono uppercase tracking-[0.5em] opacity-60 italic">Navigation</h2>
        <button 
          className="text-4xl md:text-6xl font-black uppercase italic hover:scale-110 active:scale-95 transition-transform"
          onClick={() => navigate("/gallery")}
        >
          View More →
        </button>
      </footer>

      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 2px #facc15;
          color: transparent;
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

  // 3D Motion Values
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <div ref={container} className="h-[90vh] flex items-center justify-center px-6" style={{ perspective: '1200px' }}>
      <motion.div 
        style={{ scale, rotateX, opacity }}
        className="relative w-full max-w-5xl h-[500px] rounded-lg overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] bg-red-800"
      >
        <img src={url} alt={title} className="w-full h-full object-cover grayscale-[20%] contrast-125" />
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-transparent to-transparent flex items-end p-10 md:p-16">
          <h2 className="text-[12vw] font-black text-yellow-400 italic tracking-tighter leading-[0.7]">
            {title}
          </h2>
        </div>
      </motion.div>
    </div>
  );
}