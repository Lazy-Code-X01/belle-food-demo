"use client";

import React, { useEffect, useState, createContext, useContext } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (newMessage: string) => {
    setMessage(newMessage);
    setIsVisible(true);
    
    // Auto dismiss after 2 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast UI */}
      <div 
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        {message && (
          <div className="bg-brand-card border border-brand-border rounded-sm px-4 py-2.5 shadow-xl border-l-[3px] border-l-brand-red">
            <p className="font-body text-sm text-brand-white">{message}</p>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
