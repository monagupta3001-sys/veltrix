import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  Zap,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
} from 'lucide-react';

interface QuickDeliveryViewProps {
  onOpenPincodeModal: () => void;
}

export const QuickDeliveryView: React.FC<QuickDeliveryViewProps> = ({ onOpenPincodeModal }) => {
  const { selectedPincode, pincodeCity, isQuickEligible, setPincode } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Filter products that have isQuickDelivery: true
  const quickProducts = PRODUCTS.filter((p) => p.isQuickDelivery);

  const tags = [
    { id: 'all', label: 'All Quick Items' },
    { id: 'grocery', label: 'Dairy & Fresh Groceries' },
    { id: 'chargers', label: 'Fast Chargers & Cables' },
    { id: 'skincare', label: 'Grooming & Skincare' },
    { id: 'stationery', label: 'Books & Stationery' },
  ];

  const filteredItems = quickProducts.filter((p) => {
    if (selectedTag === 'all') return true;
    if (selectedTag === 'grocery') return p.categoryId === 'grocery-daily-essentials';
    if (selectedTag === 'chargers') return p.subCategory.includes('Charger') || p.subCategory.includes('Power');
    if (selectedTag === 'skincare') return p.categoryId === 'beauty-personal-care';
    if (selectedTag === 'stationery') return p.categoryId === 'books-stationery';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Quick Delivery Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800/40 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Veltrix Minutes Hyperlocal Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Delivering in 10-15 Minutes. <br />
            No Waiting. No Delay.
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Order farm-fresh dairy, instant hot coffee blends, replacement phone charging cables, power banks, and grooming essentials dispatched straight from our nearby temperature-controlled micro-fulfillment centers.
          </p>

          {/* Location & Serviceability Card */}
          <div className="pt-2">
            <div className="inline-flex flex-wrap items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-700 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>
                  Delivering to: <strong className="text-white font-mono">{selectedPincode}</strong> ({pincodeCity.split('(')[0].trim()})
                </span>
              </div>

              <button
                type="button"
                onClick={onOpenPincodeModal}
                className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded text-xs transition-colors"
              >
                Change Pincode
              </button>
            </div>
          </div>
        </div>

        {/* 3 Quick Guarantees Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Average Delivery Time: <strong>12 Minutes</strong></span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Tamper-Proof Sanitized Packaging</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Electric Delivery Fleet for Zero Emissions</span>
          </div>
        </div>
      </div>

      {/* Serviceability Warning if Pincode is not in quick zone */}
      {!isQuickEligible && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold">
                10-15 Min Quick Delivery is currently not active in Pincode {selectedPincode}.
              </p>
              <p className="text-amber-800 mt-0.5">
                Standard delivery (24-48 hours) is available. Want to test 15-minute quick delivery? Switch to one of our live dark store hubs.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setPincode('560038')}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors"
            >
              Test Bengaluru (560038)
            </button>
            <button
              type="button"
              onClick={() => setPincode('110001')}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors"
            >
              Test Delhi (110001)
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => setSelectedTag(tag.id)}
            className={`px-4 py-2 rounded-xl font-semibold transition-colors whitespace-nowrap ${
              selectedTag === tag.id
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Quick Delivery Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              Quick Delivery Eligible Items
            </h2>
            <span className="text-xs text-slate-500 tabular-nums">
              ({filteredItems.length} products available right now)
            </span>
          </div>
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> In Stock at Local Hub
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
