// FAQ.jsx
import { faqData } from "../faqData";
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowDownRight, MessageCircle, Zap } from 'lucide-react';
import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import FAQSchema from "./FAQSchema";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  // Parallax effect for the hero section
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#f2e8d5] text-black selection:bg-[#ef6925] selection:text-white min-h-screen">
      {/* SEO Schema */}
      <FAQSchema />

      {/* HERO SECTION - Inspired by other pages but funkier */}
      <section className="h-screen relative flex items-center justify-center bg-[#43646b] overflow-hidden border-b-[20px] border-black">
        <motion.div style={{ y: heroY }} className="z-10 w-full max-w-7xl px-12 sm:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-white text-black border-2 border-black px-4 py-1 font-black uppercase text-sm italic mb-4 inline-block shadow-[4px_4px_0px_#000]">
              Status: Question Overflow
            </span>
            <h1 className="text-[14vw] sm:text-[10vw] font-[1000] leading-[0.8] tracking-[-0.05em] text-black uppercase">
              FREQUENTLY <br />
              <span className="flex items-center gap-4 justify-center">
                <span className="italic text-white [text-shadow:8px_8px_0px_#000]">ASKED QUESTIONS</span>
                <div className="h-[2px] sm:h-[4px] flex-grow bg-black mt-4"></div>
              </span>
            </h1>
          </motion.div>
        </motion.div>

        {/* Funky side scrolling text */}
       
      </section>

      {/* FUNNY FAQ SECTION WITH PARALLAX EFFECT */}
      <section className="py-20 sm:py-40 bg-[#f2e8d5] relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative"
          >
            {/* <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="bg-[#a5cb3a] p-4 border-2 border-black rounded-full">
                <div className="bg-black w-12 h-12 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#a5cb3a]" />
                </div>
              </div>
            </div> */}
            <h2 className="text-4xl sm:text-6xl font-black italic uppercase text-black mb-4 relative z-10">Frequently Asked Questions</h2>
            <div className="h-1 w-24 bg-black mx-auto"></div>
          </motion.div>

          <div className="space-y-6">
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="border-2 border-black rounded-xl overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex justify-between items-center bg-[#f9bb1a] hover:bg-[#e6aa10] transition-colors group"
                >
                  <h3 className="text-xl font-black italic uppercase tracking-tight text-black group-hover:text-white transition-colors">{item.question}</h3>
                  <div className="transform transition-transform duration-300 group-hover:scale-110">
                    {openIndex === index ?
                      <ChevronUp className="w-6 h-6 text-black" /> :
                      <ChevronDown className="w-6 h-6 text-black" />
                    }
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-white">
                    <p className="text-lg font-bold text-slate-800 leading-relaxed">{item.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNNY INFO SECTION - Inspired by About page layout */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#a5cb3a] p-8 border-4 border-black shadow-[8px_8px_0px_#000] text-center"
          >
            <h3 className="text-3xl font-black italic uppercase mb-4 leading-none">24/7 Support</h3>
            <p className="font-bold uppercase text-xs">We're always here to answer your questions.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-red-400 p-8 border-4 border-black shadow-[8px_8px_0px_#000] text-center"
          >
            <h3 className="text-3xl font-black italic uppercase mb-4 leading-none">Quick Answers</h3>
            <p className="font-bold uppercase text-xs">Most queries answered within 24 hours.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#f9bb1a] p-8 border-4 border-black shadow-[8px_8px_0px_#000] text-center"
          >
            <h3 className="text-3xl font-black italic uppercase mb-4 leading-none">No Limits</h3>
            <p className="font-bold uppercase text-xs">Ask as many questions as you want.</p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA - Funky twist */}
      <section className="py-40 bg-[#1da89d] text-center relative border-t border-white/10">
        <div className="relative z-10 px-6">
          <motion.h2
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            className="text-[25vw] sm:text-[20vw] font-black leading-none text-black text-center mb-8 sm:mb-12"
          >
            MORE?
          </motion.h2>
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 w-full flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="border-2 sm:border-4 border-black bg-black text-white px-8 sm:px-12 py-4 font-bold hover:bg-white hover:text-black transition-all uppercase w-80 sm:w-88 text-center flex items-center justify-center gap-3"
            >
              Get In Touch <ArrowDownRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;