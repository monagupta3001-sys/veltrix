import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Flame, Tag, Sparkles, Percent, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const BudgetStoreView: React.FC = () => {
  const { activeBudgetTier, setActiveBudgetTier, navigateTo } = useApp();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  type BudgetTabType = 'under-99' | 'under-199' | 'under-499' | 'fifty-off';
  const [localTab, setLocalTab] = useState<BudgetTabType>(
    (activeBudgetTier === 'all' || !activeBudgetTier ? 'under-99' : activeBudgetTier) as BudgetTabType
  );

  const tabs: { id: BudgetTabType; label: string; icon: typeof Flame; color: string }[] = [
    { id: 'under-99', label: '🔥 Under ₹99 Store', icon: Flame, color: 'text-amber-600 bg-amber-50 border-amber-300' },
    { id: 'under-199', label: '⚡ Under ₹199 Store', icon: Tag, color: 'text-sky-600 bg-sky-50 border-sky-300' },
    { id: 'under-499', label: '💎 Under ₹499 Store', icon: Sparkles, color: 'text-purple-600 bg-purple-50 border-purple-300' },
    { id: 'fifty-off', label: '🎁 50%+ OFF Blowout', icon: Percent, color: 'text-rose-600 bg-rose-50 border-rose-300' },
  ];

  const currentTab = localTab;

  const products = PRODUCTS.filter((p) => {
    if (currentTab === 'under-99') {
      return p.price <= 99 || p.budgetTier === 'under-99';
    }
    if (currentTab === 'under-199') {
      return (p.price <= 199 && p.price > 99) || p.budgetTier === 'under-199';
    }
    if (currentTab === 'under-499') {
      return (p.price <= 499 && p.price > 199) || p.budgetTier === 'under-499';
    }
    if (currentTab === 'fifty-off') {
      const disc = ((p.originalPrice - p.price) / p.originalPrice) * 100;
      return disc >= 45 || p.isDiwaliDeal;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-100">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-rose-300 bg-rose-950/80 border border-rose-500/40 px-2.5 py-0.5 rounded-full">
              Diwali Dhamaka Deals
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-emerald-400 font-medium">Free Delivery Eligible</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Veltrix Budget Price Stores
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Grab everyday essentials, tech accessories, phone gear, and snacks at rock-bottom prices.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="text-xs font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setLocalTab(tab.id);
                if (tab.id !== 'fifty-off') {
                  setActiveBudgetTier(tab.id);
                }
              }}
              className={`p-3.5 rounded-2xl border-2 text-center flex items-center justify-center gap-2 transition-all font-bold text-xs sm:text-sm cursor-pointer ${
                isActive
                  ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-lg shadow-cyan-950/50'
                  : 'border-slate-800 bg-[#0c1228] text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Items count & grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-400">
            Showing <strong className="text-white">{products.length}</strong> items in this price tier
          </span>
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Genuine Quality Guaranteed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
