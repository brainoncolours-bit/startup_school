import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RocketCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    document.addEventListener('mouseover', (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('cursor-pointer') || e.target.classList.contains('hover:bg-yellow-400')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    });

    document.addEventListener('mouseout', () => setIsHovered(false));

    return () => {
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div 
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
        {/* Rocket Body - Main Structure */}
        <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="relative z-20">
          {/* Rocket Nose Cone */}
          <motion.path 
            d="M8 0 L11 4 L5 4 Z" 
            fill="#1da89d" 
            stroke="#000" 
            strokeWidth="0.4"
            animate={{ fill: ["#1da89d", "#2dcfbd", "#1da89d"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Rocket Body */}
          <motion.rect 
            x="5.5" 
            y="4" 
            width="5" 
            height="6" 
            fill="#43646b" 
            stroke="#000" 
            strokeWidth="0.4"
            animate={{ fill: ["#43646b", "#5a7f87", "#43646b"] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          
          {/* Window - Pulsing */}
          <motion.circle 
            cx="8" 
            cy="6.5" 
            r="1" 
            fill="#f9bb1a" 
            stroke="#fff" 
            strokeWidth="0.3"
            animate={{ 
              fill: ["#f9bb1a", "#fff", "#f9bb1a"],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          
          {/* Left Fin */}
          <motion.path 
            d="M5.5 7 L3 9 L5.5 9 Z" 
            fill="#a5cb3a" 
            stroke="#000" 
            strokeWidth="0.4"
            animate={{ fill: ["#a5cb3a", "#c4f04d", "#a5cb3a"] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
          
          {/* Right Fin */}
          <motion.path 
            d="M10.5 7 L13 9 L10.5 9 Z" 
            fill="#a5cb3a" 
            stroke="#000" 
            strokeWidth="0.4"
            animate={{ fill: ["#a5cb3a", "#c4f04d", "#a5cb3a"] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
          
          {/* Flame - Cyan Layer */}
          <motion.path 
            d="M6 10 L7 12 L8 10.5 L9 12 L10 10 L9 11 L8 13 L7 11 Z" 
            fill="#1da89d"
            animate={{
              scaleY: [1, 1.3, 0.9, 1.2, 1],
              opacity: [0.9, 0.6, 0.8, 0.7, 0.9],
              x: [0, 1, -1, 0]
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Flame - Lime Core */}
          <motion.path 
            d="M6.5 10 L7.5 11.5 L8 10.5 L8.5 11.5 L9.5 10 L8 12 Z" 
            fill="#a5cb3a"
            animate={{
              scaleY: [1, 1.4, 0.8, 1.3, 1],
              opacity: [1, 0.7, 0.9, 0.8, 1],
              x: [0, -1, 1, 0]
            }}
            transition={{
              duration: 0.12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Flame - Hot Core */}
          <motion.circle 
            cx="8" 
            cy="10.5" 
            r="0.8"
            fill="#f9bb1a"
            animate={{
              scale: [1, 1.5, 0.8, 1.4, 1],
              opacity: [1, 0.5, 0.9, 0.6, 1],
              fill: ["#f9bb1a", "#fff", "#f9bb1a", "#ffd700", "#f9bb1a"]
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
        
        {/* Exhaust Glow - Enhanced */}
        <motion.div
          animate={{
            scale: [1, 1.8, 1.2, 1.6, 1],
            opacity: [0.4, 0.15, 0.3, 0.2, 0.4],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-5 bg-gradient-to-b from-[#a5cb3a] via-[#1da89d] to-transparent rounded-full blur-[3px] rotate-45"
        />
        
        {/* Additional Glow Layer */}
        <motion.div
          animate={{
            scale: [1.2, 2, 1.5, 1.8, 1.2],
            opacity: [0.2, 0.05, 0.15, 0.08, 0.2],
          }}
          transition={{
            duration: 0.25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-6 bg-gradient-to-b from-[#f9bb1a] to-transparent rounded-full blur-[4px] rotate-45"
        />
        
        {/* Spark Particles - More Dynamic */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, -10 - i * 4, -5 - i * 3],
              y: [0, -10 - i * 4, -5 - i * 3],
              opacity: [1, 0, 0],
              scale: [1, 0.5, 0]
            }}
            transition={{
              duration: 0.5 + i * 0.1,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeOut"
            }}
            className={`absolute bottom-0 left-1/2 w-0.5 h-0.5 rounded-full ${
              i % 2 === 0 ? 'bg-[#1da89d]' : 'bg-[#a5cb3a]'
            }`}
          />
        ))}
        
        {/* Speed Lines/Vapor Trail */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`trail-${i}`}
            animate={{
              x: [0, -15 - i * 5],
              y: [0, -15 - i * 5],
              opacity: [0.4, 0],
              scaleX: [0.5, 1.5, 0]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeOut"
            }}
            className="absolute bottom-1 left-1 w-3 h-0.5 bg-gradient-to-r from-[#1da89d]/60 to-transparent rounded-full rotate-45"
          />
        ))}
        
        {/* Hover Effect - Energy Ring */}
        {isHovered && (
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ 
              scale: [1, 2.5, 1],
              opacity: [0.5, 0, 0.5],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 border-2 border-[#f9bb1a] rounded-full"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
