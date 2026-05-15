"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { CartSummary } from '@/components/cart/CartSummary';
import { Input } from '@/components/ui/Input';

export default function CartPage() {
  const { items, clearCart, cartCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isDelivery, setIsDelivery] = useState(true);
  const [note, setNote] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClear = () => {
    if (confirm("Clear your entire order?")) {
      clearCart();
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col flex-1 bg-brand-black pb-24">
        <div className="border-b border-brand-border sticky top-0 bg-brand-black/95 backdrop-blur-md z-40">
          <div className="max-w-6xl mx-auto w-full px-5 py-4 flex items-center justify-between">
            <Link href="/menu" className="p-1 -ml-1 text-white hover:text-brand-red transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <h1 className="font-body font-semibold text-base text-white">Your Order</h1>
            <div className="w-6" /> {/* Spacer */}
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center flex-1 px-5 animate-in fade-in zoom-in-95 duration-500">
          <span className="text-5xl mb-4">🛒</span>
          <h2 className="font-display font-bold text-xl text-white">Your cart is empty</h2>
          <p className="font-body text-sm text-brand-muted mt-2 text-center max-w-xs">
            Browse our menu and add some delicious dishes
          </p>
          <Link 
            href="/menu"
            className="mt-8 px-8 py-3.5 bg-brand-red hover:bg-brand-red-hover rounded-md font-body font-bold text-sm text-white uppercase tracking-wider transition-all active:scale-95"
          >
            BROWSE MENU
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-brand-black pb-24 page-enter">
      {/* 1. Header */}
      <div className="border-b border-brand-border sticky top-0 bg-brand-black/95 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto w-full px-5 py-4 flex items-center justify-between">
          <Link href="/menu" className="p-1 -ml-1 text-white hover:text-brand-red transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="font-body font-semibold text-base text-white">Your Order</h1>
          <button 
            onClick={handleClear}
            className="font-body text-sm text-brand-red cursor-pointer hover:text-brand-red-hover transition-colors p-1 -mr-1"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col flex-1">

      {/* 2. Delivery / Pickup Toggle */}
      <div className="px-5 pt-5 pb-3">
        <div className="w-full h-11 bg-brand-surface rounded-full flex p-1 relative">
          {/* Animated Background */}
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-brand-red rounded-full transition-transform duration-300 ease-out`}
            style={{ transform: `translateX(${isDelivery ? '0' : '100%'})` }}
          />
          <button 
            onClick={() => setIsDelivery(true)}
            className={`flex-1 flex items-center justify-center font-body font-semibold text-sm z-10 transition-colors duration-300 ${isDelivery ? 'text-white' : 'text-brand-muted hover:text-white'}`}
          >
            Delivery
          </button>
          <button 
            onClick={() => setIsDelivery(false)}
            className={`flex-1 flex items-center justify-center font-body font-semibold text-sm z-10 transition-colors duration-300 ${!isDelivery ? 'text-white' : 'text-brand-muted hover:text-white'}`}
          >
            Pickup
          </button>
        </div>
      </div>

      {/* 3. Delivery Address (Conditionally Rendered) */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDelivery ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 py-3">
          <h3 className="font-body font-semibold text-[11px] text-brand-muted uppercase tracking-widest mb-2">
            DELIVERY ADDRESS
          </h3>
          <Input 
            placeholder="Enter your delivery address" 
            icon={<MapPin size={18} />}
          />
          <p className="font-body text-[11px] text-brand-muted/60 mt-1.5 ml-1">
            📍 We deliver within Chevron, Lekki & environs
          </p>
        </div>
      </div>

      {/* 4. Cart Items List */}
      <div className="px-5 py-2 flex flex-col">
        {items.map((item, idx) => (
          <CartItemRow key={`${item.menuItem.id}-${item.size}-${JSON.stringify(item.extras)}-${idx}`} item={item} />
        ))}
      </div>

      {/* 5. Add a Note */}
      <div className="px-5 py-3 mt-2">
        <h3 className="font-body font-semibold text-[11px] text-brand-muted uppercase tracking-widest mb-2">
          ADD A NOTE
        </h3>
        <textarea 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Extra pepper, no onions, ring the doorbell..."
          className="w-full h-20 bg-brand-surface border border-brand-border rounded-md text-white font-body text-sm p-3 resize-none focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all placeholder:text-brand-muted/50"
        />
      </div>

      {/* 6. Order Summary */}
      <CartSummary isPickup={!isDelivery} />

      {/* 7. Checkout CTA */}
      <div className="px-5 pt-4 pb-2">
        <Link 
          href={`/checkout?mode=${isDelivery ? 'delivery' : 'pickup'}`}
          className="w-full bg-brand-red hover:bg-brand-red-hover h-14 rounded-md flex items-center justify-center transition-all active:scale-[0.98]"
        >
          <span className="font-body font-bold text-[15px] text-white uppercase tracking-wide">
            PROCEED TO CHECKOUT
          </span>
        </Link>
      </div>

        {/* 8. Add More Link */}
        <div className="text-center py-3 pb-8">
          <Link 
            href="/menu"
            className="font-body font-medium text-sm text-brand-red hover:text-brand-red-hover transition-colors"
          >
            + Add more items
          </Link>
        </div>
      </div>
    </div>
  );
}
