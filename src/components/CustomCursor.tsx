import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState('');

  useEffect(() => {
    // Check if device supports hover / desktop pointer
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.documentElement.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, [role="button"], input, textarea, select, .cursor-hover');
      const textHover = target.closest('[data-cursor-text]');

      if (textHover) {
        setHoverText(textHover.getAttribute('data-cursor-text') || '');
      } else {
        setHoverText('');
      }

      if (clickable) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden lg:block">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed rounded-full border border-violet-400/50 mix-blend-difference"
        animate={{
          x: position.x - (isHovered ? 28 : 16),
          y: position.y - (isHovered ? 28 : 16),
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          scale: isClicking ? 0.8 : 1,
          backgroundColor: isHovered ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovered ? 'rgba(167, 139, 250, 0.8)' : 'rgba(255, 255, 255, 0.4)'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed rounded-full bg-violet-400 shadow-[0_0_10px_#8b5cf6]"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          width: isHovered ? 6 : 6,
          height: isHovered ? 6 : 6,
          opacity: isHovered ? 0.5 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Optional Hover Text Tooltip */}
      {hoverText && (
        <motion.div
          className="fixed text-[10px] uppercase tracking-widest font-mono text-violet-200 bg-violet-950/90 px-2 py-0.5 rounded border border-violet-500/30 whitespace-nowrap"
          animate={{
            x: position.x + 16,
            y: position.y + 16,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {hoverText}
        </motion.div>
      )}
    </div>
  );
};
