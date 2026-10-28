import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS, SPONSOR_ADS } from '../data/products';
import { SERVICES } from '../data/services';
import { ProductCard } from '../components/ProductCard';
import { CoolQuickDeliverySection } from '../components/CoolQuickDeliverySection';
import {
  Zap,
  ShieldCheck,
  Wrench,
  Clock,
  ArrowRight,
  Sparkles,
  Flame,
  Tag,
  ChevronRight,
  LogIn,
  ShoppingBag,
  Award,
  Heart,
} from 'lucide-react';

interface HomeViewProps {
  onOpenPincodeModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenPincodeModal }) => {
  const {
    navigateTo,
    selectedPincode,
    user,
    setIsAuthModalOpen,
    toggleWishlist,
    addToCompare,
  } = useApp();

  // Live Festive Countdown Timer State (Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products for sections
  const diwaliDeals = PRODUCTS.filter((p) => p.isDiwaliDeal).slice(0, 4);
  const refurbishedProducts = PRODUCTS.filter((p) => p.isRefurbished).slice(0, 4);

  const scrollToDeals = () => {
    const el = document.getElementById('deals-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('category', { categoryId: 'all' });
    }
  };

  return (
    <div className="space-y-8 pb-16 bg-[#070a17] text-slate-100">
      {/* 1. TOP WELCOME GATEWAY: TWO MAIN OPTIONS "SHOP NOW" AND "SIGN IN" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl">
          {/* Animated background ambient glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Brand Logo & Title */}
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner shrink-0">
                <img
                  src="/assets/aistudio/Gemini_Generated_Image_4pyjhv4pyjhv4pyj_2bb52d66.png"
                  alt="Veltrix Logo"
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('/public/')) {
                      target.src = '/public/assets/aistudio/Gemini_Generated_Image_4pyjhv4pyjhv4pyj_2bb52d66.png';
                    }
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    VELTRIX COMMERCE
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-full">
                    Unified Platform
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
                  Millions of products across 14 categories, 15-minute quick delivery, and certified refurbished tech.
                </p>
              </div>
            </div>

            {/* Right: The Two Primary Action Buttons: Shop Now and Sign In */}
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center">
              {/* Primary 1: Shop Now Button */}
              <button
                type="button"
                onClick={scrollToDeals}
                className="flex-1 sm:flex-initial px-6 py-3 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 fill-current" />
                <span>Shop Now</span>
              </button>

              {/* Primary 2: Sign In Button (opens dark theme modal with website logo & animations) */}
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex-1 sm:flex-initial px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm rounded-2xl shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-cyan-400" />
                <span>{user.isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 ANIMATED FESTIVE TICKER (For Customer Attraction & Engagement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950/90 via-amber-950/80 to-slate-950/90 border border-amber-500/40 p-2.5 shadow-xl">
          <div className="animate-marquee-left whitespace-nowrap flex items-center gap-8 text-xs font-black tracking-wider uppercase">
            <span className="flex items-center gap-2 text-amber-300">
              <span className="animate-flame text-sm">🪔</span> DIWALI DHAMAKA LIVE: FLAT 50% TO 75% OFF ON TOP TECH &amp; FASHION
            </span>
            <span className="flex items-center gap-2 text-cyan-300">
              ⚡ 12-MINUTE HYPERLOCAL QUICK DELIVERY IN 240+ PINCODES
            </span>
            <span className="flex items-center gap-2 text-yellow-300">
              🎁 USE COUPON CODE <strong className="px-2 py-0.5 bg-yellow-400 text-slate-950 rounded font-mono shadow-sm">DIWALI500</strong> FOR INSTANT ₹500 OFF
            </span>
            <span className="flex items-center gap-2 text-purple-300">
              🛡️ 32-POINT QUALITY CHECKED CERTIFIED REFURBISHED SMARTPHONES &amp; LAPTOPS
            </span>
          </div>
        </div>
      </section>

      {/* 2. THREE FESTIVE SALE BANNERS (Matching User Screenshot Image 1 & 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Banner 1: Veltrix Diwali Festive Sale with Phone on Left & White Pill Button */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#c2410c] via-[#ea580c] to-[#f59e0b] p-6 text-white shadow-xl flex items-center justify-between border border-amber-400/60 group">
            {/* Hanging festive lights & ambient diya glow */}
            <div className="absolute -top-4 -right-4 w-44 h-44 bg-yellow-300/30 rounded-full blur-2xl pointer-events-none animate-pulse" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-4 text-xs opacity-75">
              <span>✨</span>
              <span>🪔</span>
              <span>✨</span>
              <span>🪔</span>
            </div>

            {/* Left: 5G Smartphone on display */}
            <div className="relative z-10 shrink-0 w-32 h-36 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80"
                alt="5G Smartphone"
                className="h-32 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Right: Festive Sale Branding & White Pill Shop Now Button */}
            <div className="relative z-10 space-y-3 text-right flex flex-col items-end">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-yellow-200 block drop-shadow-xs">
                  VELTRIX
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-yellow-300 drop-shadow-md">
                  FESTIVE SALE
                </h3>
              </div>

              {/* White Pill Button matching Screenshot */}
              <button
                type="button"
                onClick={() => navigateTo('category', { categoryId: 'smartphones-accessories' })}
                className="px-6 py-2 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs rounded-full shadow-lg transition-all cursor-pointer transform active:scale-95 flex items-center gap-1.5"
              >
                <span>Shop Now</span>
              </button>
            </div>
          </div>

          {/* Banner 2: Celebrating Up to 75% Off */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3b0764] via-[#4c1d95] to-[#2e1065] p-6 text-white shadow-xl flex items-center justify-between border border-purple-500/50 group">
            <div className="relative z-10 space-y-3">
              <span className="text-xs text-purple-200 font-medium">
                Celebrating
              </span>
              <div>
                <h3 className="text-2xl font-black tracking-tight leading-tight text-white">
                  Up to <span className="text-cyan-300">75% Off</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('category', { categoryId: 'footwear' })}
                className="px-4 py-2 bg-transparent border border-white/70 hover:border-white hover:bg-white/10 text-white font-bold text-xs rounded-full transition-all cursor-pointer"
              >
                Explore Deals
              </button>
            </div>

            <div className="relative z-10 shrink-0 w-28 h-32 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"
                alt="Shoes"
                className="h-24 w-auto object-contain drop-shadow-2xl group-hover:rotate-6 transition-transform"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl" />
          </div>

          {/* Banner 3: Big Bang Deals */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e1b4b] via-[#2e1065] to-[#0f172a] p-6 text-white shadow-xl flex items-center justify-between border border-indigo-500/50 group">
            <div className="relative z-10 space-y-3">
              <span className="text-xs text-indigo-300 font-medium">
                Get Ready for the
              </span>
              <div>
                <h3 className="text-2xl font-black tracking-tight leading-tight text-white">
                  Big Bang <span className="text-purple-300">Deals</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('budget-store', { budgetTier: 'under-499' })}
                className="px-4 py-2 bg-transparent border border-white/70 hover:border-white hover:bg-white/10 text-white font-bold text-xs rounded-full transition-all cursor-pointer"
              >
                Explore Deals
              </button>
            </div>

            <div className="relative z-10 shrink-0 w-28 h-32 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
                alt="Audio Tech"
                className="h-24 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
          </div>
        </div>
      </section>

      {/* 3. TOP DEALS ON TECH (With Glowing Neon Cards & Arrow Matching Screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-white tracking-tight">
            Top Deals on Tech
          </h2>
          <button
            type="button"
            onClick={() => navigateTo('category', { categoryId: 'electronics' })}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
          >
            View All Deals →
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* Tech Card 1 - Neon Gold Border */}
            <div className="relative rounded-2xl bg-[#090e23] border border-amber-400/90 shadow-[0_0_15px_rgba(251,191,36,0.25)] hover:border-amber-300 p-3 sm:p-4 text-center transition-all group flex flex-col justify-between">
              <div className="h-28 flex items-center justify-center p-2">
                <img
                  src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=300&q=80"
                  alt="Smartphone"
                  className="h-24 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-xs font-black text-white mt-1">From ₹79,999*</p>
                <div className="flex items-center justify-center gap-0.5 text-amber-400 text-[10px] my-1">
                  {'★★★★★'}
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('category', { categoryId: 'smartphones-accessories' })}
                  className="w-full py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Quick View
                </button>
              </div>
            </div>

            {/* Tech Card 2 - Neon Gold Border */}
            <div className="relative rounded-2xl bg-[#090e23] border border-amber-400/90 shadow-[0_0_15px_rgba(251,191,36,0.25)] hover:border-amber-300 p-3 sm:p-4 text-center transition-all group flex flex-col justify-between">
              <div className="h-28 flex items-center justify-center p-2">
                <img
                  src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=300&q=80"
                  alt="Speaker"
                  className="h-24 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-xs font-black text-white mt-1">From 70,999*</p>
                <div className="flex items-center justify-center gap-0.5 text-amber-400 text-[10px] my-1">
                  {'★★★★★'}
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('category', { categoryId: 'electronics' })}
                  className="w-full py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Quick View
                </button>
              </div>
            </div>

            {/* Tech Card 3 - Neon Gold Border */}
            <div className="relative rounded-2xl bg-[#090e23] border border-amber-400/90 shadow-[0_0_15px_rgba(251,191,36,0.25)] hover:border-amber-300 p-3 sm:p-4 text-center transition-all group flex flex-col justify-between">
              <div className="h-28 flex items-center justify-center p-2">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80"
                  alt="Watch"
                  className="h-24 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-xs font-black text-white mt-1">From ₹6,990*</p>
                <div className="flex items-center justify-center gap-0.5 text-amber-400 text-[10px] my-1">
                  {'★★★★★'}
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('category', { categoryId: 'electronics' })}
                  className="w-full py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Quick View
                </button>
              </div>
            </div>

            {/* Tech Card 4 - Neon Cyan Border */}
            <div className="relative rounded-2xl bg-[#090e23] border border-cyan-400/90 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:border-cyan-300 p-3 sm:p-4 text-center transition-all group flex flex-col justify-between">
              <div className="h-28 flex items-center justify-center p-2">
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80"
                  alt="Camera"
                  className="h-24 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-xs font-black text-white mt-1">From ₹6,990*</p>
                <div className="flex items-center justify-center gap-0.5 text-amber-400 text-[10px] my-1">
                  {'★★★★★'}
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('category', { categoryId: 'electronics' })}
                  className="w-full py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Quick View
                </button>
              </div>
            </div>

            {/* Tech Card 5 - Neon Cyan Border */}
            <div className="relative rounded-2xl bg-[#090e23] border border-cyan-400/90 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:border-cyan-300 p-3 sm:p-4 text-center transition-all group flex flex-col justify-between">
              <div className="h-28 flex items-center justify-center p-2">
                <img
                  src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=300&q=80"
                  alt="Tablet"
                  className="h-24 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-xs font-black text-white mt-1">From ₹16,999*</p>
                <div className="flex items-center justify-center gap-0.5 text-amber-400 text-[10px] my-1">
                  {'★★★★★'}
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('category', { categoryId: 'computers-laptops' })}
                  className="w-full py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Quick View
                </button>
              </div>
            </div>

            {/* Tech Card 6 - Neon Cyan Border */}
            <div className="relative rounded-2xl bg-[#090e23] border border-cyan-400/90 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:border-cyan-300 p-3 sm:p-4 text-center transition-all group flex flex-col justify-between">
              <div className="h-28 flex items-center justify-center p-2">
                <img
                  src="https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=300&q=80"
                  alt="5G Phone"
                  className="h-24 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-xs font-black text-white mt-1">From ₹30,999*</p>
                <div className="flex items-center justify-center gap-0.5 text-amber-400 text-[10px] my-1">
                  {'★★★★★'}
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('category', { categoryId: 'smartphones-accessories' })}
                  className="w-full py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Quick View
                </button>
              </div>
            </div>
          </div>

          {/* Right Circular Navigation Arrow matching Screenshot */}
          <button
            type="button"
            onClick={() => navigateTo('category', { categoryId: 'electronics' })}
            className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-slate-200 items-center justify-center shadow-2xl cursor-pointer transition-transform hover:scale-110"
            title="Next Tech Deals"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 4. SMARTPHONE SEARCH RESULTS (Matching Image 1: BOLTT EVO 5G & BOLTT ACE 5G) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
          <span>Home</span>
          <span>&gt;</span>
          <span>Mobiles &amp; A...</span>
          <span>&gt;</span>
          <span className="text-slate-200 font-semibold">"Smartphone"</span>
        </div>

        {/* Heading & Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <h2 className="text-xl font-black text-white">
            Search Results for "Smartphone"
          </h2>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-400 overflow-x-auto">
            <span className="text-slate-300 font-bold shrink-0">Sort By</span>
            <button className="text-blue-400 font-bold border-b-2 border-blue-500 pb-0.5 shrink-0">
              Relevance
            </button>
            <button className="hover:text-slate-200 shrink-0">Popularity</button>
            <button className="hover:text-slate-200 shrink-0">Price - Low to High</button>
            <button className="hover:text-slate-200 shrink-0">Price - High to low</button>
            <button className="hover:text-slate-200 shrink-0">Newest First</button>
            <div className="pl-2 border-l border-slate-700 shrink-0">
              <button className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-slate-200 font-bold flex items-center gap-1">
                <span>Filters</span>
                <ChevronRight className="w-3.5 h-3.5 rotate-90" />
              </button>
            </div>
          </div>
        </div>

        {/* 2 Featured Smartphone Cards from Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* BOLTT EVO 5G Card */}
          <div className="relative p-5 rounded-2xl bg-[#0c1228] border border-cyan-500/30 hover:border-cyan-400/80 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center group">
            {/* Wishlist button */}
            <button
              type="button"
              onClick={() => {
                const p = PRODUCTS.find((x) => x.id === 'phone-boltt-evo');
                if (p) toggleWishlist(p.id);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-400 hover:text-rose-500 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>

            <div className="w-36 h-40 bg-[#080d1f] rounded-xl p-2 flex items-center justify-center shrink-0 border border-slate-800/80">
              <img
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80"
                alt="BOLTT EVO 5G"
                className="h-36 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 space-y-2 text-left w-full">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                  BOLTT EVO 5G
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                  4.5 ★
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                4 GB RAM • 64 GB • 6000 mAh
              </div>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-black text-white">₹8,999</span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  50% off
                </span>
                <span className="text-xs text-slate-500 line-through">₹17,999</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer hover:text-slate-200">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        const p = PRODUCTS.find((x) => x.id === 'phone-boltt-evo');
                        if (p) addToCompare(p);
                      }
                    }}
                    className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <span>Add to Compare</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const p = PRODUCTS.find((x) => x.id === 'phone-boltt-evo');
                    if (p) navigateTo('product-detail', { product: p });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-md shadow-blue-950/50 transition-all cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* BOLTT ACE 5G Card */}
          <div className="relative p-5 rounded-2xl bg-[#0c1228] border border-cyan-500/30 hover:border-cyan-400/80 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center group">
            {/* Wishlist button */}
            <button
              type="button"
              onClick={() => {
                const p = PRODUCTS.find((x) => x.id === 'phone-boltt-ace');
                if (p) toggleWishlist(p.id);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-400 hover:text-rose-500 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>

            <div className="w-36 h-40 bg-[#080d1f] rounded-xl p-2 flex items-center justify-center shrink-0 border border-slate-800/80">
              <img
                src="https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=400&q=80"
                alt="BOLTT ACE 5G"
                className="h-36 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 space-y-2 text-left w-full">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                  BOLTT ACE 5G
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                  4.5 ★
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                4 GB RAM • 64 GB • 6000 mAh
              </div>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-black text-white">₹11,999</span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  52% off
                </span>
                <span className="text-xs text-slate-500 line-through">₹24,999</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer hover:text-slate-200">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        const p = PRODUCTS.find((x) => x.id === 'phone-boltt-ace');
                        if (p) addToCompare(p);
                      }
                    }}
                    className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <span>Add to Compare</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const p = PRODUCTS.find((x) => x.id === 'phone-boltt-ace');
                    if (p) navigateTo('product-detail', { product: p });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-md shadow-blue-950/50 transition-all cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BUDGET DEAL CORNERS (Under ₹99, Under ₹199, Under ₹499, Flat 50% Off) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400 fill-current" />
              <h2 className="text-lg sm:text-xl font-black text-white">
                Budget Deal Corners
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-rose-950 border border-rose-500/40 text-rose-300 rounded-full">
                Steal Deals
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Unbelievable prices for every budget with zero compromise on quality
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            onClick={() => navigateTo('budget-store', { budgetTier: 'under-99' })}
            className="group relative p-4 rounded-2xl bg-[#0a0f24] border border-amber-500/40 hover:border-amber-400 shadow-md hover:shadow-amber-500/10 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-black text-[10px] rounded-md uppercase">
                  Bargain Store
                </span>
                <span className="text-xl">🔥</span>
              </div>
              <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                Under ₹99 Store
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Mobile stands, lens wipes, dry fruit snacks &amp; clips
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>Explore Items</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => navigateTo('budget-store', { budgetTier: 'under-199' })}
            className="group relative p-4 rounded-2xl bg-[#0a0f24] border border-sky-500/40 hover:border-sky-400 shadow-md hover:shadow-sky-500/10 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 bg-sky-500 text-slate-950 font-black text-[10px] rounded-md uppercase">
                  Popular
                </span>
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-base font-black text-white group-hover:text-sky-300 transition-colors">
                Under ₹199 Store
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                OTG adapters, pure ghee, stainless straws &amp; glass
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-sky-400">
              <span>Explore Items</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => navigateTo('budget-store', { budgetTier: 'under-499' })}
            className="group relative p-4 rounded-2xl bg-[#0a0f24] border border-purple-500/40 hover:border-purple-400 shadow-md hover:shadow-purple-500/10 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 bg-purple-600 text-white font-black text-[10px] rounded-md uppercase">
                  Top Value
                </span>
                <span className="text-xl">💎</span>
              </div>
              <h3 className="text-base font-black text-white group-hover:text-purple-300 transition-colors">
                Under ₹499 Store
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                65W boAt cables, leather wallets &amp; Arabica coffee
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-purple-400">
              <span>Explore Items</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => navigateTo('category', { categoryId: 'all' })}
            className="group relative p-4 rounded-2xl bg-[#0a0f24] border border-orange-500/40 hover:border-orange-400 shadow-md hover:shadow-orange-500/10 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 bg-orange-600 text-white font-black text-[10px] rounded-md uppercase">
                  Festive Flash
                </span>
                <span className="text-xl">🎁</span>
              </div>
              <h3 className="text-base font-black text-white group-hover:text-orange-300 transition-colors">
                Flat 50%+ OFF
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Air fryers, Banarasi silk sarees &amp; smart tech
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-orange-400">
              <span>Explore Deals</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. COOL QUICK DELIVERY SECTION (Like Blinkit / Zepto / Flipkart Minutes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CoolQuickDeliverySection onOpenPincodeModal={onOpenPincodeModal} />
      </section>

      {/* 5. MAJOR DEALS OF THE DAY (Diwali Dhamaka Radiant Festival Theme) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#450a0a] via-[#881337] to-[#78350f] rounded-3xl border-2 border-amber-400/80 p-6 sm:p-8 shadow-[0_0_40px_rgba(245,158,11,0.3)]">
          {/* Background Ambient Diya Glow & Fireworks Sparkles */}
          <div className="absolute top-0 right-10 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-rose-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-3 left-1/3 flex gap-8 text-sm opacity-60 pointer-events-none">
            <span className="animate-ping">✨</span>
            <span className="animate-bounce">🪔</span>
            <span className="animate-pulse">✨</span>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-amber-500/30">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 text-xs font-black rounded-xl uppercase shadow-lg shadow-amber-950/60 flex items-center gap-1.5">
                  <span className="animate-flame text-sm">🪔</span> Diwali Dhamaka Deals
                </span>
                <span className="px-3 py-1 rounded-full bg-red-950/90 text-yellow-300 border border-yellow-400/50 text-[11px] font-mono font-bold animate-pulse">
                  FLAT 50% - 75% OFF
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/40 text-[11px] font-mono font-bold">
                  CODE: <strong className="text-white underline">DIWALI500</strong> (₹500 OFF)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 drop-shadow-md">
                Festive Mega Blockbusters
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/90 mt-1">
                Highest rated festive products with guaranteed lowest prices across India.
              </p>
            </div>

            {/* Live Countdown & View All Button */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Live Flash Timer */}
              <div className="flex items-center gap-2 bg-slate-950/90 border border-amber-400/70 px-4 py-2.5 rounded-2xl text-xs font-mono shadow-xl">
                <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-amber-200/80 text-[11px]">Ends in:</span>
                <span className="font-black text-amber-300 tabular-nums text-sm">
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>

              {/* View All Button */}
              <button
                type="button"
                onClick={() => navigateTo('category', { categoryId: 'all' })}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 text-slate-950 text-xs font-black rounded-2xl shadow-xl transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>View All Deals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {diwaliDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. SPONSORED BRAND ADS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Featured Brand Partners &amp; Sponsors
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPONSOR_ADS.map((ad) => (
            <div
              key={ad.id}
              onClick={() =>
                navigateTo('category', {
                  categoryId: ad.categoryId || 'all',
                })
              }
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${ad.bgGradient} text-white p-5 cursor-pointer shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col justify-between h-48`}
            >
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                  Sponsored · {ad.brand}
                </span>
                <h3 className="text-base font-black mt-2 leading-tight">
                  {ad.tagline}
                </h3>
                <p className="text-xs text-white/90 mt-1 line-clamp-2">
                  {ad.offerText}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/20">
                <span className="text-xs font-bold flex items-center gap-1">
                  {ad.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CERTIFIED REFURBISHED HUB (UP TO 55% OFF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#090e24] rounded-3xl border border-purple-500/30 p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-violet-600 text-white rounded-2xl shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-white">
                    Veltrix Certified Refurbished Tech
                  </h2>
                  <span className="px-2 py-0.5 bg-violet-950 border border-violet-500/40 text-violet-300 text-[10px] font-black rounded-full uppercase">
                    Up to 55% OFF
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pre-owned iPhones, MacBooks, and Sony ANC headphones inspected across 32 hardware points with 12M warranty.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('refurbished')}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1 self-start md:self-auto cursor-pointer"
            >
              <span>Explore Refurbished</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {refurbishedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. DOORSTEP SERVICES & DEVICE CARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#090e24] rounded-3xl border border-slate-800 p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-400">
                  <Wrench className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-white">
                  Doorstep Services &amp; Device Care
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Cracked phone screen? AC needing chemical jet clean? Book certified technicians to your home in 60 mins.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('services')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer border border-slate-700"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {SERVICES.slice(0, 3).map((srv) => (
              <div
                key={srv.id}
                onClick={() => navigateTo('services')}
                className="group p-4 rounded-2xl bg-[#0c1228] border border-slate-800 hover:border-amber-400/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-amber-400 uppercase tracking-wide text-[11px]">
                      {srv.category}
                    </span>
                    <span className="font-bold text-white">
                      ★ {srv.rating} ({srv.reviewCount})
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-2 group-hover:text-amber-300 transition-colors line-clamp-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500">Starts at</span>
                    <p className="text-base font-black text-white tabular-nums">
                      ₹{srv.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    Book Visit <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
