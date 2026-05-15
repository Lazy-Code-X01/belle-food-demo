import React from 'react';
import { CartItem } from '@/types';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { ImageSkeleton } from '@/components/ui/ImageSkeleton';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  
  // Calculate specific price for this item including size and extras
  let basePrice = item.menuItem.price;
  if (item.size && item.menuItem.sizes) {
    const sizePrice = item.menuItem.sizes.find(s => s.name === item.size)?.price;
    if (sizePrice) basePrice = sizePrice;
  }
  
  let extrasPrice = 0;
  if (item.extras && item.menuItem.extras) {
    item.extras.forEach(extraName => {
      const ePrice = item.menuItem.extras?.find(e => e.name === extraName)?.price;
      if (ePrice) extrasPrice += ePrice;
    });
  }
  
  const unitPrice = basePrice + extrasPrice;
  const lineTotal = unitPrice * item.quantity;
  
  // Build details string
  const details = [
    item.size,
    ...(item.extras?.map(e => `+ ${e}`) || [])
  ].filter(Boolean).join(' • ');

  return (
    <div className="flex gap-3 py-4 border-b border-brand-border last:border-b-0 animate-in fade-in duration-300">
      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-brand-surface">
        <ImageSkeleton />
        <Image
          src={item.menuItem.image}
          alt={item.menuItem.name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-body font-semibold text-sm text-white truncate">
          {item.menuItem.name}
        </h4>
        {details && (
          <p className="font-body text-xs text-brand-muted mt-0.5 line-clamp-1">
            {details}
          </p>
        )}
        
        <div className="flex items-center gap-3 mt-2">
          <button 
            onClick={() => {
              if (item.quantity === 1) {
                removeItem(item.menuItem.id);
              } else {
                updateQuantity(item.menuItem.id, item.quantity - 1);
              }
            }}
            className="w-7 h-7 rounded-md bg-brand-surface hover:bg-brand-border flex items-center justify-center transition-colors active:scale-95"
            aria-label="Decrease quantity"
          >
            {item.quantity === 1 
              ? <Trash2 size={13} className="text-brand-red" /> 
              : <Minus size={14} className="text-white" />
            }
          </button>
          
          <span className="font-body font-semibold text-sm text-white min-w-[20px] text-center">
            {item.quantity}
          </span>
          
          <button 
            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
            className="w-7 h-7 rounded-md bg-brand-surface hover:bg-brand-border flex items-center justify-center transition-colors active:scale-95"
            aria-label="Increase quantity"
          >
            <Plus size={14} className="text-white" />
          </button>
        </div>
      </div>
      
      <div className="flex-shrink-0 flex flex-col justify-end text-right">
        <span className="font-body font-semibold text-sm text-white">
          {formatPrice(lineTotal)}
        </span>
      </div>
    </div>
  );
};
