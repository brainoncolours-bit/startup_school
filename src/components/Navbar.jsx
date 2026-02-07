import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Mail, BookOpenText } from 'lucide-react';

import Chatbot from './Chatbot';
import SnakeGame from './SnakeGame';

const navItems = [
  { name: 'Home', path: '/', icon: Home, color: 'from-fuchsia-500 to-purple-600', shadow: 'shadow-fuchsia-500/40' },
  { name: 'About', path: '/about', icon: BookOpenText, color: 'from-orange-400 to-red-500', shadow: 'shadow-orange-500/40' },
  { name: 'Gallery', path: '/blog', icon: Layers, color: 'from-cyan-400 to-blue-500', shadow: 'shadow-cyan-500/40' },
  { name: 'Contact', path: '/contact', icon: Mail, color: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-500/40' },
];

const VibrantAdaptiveNav = ({ isLightBg = true }) => {
  const [hovered, setHovered] = useState(null);
  const location = useLocation();

  // Theme logic based on background color
  const borderColor = isLightBg ? 'border-white/10' : 'border-white/20';

  return (
    <>
      {/* --- DESKTOP NAVIGATION (Right Side) --- */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:block">
        <motion.div
          animate={{ backgroundColor: isLightBg ? 'rgba(24, 24, 27, 0.9)' : 'rgba(255, 255, 255, 0.1)' }}
          className={`relative flex flex-col gap-3 p-4 rounded-[2.5rem] backdrop-blur-3xl border ${borderColor} shadow-2xl transition-colors duration-500`}
        >
          {/* Animated Background Blob for Desktop */}
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                layoutId="vibrant-blob"
                className={`absolute left-2.5 right-2.5 z-0 rounded-2xl bg-gradient-to-br shadow-lg ${navItems[hovered].color} ${navItems[hovered].shadow}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                style={{
                  height: '52px',
                  top: hovered * 64 + 16, // Adjusted for standard w-12/h-12 spacing
                }}
              />
            )}
          </AnimatePresence>

          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            const isHovered = hovered === idx;

            return (
              <Link
                key={item.name}
                to={item.path}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className="relative z-10 w-12 h-12 flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    scale: isHovered || isActive ? 1.15 : 1,
                    color: (isHovered || isActive) ? "#ffffff" : (isLightBg ? "#71717a" : "#ffffff66")
                  }}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: -25 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="absolute right-full mr-6 px-4 py-2 rounded-xl bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl border border-white/10 whitespace-nowrap"
                    >
                      <span className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className={`absolute -right-1.5 w-1.5 h-6 rounded-full bg-gradient-to-b ${item.color}`}
                  />
                )}
              </Link>
            );
          })}

          <div className={`h-[1px] w-8 mx-auto my-1 rounded-full ${isLightBg ? 'bg-white/10' : 'bg-white/20'}`} />

          <div className="flex flex-col items-center gap-3">
            <div className="cursor-pointer transform transition-transform hover:scale-110">
              <Chatbot />
            </div>
            <div className="cursor-pointer transform transition-transform hover:scale-110">
              <SnakeGame />
            </div>
          </div>
        </motion.div>
      </nav>

      {/* --- MOBILE NAVIGATION (Bottom Bar) --- */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99] lg:hidden w-full px-4 flex justify-center">
        <motion.div
          animate={{ backgroundColor: isLightBg ? 'rgba(24, 24, 27, 0.95)' : 'rgba(255, 255, 255, 0.1)' }}
          className={`relative flex items-center justify-between gap-2 px-4 py-2 rounded-full backdrop-blur-3xl border ${borderColor} shadow-2xl max-w-full overflow-hidden`}
        >
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative z-10 w-11 h-11 flex-shrink-0 flex items-center justify-center"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      color: isActive ? "#ffffff" : (isLightBg ? "#71717a" : "#ffffff66")
                    }}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>

                  {/* Active Indicator - Horizontal for Mobile */}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator-mobile"
                      className={`absolute -bottom-1 w-5 h-1 rounded-full bg-gradient-to-r ${item.color}`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Separator */}
          <div className={`w-[1px] h-6 flex-shrink-0 ${isLightBg ? 'bg-white/10' : 'bg-white/20'}`} />

          {/* Special Buttons (Chat & Game) */}
          <div className="flex items-center gap-1">
            <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center scale-90 sm:scale-100 cursor-pointer transform transition-transform hover:scale-110">
               <Chatbot />
            </div>
            <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center scale-90 sm:scale-100 cursor-pointer transform transition-transform hover:scale-110">
               <SnakeGame />
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default VibrantAdaptiveNav;