import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { Terminal, Zap, Fingerprint, Eye, Command, Plus } from 'lucide-react';

const AcidBrutalistBlog = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Create a velocity-based "stretch" for the whole page
  const scrollVelocity = useVelocity(scrollYProgress);
  const scaleY = useTransform(scrollVelocity, [-1, 1], [0.8, 1.2]);
  const smoothScaleY = useSpring(scaleY, { stiffness: 300, damping: 30 });

  return (
    <div className="bg-[#e7ff00] min-h-screen overflow-x-hidden font-black selection:bg-black selection:text-[#e7ff00]">
      {/* --- KINETIC BACKGROUND TEXT (MARQUEE) --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <motion.div 
          style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
          className="whitespace-nowrap text-[40vh] leading-none uppercase italic"
        >
          FOUNDER_FEED_010101_FOUNDER_FEED_010101_
        </motion.div>
      </div>

      {/* --- THE VANDAL NAV --- */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-[100] mix-blend-difference text-white">
        <div className="flex items-center gap-2">
          <Terminal size={32} />
          <span className="text-2xl tracking-tighter">RAW.INTEL</span>
        </div>
        <div className="flex gap-8 text-xs font-mono uppercase tracking-[0.4em]">
          <span className="cursor-crosshair hover:line-through transition-all">Archive</span>
          <span className="cursor-crosshair hover:line-through transition-all">Labs</span>
          <span className="bg-white text-black px-2">Live_03</span>
        </div>
      </nav>

      <motion.main style={{ scaleY: smoothScaleY }} className="relative z-10">
        {/* --- HERO: THE DISTORTION --- */}
        <section className="h-[90vh] flex items-center justify-center p-6">
          <motion.h1 
            initial={{ letterSpacing: "-0.1em", opacity: 0 }}
            animate={{ letterSpacing: "0em", opacity: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="text-[22vw] leading-[0.7] uppercase italic text-black"
          >
           the <br /> <span className="bg-black text-[#e7ff00] px-4"> unseen</span>
          </motion.h1>
        </section>

        {/* --- THE LIQUID FEED --- */}
        <section className="px-6 pb-40 space-y-40">
          {blogPosts.map((post, i) => (
            <AcidCard key={post.id} post={post} index={i} />
          ))}
        </section>
      </motion.main>

      {/* --- FOOTER: GLITCH OUT --- */}
      <footer className="h-screen bg-black text-[#e7ff00] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-[10vw] leading-none mb-10">WANT THE <br /> TRUTH?</div>
        <motion.button 
          whileHover={{ scale: 0.9, rotate: 5 }}
          className="border-4 border-[#e7ff00] px-12 py-6 text-4xl hover:bg-[#e7ff00] hover:text-black transition-colors"
        >
          JOIN THE SYNDICATE
        </motion.button>
      </footer>
    </div>
  );
};

const AcidCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
      initial={{ x: isEven ? -100 : 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* THE IMAGE WITH CLIP-PATH DISTORTION */}
      <div 
        className="relative w-full md:w-1/2 aspect-square overflow-hidden bg-black cursor-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.img 
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            filter: isHovered ? "contrast(1.5) grayscale(0)" : "contrast(1) grayscale(1)"
          }}
          src={post.img} 
          className="w-full h-full object-cover opacity-80 transition-all duration-700"
        />
        
        {/* Custom Card Cursor */}
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="bg-[#e7ff00] text-black px-6 py-3 font-black text-xl rotate-[-10deg] shadow-[10px_10px_0px_#000]">
            VIEW_INTEL
          </div>
        </motion.div>
      </div>

      {/* THE TEXT */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="flex items-center gap-4 text-sm font-mono">
          <Fingerprint size={20} />
          <span>REF_{post.id}X</span>
          <div className="h-[1px] flex-grow bg-black" />
          <span>{post.category}</span>
        </div>
        
        <h3 className="text-7xl md:text-8xl leading-[0.85] uppercase tracking-tighter hover:italic transition-all">
          {post.title}
        </h3>
        
        <p className="text-xl font-medium leading-tight max-w-md">
          {post.excerpt}
        </p>

        <div className="flex gap-4">
          <Plus size={40} className="hover:rotate-90 transition-transform cursor-pointer bg-black text-white p-2" />
          <div className="h-10 w-full border-b-4 border-black self-end" />
        </div>
      </div>
    </motion.div>
  );
};

const blogPosts = [
  { id: 1, title: "Black Box Wealth", excerpt: "The untraceable methods high-frequency founders use to offshore their leverage.", category: "FINANCE", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800" },
  { id: 2, title: "Social Engineering", excerpt: "How to manipulate the algorithm before it manipulates your customer base.", category: "PSYCH", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800" },
  { id: 3, title: "Vaporware Ops", excerpt: "Sell the future, build the present. The ethics of pre-product market fit.", category: "STRATEGY", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" },
  { id: 4, title: "Hyper Leverage", excerpt: "Using AI agents to replace your entire middle-management layer.", category: "TECH", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800" }
];

export default AcidBrutalistBlog;