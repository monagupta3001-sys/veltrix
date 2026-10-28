import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingCart,
  ArrowRight,
  Zap,
  Sparkles,
  ChevronDown,
  Store,
  Tag,
  Package,
  HelpCircle,
  X,
  ExternalLink,
} from 'lucide-react';

export const EntryGatewayView: React.FC = () => {
  const { enterStore, cartCount, setIsAuthModalOpen, navigateTo, addToast } = useApp();

  const [loadingProgress, setLoadingProgress] = useState(15);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [sellerModalOpen, setSellerModalOpen] = useState(false);

  // Smooth loading progression that finishes in ~3 seconds, but user can click "Shop Now" anytime
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadingProgress(48), 600);
    const timer2 = setTimeout(() => setLoadingProgress(82), 1400);
    const timer3 = setTimeout(() => setLoadingProgress(100), 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleExploreDeals = () => {
    enterStore();
    navigateTo('budget-store', { budgetTier: 'under-99' });
  };

  const handleCategoryClick = (catId: string) => {
    setCategoriesDropdownOpen(false);
    enterStore();
    navigateTo('category', { categoryId: catId as any });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#070a14] text-slate-100 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Google AI Studio Style Aurora Mesh Gradients & Soft Cosmic Grid */}
      <div 
        className="absolute inset-0 cyber-grid pointer-events-none opacity-30" 
        style={{ maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)' }}
      />

      {/* Floating Organic Aurora Mesh Orbs (Gemini Blue, Electric Cyan, Neon Indigo, Warm Amber) */}
      <div className="absolute -top-20 left-1/4 w-[750px] h-[750px] bg-gradient-to-tr from-cyan-500/25 via-blue-600/25 to-transparent rounded-full blur-[150px] pointer-events-none animate-aurora-1" />
      <div className="absolute -bottom-32 right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-600/30 via-purple-600/25 to-transparent rounded-full blur-[170px] pointer-events-none animate-aurora-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-aurora-3" />

      {/* 2. Google AI Studio Style Shimmering Constellation Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-[18%] left-[12%] text-cyan-300 text-lg animate-sparkle" style={{ animationDelay: '0s' }}>
          ✦
        </div>
        <div className="absolute top-[32%] right-[16%] text-purple-300 text-sm animate-sparkle" style={{ animationDelay: '1.2s' }}>
          ✦
        </div>
        <div className="absolute bottom-[24%] left-[22%] text-amber-300 text-base animate-sparkle" style={{ animationDelay: '2.1s' }}>
          ✦
        </div>
        <div className="absolute top-[68%] right-[32%] text-sky-400 text-xs animate-sparkle" style={{ animationDelay: '0.8s' }}>
          ✦
        </div>
        <div className="absolute top-[12%] right-[38%] text-blue-300 text-sm animate-sparkle" style={{ animationDelay: '1.8s' }}>
          ✦
        </div>
        <div className="absolute bottom-[16%] right-[10%] text-indigo-300 text-base animate-sparkle" style={{ animationDelay: '2.7s' }}>
          ✦
        </div>
        <div className="absolute top-[48%] left-[8%] text-cyan-400 text-xs animate-sparkle" style={{ animationDelay: '3.1s' }}>
          ✦
        </div>
      </div>

      {/* 3. Top Header Bar (Matching Image 2) */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={enterStore}>
          <img
            src="/assets/aistudio/Gemini_Generated_Image_4pyjhv4pyjhv4pyj_2bb52d66.png"
            alt="Veltrix Logo"
            className="h-10 sm:h-12 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('/public/')) {
                target.src =
                  '/public/assets/aistudio/Gemini_Generated_Image_4pyjhv4pyjhv4pyj_2bb52d66.png';
              }
            }}
          />
          <div className="hidden sm:block">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white block leading-tight">
              Veltrix
            </span>
            <span className="text-[10px] tracking-widest uppercase font-mono text-cyan-400 font-bold">
              E-COMMERCE
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
          <button
            type="button"
            onClick={enterStore}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Shop
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Categories</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {categoriesDropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-56 bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => handleCategoryClick('mobiles')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-800 text-slate-200"
                >
                  📱 Smartphones & 5G
                </button>
                <button
                  onClick={() => handleCategoryClick('electronics')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-800 text-slate-200"
                >
                  💻 Laptops & Computers
                </button>
                <button
                  onClick={() => handleCategoryClick('fashion-men')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-800 text-slate-200"
                >
                  👕 Men's Fashion
                </button>
                <button
                  onClick={() => handleCategoryClick('fashion-women')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-800 text-slate-200"
                >
                  👗 Women's Fashion
                </button>
                <button
                  onClick={() => handleCategoryClick('grocery')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-800 text-slate-200"
                >
                  ⚡ Grocery & Daily (12m)
                </button>
                <button
                  onClick={enterStore}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-cyan-400 font-bold hover:bg-cyan-950/40 border-t border-slate-800 mt-1"
                >
                  View All 14 Categories →
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleExploreDeals}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Deals
          </button>

          <button
            type="button"
            onClick={() => {
              enterStore();
              navigateTo('my-orders');
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Track Order
          </button>

          <button
            type="button"
            onClick={() => {
              addToast({
                type: 'info',
                title: 'Veltrix 24/7 Helpdesk',
                message: 'Toll-free: 1800-VELTRIX • support@veltrix.in',
              });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Help
          </button>
        </nav>

        {/* Right Zone: Cart & Login */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            type="button"
            onClick={() => {
              enterStore();
              navigateTo('cart');
            }}
            className="relative p-2 text-slate-300 hover:text-white transition-colors"
            title="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          </button>

          {/* Login Button */}
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="px-5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 text-white font-bold text-sm transition-all duration-200 cursor-pointer shadow-sm"
          >
            Login
          </button>
        </div>
      </header>

      {/* 4. Main Hero Section (Matching Image 2) */}
      <main className="relative z-20 flex-1 max-w-7xl mx-auto px-6 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
        {/* Left Column: Heading, Subtitle & Action Buttons */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Top Pill Badge with Live Pulsing Radar */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/95 border border-cyan-500/40 text-slate-200 text-xs font-semibold shadow-lg shadow-cyan-950/40 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-current animate-bounce" />
            <span className="tracking-wide text-cyan-300 font-bold">Fast, Secure &amp; Smart Shopping</span>
            <span className="text-[10px] px-2 py-0.2 bg-amber-500/20 text-amber-300 rounded-full font-mono border border-amber-500/30">
              LIVE 2026
            </span>
          </div>

          {/* Giant Headline with Radiant Gradient Accents */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
            Unleashing the Ultimate <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 via-indigo-300 via-purple-400 to-pink-400 animate-gradient-flow bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-sm">
              Shopping Experience
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            Veltrix delivers a next-gen digital marketplace with lightning-fast delivery, curated tech, fashion, and lifestyle essentials with seamless checkouts.
          </p>

          {/* Interactive Feature Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold pt-1">
            <span className="px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-800 text-cyan-300 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              12-Min Quick Delivery
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-800 text-amber-300 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Diwali Dhamaka 50% Off
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-800 text-purple-300 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              32-Point Refurbished Tech
            </span>
          </div>

          {/* Action Buttons Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            {/* Primary Shop Now Button with Shimmer Animation */}
            <button
              type="button"
              onClick={enterStore}
              className="relative overflow-hidden group px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-black text-base shadow-xl shadow-blue-600/40 transition-all duration-200 flex items-center gap-2 cursor-pointer border border-blue-400/30"
            >
              {/* Shimmer light sweep beam */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 animate-shimmer pointer-events-none" />
              <span className="relative z-10">Shop Now</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Explore Deals */}
            <button
              type="button"
              onClick={handleExploreDeals}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-sm transition-all duration-200 hover:border-cyan-500/50 hover:text-cyan-300 shadow-md cursor-pointer"
            >
              Explore Deals
            </button>

            {/* Seller Hub */}
            <button
              type="button"
              onClick={() => setSellerModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-sm transition-all duration-200 hover:border-purple-500/50 hover:text-purple-300 shadow-md cursor-pointer"
            >
              Seller Hub
            </button>
          </div>
        </div>

        {/* Right Column: 3D Floating Glowing Preview Mockup (Matching Image 2) */}
        <div className="lg:col-span-6 flex justify-center items-center relative">
          {/* Ambient Glow behind the card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/35 via-cyan-500/25 to-purple-600/35 rounded-3xl blur-2xl opacity-80 animate-pulse" />

          {/* Floating Live Badges */}
          <div className="absolute -top-4 -left-2 sm:-left-4 z-30 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs shadow-2xl flex items-center gap-1.5 animate-float-subtle border border-amber-200">
            <span className="animate-flame">🪔</span>
            <span>Diwali Dhamaka 50% Off</span>
          </div>

          <div
            className="absolute -bottom-4 -right-2 sm:-right-4 z-30 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-black text-xs shadow-2xl flex items-center gap-1.5 animate-float-subtle border border-cyan-200"
            style={{ animationDelay: '2s' }}
          >
            <span className="animate-bounce">⚡</span>
            <span>12-Min Delivery Hub</span>
          </div>

          {/* Floating Card Frame with Rainbow Glow */}
          <div
            onClick={enterStore}
            className="relative w-full max-w-lg rounded-2xl p-1 bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 shadow-2xl cursor-pointer group animate-float-card-3d animate-rainbow-glow"
          >
            <div className="rounded-[14px] bg-[#090d1e] overflow-hidden border border-slate-800 text-left">
              {/* Mini Window Header */}
              <div className="px-4 py-2.5 bg-[#0b1024] border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">
                    veltrix.com
                  </span>
                </div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider group-hover:text-cyan-300">
                  Click to Open Store →
                </span>
              </div>

              {/* Preview Content matching Image 1 */}
              <div className="p-4 space-y-3 pointer-events-none">
                {/* Mini Top Brand Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/aistudio/Gemini_Generated_Image_4pyjhv4pyjhv4pyj_2bb52d66.png"
                      alt="Logo"
                      className="h-5 w-auto object-contain"
                    />
                    <span className="text-xs font-black text-white">Veltrix</span>
                  </div>
                  <div className="h-6 w-36 rounded-md bg-slate-800/80 border border-slate-700/60 text-[9px] text-slate-400 flex items-center px-2">
                    Advanced search...
                  </div>
                </div>

                {/* Mini Category Bar */}
                <div className="flex items-center justify-between text-[8px] text-slate-400 pt-1 pb-1 border-b border-slate-800">
                  <span className="text-cyan-400 font-bold border-b border-cyan-400 pb-0.5">For You</span>
                  <span>Fashion</span>
                  <span>Mobiles</span>
                  <span>Electronics</span>
                  <span>Beauty</span>
                  <span>Home</span>
                  <span>Appliances</span>
                </div>

                {/* Festive Banners Preview */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-16 rounded-lg bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 p-2 flex flex-col justify-between text-white shadow-xs">
                    <span className="text-[7px] font-black uppercase">Festive Sale</span>
                    <span className="text-[9px] font-extrabold leading-tight">5G Deals</span>
                  </div>
                  <div className="h-16 rounded-lg bg-gradient-to-r from-purple-800 to-indigo-900 p-2 flex flex-col justify-between text-white shadow-xs">
                    <span className="text-[7px] font-black uppercase">Up to 75% Off</span>
                    <span className="text-[9px] font-extrabold leading-tight">Trending</span>
                  </div>
                  <div className="h-16 rounded-lg bg-gradient-to-r from-pink-800 to-purple-900 p-2 flex flex-col justify-between text-white shadow-xs">
                    <span className="text-[7px] font-black uppercase">Big Bang</span>
                    <span className="text-[9px] font-extrabold leading-tight">Exclusive</span>
                  </div>
                </div>

                {/* Tech Deals Row Preview */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-300 mb-1.5">
                    <span>Top Deals on Tech</span>
                    <span className="text-cyan-400 text-[9px]">View All</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-center">
                      <div className="h-7 bg-slate-800 rounded flex items-center justify-center text-[10px]">📱</div>
                      <span className="text-[8px] font-bold text-white block mt-1">₹79,999*</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-amber-500/40 text-center">
                      <div className="h-7 bg-slate-800 rounded flex items-center justify-center text-[10px]">🔊</div>
                      <span className="text-[8px] font-bold text-white block mt-1">₹10,999*</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-purple-500/40 text-center">
                      <div className="h-7 bg-slate-800 rounded flex items-center justify-center text-[10px]">⌚</div>
                      <span className="text-[8px] font-bold text-white block mt-1">₹6,990*</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-blue-500/40 text-center">
                      <div className="h-7 bg-slate-800 rounded flex items-center justify-center text-[10px]">💻</div>
                      <span className="text-[8px] font-bold text-white block mt-1">₹30,999*</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 5. Bottom Loading Indicator & Bar (Matching Image 2) */}
      <footer className="relative z-20 w-full py-6 flex flex-col items-center justify-center">
        {/* Spinning Circular Neon Spinner */}
        <div className="relative mb-3 flex items-center justify-center">
          <div className="w-7 h-7 rounded-full border-2 border-slate-800 border-t-cyan-400 border-r-indigo-500 animate-spin" />
        </div>

        {/* Loading Progress Bar */}
        <div className="w-72 sm:w-96 h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-700 ease-out shadow-lg shadow-cyan-400/50"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        {/* Loading Text & Live Percentage Counter */}
        <div className="flex items-center gap-2 mt-2.5">
          <span className="font-mono text-xs font-black text-cyan-400 tabular-nums">
            {loadingProgress}%
          </span>
          <span className="text-slate-600">•</span>
          <p className="text-xs font-semibold text-slate-300 tracking-wide animate-pulse">
            Loading Veltrix Marketplace...
          </p>
        </div>
      </footer>

      {/* Seller Hub Modal */}
      {sellerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 text-left shadow-2xl relative">
            <button
              onClick={() => setSellerModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Store className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-white">Sell on Veltrix</h3>
            <p className="text-xs text-slate-400 mt-1">
              Join 50,000+ merchants with 0% commission on your first 30 days and 12-min hyperlocal fulfillment.
            </p>

            <div className="mt-5 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Pan-India 28,000+ pincode access</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Express 7-day payment cycle</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Free doorstep catalog onboarding</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSellerModalOpen(false);
                addToast({
                  type: 'success',
                  title: 'Seller Application Registered',
                  message: 'Our merchant onboarding partner will reach out in 24 hours.',
                });
              }}
              className="mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider"
            >
              Start Selling (Instant KYC)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
