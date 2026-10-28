import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DeliveryAddress, PaymentMethod } from '../types';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  ArrowLeft,
  QrCode,
  Banknote,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    couponDiscount,
    placeOrder,
    navigateTo,
    selectedPincode,
    pincodeCity,
    isQuickEligible,
  } = useApp();

  // Address State
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: 'Aarav Sharma',
    phoneNumber: '+91 98765 43210',
    pincode: selectedPincode,
    houseFlat: 'Penthouse 402, Skyline Residency',
    streetArea: '100 Feet Road, Indiranagar',
    landmark: 'Opposite Metro Pillar 124',
    city: pincodeCity.includes('Delhi') ? 'New Delhi' : pincodeCity.includes('Mumbai') ? 'Mumbai' : 'Bengaluru',
    state: pincodeCity.includes('Delhi') ? 'Delhi' : pincodeCity.includes('Mumbai') ? 'Maharashtra' : 'Karnataka',
    addressType: 'Home',
  });

  // Delivery Speed State
  const hasQuickItems = cart.some((i) => i.product.isQuickDelivery);
  const [deliveryType, setDeliveryType] = useState<'standard' | 'quick'>(
    isQuickEligible && hasQuickItems ? 'quick' : 'standard'
  );

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('•••');
  const [isPlacing, setIsPlacing] = useState(false);

  const deliveryFee = deliveryType === 'quick' ? 29 : cartSubtotal >= 499 ? 0 : 49;
  const grandTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacing(true);
    setTimeout(() => {
      placeOrder({
        address,
        paymentMethod,
        deliveryType,
      });
    }, 800);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4 bg-[#070a17] text-slate-100">
        <p className="text-slate-400">Your cart is empty.</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 bg-[#070a17] text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Secure Checkout
          </h1>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('cart')}
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </button>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery Address, Speed & Payment */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Delivery Address */}
            <div className="bg-[#090e24] rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                    1
                  </div>
                  <span>Delivery Address</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Pincode {selectedPincode}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress({ ...address, fullName: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Mobile Phone (for delivery SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={address.phoneNumber}
                    onChange={(e) =>
                      setAddress({ ...address, phoneNumber: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-300 block mb-1">
                    Flat / House No. / Building *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.houseFlat}
                    onChange={(e) =>
                      setAddress({ ...address, houseFlat: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-300 block mb-1">
                    Street Address / Colony / Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.streetArea}
                    onChange={(e) =>
                      setAddress({ ...address, streetArea: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={address.pincode}
                    onChange={(e) =>
                      setAddress({ ...address, pincode: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-4 pt-1">
                  <span className="font-bold text-slate-300">Save address as:</span>
                  {(['Home', 'Work'] as const).map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-1.5 cursor-pointer text-slate-300"
                    >
                      <input
                        type="radio"
                        name="addressType"
                        checked={address.addressType === type}
                        onChange={() =>
                          setAddress({ ...address, addressType: type })
                        }
                        className="text-cyan-500 bg-slate-900 border-slate-700"
                      />
                      <span className="font-semibold">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Speed Option */}
            <div className="bg-[#090e24] rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-slate-800">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                  2
                </div>
                <span>Select Delivery Speed</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* 15-Minute Quick Delivery Option */}
                <label
                  className={`p-4 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all ${
                    deliveryType === 'quick'
                      ? 'border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500'
                      : 'border-slate-800 bg-[#0c1228] hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                        <Zap className="w-4 h-4 text-emerald-400 fill-current" />
                        <span>⚡ 12-15 Min Quick Delivery</span>
                      </div>
                      <input
                        type="radio"
                        name="deliveryType"
                        checked={deliveryType === 'quick'}
                        onChange={() => setDeliveryType('quick')}
                        className="text-emerald-500"
                      />
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Dispatched instantly via dedicated electric two-wheeler courier from our local dark store.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs font-bold text-emerald-300">
                    <span>Express Fee</span>
                    <span>₹29</span>
                  </div>
                </label>

                {/* Standard Free Delivery */}
                <label
                  className={`p-4 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all ${
                    deliveryType === 'standard'
                      ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-[#0c1228] hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <Truck className="w-4 h-4 text-cyan-400" />
                        <span>Standard Delivery (1-2 Days)</span>
                      </div>
                      <input
                        type="radio"
                        name="deliveryType"
                        checked={deliveryType === 'standard'}
                        onChange={() => setDeliveryType('standard')}
                        className="text-cyan-500"
                      />
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Delivered by standard ground logistics with continuous live shipment tracking updates.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-white">
                    <span>Delivery Fee</span>
                    <span className="text-emerald-400">FREE</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-[#090e24] rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-slate-800">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                  3
                </div>
                <span>Choose Payment Method</span>
              </div>

              <div className="space-y-3 text-xs">
                {/* UPI Option */}
                <label
                  className={`p-4 rounded-2xl border block cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-[#0c1228] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <QrCode className="w-4 h-4 text-cyan-400" />
                      <span>UPI (Google Pay / PhonePe / Paytm / BHIM)</span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-cyan-500"
                    />
                  </div>
                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-slate-800 flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@bank"
                        className="flex-1 p-2.5 bg-slate-900 rounded-xl border border-slate-700 font-mono text-xs text-white outline-none"
                      />
                      <span className="px-3 py-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold rounded-xl flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    </div>
                  )}
                </label>

                {/* Card Option */}
                <label
                  className={`p-4 rounded-2xl border block cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-[#0c1228] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span>Credit or Debit Card (Visa, RuPay, MasterCard)</span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-cyan-500"
                    />
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="col-span-3 p-2.5 bg-slate-900 rounded-xl border border-slate-700 font-mono text-xs text-white"
                      />
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="p-2.5 bg-slate-900 rounded-xl border border-slate-700 font-mono text-xs text-white"
                      />
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="CVV"
                        className="p-2.5 bg-slate-900 rounded-xl border border-slate-700 font-mono text-xs text-white"
                      />
                    </div>
                  )}
                </label>

                {/* Net Banking */}
                <label
                  className={`p-4 rounded-2xl border block cursor-pointer transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-[#0c1228] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Banknote className="w-4 h-4 text-slate-300" />
                      <span>Net Banking (All Indian Major Banks)</span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="text-cyan-500"
                    />
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`p-4 rounded-2xl border block cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-[#0c1228] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Banknote className="w-4 h-4 text-amber-400" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-cyan-500"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order Button */}
          <div className="lg:col-span-4 bg-[#090e24] rounded-3xl border border-slate-800 p-6 space-y-5 sticky top-36 shadow-xl">
            <h3 className="text-sm font-bold text-white pb-3 border-b border-slate-800">
              Review Items &amp; Price ({cart.length} items)
            </h3>

            {/* Items Mini Truncated List */}
            <div className="max-h-48 overflow-y-auto divide-y divide-slate-800 text-xs">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 object-contain rounded-lg bg-[#080d1f] p-1 border border-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Qty: {item.quantity} × ₹{item.product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <span className="font-bold text-white tabular-nums">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold tabular-nums text-white">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount:</span>
                  <span className="tabular-nums">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery:</span>
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
              <span className="text-sm font-bold">Total Payable</span>
              <span className="text-2xl font-black text-cyan-400 tabular-nums">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              type="submit"
              disabled={isPlacing}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-950/60 transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isPlacing ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order &amp; Pay</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-[11px] text-slate-400 text-center space-y-1">
              <p className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Purchase Protection with Veltrix</span>
              </p>
              <p>7-Day Easy Replacement Guarantee</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
