import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-slate-950 text-white border border-slate-800 rounded-xl p-3.5 shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-white">{toast.title}</h5>
            {toast.message && (
              <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                {toast.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-slate-500 hover:text-white p-0.5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
