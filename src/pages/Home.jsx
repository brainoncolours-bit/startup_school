import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Newspaper, ChevronDown, Activity, TrendingUp, Globe, Terminal, BarChart3, PieChart, Zap, ShieldCheck, Cpu, ArrowRight, CheckCircle, Users } from 'lucide-react';

const KineticExecutiveApp = ({ onNavbarShow }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  // Show navbar after newspaper unfolds
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      if (v >= 0.2 && onNavbarShow) onNavbarShow(true);
      else if (v < 0.2 && onNavbarShow) onNavbarShow(false);
    });
    return () => unsubscribe();
  }, [smoothProgress, onNavbarShow]);

  const leftFold = useTransform(smoothProgress, [0, 0.15], [0, -135]);
  const rightFold = useTransform(smoothProgress, [0, 0.15], [0, 135]);
  const contentScale = useTransform(smoothProgress, [0.05, 0.2], [0.8, 1]);
  const contentOpacity = useTransform(smoothProgress, [0.12, 0.2], [0, 1]);

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="bg-[#080a0b] text-white selection:bg-[#ef6925]">
      
      <section className="h-[280vh] relative perspective-3000">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          
          <motion.div 
            style={{ scale: contentScale, opacity: contentOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 bg-[#fcfcfc] text-black"
          >
            <div className="max-w-7xl w-full">
               <h2 className="text-[10vw] font-black italic uppercase leading-[0.75] tracking-tighter text-center">
                Pure <br /> <span className="text-[#ef6925]">Monetary</span> <br /> Clarity.
              </h2>
            </div>
          </motion.div>

          <div className="relative w-full h-full flex z-20 pointer-events-none">
            
            {/* LEFT PAGE: WORLD NEWS & HEADLINES */}
            <motion.div 
              style={{ rotateY: leftFold, originX: 0 }} 
              className="w-1/2 h-full bg-[#e8e4d9] border-r-2 border-black/30 flex relative shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30" />
              
              <div className="relative w-full p-6 md:p-8 text-black flex flex-col">
                <div className="border-b-[3px] border-black pb-1 mb-3">
                  <div className="flex justify-between text-[7px] font-serif font-black uppercase mb-1 tracking-tighter">
                    <span>Vol. XCII...No. 402</span>
                    <span>Monday, January 27, 2026</span>
                    <span>City Edition</span>
                    <span>₹15.00</span>
                  </div>
                  <h1 className="font-serif text-6xl font-black tracking-tighter uppercase italic text-center border-y-4 border-double border-black py-1">
                    The Founder's Gazette
                  </h1>
                </div>

                <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden">
                  <div className="col-span-3 border-r border-black/20 pr-2 text-[8px] font-serif">
                    <div className="bg-black text-white p-1 text-center font-bold mb-2 uppercase tracking-tighter text-[9px]">Market Pulse</div>
                    {['SENSEX: +1.42%', 'NIFTY: +0.94%', 'USD/INR: 83.10', 'GOLD: 72,400', 'OIL: -2.15%'].map(t => (
                      <div key={t} className="border-b border-black/10 py-1 font-mono text-[7px]">{t}</div>
                    ))}
                    <h3 className="font-black mt-4 mb-1 border-b border-black text-[9px]">WORLD IN BRIEF</h3>
                    <p className="mb-2 leading-tight text-justify font-bold italic">LONDON: Fintech merger blocked.</p>
                    <p className="mb-2 leading-tight text-justify">TOKYO: Nikkei reaches 35-year high.</p>
                    
                    <div className="mt-auto pt-2 border-t border-black">
                       <h4 className="font-black text-[8px] uppercase mb-1">Weather</h4>
                       <p className="text-[7px]">BLR: 28°C / SFO: 14°C</p>
                    </div>
                  </div>

                  <div className="col-span-9 flex flex-col">
                    <h2 className="font-serif text-4xl font-black leading-[0.85] uppercase mb-2">Capital Velocity Surges as Founders Bypass Legacy Debt</h2>
                    <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden">
                      <div className="flex flex-col">
                        <p className="font-serif text-[10px] leading-tight text-justify first-letter:text-4xl first-letter:font-black first-letter:mr-1 first-letter:float-left mb-2">
                          The institutional landscape shifted violently this morning as the Ique Protocol went live. Over $4.2B in liquidity was re-routed through kinetic channels.
                        </p>
                        <div className="border-t-2 border-black pt-2">
                           <h4 className="font-serif font-black text-xs uppercase mb-1">Energy Stocks Tumble</h4>
                           <p className="font-serif text-[9px] leading-tight text-justify">Fusion breakthroughs in the global south have left traditional energy markets in flux.</p>
                        </div>
                        <div className="mt-auto border-t-4 border-double border-black pt-2">
                           <h4 className="font-serif font-black text-sm italic uppercase mb-1">Opinion: The Algorithmic CEO</h4>
                           <p className="font-serif text-[8px] leading-tight text-justify italic">"The transition to mechanical governance is nearing completion."</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="border border-black p-1 bg-white">
                          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" className="grayscale contrast-125 mix-blend-multiply h-28 w-full object-cover" />
                        </div>
                        <div className="border border-black p-1 bg-white/40 grid grid-cols-8 h-20">
                           {Array.from({length: 64}).map((_, i) => (
                               <div key={i} className={`border-[0.5px] border-black/20 ${[2, 10, 45, 60].includes(i) ? 'bg-black' : ''}`} />
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* RIGHT PAGE: BUSINESS & CLASSIFIEDS */}
            <motion.div 
              style={{ rotateY: rightFold, originX: 1 }} 
              className="w-1/2 h-full bg-[#e8e4d9] border-l-2 border-black/30 flex relative shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30" />
              
              <div className="relative w-full p-6 md:p-8 text-black flex flex-col">
                <div className="border-b-2 border-black flex justify-between items-end mb-3 pb-1">
                  <h3 className="font-serif font-black text-xl uppercase italic">Business & Innovation</h3>
                  <span className="font-serif text-[9px] font-black tracking-tighter uppercase">SECTION B // PAGE 12</span>
                </div>

                <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden">
                  <div className="col-span-8 flex flex-col">
                    <div className="columns-2 gap-3 border-b border-black/20 pb-3 mb-3">
                       <h4 className="font-serif font-black text-xs uppercase leading-none mb-1">Death of the Term Sheet</h4>
                       <p className="font-serif text-[8px] leading-tight text-justify">Automated smart contracts now handle 40% of seed deployments.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                       <div className="border border-black p-2 bg-white/60">
                          <h5 className="font-serif font-black text-[9px] uppercase mb-1 underline">Innovation Hub</h5>
                          <ul className="font-serif text-[7px] space-y-1 font-bold">
                             <li>• AI Ethics: Final Ruling</li>
                             <li>• Biotech Cluster: Pune</li>
                          </ul>
                       </div>
                       <div className="bg-black text-white p-2 text-center flex flex-col justify-center">
                          <p className="font-serif font-black text-sm italic uppercase leading-none tracking-tighter">"Precision over Luck."</p>
                       </div>
                    </div>

                    <div className="flex-1 border-t border-black pt-2 flex flex-col overflow-hidden">
                       <h4 className="font-serif font-black text-[10px] uppercase mb-1 border-b border-black pb-1">Founder's Digest</h4>
                       <div className="grid grid-cols-3 gap-2 mb-2">
                          {[{l: 'Yield', v: '12.4%'},{l: 'Lag', v: '0.00ms'},{l: 'Nodes', v: '890+'}].map(x => (
                             <div key={x.l} className="border border-black p-1 text-center bg-white/30">
                                <p className="font-mono text-[8px] font-black">{x.v}</p>
                                <p className="text-[5px] uppercase font-bold">{x.l}</p>
                             </div>
                          ))}
                       </div>
                       
                       <div className="mb-2">
                          <h4 className="font-serif font-black text-[9px] uppercase mb-1">Corporate Ledger</h4>
                          <div className="text-[7px] font-mono leading-[1.1] opacity-80">
                             <p>• DIVIDEND: 4.2% PER UNIT.</p>
                             <p>• ACQ: NODE-7 COMPLETE.</p>
                          </div>
                       </div>

                       {/* SUDOKU SECTION - FILLING THE REMAINING SPACE */}
                       <div className="mt-auto border-t-2 border-black pt-2 pb-1 bg-black/5 p-2">
                          <div className="flex justify-between items-center mb-1">
                             <h4 className="font-serif font-black text-[10px] uppercase italic">Executive Sudoku</h4>
                             <span className="text-[6px] font-black uppercase tracking-tighter">Difficulty: Pro</span>
                          </div>
                          <div className="grid grid-cols-9 border-2 border-black bg-white w-full max-w-[180px] mx-auto">
                            {Array.from({length: 81}).map((_, i) => {
                                const row = Math.floor(i / 9);
                                const col = i % 9;
                                const isThickRight = (col + 1) % 3 === 0 && col !== 8;
                                const isThickBottom = (row + 1) % 3 === 0 && row !== 8;
                                const fixedNumbers = { 2: '5', 13: '1', 25: '9', 30: '4', 40: '2', 55: '7', 72: '8', 80: '3' };
                                return (
                                  <div key={i} className={`
                                    h-4 md:h-5 flex items-center justify-center text-[8px] font-mono font-bold border-[0.5px] border-black/30
                                    ${isThickRight ? 'border-r-2 border-r-black' : ''}
                                    ${isThickBottom ? 'border-b-2 border-b-black' : ''}
                                  `}>
                                    {fixedNumbers[i] || ''}
                                  </div>
                                );
                            })}
                          </div>
                          <p className="text-[5px] mt-1 italic text-center leading-none">Fill the grid so every row, column, and 3x3 box contains digits 1-9.</p>
                       </div>
                    </div>
                  </div>

                  <div className="col-span-4 border-l border-black/20 pl-3 flex flex-col overflow-hidden">
                    <div className="bg-black text-white p-1 text-center font-bold text-[8px] uppercase mb-2">Classifieds</div>
                    <div className="text-[7px] font-serif space-y-1 italic border-b border-black pb-2 mb-2">
                       <p><strong>WANTED:</strong> Prompt Eng. 400LPA.</p>
                       <p><strong>SALE:</strong> Bank Building. BLR.</p>
                    </div>

                    <div className="border-4 border-double border-black p-2 text-center bg-gray-50 flex-grow flex flex-col items-center justify-center mb-2">
                       <h3 className="font-serif font-black text-lg italic uppercase leading-none">IQUE <br/> KINETIC</h3>
                       <div className="mt-2 border border-black px-2 py-1 text-[7px] font-black uppercase bg-black text-white">Join</div>
                    </div>

                    <div className="border border-black p-1 bg-white text-center mt-auto">
                        <p className="text-[6px] font-black uppercase">Verify ID</p>
                        <div className="mt-1 h-3 bg-gray-200 flex items-center justify-center font-mono text-[7px]">****</div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t-2 border-black pt-1 flex justify-between text-[7px] font-black font-serif uppercase tracking-widest">
                  <span>Bengaluru</span>
                  <div className="flex gap-3">
                     <span>Markets</span><span>Tech</span><span>Op-Ed</span>
                  </div>
                  <span>© 2026</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }} 
            className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
          >
             <div className="bg-black text-white p-6 flex flex-col items-center border-2 border-white">
                <Newspaper size={48} className="mb-4 text-[#ef6925]" />
                <p className="font-mono text-xs uppercase tracking-[0.6em]">Scroll to Unfold</p>
                <ChevronDown className="mt-4 animate-bounce" />
             </div>
          </motion.div>
        </div>
      </section>

      <section className="py-40 bg-[#fcfcfc] text-black border-t-[16px] border-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-8xl md:text-[10vw] font-black italic uppercase leading-[0.8] tracking-tighter">
            Pure <br /> <span className="text-[#ef6925]">Monetary</span> <br /> Clarity.
          </h2>
        </div>
      </section>

      {/* SECTION 2: POWER GRID - FEATURES */}
      <section className="py-40 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-32">
            <h2 className="text-8xl md:text-[10vw] font-black italic uppercase leading-[0.8] tracking-tighter">
              Build <br /> <span className="text-[#ef6925]">Wealth</span> <br /> Faster.
            </h2>
            <div className="border-l-8 border-[#ef6925] pl-8">
              <p className="text-2xl font-bold leading-tight uppercase">High-frequency capital management for elite founders and institutional players.</p>
              <button className="mt-8 bg-[#ef6925] text-black px-10 py-5 font-black uppercase italic hover:bg-white transition-all shadow-[10px_10px_0px_#fff]">
                Initialize Protocol <ArrowRight className="inline ml-2" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#ef6925] border-4 border-[#ef6925]">
            <FeatureTile icon={<Zap />} title="Hyper-Sync" desc="Real-time connection to global banking nodes and liquidity pools." />
            <FeatureTile icon={<TrendingUp />} title="Alpha Yield" desc="Optimized return strategies achieving 12.4% annually on average." />
            <FeatureTile icon={<ShieldCheck />} title="Tax Shield" desc="Automated tax-loss harvesting and compliance protection systems." />
          </div>
        </div>
      </section>

      {/* SECTION 3: INDUSTRIAL DASHBOARD */}
      <section className="py-40 bg-[#fcfcfc] text-black border-t-[16px] border-[#ef6925]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-24 border-b-4 border-black pb-10">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter">Command <span className="text-[#ef6925]">Center</span></h2>
            <Terminal className="opacity-20" size={64} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="border-4 border-black p-12 bg-white">
              <Cpu className="mb-6 text-[#ef6925]" size={48} />
              <h3 className="text-4xl font-black italic uppercase mb-4 tracking-tighter">Autonomous Operations</h3>
              <p className="text-lg leading-relaxed mb-6">
                Our AI-driven financial engine monitors 890+ data points simultaneously, executing microsecond-level decisions across global markets.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-[#ef6925] flex-shrink-0 mt-1" size={20} />
                  <span className="font-bold">24/7 market surveillance and anomaly detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-[#ef6925] flex-shrink-0 mt-1" size={20} />
                  <span className="font-bold">Automated rebalancing and risk mitigation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-[#ef6925] flex-shrink-0 mt-1" size={20} />
                  <span className="font-bold">Predictive analytics for market movements</span>
                </li>
              </ul>
            </div>

            <div className="border-4 border-black p-12 bg-black text-white">
              <Activity className="mb-6 text-[#ef6925]" size={48} />
              <h3 className="text-4xl font-black italic uppercase mb-4 tracking-tighter">Live Intelligence</h3>
              <div className="space-y-6">
                <div className="border-b border-white/20 pb-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-mono uppercase tracking-widest opacity-60">Capital Velocity</span>
                    <span className="text-3xl font-black text-[#ef6925]">+47.2%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[47%] bg-[#ef6925]" />
                  </div>
                </div>
                <div className="border-b border-white/20 pb-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-mono uppercase tracking-widest opacity-60">Network Latency</span>
                    <span className="text-3xl font-black text-[#ef6925]">0.002ms</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[98%] bg-[#ef6925]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-mono uppercase tracking-widest opacity-60">Risk Exposure</span>
                    <span className="text-3xl font-black text-green-400">0.12%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[12%] bg-green-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TESTIMONIALS / SOCIAL PROOF */}
      <section className="py-40 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-7xl font-black italic uppercase tracking-tighter text-center mb-20">
            Trusted by <span className="text-[#ef6925]">Builders</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Priya Sharma"
              role="Founder, FinTech Unicorn"
              quote="The platform's AI-driven insights helped us optimize our burn rate and extend our runway by 18 months. Game-changing."
            />
            <TestimonialCard 
              name="Vikram Reddy"
              role="CEO, B2B SaaS"
              quote="We went from manual spreadsheets to automated financial intelligence. The ROI was immediate and measurable."
            />
            <TestimonialCard 
              name="Anjali Mehta"
              role="Managing Partner, VC Fund"
              quote="Every portfolio company now uses this. The transparency and real-time data flow is unprecedented in our industry."
            />
          </div>

          <div className="mt-32 border-t border-white/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-6xl font-black text-[#ef6925] mb-2">890+</div>
              <div className="text-sm font-mono uppercase tracking-widest opacity-60">Active Nodes</div>
            </div>
            <div>
              <div className="text-6xl font-black text-[#ef6925] mb-2">$4.2B</div>
              <div className="text-sm font-mono uppercase tracking-widest opacity-60">Assets Managed</div>
            </div>
            <div>
              <div className="text-6xl font-black text-[#ef6925] mb-2">0.002ms</div>
              <div className="text-sm font-mono uppercase tracking-widest opacity-60">Avg Latency</div>
            </div>
            <div>
              <div className="text-6xl font-black text-[#ef6925] mb-2">247</div>
              <div className="text-sm font-mono uppercase tracking-widest opacity-60">Startups Funded</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="py-60 bg-[#ef6925] text-black text-center">
         <h2 className="text-8xl md:text-[12vw] font-black uppercase italic leading-[0.7] mb-12">
           Access <br /> <span className="text-white">Granted.</span>
         </h2>
         <p className="font-mono text-xs font-bold uppercase tracking-[1em] opacity-40">Ique Ventures Kinetic Division</p>
      </footer>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const FeatureTile = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ backgroundColor: '#ffffff' }}
    className="bg-black p-12 transition-colors cursor-pointer group h-full"
  >
    <div className="mb-8 group-hover:scale-110 transition-transform text-[#ef6925]">{React.cloneElement(icon, { size: 40 })}</div>
    <h3 className="text-3xl font-black italic uppercase mb-2 tracking-tighter text-white group-hover:text-black">{title}</h3>
    <p className="font-bold opacity-60 uppercase text-xs text-white group-hover:text-black">{desc}</p>
  </motion.div>
);

const TestimonialCard = ({ name, role, quote }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="border-2 border-white/10 p-8 hover:border-[#ef6925] transition-all group cursor-pointer bg-[#0c0e10]"
  >
    <div className="mb-6">
      <Users className="text-[#ef6925]" size={32} />
    </div>
    <p className="text-lg italic mb-6 leading-relaxed">"{quote}"</p>
    <div className="border-t border-white/10 pt-4">
      <p className="font-black text-xl">{name}</p>
      <p className="text-sm opacity-60 font-mono uppercase tracking-wide">{role}</p>
    </div>
  </motion.div>
);

export default KineticExecutiveApp;