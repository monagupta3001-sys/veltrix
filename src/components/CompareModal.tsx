import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export const CompareModal: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, addToCart, navigateTo } = useApp();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t-2 border-cyan-500 shadow-2xl p-4 transition-transform">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">
              Product Comparison ({compareList.length}/3)
            </span>
            <span className="text-xs text-slate-500">
              Compare features, prices, and condition side-by-side
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearCompare}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {compareList.map((product) => (
            <div
              key={product.id}
              className="relative p-3 rounded-lg border border-slate-200 bg-slate-50 flex flex-col justify-between"
            >
              <button
                type="button"
                onClick={() => removeFromCompare(product.id)}
                className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
                aria-label="Remove item"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 object-contain bg-white rounded p-1 border border-slate-200"
                />
                <div className="flex-1 min-w-0 pr-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase">{product.brand}</p>
                  <p className="text-xs font-bold text-slate-900 truncate">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-slate-900 tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-current" /> {product.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specs Snapshot */}
              <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-0.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Condition:</span>
                  <span className="font-semibold">{product.isRefurbished ? `Refurbished (${product.refurbishedGrade})` : 'Brand New'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery:</span>
                  <span className="font-semibold text-emerald-600">{product.isQuickDelivery ? '⚡ 15 Mins' : '2-3 Days'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Warranty:</span>
                  <span className="truncate max-w-[150px]">{product.warranty}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 pt-2">
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="flex-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded flex items-center justify-center gap-1"
                >
                  <ShoppingCart className="w-3 h-3" /> Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('product-detail', { product })}
                  className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded text-slate-700"
                  title="View full details"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Empty slot placeholder if less than 3 */}
          {compareList.length < 3 && (
            <div className="hidden md:flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 text-xs text-center">
              <span>Add another product from any category to compare</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
