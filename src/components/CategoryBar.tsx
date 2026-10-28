import React from 'react';
import { useApp } from '../context/AppContext';
import { CategoryId } from '../types';

interface CategoryBarItem {
  id: CategoryId | 'for-you';
  label: string;
  renderIcon: (isActive: boolean) => React.ReactNode;
}

export const CategoryBar: React.FC = () => {
  const { currentView, selectedCategoryId, navigateTo } = useApp();

  const isForYouActive = currentView === 'home' || (currentView === 'category' && selectedCategoryId === 'all');

  const items: CategoryBarItem[] = [
    {
      id: 'for-you',
      label: 'For You',
      renderIcon: (active) => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Shopping Bag with Yellow Accent */}
          <rect x="7" y="10" width="22" height="22" rx="5" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <path d="M12 14C12 10.6863 14.6863 8 18 8C21.3137 8 24 10.6863 24 14" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
          {/* Yellow inside pocket */}
          <path d="M13 18C13 20.7614 15.2386 23 18 23C20.7614 23 23 18 23 18" stroke="#FACC15" strokeWidth="2" fill="#FACC15" />
        </svg>
      ),
    },
    {
      id: 'mens-fashion',
      label: 'Fashion',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* T-Shirt with yellow hem */}
          <path d="M11 7L6 12L10 16L12 13V29H24V13L26 16L30 12L25 7C23.5 10 12.5 10 11 7Z" stroke="#94a3b8" strokeWidth="2.2" strokeLinejoin="round" fill="#131d3d" />
          <path d="M12 25H24V29H12V25Z" fill="#FACC15" stroke="#FACC15" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      id: 'smartphones-accessories',
      label: 'Mobiles',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Mobile phone with yellow chin */}
          <rect x="11" y="5" width="14" height="26" rx="3.5" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <line x1="16" y1="8" x2="20" y2="8" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <path d="M11 25H25V27.5C25 29.433 23.433 31 21.5 31H14.5C12.567 31 11 29.433 11 27.5V25Z" fill="#FACC15" />
          <circle cx="18" cy="28" r="1.5" fill="#0b1026" />
        </svg>
      ),
    },
    {
      id: 'computers-laptops',
      label: 'Electronics',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Laptop with yellow keyboard deck */}
          <rect x="8" y="8" width="20" height="15" rx="2" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <path d="M4 27H32L29 23H7L4 27Z" fill="#FACC15" stroke="#FACC15" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'beauty-personal-care',
      label: 'Beauty',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Lipstick with yellow tip */}
          <rect x="13" y="16" width="10" height="15" rx="2" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <path d="M14 16V10L21 6V16H14Z" fill="#FACC15" stroke="#FACC15" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'home-kitchen',
      label: 'Home',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Desk Lamp with yellow shade */}
          <path d="M13 7L10 16H26L23 7H13Z" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinejoin="round" />
          <line x1="18" y1="16" x2="18" y2="29" stroke="#94a3b8" strokeWidth="2.4" />
          <line x1="12" y1="29" x2="24" y2="29" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'electronics',
      label: 'Appliances',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* TV Screen with yellow base bar */}
          <rect x="6" y="8" width="24" height="16" rx="2" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <line x1="10" y1="22" x2="26" y2="22" stroke="#FACC15" strokeWidth="2.5" />
          <path d="M13 28L18 24L23 28" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'toys-games',
      label: 'Toys, Baby',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Teddy Bear with yellow tummy */}
          <circle cx="10" cy="9" r="3" stroke="#94a3b8" strokeWidth="2" fill="#131d3d" />
          <circle cx="26" cy="9" r="3" stroke="#94a3b8" strokeWidth="2" fill="#131d3d" />
          <circle cx="18" cy="14" r="6" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <path d="M12 25C12 21 14.5 19 18 19C21.5 19 24 21 24 25C24 29 21.5 31 18 31C14.5 31 12 29 12 25Z" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <circle cx="18" cy="25" r="3" fill="#FACC15" />
        </svg>
      ),
    },
    {
      id: 'grocery-daily-essentials',
      label: 'Food & Grocery',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Grocery Jar with yellow band */}
          <rect x="13" y="6" width="10" height="4" rx="1.5" stroke="#94a3b8" strokeWidth="2" fill="#131d3d" />
          <rect x="10" y="10" width="16" height="20" rx="4" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <rect x="10" y="16" width="16" height="7" fill="#FACC15" stroke="#FACC15" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      id: 'other-accessories',
      label: 'Auto Acc.',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Helmet with yellow visor */}
          <path d="M10 24C8 22 7 18 7 15C7 9.5 11.5 5 18 5C24.5 5 29 9.5 29 15C29 22 26 27 20 28H14C11.5 28 9.5 26.5 10 24Z" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <path d="M14 13H24L26 19H17L14 13Z" fill="#FACC15" stroke="#FACC15" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'sports-fitness',
      label: 'Sports & ...',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Cricket bat & ball with yellow ball */}
          <path d="M12 28L24 7L27 9L15 30L12 28Z" stroke="#94a3b8" strokeWidth="2.2" strokeLinejoin="round" fill="#131d3d" />
          <line x1="23" y1="8" x2="28" y2="3" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="10" cy="22" r="3.5" fill="#FACC15" stroke="#FACC15" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'home-kitchen',
      label: 'Furniture',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Sofa/Couch with yellow cushion */}
          <path d="M7 16V26H29V16" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="5" y="14" width="4" height="12" rx="2" stroke="#94a3b8" strokeWidth="2" fill="#131d3d" />
          <rect x="27" y="14" width="4" height="12" rx="2" stroke="#94a3b8" strokeWidth="2" fill="#131d3d" />
          <path d="M9 19H27V24H9V19Z" fill="#FACC15" stroke="#FACC15" strokeWidth="1.5" />
          <line x1="8" y1="26" x2="8" y2="29" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="28" y1="26" x2="28" y2="29" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'books-stationery',
      label: 'Books',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Book with yellow ribbon */}
          <rect x="8" y="7" width="20" height="23" rx="3" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <line x1="13" y1="7" x2="13" y2="30" stroke="#94a3b8" strokeWidth="2" />
          <path d="M17 7V16L21 13L25 16V7H17Z" fill="#FACC15" stroke="#FACC15" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'other-accessories',
      label: '2 Wheele...',
      renderIcon: () => (
        <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
          {/* Scooter with yellow headlight */}
          <circle cx="10" cy="26" r="4" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <circle cx="26" cy="26" r="4" stroke="#94a3b8" strokeWidth="2.2" fill="#131d3d" />
          <path d="M10 26H20L24 13H28" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="28" cy="13" r="2.5" fill="#FACC15" stroke="#FACC15" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  const handleItemClick = (item: CategoryBarItem) => {
    if (item.id === 'for-you') {
      navigateTo('home');
    } else {
      navigateTo('category', { categoryId: item.id });
    }
  };

  return (
    <div className="w-full bg-[#0b1026] border-b border-slate-800/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto scrollbar-none py-1.5 gap-2 sm:gap-6">
          {items.map((item) => {
            const isActive =
              item.id === 'for-you'
                ? isForYouActive
                : currentView === 'category' && selectedCategoryId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item)}
                className="group relative flex flex-col items-center shrink-0 pt-1 pb-2 px-2.5 transition-all text-center focus:outline-none cursor-pointer"
              >
                {/* Icon Container */}
                <div
                  className={`w-11 h-11 flex items-center justify-center rounded-xl transition-transform group-hover:scale-108 ${
                    item.id === 'for-you' && isActive
                      ? 'bg-blue-600/25 border border-blue-500/40 shadow-xs'
                      : 'bg-transparent'
                  }`}
                >
                  {item.renderIcon(isActive)}
                </div>

                {/* Label */}
                <span
                  className={`text-[12px] sm:text-[13px] tracking-tight whitespace-nowrap mt-1 transition-colors ${
                    isActive
                      ? 'font-bold text-white'
                      : 'font-medium text-slate-300 group-hover:text-cyan-400'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active bottom blue bar indicator */}
                {isActive && (
                  <div className="absolute bottom-0 inset-x-1 h-[3px] bg-blue-500 rounded-t-full shadow-sm shadow-blue-500/50" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
