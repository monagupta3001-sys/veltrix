export type CategoryId =
  | 'electronics'
  | 'smartphones-accessories'
  | 'computers-laptops'
  | 'mens-fashion'
  | 'womens-fashion'
  | 'kids-fashion'
  | 'footwear'
  | 'home-kitchen'
  | 'beauty-personal-care'
  | 'grocery-daily-essentials'
  | 'books-stationery'
  | 'toys-games'
  | 'sports-fitness'
  | 'other-accessories';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  itemCount: number;
  subcategories: string[];
  bannerColor: string;
}

export type RefurbishedGrade = 'Like New' | 'Superb' | 'Good Value';

export interface Product {
  id: string;
  name: string;
  brand: string;
  categoryId: CategoryId;
  subCategory: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
  image: string;
  additionalImages?: string[];
  features: string[];
  specs: Record<string, string>;
  isQuickDelivery: boolean;
  quickDeliveryMinutes?: number;
  isRefurbished: boolean;
  refurbishedGrade?: RefurbishedGrade;
  warranty: string;
  returnPolicy: string;
  badge?: string;
  tags?: string[];
  inStock: boolean;
  soldPercentage?: number; // for deal of the day stock progress
  isDiwaliDeal?: boolean; // Diwali Dhamaka flag
  budgetTier?: 'under-99' | 'under-199' | 'under-499';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface DeliveryAddress {
  fullName: string;
  phoneNumber: string;
  pincode: string;
  houseFlat: string;
  streetArea: string;
  landmark?: string;
  city: string;
  state: string;
  addressType: 'Home' | 'Work';
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending COD';
  deliveryType: 'standard' | 'quick';
  estimatedDelivery: string;
  status: 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
}

export interface Service {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  duration: string;
  rating: number;
  reviewCount: number;
  description: string;
  inclusions: string[];
  features: string[];
  image: string;
}

export interface ServiceBooking {
  id: string;
  service: Service;
  date: string;
  timeSlot: string;
  customerName: string;
  phone: string;
  address: string;
  pincode: string;
  notes?: string;
  status: 'Confirmed' | 'Technician Assigned' | 'In Progress' | 'Completed';
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
  superCoins: number;
  savedAddressesCount: number;
}

export interface SponsorAd {
  id: string;
  brand: string;
  tagline: string;
  offerText: string;
  ctaText: string;
  bgGradient: string;
  image: string;
  categoryId?: CategoryId;
}
