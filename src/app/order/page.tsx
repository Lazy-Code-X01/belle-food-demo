"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, ArrowRight, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';

interface StoredOrder {
  id: string;
  total: number;
  isPickup: boolean;
}

export default function OrdersPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [lastOrder, setLastOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('belle-food-last-order');
    if (saved) {
      try { setLastOrder(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  if (!mounted) return null;

  if (!isLoggedIn) {
    router.replace('/auth?mode=signin');
    return null;
  }

  return (
    <div className="flex flex-col flex-1 bg-brand-black pb-24 page-enter">
      <div className="border-b border-brand-border sticky top-0 bg-brand-black/95 backdrop-blur-md z-40">
        <div className="max-w-3xl mx-auto w-full px-5 py-4">
          <h1 className="font-body font-semibold text-base text-white">My Orders</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-5 py-6 flex flex-col gap-4">
        {lastOrder ? (
          <>
            <p className="font-body text-[11px] text-brand-muted uppercase tracking-widest">Recent</p>
            <Link
              href={`/order/${lastOrder.id}`}
              className="flex items-center gap-4 p-4 bg-brand-surface border border-brand-border rounded-md hover:border-brand-red/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center flex-shrink-0">
                <Package size={18} className="text-brand-red" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-sm text-brand-white">
                  Order #{lastOrder.id}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock size={11} className="text-brand-muted" />
                  <span className="font-body text-xs text-brand-muted">
                    {formatPrice(lastOrder.total)} · {lastOrder.isPickup ? 'Pickup' : 'Delivery'}
                  </span>
                </div>
              </div>
              <ArrowRight size={16} className="text-brand-muted group-hover:text-brand-red transition-colors flex-shrink-0" />
            </Link>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center mb-5">
              <Package size={36} className="text-brand-border" strokeWidth={1.25} />
            </div>
            <h2 className="font-display font-bold text-xl text-brand-white">No orders yet</h2>
            <p className="font-body text-sm text-brand-muted mt-2 max-w-[240px] leading-relaxed">
              Your completed orders will appear here after your first order.
            </p>
            <Link
              href="/menu"
              className="mt-7 flex items-center gap-2 px-7 py-3 bg-brand-red hover:bg-brand-red-hover rounded-md font-body font-bold text-sm text-white uppercase tracking-wider transition-all active:scale-95"
            >
              Browse Menu <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
