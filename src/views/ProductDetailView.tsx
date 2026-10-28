import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import {
  Star,
  Heart,
  ShoppingCart,
  Zap,
  ShieldCheck,
  RotateCcw,
  Truck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Share2,
  CreditCard,
  Eye,
  Check,
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    navigateTo,
    addToCart,
    toggleWishlist,
    isWishlisted,
    addToCompare,
    selectedPincode,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Default');
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'warranty'>('specs');

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center bg-[#070a17] text-slate-100">
        <p className="text-slate-400 mb-4">No product selected.</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold cursor-pointer"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const p = selectedProduct;
  const wishlisted = isWishlisted(p.id);
  const discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(p, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(p, quantity, selectedColor);
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 bg-[#070a17] text-slate-100">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigateTo('category', { categoryId: p.categoryId })}
            className="hover:text-cyan-400 transition-colors capitalize cursor-pointer"
          >
            {p.categoryId.replace('-', ' ')}
          </button>
          <span>/</span>
          <span className="text-slate-200 font-semibold truncate max-w-xs">{p.name}</span>
        </div>

        <button
          onClick={() => navigateTo('category', { categoryId: p.categoryId })}
          className="flex items-center gap-1 text-slate-400 hover:text-white font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to catalog
        </button>
      </div>

      {/* Main PDP Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Gallery (Sticky) */}
        <div className="lg:col-span-6 bg-[#090e24] rounded-3xl border border-slate-800 p-6 flex flex-col items-center justify-center relative shadow-xl">
          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
            {p.isQuickDelivery && (
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wide bg-emerald-600 text-white rounded-md shadow flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-current" />
                ⚡ {p.quickDeliveryMinutes || 12} Min Delivery
              </span>
            )}
            {p.isRefurbished && (
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wide bg-violet-600 text-white rounded-md shadow flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Certified {p.refurbishedGrade}
              </span>
            )}
          </div>

          <div className="w-full pt-[85%] relative bg-[#080d1f] rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800/80">
            <img
              src={p.image}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-contain p-6"
            />
          </div>

          {/* Quick trust row under image */}
          <div className="w-full grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-300">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-white">
                {p.isQuickDelivery ? '⚡ 15-Min Express' : 'Free Delivery'}
              </span>
              <span className="text-[10px] text-slate-400">To {selectedPincode}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">7 Days Return</span>
              <span className="text-[10px] text-slate-400">Hassle-free exchange</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              <span className="font-semibold text-white">Veltrix Assured</span>
              <span className="text-[10px] text-slate-400">100% Genuine</span>
            </div>
          </div>
        </div>

        {/* Right Contiguous Purchase Module */}
        <div className="lg:col-span-6 bg-[#090e24] rounded-3xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider">
                {p.brand} · {p.subCategory}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isCopied ? 'Copied Link!' : 'Share'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => addToCompare(p)}
                  className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Compare</span>
                </button>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white mt-2 leading-snug">
              {p.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2.5 mt-2.5">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold text-white bg-emerald-600 rounded">
                <span>{p.rating.toFixed(1)}</span>
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-xs text-slate-400 tabular-nums">
                {p.reviewCount.toLocaleString('en-IN')} Verified Buyer Reviews
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({p.stock} units)
              </span>
            </div>
          </div>

          {/* Pricing Module */}
          <div className="p-4 bg-[#0c1228] rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white tabular-nums">
                ₹{p.price.toLocaleString('en-IN')}
              </span>
              {discountPercent > 0 && (
                <>
                  <span className="text-base text-slate-500 line-through tabular-nums">
                    ₹{p.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-extrabold text-emerald-400 tabular-nums">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              Inclusive of all taxes. Free shipping on orders above ₹499.
            </p>

            {/* Bank offer strip */}
            <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-300">
              <CreditCard className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong className="text-white">Bank Offer:</strong> Flat 10% instant discount up to ₹1,500 on HDFC &amp; ICICI Cards
              </span>
            </div>
          </div>

          {/* Condition Notice if Refurbished */}
          {p.isRefurbished && (
            <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/30 text-xs text-violet-300 space-y-1">
              <div className="flex items-center gap-2 font-bold text-violet-200">
                <ShieldCheck className="w-4 h-4 text-violet-400" />
                <span>Certified Refurbished Guarantee — Grade: {p.refurbishedGrade}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Inspected by Veltrix technical laboratory across 32 hardware inspection points. Sanitized and sealed with full accessories and 12-month coverage.
              </p>
            </div>
          )}

          {/* Key Bullet Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Highlights
            </h4>
            <ul className="space-y-1.5">
              {p.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity selector & CTA buttons */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300">Quantity:</span>
              <div className="flex items-center border border-slate-700 bg-slate-900 rounded-lg overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1.5 font-bold tabular-nums text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(p.id)}
                className="p-3 border border-slate-700 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-slate-300 cursor-pointer"
                title="Save to Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Review Tabs */}
      <div className="bg-[#090e24] rounded-3xl border border-slate-800 p-6 space-y-6 shadow-xl">
        <div className="flex items-center gap-4 border-b border-slate-800 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Buyer Reviews ({p.reviewCount})
          </button>
          <button
            onClick={() => setActiveTab('warranty')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'warranty'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Warranty &amp; Returns
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300 divide-y divide-slate-800">
              <tbody className="divide-y divide-slate-800">
                {Object.entries(p.specs).map(([key, value]) => (
                  <tr key={key} className="hover:bg-slate-900/50">
                    <td className="py-2.5 font-bold text-white w-1/3">
                      {key.replace(/_/g, ' ')}
                    </td>
                    <td className="py-2.5 text-slate-300">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#0c1228] border border-slate-800 flex items-center gap-6">
              <div className="text-center">
                <span className="text-3xl font-black text-white">
                  {p.rating.toFixed(1)}
                </span>
                <div className="flex text-amber-400 justify-center mt-1">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Based on {p.reviewCount} reviews
                </span>
              </div>
              <div className="flex-1 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span>5★</span>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[82%] h-full bg-emerald-500" />
                  </div>
                  <span>82%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>4★</span>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[14%] h-full bg-emerald-400" />
                  </div>
                  <span>14%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>3★</span>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[4%] h-full bg-amber-400" />
                  </div>
                  <span>4%</span>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-800 text-xs space-y-3">
              <div className="pt-3">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-white">Rohan Mehta · Verified Buyer</span>
                  <span className="text-slate-400">3 days ago</span>
                </div>
                <div className="flex text-amber-400 mt-1">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <p className="text-slate-300 mt-1">
                  "Exceeded all expectations. Delivery to Bangalore was completed in under 15 minutes, packaging was pristine. Product is 100% genuine."
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'warranty' && (
          <div className="text-xs text-slate-300 space-y-3">
            <p>
              <strong className="text-white">Official Warranty:</strong> {p.warranty}
            </p>
            <p>
              <strong className="text-white">Return &amp; Replacement Policy:</strong> {p.returnPolicy}. If received damaged or defective, instant doorstep replacement or refund is initiated within 24 hours.
            </p>
            <p>
              <strong className="text-white">Customer Support:</strong> 24/7 dedicated assistance via Veltrix app or Toll-Free 1800-VELTRIX.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
