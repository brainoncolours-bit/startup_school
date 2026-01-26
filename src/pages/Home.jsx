import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Newspaper, ChevronDown, Activity, TrendingUp, Globe, Terminal, BarChart3, PieChart } from 'lucide-react';

const KineticExecutiveApp = () => {
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
    </div>
  );
};

export default KineticExecutiveApp;