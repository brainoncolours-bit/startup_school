import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
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

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const generateFood = useCallback(() => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE)
  }), []);

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
      const newHead = { x: prevSnake[0].x + direction.x, y: prevSnake[0].y + direction.y };
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE || prevSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
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
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
      if (gameOver) return;
      if (e.key === 'ArrowUp' && direction.y === 0) setDirection({ x: 0, y: -1 });
      if (e.key === 'ArrowDown' && direction.y === 0) setDirection({ x: 0, y: 1 });
      if (e.key === 'ArrowLeft' && direction.x === 0) setDirection({ x: -1, y: 0 });
      if (e.key === 'ArrowRight' && direction.x === 0) setDirection({ x: 1, y: 0 });
      if (e.key === ' ') setIsPaused(p => !p);
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
      <motion.button
        onClick={() => setIsOpen(true)}
        className="relative z-50 w-10 h-10 md:w-13 md:h-13 bg-gradient-to-br from-[#ef6925] to-[#e1ff00] rounded-full flex items-center justify-center text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Gamepad2 size={20} />
      </motion.button>

      {isOpen && createPortal(
        <AnimatePresence>
          <motion.div className="fixed inset-0 flex items-center justify-center z-[99999] pointer-events-none">
            <div className="absolute inset-0 bg-black/80 pointer-events-auto" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative bg-black border-4 border-[#ef6925] shadow-[10px_10px_0px_0px_rgba(239,105,37,1)] pointer-events-auto"
              style={{ width: GRID_SIZE * CELL_SIZE + 40, maxWidth: '90vw', maxHeight: '90vh' }}
            >
              <div className="bg-gradient-to-r from-[#ef6925] to-[#e1ff00] p-2 flex justify-between items-center border-b-2 border-black">
                <span className="font-black text-black text-xs uppercase flex items-center gap-2"><Gamepad2 size={14}/> SNAKE_PROTOCOL</span>
                <button onClick={() => setIsOpen(false)} className="text-black border border-black p-0.5 hover:bg-black hover:text-white transition-colors"><X size={14} /></button>
              </div>

              <div className="p-4 bg-black flex flex-col items-center">
                <div className="w-full flex justify-between mb-2 font-mono text-[10px] text-[#e1ff00] uppercase tracking-tighter">
                  <span>Score: {score}</span>
                  <span>High: {highScore}</span>
                </div>

                {/* Grid container handles its own scaling */}
                <div className="bg-zinc-900 relative border-2 border-zinc-800 overflow-hidden"
                     style={{
                        aspectRatio: '1/1',
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                     }}>

                  {/* Food */}
                  <motion.div
                    className="bg-white border-2 border-[#e1ff00]"
                    style={{
                        gridColumn: food.x + 1,
                        gridRow: food.y + 1
                    }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  />

                  {/* Snake */}
                  {snake.map((segment, i) => (
                    <div
                        key={i}
                        className={`${i === 0 ? 'bg-[#e1ff00] z-10' : 'bg-[#ef6925]'}`}
                        style={{
                            gridColumn: segment.x + 1,
                            gridRow: segment.y + 1,
                            border: '1px solid black'
                        }}
                    />
                  ))}

                  {/* Game Over Overlay */}
                  {gameOver && (
                    <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20">
                      <h2 className="text-[#ef6925] font-black italic text-3xl">CRASHED</h2>
                      <button
                        onClick={resetGame}
                        className="mt-4 bg-[#e1ff00] px-6 py-2 text-xs font-black text-black hover:bg-white transition-colors"
                      >
                        REBOOT_SYSTEM
                      </button>
                    </div>
                  )}

                  {/* Pause Overlay */}
                  {isPaused && !gameOver && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                      <span className="text-[#e1ff00] font-black italic animate-pulse">PAUSED</span>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-[9px] text-zinc-500 font-mono uppercase">Use Arrows to Move | Space to Pause</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default SnakeGame;