import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Terminal, Send, Phone, Mail, Globe, AlertCircle, HardHat, Crosshair, Zap, User, Hash } from 'lucide-react';

const IndustrialContactPortal = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const bgTextX = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div ref={containerRef} className="bg-[#ef6925] text-black font-sans selection:bg-[#e1ff00] selection:text-black overflow-x-hidden min-h-screen">
      
      {/* 1. STATUS HUD */}
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none p-6 flex justify-between">
        <div className="flex items-center gap-4 bg-black text-[#e1ff00] px-6 py-2 border-r-4 border-b-4 border-[#e1ff00] pointer-events-auto">
          <Terminal size={18} />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase font-bold hidden sm:inline">Uplink_Established</span>
        </div>
      </div>

      {/* 2. KINETIC HEADER */}
      <section className="h-[60vh] sm:h-[70vh] flex flex-col items-center justify-center relative border-b-[12px] sm:border-b-[20px] border-black pt-16 sm:pt-20 overflow-hidden bg-[#a5cb3a]">
        <motion.div 
          style={{ x: bgTextX }} 
          className="absolute top-10 sm:top-20 left-0 flex whitespace-nowrap opacity-20 pointer-events-none"
        >
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-[12vh] sm:text-[15vh] md:text-[20vh] font-black mr-10 sm:mr-20 text-white">
              ESTABLISH_CONNECTION // UPLINK //
            </span>
          ))}
        </motion.div>

        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="z-10 text-center px-4"
        >
          <div className="bg-black text-[#a5cb3a] inline-block px-4 py-1 mb-4 sm:mb-6 skew-x-[-12deg] shadow-[6px_6px_0px_rgba(0,0,0,0.15)]">
            <p className="font-mono text-[9px] sm:text-[11px] tracking-[0.2em] uppercase font-black px-2">
              Direct Transmission Protocol
            </p>
          </div>

          <h1 className="text-[18vw] sm:text-[16vw] md:text-[14vw] font-[1000] uppercase leading-[0.75] tracking-tighter italic text-black">
            Contact <br /> 
            <span className="text-white drop-shadow-[4px_4px_0px_#000] sm:drop-shadow-[10px_10px_0px_#000] not-italic">
              US
            </span>
            <span className="text-black">.</span>
          </h1>

          <div className="mt-10 flex flex-col items-center">
            <div className="h-[4px] w-20 bg-black mb-4" />
            <p className="font-mono text-[10px] sm:text-xs uppercase font-black text-black tracking-[0.3em] leading-none">
              NGEF Layout // Bennigana Halli
            </p>
            <p className="font-mono text-[9px] uppercase text-black/60 mt-2">
              Tr4 3rd Floor, 180, Bengaluru
            </p>
          </div>
        </motion.div>
      </section>

      {/* 3. THE TRANSMISSION FORM */}
      <section className="bg-[#1da89d] py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Left Side: Info */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8">
            <div className="border-l-4 sm:border-l-[12px] border-black pl-4 sm:pl-6">
              <h2 className="text-5xl sm:text-6xl font-[1000] uppercase mb-3 sm:mb-4 leading-[0.8] tracking-tighter text-black">
                Priority <br/>
                <span className="text-white drop-shadow-[4px_4px_0px_#000]">Comms</span>
              </h2>
              <p className="font-mono text-xs sm:text-sm font-black text-black leading-tight mt-6 uppercase">
                Establish direct uplink for partnership inquiries, operational support, or system access.
              </p>
            </div>

            <div className="space-y-3">
              <ContactDetail icon={<Phone size={20}/>} label="VOICE_LINE" value="+91-9036354727" color="#000000" />
              <ContactDetail icon={<Mail size={20}/>} label="ENCRYPTED_MAIL" value="info@mystartupschool.com" color="#ffffff" />
              <ContactDetail icon={<Globe size={20}/>} label="GLOBAL_NODE" value="BENGALURU" color="#000000" />
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-8 relative group">
            <div className="absolute inset-0 bg-[#f9bb1a] translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
            
            <div className="relative bg-black p-1 border-2 border-black group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
              <form className="bg-black p-6 sm:p-10 border border-white/20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                
                {/* NAME */}
                <div className="md:col-span-1 flex flex-col">
                  <label className="font-mono text-[10px] font-black mb-2 text-[#1da89d] tracking-widest uppercase">Name</label>
                  <input type="text" required className="bg-white/5 border-b-2 border-white/20 p-3 text-white focus:border-[#e1ff00] outline-none transition-all font-bold uppercase placeholder:text-white/10" placeholder="IDENTIFY SELF..." />
                </div>

                {/* NUMBER */}
                <div className="md:col-span-1 flex flex-col">
                  <label className="font-mono text-[10px] font-black mb-2 text-[#1da89d] tracking-widest uppercase">Phone</label>
                  <input type="tel" required className="bg-white/5 border-b-2 border-white/20 p-3 text-white focus:border-[#e1ff00] outline-none transition-all font-bold uppercase placeholder:text-white/10" placeholder="+00 000 000 000" />
                </div>

                {/* EMAIL */}
                <div className="md:col-span-1 flex flex-col">
                  <label className="font-mono text-[10px] font-black mb-2 text-[#1da89d] tracking-widest uppercase">Email</label>
                  <input type="email" required className="bg-white/5 border-b-2 border-white/20 p-3 text-white focus:border-[#e1ff00] outline-none transition-all font-bold uppercase placeholder:text-white/10" placeholder="UPLINK@DOMAIN.COM" />
                </div>

                {/* SUBJECT */}
                <div className="md:col-span-1 flex flex-col">
                  <label className="font-mono text-[10px] font-black mb-2 text-[#1da89d] tracking-widest uppercase">Subject_Protocol</label>
                  <select className="bg-white/5 border-b-2 border-white/20 p-3 text-white focus:border-[#e1ff00] outline-none transition-all font-bold uppercase cursor-pointer">
                    <option className="bg-black text-white">General Inquiry</option>
                    <option className="bg-black text-white">Joinee</option>
                    <option className="bg-black text-white">Partnership</option>
                    <option className="bg-black text-white">Emergency Support</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div className="md:col-span-2 flex flex-col">
                  <label className="font-mono text-[10px] font-black mb-2 text-[#1da89d] tracking-widest uppercase">Message</label>
                  <textarea rows="4" className="bg-white/5 border-b-2 border-white/20 p-3 text-white focus:border-[#e1ff00] outline-none transition-all font-bold uppercase placeholder:text-white/10" placeholder="ENTER DATA STREAM..."></textarea>
                </div>

                {/* SUBMIT */}
                <button type="submit" className="md:col-span-2 bg-[#1da89d] text-black font-[1000] py-6 flex items-center justify-center gap-4 hover:bg-[#e1ff00] transition-all uppercase italic text-xl group border-2 border-[#1da89d]">
                  Submit 
                  <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GEOSPATIAL MAPPING */}
     <section className="py-24 border-t-[20px] border-black bg-white relative">
  <div className="absolute top-0 right-10 -translate-y-1/2 bg-black text-[#e1ff00] p-4 z-10 flex items-center gap-3 border-2 border-white">
    <Crosshair className="animate-spin" size={24} />
    <span className="font-mono text-xs font-bold tracking-tighter">COORDINATES: 12.9918° N, 77.6593° E</span>
  </div>

  <div className="max-w-7xl mx-auto px-6">
    <div className="mb-12 flex items-end gap-6">
      <h2 className="text-8xl font-black uppercase tracking-tighter text-black leading-[0.8]">Target <br/> Location.</h2>
      <Zap size={60} fill="black" />
    </div>
    
    <div className="h-[500px] w-full bg-slate-900 border-[15px] border-black relative grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden group">
      {/* Overlay to maintain the "Industrial" look until hovered */}
      <div className="absolute inset-0 bg-[#e1ff00]/10 pointer-events-none group-hover:bg-transparent transition-colors z-10" />
      
      <iframe 
        title="Location Map"
        src="https://www.google.com/maps/place/Startup+Park+By+Ique+Ventures/@20.7574802,72.1125325,5z/data=!4m10!1m2!2m1!1sstartup+park!3m6!1s0x3bae150058b75f01:0xd3b7950ec31e6322!8m2!3d12.9218575!4d77.6201801!15sCgxzdGFydHVwIHBhcmuSARBjb3Jwb3JhdGVfY2FtcHVz4AEA!16s%2Fg%2F11ylts96tf?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="relative z-0"
      />
    </div>
  </div>
</section>

      {/* 5. EMERGENCY BANNER */}
      <div className="bg-black text-[#e1ff00] py-6 overflow-hidden whitespace-nowrap border-y-4 border-white">
        <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="flex gap-20 font-mono font-black text-2xl italic"
        >
            {[...Array(10)].map((_, i) => (
                <span key={i} className="flex items-center gap-6">
                    <AlertCircle className="text-[#ef6925]" /> SYSTEM ACTIVE <span className="text-white">//</span> NO UNAUTHORIZED ACCESS <span className="text-[#ef6925]">//</span> 24/7 MONITORING
                </span>
            ))}
        </motion.div>
      </div>

      <footer className="bg-black py-20 flex flex-col items-center">
        <div className="bg-[#ef6925] p-4 mb-6 skew-x-12">
            <HardHat size={50} className="text-white -skew-x-12" />
        </div>
        <p className="font-mono text-[11px] font-bold tracking-[0.6em] text-[#e1ff00] text-center px-6 uppercase">
          Designated Secure Channel <span className="text-white">|</span> All Metadata Logged
        </p>
        <div className="mt-8 flex gap-2">
            <div className="w-8 h-2 bg-[#ef6925]"></div>
            <div className="w-8 h-2 bg-[#e1ff00]"></div>
            <div className="w-8 h-2 bg-white"></div>
        </div>
      </footer>
    </div>
  );
};

const ContactDetail = ({ icon, label, value, color }) => (
  <div className="group border-b-2 sm:border-b-4 border-black p-4 sm:p-6 flex items-center gap-4 sm:gap-6 hover:bg-black transition-all cursor-crosshair relative overflow-hidden bg-white/5">
    <div 
      className="p-2 sm:p-3 bg-black text-white group-hover:scale-110 transition-transform" 
      style={{ backgroundColor: color === '#ffffff' ? '#ef6925' : 'black', color: color }}
    >
      {icon}
    </div>
    <div className="z-10">
      <p className="font-mono text-[8px] sm:text-[10px] font-black opacity-60 uppercase mb-1">{label}</p>
      <p className="text-base sm:text-xl font-black tracking-tight uppercase group-hover:text-white transition-colors break-all">{value}</p>
    </div>
    <div className="absolute bottom-0 left-0 w-1 h-0 bg-[#e1ff00] group-hover:h-full transition-all duration-300" />
  </div>
);

export default IndustrialContactPortal;