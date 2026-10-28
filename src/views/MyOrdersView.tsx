import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  Clock,
  MapPin,
  ChevronRight,
  RotateCcw,
  ShoppingBag,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export const MyOrdersView: React.FC = () => {
  const { orders, navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-100">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white">My Orders &amp; Shipments</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track real-time shipment status, reorder previous items, and download invoices
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#0c1228] rounded-2xl border border-slate-800 p-12 text-center space-y-4 shadow-xl">
          <Package className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No orders placed yet</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Discover thousands of handpicked products across 14 categories.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors cursor-pointer"
          >
            Start Browsing
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#0c1228] rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl"
            >
              {/* Top metadata strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-white">
                    Order {order.id}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{order.date}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-cyan-400 font-bold tabular-nums">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-full font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {order.status}
                  </span>
                  {order.deliveryType === 'quick' && (
                    <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 rounded text-[10px] font-black uppercase">
                      ⚡ Quick 12m
                    </span>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      onClick={() =>
                        navigateTo('product-detail', { product: item.product })
                      }
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-900/80 cursor-pointer transition-colors border border-transparent hover:border-slate-800"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain bg-[#080d1f] rounded-lg p-1 border border-slate-800 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Qty: {item.quantity} · ₹{item.product.price.toLocaleString('en-IN')} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery info & actions */}
                <div className="p-4 bg-[#090e24] border border-slate-800 rounded-xl text-xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold text-slate-200">
                        Delivery to {order.address.fullName} ({order.address.pincode})
                      </span>
                    </div>
                    <p className="text-slate-400 mt-1 line-clamp-1">
                      {order.address.houseFlat}, {order.address.streetArea}, {order.address.city}
                    </p>
                    <p className="text-emerald-400 font-bold mt-1">
                      Status: {order.estimatedDelivery}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() =>
                        navigateTo('category', { categoryId: 'all' })
                      }
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                    >
                      Buy Again
                    </button>
                    <span className="text-[11px] text-slate-500">
                      Payment: {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
