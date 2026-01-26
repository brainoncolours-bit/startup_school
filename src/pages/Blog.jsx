import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Terminal, Zap, ArrowUpRight, Newspaper, Hash, Timer, User } from 'lucide-react';

const KineticBlog = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  // Parallax Transforms for that "Vibrant Executive" feel
  const limeBlobY = useTransform(smoothScroll, [0, 1], ["0%", "180%"]);
  const redBlobY = useTransform(smoothScroll, [0, 1], ["0%", "-150%"]);
  const rotateHero = useTransform(smoothScroll, [0, 0.2], [0, -4]);

  const blogPosts = [
    { id: 1, title: '10 Essential Tips for First-Time Founders', excerpt: 'Starting your first company is combat. Here are the lessons we learned in the trenches.', author: 'Sarah Johnson', date: 'JAN 20, 2026', category: 'STRATEGY', readTime: '5 MIN', color: '#a5cb3a' },
    { id: 2, title: 'How to Validate Your Startup Idea', excerpt: 'Stop dreaming. Start testing. Learn how to verify market hunger before you bleed capital.', author: 'Michael Chen', date: 'JAN 18, 2026', category: 'PRODUCT', readTime: '7 MIN', color: '#e72132' },
    { id: 3, title: 'The Art of Pitching to Investors', excerpt: 'Master the high-stakes psychology that turns a "maybe" into an immediate wire transfer.', author: 'David Rodriguez', date: 'JAN 15, 2026', category: 'CAPITAL', readTime: '8 MIN', color: '#f79e27' },
    { id: 4, title: 'Building a Strong Company Culture', excerpt: 'Culture isn’t snacks; it’s shared DNA. Architect an environment where elite teams thrive.', author: 'Emily Watson', date: 'JAN 12, 2026', category: 'CULTURE', readTime: '6 MIN', color: '#a5cb3a' },
    { id: 5, title: 'Growth Hacking Strategies That Work', excerpt: 'Forget traditional marketing. Use digital leverage to scale your reach exponentially.', author: 'Alex Turner', date: 'JAN 10, 2026', category: 'GROWTH', readTime: '10 MIN', color: '#e72132' },
    { id: 6, title: 'From Idea to MVP in 30 Days', excerpt: 'Speed is your only advantage. Build, break, and ship your product in record time.', author: 'Rachel Green', date: 'JAN 8, 2026', category: 'VELOCITY', readTime: '9 MIN', color: '#f79e27' }
  ];

  return (
    <div ref={containerRef} className="bg-[#fcfcfc] text-black selection:bg-[#a5cb3a] selection:text-black overflow-x-hidden">
      
      {/* 1. KINETIC HERO SECTION */}
      <section className="h-[90vh] relative flex items-center justify-center overflow-hidden border-b-[12px] border-black">
        <motion.div style={{ y: limeBlobY }} className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#a5cb3a] rounded-full blur-[140px] opacity-40" />
        <motion.div style={{ y: redBlobY }} className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#e72132] rounded-full blur-[140px] opacity-30" />

        <motion.div style={{ rotate: rotateHero }} className="z-10 text-center px-6">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }}
            className="inline-flex items-center gap-2 bg-black text-[#a5cb3a] px-6 py-2 rounded-full mb-10"
          >
            <Terminal size={14} />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em]">Intel.Feed_v2.0</span>
          </motion.div>
          
          <h1 className="text-[12vw] font-black italic uppercase leading-[0.75] tracking-tighter">
            The <br /> <span className="text-[#e72132]">Founder</span> <br /> Feed.
          </h1>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-[2px] h-12 bg-black animate-bounce" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Scroll to Extract</span>
        </div>
      </section>

      {/* 2. THE MARQUEE (Momentum) */}
      <div className="py-12 bg-black overflow-hidden border-y-4 border-black">
        <motion.div 
          style={{ x: useTransform(smoothScroll, [0, 1], ["0%", "-40%"]) }}
          className="flex gap-20 whitespace-nowrap"
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-6xl font-black italic uppercase text-white opacity-90">
              • INSIGHT IS POWER • NO FLUFF • PURE ALPHA • 
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3. THE INTEL GRID */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-32">
            <div>
              <h2 className="text-8xl font-black italic uppercase tracking-tighter leading-none">Latest <br /><span className="text-[#a5cb3a]">Intel.</span></h2>
            </div>
            <Newspaper size={80} className="text-black/5 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
            {blogPosts.map((post) => (
              <BlogProtocolCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE ULTIMATUM CTA */}
      <section className="py-60 bg-black text-center relative overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-5 border-[120px] border-dotted border-white rounded-full scale-150"
        />

        <div className="relative z-10 px-6">
          <h2 className="text-6xl md:text-[8vw] font-black italic uppercase text-white mb-16 leading-none">
            Get the <br /> <span className="text-[#e72132]">Manifesto.</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <input 
              type="email" 
              placeholder="YOUR_EMAIL_ADDRESS" 
              className="bg-transparent border-b-4 border-white text-white text-2xl font-black p-4 w-full max-w-md focus:outline-none focus:border-[#a5cb3a] transition-colors"
            />
            <button className="bg-[#a5cb3a] text-black px-12 py-6 font-black italic uppercase tracking-[0.2em] text-xl hover:bg-white transition-all shadow-[10px_10px_0px_#e72132]">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const BlogProtocolCard = ({ post }) => (
  <motion.article 
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
  >
    <div className="relative aspect-[16/10] bg-slate-100 mb-8 overflow-hidden border-2 border-black transition-all duration-500 group-hover:shadow-[15px_15px_0px_#000]">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />
      
      {/* Color Wash */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 flex items-center justify-center"
        style={{ backgroundColor: post.color }}
      >
        <Zap size={60} fill="black" />
      </div>

      <div className="absolute top-4 left-4 flex gap-2">
        <div className="bg-black text-white px-3 py-1 text-[10px] font-black tracking-widest flex items-center gap-2">
          <Hash size={10} /> {post.category}
        </div>
      </div>
    </div>

    <div className="flex items-start justify-between gap-4 mb-4">
      <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none group-hover:text-[#e72132] transition-colors">
        {post.title}
      </h3>
      <ArrowUpRight className="shrink-0 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" size={32} />
    </div>

    <p className="text-slate-500 font-bold leading-snug mb-8 line-clamp-2">
      {post.excerpt}
    </p>

    <div className="flex items-center gap-6 pt-6 border-t border-slate-200 font-mono text-[10px] font-black uppercase tracking-widest opacity-60">
      <div className="flex items-center gap-2">
        <User size={12} /> {post.author}
      </div>
      <div className="flex items-center gap-2">
        <Timer size={12} /> {post.readTime}
      </div>
    </div>
  </motion.article>
);

export default KineticBlog;