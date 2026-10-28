import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICES } from '../data/services';
import { Service } from '../types';
import {
  Wrench,
  CheckCircle2,
  Calendar,
  Clock,
  Star,
  ShieldCheck,
  MapPin,
  X,
  ArrowRight,
  Phone,
  User,
  Sparkles,
} from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { addServiceBooking, serviceBookings, selectedPincode } = useApp();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'catalog' | 'my-bookings'>('catalog');

  // Form State
  const [bookingDate, setBookingDate] = useState<string>('Tomorrow');
  const [timeSlot, setTimeSlot] = useState<string>('11:00 AM - 01:00 PM');
  const [customerName, setCustomerName] = useState<string>('Aarav Sharma');
  const [phone, setPhone] = useState<string>('+91 98765 43210');
  const [address, setAddress] = useState<string>('Flat 402, Skyline Residency, 100 Feet Road, Indiranagar');
  const [pincode, setBookingPincode] = useState<string>(selectedPincode);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleOpenBooking = (service: Service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
    setIsSubmitted(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    addServiceBooking({
      service: selectedService,
      date: bookingDate,
      timeSlot,
      customerName,
      phone,
      address,
      pincode,
      notes,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsBookingModalOpen(false);
      setActiveTab('my-bookings');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950 via-slate-900 to-yellow-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-800/40 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Veltrix Expert Doorstep Services</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Certified Tech & Home Repairs. <br />
            At Your Doorstep in 60 Minutes.
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            From cracked smartphone screen replacement and laptop SSD speed boosts to deep chemical AC cleaning and bespoke garment alterations — booked in seconds with verified technicians.
          </p>

          <div className="flex items-center gap-4 pt-2 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                activeTab === 'catalog'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Explore Services
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('my-bookings')}
              className={`px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'my-bookings'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span>My Service Appointments</span>
              {serviceBookings.length > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded-full text-[10px] font-black">
                  {serviceBookings.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Inclusions Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Up to 90 Days Service Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>100% Genuine OEM Spares</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Strict 60-Min Arrival Window</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Background Verified Experts</span>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'catalog' ? (
        <div className="space-y-6 text-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                Available Doorstep Services
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Upfront transparent pricing with zero hidden visitation charges
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Serviceable in Pincode <strong className="font-mono text-cyan-400">{selectedPincode}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-[#0c1228] rounded-2xl border border-slate-800 overflow-hidden shadow-xl hover:shadow-cyan-950/40 hover:border-amber-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-[#080d1f] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-slate-950/90 text-amber-400 border border-amber-500/30 backdrop-blur-xs">
                      {service.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 font-bold text-white">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                        <span>{service.rating}</span>
                        <span className="text-slate-400 font-normal">
                          ({service.reviewCount} reviews)
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" /> {service.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2">
                      <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        What's Included:
                      </p>
                      <ul className="space-y-1">
                        {service.inclusions.slice(0, 3).map((inc, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-1.5 text-xs text-slate-400"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-slate-800 bg-[#090e24] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Total Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-white tabular-nums">
                        ₹{service.price.toLocaleString('en-IN')}
                      </span>
                      {service.originalPrice && (
                        <span className="text-xs text-slate-500 line-through tabular-nums">
                          ₹{service.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenBooking(service)}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* My Service Bookings View */
        <div className="bg-[#0c1228] rounded-2xl border border-slate-800 p-6 space-y-6 text-slate-100 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">
                My Booked Appointments
              </h2>
              <p className="text-xs text-slate-400">
                Track your active technician visits and service history
              </p>
            </div>
            <button
              onClick={() => setActiveTab('catalog')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              + Book Another Service
            </button>
          </div>

          {serviceBookings.length > 0 ? (
            <div className="space-y-4">
              {serviceBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl border border-slate-800 bg-[#090e24] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={b.service.image}
                      alt={b.service.title}
                      className="w-16 h-16 object-cover rounded-lg shrink-0 border border-slate-800"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-cyan-400">
                          {b.id}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                          {b.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        {b.service.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" /> {b.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" /> {b.timeSlot}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" /> Pincode {b.pincode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right border-t md:border-t-0 pt-2 md:pt-0 flex md:flex-col items-center md:items-end justify-between border-slate-800">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Amount to Pay</span>
                      <span className="text-base font-bold text-white tabular-nums">
                        ₹{b.service.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400 mt-1">
                      Technician Assigned · Contact on arrival
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-3">
              <Wrench className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">
                No active service bookings yet
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-md"
              >
                Explore &amp; Book a Service
              </button>
            </div>
          )}
        </div>
      )}

      {/* Booking Form Modal */}
      {isBookingModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-[#0c1228] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden text-slate-100">
            <div className="px-6 py-4 bg-[#090e24] text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Book Doorstep Appointment
                </span>
                <h3 className="text-sm font-bold text-white truncate max-w-sm">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Appointment Confirmed!
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Technician scheduled for <strong>{bookingDate}</strong> during <strong>{timeSlot}</strong>. You will receive an SMS alert with tracking details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
                {/* Date selection */}
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Select Appointment Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Today (Express)', 'Tomorrow', 'In 2 Days'].map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setBookingDate(d)}
                        className={`py-2 px-3 rounded-lg border text-center font-semibold transition-colors cursor-pointer ${
                          bookingDate === d
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                            : 'border-slate-800 bg-[#090e24] text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time slot */}
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-[#090e24] text-white font-medium outline-none focus:border-amber-400"
                  >
                    <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM (Morning)</option>
                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM (Midday)</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM (Afternoon)</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM (Evening)</option>
                    <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM (Night Slot)</option>
                  </select>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-800 bg-[#090e24] text-white outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-800 bg-[#090e24] text-white outline-none font-mono focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Doorstep Address
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-800 bg-[#090e24] text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={pincode}
                      onChange={(e) => setBookingPincode(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-800 bg-[#090e24] text-white outline-none font-mono focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">
                      Special Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Ring bell twice, gate code"
                      className="w-full p-2 rounded-lg border border-slate-800 bg-[#090e24] text-white outline-none focus:border-cyan-400 placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Pricing & Submit */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Pay After Inspection</span>
                    <span className="text-base font-bold text-white tabular-nums">
                      ₹{selectedService.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
