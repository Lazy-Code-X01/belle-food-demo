"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UtensilsCrossed, Package, MapPin, User, LogOut, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

const navItems = [
  { label: 'Home',            href: '/',                  icon: LayoutDashboard },
  { label: 'Menu',            href: '/menu',              icon: UtensilsCrossed },
  { label: 'My Orders',       href: '/order',             icon: Package },
  { label: 'Saved Addresses', href: '/profile/addresses', icon: MapPin },
  { label: 'Profile',         href: '/profile',           icon: User },
];

const isActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/';
  // /order should also match /order/[id] sub-pages
  if (href === '/order') return pathname === '/order' || pathname.startsWith('/order/');
  // exact match for everything else to avoid /profile matching /profile/addresses
  return pathname === href;
};

export const Sidebar = () => {
  const pathname  = usePathname();
  const { user, logout } = useAuth();
  const { items, cartTotal, cartCount } = useCart();

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : '?';

  // Show up to 3 cart item thumbnails
  const previewItems = items.slice(0, 3);

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-60 flex-col bg-brand-surface border-r border-brand-border z-50">

      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-brand-border flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Belle Food" width={44} height={44} className="object-contain" priority />
          <span className="font-display font-bold text-xl text-brand-white">Belle<span className="text-brand-red">Food</span></span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = isActive(pathname, href);
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
                <span className={`ml-auto w-5 h-5 text-[10px] font-bold rounded-full flex items-center justify-center ${active ? 'bg-white text-brand-red' : 'bg-brand-red text-white'}`}>
                  {cartCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Live Cart Panel */}
      <div className="mx-3 mb-3 rounded-md border border-brand-border bg-brand-card overflow-hidden flex-shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red" />
            </span>
            <span className="font-body font-bold text-[11px] text-brand-white uppercase tracking-widest">
              Live Cart
            </span>
          </div>
          {cartCount > 0 && (
            <span className="font-body text-[10px] text-brand-muted">{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
          )}
        </div>

        {cartCount > 0 ? (
          <>
            {/* Item thumbnails */}
            <div className="px-3 py-2.5 flex flex-col gap-2">
              {previewItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-sm overflow-hidden flex-shrink-0 bg-brand-surface">
                    <Image
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs text-brand-white truncate leading-tight">{item.menuItem.name}</p>
                    <p className="font-body text-[10px] text-brand-muted">×{item.quantity}</p>
                  </div>
                  <span className="font-body text-[11px] text-brand-muted flex-shrink-0">
                    {formatPrice(item.menuItem.price * item.quantity)}
                  </span>
                </div>
              ))}
              {items.length > 3 && (
                <p className="font-body text-[10px] text-brand-muted text-center">
                  +{items.length - 3} more item{items.length - 3 !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Total + CTA */}
            <div className="px-3 pb-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-brand-muted">Total</span>
                <span className="font-display font-bold text-sm text-brand-gold">{formatPrice(cartTotal)}</span>
              </div>
              <Link
                href="/cart"
                className="w-full flex items-center justify-center gap-1.5 bg-brand-red hover:bg-brand-red-hover text-white font-body font-bold text-[11px] uppercase tracking-widest py-2 rounded-sm transition-colors"
              >
                <ShoppingBag size={12} /> View Cart <ArrowRight size={11} />
              </Link>
            </div>
          </>
        ) : (
          <div className="px-3 py-4 text-center">
            <p className="font-body text-xs text-brand-muted leading-relaxed">
              Your cart is empty.<br />
              <Link href="/menu" className="text-brand-red hover:underline">Browse the menu</Link>
            </p>
          </div>
        )}
      </div>

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
