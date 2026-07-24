import React, { useEffect, useState } from 'react';

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Ambient background glow following mouse */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.07), transparent 80%)`,
        }}
      />

      {/* Floating Dot Pointer */}
      <div
        className={`pointer-events-none fixed top-0 left-0 z-50 rounded-full transition-transform duration-100 ease-out hidden lg:block ${
          isHovered
            ? 'w-8 h-8 bg-blue-500/20 border border-blue-500 -translate-x-1/2 -translate-y-1/2 backdrop-blur-xs scale-125'
            : 'w-3 h-3 bg-blue-600 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50'
        }`}
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

export default CursorGlow;
