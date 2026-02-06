import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Zap, ShieldAlert, Cpu } from 'lucide-react';

const IndustrialChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, text: "UPLINK ESTABLISHED. PRE-ALPHA MODE.", sender: 'bot' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: input.toUpperCase(), sender: 'user' }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, text: "AI MODULE COMING SOON.", sender: 'bot' }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="relative z-50 w-10 h-10 md:w-13 md:h-13 bg-[#e1ff00] border-2 border-black rounded-full flex items-center justify-center text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        whileHover={{ scale: 1.1 }}
      >
        <Bot size={20} strokeWidth={2.5} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 flex items-center justify-center md:items-end md:justify-end md:p-12 z-[110] pointer-events-none">
            <div className="absolute inset-0 bg-black/60 md:hidden pointer-events-auto" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-[350px] h-[70vh] md:h-[500px] bg-black border-[4px] border-black flex flex-col shadow-[12px_12px_0px_0px_rgba(239,105,37,1)] pointer-events-auto mx-4"
            >
              <div className="bg-[#ef6925] p-3 flex justify-between items-center border-b-2 border-black">
                <span className="font-black text-black text-xs uppercase flex items-center gap-2"><Bot size={16}/> AI_UNIT</span>
                <button onClick={() => setIsOpen(false)} className="bg-black text-white p-0.5"><X size={16} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#111]">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2 font-mono text-[10px] border-2 ${msg.sender === 'user' ? 'bg-white text-black border-white' : 'text-[#e1ff00] border-[#e1ff00]'}`}>{msg.text}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-3 bg-black border-t-2 border-[#ef6925] flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="QUERY_" className="flex-1 bg-[#222] border border-[#444] p-2 text-[#e1ff00] font-mono text-[10px] outline-none" />
                <button onClick={handleSend} className="bg-[#e1ff00] px-3 border border-black"><Send size={14}/></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IndustrialChatbot;