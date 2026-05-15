"use client";

import React from 'react';
import { Check } from 'lucide-react';

export type OrderStatus = 'received' | 'preparing' | 'delivering' | 'delivered';

interface StatusStepperProps {
  currentStatus: OrderStatus;
}

const STEPS = [
  { 
    id: 'received', 
    title: 'Order Received', 
    subtitle: 'Your order has been confirmed'
  },
  { 
    id: 'preparing', 
    title: 'Preparing Your Food', 
    subtitle: 'The kitchen is working on your order'
  },
  { 
    id: 'delivering', 
    title: 'Out for Delivery', 
    subtitle: 'Your rider is on the way'
  },
  { 
    id: 'delivered', 
    title: 'Delivered', 
    subtitle: 'Enjoy your meal!'
  }
];

export const StatusStepper: React.FC<StatusStepperProps> = ({ currentStatus }) => {
  const currentIndex = STEPS.findIndex(s => s.id === currentStatus);

  return (
    <div className="px-5 py-6">
      <h3 className="font-body font-semibold text-[11px] text-brand-muted uppercase tracking-widest mb-5">
        ORDER PROGRESS
      </h3>
      
      <div className="flex flex-col">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isLast = index === STEPS.length - 1;

          return (
            <div key={step.id} className="flex gap-3 relative min-h-[48px]">
              {/* Left Column - Indicators */}
              <div className="flex flex-col items-center flex-shrink-0 z-10 w-8">
                <div className={`relative w-8 h-8 rounded-full flex items-center justify-center font-body font-bold text-xs transition-colors duration-500 z-10
                  ${isCompleted || isActive ? 'bg-brand-red text-white' : 'bg-brand-surface text-brand-muted'}
                `}>
                  {isActive && (
                    <div className="absolute inset-[-4px] w-10 h-10 rounded-full border-[1.5px] border-brand-red/40 animate-pulse -z-10" />
                  )}
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : index + 1}
                </div>
                
                {/* Connector Line */}
                {!isLast && (
                  <div className={`w-0.5 flex-1 mt-1 mb-1 transition-colors duration-500
                    ${isCompleted ? 'bg-brand-red' : 'bg-brand-border'}
                  `} />
                )}
              </div>

              {/* Right Column - Text */}
              <div className="flex-1 pt-1 pb-4">
                <h4 className={`font-body font-semibold text-sm transition-colors duration-500
                  ${isCompleted || isActive ? 'text-white' : 'text-brand-muted/50'}
                `}>
                  {step.title}
                </h4>
                <p className={`font-body text-xs mt-0.5 transition-colors duration-500
                  ${isCompleted || isActive ? 'text-brand-muted' : 'text-brand-muted/30'}
                `}>
                  {step.subtitle}
                </p>
                {/* Optional: we could track real timestamps here if we stored them in state */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
