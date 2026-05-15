"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UtensilsCrossed, Package, MapPin, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const navItems = [
  { label: 'Home',            href: '/',           icon: LayoutDashboard },
  { label: 'Menu',            href: '/menu',        icon: UtensilsCrossed },
  { label: 'My Orders',       href: '/order',       icon: Package },
  { label: 'Saved Addresses', href: '/auth',        icon: MapPin },
  { label: 'Profile',         href: '/auth',        icon: User },
];

export const Sidebar = () => {
  const pathname  = usePathname();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : '?';

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-60 flex-col bg-brand-surface border-r border-brand-border z-50">

      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-brand-border flex-shrink-0">
        <Link href="/" className="flex items-center">
          <span className="font-display font-bold text-xl text-brand-white">Belle</span>
          <span className="font-display font-bold text-xl text-brand-red">Food</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link key={label} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors group ${
                active
                  ? 'bg-brand-red text-white'
                  : 'text-brand-muted hover:text-brand-white hover:bg-brand-card'
              }`}
            >
              <Icon size={17} strokeWidth={active ? 2.5 : 2} />
              <span className="font-body text-sm font-medium">{label}</span>
              {label === 'Menu' && cartCount > 0 && (
                <span className="ml-auto w-5 h-5 bg-brand-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + Sign Out */}
      <div className="px-3 py-4 border-t border-brand-border flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0">
            <span className="font-body font-bold text-xs text-white">{initials}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-body font-semibold text-sm text-brand-white truncate">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="font-body text-[11px] text-brand-muted truncate">{user?.email}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-brand-muted hover:text-brand-white hover:bg-brand-card transition-colors"
        >
          <LogOut size={17} strokeWidth={2} />
          <span className="font-body text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
