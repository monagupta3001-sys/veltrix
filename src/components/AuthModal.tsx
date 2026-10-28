import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, ShieldCheck, Mail, Phone, Lock, User, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, login, logout } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState(user.name || 'Mona Gupta');
  const [email, setEmail] = useState(user.email || 'monagupta3001@gmail.com');
  const [phone, setPhone] = useState(user.phone || '+91 98765 43210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('7492');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name, email, phone);
    setIsAuthModalOpen(false);
  };

  const handleQuickLogin = () => {
    login('Mona Gupta', 'monagupta3001@gmail.com', '+91 98765 43210');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header with vibrant brand banner */}
        <div className="relative bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 p-6 text-white">
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-black tracking-tight">VELTRIX</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current" /> Prime Member
            </span>
          </div>

          <h3 className="text-xl font-bold">
            {user.isLoggedIn
              ? 'Your Veltrix Account'
              : mode === 'login'
              ? 'Sign in to Veltrix'
              : 'Create Veltrix Account'}
          </h3>
          <p className="text-xs text-sky-100 mt-1">
            Access 15-min delivery, track live orders & earn SuperCoins
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {user.isLoggedIn ? (
            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-cyan-600 text-white font-bold text-lg flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{user.name}</h4>
                  <p className="text-xs text-slate-500">{user.email}</p>
                  <p className="text-xs text-slate-500 font-mono">{user.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-[11px] text-amber-800 block font-semibold">
                    Veltrix SuperCoins
                  </span>
                  <span className="text-lg font-black text-amber-900 tabular-nums">
                    🪙 {user.superCoins}
                  </span>
                </div>
                <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                  <span className="text-[11px] text-cyan-800 block font-semibold">
                    Membership Tier
                  </span>
                  <span className="text-sm font-bold text-cyan-950 mt-1 block">
                    Diwali VIP
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
                >
                  Done
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="py-2.5 px-4 text-xs font-bold text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {mode === 'register' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mona Gupta"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Mobile Number (for SMS & OTP updates)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 outline-none font-mono focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-md transition-all mt-2"
              >
                {mode === 'login' ? 'Sign In to Account' : 'Create Free Account'}
              </button>

              {/* 1-Click Demo Login */}
              <button
                type="button"
                onClick={handleQuickLogin}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant 1-Click Demo Login</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setMode(mode === 'login' ? 'register' : 'login')
                  }
                  className="text-cyan-700 hover:text-cyan-900 font-semibold transition-colors cursor-pointer"
                >
                  {mode === 'login'
                    ? "New to Veltrix? Create an account"
                    : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
