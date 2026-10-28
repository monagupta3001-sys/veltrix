import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { CategoryId } from '../types';
import {
  Search,
  ShoppingCart,
  Heart,
  Package,
  MapPin,
  Zap,
  ShieldCheck,
  Wrench,
  ChevronDown,
  X,
  Menu,
  Clock,
  Sparkles,
  User,
  Flame,
  Tag,
} from 'lucide-react';

interface NavbarProps {
  onOpenPincodeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPincodeModal }) => {
  const {
    currentView,
    selectedCategoryId,
    navigateTo,
    cartCount,
    cartSubtotal,
    wishlist,
    selectedPincode,
    pincodeCity,
    isQuickEligible,
    searchQuery,
    setSearchQuery,
    user,
    setIsAuthModalOpen,
    returnToGateway,
  } = useApp();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [searchCategory, setSearchCategory] = useState<CategoryId | 'all'>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchSuggestions = localSearch.trim()
    ? PRODUCTS.filter((p) => {
        const matchesQuery =
          p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.brand.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(localSearch.toLowerCase());
        const matchesCat =
          searchCategory === 'all' || p.categoryId === searchCategory;
        return matchesQuery && matchesCat;
      }).slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setIsSearchOpen(false);
    navigateTo('category', { categoryId: searchCategory });
  };

  const handleSelectSuggestion = (product: (typeof PRODUCTS)[0]) => {
    setLocalSearch('');
    setIsSearchOpen(false);
    navigateTo('product-detail', { product });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070b18] shadow-md border-b border-slate-800 text-white">
      {/* 1. Top Vibrant Festive Diwali Dhamaka Ticker */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white text-[11px] sm:text-xs font-semibold px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <span className="px-2 py-0.2 bg-white/20 backdrop-blur-xs rounded-full uppercase tracking-wider text-[10px] font-black">
            DIWALI DHAMAKA 50%+ OFF
          </span>
          <span className="truncate">
            Use code <strong className="font-mono bg-white/20 px-1.5 py-0.5 rounded text-yellow-200">DIWALI500</strong> for extra ₹500 off!
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0 text-[11px]">
          <button
            type="button"
            onClick={onOpenPincodeModal}
            className="flex items-center gap-1 hover:text-yellow-200 cursor-pointer transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Deliver to:</span>
            <span className="font-bold">{selectedPincode}</span>
          </button>
          <span className="hidden md:inline">|</span>
          <button
            onClick={() => navigateTo('my-orders')}
            className="hidden md:flex items-center gap-1 hover:text-yellow-200 transition-colors"
          >
            <Package className="w-3.5 h-3.5" /> Track Orders
          </button>
          <span>|</span>
          <button
            onClick={returnToGateway}
            className="flex items-center gap-1 bg-black/30 hover:bg-black/50 px-2 py-0.5 rounded-full font-bold text-yellow-200 transition-colors cursor-pointer"
            title="Return to Welcome Landing & Gateway"
          >
            <span>⚡ Welcome Gateway</span>
          </button>
        </div>
      </div>

      {/* 2. Main Brand & Search Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
            }}
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="h-10 sm:h-11 flex items-center overflow-hidden rounded-xl bg-slate-950 px-2 py-1 shadow-sm border border-slate-800">
              <img
                src="/assets/aistudio/Gemini_Generated_Image_4pyjhv4pyjhv4pyj_2bb52d66.png"
                alt="Veltrix Logo"
                className="h-8 sm:h-9 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('/public/')) {
                    target.src =
                      '/public/assets/aistudio/Gemini_Generated_Image_4pyjhv4pyjhv4pyj_2bb52d66.png';
                  }
                }}
              />
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white ml-2">
                VELTRIX
              </span>
            </div>
          </a>
        </div>

        {/* Global Search Bar (Matching Image 1) */}
        <div
          ref={searchContainerRef}
          className="relative flex-1 max-w-2xl hidden md:block"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-xl bg-[#0f1738] border border-slate-700/80 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/30 overflow-hidden shadow-lg transition-all"
          >
            {/* Category Dropdown */}
            <select
              value={searchCategory}
              onChange={(e) =>
                setSearchCategory(e.target.value as CategoryId | 'all')
              }
              className="bg-[#0b1028] text-xs font-semibold text-slate-300 py-2.5 px-3 border-r border-slate-700/80 outline-none cursor-pointer hover:bg-slate-800"
            >
              <option value="all">All Departments</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Input */}
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Advanced search for smart auto-suggestions..."
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 outline-none"
            />

            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  setSearchQuery('');
                }}
                className="p-1.5 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Search Button (Blue/Purple Gradient as in Image 1) */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-5 py-2.5 text-sm flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0c132f] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in duration-100">
              <div className="p-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <span>Matching Products</span>
                <span>{searchSuggestions.length} found</span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
                {searchSuggestions.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(prod)}
                    className="w-full p-2.5 flex items-center gap-3 text-left hover:bg-slate-800 transition-colors"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-11 h-11 object-contain rounded-lg bg-slate-900 p-1 shrink-0 border border-slate-800"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-100 truncate">
                        {prod.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="font-bold text-cyan-400">{prod.brand}</span>
                        <span>·</span>
                        <span className="text-white font-extrabold tabular-nums">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.isDiwaliDeal && (
                          <span className="text-amber-400 font-bold text-[10px]">
                            🪔 Diwali Dhamaka
                          </span>
                        )}
                        {prod.isQuickDelivery && (
                          <span className="text-emerald-400 font-bold text-[10px]">
                            ⚡ 15m Delivery
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Account, Wishlist & Cart */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Sign In / Account Button */}
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-700/80 bg-slate-900/90 hover:border-cyan-400 hover:bg-slate-800 transition-all text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:block text-xs leading-tight">
              {user.isLoggedIn ? (
                <>
                  <span className="text-[10px] text-slate-400 block">
                    Hello, {user.name.split(' ')[0]}
                  </span>
                  <span className="font-bold text-white flex items-center gap-1">
                    🪙 {user.superCoins} Coins
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[10px] text-slate-400 block">Sign In</span>
                  <span className="font-bold text-white">Account & Deals</span>
                </>
              )}
            </div>
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => navigateTo('wishlist')}
            className="relative p-2 text-slate-600 hover:text-rose-600 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => navigateTo('cart')}
            className="flex items-center gap-2.5 px-3.5 py-2.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black rounded-xl shadow-md transition-all active:scale-95"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-slate-950" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 px-1.5 py-0.2 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[9px] uppercase tracking-wider text-slate-900 font-extrabold">
                Cart Total
              </span>
              <span className="text-xs font-black tabular-nums text-slate-950">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Row */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="relative flex">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search phones, under ₹99, festive offers..."
            className="w-full bg-slate-100 border border-slate-300 rounded-xl pl-3 pr-10 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-500 focus:bg-white"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-cyan-500 rounded-lg text-slate-950 font-bold"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 3. Category & Budget Stores Navigation Strip */}
      <nav className="bg-slate-50 border-t border-slate-200/80 px-4 sm:px-8 py-2 overflow-x-auto scrollbar-none flex items-center gap-2 text-xs font-semibold whitespace-nowrap">
        {/* Diwali Dhamaka Banner Button */}
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black shadow-xs hover:brightness-105"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          Diwali Dhamaka
        </button>

        {/* Budget Deal Stores */}
        <button
          type="button"
          onClick={() => navigateTo('budget-store', { budgetTier: 'under-99' })}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-bold"
        >
          <Flame className="w-3.5 h-3.5 text-emerald-600 fill-current" />
          Under ₹99
        </button>

        <button
          type="button"
          onClick={() => navigateTo('budget-store', { budgetTier: 'under-199' })}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 font-bold"
        >
          <Tag className="w-3.5 h-3.5 text-sky-600" />
          Under ₹199
        </button>

        <button
          type="button"
          onClick={() => navigateTo('budget-store', { budgetTier: 'under-499' })}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 font-bold"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          Under ₹499
        </button>

        <span className="text-slate-300">|</span>

        {/* Quick Delivery Tab */}
        <button
          type="button"
          onClick={() => navigateTo('quick-delivery')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
            currentView === 'quick-delivery'
              ? 'bg-emerald-600 text-white font-bold shadow-xs'
              : 'text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          Quick Delivery (12m)
        </button>

        {/* Refurbished Tab */}
        <button
          type="button"
          onClick={() => navigateTo('refurbished')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
            currentView === 'refurbished'
              ? 'bg-violet-600 text-white font-bold shadow-xs'
              : 'text-violet-700 hover:bg-violet-50'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Refurbished Hub
        </button>

        {/* Services Tab */}
        <button
          type="button"
          onClick={() => navigateTo('services')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            currentView === 'services'
              ? 'bg-amber-600 text-white font-bold shadow-xs'
              : 'text-amber-800 hover:bg-amber-100/60'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          Doorstep Services
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white text-slate-900 h-full overflow-y-auto p-5 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="text-xl font-black text-cyan-600">VELTRIX</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User snippet */}
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="my-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center">
                  {user.isLoggedIn ? user.name.charAt(0) : 'U'}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-xs">
                    {user.isLoggedIn ? user.name : 'Sign In / Register'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {user.isLoggedIn ? `🪙 ${user.superCoins} Coins` : 'Unlock member deals'}
                  </p>
                </div>
              </div>

              <div className="py-2 space-y-1 text-xs font-semibold">
                <button
                  onClick={() => {
                    navigateTo('home');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100"
                >
                  Home & Deals
                </button>
                <button
                  onClick={() => {
                    navigateTo('budget-store', { budgetTier: 'under-99' });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-700 flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 fill-current" /> Under ₹99 Store
                </button>
                <button
                  onClick={() => {
                    navigateTo('budget-store', { budgetTier: 'under-199' });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-sky-50 text-sky-700 flex items-center gap-2"
                >
                  <Tag className="w-4 h-4" /> Under ₹199 Store
                </button>
                <button
                  onClick={() => {
                    navigateTo('quick-delivery');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-700 flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" /> Quick Delivery (12 Mins)
                </button>
                <button
                  onClick={() => {
                    navigateTo('refurbished');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-violet-50 text-violet-700 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" /> Certified Refurbished
                </button>
                <button
                  onClick={() => {
                    navigateTo('services');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-50 text-amber-700 flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4" /> Doorstep Services
                </button>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  All 14 Categories
                </p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        navigateTo('category', { categoryId: cat.id });
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-100 text-xs text-slate-700"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPincodeModal();
                }}
                className="w-full py-2 px-3 bg-slate-100 rounded-xl text-slate-800 font-bold flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan-600" /> Change Location ({selectedPincode})
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
