"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Bell, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

export const AppTopBar = () => {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/menu?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="hidden lg:flex sticky top-0 z-40 h-16 bg-brand-black/95 backdrop-blur-md border-b border-brand-border items-center gap-4 px-6">

      {/* Greeting */}
      <div className="flex-shrink-0">
        <p className="font-body text-sm text-brand-white font-medium">
          {getGreeting()}, <span className="text-brand-red font-bold">{user?.firstName}</span> 👋
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-auto relative">
        <div className="flex items-center gap-2 bg-brand-surface border border-brand-border rounded-sm px-3 focus-within:border-brand-red transition-colors">
          <Search size={15} className="text-brand-muted flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search the menu..."
            className="flex-1 bg-transparent font-body text-sm text-brand-white placeholder:text-brand-muted/50 py-2.5 focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="text-brand-muted hover:text-brand-white transition-colors">
              <X size={13} />
            </button>
          )}
        </div>
      </form>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-sm bg-brand-surface border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-white hover:border-brand-red transition-colors">
          <Bell size={17} strokeWidth={2} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-red rounded-full" />
        </button>

        {/* Cart */}
        <Link href="/cart" className="relative flex items-center gap-2 h-9 px-4 bg-brand-red hover:bg-brand-red-hover rounded-sm transition-colors">
          <ShoppingBag size={15} className="text-white" strokeWidth={2} />
          <span className="font-body font-bold text-xs text-white">
            {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? 's' : ''}` : 'Cart'}
          </span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-brand-red text-[10px] font-bold rounded-full flex items-center justify-center shadow">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};
