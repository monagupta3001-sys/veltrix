import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Heart,
  Check,
  Sparkles,
  Layers,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, navigateTo, addToCompare } = useApp();
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCompare(product);
  };

  return (
    <div
      onClick={() => navigateTo('product-detail', { product })}
      className="group relative flex flex-col bg-[#0c1228] rounded-2xl border border-slate-800 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-950/40 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      {/* Top badges & Wishlist */}
      <div className="absolute top-2.5 inset-x-2.5 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.isDiwaliDeal && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md shadow-xs animate-pulse">
              <Sparkles className="w-3 h-3 fill-current" />
              Diwali Dhamaka
            </span>
          )}
          {product.budgetTier && (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-indigo-600 text-white rounded-md shadow-xs">
              {product.budgetTier === 'under-99'
                ? 'Under ₹99'
                : product.budgetTier === 'under-199'
                ? 'Under ₹199'
                : 'Under ₹499'}
            </span>
          )}
          {product.isQuickDelivery && !product.budgetTier && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-emerald-600 text-white rounded-md shadow-xs">
              <Zap className="w-3 h-3 fill-current" />
              {product.quickDeliveryMinutes || 12}m Delivery
            </span>
          )}
          {product.isRefurbished && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-violet-600 text-white rounded-md shadow-xs">
              <ShieldCheck className="w-3 h-3" />
              {product.refurbishedGrade}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="pointer-events-auto w-8 h-8 rounded-full bg-slate-900/90 backdrop-blur-xs border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-slate-800 shadow-sm transition-transform active:scale-125"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-rose-500 text-rose-500' : ''
            }`}
          />
        </button>
      </div>

      {/* Product Image slot */}
      <div className="relative w-full pt-[78%] bg-[#080d1f] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-108 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-900 text-slate-400">
            <span className="text-xs font-bold uppercase text-slate-500">
              {product.brand}
            </span>
            <span className="text-xs font-bold text-slate-200 text-center mt-1 line-clamp-2">
              {product.name}
            </span>
          </div>
        )}

        {/* Quick action overlay on hover */}
        <div className="absolute inset-x-2 bottom-2 z-10 hidden sm:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" /> Quick Add
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCompareClick}
            className="p-2 text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl shadow-sm transition-colors cursor-pointer"
            title="Add to Compare"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2 bg-[#0c1228]">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span className="uppercase tracking-wider text-[11px] font-bold text-cyan-400">
              {product.brand}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate text-slate-400">{product.subCategory}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-bold text-white mt-1 line-clamp-2 group-hover:text-cyan-300 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Ratings & Deal progress */}
          <div className="flex items-center gap-2 mt-1.5">
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-bold text-white bg-emerald-600 rounded">
              <span>{product.rating.toFixed(1)}</span>
              <Star className="w-2.5 h-2.5 fill-current" />
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums">
              ({product.reviewCount.toLocaleString('en-IN')})
            </span>
          </div>

          {/* Sold percentage bar if available */}
          {product.soldPercentage && (
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                <span className="text-amber-400 font-bold">Limited Stock</span>
                <span>{product.soldPercentage}% claimed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  style={{ width: `${product.soldPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-slate-800 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-white tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {discountPercentage > 0 && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <span className="text-xs font-bold text-emerald-400 tabular-nums">
                {discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Mobile view quick add button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="sm:hidden p-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-xs"
            aria-label="Add to cart"
          >
            {isAdded ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
