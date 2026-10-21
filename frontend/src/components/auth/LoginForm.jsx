import React, { useState } from 'react';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Info,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import authService from '../../services/authService';

/**
 * LoginForm Component (Dark Shades Theme)
 * 
 * Implements a secure, accessible, controlled authentication form
 * in rich dark mode aesthetics for acad-sure.
 */
export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Field validation and API errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiSuccessNotice, setApiSuccessNotice] = useState(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Demo credentials for the 3 prototype roles
  const demoAccounts = [
    {
      role: 'Institution',
      username: 'inst_iitd_101',
      password: 'InstSecure#2026',
      badge: 'College Nodal Officer',
    },
    {
      role: 'AICTE Admin',
      username: 'aicte_admin',
      password: 'AicteAdmin@2026',
      badge: 'Regulatory Admin',
    },
    {
      role: 'Verifier',
      username: 'verifier_agency_01',
      password: 'VerifierPass$2026',
      badge: 'Credential Verifier',
    },
  ];

  const handleAutoFill = (acc) => {
    setUsername(acc.username);
    setPassword(acc.password);
    setErrors({});
    if (apiSuccessNotice) setApiSuccessNotice(null);
  };

  // Clear specific field error when user types
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username || errors.auth) {
      setErrors((prev) => ({ ...prev, username: '', auth: '' }));
    }
    if (apiSuccessNotice) setApiSuccessNotice(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password || errors.auth) {
      setErrors((prev) => ({ ...prev, password: '', auth: '' }));
    }
    if (apiSuccessNotice) setApiSuccessNotice(null);
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Institutional ID or username is required.';
    }

    if (!password) {
      newErrors.password = 'Password is required to authenticate.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setApiSuccessNotice(null);

    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await authService.login({ username, password });

      setApiSuccessNotice({
        message: 'Backend responded successfully.',
        role: response?.role || 'Assigned by backend',
        details:
          'Authentication response received. Dashboard routing will be activated in subsequent modules once session validation is finalized.',
      });
    } catch (err) {
      setErrors({
        auth:
          err.message ||
          'Authentication failed. Please verify your institutional credentials and ensure the backend service is running.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Form Container Card in Dark Shades */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(6,182,212,0.12)] border border-slate-800/90 p-7 sm:p-9 transition-all">
        {/* Header */}
        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Sign In
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Enter your credentials to access the workspace
          </p>
        </div>

        {/* Global / Authentication Error Alert */}
        {errors.auth && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-800/70 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 shadow-sm"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-300">Authentication Alert</p>
              <p className="mt-0.5 leading-relaxed text-red-300/90 text-xs">
                {errors.auth}
              </p>
              <div className="mt-2 pt-2 border-t border-red-800/50 text-[11px] text-red-300/80 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Django API server at{' '}
                  <code className="bg-red-900/50 px-1 py-0.5 rounded font-mono text-[10px] text-red-200">
                    {import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'}
                  </code>{' '}
                  is unlinked/offline.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* API Response Notice (When backend connects) */}
        {apiSuccessNotice && (
          <div
            role="status"
            className="mb-5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/70 text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-300">{apiSuccessNotice.message}</p>
              <p className="mt-0.5 text-xs text-emerald-300/90">{apiSuccessNotice.details}</p>
              <p className="mt-1 text-xs font-medium text-emerald-200">
                Assigned Role:{' '}
                <span className="font-mono bg-emerald-900/60 px-1.5 py-0.5 rounded text-emerald-300">
                  {apiSuccessNotice.role}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Username / Institutional Email */}
          <div>
            <label
              htmlFor="username"
              className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
            >
              Institutional ID or Username <span className="text-cyan-400">*</span>
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                disabled={isSubmitting}
                value={username}
                onChange={handleUsernameChange}
                placeholder="e.g. inst_iitd_101 or aicte_admin"
                aria-required="true"
                aria-invalid={errors.username ? 'true' : 'false'}
                aria-describedby={errors.username ? 'username-error' : undefined}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border rounded-lg text-sm text-white placeholder-slate-500 focus:bg-slate-950 transition-colors duration-150 ${
                  errors.username
                    ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                    : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                } disabled:bg-slate-900 disabled:text-slate-500 disabled:cursor-not-allowed`}
              />
            </div>
            {errors.username && (
              <p id="username-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.username}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300"
              >
                Password <span className="text-cyan-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                disabled={isSubmitting}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter account password"
                aria-required="true"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className={`w-full pl-10 pr-11 py-2.5 bg-slate-950/80 border rounded-lg text-sm text-white placeholder-slate-500 focus:bg-slate-950 transition-colors duration-150 ${
                  errors.password
                    ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                    : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                } disabled:bg-slate-900 disabled:text-slate-500 disabled:cursor-not-allowed`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-cyan-400 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-slate-900 cursor-pointer"
              />
              <span className="text-xs text-slate-400">
                Remember this device for 30 days
              </span>
            </label>
          </div>

          {/* Primary Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>
        </form>

        {/* Prototype Demo Credentials Helper */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Demo Credentials (3 Roles)
            </p>
            <span className="text-[10px] text-cyan-400 font-medium bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.5 rounded">
              Click to Auto-fill
            </span>
          </div>

          <div className="space-y-1.5">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleAutoFill(acc)}
                className="w-full text-left p-2 rounded-lg bg-slate-950/60 hover:bg-slate-800/50 border border-slate-800/90 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                title={`Click to fill credentials for ${acc.role}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {acc.role}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {acc.badge}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {acc.username} • {acc.password}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                  Use &rarr;
                </span>
              </button>
            ))}
          </div>

          <p className="text-[10px] text-slate-500 text-center mt-2.5">
            Role privileges are strictly verified by backend server policies.
          </p>
        </div>

        {/* Footer Security Notice */}
        <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"></span>
            Authorized access only
          </span>
          <span className="text-slate-500 font-mono text-[10px]">TLS 256-bit Encrypted</span>
        </div>
      </div>

      {/* Forgot Password Modal (Dark Mode) */}
      {showForgotModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div className="bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-700/80">
            <div className="w-10 h-10 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Credential Recovery</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              In accordance with AICTE institutional security guidelines, password resets must be
              facilitated through your nominated Institutional Nodal Officer or the AICTE National
              Support Desk.
            </p>
            <div className="mt-4 p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300">
              <span className="font-semibold text-white">Support Desk:</span>
              <br />
              <span className="font-mono text-cyan-300">support-apaar@aicte-india.org</span>
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold transition-all"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
