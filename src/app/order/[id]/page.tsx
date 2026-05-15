"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Check, Phone, Share2, ChevronDown } from 'lucide-react';
import { OrderStatus, StatusStepper } from '@/components/order/StatusStepper';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/context/AuthContext';

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  // Order State
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState<OrderStatus>('received');
  
  // UI State
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [calculatedTime, setCalculatedTime] = useState('');
  const [deliveredTime, setDeliveredTime] = useState('');

  // Load Order and setup Times
  useEffect(() => {
    setMounted(true);
    
    // Load order from local storage
    const savedOrder = localStorage.getItem('belle-food-last-order');
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        // Ensure this is the correct order
        if (parsed.id === params.id) {
          setOrder(parsed);
        }
      } catch (e) {
        console.error("Failed to parse order");
      }
    }

    // Calculate delivery time (+45 mins)
    const now = new Date();
    const delivery = new Date(now.getTime() + 45 * 60000);
    setCalculatedTime(delivery.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
  }, [params.id]);

  // Simulate Status progression
  useEffect(() => {
    if (!order) return;

    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setStatus('preparing'), 5000));
    timers.push(setTimeout(() => setStatus('delivering'), 15000));
    timers.push(setTimeout(() => {
      setStatus('delivered');
      setDeliveredTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
    }, 25000));

    return () => timers.forEach(t => clearTimeout(t));
  }, [order]);

  const handleShare = async () => {
    const text = `I just ordered from Belle Food! 🍛🔥 (Order #${params.id})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Belle Food Order',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!');
    }
  };

  if (!mounted) return null;

  if (!isLoggedIn) {
    router.replace('/auth?mode=signin');
    return null;
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 bg-brand-black px-5 page-enter">
        <span className="text-5xl mb-4">🔍</span>
        <h2 className="font-display font-bold text-xl text-white">Order not found</h2>
        <p className="font-body text-sm text-brand-muted mt-2 text-center">
          We couldn't find order #{params.id}
        </p>
        <Link 
          href="/"
          className="mt-6 px-6 py-3 bg-brand-surface border border-brand-border rounded-sm font-body font-semibold text-sm text-white hover:bg-brand-border transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Dynamic subtitle based on status
  const getStatusSubtitle = () => {
    switch (status) {
      case 'received': return "Your order has been confirmed";
      case 'preparing': return "The kitchen is preparing your food";
      case 'delivering': return "Your rider is on the way!";
      case 'delivered': return "Your food has been delivered!";
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-brand-black pb-24 page-enter">
      {/* 1. Header */}
      <div className="border-b border-brand-border sticky top-0 bg-brand-black/95 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto w-full px-5 py-4 flex items-center justify-between">
          <div className="w-6" /> {/* Spacer */}
          <h1 className="font-body font-semibold text-base text-white">Order Status</h1>
          <Link href="/" className="p-1 -mr-1 text-brand-muted hover:text-white transition-colors">
            <X size={20} />
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col flex-1">
        {/* 2. Success Banner */}
      <div className="flex flex-col items-center text-center px-5 pt-8 pb-6 border-b border-brand-border bg-gradient-to-b from-brand-red/10 to-transparent">
        <div className="relative w-16 h-16 rounded-full bg-brand-red flex items-center justify-center z-10">
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-brand-red/30 animate-[ping-slow_2s_ease-out_infinite] -z-10" />
          <Check size={28} strokeWidth={2.5} className="text-white relative z-10" />
        </div>
        
        <h2 className="font-display font-bold text-[26px] text-white mt-5">
          {status === 'delivered' ? 'Order Delivered!' : 'Order Confirmed!'}
        </h2>
        <p className="font-body text-sm text-brand-muted mt-1 transition-all">
          {getStatusSubtitle()}
        </p>
        
        <div className="inline-block bg-brand-surface px-3.5 py-1.5 rounded-sm mt-4 border border-brand-border">
          <span className="font-body font-semibold text-sm text-brand-gold">
            #{order.id}
          </span>
        </div>
      </div>

      {/* 3. Estimated Delivery */}
      <div className="flex flex-col items-center text-center px-5 py-6 border-b border-brand-border">
        {status === 'delivered' ? (
          <div className="animate-in zoom-in-95 duration-500">
            <span className="font-body font-semibold text-sm text-green-500 flex items-center justify-center gap-1.5">
              ✅ Delivered at {deliveredTime}
            </span>
          </div>
        ) : (
          <>
            <span className="font-body text-[10px] text-brand-muted uppercase tracking-widest">
              {order.isPickup ? 'ESTIMATED PICKUP' : 'ESTIMATED DELIVERY'}
            </span>
            <div className="font-display font-bold text-[22px] text-white mt-1">
              35 – 50 minutes
            </div>
            <div className="font-body text-sm text-brand-red mt-0.5">
              {order.isPickup ? 'Ready' : 'Arriving'} by {calculatedTime}
            </div>
          </>
        )}
      </div>

      {/* 4. Status Stepper */}
      <StatusStepper currentStatus={status} />

      {/* 5. Action Buttons */}
      <div className="px-5 py-4 flex flex-col gap-3 border-t border-brand-border mt-2">
        {!order.isPickup && (
          <button 
            className={`w-full h-12 bg-brand-surface border border-brand-border rounded-md flex items-center justify-center gap-2 hover:border-brand-muted/50 transition-all ${
              status === 'delivering' ? 'opacity-100' : 'opacity-40 pointer-events-none'
            }`}
          >
            <Phone size={16} className="text-white" />
            <span className="font-body font-semibold text-sm text-white">Contact Rider</span>
          </button>
        )}
        
        <button 
          onClick={handleShare}
          className="w-full h-12 border border-brand-border rounded-md flex items-center justify-center gap-2 hover:bg-brand-surface transition-all"
        >
          <Share2 size={16} className="text-brand-muted" />
          <span className="font-body font-semibold text-sm text-brand-muted">Share Your Order</span>
        </button>
      </div>

      {/* 6. Order Details (Expandable) */}
      <div className="px-5 py-4 border-t border-brand-border">
        <div 
          onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
          className="flex items-center justify-between cursor-pointer py-1"
        >
          <span className="font-body font-semibold text-sm text-white">Order Details</span>
          <ChevronDown size={18} className={`text-brand-muted transition-transform duration-300 ${isDetailsExpanded ? 'rotate-180' : ''}`} />
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDetailsExpanded ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col pb-2">
            {order.items.map((item: any, idx: number) => {
              // Calculate specific price for this item
              let basePrice = item.menuItem.price;
              if (item.size && item.menuItem.sizes) {
                const sizePrice = item.menuItem.sizes.find((s: any) => s.name === item.size)?.price;
                if (sizePrice) basePrice = sizePrice;
              }
              let extrasPrice = 0;
              if (item.extras && item.menuItem.extras) {
                item.extras.forEach((extraName: string) => {
                  const ePrice = item.menuItem.extras?.find((e: any) => e.name === extraName)?.price;
                  if (ePrice) extrasPrice += ePrice;
                });
              }
              const lineTotal = (basePrice + extrasPrice) * item.quantity;
              
              return (
                <div key={idx} className="flex justify-between items-start py-2 border-b border-brand-border/50 last:border-0">
                  <span className="font-body text-sm text-brand-muted flex-1 pr-4 leading-tight">
                    {item.quantity}x {item.menuItem.name}
                  </span>
                  <span className="font-body text-sm text-brand-muted">{formatPrice(lineTotal)}</span>
                </div>
              );
            })}
            
            <div className="h-px bg-brand-border my-3" />
            
            {/* Find Delivery Fee from Total (hacky but reliable given our setup) */}
            {(() => {
              const itemsTotal = order.items.reduce((sum: number, item: any) => {
                let basePrice = item.menuItem.price;
                if (item.size && item.menuItem.sizes) {
                  const sizePrice = item.menuItem.sizes.find((s: any) => s.name === item.size)?.price;
                  if (sizePrice) basePrice = sizePrice;
                }
                let extrasPrice = 0;
                if (item.extras && item.menuItem.extras) {
                  item.extras.forEach((extraName: string) => {
                    const ePrice = item.menuItem.extras?.find((e: any) => e.name === extraName)?.price;
                    if (ePrice) extrasPrice += ePrice;
                  });
                }
                return sum + ((basePrice + extrasPrice) * item.quantity);
              }, 0);
              
              const deliveryFee = order.total - itemsTotal;

              return (
                <div className="flex justify-between items-center mb-3">
                  <span className="font-body text-sm text-brand-muted">Delivery fee</span>
                  <span className="font-body text-sm text-brand-muted">
                    {deliveryFee === 0 ? (order.isPickup ? '₦0' : 'FREE') : formatPrice(deliveryFee)}
                  </span>
                </div>
              );
            })()}
            
            <div className="flex justify-between items-center bg-brand-surface p-3 rounded-md">
              <span className="font-body font-semibold text-sm text-white">Total</span>
              <span className="font-display font-bold text-base text-brand-gold">{formatPrice(order.total)}</span>
            </div>
            
            <div className="flex justify-between items-center mt-3 px-1">
              <span className="font-body text-xs text-brand-muted">Payment Method</span>
              <span className="font-body text-xs text-white capitalize">{order.paymentMethod === 'cash' ? 'Pay on Delivery' : 'Card'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Reorder Button */}
        <div className="px-5 pt-4 pb-8 border-t border-brand-border">
          <Link 
            href="/menu"
            className="w-full bg-brand-red hover:bg-brand-red-hover h-14 rounded-md flex items-center justify-center transition-all active:scale-[0.98]"
          >
            <span className="font-body font-bold text-[15px] text-white uppercase tracking-wide">
              ORDER AGAIN
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
