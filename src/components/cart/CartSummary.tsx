import React from 'react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface CartSummaryProps {
  isPickup?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ isPickup = false }) => {
  const { cartTotal, deliveryFee } = useCart();
  
  // Recalculate delivery fee locally based on pickup toggle
  const activeDeliveryFee = isPickup ? 0 : deliveryFee;
  const orderTotal = cartTotal + activeDeliveryFee;

  return (
    <div className="px-5 py-5 border-t border-brand-border mt-2">
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between items-center">
          <span className="font-body text-sm text-brand-muted">Subtotal</span>
          <span className="font-body text-sm text-brand-muted">{formatPrice(cartTotal)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-body text-sm text-brand-muted">Delivery fee</span>
          <span className={`font-body text-sm ${activeDeliveryFee === 0 ? 'text-green-500 font-semibold' : 'text-brand-muted'}`}>
            {activeDeliveryFee === 0 ? (isPickup ? '₦0' : 'FREE') : formatPrice(activeDeliveryFee)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-body text-sm text-brand-muted">Discount</span>
          <span className="font-body text-sm text-brand-muted">-₦0</span>
        </div>
        
        <div className="h-px bg-brand-border my-2" />
        
        <div className="flex justify-between items-center">
          <span className="font-body font-semibold text-base text-white">Total</span>
          <span className="font-display font-bold text-xl text-brand-gold">{formatPrice(orderTotal)}</span>
        </div>
      </div>
    </div>
  );
};
