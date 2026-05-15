"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, MapPin, Check, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPickup = searchParams.get('mode') === 'pickup';
  
  const { items, cartTotal, deliveryFee, clearCart, cartCount } = useCart();
  const { isLoggedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Payment Mode
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  
  // Time Selector
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  // Use dynamic delivery fee based on mode
  const activeDeliveryFee = isPickup ? 0 : deliveryFee;
  const orderTotal = cartTotal + activeDeliveryFee;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    
    // Generate order ID
    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const random3 = Math.floor(Math.random() * 900) + 100;
    const orderId = `BF-${dateStr}-${random3}`;
    
    // Save to local storage
    const orderData = {
      id: orderId,
      items,
      total: orderTotal,
      isPickup,
      paymentMethod,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('belle-food-last-order', JSON.stringify(orderData));
    
    // Fake loading delay
    setTimeout(() => {
      clearCart();
      router.push(`/order/${orderId}`);
    }, 1500);
  };

  if (!mounted) return null;

  // Redirect unauthenticated users
  if (!isLoggedIn) {
    router.replace('/auth');
    return null;
  }

  // Protect against empty cart checkout
  if (items.length === 0 && !isPlacingOrder) {
    router.replace('/cart');
    return null;
  }

  return (
    <div className="flex flex-col flex-1 bg-brand-black pb-24 page-enter">
      {/* 1. Header */}
      <div className="border-b border-brand-border sticky top-0 bg-brand-black/95 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto w-full px-5 py-4 flex items-center">
          <button onClick={() => router.back()} className="p-1 -ml-1 text-white hover:text-brand-red transition-colors absolute">
            <ChevronLeft size={20} />
          </button>
          <h1 className="font-body font-semibold text-base text-white w-full text-center">Checkout</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col flex-1">
        {/* 2. Visual Progress Steps */}
      <div className="px-5 py-6 flex items-center justify-center">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="w-7 h-7 rounded-full bg-brand-red flex items-center justify-center">
            <Check size={14} strokeWidth={3} className="text-white" />
          </div>
          <span className="font-body text-[10px] text-brand-red mt-1.5 font-semibold">Cart</span>
        </div>
        
        <div className="w-10 h-0.5 bg-brand-red mx-1 mt-[-18px]" />
        
        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="w-7 h-7 rounded-full bg-brand-red flex items-center justify-center">
            <span className="font-body font-bold text-xs text-white">2</span>
          </div>
          <span className="font-body text-[10px] text-brand-red mt-1.5 font-semibold">Details</span>
        </div>

        <div className="w-10 h-0.5 bg-brand-border mx-1 mt-[-18px]" />
        
        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className="w-7 h-7 rounded-full bg-brand-surface flex items-center justify-center">
            <span className="font-body text-xs text-brand-muted">3</span>
          </div>
          <span className="font-body text-[10px] text-brand-muted mt-1.5">Payment</span>
        </div>
      </div>

      {/* 3. Contact Details */}
      <div className="px-5 py-4">
        <h3 className="font-body font-semibold text-[11px] text-white uppercase tracking-widest mb-4">
          CONTACT DETAILS
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block font-body text-[12px] text-brand-muted mb-1.5 ml-1">Full Name</label>
            <Input placeholder="Enter your full name" />
          </div>
          <div>
            <label className="block font-body text-[12px] text-brand-muted mb-1.5 ml-1">Phone Number</label>
            <Input placeholder="+234 80X XXX XXXX" type="tel" />
          </div>
        </div>
      </div>

      {/* 4. Delivery Details (Hide if Pickup) */}
      {!isPickup && (
        <div className="px-5 py-4 mt-2">
          <h3 className="font-body font-semibold text-[11px] text-white uppercase tracking-widest mb-4">
            DELIVERY DETAILS
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-body text-[12px] text-brand-muted mb-1.5 ml-1">Delivery Address</label>
              <Input placeholder="Enter your delivery address" icon={<MapPin size={18} />} />
            </div>
            
            <div className="relative">
              <label className="block font-body text-[12px] text-brand-muted mb-1.5 ml-1">Delivery Time</label>
              <div 
                onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                className="w-full h-12 bg-brand-surface border border-brand-border rounded-md px-4 flex items-center justify-between cursor-pointer focus-within:border-brand-red focus-within:ring-1 focus-within:ring-brand-red transition-all"
              >
                <div className="flex items-center gap-2">
                  <span>🕐</span>
                  <span className="font-body text-sm text-white">ASAP (35–50 min)</span>
                </div>
                <ChevronDown size={16} className={`text-brand-muted transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isTimeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-brand-card border border-brand-border rounded-md shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div 
                    className="px-4 py-3 hover:bg-brand-surface cursor-pointer flex justify-between items-center"
                    onClick={() => setIsTimeDropdownOpen(false)}
                  >
                    <span className="font-body text-sm text-white">ASAP (35–50 min)</span>
                    <Check size={16} className="text-brand-red" />
                  </div>
                  <div className="px-4 py-3 bg-brand-black/50 cursor-not-allowed flex justify-between items-center opacity-50">
                    <span className="font-body text-sm text-brand-muted">Schedule for later (Coming Soon)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Payment Method */}
      <div className="px-5 py-4 mt-2">
        <h3 className="font-body font-semibold text-[11px] text-white uppercase tracking-widest mb-4">
          PAYMENT METHOD
        </h3>
        <div className="flex flex-col gap-3">
          {/* Cash Option */}
          <div 
            onClick={() => setPaymentMethod('cash')}
            className={`flex items-start gap-3 p-4 rounded-md cursor-pointer transition-all ${
              paymentMethod === 'cash' 
                ? 'bg-brand-surface border-[1.5px] border-brand-red' 
                : 'bg-transparent border border-brand-border hover:border-brand-muted'
            }`}
          >
            <div className={`w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
              paymentMethod === 'cash' ? 'border-brand-red' : 'border-brand-muted'
            }`}>
              {paymentMethod === 'cash' && <div className="w-2 h-2 rounded-full bg-brand-red" />}
            </div>
            <div>
              <div className="font-body font-medium text-sm text-white">💵  Pay on Delivery</div>
              <div className="font-body text-[11px] text-brand-muted mt-1">Cash or POS on delivery</div>
            </div>
          </div>
          
          {/* Card Option */}
          <div 
            onClick={() => setPaymentMethod('card')}
            className={`flex items-start gap-3 p-4 rounded-md cursor-pointer transition-all ${
              paymentMethod === 'card' 
                ? 'bg-brand-surface border-[1.5px] border-brand-red' 
                : 'bg-transparent border border-brand-border hover:border-brand-muted'
            }`}
          >
            <div className={`w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
              paymentMethod === 'card' ? 'border-brand-red' : 'border-brand-muted'
            }`}>
              {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-brand-red" />}
            </div>
            <div>
              <div className="font-body font-medium text-sm text-white">💳  Pay with Card</div>
              <div className="font-body text-[11px] text-brand-muted mt-1">Visa, Mastercard, Bank Transfer (Paystack)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Order Summary (Collapsible) */}
      <div className="px-5 py-4 border-t border-brand-border mt-2">
        <div 
          onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
          className="flex items-center justify-between cursor-pointer py-1"
        >
          <span className="font-body font-semibold text-sm text-white">Order Summary ({cartCount} items)</span>
          <ChevronDown size={18} className={`text-brand-muted transition-transform duration-300 ${isSummaryExpanded ? 'rotate-180' : ''}`} />
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSummaryExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col gap-2.5 pb-2">
            {items.map((item, idx) => {
              // Calculate specific price for this item
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
              const lineTotal = (basePrice + extrasPrice) * item.quantity;
              
              return (
                <div key={idx} className="flex justify-between items-start">
                  <span className="font-body text-sm text-brand-muted flex-1 pr-4 leading-tight">
                    {item.quantity}x {item.menuItem.name} 
                    {(item.size || (item.extras && item.extras.length > 0)) && (
                      <span className="block text-[11px] text-brand-muted/70 mt-0.5">
                        {[item.size, ...(item.extras || [])].filter(Boolean).join(' • ')}
                      </span>
                    )}
                  </span>
                  <span className="font-body text-sm text-brand-muted">{formatPrice(lineTotal)}</span>
                </div>
              );
            })}
            
            <div className="h-px bg-brand-border my-1" />
            
            <div className="flex justify-between items-center">
              <span className="font-body text-sm text-brand-muted">Delivery fee</span>
              <span className={`font-body text-sm ${activeDeliveryFee === 0 ? 'text-green-500 font-semibold' : 'text-brand-muted'}`}>
                {activeDeliveryFee === 0 ? (isPickup ? '₦0' : 'FREE') : formatPrice(activeDeliveryFee)}
              </span>
            </div>
            
            <div className="flex justify-between items-center mt-1">
              <span className="font-body font-semibold text-sm text-white">Total</span>
              <span className="font-display font-bold text-base text-brand-gold">{formatPrice(orderTotal)}</span>
            </div>
          </div>
        </div>
        
        {/* Always show total when collapsed */}
        {!isSummaryExpanded && (
          <div className="font-body font-semibold text-sm text-brand-gold mt-1 animate-in fade-in">
            Total: {formatPrice(orderTotal)}
          </div>
        )}
      </div>

      {/* 7. Place Order Button & Terms */}
      <div className="px-5 pt-6 pb-2">
        <button 
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="w-full bg-brand-red hover:bg-brand-red-hover h-14 rounded-md flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPlacingOrder ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="font-body font-bold text-[15px] text-white uppercase tracking-wide">
                PLACING ORDER...
              </span>
            </span>
          ) : (
            <span className="font-body font-bold text-[15px] text-white uppercase tracking-wide">
              PLACE ORDER — {formatPrice(orderTotal)}
            </span>
          )}
        </button>
      </div>
      
        <div className="text-center px-5 pb-8">
          <p className="font-body text-[10px] text-brand-muted/50">
            By placing your order, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
