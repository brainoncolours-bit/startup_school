import React, { useRef, useState, useEffect } from 'react'; // Fixed typo here
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Star, ArrowUpRight, Zap, Plus, Rocket, Trophy, Activity, Cpu, AlertTriangle, Skull, Flame, Sparkles, Target, TrendingUp } from 'lucide-react';
import Chatbot from '../components/Chatbot';
import SnakeGame from '../components/SnakeGame';
import Loader from '../components/Loader'; // Points to src/components/Loader.jsx
import Pillars from '../components/Pillars';
import { useNavigate } from 'react-router-dom';
import FAQ from './Faq';

// --- 1. MAGNETIC WRAPPER ---
const MagneticBox = ({ children, strength = 20 }) => {

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) / strength);
    y.set((clientY - centerY) / strength);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};


// --- 3. MAIN SITE COMPONENT ---
export default function NeoBrutalHome() {

  const [loading, setLoading] = useState(() => {
    // Only show loader on initial page load, not on route navigation
    if (typeof window !== 'undefined') {
      const hasShownLoader = sessionStorage.getItem('loaderShown');
      return !hasShownLoader;
    }
    return true;
  });

  const { scrollYProgress } = useScroll();


  const navigate = useNavigate();
  useEffect(() => {
    if (loading === false) {
      sessionStorage.setItem('loaderShown', 'true');
    }
  }, [loading]);

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroRotate = useTransform(smoothProgress, [0, 0.2], [0, -5]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);

  return (
    <>
        {/* for seo meta */}
      <div>
        <h1 className="hidden">Not an MBA - Startup School</h1>
        <p className="hidden">Welcome to Not an MBA, the ultimate startup school for aspiring entrepreneurs. Our immersive program combines cutting-edge curriculum, real-world projects, and mentorship from industry leaders to equip you with the skills and mindset needed to launch and scale your own successful startup. Join us to turn your innovative ideas into reality and disrupt the future of business.</p>


      </div>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="bg-[#43646b] text-white selection:bg-[#e72132] selection:text-white min-h-screen">
        
        {/* HERO SECTION */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden bg-[#f9bb1a] w-full z-10 ">
          <motion.div style={{ rotate: heroRotate, scale: heroScale }} className="z-10 text-center px-4">
            <motion.div initial={{ y: 100, opacity: 0 }} animate={!loading ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              <h1 className="text-[18vw] sm:text-[14vw] font-[950] leading-[0.8] text-black uppercase -tracking-[0.08em]">
                Not an  <br/>Mba
              </h1>
            </motion.div>
            
            <MagneticBox>
              <button 
                onClick={() => navigate('/contact')}
                className="mt-8 sm:mt-12 bg-[#e72132] text-white px-6 sm:px-10 py-3 sm:py-5 text-lg sm:text-2xl font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all border-2 sm:border-4 border-black"
              >
                Enter the Void
              </button>
            </MagneticBox>
          </motion.div>

          <motion.div 
            style={{ y: useTransform(smoothProgress, [0, 1], [0, -150]) }} 
            className="block absolute top-8 sm:top-12 md:top-16 right-4 sm:right-8 md:left-[5%] md:right-auto"
            whileHover={{ scale: 1.05 }}
            initial={{ x: -200, opacity: 0, rotate: -180, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, rotate: 0, scale: [0.8, 1.3, 1] }}
            transition={{ 
              duration: 1.6, 
              type: "spring", 
              stiffness: 60, 
              damping: 12,
              scale: { duration: 1.6, ease: "easeInOut" }
            }}
          >
            <motion.div 
              className="bg-[#F6F1E7] p-3 sm:p-6 md:p-8 border-2 sm:border-4 rounded-2xl sm:rounded-4xl border-black shadow-[6px_6px_0px_0px_#000] sm:shadow-[12px_12px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] sm:hover:shadow-[8px_8px_0px_0px_#000] transition-all"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img src="/assets/Startupschool.png" alt="Startup School" className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover" />
            </motion.div>
          </motion.div>
        </section>

        {/* MARQUEE */}
        <div className="bg-[#e72132] border-y-2 sm:border-y-4 border-black py-4 sm:py-8 overflow-hidden flex whitespace-nowrap rotate-[-1deg] z-20 relative w-full">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 125, repeat: Infinity, ease: "linear" }}
            className="text-3xl sm:text-5xl md:text-7xl font-black uppercase flex items-center gap-6 sm:gap-12 pr-6 sm:pr-12 text-black"
          >
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                <span>We are not an MBA.
                      not theory-heavy.
                       not passive learning.</span> <Zap className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" fill="black" />
                
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* BENTO GRID */}
        {/* <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-[#f1f1f1]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8">
            <motion.div whileHover={{ y: -10 }} className="md:col-span-8 bg-[#1da89d] p-6 sm:p-8 md:p-12 border-2 sm:border-4 border-black shadow-[8px_8px_0px_0px_#43646b] sm:shadow-[15px_15px_0px_0px_#43646b]">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-black mb-4 sm:mb-6 uppercase">Strategy</h2>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-white max-w-lg leading-tight">
                From learning to execution, we prepare you for the real startup world.Our strategy is simple: real problems, real execution, real outcomes.
              </p>
            </motion.div>
            <motion.div whileHover={{ rotate: 5 }} className="md:col-span-4 bg-[#ef6925] flex items-center justify-center border-2 sm:border-4 border-black shadow-[8px_8px_0px_0px_#000] sm:shadow-[15px_15px_0px_0px_#000] min-h-[200px] sm:min-h-[250px]">
              <ArrowUpRight className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36" strokeWidth={3} />
            </motion.div>
          </div>
        </section> */}

        {/*  SECTION - FOUNDATION OF GREATNESS */}
      <Pillars />

        <footer className="min-h-[60vh] sm:min-h-[70vh] md:h-[80vh] bg-[#1da89d] text-black flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
          <motion.h2 initial={{ scale: 0.5 }} whileInView={{ scale: 1 }} className="text-[25vw] sm:text-[20vw] font-black leading-none text-black text-center mb-8 sm:mb-12">READY?</motion.h2>
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 w-full flex-wrap">
            {['Join Now'].map(link => (
              <motion.button
                key={link}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 sm:border-4 border-black bg-black text-white px-8 sm:px-12 py-4 font-bold hover:bg-white hover:text-black transition-all uppercase w-80 sm:w-88 text-center"
                onClick={() => navigate('/contact')}
              >
                {link}
              </motion.button>
            ))}
          </div>
        </footer>
        <section>
          <FAQ />
        </section>
      </div>
      
      {/* Chatbot */}
      {/* <Chatbot /> */}
      
      {/* Snake Game */}
      {/* <SnakeGame /> */}
    </>
  );
}


