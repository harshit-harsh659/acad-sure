import React from 'react';
import AcadSureLogo3D from '../components/common/AcadSureLogo3D';
import LoginForm from '../components/auth/LoginForm';

/**
 * Login Page Component
 * 
 * Clean, focused dark-mode authentication view for acad-sure:
 * - Displays the 3D animated acad-sure logo
 * - App title: acad-sure
 * - Minimal, centered login card with dark aesthetics
 * - Free of extraneous text clutter
 */
export default function Login() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Ambient background lighting glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-indigo-900/15 via-cyan-950/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Top spacer / subtle environment indicator */}
      <div className="w-full max-w-md pt-2 flex items-center justify-between text-[11px] text-slate-500 z-10">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]"></span>
          Platform Online
        </span>
        <span className="font-mono text-slate-500 text-[10px]">v1.0.0</span>
      </div>

      {/* Main Centered Content (3D Logo + App Name + Login Div) */}
      <main className="w-full max-w-md my-auto py-6 flex flex-col items-center z-10">
        {/* Brand Header with 3D Animated Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <AcadSureLogo3D size={84} interactive={true} />
          
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-3 flex items-center justify-center">
            acad<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">-sure</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium tracking-wide mt-1">
            Student Data Management &amp; Verification
          </p>
        </div>

        {/* The Focused Login Div */}
        <div className="w-full">
          <LoginForm />
        </div>
      </main>

      {/* Minimal Bottom Footer */}
      <footer className="w-full max-w-md pb-3 text-center text-[11px] text-slate-500 z-10">
        <p>acad-sure &bull; Authorized Institutional Access</p>
      </footer>
    </div>
  );
}
