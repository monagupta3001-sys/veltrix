import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import {
  ShieldCheck,
  RotateCcw,
  Zap,
  Award,
  Flame,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#050813] text-slate-400 border-t border-slate-800 mt-16">
      {/* 4 Pillars Trust Strip */}
      <div className="border-b border-slate-800/80 bg-[#070b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 shrink-0">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">10-15 Min Quick Delivery</h4>
              <p className="text-xs text-slate-400 mt-1">
                Hyperlocal micro-warehouses deliver groceries, snacks, and tech gear at lightning speed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-violet-950/80 border border-violet-500/40 text-violet-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">32-Point Refurbished Test</h4>
              <p className="text-xs text-slate-400 mt-1">
                Every certified pre-owned smartphone and laptop is thoroughly tested with up to 12 months warranty.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7-Day Free Replacement</h4>
              <p className="text-xs text-slate-400 mt-1">
                Zero questions asked easy returns and doorstep pickups for complete buyer peace of mind.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Doorstep Tech &amp; Home Care</h4>
              <p className="text-xs text-slate-400 mt-1">
                Book verified background-checked experts for instant phone repair, appliance cleaning, and tailoring.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-9 flex items-center overflow-hidden rounded-xl bg-slate-950 border border-slate-800 px-2 py-0.5">
              <img
                src="/assets/aistudio/Gemini_Generated_Image_4pyjhv4pyjhv4pyj_2bb52d66.png"
                alt="Veltrix"
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('/public/')) {
                    target.src = '/public/assets/aistudio/Gemini_Generated_Image_4pyjhv4pyjhv4pyj_2bb52d66.png';
                  }
                }}
              />
              <span className="text-lg font-black tracking-tight text-white ml-2">
                VELTRIX
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            India's unified online marketplace bringing together millions of brand-new products, certified refurbished electronics, 15-minute quick delivery, and trusted doorstep services under one roof.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
            <span className="font-semibold text-slate-400">ISO 9001:2015 Certified</span>
            <span>·</span>
            <span>256-bit SSL Secure Checkout</span>
          </div>
        </div>

        {/* Categories Column 1 */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
            Top Categories
          </h5>
          <ul className="space-y-2 text-xs">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => navigateTo('category', { categoryId: cat.id })}
                  className="hover:text-cyan-400 transition-colors text-left text-slate-400 cursor-pointer"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories Column 2 */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
            Special Stores
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                type="button"
                onClick={() => navigateTo('budget-store', { budgetTier: 'under-99' })}
                className="text-amber-400 font-bold hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Flame className="w-3 h-3 fill-current" /> Under ₹99 Store
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateTo('budget-store', { budgetTier: 'under-199' })}
                className="text-sky-400 font-bold hover:text-sky-300 transition-colors cursor-pointer"
              >
                Under ₹199 Store
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateTo('budget-store', { budgetTier: 'under-499' })}
                className="text-purple-400 font-bold hover:text-purple-300 transition-colors cursor-pointer"
              >
                Under ₹499 Store
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateTo('category', { categoryId: 'all' })}
                className="hover:text-cyan-400 transition-colors text-left text-slate-400 cursor-pointer"
              >
                All 50,000+ Deals
              </button>
            </li>
          </ul>
        </div>

        {/* Veltrix Hubs */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
            Veltrix Services
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                type="button"
                onClick={() => navigateTo('quick-delivery')}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-semibold text-emerald-400 cursor-pointer"
              >
                <Zap className="w-3 h-3 fill-current" />
                Veltrix Minutes (12m)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateTo('refurbished')}
                className="hover:text-violet-400 transition-colors flex items-center gap-1.5 font-semibold text-violet-400 cursor-pointer"
              >
                <ShieldCheck className="w-3 h-3" />
                Certified Refurbished
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateTo('services')}
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-semibold text-amber-400 cursor-pointer"
              >
                <Award className="w-3 h-3" />
                Doorstep Repair
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateTo('my-orders')}
                className="hover:text-slate-200 transition-colors text-slate-400 cursor-pointer"
              >
                Track Your Shipment
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Payments & Copyright */}
      <div className="border-t border-slate-800 bg-[#03060d] px-4 sm:px-8 py-5 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Veltrix Commerce India Pvt. Ltd. All rights reserved.</p>

          <div className="flex items-center gap-3 text-slate-400">
            <span className="font-semibold text-slate-300">UPI (GPay / PhonePe / Paytm)</span>
            <span>·</span>
            <span className="font-semibold text-slate-300">Visa / RuPay / Mastercard</span>
            <span>·</span>
            <span className="font-semibold text-slate-300">Net Banking</span>
            <span>·</span>
            <span className="font-semibold text-slate-300">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
