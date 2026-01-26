import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {  AlertTriangle,  Compass,  HardHat,  Zap,  ArrowRight,  Phone,  Mail,  Globe, MapPin } from 'lucide-react';

const IndustrialHazardPortal = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  const mapRotate = useTransform(smoothProgress, [0, 0.4], [0, -10]);
  const formScale = useTransform(smoothProgress, [0.4, 0.8], [0.8, 1]);
  const hazardY = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="bg-white text-black font-black overflow-x-hidden selection:bg-[#ffde17]">
      
      {/* 1. THE OVERLAY HUD */}
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none p-6 flex justify-between">
        <div className="flex items-center gap-4 bg-black text-[#ffde17] px-6 py-2">
          <AlertTriangle size={20} className="animate-pulse" />
          <span className="font-mono text-xs tracking-[0.3em]">OPERATIONAL_NODE_BLR</span>
        </div>
        <div className="flex flex-col items-end">
           <span className="font-mono text-[10px] text-black/40">SCROLL_RELIANCE</span>
           <div className="w-48 h-1 bg-black/10 mt-2">
              <motion.div style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }} className="h-full bg-[#e72132]" />
           </div>
        </div>
      </div>

      {/* 2. THE HAZARD FORM */}
      <section className="min-h-screen relative z-10 bg-[#ffde17] border-t-[30px] border-black py-40 px-6 mt-20">
        <motion.div style={{ x: hazardY }} className="absolute -top-8 left-0 flex whitespace-nowrap opacity-20">
           {[...Array(10)].map((_, i) => (
             <span key={i} className="text-6xl italic mr-20">CAUTION // WARNING // ACCESS_RESTRICTED //</span>
           ))}
        </motion.div>

        <motion.div 
          style={{ scale: formScale }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-px bg-black border-[10px] border-black"
        >
          <div className="bg-white p-10 md:p-20">
             <h2 className="text-7xl italic leading-none mb-16 tracking-tighter uppercase">Initiate<br />Request.</h2>
             <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                <HazardInput label="IDENTIFIER" placeholder="LEGAL_NAME" color="#e72132" />
                <HazardInput label="COMM_LINK" placeholder="ENCRYPTED_EMAIL" color="#e72132" />
                <div className="space-y-4">
                   <label className="font-mono text-[10px] font-black uppercase tracking-widest text-black/40">Transmission_Payload</label>
                   <textarea className="w-full bg-slate-50 border-4 border-black p-6 text-2xl italic uppercase h-48 outline-none focus:bg-[#ffde17] transition-colors" placeholder="BUSINESS_INTENT" />
                </div>
                <button className="w-full bg-[#e72132] text-white py-8 text-4xl italic uppercase flex items-center justify-center gap-6 group hover:bg-black transition-all">
                   SEND PING <ArrowRight className="group-hover:translate-x-4 transition-transform" />
                </button>
             </form>
          </div>

          <div className="bg-black text-[#ffde17] p-10 md:p-20 flex flex-col justify-between">
             <div className="space-y-16">
                <DetailRow icon={<MapPin />} label="Target_Node" val="Koramangala 2nd Block" />
                <DetailRow icon={<Globe />} label="Grid" val="Bengaluru, KA" />
                <DetailRow icon={<Mail />} label="Secure" val="BLR.HQ@IQUE.VENTURES" />
             </div>
             
             <div className="mt-20 p-8 border-4 border-[#ffde17] border-dashed">
                <div className="flex items-center gap-4 mb-4">
                   <HardHat className="text-white" />
                   <p className="text-2xl italic text-white uppercase leading-none">Vetting Active</p>
                </div>
                <p className="text-xs font-mono opacity-60 uppercase">Startup Park operational hours: 24/7 Monitoring active for verified startups.</p>
             </div>
          </div>
        </motion.div>
      </section>

      {/* 3. UPDATED MAP SECTION: STARTUP PARK BENGALURU */}
      <section className="h-screen sticky top-0 flex items-center justify-center p-6 bg-white overflow-hidden">
        <motion.div 
          style={{ rotateX: mapRotate, scale: useTransform(smoothProgress, [0, 0.4], [1, 0.9]) }}
          className="relative w-full max-w-7xl h-[70vh] border-[15px] border-black bg-black overflow-hidden group shadow-[40px_40px_0px_#e72132]"
        >
          {/* LIVE GOOGLE MAP EMBED */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.632296541671!2d77.6186411!3d12.9312891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae150058b75701%3A0xd3b7950ec31e6322!2sStartup%20Park%20By%20Ique%20Ventures!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            className="absolute inset-0 w-full h-full grayscale contrast-[1.2] invert opacity-70"
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Hazard Overlays */}
          <div className="absolute inset-0 pointer-events-none border-[20px] border-black/10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7213210_1px,transparent_1px),linear-gradient(to_bottom,#e7213210_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

          {/* Location Details Block */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
             <div className="w-12 h-12 bg-[#e72132] rounded-full animate-ping mb-4" />
             <h3 className="text-4xl italic uppercase bg-[#ffde17] text-black px-8 py-4 border-4 border-black shadow-[10px_10px_0px_#000]">
                Startup_Park
             </h3>
          </div>

          <div className="absolute bottom-10 left-10 p-6 border-l-8 border-[#ffde17] bg-black text-white z-10">
             <p className="font-mono text-[10px] opacity-50 mb-1">GEOGRAPHIC_INTEL</p>
             <p className="text-2xl font-black italic uppercase">12.9313° N // 77.6186° E</p>
             <p className="text-sm font-mono text-[#ffde17]">KORAMANGALA_BLR</p>
          </div>
        </motion.div>
      </section>

      {/* 4. FOOTER */}
      <footer className="h-screen bg-white flex flex-col items-center justify-center text-center px-6 border-t-[20px] border-[#e72132]">
         <Zap size={80} className="text-[#ffde17] fill-black mb-10" />
         <h2 className="text-[12vw] leading-[0.7] italic uppercase tracking-tighter mb-10 text-black">
           NODE <br /> <span className="text-[#e72132]">LOCKED.</span>
         </h2>
         <p className="font-mono text-xs font-black uppercase tracking-[1em] text-black/20">Ique Ventures Industrial Division</p>
      </footer>
    </div>
  );
};

// HELPER COMPONENTS
const HazardInput = ({ label, placeholder }) => (
  <div className="relative">
    <label className="font-mono text-[10px] font-black uppercase tracking-widest text-black/40 mb-4 block">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder}
      className="w-full bg-transparent border-b-8 border-black py-4 text-4xl italic uppercase outline-none focus:border-[#e72132] transition-colors placeholder:text-black/5"
    />
  </div>
);

const DetailRow = ({ icon, label, val }) => (
  <div className="flex items-center gap-8 group">
    <div className="p-4 bg-white text-black group-hover:bg-[#e72132] group-hover:text-white transition-colors flex items-center justify-center">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <div>
      <p className="font-mono text-[9px] uppercase tracking-widest opacity-40 mb-1">{label}</p>
      <p className="text-3xl italic uppercase leading-none tracking-tighter">{val}</p>
    </div>
  </div>
);

export default IndustrialHazardPortal;