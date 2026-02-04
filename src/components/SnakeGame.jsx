import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, X, RotateCcw, Trophy, Zap } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

const SnakeGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoopRef = useRef(null);

  // Prevent background scrolling when game is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const newHead = {
        x: prevSnake[0].x + direction.x,
        y: prevSnake[0].y + direction.y
      };

      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, score, highScore, generateFood]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e) => {
      // PREVENT PAGE SCROLLING: Logic added here
      const keysToBlock = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
      if (keysToBlock.includes(e.key)) {
        e.preventDefault();
      }

      if (gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver, isOpen]);

  useEffect(() => {
    if (!isOpen || gameOver || isPaused) return;

    gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoopRef.current);
  }, [isOpen, moveSnake, gameOver, isPaused]);

  return (
    <>
      {/* Game Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="  right-4 z-50 w-14 h-14 bg-gradient-to-br from-[#ef6925] to-[#e1ff00] rounded-full flex items-center justify-center text-black shadow-2xl border-2 border-black"
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <Gamepad2 size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 md:inset-auto md:bottom-8 md:right-8 z-[60] flex items-center justify-center md:block"
          >
            {/* Backdrop for mobile to ensure focus */}
            <div className="fixed inset-0 bg-black/60 md:hidden" onClick={() => setIsOpen(false)} />
            
            <div 
              className="relative bg-black border-4 border-[#ef6925] shadow-[15px_15px_0px_0px_rgba(239,105,37,1)] overflow-hidden"
              style={{ width: GRID_SIZE * CELL_SIZE + 40 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#ef6925] to-[#e1ff00] p-3 flex items-center justify-between border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="text-black" size={20} />
                  <h3 className="font-black text-black text-sm uppercase">Snake Protocol</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-black hover:bg-black hover:text-white transition-colors border-2 border-black p-0.5">
                  <X size={16} />
                </button>
              </div>

              {/* Stats Bar */}
              <div className="bg-black border-b-2 border-[#ef6925] p-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-[#e1ff00]" />
                  <span className="font-mono text-[10px] text-[#e1ff00] font-bold">SCORE: {score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={14} className="text-[#ef6925]" />
                  <span className="font-mono text-[10px] text-white font-bold">BEST: {highScore}</span>
                </div>
                <button onClick={resetGame} className="bg-[#ef6925] text-black p-1 hover:bg-[#e1ff00] rounded-sm">
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Play Area */}
              <div className="p-5 bg-black">
                <div 
                  className="bg-zinc-900 border-2 border-[#ef6925]/30 relative"
                  style={{ 
                    width: GRID_SIZE * CELL_SIZE, 
                    height: GRID_SIZE * CELL_SIZE,
                    backgroundImage: 'linear-gradient(rgba(239, 105, 37, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 105, 37, 0.1) 1px, transparent 1px)',
                    backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
                  }}
                >
                  {snake.map((segment, index) => (
                    <div
                      key={index}
                      className={`absolute ${index === 0 ? 'bg-[#e1ff00] z-10' : 'bg-[#ef6925]'}`}
                      style={{
                        left: segment.x * CELL_SIZE,
                        top: segment.y * CELL_SIZE,
                        width: CELL_SIZE - 2,
                        height: CELL_SIZE - 2,
                        border: '1px solid black'
                      }}
                    />
                  ))}

                  <motion.div
                    className="absolute bg-white border-2 border-[#e1ff00]"
                    style={{
                      left: food.x * CELL_SIZE,
                      top: food.y * CELL_SIZE,
                      width: CELL_SIZE - 2,
                      height: CELL_SIZE - 2
                    }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  />

                  {/* Overlays */}
                  {gameOver && (
                    <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center border-4 border-[#e1ff00] z-20">
                      <h2 className="text-2xl font-black text-[#ef6925] uppercase italic">CRASHED</h2>
                      <p className="text-[#e1ff00] font-mono text-sm mb-4">SCORE: {score}</p>
                      <button onClick={resetGame} className="bg-[#e1ff00] text-black font-black px-4 py-2 uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Reboot
                      </button>
                    </div>
                  )}

                  {isPaused && !gameOver && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                      <h3 className="text-xl font-black text-[#e1ff00] uppercase">PAUSED</h3>
                    </div>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-[#ef6925]/10 border border-[#ef6925]/50 p-2 text-center text-[9px] text-white/70 font-mono">
                    ARROWS: MOVE
                  </div>
                  <div className="bg-[#e1ff00]/10 border border-[#e1ff00]/50 p-2 text-center text-[9px] text-white/70 font-mono">
                    SPACE: PAUSE
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SnakeGame;