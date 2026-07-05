import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'card'>('default');
  const dotRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is touch or fine pointer
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) {
      document.body.classList.add('custom-cursor-active');
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animating the cursor with lerp (0.1)
    let animationFrameId: number;
    const renderCursor = () => {
      const dx = mouseRef.current.x - cursorRef.current.x;
      const dy = mouseRef.current.y - cursorRef.current.y;
      
      cursorRef.current.x += dx * 0.15;
      cursorRef.current.y += dy * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cursorRef.current.x}px, ${cursorRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(renderCursor);
    };

    animationFrameId = requestAnimationFrame(renderCursor);

    // Hover state event listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target or any parent is a link/button/clickable
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button';

      // Check if target or parent is a product/portfolio card
      const isCard = target.closest('.cursor-card-trigger');

      if (isCard) {
        setCursorType('card');
      } else if (isClickable) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
        cursorType === 'card'
          ? 'w-16 h-16 bg-white'
          : cursorType === 'hover'
          ? 'w-10 h-10 bg-white opacity-80'
          : 'w-2.5 h-2.5 bg-white'
      }`}
      style={{
        transform: 'translate3d(0, 0, 0) translate(-50%, -50%)',
      }}
    >
      {cursorType === 'card' && (
        <span className="text-[10px] font-mono font-medium text-black tracking-wider uppercase select-none animate-fade-in">
          LIHAT
        </span>
      )}
    </div>
  );
}
