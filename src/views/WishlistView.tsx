import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, navigateTo } = useApp();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-100">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-current" />
          <h1 className="text-2xl font-black text-white">
            My Wishlist ({wishlistedProducts.length})
          </h1>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-[#0c1228] rounded-2xl border border-slate-800 p-12 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Your Wishlist is Empty</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Save items that you like and return to them anytime.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer transition-colors"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
