import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

      {isOpen && createPortal(
        <AnimatePresence>
          <motion.div className="fixed inset-0 flex items-center justify-center z-[99999] pointer-events-none">
            <div className="absolute inset-0 bg-black/60 pointer-events-auto" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-[90vw] md:max-w-[350px] h-[70vh] md:h-[500px] bg-black border-[4px] border-black flex flex-col shadow-[12px_12px_0px_0px_rgba(239,105,37,1)] pointer-events-auto"
            >
              <div className="bg-[#ef6925] p-3 flex justify-between items-center border-b-2 border-black">
                <span className="font-black text-black text-xs uppercase flex items-center gap-2"><Bot size={16}/> AI_UNIT_01</span>
                <button onClick={() => setIsOpen(false)} className="bg-black text-white p-1 hover:bg-white hover:text-black transition-colors"><X size={16} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#111] scrollbar-thin scrollbar-thumb-[#ef6925]">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 font-mono text-[11px] border-2 max-w-[85%] leading-relaxed ${
                        msg.sender === 'user'
                        ? 'bg-white text-black border-white'
                        : 'text-[#e1ff00] border-[#e1ff00]'
                    }`}>
                        {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="text-[#e1ff00] font-mono text-[10px] animate-pulse">PROCESSING_DATA...</div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-3 bg-black border-t-2 border-[#ef6925] flex gap-2">
                <input
                    autoFocus
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    placeholder="QUERY_SYSTEM..."
                    className="flex-1 bg-[#222] border border-[#444] p-3 text-[#e1ff00] font-mono text-[11px] outline-none focus:border-[#e1ff00] transition-colors"
                />
                <button
                    onClick={handleSend}
                    className="bg-[#e1ff00] px-4 border-2 border-black hover:bg-white transition-colors"
                >
                    <Send size={16} className="text-black"/>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default IndustrialChatbot;