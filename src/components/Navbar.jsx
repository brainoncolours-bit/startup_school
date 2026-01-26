import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Command, Zap, Layers, Sparkles, Navigation, ChevronRight } from 'lucide-react';

const Navbar = ({ show = true }) => {
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();
  const { scrollY } = useScroll();

  // Dynamic scaling based on scroll
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const navPadding = useTransform(scrollY, [0, 100], ["12px 24px", "8px 16px"]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Command size={16} /> },
    { name: 'About', path: '/about', icon: <Layers size={16} /> },
    { name: 'Courses', path: '/courses', icon: <Zap size={16} /> },
    { name: 'Contact', path: '/contact', icon: <Navigation size={16} /> },
    { name: 'Blog', path: '/blog', icon: <Sparkles size={16} /> },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 inset-x-0 z-[100] flex justify-center p-6 pointer-events-none"
        >
          <motion.nav
            style={{ width: navWidth, padding: navPadding }}
            className="pointer-events-auto flex items-center justify-between bg-white/40 backdrop-blur-2xl border border-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.05)] rounded-[2rem] max-w-6xl transition-all duration-500 overflow-hidden"
          >
        {/* Animated Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center text-white"
          >
            <Sparkles size={20} fill="currentColor" />
          </motion.div>
          <span className="font-black tracking-tighter text-xl text-black uppercase">Edge.</span>
        </Link>

        {/* Floating Link Pills */}
        <div className="hidden md:flex items-center bg-gray-200/50 p-1.5 rounded-full relative">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                onMouseLeave={() => setHoveredPath(null)}
                className="relative px-6 py-2.5 flex items-center gap-2 text-sm font-bold transition-all z-10"
              >
                <span className={`flex items-center gap-2 transition-colors duration-300 ${
                  isActive || hoveredPath === link.path ? 'text-black' : 'text-gray-500'
                }`}>
                  {link.icon}
                  {link.name}
                </span>

                {/* The "Sliding Liquid" Highlighter */}
                {hoveredPath === link.path && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white shadow-sm rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div 
                    layoutId="active-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* 3D Interactive Action Button */}
        <motion.button
          whileHover={{ 
            scale: 1.02, 
            rotateX: 10, 
            rotateY: -10,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
          }}
          style={{ perspective: 1000 }}
          className="bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 group"
        >
          Get Started
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronRight size={18} />
          </motion.span>
        </motion.button>
      </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;