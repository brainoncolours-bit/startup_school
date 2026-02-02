import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your startup assistant. Ask me anything about entrepreneurship, startups, or our courses!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = async (userMessage) => {
    try {
      // Using Hugging Face's free inference API
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: userMessage,
          parameters: {
            max_length: 100,
            temperature: 0.7,
          }
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      // If response is loading, return friendly message
      if (data.error && data.error.includes('loading')) {
        return "Great question! Let me think about that... How can I help you with your startup journey?";
      }
      
      return data[0]?.generated_text || getSmartResponse(userMessage);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return getSmartResponse(userMessage);
    }
  };

  const getSmartResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Smart pattern matching for common questions
    if (msg.match(/\b(hi|hello|hey)\b/)) {
      return "Hello! Welcome to Startup School! 👋 I'm here to help you with anything about startups, entrepreneurship, or our courses. What would you like to know?";
    } else if (msg.match(/\b(course|class|learn|study|program)\b/)) {
      return "We offer comprehensive courses on entrepreneurship, product development, marketing, fundraising, and scaling. Our programs are designed by successful founders who've been in your shoes! Want to know about a specific course?";
    } else if (msg.match(/\b(startup|business|company|venture)\b/) && msg.match(/\b(start|begin|launch|create)\b/)) {
      return "Starting a startup is exciting! The key steps are: validate your idea with real customers, build an MVP, get early users, iterate based on feedback, and then scale. Our courses guide you through each step. What stage are you at?";
    } else if (msg.match(/\b(price|cost|fee|pay|pricing)\b/)) {
      return "We offer flexible pricing from free introductory courses to premium masterclasses ($99-$499). Many courses include mentorship and community access. Want specific pricing for a particular program?";
    } else if (msg.match(/\b(contact|email|reach|talk|speak)\b/)) {
      return "You can reach us at info@startupschool.com or through our Contact page. We typically respond within 24 hours. What would you like to discuss?";
    } else if (msg.match(/\b(mentor|coach|guide|advisor)\b/)) {
      return "Yes! We offer 1-on-1 mentorship with experienced entrepreneurs who've raised funding and scaled companies. Mentorship is included with our premium courses. Interested in learning more?";
    } else if (msg.match(/\b(fund|money|investor|capital|raise)\b/)) {
      return "Fundraising is crucial! We teach bootstrapping, angel investing, VC fundraising, and crowdfunding strategies. Our courses include pitch deck templates and investor connection opportunities. What's your funding goal?";
    } else if (msg.match(/\b(market|customer|growth|sell)\b/)) {
      return "Marketing and customer acquisition are key to startup success! We cover digital marketing, content strategy, SEO, social media, and growth hacking. Want to learn about a specific marketing channel?";
    } else if (msg.match(/\b(mvp|product|build|develop)\b/)) {
      return "Building an MVP is all about speed and learning. Focus on core features that solve the main problem. We teach no-code tools, agile development, and validation techniques. Need help defining your MVP?";
    } else if (msg.match(/\b(team|cofounder|hire|recruit)\b/)) {
      return "Building the right team is critical! We cover finding co-founders, early hiring strategies, equity splits, and building strong culture. Our community is great for finding team members too!";
    } else if (msg.match(/\b(gallery|portfolio|project|showcase)\b/)) {
      return "Check out our Gallery page to see amazing projects built by our students! From SaaS products to mobile apps and marketplaces - our community has launched it all. Want to see specific examples?";
    } else if (msg.match(/\b(blog|article|read|content)\b/)) {
      return "Our blog features startup strategies, founder interviews, industry trends, and practical guides. New articles every week! Visit our Blog page to explore. Any specific topics you're interested in?";
    } else if (msg.match(/\b(about|who|what is)\b/)) {
      return "Startup School is where aspiring entrepreneurs become successful founders. We provide world-class courses, mentorship, and a supportive community to help you build and scale your startup. Founded by entrepreneurs, for entrepreneurs!";
    } else if (msg.match(/\b(thank|thanks)\b/)) {
      return "You're very welcome! 😊 Feel free to ask me anything else about startups, entrepreneurship, or our programs. I'm here to help!";
    } else if (msg.match(/\b(bye|goodbye|see you)\b/)) {
      return "Best of luck with your startup journey! 🚀 Come back anytime you have questions. We're always here to help!";
    } else if (msg.match(/\?/)) {
      return "That's a great question! While I can answer general questions about startups and our programs, for detailed specific advice, I'd recommend checking our courses or booking a call with our team. What aspect interests you most?";
    } else {
      return "I'd love to help you with that! I can answer questions about starting a business, our courses, mentorship, funding, marketing, and more. What would you like to know?";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    // Get AI response
    const botResponseText = await getBotResponse(userInput);
    
    const botMessage = {
      id: messages.length + 2,
      text: botResponseText,
      sender: 'bot'
    };
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-purple-500/50"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <MessageCircle size={28} />
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-0 left-0 right-0 md:bottom-8 md:right-8 md:left-auto z-50 w-full md:w-[90vw] md:max-w-md h-[85vh] md:h-[600px] bg-black/95 backdrop-blur-2xl border-t md:border border-white/10 rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Startup Assistant</h3>
                  <p className="text-xs text-white/80">Online • Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm'
                        : 'bg-white/10 text-white rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-end"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-white/60 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-white/60 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-white/60 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2 bg-white/5 rounded-2xl p-2 border border-white/10">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none px-2"
                />
                <button
                  onClick={handleSend}
                  className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  disabled={!input.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
