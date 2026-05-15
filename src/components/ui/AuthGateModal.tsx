"use client";

import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, LogIn, UserPlus } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const AuthGateModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative z-10 w-full md:max-w-md bg-brand-card border border-brand-border rounded-t-2xl md:rounded-lg shadow-2xl animate-[fadeIn_0.25s_ease-out]">

        {/* Drag pill (mobile) */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-10 h-1 rounded-full bg-brand-border" />
        </div>

        {/* Close — desktop */}
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-muted hover:text-brand-white transition-colors hidden md:block">
          <X size={18} />
        </button>

        <div className="px-6 pt-4 pb-8 flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
            <ShoppingBag size={24} className="text-brand-red" />
          </div>

          {/* Copy */}
          <div>
            <h2 className="font-display font-bold text-xl text-brand-white">You&apos;re almost there!</h2>
            <p className="font-body text-sm text-brand-muted mt-2 leading-relaxed max-w-xs mx-auto">
              Sign in to complete your order, track delivery in real time, and save your address for next time.
            </p>
          </div>

          {/* Perks */}
          <div className="w-full flex flex-col gap-2 text-left bg-brand-surface rounded-sm p-4 border border-brand-border">
            {[
              '📍 Save your delivery address',
              '📦 Track your order in real time',
              '🔁 Reorder with one tap',
              '🎁 Unlock exclusive deals',
            ].map(perk => (
              <p key={perk} className="font-body text-sm text-brand-muted">{perk}</p>
            ))}
          </div>

          {/* CTAs */}
          <div className="w-full flex flex-col gap-3 mt-1">
            <Link
              href="/auth"
              className="w-full flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white font-body font-bold text-xs uppercase tracking-widest py-4 rounded-sm transition-colors"
            >
              <LogIn size={14} /> Sign In
            </Link>
            <Link
              href="/auth"
              className="w-full flex items-center justify-center gap-2 border border-brand-border hover:border-brand-red text-brand-white font-body font-bold text-xs uppercase tracking-widest py-4 rounded-sm transition-colors"
            >
              <UserPlus size={14} /> Create Free Account
            </Link>
            <button
              onClick={onClose}
              className="font-body text-xs text-brand-muted hover:text-brand-white transition-colors"
            >
              Continue browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
