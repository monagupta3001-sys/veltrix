import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, X, Zap, CheckCircle2, Clock } from 'lucide-react';

interface PincodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_PINCODES = [
  { pin: '560038', city: 'Bengaluru, Indiranagar', time: '12 mins' },
  { pin: '560001', city: 'Bengaluru, MG Road', time: '10 mins' },
  { pin: '110001', city: 'New Delhi, Connaught Place', time: '11 mins' },
  { pin: '400050', city: 'Mumbai, Bandra West', time: '13 mins' },
  { pin: '500081', city: 'Hyderabad, HITEC City', time: '12 mins' },
  { pin: '600002', city: 'Chennai, Anna Salai', time: '15 mins' },
];

export const PincodeModal: React.FC<PincodeModalProps> = ({ isOpen, onClose }) => {
  const { selectedPincode, setPincode } = useApp();
  const [inputPin, setInputPin] = useState(selectedPincode);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(inputPin.trim())) {
      setErrorMsg('Please enter a valid 6-digit Indian pincode.');
      return;
    }
    setErrorMsg('');
    setPincode(inputPin.trim());
    onClose();
  };

  const handleSelectPopular = (pin: string) => {
    setInputPin(pin);
    setPincode(pin);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold">Choose Delivery Location</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Enter your 6-digit delivery pincode to check product availability and live delivery speed (including 10-15 minute Quick Delivery for eligible products).
          </p>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={inputPin}
                onChange={(e) => {
                  setInputPin(e.target.value.replace(/\D/g, ''));
                  setErrorMsg('');
                }}
                placeholder="Enter 6-digit Pincode (e.g. 560038)"
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none font-mono"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
            {errorMsg && (
              <p className="text-xs text-rose-600 mt-1.5 font-medium">{errorMsg}</p>
            )}
          </form>

          {/* Quick Hub Cities */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              <Zap className="w-3.5 h-3.5 text-emerald-600 fill-current" />
              <span>Instant Quick Delivery Hubs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {POPULAR_PINCODES.map((item) => (
                <button
                  key={item.pin}
                  type="button"
                  onClick={() => handleSelectPopular(item.pin)}
                  className={`p-2.5 rounded-lg border text-left flex items-start justify-between transition-colors ${
                    selectedPincode === item.pin
                      ? 'border-cyan-500 bg-cyan-50/50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold font-mono text-slate-900 block">
                      {item.pin}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {item.city}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    <Clock className="w-2.5 h-2.5" /> {item.time}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Current Pin: <strong className="text-slate-800 font-mono">{selectedPincode}</strong></span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Serviceable
          </span>
        </div>
      </div>
    </div>
  );
};
