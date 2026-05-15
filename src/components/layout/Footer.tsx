"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { useTheme } from 'next-themes';

export const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <footer className="bg-brand-surface border-t border-brand-border w-full">

      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Col 1: Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-0">
            <Image src={mounted && resolvedTheme === 'light' ? '/logo-red.png' : '/logo.png'} alt="Belle Food" width={38} height={38} className="object-contain flex-shrink-0" />
            <span className="font-display font-bold text-xl leading-none text-brand-white -ml-1 translate-y-[6px]">Belle<span className="text-brand-red">Food</span></span>
          </Link>
          <p className="font-body text-sm text-brand-muted leading-relaxed max-w-[200px]">
            King Mitchy&apos;s Belle Food — Lagos&apos;s favourite restaurant, delivered fresh to your door.
          </p>
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex items-center gap-2 text-brand-muted">
              <MapPin size={13} className="text-brand-red flex-shrink-0" />
              <span className="font-body text-xs">Chevron, Lekki, Lagos</span>
            </div>
            <div className="flex items-center gap-2 text-brand-muted">
              <Clock size={13} className="text-brand-red flex-shrink-0" />
              <span className="font-body text-xs">Open daily: 9am – 10pm</span>
            </div>
          </div>
        </div>

        {/* Col 2: Order */}
        <div className="flex flex-col gap-4">
          <p className="font-body font-semibold text-[11px] text-brand-white uppercase tracking-[0.15em]">Order</p>
          <div className="flex flex-col gap-2.5">
            {[
              { label: 'View Menu',     href: '/menu' },
              { label: 'Rice Dishes',   href: '/menu?category=rice' },
              { label: 'Proteins',      href: '/menu?category=proteins' },
              { label: 'Soups & Swallow', href: '/menu?category=soups' },
              { label: 'Drinks',        href: '/menu?category=drinks' },
              { label: 'Combo Meals',   href: '/menu?category=combos' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="font-body text-sm text-brand-muted hover:text-brand-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Account */}
        <div className="flex flex-col gap-4">
          <p className="font-body font-semibold text-[11px] text-brand-white uppercase tracking-[0.15em]">Account</p>
          <div className="flex flex-col gap-2.5">
            {[
              { label: 'Sign In',        href: '/auth' },
              { label: 'Create Account', href: '/auth' },
              { label: 'Track Order',    href: '#' },
              { label: 'My Orders',      href: '/auth' },
              { label: 'Saved Address',  href: '/auth' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="font-body text-sm text-brand-muted hover:text-brand-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4: Contact & Socials */}
        <div className="flex flex-col gap-4">
          <p className="font-body font-semibold text-[11px] text-brand-white uppercase tracking-[0.15em]">Contact</p>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-brand-red flex-shrink-0" />
              <span className="font-body text-sm text-brand-muted">+234 800 000 0000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-brand-red flex-shrink-0" />
              <span className="font-body text-sm text-brand-muted">hello@bellefood.ng</span>
            </div>
          </div>

          <p className="font-body font-semibold text-[11px] text-brand-white uppercase tracking-[0.15em] mt-2">Follow Us</p>
          <div className="flex gap-3">
            {[
              { label: 'TikTok',     href: '#' },
              { label: 'Instagram',  href: '#' },
              { label: 'WhatsApp',   href: '#' },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="font-body text-xs text-brand-muted hover:text-brand-white border border-brand-border hover:border-brand-red rounded-sm px-2.5 py-1.5 transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-border px-5 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-brand-muted/60">
            © {new Date().getFullYear()} Belle Food by King Mitchy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="font-body text-xs text-brand-muted/60 hover:text-brand-muted transition-colors">Privacy Policy</Link>
            <Link href="#" className="font-body text-xs text-brand-muted/60 hover:text-brand-muted transition-colors">Terms of Use</Link>
            <span className="font-body text-[10px] text-brand-muted/30 border border-brand-border/40 rounded-sm px-2 py-1 uppercase tracking-widest">Demo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
