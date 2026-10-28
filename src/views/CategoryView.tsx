import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryId } from '../types';
import {
  SlidersHorizontal,
  X,
  Star,
  Zap,
  ShieldCheck,
  RotateCcw,
  Search,
} from 'lucide-react';

export const CategoryView: React.FC = () => {
  const {
    selectedCategoryId,
    navigateTo,
    searchQuery,
    setSearchQuery,
  } = useApp();

  // Filters state
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyQuick, setOnlyQuick] = useState<boolean>(false);
  const [onlyRefurbished, setOnlyRefurbished] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active Category Details
  const activeCategory =
    selectedCategoryId !== 'all'
      ? CATEGORIES.find((c) => c.id === selectedCategoryId)
      : null;

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategoryId !== 'all' && p.categoryId !== selectedCategoryId) {
        return false;
      }
      // Subcategory filter
      if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesDesc) return false;
      }
      // Price filter
      if (p.price > maxPrice) return false;
      // Rating filter
      if (p.rating < minRating) return false;
      // Quick Delivery
      if (onlyQuick && !p.isQuickDelivery) return false;
      // Refurbished
      if (onlyRefurbished && !p.isRefurbished) return false;
      // Brand
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') {
        const discA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
        const discB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
        return discB - discA;
      }
      return 0;
    });
  }, [
    selectedCategoryId,
    selectedSubCategory,
    searchQuery,
    maxPrice,
    minRating,
    onlyQuick,
    onlyRefurbished,
    selectedBrand,
    sortBy,
  ]);

  // Extract available brands for this category
  const availableBrands = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) => selectedCategoryId === 'all' || p.categoryId === selectedCategoryId
    ).map((p) => p.brand);
    return Array.from(new Set(list));
  }, [selectedCategoryId]);

  const resetAllFilters = () => {
    setSelectedSubCategory('all');
    setMaxPrice(200000);
    setMinRating(0);
    setOnlyQuick(false);
    setOnlyRefurbished(false);
    setSelectedBrand('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedSubCategory !== 'all' ||
    maxPrice < 200000 ||
    minRating > 0 ||
    onlyQuick ||
    onlyRefurbished ||
    selectedBrand !== 'all' ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 bg-[#070a17] text-slate-100">
      {/* Category Banner / Header */}
      <div className="bg-[#090e24] rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
              <button
                onClick={() => navigateTo('home')}
                className="hover:text-cyan-400 cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-slate-200 font-semibold">
                {activeCategory ? activeCategory.name : 'All Products & Deals'}
              </span>
              {searchQuery && (
                <>
                  <span>/</span>
                  <span className="text-cyan-400 font-bold">Search: "{searchQuery}"</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {activeCategory ? activeCategory.name : 'All Categories & Catalog'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {activeCategory
                ? activeCategory.description
                : 'Browse everything from flagship electronics, genuine fashion, certified refurbished tech, to instant delivery essentials.'}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs text-slate-400 tabular-nums">
              Showing <strong className="text-white">{filteredProducts.length}</strong> items
            </span>
          </div>
        </div>

        {/* Subcategories bar if category is selected */}
        {activeCategory && activeCategory.subcategories.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setSelectedSubCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedSubCategory === 'all'
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                  : 'bg-[#0c1228] border border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
              }`}
            >
              All {activeCategory.name}
            </button>
            {activeCategory.subcategories.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSubCategory === sub
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : 'bg-[#0c1228] border border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Layout: Filter Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block bg-[#090e24] rounded-2xl border border-slate-800 p-5 space-y-6 sticky top-36 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Quick Delivery Filter */}
          <div>
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 cursor-pointer hover:bg-emerald-950/30 transition-colors">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400 fill-current" />
                <span className="text-xs font-bold text-emerald-300">
                  ⚡ 10-15 Min Delivery Only
                </span>
              </div>
              <input
                type="checkbox"
                checked={onlyQuick}
                onChange={(e) => setOnlyQuick(e.target.checked)}
                className="rounded text-emerald-500 bg-slate-900 border-slate-700 w-4 h-4"
              />
            </label>
          </div>

          {/* Refurbished Filter */}
          <div>
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-violet-500/30 bg-violet-950/20 cursor-pointer hover:bg-violet-950/30 transition-colors">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-bold text-violet-300">
                  🛡️ Certified Refurbished
                </span>
              </div>
              <input
                type="checkbox"
                checked={onlyRefurbished}
                onChange={(e) => setOnlyRefurbished(e.target.checked)}
                className="rounded text-violet-500 bg-slate-900 border-slate-700 w-4 h-4"
              />
            </label>
          </div>

          {/* Department / Category Switcher */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Department
            </h4>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => navigateTo('category', { categoryId: 'all' })}
                className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategoryId === 'all'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-[#0c1228] hover:text-white'
                }`}
              >
                All Departments
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => navigateTo('category', { categoryId: cat.id })}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategoryId === cat.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-[#0c1228] hover:text-white'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] opacity-70">
                    {cat.itemCount.toLocaleString('en-IN')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
              <span className="uppercase tracking-wider text-slate-400 text-[11px]">
                Max Price
              </span>
              <span className="tabular-nums text-cyan-400">
                ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={200}
              max={200000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹200</span>
              <span>₹2,00,000</span>
            </div>
          </div>

          {/* Brand Selector */}
          {availableBrands.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Brand
              </h4>
              <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => setSelectedBrand('all')}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs cursor-pointer ${
                    selectedBrand === 'all'
                      ? 'font-bold text-white bg-slate-800'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  All Brands
                </button>
                {availableBrands.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBrand(b)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs truncate cursor-pointer ${
                      selectedBrand === b
                        ? 'font-bold text-white bg-slate-800'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customer Rating */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Customer Rating
            </h4>
            <div className="space-y-1.5">
              {[4, 4.5, 4.8].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setMinRating(minRating === star ? 0 : star)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                    minRating === star
                      ? 'bg-amber-950/40 border border-amber-500/50 font-bold text-amber-300'
                      : 'hover:bg-slate-800 text-slate-300 border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span>{star}★ and above</span>
                  </span>
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid Content Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Top Sort Bar & Mobile Filter Trigger */}
          <div className="bg-[#090e24] rounded-2xl border border-slate-800 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                )}
              </button>

              <span className="text-slate-400">
                Found <strong className="text-white tabular-nums">{filteredProducts.length}</strong> products
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as typeof sortBy)
                }
                className="bg-[#0c1228] border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200 font-medium outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="discount">Biggest Discount (%)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400">Active filters:</span>
              {onlyQuick && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-semibold text-[11px]">
                  ⚡ 15-Min Quick Delivery
                  <button onClick={() => setOnlyQuick(false)} className="cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
              {onlyRefurbished && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-950/60 border border-violet-500/40 text-violet-300 font-semibold text-[11px]">
                  🛡️ Refurbished Only
                  <button onClick={() => setOnlyRefurbished(false)} className="cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-[11px]">
                  Brand: {selectedBrand}
                  <button onClick={() => setSelectedBrand('all')} className="cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 font-semibold text-[11px]">
                  Rating {minRating}★+
                  <button onClick={() => setMinRating(0)} className="cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold text-[11px]">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-slate-400 hover:text-white font-semibold text-xs ml-2 cursor-pointer transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-[#090e24] rounded-2xl border border-slate-800 p-12 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-base font-bold text-white">
                No matching products found
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try adjusting your price range, clearing specific filters, or checking your spelling.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/75 backdrop-blur-sm">
          <div className="w-4/5 max-w-xs bg-[#090e24] border-r border-slate-800 h-full overflow-y-auto p-5 space-y-5 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Delivery */}
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-xs font-bold text-emerald-300">
              <span>⚡ 10-15 Min Delivery Only</span>
              <input
                type="checkbox"
                checked={onlyQuick}
                onChange={(e) => setOnlyQuick(e.target.checked)}
                className="rounded text-emerald-500 bg-slate-900 border-slate-700"
              />
            </label>

            {/* Refurbished */}
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-violet-500/30 bg-violet-950/20 text-xs font-bold text-violet-300">
              <span>🛡️ Refurbished Only</span>
              <input
                type="checkbox"
                checked={onlyRefurbished}
                onChange={(e) => setOnlyRefurbished(e.target.checked)}
                className="rounded text-violet-500 bg-slate-900 border-slate-700"
              />
            </label>

            {/* Price */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1 text-slate-200">
                <span>Max Price:</span>
                <span className="tabular-nums text-cyan-400">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={200}
                max={200000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-2">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-2 text-xs border border-slate-700 hover:bg-slate-800 rounded-xl font-semibold text-slate-300 cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold cursor-pointer"
              >
                Show Results
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileFilterOpen(false)} />
        </div>
      )}
    </div>
  );
};
