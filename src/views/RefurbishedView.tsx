import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { RefurbishedGrade } from '../types';
import {
  ShieldCheck,
  CheckCircle,
  RotateCcw,
  Sparkles,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Award,
  HelpCircle,
} from 'lucide-react';

export const RefurbishedView: React.FC = () => {
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<RefurbishedGrade | 'all'>('all');
  const [showGradeModal, setShowGradeModal] = useState<boolean>(false);

  // Filter refurbished products
  const refurbishedItems = PRODUCTS.filter((p) => p.isRefurbished);

  const filteredItems = refurbishedItems.filter((p) => {
    if (selectedGrade !== 'all' && p.refurbishedGrade !== selectedGrade) {
      return false;
    }
    if (selectedDeviceType === 'smartphones' && p.categoryId !== 'smartphones-accessories') {
      return false;
    }
    if (selectedDeviceType === 'laptops' && p.categoryId !== 'computers-laptops') {
      return false;
    }
    if (selectedDeviceType === 'audio' && p.categoryId !== 'electronics') {
      return false;
    }
    if (selectedDeviceType === 'watches' && p.categoryId !== 'other-accessories') {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Refurbished Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-violet-800/40 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-900/60 border border-violet-700/60 text-violet-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Veltrix Certified Pre-Owned</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Flagship Devices. <br />
            Up to 55% Lower Price. Guaranteed.
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every certified device undergoes rigorous 32-point hardware and software inspection by expert engineers, backed by up to 12 Months Veltrix Assured Warranty and 7 Days Free Replacement.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowGradeModal(true)}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Understand Condition Grades</span>
            </button>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="text-violet-300 font-semibold">100% Genuine Parts</span>
              <span>·</span>
              <span>Sanitized Packaging</span>
            </div>
          </div>
        </div>

        {/* 32-Point Quality Checklist Card */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Battery Longevity</p>
              <p className="text-[11px] text-slate-400">90%+ Battery Health verified</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Display & Touch</p>
              <p className="text-[11px] text-slate-400">0 Dead pixels, 120Hz tested</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Up to 12M Warranty</p>
              <p className="text-[11px] text-slate-400">Comprehensive hardware cover</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">7-Day Free Returns</p>
              <p className="text-[11px] text-slate-400">Zero-risk doorstep return</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter by Device Type & Condition Grade */}
      <div className="bg-[#090e24] rounded-2xl border border-slate-800 p-4 space-y-4 shadow-xl">
        {/* Device Types */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 shrink-0">
            Device Type:
          </span>
          {[
            { id: 'all', label: 'All Refurbished Tech' },
            { id: 'smartphones', label: 'Smartphones (iPhone & Galaxy)' },
            { id: 'laptops', label: 'MacBooks & Laptops' },
            { id: 'audio', label: 'Headphones & Audio' },
            { id: 'watches', label: 'Smartwatches' },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedDeviceType(type.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                selectedDeviceType === type.id
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-[#0c1228] border border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Condition Grade Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800 text-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 shrink-0">
            Condition Grade:
          </span>
          {(['all', 'Like New', 'Superb', 'Good Value'] as const).map((grade) => (
            <button
              key={grade}
              type="button"
              onClick={() => setSelectedGrade(grade)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                selectedGrade === grade
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-900/50'
                  : 'bg-[#0c1228] border border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
              }`}
            >
              {grade === 'all' ? 'All Grades' : grade}
            </button>
          ))}
        </div>
      </div>

      {/* Products Showcase */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-white">
              Certified Refurbished Inventory
            </h2>
            <span className="text-xs text-slate-400 tabular-nums">
              ({filteredItems.length} certified units available)
            </span>
          </div>
          <span className="text-xs text-violet-400 font-semibold flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> Veltrix 32-Pt Quality Inspected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Condition Grade Modal */}
      {showGradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#090e24] rounded-3xl shadow-2xl p-6 border border-slate-800 space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                Veltrix Certified Condition Grading Scale
              </h3>
              <button
                type="button"
                onClick={() => setShowGradeModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-violet-950/40 border border-violet-500/40">
                <div className="flex items-center gap-1.5 font-bold text-violet-300 text-sm">
                  <span>🌟 Like New (Open Box / Flawless)</span>
                </div>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Virtually indistinguishable from brand new. Pristine screen and body with zero scratches. 98-100% battery health with original manufacturer packaging.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0c1228] border border-slate-800">
                <div className="flex items-center gap-1.5 font-bold text-cyan-300 text-sm">
                  <span>⭐ Superb (Near Mint)</span>
                </div>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  100% fully functional with minor micro-scratches barely visible from 12 inches away. 90%+ battery capacity. Sanitized and certified with 12 months warranty.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 text-sm">
                  <span>⚡ Good Value (High Savings)</span>
                </div>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Fully operational hardware with visible cosmetic scuffs on edges or back cover. Display glass is crack-free and responsive. Maximum price discount!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGradeModal(false)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
