import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  ServiceBooking,
  CategoryId,
  DeliveryAddress,
  PaymentMethod,
  UserProfile,
} from '../types';
import { PRODUCTS } from '../data/products';

export type AppView =
  | 'home'
  | 'category'
  | 'quick-delivery'
  | 'refurbished'
  | 'services'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'my-orders'
  | 'wishlist'
  | 'budget-store';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  // Navigation & View
  currentView: AppView;
  selectedCategoryId: CategoryId | 'all';
  selectedProduct: Product | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeBudgetTier: 'under-99' | 'under-199' | 'under-499' | 'all';
  setActiveBudgetTier: (tier: 'under-99' | 'under-199' | 'under-499' | 'all') => void;
  navigateTo: (view: AppView, options?: { categoryId?: CategoryId | 'all'; product?: Product; budgetTier?: 'under-99' | 'under-199' | 'under-499' | 'all'; scrollToTop?: boolean }) => void;

  // Gateway First Page Mode
  isInGateway: boolean;
  setIsInGateway: (inGateway: boolean) => void;
  enterStore: () => void;
  returnToGateway: () => void;

  // User Profile & Authentication
  user: UserProfile;
  login: (name: string, email: string, phone?: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Cart Management
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders
  orders: Order[];
  latestOrder: Order | null;
  placeOrder: (details: {
    address: DeliveryAddress;
    paymentMethod: PaymentMethod;
    deliveryType: 'standard' | 'quick';
  }) => Order;

  // Services
  serviceBookings: ServiceBooking[];
  addServiceBooking: (booking: Omit<ServiceBooking, 'id' | 'createdAt' | 'status'>) => ServiceBooking;

  // Quick Delivery & Location
  selectedPincode: string;
  pincodeCity: string;
  isQuickEligible: boolean;
  setPincode: (pin: string) => boolean;

  // Compare products
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SUPPORTED_QUICK_PINCODES: Record<string, string> = {
  '560001': 'Bengaluru, MG Road (Delivering in 10 mins)',
  '560038': 'Bengaluru, Indiranagar (Delivering in 12 mins)',
  '560100': 'Bengaluru, Electronic City (Delivering in 14 mins)',
  '110001': 'New Delhi, Connaught Place (Delivering in 11 mins)',
  '110016': 'New Delhi, Hauz Khas (Delivering in 12 mins)',
  '400001': 'Mumbai, Fort (Delivering in 10 mins)',
  '400050': 'Mumbai, Bandra West (Delivering in 13 mins)',
  '500081': 'Hyderabad, HITEC City (Delivering in 12 mins)',
  '600002': 'Chennai, Mount Road (Delivering in 15 mins)',
  '700001': 'Kolkata, BBD Bagh (Delivering in 15 mins)',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBudgetTier, setActiveBudgetTier] = useState<'under-99' | 'under-199' | 'under-499' | 'all'>('all');
  // First page / Gateway Screen (Defaults to true: first page is just Shop Now and Sign In)
  const [isInGateway, setIsInGateway] = useState<boolean>(true);

  const enterStore = () => {
    setIsInGateway(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const returnToGateway = () => {
    setIsInGateway(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('veltrix_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      name: 'Mona Gupta',
      email: 'monagupta3001@gmail.com',
      phone: '+91 98765 43210',
      isLoggedIn: true,
      superCoins: 350,
      savedAddressesCount: 2,
    };
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Location / Pincode
  const [selectedPincode, setSelectedPincodeState] = useState<string>('560038');
  const [pincodeCity, setPincodeCity] = useState<string>('Bengaluru, Indiranagar');
  const [isQuickEligible, setIsQuickEligible] = useState<boolean>(true);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('veltrix_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    const sampleProduct = PRODUCTS.find((p) => p.id === 'b-499-1') || PRODUCTS[0];
    return sampleProduct ? [{ product: sampleProduct, quantity: 1 }] : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('veltrix_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['comp-1', 'acc-1', 'refurb-1', 'b-99-1'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('veltrix_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    const p1 = PRODUCTS.find((p) => p.id === 'phone-4') || PRODUCTS[1];
    return [
      {
        id: 'VTX-982142',
        date: 'Yesterday, 4:15 PM',
        items: [{ product: p1, quantity: 1 }],
        subtotal: p1.price,
        discount: 300,
        deliveryFee: 0,
        total: p1.price - 300,
        address: {
          fullName: 'Mona Gupta',
          phoneNumber: '+91 98765 43210',
          pincode: '560038',
          houseFlat: 'Penthouse 402, Skyline Residency',
          streetArea: '100 Feet Road, Indiranagar',
          landmark: 'Opposite Metro Pillar 124',
          city: 'Bengaluru',
          state: 'Karnataka',
          addressType: 'Home',
        },
        paymentMethod: 'upi',
        paymentStatus: 'Paid',
        deliveryType: 'quick',
        estimatedDelivery: 'Delivered in 12 mins',
        status: 'Delivered',
      },
    ];
  });

  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Service Bookings
  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>(() => {
    try {
      const saved = localStorage.getItem('veltrix_service_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Coupon (Pre-populated with Diwali Dhamaka coupon)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('DIWALI500');

  // Compare
  const [compareList, setCompareList] = useState<Product[]>([]);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('veltrix_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('veltrix_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('veltrix_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('veltrix_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('veltrix_service_bookings', JSON.stringify(serviceBookings));
    } catch {
      // ignore
    }
  }, [serviceBookings]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (name: string, email: string, phone: string = '+91 98765 43210') => {
    const updated: UserProfile = {
      name: name.trim() || 'Valued Shopper',
      email: email.trim(),
      phone,
      isLoggedIn: true,
      superCoins: user.superCoins || 350,
      savedAddressesCount: user.savedAddressesCount || 2,
    };
    setUser(updated);
    addToast({
      type: 'success',
      title: `Welcome back, ${updated.name.split(' ')[0]}!`,
      message: 'Logged in successfully with Veltrix Prime benefits active.',
    });
  };

  const logout = () => {
    setUser({
      name: 'Guest User',
      email: '',
      phone: '',
      isLoggedIn: false,
      superCoins: 0,
      savedAddressesCount: 0,
    });
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You are now browsing as guest.',
    });
  };

  const setPincode = (pin: string): boolean => {
    const cleanPin = pin.trim();
    setSelectedPincodeState(cleanPin);
    if (SUPPORTED_QUICK_PINCODES[cleanPin]) {
      setPincodeCity(SUPPORTED_QUICK_PINCODES[cleanPin]);
      setIsQuickEligible(true);
      addToast({
        type: 'success',
        title: '⚡ 12-Min Quick Delivery Active!',
        message: `Superfast 10-15 minute delivery unlocked for ${cleanPin}.`,
      });
      return true;
    } else {
      setPincodeCity(`Pincode ${cleanPin} (Standard Delivery 24-48 hrs)`);
      setIsQuickEligible(false);
      addToast({
        type: 'info',
        title: 'Standard Delivery Active',
        message: `Pincode ${cleanPin} supports Standard Delivery. Try 560038 or 110001 for 15-min delivery!`,
      });
      return false;
    }
  };

  const navigateTo = (
    view: AppView,
    options?: {
      categoryId?: CategoryId | 'all';
      product?: Product;
      budgetTier?: 'under-99' | 'under-199' | 'under-499' | 'all';
      scrollToTop?: boolean;
    }
  ) => {
    if (options?.categoryId !== undefined) {
      setSelectedCategoryId(options.categoryId);
    }
    if (options?.budgetTier !== undefined) {
      setActiveBudgetTier(options.budgetTier);
    }
    if (options?.product !== undefined) {
      setSelectedProduct(options.product);
    }
    setCurrentView(view);
    if (options?.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart operations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartDiscount = cart.reduce(
    (total, item) =>
      total + (item.product.originalPrice - item.product.price) * item.quantity,
    0
  );

  const couponDiscount =
    appliedCoupon === 'DIWALI500' && cartSubtotal >= 999
      ? 500
      : appliedCoupon === 'DHAMAKA50'
      ? Math.min(1000, Math.round(cartSubtotal * 0.5))
      : appliedCoupon === 'VELTRIX500' && cartSubtotal >= 1499
      ? 500
      : appliedCoupon === 'FESTIVE10'
      ? Math.round(cartSubtotal * 0.1)
      : appliedCoupon === 'QUICK100'
      ? 100
      : 0;

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'DIWALI500') {
      if (cartSubtotal < 999) {
        return { success: false, message: 'Minimum cart value of ₹999 required for DIWALI500' };
      }
      setAppliedCoupon('DIWALI500');
      addToast({ type: 'success', title: '🪔 Diwali Dhamaka Applied!', message: 'Saved flat ₹500 with DIWALI500' });
      return { success: true, message: 'Diwali Dhamaka ₹500 discount applied!' };
    } else if (clean === 'DHAMAKA50') {
      setAppliedCoupon('DHAMAKA50');
      addToast({ type: 'success', title: '💥 50% Dhamaka Applied!', message: '50% off up to ₹1,000 applied!' });
      return { success: true, message: '50% Festive Dhamaka applied!' };
    } else if (clean === 'VELTRIX500') {
      if (cartSubtotal < 1499) {
        return { success: false, message: 'Minimum cart value of ₹1,499 required for VELTRIX500' };
      }
      setAppliedCoupon('VELTRIX500');
      addToast({ type: 'success', title: 'Coupon Applied!', message: 'Saved ₹500 with VELTRIX500' });
      return { success: true, message: 'Coupon applied successfully!' };
    }
    return { success: false, message: 'Invalid code. Try DIWALI500 or DHAMAKA50!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast({ type: 'info', title: 'Coupon Removed' });
  };

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor, selectedSize }];
    });
    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name.slice(0, 36)}...`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast({ type: 'info', title: 'Item removed from cart' });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast({ type: 'info', title: 'Removed from Wishlist' });
        return prev.filter((id) => id !== productId);
      } else {
        addToast({ type: 'success', title: 'Saved to Wishlist' });
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const placeOrder = (details: {
    address: DeliveryAddress;
    paymentMethod: PaymentMethod;
    deliveryType: 'standard' | 'quick';
  }): Order => {
    const deliveryFee = details.deliveryType === 'quick' ? 29 : cartSubtotal >= 499 ? 0 : 49;
    const finalTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);
    const orderId = 'VTX-' + Math.floor(100000 + Math.random() * 900000);

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const estDelivery =
      details.deliveryType === 'quick'
        ? 'Delivering in 12-15 minutes (Express Courier Assigned)'
        : 'Estimated Delivery in 2 Days';

    const newOrder: Order = {
      id: orderId,
      date: dateStr,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount + couponDiscount,
      deliveryFee,
      total: finalTotal,
      address: details.address,
      paymentMethod: details.paymentMethod,
      paymentStatus: details.paymentMethod === 'cod' ? 'Pending COD' : 'Paid',
      deliveryType: details.deliveryType,
      estimatedDelivery: estDelivery,
      status: 'Confirmed',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    setCurrentView('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast({
      type: 'success',
      title: '🎉 Order Placed Successfully!',
      message: `Order ID ${newOrder.id} has been confirmed.`,
    });

    return newOrder;
  };

  const addServiceBooking = (
    booking: Omit<ServiceBooking, 'id' | 'createdAt' | 'status'>
  ): ServiceBooking => {
    const id = 'SRV-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking: ServiceBooking = {
      ...booking,
      id,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Confirmed',
    };
    setServiceBookings((prev) => [newBooking, ...prev]);
    addToast({
      type: 'success',
      title: 'Service Booked!',
      message: `Your booking for ${booking.service.title.slice(0, 32)}... is confirmed for ${booking.date}.`,
    });
    return newBooking;
  };

  const addToCompare = (product: Product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        addToast({ type: 'info', title: 'Already in compare list' });
        return prev;
      }
      if (prev.length >= 3) {
        addToast({ type: 'error', title: 'Compare limit reached', message: 'You can compare up to 3 products at a time.' });
        return prev;
      }
      addToast({ type: 'success', title: 'Added to compare' });
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedCategoryId,
        selectedProduct,
        searchQuery,
        setSearchQuery,
        activeBudgetTier,
        setActiveBudgetTier,
        navigateTo,

        isInGateway,
        setIsInGateway,
        enterStore,
        returnToGateway,

        user,
        login,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,

        cart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,

        wishlist,
        toggleWishlist,
        isWishlisted,

        orders,
        latestOrder,
        placeOrder,

        serviceBookings,
        addServiceBooking,

        selectedPincode,
        pincodeCity,
        isQuickEligible,
        setPincode,

        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
