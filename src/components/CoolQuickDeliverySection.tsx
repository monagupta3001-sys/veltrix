import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import {
  Zap,
  Clock,
  MapPin,
  Plus,
  Minus,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface CoolQuickDeliverySectionProps {
  onOpenPincodeModal: () => void;
}

export const CoolQuickDeliverySection: React.FC<CoolQuickDeliverySectionProps> = ({
  onOpenPincodeModal,
}) => {
  const {
    selectedPincode,
    pincodeCity,
    isQuickEligible,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'dairy' | 'tech' | 'snacks'>('all');

  // Filter quick items
  const quickItems = PRODUCTS.filter((p) => p.isQuickDelivery);

  const filteredItems = quickItems.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'dairy') return p.subCategory.includes('Dairy') || p.subCategory.includes('Veg');
    if (activeTab === 'tech') return p.subCategory.includes('Charger') || p.categoryId === 'electronics';
    if (activeTab === 'snacks') return p.subCategory.includes('Snacks') || p.categoryId === 'grocery-daily-essentials';
    return true;
  });

  const getItemCartQty = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-5 sm:p-8 text-white border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-60 h-60 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row with animated delivery runner & location */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-emerald-800/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500 text-slate-950 text-xs font-black uppercase rounded-full tracking-wider flex items-center gap-1 shadow-md">
              <Zap className="w-3.5 h-3.5 fill-current animate-bounce" />
              Veltrix Minutes
            </span>
            <span className="text-emerald-400 text-xs font-bold hidden sm:inline">
              Hyperlocal 10-15 Min Delivery
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1.5 flex items-center gap-2">
            <span>Instant Delivery Hub</span>
            <span className="text-xl">⚡</span>
          </h2>

          <p className="text-xs text-slate-300 mt-0.5">
            Cold dairy, phone cables, instant snacks & essentials delivered from your neighborhood dark store
          </p>
        </div>

        {/* Live Delivery Tracker Capsule */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 border border-emerald-500/50 p-2.5 px-4 rounded-2xl shadow-inner">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black animate-pulse">
              ⚡
            </div>
            <div className="text-left text-xs">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">
                Live Courier ETA
              </span>
              <span className="font-extrabold text-emerald-400 font-mono">
                10-12 Mins to {selectedPincode}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPincodeModal}
            className="ml-2 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Change
          </button>
        </div>
      </div>

      {/* Micro-category filter pills */}
      <div className="relative z-10 flex items-center gap-2 overflow-x-auto py-4 scrollbar-none text-xs">
        {[
          { id: 'all', label: '⚡ All Instant Items' },
          { id: 'dairy', label: '🥛 Dairy, Milk & Fresh' },
          { id: 'tech', label: '🔌 65W Cables & Fast Tech' },
          { id: 'snacks', label: '🍪 Munchies & Cold Brew' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-400 text-slate-950 shadow-md scale-105'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Tray */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.slice(0, 4).map((product) => {
          const qty = getItemCartQty(product.id);
          const discount = Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
          );

          return (
            <div
              key={product.id}
              className="group bg-[#0c1228] border border-slate-800 hover:border-emerald-500/60 rounded-2xl p-3.5 flex flex-col justify-between shadow-lg transition-all duration-300 text-white transform hover:-translate-y-1 relative"
            >
              {/* Delivery ETA pill */}
              <div className="flex items-center justify-between text-[11px] mb-2 font-bold">
                <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  {product.quickDeliveryMinutes || 12} MINS
                </span>
                {discount > 0 && (
                  <span className="text-emerald-400 font-extrabold">{discount}% OFF</span>
                )}
              </div>

              {/* Product Image */}
              <div
                onClick={() => navigateTo('product-detail', { product })}
                className="w-full pt-[70%] relative bg-[#080d1f] rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Title & Brand */}
              <div className="mt-2.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {product.brand}
                </span>
                <h4
                  onClick={() => navigateTo('product-detail', { product })}
                  className="text-xs font-bold text-white line-clamp-2 cursor-pointer hover:text-emerald-400 leading-snug"
                >
                  {product.name}
                </h4>
              </div>

              {/* Price & Add Stepper Button (like Blinkit / Zepto) */}
              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <span className="text-sm sm:text-base font-black text-white tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {discount > 0 && (
                    <span className="text-[10px] text-slate-500 line-through block tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Blinkit-style "+ ADD" button that morphs into a [- 1 +] stepper! */}
                {qty === 0 ? (
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1)}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all transform active:scale-90 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>ADD</span>
                  </button>
                ) : (
                  <div className="flex items-center bg-emerald-600 text-white rounded-xl overflow-hidden font-black text-xs shadow-sm">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(product.id, qty - 1)}
                      className="px-2.5 py-1.5 hover:bg-emerald-700 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3 h-3 stroke-[3]" />
                    </button>
                    <span className="px-2.5 py-1 tabular-nums">{qty}</span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(product.id, qty + 1)}
                      className="px-2.5 py-1.5 hover:bg-emerald-700 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Hub Trust Bar */}
      <div className="relative z-10 mt-6 pt-4 border-t border-emerald-800/60 flex flex-wrap items-center justify-between text-xs text-emerald-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Cold-chain sealed bags with zero tampering</span>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('quick-delivery')}
          className="font-bold text-white hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
        >
          <span>See all {quickItems.length}+ instant items</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
