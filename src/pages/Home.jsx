import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Newspaper, ChevronDown, Activity, TrendingUp, Terminal, Zap, ShieldCheck, Cpu, ArrowRight, CheckCircle, Users, Play } from 'lucide-react';

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
            className="absolute inset-0 z-0 flex flex-col md:flex-row bg-[#f2e8d5] text-black overflow-hidden"
          >
             {/* Vintage Paper Texture (Center Spread Vibe) */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-60 mix-blend-multiply pointer-events-none" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(160,82,45,0.08)_100%)] pointer-events-none mix-blend-multiply" />
             <div className="absolute inset-0 bg-[#f2e8d5] opacity-20 mix-blend-color-burn pointer-events-none" />
             
             {/* Background Marquee Watermark */}
             <div className="absolute top-20 left-0 flex whitespace-nowrap opacity-[0.03] pointer-events-none select-none mix-blend-color-burn">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[20vh] font-black mr-20 text-black">STARTUP_SCHOOL // IQUE // DOJO //</span>
                ))}
             </div>

            {/* LEFT HALF: VIDEO (Printed Look) */}
            <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8 md:p-12 relative z-10 border-b md:border-b-0 md:border-r border-black/20">
               <div className="relative w-full aspect-video bg-black border-4 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.2)] overflow-hidden group grayscale-[0.2] sepia-[0.1]">
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 transition-all duration-500 bg-black/10 group-hover:bg-transparent cursor-pointer">
                        <div className="w-20 h-20 bg-[#ef6925] flex items-center justify-center border-2 border-black group-hover:bg-black group-hover:text-[#ef6925] transition-all duration-300 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                            <Play size={32} className="ml-1 fill-current text-black group-hover:text-[#ef6925]" />
                        </div>
                    </div>
                    {/* Video Placeholder */}
                    <div className="w-full h-full flex items-center justify-center text-white/50 text-xs font-mono bg-black/90">
                         <p className="tracking-widest uppercase">Video_Feed_Offline</p>
                    </div>
               </div>
               <p className="absolute bottom-6 left-12 font-mono text-[9px] uppercase tracking-widest opacity-60">Fig 1.1: The Simulation</p>
            </div>

            {/* RIGHT HALF: HEADING (Typography on Paper) */}
            <div className="w-full md:w-1/2 h-full flex flex-col items-start justify-center p-8 md:p-16 relative z-10">
               <div className="flex items-center gap-3 mb-6 bg-black/5 px-4 py-1 border border-black/10 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#ef6925] animate-pulse"></span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-black/70">Live Transmission</span>
               </div>
               <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.8] tracking-tighter mb-6 text-[#1a1a1a] drop-shadow-none">
                Pure <br /> <span className="text-[#ef6925] mix-blend-multiply">Monetary</span> <br /> Clarity.
              </h2>
               <p className="font-serif text-black/80 font-medium text-lg max-w-md leading-relaxed border-l-4 border-[#ef6925] pl-4 italic">
                  "Join the simulation. Build the future. The dojo awaits."
               </p>
            </div>
          </motion.div>

          <div className="relative w-full h-full flex z-20 pointer-events-none">
            
            {/* LEFT PAGE: WORLD NEWS & INTENSE MARKET DATA */}
            <motion.div 
              style={{ rotateY: leftFold, originX: 0 }} 
              className="w-1/2 h-full bg-[#f2e8d5] border-r border-black/10 flex relative shadow-[5px_5px_15px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              {/* Vintage Paper Texture & Aging Gradients */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-60 mix-blend-multiply" />
              <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(160,82,45,0.08)_100%)] mix-blend-multiply" />
              <div className="absolute inset-y-0 right-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-black/10 to-transparent" /> {/* Spine Shadow */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-[#f2e8d5] opacity-20 mix-blend-color-burn" /> {/* Warmth */}

              <div className="relative w-full p-6 md:p-8 text-black flex flex-col grayscale-[0.1] sepia-[0.15]">
                <div className="border-b-[3px] border-black pb-1 mb-3">
                  <div className="flex justify-between text-[7px] font-serif font-black uppercase mb-1 tracking-tighter">
                    <span>Vol. XCII...No. 402</span>
                    <span>Tuesday, January 27, 2026</span>
                    <span>Global Executive Edition</span>
                    <span>₹25.00</span>
                  </div>
                  <h1 className="font-serif text-6xl font-black tracking-tighter uppercase italic text-center border-y-4 border-double border-black py-1">
                    The Founder's Gazette
                  </h1>
                </div>

                <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden">
                  {/* LEFT MARGIN: INDEX & COMMODITIES */}
                  <div className="col-span-3 border-r border-black/20 pr-2 text-[8px] font-serif">
                    <div className="bg-black text-white p-1 text-center font-bold mb-2 uppercase tracking-tighter text-[9px]">Market Pulse</div>
                    {[
                      {l:'SENSEX', v:'+74,210', c:'text-green-700'},
                      {l:'NASDAQ', v:'-1.2%', c:'text-red-700'},
                      {l:'BTC/USD', v:'$98,402', c:'text-green-700'},
                      {l:'GOLD', v:'$2,140', c:'text-black'},
                      {l:'10Y BOND', v:'4.12%', c:'text-black'}
                    ].map((t, i) => (
                      <div key={i} className="border-b border-black/10 py-1 font-mono text-[7px] flex justify-between">
                        <span>{t.l}</span><span className={t.c}>{t.v}</span>
                      </div>
                    ))}
                    
                    <h3 className="font-black mt-4 mb-1 border-b border-black text-[9px] uppercase">Tech Movers</h3>
                    <div className="space-y-1 mt-2">
                        <p className="text-[7px] leading-none"><strong>NVDA:</strong> +4.2% AI Demand</p>
                        <p className="text-[7px] leading-none"><strong>TSLA:</strong> -2.1% Margin Compression</p>
                        <p className="text-[7px] leading-none"><strong>AAPL:</strong> +0.8% Vision Pro 3</p>
                    </div>

                    <div className="mt-4 p-2 bg-black/5 border border-black/10">
                        <h4 className="font-black text-[8px] uppercase mb-1">IPO Watch</h4>
                        <p className="text-[7px] font-bold">Ique Kinetic: $12B</p>
                        <p className="text-[7px]">Scheduled Q3 2026</p>
                    </div>

                    <div className="mt-4 border-t-2 border-black pt-2">
                        <h4 className="font-black text-[8px] uppercase mb-1">Commodities</h4>
                        <div className="grid grid-cols-2 gap-1 text-[7px] font-mono leading-none">
                            <span>Lithium</span><span className="text-right text-green-700">+8.2%</span>
                            <span>Cobalt</span><span className="text-right text-red-700">-1.4%</span>
                            <span>Silicon</span><span className="text-right text-green-700">+3.1%</span>
                            <span>Copper</span><span className="text-right text-green-700">+0.5%</span>
                        </div>
                    </div>

                    <div className="mt-4 border-t border-black pt-2">
                        <h4 className="font-black text-[8px] uppercase mb-1">Forex</h4>
                         <div className="space-y-1 text-[7px] font-mono">
                            <div className="flex justify-between"><span>USD/INR</span><span>83.10</span></div>
                            <div className="flex justify-between"><span>EUR/USD</span><span>1.08</span></div>
                            <div className="flex justify-between"><span>GBP/USD</span><span>1.27</span></div>
                            <div className="flex justify-between"><span>JPY/USD</span><span>148.2</span></div>
                        </div>
                    </div>
                    
                    <div className="mt-4 border-t border-black pt-2 bg-gray-100 p-1">
                       <h4 className="font-black text-[8px] uppercase text-center">Ad: Cloud 2.0</h4>
                       <p className="text-[6px] text-center italic">Deploy in 30s. 99.999% Uptime. Global CDN.</p>
                    </div>

                    <div className="mt-4 border-t border-black pt-2">
                        <h4 className="font-black text-[8px] uppercase mb-1">Top Movers</h4>
                         <div className="space-y-[2px] text-[7px] font-mono leading-none">
                            <div className="flex justify-between"><span>NVDA</span><span className="text-green-700">+4.2%</span></div>
                            <div className="flex justify-between"><span>TSLA</span><span className="text-red-700">-2.1%</span></div>
                            <div className="flex justify-between"><span>AMD</span><span className="text-green-700">+1.8%</span></div>
                            <div className="flex justify-between"><span>PLTR</span><span className="text-green-700">+5.5%</span></div>
                            <div className="flex justify-between"><span>MSFT</span><span className="text-gray-500">0.0%</span></div>
                        </div>
                    </div>

                    <div className="mt-4 border-t border-black pt-2">
                        <h4 className="font-black text-[8px] uppercase mb-1">Crypto Indices</h4>
                         <div className="space-y-[2px] text-[7px] font-mono leading-none">
                            <div className="flex justify-between"><span>BTC</span><span className="font-bold">64,230</span></div>
                            <div className="flex justify-between"><span>ETH</span><span className="font-bold">4,120</span></div>
                            <div className="flex justify-between"><span>SOL</span><span className="font-bold">145</span></div>
                            <div className="flex justify-between"><span>DOT</span><span className="font-bold">12.4</span></div>
                        </div>
                    </div>

                    <div className="mt-4 border-t border-black pt-2">
                        <h4 className="font-black text-[8px] uppercase mb-1">Energy Futures</h4>
                         <div className="space-y-[2px] text-[7px] font-mono leading-none">
                            <div className="flex justify-between"><span>Crude</span><span className="text-red-700">-0.4%</span></div>
                            <div className="flex justify-between"><span>Nat Gas</span><span className="text-green-700">+1.2%</span></div>
                            <div className="flex justify-between"><span>Nuclear</span><span className="text-green-700">+5.0%</span></div>
                            <div className="flex justify-between"><span>Solar</span><span className="text-gray-500">0.0%</span></div>
                        </div>
                    </div>

                    <div className="mt-4 border-t border-black pt-2 bg-[#ef6925]/5 p-1">
                        <h4 className="font-black text-[8px] uppercase mb-1 text-[#ef6925]">System Alert</h4>
                        <p className="text-[6px] leading-tight font-bold">Mainnet congestion detected. Gas fees elevated. Routing via L2 Optimism.</p>
                    </div>

                    <div className="mt-4 border-t border-black pt-2">
                        <h4 className="font-black text-[8px] uppercase mb-1">Shipping Routes</h4>
                        <div className="space-y-[1px] text-[7px] font-mono leading-none">
                            <div className="flex justify-between"><span>Suez</span><span className="text-green-700">Open</span></div>
                            <div className="flex justify-between"><span>Panama</span><span className="text-yellow-600">Restricted</span></div>
                            <div className="flex justify-between"><span>Malacca</span><span className="text-green-700">Open</span></div>
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col justify-end mt-2 pt-2 border-t border-black text-[#555]">
                        <p className="text-[5px] text-center italic leading-tight">Data provided by terminal 88.X-9. Latency &lt; 2ms. Authorized personnel only.</p>
                    </div>

                    <div className="mt-2 border-t border-black pt-2">
                       <h4 className="font-black text-[8px] uppercase mb-1">Industrial Output</h4>
                       <div className="grid grid-cols-2 gap-1 text-[7px] font-mono leading-none mb-2">
                           <span>Steel</span><span className="text-right">14.2MT</span>
                           <span>Graphene</span><span className="text-right">0.8MT</span>
                           <span>H3 Fuel</span><span className="text-right">400kL</span>
                           <span>Plastics</span><span className="text-right text-red-600">-5.0%</span>
                       </div>
                       
                       <h4 className="font-black text-[8px] uppercase mb-1">Weather & Logistics</h4>
                       <p className="text-[7px]">SHANGHAI: Heavy Fog (Port Delay)</p>
                       <p className="text-[7px]">ROTTERDAM: Clear (Normal Ops)</p>
                       <p className="text-[7px]">SINGAPORE: Storm (Delay +2h)</p>
                       <p className="text-[7px]">NEW YORK: Clear</p>
                       <p className="text-[7px]">MUMBAI: Monsoon (Slow)</p>
                    </div>
                  </div>

                  {/* CENTER MAIN: HEADLINE & ANALYSIS */}
                  <div className="col-span-9 flex flex-col">
                    <h2 className="font-serif text-5xl font-black leading-[0.85] uppercase mb-2">Startup School: The Founder's Dojo for Building Scalable Ventures</h2>
                    <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden">
                      <div className="flex flex-col">
                        <p className="font-serif text-[10px] leading-tight text-justify first-letter:text-4xl first-letter:font-black first-letter:mr-1 first-letter:float-left mb-2">
                          Startup School by IQue Ventures is a transformative 90-day entrepreneurial program designed for aspiring founders, CEOs, and future business leaders who want to turn ideas into scalable ventures. We are fundamentally different: We’re not an MBA program, and we’re not a theory classroom.
                        </p>
                        <p className="font-serif text-[10px] leading-tight text-justify mb-2 indent-4">
                          We are a dojo for founders, a hands-on space where you learn, build, fail fast, and rise stronger.
                        </p>
                        <div className="border-t-2 border-black pt-2">
                           <h4 className="font-serif font-black text-xs uppercase mb-1">Execution Over Theory</h4>
                           <p className="font-serif text-[9px] leading-tight text-justify mb-2">Our focus is on the founder, your mindset, your leadership, and your ability to execute in the real world.</p>
                           <p className="font-serif text-[9px] leading-tight text-justify">At Startup School, we prepare you for the real world of startups, the grind, the chaos, and the breakthroughs that follow.</p>
                        </div>
                        <div className="mt-3 bg-[#ef6925]/10 p-2 border-l-4 border-[#ef6925]">
                            <h5 className="text-[9px] font-black uppercase italic">The Mission:</h5>
                            <p className="text-[8px] leading-tight font-serif italic">"We don't teach business history. We help you write the future."</p>
                            <p className="text-[8px] leading-tight font-serif italic mt-1">"Fail fast, rise stronger, and build something that matters."</p>
                        </div>
                        
                         <div className="mt-3 border-t-2 border-black pt-2">
                             <div className="flex justify-between items-end mb-1">
                                <h4 className="font-serif font-black text-xs uppercase">Market Depth</h4>
                                <span className="text-[7px] font-mono">X: VOL / Y: PRICE</span>
                             </div>
                             <div className="h-16 flex items-end gap-[1px] border-b border-black">
                                {Array.from({length: 30}).map((_, i) => (
                                    <div key={i} className={`flex-1 ${i > 15 ? 'bg-green-600' : 'bg-red-600'}`} style={{height: `${Math.random() * 80 + 20}%`}}></div>
                                ))}
                             </div>
                             <div className="flex justify-between text-[6px] font-mono mt-1">
                                <span>BID: $42,102</span>
                                <span>ASK: $42,105</span>
                             </div>
                        </div>

                        <div className="mt-3 border-t-2 border-black pt-2">
                            <h4 className="font-serif font-black text-xs uppercase mb-1">Dark Pool Volume</h4>
                            <div className="flex justify-between items-end text-[7px] font-mono border-b border-black/20 pb-1 mb-1">
                                <span>Block 7382A</span>
                                <span className="font-bold">2,400 BTC</span>
                            </div>
                            <div className="flex justify-between items-end text-[7px] font-mono border-b border-black/20 pb-1 mb-1">
                                <span>Block 9921X</span>
                                <span className="font-bold">12,000 ETH</span>
                            </div>
                            <p className="font-serif text-[8px] leading-tight italic">"Institutional accumulation detected in off-chain ledgers."</p>
                        </div>

                        <div className="mt-3 border-t-2 border-black pt-2">
                            <h4 className="font-serif font-black text-xs uppercase mb-1">Sector Heatmap</h4>
                            <div className="grid grid-cols-3 gap-1 mb-1">
                                <div className="bg-black text-white p-1 text-center font-bold text-[7px]">AI: 45%</div>
                                <div className="border border-black p-1 text-center font-bold text-[7px]">SaaS: 20%</div>
                                <div className="border border-black p-1 text-center font-bold text-[7px]">Web3: 15%</div>
                            </div>
                             <div className="grid grid-cols-3 gap-1">
                                <div className="border border-black p-1 text-center font-bold text-[7px]">Bio: 10%</div>
                                <div className="border border-black p-1 text-center font-bold text-[7px]">Hard: 5%</div>
                                <div className="border border-black p-1 text-center font-bold text-[7px]">Other: 5%</div>
                            </div>
                            <p className="font-serif text-[8px] leading-tight italic mt-1 font-bold">"Capital flows where innovation grows."</p>
                        </div>

                        <div className="mt-3 pt-2 border-t-2 border-black flex-grow flex flex-col justify-end">
                            <h4 className="font-serif font-black text-xs uppercase mb-1">The Algorithm's Eye</h4>
                            <p className="font-serif text-[9px] leading-tight text-justify mb-2">Predictive models are now outperforming human analysts by a factor of 1000x. The "gut feeling" of the veteran trader is being replaced by the cold probability of the neural net.</p>
                            <div className="bg-black text-white p-2 text-[8px] font-mono leading-none">
                                <p>SYS.STATUS: OPTIMAL</p>
                                <p>UPTIME: 99.9999%</p>
                                <p>NEXT_BLOCK: 12ms</p>
                            </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="border border-black p-1 bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" className="grayscale contrast-125 mix-blend-multiply h-32 w-full object-cover" />
                          <p className="text-[6px] font-bold italic mt-1">The New Financial District: Autonomous zones rising in the Global South.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                            <div className="border-t border-black pt-1">
                                <h4 className="font-black text-[8px] uppercase">Yield Curves</h4>
                                <div className="h-12 w-full flex items-end gap-[1px]">
                                    {[20,40,30,60,80,45,90,100,70].map((h, i) => (
                                        <div key={i} className="bg-black flex-1" style={{height: `${h}%`}} />
                                    ))}
                                </div>
                            </div>
                            <div className="border-t border-black pt-1">
                                <h4 className="font-black text-[8px] uppercase">Risk Metrics</h4>
                                <div className="h-12 w-full flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border-4 border-black border-t-transparent animate-spin-slow" />
                                </div>
                            </div>
                        </div>

                         <div className="mt-2 border-t-2 border-black pt-2">
                            <h4 className="font-serif font-black text-[9px] uppercase mb-1">Market Sentiment</h4>
                            <div className="flex gap-1">
                                <div className="flex-1 bg-gray-100 p-1 text-[6px] text-center font-bold uppercase border border-black/10">Bulls: 62%</div>
                                <div className="flex-1 bg-gray-100 p-1 text-[6px] text-center font-bold uppercase border border-black/10">Bears: 38%</div>
                            </div>
                            <p className="font-serif text-[8px] leading-tight text-justify mt-1 italic">"The algorithms are optimistic, even if the humans aren't." - Dr. K. Vance</p>
                        </div>
                         
                         <div className="mt-2 border-t border-black pt-2">
                             <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                                <h4 className="font-black text-[8px] uppercase">Live Feed</h4>
                             </div>
                             <ul className="text-[6px] font-mono list-disc list-inside h-24 overflow-hidden">
                                <li>09:41:22 - Node 421 online.</li>
                                <li>09:41:18 - Liquidity injected ($4M).</li>
                                <li>09:41:05 - Whale Alert: 500 BTC moved.</li>
                                <li>09:40:55 - HFT Algorithm triggered.</li>
                                <li>09:40:32 - Shanghai Opening Bell.</li>
                                <li>09:40:10 - Oil Futures stabilize.</li>
                                <li>09:39:55 - System latency: 4ms.</li>
                                <li>09:39:21 - New user registration (Geneva).</li>
                                <li>09:39:05 - Smart Contract deployed.</li>
                                <li>09:38:44 - API rate limit increased.</li>
                             </ul>
                         </div>

                         <div className="mt-2 border-t border-black pt-2 flex-grow flex flex-col">
                            <h4 className="font-serif font-black text-[9px] uppercase mb-1">Geopolitical Heatmap</h4>
                            <div className="flex-grow bg-gray-100 border border-black/10 p-1 grid grid-cols-6 grid-rows-4 gap-[1px]">
                                {Array.from({length: 24}).map((_, i) => (
                                    <div key={i} className={`opacity-${Math.floor(Math.random() * 80) + 20} bg-${Math.random() > 0.7 ? 'red-500' : 'black'}`}></div>
                                ))}
                            </div>
                            <p className="text-[6px] text-right mt-1 italic">Source: Kinetic Intel</p>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* RIGHT PAGE: BUSINESS, ANALYTICS & CLASSIFIEDS */}
            <motion.div 
              style={{ rotateY: rightFold, originX: 1 }} 
              className="w-1/2 h-full bg-[#f2e8d5] border-l border-black/10 flex relative shadow-[5px_5px_15px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              {/* Vintage Paper Texture & Aging Gradients */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-60 mix-blend-multiply" />
              <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(160,82,45,0.08)_100%)] mix-blend-multiply" />
              <div className="absolute inset-y-0 left-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-black/10 to-transparent" /> {/* Spine Shadow */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-[#f2e8d5] opacity-20 mix-blend-color-burn" /> {/* Warmth */}
              
              <div className="relative w-full p-6 md:p-8 text-black flex flex-col grayscale-[0.1] sepia-[0.15]">
                <div className="border-b-2 border-black flex justify-between items-end mb-3 pb-1">
                  <h3 className="font-serif font-black text-xl uppercase italic">Business & Innovation</h3>
                  <span className="font-serif text-[9px] font-black tracking-tighter uppercase">SECTION B // PAGE 12-24</span>
                </div>

                <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden">
                  <div className="col-span-8 flex flex-col">
                    <div className="columns-2 gap-3 border-b border-black/20 pb-3 mb-3">
                       <h4 className="font-serif font-black text-xs uppercase leading-none mb-1">Protocol Governance</h4>
                       <p className="font-serif text-[8px] leading-tight text-justify mb-2">Automated smart contracts now handle 40% of seed deployments, reducing legal overhead by 90%. "It's the clean slate we've been waiting for," says CIO of Apex Ventures. The shift allows founders to close rounds in hours, not weeks.</p>
                       
                       <h4 className="font-serif font-black text-xs uppercase leading-none mb-1">Cloud Arbitrage</h4>
                       <p className="font-serif text-[8px] leading-tight text-justify mb-2">Energy-efficient compute clusters in the Nordic region see 15% surge in investment as heat-recycling becomes mandatory for data centers over 10MW. Iceland is positioning itself as the 'Battery of the AI World'.</p>

                       <h4 className="font-serif font-black text-xs uppercase leading-none mb-1">Orbital Manufacturing</h4>
                       <p className="font-serif text-[8px] leading-tight text-justify mb-2">SpaceX Starship program enables sub-hour delivery for high-value biological payloads. "Zero-G manufacturing is the next trillion dollar vertical."</p>

                       <h4 className="font-serif font-black text-xs uppercase leading-none mb-1">Talent Wars</h4>
                       <p className="font-serif text-[8px] leading-tight text-justify mb-2">Neuralink engineers are demanding equity packages rivaling CEO compensation. Top-tier AI researchers are now trading like professional athletes, with signing bonuses exceeding $5M.</p>

                       <h4 className="font-serif font-black text-xs uppercase leading-none mb-1">Quantum Supremacy Claims</h4>
                       <p className="font-serif text-[8px] leading-tight text-justify mb-2">IBM and Google dispute the latest benchmarks from Shenzen-based labs. The race for 10,000 logical qubits heats up as encryption standards face obsolescence.</p>

                       <h4 className="font-serif font-black text-xs uppercase leading-none mb-1">Sovereign Wealth Shift</h4>
                       <p className="font-serif text-[8px] leading-tight text-justify">Middle Eastern funds are aggressively diversifying into bio-synthetic agriculture. "$500B committed to food security," reports The Kinetic Journal.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                       <div className="border border-black p-2 bg-white/60">
                          <h5 className="font-serif font-black text-[9px] uppercase mb-1 underline">Innovation Pipeline</h5>
                          <ul className="font-serif text-[7px] space-y-1 font-bold">
                             <li>• Quantum Key Distribution: Stable</li>
                             <li>• Biotech Cluster: Pune Expansion</li>
                             <li>• Low-Orbit Logistics: Active</li>
                             <li>• Neural Lace: Phase 3 Trials</li>
                             <li>• Solid State Battery: Mass Prod</li>
                             <li>• Fusion Reactor: Net Gain</li>
                          </ul>
                       </div>
                       <div className="bg-black text-white p-2 text-center flex flex-col justify-center">
                          <p className="font-serif font-black text-sm italic uppercase leading-none tracking-tighter">"Precision over Luck."</p>
                          <p className="text-[6px] uppercase tracking-widest mt-1">The Founder's Mantra</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3 border-b border-black/20 pb-2">
                        <div>
                             <h4 className="font-serif font-black text-xs uppercase leading-none mb-1">M&A Rumors</h4>
                             <p className="font-serif text-[8px] leading-tight text-justify">Sources close to OpenAI suggest a hostile takeover of a major chip fabricator in Taiwan.</p>
                        </div>
                         <div>
                             <h4 className="font-serif font-black text-xs uppercase leading-none mb-1">Regulatory Watch</h4>
                             <p className="font-serif text-[8px] leading-tight text-justify">SEC Chair declines comment on "DAOs as sovereign entities" bill.</p>
                        </div>
                    </div>
                    
                    <div className="border-b border-black/20 pb-2 mb-2">
                         <h4 className="font-serif font-black text-xs uppercase leading-none mb-1">Recent Patent Filings</h4>
                         <p className="font-serif text-[8px] leading-tight text-justify">
                            <span className="font-bold">US-2026-8891:</span> "Autonomous Liquidity Provision via Generative Agents." 
                            <span className="font-bold mx-1">/</span> 
                            <span className="font-bold">EU-9921-X:</span> "Zero-Knowledge Proofs for Corporate Governance."
                         </p>
                    </div>

                    <div className="flex-1 border-t border-black pt-2 flex flex-col overflow-hidden">
                       <h4 className="font-serif font-black text-[10px] uppercase mb-1 border-b border-black pb-1">Executive Dashboard</h4>
                       <div className="grid grid-cols-3 gap-2 mb-2">
                          {[{l: 'YIELD', v: '12.4%'},{l: 'LATENCY', v: '0.00ms'},{l: 'NODES', v: '890+'}].map(x => (
                             <div key={x.l} className="border border-black p-1 text-center bg-white/30">
                                <p className="font-mono text-[8px] font-black">{x.v}</p>
                                <p className="text-[5px] uppercase font-bold">{x.l}</p>
                             </div>
                          ))}
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4 mb-2">
                          <div>
                            <h4 className="font-serif font-black text-[9px] uppercase mb-1">Corporate Ledger</h4>
                            <div className="text-[7px] font-mono leading-[1.1] opacity-80">
                                <p>• DIVIDEND: 4.2% PER UNIT.</p>
                                <p>• ACQ: NODE-7 COMPLETE.</p>
                                <p>• DEBT: 0.00 (TOTAL).</p>
                                <p>• BURN RATE: -12% (MOM).</p>
                            </div>
                          </div>
                          <div className="bg-white border border-black p-1">
                             <h4 className="font-serif font-black text-[7px] uppercase mb-1 text-center">Global Reach</h4>
                             <div className="flex flex-wrap gap-1 justify-center">
                                {['NYC','LDN','BLR','SGP','DXB','TYO','HKG','ZRH'].map(city => (
                                    <span key={city} className="bg-black text-white px-1 text-[5px] font-bold">{city}</span>
                                ))}
                             </div>
                          </div>
                       </div>

                       <div className="mb-2 border-t border-black pt-1">
                          <h4 className="font-serif font-black text-[8px] uppercase mb-1">Sector Volatility</h4>
                          <div className="h-6 flex items-end gap-[2px]">
                             {[40, 65, 30, 80, 50, 90, 20, 45, 70, 60, 35, 85].map((h, i) => (
                                <div key={i} className="bg-black flex-1" style={{height: `${h}%`}}></div>
                             ))}
                          </div>
                       </div>

                       <div className="mb-2 border-t border-black pt-1 grid grid-cols-2 gap-2">
                           <div>
                                <h4 className="font-serif font-black text-[8px] uppercase mb-1">Server Load</h4>
                                <div className="space-y-[1px]">
                                    <div className="h-1 w-full bg-gray-200"><div className="h-full bg-black w-[90%]"></div></div>
                                    <div className="h-1 w-full bg-gray-200"><div className="h-full bg-black w-[45%]"></div></div>
                                    <div className="h-1 w-full bg-gray-200"><div className="h-full bg-black w-[75%]"></div></div>
                                </div>
                           </div>
                           <div>
                                <h4 className="font-serif font-black text-[8px] uppercase mb-1">Active Clusters</h4>
                                <div className="grid grid-cols-4 gap-[1px]">
                                    {Array.from({length: 12}).map((_,i) => (
                                        <div key={i} className={`h-2 w-full ${i % 3 === 0 ? 'bg-black' : 'bg-gray-300'}`}></div>
                                    ))}
                                </div>
                           </div>
                       </div>

                       {/* SUDOKU SECTION */}
                       <div className="mt-2 border-t-2 border-black pt-2 pb-1 bg-black/5 p-2">
                          <div className="flex justify-between items-center mb-1">
                             <h4 className="font-serif font-black text-[10px] uppercase italic">Executive Sudoku</h4>
                             <span className="text-[6px] font-black uppercase tracking-tighter">Level: Sovereign</span>
                          </div>
                          <div className="grid grid-cols-9 border-2 border-black bg-white w-full max-w-[180px] mx-auto mb-1">
                            {Array.from({length: 81}).map((_, i) => {
                                const row = Math.floor(i / 9);
                                const col = i % 9;
                                const isThickRight = (col + 1) % 3 === 0 && col !== 8;
                                const isThickBottom = (row + 1) % 3 === 0 && row !== 8;
                                const fixedNumbers = { 2: '5', 13: '1', 25: '9', 30: '4', 40: '2', 55: '7', 72: '8', 80: '3' };
                                return (
                                  <div key={i} className={`h-4 flex items-center justify-center text-[8px] font-mono font-bold border-[0.5px] border-black/30 ${isThickRight ? 'border-r-2 border-r-black' : ''} ${isThickBottom ? 'border-b-2 border-b-black' : ''}`}>
                                    {fixedNumbers[i] || ''}
                                  </div>
                                );
                            })}
                          </div>
                          <p className="text-[5px] text-center font-mono uppercase opacity-60">Complete for private key access.</p>
                       </div>
                       
                       <div className="mt-2 border-t border-black pt-2 flex-grow flex flex-col justify-end">
                            <h4 className="font-serif font-black text-[8px] uppercase mb-1">Network Topology</h4>
                            <div className="border border-black p-1 h-32 relative bg-gray-50 overflow-hidden">
                                {Array.from({length: 8}).map((_, i) => (
                                    <div key={i} className="absolute w-[1px] bg-black/20 h-full" style={{left: `${(i+1)*12}%`}}></div>
                                ))}
                                {Array.from({length: 8}).map((_, i) => (
                                    <div key={i} className="absolute h-[1px] bg-black/20 w-full" style={{top: `${(i+1)*12}%`}}></div>
                                ))}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white z-10">
                                    <span className="text-[6px] font-black">CORE</span>
                                </div>
                                <div className="absolute top-4 left-4 w-4 h-4 bg-black rounded-full"></div>
                                <div className="absolute bottom-6 right-8 w-6 h-6 border border-black bg-white rotate-45"></div>
                            </div>
                       </div>
                    </div>
                  </div>

                  {/* RIGHT MARGIN: CLASSIFIED & ADVERTS */}
                  <div className="col-span-4 border-l border-black/20 pl-3 flex flex-col overflow-hidden">
                    <div className="bg-black text-white p-1 text-center font-bold text-[8px] uppercase mb-2 tracking-widest">Classifieds</div>
                    <div className="text-[7px] font-serif space-y-2 italic border-b border-black pb-2 mb-2">
                       <div>
                            <p className="font-bold uppercase text-[6px]">Wanted:</p>
                            <p>Prompt Architect. L7. 400LPA + Equity. Zero-latency req. Contact: hr@anthropic.ai</p>
                       </div>
                       <div>
                            <p className="font-bold uppercase text-[6px]">For Sale:</p>
                            <p>Private Sub-orbital Hub. 4 Slotted Launchpads. BLR North. $42M OBO.</p>
                       </div>
                       <div>
                            <p className="font-bold uppercase text-[6px]">Notice:</p>
                            <p>Mandatory Protocol Upgrade v4.2 active at midnight. All nodes must sync.</p>
                       </div>
                       <div>
                            <p className="font-bold uppercase text-[6px]">Investor Relations:</p>
                            <p>Looking for Series B lead. Deep Tech / Bio-Synth. Strong traction. ARR $4M.</p>
                       </div>
                        <div>
                            <p className="font-bold uppercase text-[6px]">Lost & Found:</p>
                            <p>Cold Storage Ledger (Nano S). Lost near CyberHub. Reward: 1 BTC. No questions asked.</p>
                       </div>
                       <div>
                            <p className="font-bold uppercase text-[6px]">Real Estate:</p>
                            <p>Server Farm, Iceland. Geothermal powered. 99yr Lease. Ready for H100 deployment.</p>
                       </div>
                       <div>
                            <p className="font-bold uppercase text-[6px]">Services:</p>
                            <p>Smart Contract Auditing. AI-Driven. 24h Turnaround. 100% Coverage Guarantee.</p>
                       </div>
                       <div>
                            <p className="font-bold uppercase text-[6px]">Event:</p>
                            <p>Founder's Circle. Friday @ The Ritz. Invite Only. Keynote: "Post-Scarcity Economics".</p>
                       </div>
                       <div>
                            <p className="font-bold uppercase text-[6px]">Auction:</p>
                            <p>Vintage 2020 GPUs. Mint condition. Bulk lot only. Starting bid: 5 ETH.</p>
                       </div>
                       <div>
                            <p className="font-bold uppercase text-[6px]">Legal:</p>
                            <p>Class Action: Synthetics vs. Naturals. Filing deadline extended to Q3.</p>
                       </div>
                        <div>
                            <p className="font-bold uppercase text-[6px]">To Let:</p>
                            <p>Co-working pods. Faradays shielded. 10Gbps uplink. Soho District.</p>
                       </div>
                       <div>
                            <p className="font-bold uppercase text-[6px]">Partner:</p>
                            <p>Seeking EU banking partner for DeFi gateway. Licenced entities only. Min cap $500M.</p>
                       </div>
                         <div>
                            <p className="font-bold uppercase text-[6px]">Hardware:</p>
                            <p>Liquid cooling rigs. Custom build. 500kW heat dissipation. Tokyo shipping available.</p>
                       </div>
                        <div>
                            <p className="font-bold uppercase text-[6px]">Consulting:</p>
                            <p>Tokenomics structuring. Whitepaper review. 50 ETH flat fee. NDA Required.</p>
                       </div>
                        <div className="pt-2 border-t border-black border-dashed mt-2">
                            <p className="font-bold uppercase text-[6px] text-center">--- END OF SECTION B ---</p>
                            <p className="text-[5px] text-center italic mt-1 font-serif">"The future is already here, it's just not evenly distributed." - Gibson</p>
                       </div>
                    </div>

                    <div className="border-4 border-double border-black p-3 text-center bg-gray-50 mb-2">
                       <h3 className="font-serif font-black text-2xl italic uppercase leading-[0.8] mb-1">IQUE <br/> KINETIC</h3>
                       <p className="text-[6px] font-bold uppercase mb-2">The Only Way to Build.</p>
                       <p className="text-[5px] italic mb-2 leading-tight px-2">Join 12,000+ founders building the next generation of sovereign entities.</p>
                       <div className="border-2 border-black px-4 py-1 text-[8px] font-black uppercase bg-black text-white hover:bg-white hover:text-black transition-colors cursor-none pointer-events-auto">Join</div>
                    </div>

                    <div className="border border-black p-1 bg-white mb-2">
                        <h4 className="font-black text-[7px] uppercase mb-1 text-center">Upcoming ICOs</h4>
                         <div className="space-y-[2px] text-[6px] font-mono leading-none">
                            <div className="flex justify-between"><span>NEXUS</span><span className="text-green-700">12 Feb</span></div>
                            <div className="flex justify-between"><span>VOID</span><span className="text-gray-500">Pending</span></div>
                            <div className="flex justify-between"><span>AERO</span><span className="text-green-700">01 Mar</span></div>
                             <div className="flex justify-between"><span>SYNTH</span><span className="text-green-700">15 Apr</span></div>
                        </div>
                    </div>

                    <div className="border border-black p-1 bg-white mb-2">
                        <h4 className="font-black text-[7px] uppercase mb-1 text-center">Validator Status</h4>
                         <div className="grid grid-cols-2 gap-1 text-[6px] font-mono leading-none">
                            <div className="text-center p-[2px] bg-green-100 border border-green-300 rounded">
                                <span className="block font-bold">Uptime</span>
                                <span>99.9%</span>
                            </div>
                            <div className="text-center p-[2px] bg-blue-100 border border-blue-300 rounded">
                                <span className="block font-bold">Latency</span>
                                <span>12ms</span>
                            </div>
                        </div>
                         <p className="text-[5px] text-center mt-1 text-gray-400">Node ID: #88X-9</p>
                    </div>

                    <div className="border border-black p-1 bg-white mb-2">
                        <h4 className="font-black text-[7px] uppercase mb-1 text-center">Protocol Fees</h4>
                        <div className="flex justify-between items-center text-[6px] font-mono border-b border-gray-200 pb-[2px] mb-[2px]">
                            <span>Base Fee</span>
                            <span>12 Gwei</span>
                        </div>
                        <div className="flex justify-between items-center text-[6px] font-mono border-b border-gray-200 pb-[2px] mb-[2px]">
                            <span>Prio Fee</span>
                            <span>2 Gwei</span>
                        </div>
                        <div className="flex justify-between items-center text-[6px] font-mono">
                            <span className="font-bold">Total Burn</span>
                            <span className="text-red-500 font-bold">4.2 ETH</span>
                        </div>
                    </div>

                    <div className="border border-black p-1 bg-white text-center mt-auto">
                        <p className="text-[6px] font-black uppercase">Identity Verified</p>
                        <div className="mt-1 h-4 bg-gray-200 flex items-center justify-center font-mono text-[8px] tracking-widest">
                           {Array.from({length: 12}).map(() => (Math.random() > 0.5 ? '1' : '0'))}
                        </div>
                        <p className="text-[4px] mt-1 text-gray-500 uppercase">Biometric Hash: Verified</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t-2 border-black pt-1 flex justify-between text-[7px] font-black font-serif uppercase tracking-widest">
                  <span>Bengaluru // London // Singapore</span>
                  <div className="flex gap-4">
                     <span>Markets</span><span>Tech</span><span>Logistics</span><span>Intelligence</span>
                  </div>
                  <span>© 2026 IQV-K</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }} 
            className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
          >
             <div className="bg-black text-white p-6 flex flex-col items-center border-2 border-white shadow-[20px_20px_0px_#ef6925]">
                <Newspaper size={48} className="mb-4 text-[#ef6925]" />
                <p className="font-mono text-xs uppercase tracking-[0.6em]">Scroll to Unfold</p>
                <ChevronDown className="mt-4 animate-bounce" />
             </div>
          </motion.div>
        </div>
      </section>

      {/* REMAINDER OF YOUR SECTIONS (BUILD WEALTH, COMMAND CENTER, ETC) */}
      {/* ... keeping your existing high-quality sections ... */}
      <section className="py-40 bg-[#fcfcfc] text-black border-t-[16px] border-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-8xl md:text-[10vw] font-black italic uppercase leading-[0.8] tracking-tighter">
            Pure <br /> <span className="text-[#ef6925]">Monetary</span> <br /> Clarity.
          </h2>
        </div>
      </section>

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
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="py-60 bg-[#ef6925] text-black text-center">
         <h2 className="text-8xl md:text-[12vw] font-black uppercase italic leading-[0.7] mb-12">
           Access <br /> <span className="text-white">Granted.</span>
         </h2>
         <p className="font-mono text-xs font-bold uppercase tracking-[1em] opacity-40">Ique Ventures Kinetic Division</p>
      </footer>
    </div>
  );
};

export default KineticExecutiveApp;