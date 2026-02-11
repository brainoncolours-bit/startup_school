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

     
    </div>
  );
};

export default FAQ;