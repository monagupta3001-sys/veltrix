import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, CheckCircle2, Lock, Mail, Phone, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const DarkSignInModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, login, logout, navigateTo } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState(user.name || 'Mona Gupta');
  const [email, setEmail] = useState(user.email || 'monagupta3001@gmail.com');
  const [phone, setPhone] = useState(user.phone || '+91 98765 43210');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(name, email, phone);
      setIsLoading(false);
      setIsAuthModalOpen(false);
    }, 600);
  };

  const handleQuickDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('Mona Gupta', 'monagupta3001@gmail.com', '+91 98765 43210');
      setIsLoading(false);
      setIsAuthModalOpen(false);
    }, 400);
  };

  const handleShopNowGuest = () => {
    setIsAuthModalOpen(false);
    navigateTo('home');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Outer Card with Dark Theme and Custom Animated Glowing Aura */}
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden">
        {/* Animated glowing ambient orbs */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-violet-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Website Logo & Brand Lockup */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="relative flex items-center justify-center p-2 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-inner group">
            <img
              src="/assets/aistudio/Gemini_Generated_Image_4pyjhv4pyjhv4pyj_2bb52d66.png"
              alt="Veltrix Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('/public/')) {
                  target.src = '/public/assets/aistudio/Gemini_Generated_Image_4pyjhv4pyjhv4pyj_2bb52d66.png';
                }
              }}
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
            {user.isLoggedIn
              ? `Welcome, ${user.name.split(' ')[0]}`
              : mode === 'login'
              ? 'Sign in to Veltrix'
              : 'Create Your Account'}
          </h2>

          <p className="text-xs text-slate-400 max-w-xs">
            {user.isLoggedIn
              ? 'Manage your SuperCoins, active shipments & addresses'
              : 'Enjoy 15-min delivery, member discounts & Diwali Dhamaka offers'}
          </p>
        </div>

        {/* Already Logged In State */}
        {user.isLoggedIn ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Account Name</span>
                <span className="text-xs font-bold text-white">{user.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Email</span>
                <span className="text-xs font-mono text-cyan-400">{user.email}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400">Veltrix SuperCoins</span>
                <span className="text-sm font-black text-amber-400">🪙 {user.superCoins}</span>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={handleShopNowGuest}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
              >
                Shop Now
              </button>
              <button
                type="button"
                onClick={logout}
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold text-xs rounded-xl transition-colors border border-slate-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Dark Theme Sign In Form */
          <div className="space-y-4">
            {/* Mode Switcher Tabs */}
            <div className="flex p-1 bg-slate-900/90 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  mode === 'register'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                New Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 block">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mona Gupta"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-9 pr-3 py-2 text-white outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-slate-300 block">Email or Mobile Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com / +91 Mobile"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-9 pr-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300 block">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-9 pr-10 py-2 text-white outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons: Sign In and Shop Now */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:brightness-110 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Sign In to Veltrix' : 'Create Veltrix Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* 1-Click Instant Demo Login */}
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>1-Click Quick Demo Sign In</span>
                </button>
              </div>
            </form>

            {/* Direct Shop Now Escape Option */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Just want to look around?</span>
              <button
                type="button"
                onClick={handleShopNowGuest}
                className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <span>Shop Now as Guest</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
