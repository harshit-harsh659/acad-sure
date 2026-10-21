import React, { useState, useRef } from 'react';

/**
 * AcadSureLogo3D Component
 * 
 * An interactive, state-of-the-art 3D animated emblem for acad-sure.
 * Features:
 * - Full CSS 3D perspective and `preserve-3d` layered depth
 * - Isometric faceted geometry with dark sapphire & neon cyan accents
 * - Central stylized "A" monogram with cryptographic verification shield
 * - Ambient 3D floating animation with interactive mouse parallax/tilt response
 * - Dynamic radiant back-glow and metallic specular reflections
 */
export default function AcadSureLogo3D({ size = 80, interactive = true }) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 12, y: -14 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate smooth 3D tilt angles (max +/- 25 deg)
    const rotateY = (mouseX / (rect.width / 2)) * 24;
    const rotateX = -(mouseY / (rect.height / 2)) * 24;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 10, y: -14 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center cursor-pointer select-none perspective-1000 py-2"
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label="acad-sure 3D Logo"
    >
      {/* Radiant ambient back-glow ring */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-indigo-500/30 blur-xl animate-pulse-glow pointer-events-none"
        style={{ transform: 'scale(1.35)' }}
      />

      {/* 3D Root Container */}
      <div
        className={`w-full h-full transform-style-3d transition-transform duration-300 ease-out ${
          !isHovered ? 'animate-float-3d' : ''
        }`}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : undefined,
        }}
      >
        {/* Layer 1 (Base Shadow Plane - Deep in Z space) */}
        <div
          className="absolute inset-2 rounded-2xl bg-cyan-950/60 blur-md transform-style-3d pointer-events-none"
          style={{ transform: 'translateZ(-30px)' }}
        />

        {/* Layer 2 (Back Isometric Housing) */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-900 via-navy-950 to-black border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transform-style-3d flex items-center justify-center"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Subtle circuit line accents */}
          <div className="absolute inset-1 rounded-xl border border-slate-800/80 pointer-events-none opacity-60" />
        </div>

        {/* Layer 3 (Middle Gem / 3D Shield Plane - Elevated in Z space) */}
        <div
          className="absolute inset-1.5 rounded-xl bg-gradient-to-tr from-navy-900/90 via-slate-900/95 to-cyan-950/80 border border-cyan-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transform-style-3d flex items-center justify-center overflow-hidden"
          style={{ transform: 'translateZ(18px)' }}
        >
          {/* Diagonal Glass Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent pointer-events-none" />

          {/* SVG 3D Academic Crest & Monogram */}
          <svg
            viewBox="0 0 100 100"
            className="w-4/5 h-4/5 drop-shadow-[0_4px_12px_rgba(6,182,212,0.5)] transform-style-3d"
            style={{ transform: 'translateZ(12px)' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hexagonal Shield Outer Path */}
            <path
              d="M50 12 L82 28 V60 L50 88 L18 60 V28 Z"
              stroke="url(#shieldStrokeGrad)"
              strokeWidth="3.5"
              strokeLinejoin="round"
              fill="url(#shieldFillGrad)"
            />

            {/* Inner Isometric Cube / Academic Cap Structure */}
            <path
              d="M50 24 L72 35 L50 46 L28 35 Z"
              fill="url(#topFacetGrad)"
              stroke="#38bdf8"
              strokeWidth="1.2"
            />
            <path
              d="M28 35 L50 46 V72 L28 60 Z"
              fill="url(#leftFacetGrad)"
              stroke="#0284c7"
              strokeWidth="1.2"
            />
            <path
              d="M50 46 L72 35 V60 L50 72 Z"
              fill="url(#rightFacetGrad)"
              stroke="#06b6d4"
              strokeWidth="1.2"
            />

            {/* Central Holographic "A" & Verification Checkmark Motif */}
            <path
              d="M50 32 L60 56 H54 L52 51 H48 L46 56 H40 L50 32Z"
              fill="white"
              opacity="0.95"
            />
            <path
              d="M48.5 45 H51.5 L50 40 Z"
              fill="#0b132b"
            />
            
            {/* Verification Checkmark Floating at Base */}
            <path
              d="M44 65 L48 69 L57 60"
              stroke="#22d3ee"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="shieldStrokeGrad" x1="18" y1="12" x2="82" y2="88" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee" />
                <stop offset="0.5" stopColor="#38bdf8" />
                <stop offset="1" stopColor="#1e40af" />
              </linearGradient>

              <linearGradient id="shieldFillGrad" x1="50" y1="12" x2="50" y2="88" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0c1729" stopOpacity="0.9" />
                <stop offset="1" stopColor="#060b14" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="topFacetGrad" x1="28" y1="24" x2="72" y2="46" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="1" stopColor="#0284c7" stopOpacity="0.3" />
              </linearGradient>

              <linearGradient id="leftFacetGrad" x1="28" y1="35" x2="50" y2="72" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0369a1" stopOpacity="0.8" />
                <stop offset="1" stopColor="#0c1e3d" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="rightFacetGrad" x1="72" y1="35" x2="50" y2="72" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0891b2" stopOpacity="0.75" />
                <stop offset="1" stopColor="#083344" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Layer 4 (Top Hologram Node / Sparkle - Highest in Z space) */}
        <div
          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] transform-style-3d pointer-events-none"
          style={{ transform: 'translateZ(32px)' }}
        />
        <div
          className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] transform-style-3d pointer-events-none"
          style={{ transform: 'translateZ(26px)' }}
        />
      </div>
    </div>
  );
}
