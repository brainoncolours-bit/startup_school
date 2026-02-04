import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate} from 'react-router-dom'
const images = [
  { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe', title: 'VOID' },
  { url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400', title: 'CHROMA' },
  { url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2', title: 'PRISM' },
  { url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead', title: 'NEON' },
];

export default function PerspectiveGallery() {
  const naviagte = useNavigate();
  const [captures, setCaptures] = useState([]);
  const [flash, setFlash] = useState(false);

  const handleCapture = (e) => {
    // 1. Trigger Flash
    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    // 2. Add new photo at click location
    const newPhoto = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      // Pick a random image from our list
      url: images[Math.floor(Math.random() * images.length)].url,
      rotate: Math.random() * 40 - 20, // Random rotation between -20 and 20deg
    };

    setCaptures((prev) => [...prev, newPhoto]);
  };

  return (
    <main className="bg-red-600 text-yellow-400 overflow-x-hidden relative">
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
        className="h-screen flex flex-col items-start justify-end p-10 border-b border-yellow-400/20 relative overflow-hidden cursor-crosshair"
      >
        {/* Render Captured Photos */}
        <AnimatePresence>
          {captures.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ scale: 2, opacity: 0, x: photo.x - 100, y: photo.y - 100 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute w-40 h-48 bg-white p-2 shadow-2xl z-10 pointer-events-none"
              style={{ 
                left: 0, 
                top: 0, 
                rotate: photo.rotate,
                x: photo.x - 80, // Center the photo on click
                y: photo.y - 100 
              }}
            >
              <img src={photo.url} className="w-full h-32 object-cover bg-gray-200" alt="captured" />
              <div className="mt-2 h-8 bg-gray-100 flex items-center px-1">
                <span className="text-[10px] text-black font-mono">CAPTURED_0{photo.id.toString().slice(-2)}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <h1 className="text-[20vw] font-black uppercase leading-[0.8] mb-10 select-none">
          The <br /> <span className="text-outline">Vault</span>
        </h1>
        <div className="flex justify-between w-full font-mono text-sm uppercase tracking-widest text-yellow-200/70 z-20">
          <span>Perspective Grid // 04</span>
          <span>Click to Capture / Scroll to Unlock</span>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-20 px-4">
        {images.map((img, i) => (
          <PerspectiveCard key={i} {...img} />
        ))}
      </section>

      <footer className="h-[50vh] flex items-center justify-center">
        <h2 className="text-5xl font-light tracking-[1em] uppercase opacity-40">Finis</h2> <br />

        <button onClick={()=>{naviagte("/gallery")}}>
          View moreaaa
        </button>
      </footer>

      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 2px #facc15;
          color: transparent;
        }
      `}</style>
    </main>

  );
}

// Sub-component for the scrolling cards
const PerspectiveCard = ({ url, title }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [45, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={container} className="h-[80vh] flex items-center justify-center perspective-[1000px]">
      <motion.div 
        style={{ scale, rotateX, opacity }}
        className="relative w-full max-w-4xl h-[500px] rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-red-900"
      >
        <img src={url} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent flex items-end p-12">
          <h2 className="text-[10vw] font-black text-yellow-400 italic tracking-tighter leading-[0.7]">
            {title}
          </h2>
        </div>
      </motion.div>
    </div>
  );
};