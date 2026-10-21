import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

/**
 * App Root Component
 * 
 * Provides top-level client-side routing via React Router.
 * Configured for Module 1 (Authentication & Login UI Foundation).
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route points to Login page */}
        <Route path="/" element={<Login />} />
        
        {/* Explicit /login route */}
        <Route path="/login" element={<Login />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
