import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag,
  ShoppingBag,
  ArrowLeft,
  X,
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    navigateTo,
    selectedPincode,
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const deliveryFee = cartSubtotal >= 499 ? 0 : 49;
  const grandTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4 bg-[#070a17] text-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400 mx-auto flex items-center justify-center shadow-lg">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Explore millions of products across electronics, fashion, groceries, and certified refurbished tech.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 bg-[#070a17] text-slate-100">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Deliver to Pincode <strong className="font-mono text-cyan-400">{selectedPincode}</strong>
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('category', { categoryId: 'all' })}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 bg-[#090e24] rounded-2xl border border-slate-800 p-6 divide-y divide-slate-800/80 space-y-4 shadow-xl">
          {cart.map((item) => {
            const p = item.product;
            const itemTotal = p.price * item.quantity;
            return (
              <div
                key={p.id}
                className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 object-contain bg-[#080d1f] rounded-xl p-2 border border-slate-800 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="font-bold uppercase tracking-wider text-cyan-400">
                        {p.brand}
                      </span>
                      {p.isQuickDelivery && (
                        <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                          <Zap className="w-3 h-3 fill-current" /> 15m Delivery
                        </span>
                      )}
                      {p.isRefurbished && (
                        <span className="text-violet-400 font-bold flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3" /> {p.refurbishedGrade}
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => navigateTo('product-detail', { product: p })}
                      className="text-sm font-bold text-white hover:text-cyan-300 cursor-pointer transition-colors mt-0.5 line-clamp-2"
                    >
                      {p.name}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      Warranty: {p.warranty.slice(0, 36)}...
                    </p>

                    {/* Mobile Price */}
                    <div className="sm:hidden mt-2 flex items-baseline gap-2">
                      <span className="text-base font-bold text-white tabular-nums">
                        ₹{itemTotal.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500 line-through tabular-nums">
                        ₹{(p.originalPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Steppers & Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="flex items-center border border-slate-700 bg-slate-900 rounded-lg overflow-hidden text-xs">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(p.id, item.quantity - 1)}
                      className="p-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3.5 py-1 font-bold text-white tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(p.id, item.quantity + 1)}
                      className="p-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Desktop Price */}
                  <div className="hidden sm:block text-right min-w-[90px]">
                    <span className="text-base font-bold text-white tabular-nums block">
                      ₹{itemTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 line-through tabular-nums">
                      ₹{(p.originalPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(p.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-800 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary & Coupon Card */}
        <div className="lg:col-span-4 space-y-4">
          {/* Coupon Box */}
          <div className="bg-[#090e24] rounded-2xl border border-slate-800 p-5 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Tag className="w-4 h-4 text-cyan-400" />
              <span>Apply Promo Code</span>
            </div>

            {appliedCoupon ? (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-emerald-300 font-mono">{appliedCoupon}</span>
                  <p className="text-[11px] text-emerald-400">Saved ₹{couponDiscount.toLocaleString('en-IN')}</p>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="p-1 text-emerald-400 hover:text-emerald-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setCouponError('');
                  }}
                  placeholder="e.g. DIWALI500"
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white uppercase font-mono outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}

            {couponError && (
              <p className="text-[11px] text-rose-400 font-medium">{couponError}</p>
            )}

            {/* Quick coupon recommendation pill */}
            {!appliedCoupon && (
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span>Try code </span>
                <button
                  type="button"
                  onClick={() => applyCoupon('DIWALI500')}
                  className="font-bold font-mono text-amber-300 hover:text-amber-200 bg-amber-950/40 border border-amber-500/30 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                >
                  DIWALI500
                </button>
                <span> for ₹500 festive discount</span>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="bg-[#090e24] rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white pb-3 border-b border-slate-800">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-white tabular-nums">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Product Discounts:</span>
                  <span className="tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount ({appliedCoupon}):</span>
                  <span className="tabular-nums">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span className="tabular-nums">
                  {deliveryFee === 0 ? (
                    <strong className="text-emerald-400">FREE</strong>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between text-white">
              <div>
                <span className="text-sm font-extrabold block">Total Amount</span>
                <span className="text-[10px] text-slate-400">Inclusive of all taxes</span>
              </div>
              <span className="text-2xl font-black text-cyan-400 tabular-nums">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('checkout')}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-950/60 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safe &amp; Secure 256-bit Encrypted Checkout</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
