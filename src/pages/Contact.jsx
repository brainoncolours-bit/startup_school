import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Terminal, Send, MapPin, Phone, Mail, Globe, AlertCircle, HardHat, Crosshair } from 'lucide-react';

const IndustrialContactPortal = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const bgTextX = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div ref={containerRef} className="bg-[#ef6925] text-black font-sans selection:bg-black selection:text-[#ef6925] overflow-x-hidden min-h-screen">
      
      {/* 1. STATUS HUD */}
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none p-6 flex justify-between">
        <div className="flex items-center gap-4 bg-black text-white px-6 py-2">
          <Terminal size={18} className="text-[#ef6925]" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase">Comms_Channel.Open</span>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <div className="bg-white border-2 border-black px-4 py-1 mb-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-tighter">Signal_Strength: 98%</span>
          </div>
        </div>
      </div>

      {/* 2. KINETIC HEADER */}
      <section className="h-[60vh] flex flex-col items-center justify-center relative border-b-[20px] border-white pt-20">
        <motion.div 
          style={{ x: bgTextX }} 
          className="absolute top-20 left-0 flex whitespace-nowrap opacity-10 pointer-events-none"
        >
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-[20vh] font-black mr-20">ESTABLISH_CONNECTION // UPLINK // ESTABLISH_CONNECTION //</span>
          ))}
        </motion.div>

        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="z-10 text-center"
        >
          <div className="bg-black text-white inline-block px-4 py-1 mb-6">
            <p className="font-mono text-[10px] tracking-widest uppercase">Direct Transmission Protocol</p>
          </div>
          <h1 className="text-[12vw] font-black uppercase leading-[0.8] tracking-tighter">
            Contact <br /> <span className="text-white drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">HQ.</span>
          </h1>
        </motion.div>
      </section>

      {/* 3. THE TRANSMISSION FORM */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="border-l-8 border-black pl-6">
            <h2 className="text-4xl font-black uppercase mb-4">Priority <br/>Comms</h2>
            <p className="font-mono text-sm font-bold opacity-70 leading-tight">
              ESTABLISH DIRECT UPLINK FOR PARTNERSHIP INQUIRIES, OPERATIONAL SUPPORT, OR SYSTEM ACCESS.
            </p>
          </div>

          <div className="space-y-4">
            <ContactDetail icon={<Phone size={20}/>} label="VOICE_LINE" value="+1 (888) 000-IKUE" />
            <ContactDetail icon={<Mail size={20}/>} label="ENCRYPTED_MAIL" value="OPS@IQUEVENTURES.COM" />
            <ContactDetail icon={<Globe size={20}/>} label="GLOBAL_NODE" value="SAN FRANCISCO, CA" />
          </div>
        </div>

        <div className="lg:col-span-8 bg-black p-1 text-white">
          <form className="bg-black p-8 border-2 border-white/20 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1 flex flex-col">
              <label className="font-mono text-[10px] mb-2 text-[#ef6925]">OPERATOR_NAME</label>
              <input type="text" className="bg-white/10 border-b-2 border-white p-3 focus:bg-[#ef6925] focus:text-black outline-none transition-all font-bold uppercase" placeholder="REQUIRED*" />
            </div>
            <div className="md:col-span-1 flex flex-col">
              <label className="font-mono text-[10px] mb-2 text-[#ef6925]">CONTACT_UPLINK</label>
              <input type="email" className="bg-white/10 border-b-2 border-white p-3 focus:bg-[#ef6925] focus:text-black outline-none transition-all font-bold uppercase" placeholder="EMAIL_ADDRESS*" />
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label className="font-mono text-[10px] mb-2 text-[#ef6925]">SUBJECT_PROTOCOL</label>
              <select className="bg-white/10 border-b-2 border-white p-3 focus:bg-[#ef6925] focus:text-black outline-none transition-all font-bold">
                <option className="bg-black text-white">STRATEGIC_INVESTMENT</option>
                <option className="bg-black text-white">OPERATIONAL_SUPPORT</option>
                <option className="bg-black text-white">MEDIA_INQUIRY</option>
              </select>
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label className="font-mono text-[10px] mb-2 text-[#ef6925]">ENCRYPTED_MESSAGE</label>
              <textarea rows="4" className="bg-white/10 border-b-2 border-white p-3 focus:bg-[#ef6925] focus:text-black outline-none transition-all font-bold uppercase" placeholder="ENTER DATA..."></textarea>
            </div>
            <button className="md:col-span-2 bg-[#ef6925] text-black font-black py-4 flex items-center justify-center gap-4 hover:bg-white transition-colors uppercase group">
              Initialise Transmission <Send size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </section>

      {/* 4. GEOSPATIAL MAPPING (The Map) */}
      <section className="py-24 border-t-[20px] border-black bg-white relative">
        <div className="absolute top-0 right-10 -translate-y-1/2 bg-black text-white p-4 z-10 flex items-center gap-3">
          <Crosshair className="text-[#ef6925] animate-spin" size={24} />
          <span className="font-mono text-xs font-bold tracking-tighter">COORDINATES: 37.7749° N, 122.4194° W</span>
        </div>

        <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
                <h2 className="text-7xl font-black uppercase tracking-tighter text-black">Target <br/> Location.</h2>
            </div>
          
          <div className="h-[500px] w-full bg-slate-200 border-[10px] border-black relative grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden group">
            {/* Placeholder for actual Map (Google Maps/Mapbox) */}
            <div className="absolute inset-0 bg-[#ef6925]/20 pointer-events-none group-hover:bg-transparent transition-colors" />
            <iframe 
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.83543450937!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050c58!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1674567890123!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 5. EMERGENCY BANNER */}
      <div className="bg-black text-[#ef6925] py-4 overflow-hidden whitespace-nowrap border-y-2 border-[#ef6925]">
        <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-20 font-mono font-black text-xl"
        >
            {[...Array(10)].map((_, i) => (
                <span key={i} className="flex items-center gap-4">
                    <AlertCircle /> SYSTEM ACTIVE // NO UNAUTHORIZED ACCESS // 24/7 MONITORING
                </span>
            ))}
        </motion.div>
      </div>

      <footer className="bg-[#ef6925] py-20 flex flex-col items-center">
        <HardHat size={40} className="mb-4" />
        <p className="font-mono text-[10px] font-bold tracking-[0.5em] text-black/40 text-center px-6">
          DESIGNATED SECURE CHANNEL - ALL METADATA LOGGED
        </p>
      </footer>
    </div>
  );
};

const ContactDetail = ({ icon, label, value }) => (
  <div className="group border-2 border-black p-4 flex items-center gap-4 hover:bg-black hover:text-white transition-all cursor-crosshair">
    <div className="p-2 bg-black text-white group-hover:bg-[#ef6925] group-hover:text-black">
      {icon}
    </div>
    <div>
      <p className="font-mono text-[9px] font-bold opacity-50 uppercase">{label}</p>
      <p className="text-lg font-black tracking-tighter uppercase">{value}</p>
    </div>
  </div>
);

export default IndustrialContactPortal;