import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, Scan, Database, MoveRight } from 'lucide-react';

const BrutalistArchive = () => {
  const containerRef = useRef(null);
  
  return (
    /* BG: Crimson #e72132 */
    <div ref={containerRef} className="bg-[#e72132] min-h-screen text-[#eee] selection:bg-black selection:text-[#f9bb1a]">
      
      {/* --- SIDEBAR LOGS --- */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-10 hidden lg:flex z-50">
        <div className="rotate-90 origin-center flex items-center gap-4 text-[10px] font-mono tracking-[0.5em] text-black font-bold">
          <Scan size={14} />
          <span>CURRENT_BUFFER: 04_STK</span>
        </div>
      </aside>

      {/* --- TOP HUD --- */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-start z-[100] border-b border-black/10 bg-[#e72132]/90 backdrop-blur-md">
        <div className="flex flex-col text-black">
          <div className="flex items-center gap-2">
            <Layers className="text-black" />
            <span className="font-black text-2xl uppercase italic tracking-tighter">ARCHIVE.OS</span>
          </div>
          <p className="text-[9px] font-mono opacity-60 ml-8 font-bold">ENCRYPTION: AES-256 // LEVEL_04</p>
        </div>
        <div className="bg-black text-[#f9bb1a] px-4 py-2 font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl border border-[#f9bb1a]/20">
          <Database size={14} /> System_Vault
        </div>
      </nav>

      <main className="pt-32 pb-40">
        <div className="px-4 md:px-10 lg:px-20">
          {blogPosts.map((post, i) => (
            <ArchiveSection key={post.id} post={post} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

const ArchiveSection = ({ post, index }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.65]);

  return (
    <motion.section 
      ref={sectionRef}
      style={{ scale, opacity }}
      /* CARD COLOR: Warning Yellow #f9bb1a */
      className="sticky top-32 mb-24 md:mb-48 bg-[#f9bb1a] border-4 border-black rounded-none overflow-hidden shadow-[25px_25px_0px_rgba(0,0,0,1)]"
    >
      <div className="flex flex-col lg:flex-row min-h-[60vh]">
        {/* CONTENT - Changed text-black to text-[#e72132] */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-between order-2 lg:order-1 text-[#e72132]">
          <div className="space-y-6">
            <div className="flex items-center gap-4 font-mono text-xs">
              {/* ID Badge keeps black bg for legibility, but internal text is red */}
              <span className="bg-black text-[#e72132] px-2 py-0.5 font-bold uppercase">DATA_REF_{post.id}</span>
              <span className="opacity-40 text-black">/ /</span>
              <span className="uppercase tracking-widest font-black text-[10px] text-black">
                {post.category}
              </span>
            </div>
            
            {/* Main Title in Brand Red */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.8] tracking-tighter drop-shadow-sm">
              {post.title}
            </h2>
            
            {/* Excerpt in Brand Red */}
            <p className="max-w-xl text-lg md:text-xl font-bold leading-tight">
              {post.excerpt}
            </p>
          </div>

          {/* CTA Section - Changed to Red Theme */}
          <div className="mt-12 flex items-center gap-6 group cursor-pointer w-fit">
            <div className="w-16 h-16 rounded-none border-4 border-[#e72132] flex items-center justify-center group-hover:bg-[#e72132] transition-all duration-300">
              <MoveRight className="text-[#e72132] group-hover:text-[#f9bb1a] transition-colors" size={32} />
            </div>
            <span className="font-black uppercase text-xl tracking-widest group-hover:tracking-[0.2em] transition-all text-[#e72132]">
              Download_Module
            </span>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="lg:w-2/5 relative bg-black order-1 lg:order-2 overflow-hidden border-l-4 border-black">
          <img 
            src={post.img} 
            className="w-full h-full object-cover opacity-80 grayscale contrast-150 hover:grayscale-0 transition-all duration-700"
            alt={post.title}
          />
          {/* Red mix-blend overlay instead of yellow to tie into the new font color */}
          <div className="absolute inset-0 bg-[#e72132]/20 mix-blend-multiply pointer-events-none" />
        </div>
      </div>
    </motion.section>
  );
};

const blogPosts = [
  { id: 101, title: "Neural Mesh", excerpt: "Decentralized cognition through peer-to-peer brain-computer interfaces.", category: "BIOTECH", img: "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=800" },
  { id: 102, title: "Static Cities", excerpt: "The rise of architecture designed specifically for non-human habitation.", category: "URBAN", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
  { id: 103, title: "Deep Trace", excerpt: "How to survive in a world where metadata is more valuable than money.", category: "PRIVACY", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800" },
  { id: 104, title: "Hyper-Fuel", excerpt: "Synthetic energy sources harvested from the thermal decay of data centers.", category: "ENERGY", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800" }
];

export default BrutalistArchive;