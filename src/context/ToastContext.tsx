import React, { createContext, useContext, useState, useCallback } from 'react';

interface ToastContextType {
  toastMessage: string | null;
  showToast: (message: string, durationMs?: number) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const hideToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const showToast = useCallback((message: string, durationMs = 3000) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, durationMs);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastContext.Provider value={{ toastMessage, showToast, hideToast }}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#303031] text-[#f2f0f0] text-xs font-medium shadow-lg max-w-[90vw] text-center pointer-events-none animate-fade-in flex items-center gap-2 border border-white/10">
          <span className="material-symbols-outlined text-[16px] text-[#94f990]">android</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
