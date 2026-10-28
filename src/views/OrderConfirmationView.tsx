import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { latestOrder, navigateTo } = useApp();

  if (!latestOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-slate-600">No recent order found.</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const order = latestOrder;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Success Celebration Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800/40 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Payment {order.paymentStatus}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Your order has been confirmed and our fulfillment hub has initiated dispatch.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 p-2.5 px-4 rounded-xl bg-slate-900/90 border border-slate-700 text-xs">
          <span className="text-slate-400">Order Reference:</span>
          <strong className="text-white font-mono text-sm">{order.id}</strong>
        </div>
      </div>

      {/* Live Tracking Stepper */}
      <div className="bg-[#0c1228] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-cyan-400" />
              <span>Shipment Status &amp; Tracking</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {order.deliveryType === 'quick' ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  ⚡ Delivering in 12-15 minutes to your doorstep
                </span>
              ) : (
                <span>Standard Express · Arriving in 24-48 hours</span>
              )}
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-full text-xs font-bold">
            {order.status}
          </span>
        </div>

        {/* Stepper Steps */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs relative">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="font-bold text-white mt-2">Placed</span>
            <span className="text-[10px] text-slate-400">Confirmed</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold animate-pulse">
              2
            </div>
            <span className="font-bold text-white mt-2">Packing</span>
            <span className="text-[10px] text-slate-400">At Micro-Hub</span>
          </div>

          <div className="flex flex-col items-center opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold">
              3
            </div>
            <span className="font-bold text-slate-400 mt-2">Dispatched</span>
            <span className="text-[10px] text-slate-500">Courier Partner</span>
          </div>

          <div className="flex flex-col items-center opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold">
              4
            </div>
            <span className="font-bold text-slate-400 mt-2">Delivered</span>
            <span className="text-[10px] text-slate-500">At Doorstep</span>
          </div>
        </div>
      </div>

      {/* Order Details & Address Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ordered Items */}
        <div className="bg-[#0c1228] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
            Ordered Items ({order.items.length})
          </h3>
          <div className="space-y-3 text-xs divide-y divide-slate-800">
            {order.items.map((item) => (
              <div key={item.product.id} className="pt-2 flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-contain bg-[#080d1f] p-1 rounded-lg border border-slate-800"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">
                    {item.product.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Qty: {item.quantity} · {item.product.brand}
                  </p>
                </div>
                <span className="font-bold text-white tabular-nums">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="tabular-nums text-white">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Total Savings:</span>
                <span className="tabular-nums">-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-white text-sm pt-2 border-t border-slate-800">
              <span>Total Paid:</span>
              <span className="tabular-nums text-cyan-400">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address & Action */}
        <div className="bg-[#0c1228] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-6 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Delivery Destination</span>
            </h3>
            <div className="text-xs text-slate-300 mt-3 space-y-1">
              <p className="font-bold text-white">{order.address.fullName}</p>
              <p className="text-slate-400">{order.address.houseFlat}, {order.address.streetArea}</p>
              {order.address.landmark && <p className="text-slate-400">Landmark: {order.address.landmark}</p>}
              <p className="text-slate-400">{order.address.city}, {order.address.state} - {order.address.pincode}</p>
              <p className="font-mono text-cyan-400 pt-1">Phone: {order.address.phoneNumber}</p>
              <p className="text-slate-500 text-[11px]">Payment Mode: {order.paymentMethod.toUpperCase()}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigateTo('my-orders')}
              className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs rounded-xl transition-colors text-center cursor-pointer"
            >
              View My Orders
            </button>
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors text-center shadow-lg cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
