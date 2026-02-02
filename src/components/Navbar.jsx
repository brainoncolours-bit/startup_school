import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Home, User, Images, Book, Send, Sparkles, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: <Home size={20} />, color: '#60A5FA' },
  { name: 'About', path: '/about', icon: <User size={20} />, color: '#A78BFA' },
  // { name: 'Gallery', path: '/courses', icon: <Images size={20} />, color: '#F472B6' },
  { name: 'Blog', path: '/blog', icon: <Book size={20} />, color: '#FB923C' },
  { name: 'Contact', path: '/contact', icon: <Send size={20} />, color: '#34D399' },
];

const MagneticButton = ({ children, isActive, color }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.4);
    y.set(middleY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className="relative flex items-center justify-center"
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="glow"
          className="absolute -inset-2 blur-xl opacity-20 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
    </motion.div>
  );
};

const KineticNav = () => {
  const [hovered, setHovered] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-[101] w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white"
        whileTap={{ scale: 0.9 }}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-0 left-0 right-0 z-[100] bg-black/95 backdrop-blur-xl border-b border-white/10 p-6"
          >
            <div className="flex flex-col gap-3 pt-16">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                      isActive ? 'bg-white text-black' : 'bg-white/5 text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="font-bold uppercase tracking-wider">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
      <motion.div 
        className="flex items-end gap-3 p-3 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          const isHovered = hovered === idx;

          return (
            <Link key={item.name} to={item.path} className="relative">
              <MagneticButton isActive={isActive} color={item.color}>
                <motion.div
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    relative group flex flex-col items-center justify-center
                    w-14 h-14 rounded-2xl transition-colors duration-500
                    ${isActive ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10'}
                  `}
                >
                  <motion.div 
                    animate={{ y: isHovered || isActive ? -2 : 0 }}
                    className="z-10"
                  >
                    {item.icon}
                  </motion.div>

                  <AnimatePresence>
                    {(isHovered || isActive) && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className={`absolute -top-10 px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase border border-white/10 backdrop-blur-md
                          ${isActive ? 'bg-white text-black' : 'bg-zinc-900 text-white'}
                        `}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Dot Indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="dot"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-white"
                    />
                  )}
                </motion.div>
              </MagneticButton>
            </Link>
          );
        })}
        
        <div className="w-[1px] h-8 bg-white/10 mx-2 self-center" />

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/40"
        >
          <Sparkles size={20} />
        </motion.button>
      </motion.div>
    </nav>
    </>
  );
};

export default KineticNav;