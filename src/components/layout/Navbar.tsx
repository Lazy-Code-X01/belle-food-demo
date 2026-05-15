"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Moon, Sun, User } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const { cartCount } = useCart();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-border">
      <div className="h-14 px-5 max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-0">
          <Image src={mounted && resolvedTheme === 'light' ? '/logo-red.png' : '/logo.png'} alt="Belle Food" width={40} height={40} className="object-contain flex-shrink-0" priority />
          <span className="font-display font-bold text-xl leading-none text-brand-white -ml-1 translate-y-[6px]">Belle<span className="text-brand-red">Food</span></span>
        </Link>

        {/* Middle: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/menu" className="font-body text-xs font-medium text-brand-muted uppercase tracking-[0.08em] hover:text-brand-white transition-colors">
            Menu
          </Link>
          <Link href="/#about" className="font-body text-xs font-medium text-brand-muted uppercase tracking-[0.08em] hover:text-brand-white transition-colors">
            About
          </Link>
          <Link href="/order" className="font-body text-xs font-medium text-brand-muted uppercase tracking-[0.08em] hover:text-brand-white transition-colors">
            Track Order
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="text-brand-muted hover:text-brand-white transition-colors"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
            </button>
          )}

          {/* Profile — links directly to auth page */}
          <Link
            href="/auth"
            className="w-7 h-7 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-white hover:border-brand-red transition-colors"
            aria-label="Account"
          >
            <User size={14} strokeWidth={2} />
          </Link>

          <Link href="/cart" className="relative flex items-center gap-2 group">
            <div className="relative text-brand-muted group-hover:text-brand-white transition-colors">
              <ShoppingBag size={20} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:block font-body text-xs font-medium text-brand-muted group-hover:text-brand-white transition-colors">
              Cart {cartCount > 0 && `(${cartCount})`}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
