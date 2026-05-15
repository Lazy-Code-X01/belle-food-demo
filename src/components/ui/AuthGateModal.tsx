"use client";

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { X, ShoppingBag, LogIn, UserPlus, MapPin, Package, RefreshCw, Tag } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const perks = [
  { icon: MapPin,    label: 'Save your delivery address' },
  { icon: Package,   label: 'Track your order in real time' },
  { icon: RefreshCw, label: 'Reorder with one tap' },
  { icon: Tag,       label: 'Unlock exclusive deals' },
];

export const AuthGateModal = ({ onClose }: Props) => {
  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-5">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[320px] bg-brand-card border border-brand-border rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-brand-surface hover:bg-brand-border text-brand-muted hover:text-brand-white transition-colors"
        >
          <X size={13} />
        </button>

        <div className="px-5 pt-6 pb-6 flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
            <ShoppingBag size={20} className="text-brand-red" />
          </div>

          {/* Copy */}
          <div className="space-y-1">
            <h2 className="font-display font-bold text-lg text-brand-white leading-snug">
              You&apos;re almost there!
            </h2>
            <p className="font-body text-xs text-brand-muted leading-relaxed max-w-[230px] mx-auto">
              Sign in to complete your order and unlock the full experience.
            </p>
          </div>

          {/* Perks */}
          <div className="w-full flex flex-col gap-2 text-left bg-brand-surface rounded-xl p-3 border border-brand-border">
            {perks.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-brand-black/60 border border-brand-border flex items-center justify-center flex-shrink-0">
                  <Icon size={11} className="text-brand-red" />
                </div>
                <span className="font-body text-xs text-brand-muted">{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="w-full flex flex-col gap-2">
            <Link
              href="/auth?mode=signin"
              className="w-full flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white font-body font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-colors"
            >
              <LogIn size={13} /> Sign In
            </Link>
            <Link
              href="/auth?mode=signup"
              className="w-full flex items-center justify-center gap-2 border border-brand-border hover:border-brand-red text-brand-white font-body font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-colors"
            >
              <UserPlus size={13} /> Create Free Account
            </Link>
            <button
              onClick={onClose}
              className="font-body text-[11px] text-brand-muted hover:text-brand-white transition-colors pt-0.5"
            >
              Continue browsing
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
