import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Terminal, Send, Phone, Mail, Globe, AlertCircle, HardHat, Crosshair, Zap } from 'lucide-react';

const IndustrialContactPortal = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const bgTextX = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);

  return (
    // PRIMARY COLOR: #ef6925 (Orange) | SECONDARY: #e1ff00 (Lime)
    <div ref={containerRef} className="bg-[#ef6925] text-black font-sans selection:bg-[#e1ff00] selection:text-black overflow-x-hidden min-h-screen">
      
      {/* 1. STATUS HUD */}
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none p-6 flex justify-between">
        <div className="flex items-center gap-4 bg-black text-[#e1ff00] px-6 py-2 border-r-4 border-b-4 border-[#e1ff00]">
          <Terminal size={18} />
          {/* <span className="font-mono text-[10px] tracking-[0.4em] uppercase font-bold">Comms_Channel.Open</span> */}
        </div>
        <div className="hidden md:flex flex-col items-end">
          <div className="bg-[#e1ff00] border-2 border-black px-4 py-1 mb-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {/* <span className="font-mono text-[10px] font-black uppercase tracking-tighter">Signal_Strength: 98%</span> */}
          </div>
        </div>
      </div>

      {/* 2. KINETIC HEADER */}
      <section className="h-[60vh] sm:h-[70vh] flex flex-col items-center justify-center relative border-b-[12px] sm:border-b-[20px] border-black pt-16 sm:pt-20 overflow-hidden">
        <motion.div 
          style={{ x: bgTextX }} 
          className="absolute top-10 sm:top-20 left-0 flex whitespace-nowrap opacity-20 pointer-events-none"
        >
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-[12vh] sm:text-[15vh] md:text-[20vh] font-black mr-10 sm:mr-20 text-white">ESTABLISH_CONNECTION // UPLINK //</span>
          ))}
        </motion.div>

        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="z-10 text-center px-4"
        >
          <div className="bg-black text-[#e1ff00] inline-block px-3 sm:px-4 py-1 mb-4 sm:mb-6 skew-x-[-12deg]">
            <p className="font-mono text-[8px] sm:text-[10px] tracking-widest uppercase font-bold">Direct Transmission Protocol</p>
          </div>
          <h1 className="text-[18vw] sm:text-[16vw] md:text-[14vw] font-black uppercase leading-[0.8] tracking-tighter italic">
            Contact <br /> 
            <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] sm:drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] not-italic">US</span>
            <span className="text-[#e1ff00]">.</span>
          </h1>
        </motion.div>
      </section>

      {/* 3. THE TRANSMISSION FORM */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
        <div className="lg:col-span-4 space-y-6 sm:space-y-8">
          <div className="border-l-4 sm:border-l-8 border-black pl-4 sm:pl-6">
            <h2 className="text-4xl sm:text-5xl font-black uppercase mb-3 sm:mb-4 leading-none">Priority <br/><span className="text-white">Comms</span></h2>
            <p className="font-mono text-xs sm:text-sm font-bold opacity-80 leading-tight">
              ESTABLISH DIRECT UPLINK FOR PARTNERSHIP INQUIRIES, OPERATIONAL SUPPORT, OR SYSTEM ACCESS.
            </p>
          </div>

          <div className="space-y-2">
            <ContactDetail icon={<Phone size={20}/>} label="VOICE_LINE" value="+91-9036354727" color="#e1ff00" />
            <ContactDetail icon={<Mail size={20}/>} label="ENCRYPTED_MAIL" value="info@mystartupschool.com" color="#ffffff" />
            <ContactDetail icon={<Globe size={20}/>} label="GLOBAL_NODE" value="BENGALURU" color="#e1ff00" />
          </div>
        </div>

        <div className="lg:col-span-8 bg-black p-1 shadow-[8px_8px_0px_0px_rgba(225,255,0,1)] sm:shadow-[15px_15px_0px_0px_rgba(225,255,0,1)]">
          <form className="bg-black p-6 sm:p-8 border-2 border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="md:col-span-1 flex flex-col">
              <label className="font-mono text-[10px] mb-2 text-[#e1ff00]">OPERATOR_NAME</label>
              <input type="text" className="bg-white/5 border-b-2 border-[#ef6925] p-3 text-white focus:border-[#e1ff00] outline-none transition-all font-bold uppercase" placeholder="REQUIRED*" />
            </div>
            <div className="md:col-span-1 flex flex-col">
              <label className="font-mono text-[10px] mb-2 text-[#e1ff00]">CONTACT_UPLINK</label>
              <input type="email" className="bg-white/5 border-b-2 border-[#ef6925] p-3 text-white focus:border-[#e1ff00] outline-none transition-all font-bold uppercase" placeholder="EMAIL_ADDRESS*" />
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label className="font-mono text-[10px] mb-2 text-[#e1ff00]">SUBJECT_PROTOCOL</label>
              <select className="bg-white/5 border-b-2 border-[#ef6925] p-3 text-white focus:border-[#e1ff00] outline-none transition-all font-bold">
                <option className="bg-black text-white">A</option>
                <option className="bg-black text-white">B</option>
                <option className="bg-black text-white">C</option>
              </select>
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label className="font-mono text-[10px] mb-2 text-[#e1ff00]">ENCRYPTED_MESSAGE</label>
              <textarea rows="4" className="bg-white/5 border-b-2 border-[#ef6925] p-3 text-white focus:border-[#e1ff00] outline-none transition-all font-bold uppercase" placeholder="ENTER DATA..."></textarea>
            </div>
            <button className="md:col-span-2 bg-[#e1ff00] text-black font-black py-5 flex items-center justify-center gap-4 hover:bg-[#ef6925] hover:text-white transition-all uppercase group">
              Initialise Transmission <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </button>
          </form>
        </div>
      </section>

      {/* 4. GEOSPATIAL MAPPING */}
      <section className="py-24 border-t-[20px] border-black bg-white relative">
        <div className="absolute top-0 right-10 -translate-y-1/2 bg-black text-[#e1ff00] p-4 z-10 flex items-center gap-3 border-2 border-white">
          <Crosshair className="animate-spin" size={24} />
          <span className="font-mono text-xs font-bold tracking-tighter">COORDINATES: 37.7749° N, 122.4194° W</span>
        </div>

        <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 flex items-end gap-6">
                <h2 className="text-8xl font-black uppercase tracking-tighter text-black leading-[0.8]">Target <br/> Location.</h2>
                <Zap size={60} fill="black" />
            </div>
          
          <div className="h-[500px] w-full bg-slate-900 border-[15px] border-black relative grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden group">
            <div className="absolute inset-0 bg-[#e1ff00]/10 pointer-events-none group-hover:bg-transparent transition-colors z-10" />
            <iframe 
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 5. EMERGENCY BANNER - DUO COLOR */}
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
    {/* Hover fill effect */}
    <div className="absolute bottom-0 left-0 w-1 h-0 bg-[#e1ff00] group-hover:h-full transition-all duration-300" />
  </div>
);

export default IndustrialContactPortal;