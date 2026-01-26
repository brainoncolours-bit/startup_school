import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { AlertTriangle, Terminal, ArrowUpRight, Zap, ShieldCheck, Activity, BookOpen, HardHat } from 'lucide-react';

const IndustrialBlogArchive = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const archiveY = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);

  const blogPosts = [
    { id: 'RPT-001', title: '10 Essential Tips for First-Time Founders', excerpt: 'Critical failure points identified in early-stage operational deployment. Review protocol before launch.', author: 'SARAH JOHNSON', date: '20 JAN 2026', category: 'STRATEGY_CORE', readTime: '5 MIN', level: 'L1_ACCESS' },
    { id: 'RPT-002', title: 'How to Validate Your Startup Idea', excerpt: 'Market saturation analysis and stress testing procedures for new product hypotheses.', author: 'MICHAEL CHEN', date: '18 JAN 2026', category: 'MARKET_STRESS', readTime: '7 MIN', level: 'L2_ACCESS' },
    { id: 'RPT-003', title: 'The Art of Pitching to Investors', excerpt: 'Neuro-capital influence techniques. High-stakes communication blueprint for funding acquisition.', author: 'DAVID RODRIGUEZ', date: '15 JAN 2026', category: 'CAPITAL_FLOW', readTime: '8 MIN', level: 'L3_EXECUTIVE' },
    { id: 'RPT-004', title: 'Building a Strong Company Culture', excerpt: 'Human resource structural integrity. Protocols for high-output team synchronization.', author: 'EMILY WATSON', date: '12 JAN 2026', category: 'HUMAN_ASSETS', readTime: '6 MIN', level: 'L1_ACCESS' },
    { id: 'RPT-005', title: 'Growth Hacking Strategies That Work', excerpt: 'Non-linear scaling procedures. Exploiting system leverage for exponential reach.', author: 'ALEX TURNER', date: '10 JAN 2026', category: 'VELOCITY_MOD', readTime: '10 MIN', level: 'L2_ACCESS' },
    { id: 'RPT-006', title: 'From Idea to MVP in 30 Days', excerpt: 'Rapid prototyping cycle. Compressing development timeline from concept to operational build.', author: 'RACHEL GREEN', date: '08 JAN 2026', category: 'RAPID_DEPLOY', readTime: '9 MIN', level: 'L1_ACCESS' }
  ];

  return (
    <div ref={containerRef} className="bg-[#ffde17] text-black font-sans selection:bg-black selection:text-[#ffde17] overflow-x-hidden">
      
      {/* 1. THE ARCHIVE HUD (Persistent Overlay) */}
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none p-6 flex justify-between">
        <div className="flex items-center gap-4 bg-black text-white px-6 py-2">
          <Terminal size={18} className="text-[#ffde17]" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase">Archive_System.Loaded</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-white border-2 border-black px-4 py-1 mb-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-tighter">Encrypted_Feed</span>
          </div>
          <motion.div 
            style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }} 
            className="h-2 bg-black w-48"
          />
        </div>
      </div>

      {/* 2. KINETIC HEADER SECTION */}
      <section className="h-[70vh] flex flex-col items-center justify-center relative border-b-[20px] border-white pt-20">
        <motion.div 
          style={{ x: archiveY }} 
          className="absolute top-10 left-0 flex whitespace-nowrap opacity-5 pointer-events-none"
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[15vh] font-black mr-20">INTEL_ARCHIVE // DATA_DUMP // INTEL_ARCHIVE //</span>
          ))}
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          whileInView={{ y: 0, opacity: 1 }}
          className="z-10 text-center"
        >
          <div className="bg-black text-white inline-block px-4 py-1 mb-6">
            <p className="font-mono text-[10px] tracking-widest uppercase">Ique Ventures Industrial Intelligence</p>
          </div>
          <h1 className="text-[12vw] font-black uppercase leading-[0.7] tracking-tighter">
            Startup <br /> <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">Intel.</span>
          </h1>
        </motion.div>
      </section>

      {/* 3. THE REPORT GRID */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black border-[10px] border-black">
            {blogPosts.map((post) => (
              <ReportCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. EMERGENCY SUBSCRIPTION */}
      <section className="py-40 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-4 bg-[#ffde17] animate-pulse" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AlertTriangle size={60} className="text-[#ffde17] mx-auto mb-10" />
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none mb-10">
            Secure the <br /> <span className="text-[#ffde17]">Full Feed.</span>
          </h2>
          <div className="flex flex-col md:flex-row border-[6px] border-white">
            <input 
              type="email" 
              placeholder="OPERATOR_EMAIL_ADDRESS" 
              className="bg-transparent flex-grow p-6 text-2xl font-bold uppercase focus:outline-none placeholder:opacity-20"
            />
            <button className="bg-[#ffde17] text-black px-12 py-6 text-2xl font-black uppercase hover:bg-white transition-colors">
              Authorize
            </button>
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIAL FOOTER */}
      <footer className="bg-[#ffde17] py-20 border-t-[10px] border-white flex flex-col items-center">
        <HardHat size={40} className="mb-4" />
        <p className="font-mono text-[10px] font-bold tracking-[0.5em] text-black/40">24/7 MONITORING ACTIVE</p>
      </footer>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const ReportCard = ({ post }) => (
  <motion.div 
    whileHover={{ backgroundColor: '#ffde17' }}
    className="bg-white p-8 border-[1px] border-black flex flex-col h-full group transition-colors duration-300"
  >
    <div className="flex justify-between items-start mb-12">
      <div className="bg-black text-white px-3 py-1 font-mono text-[10px] font-bold">
        {post.id}
      </div>
      <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
        <Activity size={16} />
        <span className="font-mono text-[10px] font-bold">{post.level}</span>
      </div>
    </div>

    <p className="font-mono text-[10px] text-black/40 font-bold uppercase mb-4 tracking-widest flex items-center gap-2">
      <div className="w-2 h-2 bg-black rounded-full" /> {post.category}
    </p>
    
    <h3 className="text-4xl font-black uppercase leading-none tracking-tighter mb-6 group-hover:translate-x-2 transition-transform">
      {post.title}
    </h3>
    
    <p className="text-black/60 font-medium uppercase text-sm mb-12 leading-tight">
      {post.excerpt}
    </p>

    <div className="mt-auto flex items-end justify-between pt-8 border-t-4 border-black border-dashed">
      <div>
        <p className="font-mono text-[9px] font-bold opacity-30 uppercase">Authorized_By</p>
        <p className="text-lg font-black uppercase tracking-tighter">{post.author}</p>
        <p className="font-mono text-[10px] font-bold text-[#ffde17] bg-black inline-block px-1 mt-1">{post.date}</p>
      </div>
      <button className="p-4 bg-black text-white group-hover:bg-white group-hover:text-black transition-colors">
        <ArrowUpRight size={24} />
      </button>
    </div>
  </motion.div>
);

export default IndustrialBlogArchive;