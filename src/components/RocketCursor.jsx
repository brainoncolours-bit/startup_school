import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RocketCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('mousemove', updateMouse);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updateMouse);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('cursor-pointer') || 
        target.classList.contains('hover:bg-yellow-400')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', () => setIsHovered(false));

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Return null if mobile to prevent rendering entirely
  if (isMobile) return null;

  return (
    <motion.div 
      // Use hidden md:block as a double safety layer
      className="fixed z-[999] pointer-events-none hidden md:block"
      animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
    >
      <motion.div
        animate={{ 
          rotate: -45,
          scale: isHovered ? 1.4 : 1,
          y: [0, -3, 0],
        }}
        transition={{ 
          scale: { duration: 0.2 },
          y: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative w-6 h-6"
      >
        {/* Rocket Body */}
        <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="relative z-20">
          <motion.path d="M8 0 L11 4 L5 4 Z" fill="#1da89d" stroke="#000" strokeWidth="0.4" />
          <motion.rect x="5.5" y="4" width="5" height="6" fill="#43646b" stroke="#000" strokeWidth="0.4" />
          <motion.circle cx="8" cy="6.5" r="1" fill="#f9bb1a" stroke="#fff" strokeWidth="0.3" />
          <motion.path d="M5.5 7 L3 9 L5.5 9 Z" fill="#a5cb3a" stroke="#000" strokeWidth="0.4" />
          <motion.path d="M10.5 7 L13 9 L10.5 9 Z" fill="#a5cb3a" stroke="#000" strokeWidth="0.4" />
          
          {/* Flame Layers */}
          <motion.path 
            d="M6 10 L7 12 L8 10.5 L9 12 L10 10 L9 11 L8 13 L7 11 Z" 
            fill="#1da89d"
            animate={{ scaleY: [1, 1.3, 1], opacity: [0.9, 0.6, 0.9] }}
            transition={{ duration: 0.15, repeat: Infinity }}
          />
        </svg>

        {/* Exhaust Glow */}
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-5 bg-gradient-to-b from-[#a5cb3a] to-transparent rounded-full blur-[3px] rotate-45"
        />

        {/* Energy Ring on Hover */}
        {isHovered && (
          <motion.div
            animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 border-2 border-[#f9bb1a] rounded-full"
          />
        )}
      </motion.div>
    </motion.div>
  );
}