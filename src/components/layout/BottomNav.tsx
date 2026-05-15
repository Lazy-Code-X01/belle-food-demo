"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const BottomNav = () => {
  const pathname = usePathname();
  const { cartCount } = useCart();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/menu', label: 'Menu', icon: UtensilsCrossed },
    { href: '/cart', label: 'Cart', icon: ShoppingBag, badge: cartCount },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 z-50 w-full md:hidden bg-brand-black border-t border-brand-border h-16">
      <div className="grid grid-cols-4 h-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center gap-1 ${
                isActive ? 'text-brand-red' : 'text-brand-muted'
              }`}
            >
              <div className="relative">
                <Icon size={20} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-brand-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="font-body text-[10px] font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
