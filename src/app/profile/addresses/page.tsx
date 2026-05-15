"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, MapPin, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AddressesPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  if (!isLoggedIn) { router.replace('/auth?mode=signin'); return null; }

  return (
    <div className="flex flex-col flex-1 bg-brand-black pb-24 page-enter">
      <div className="border-b border-brand-border sticky top-0 bg-brand-black/95 backdrop-blur-md z-40">
        <div className="max-w-2xl mx-auto w-full px-5 py-4 flex items-center gap-3">
          <Link href="/profile" className="p-1 -ml-1 text-white hover:text-brand-red transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="font-body font-semibold text-base text-white">Saved Addresses</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-5 py-10 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center mb-5">
          <MapPin size={34} className="text-brand-border" strokeWidth={1.25} />
        </div>
        <h2 className="font-display font-bold text-xl text-brand-white">No saved addresses</h2>
        <p className="font-body text-sm text-brand-muted mt-2 max-w-[240px] leading-relaxed">
          Addresses you use at checkout will be saved here for faster ordering next time.
        </p>
        <Link
          href="/menu"
          className="mt-7 flex items-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-red-hover rounded-md font-body font-bold text-sm text-white uppercase tracking-wider transition-all active:scale-95"
        >
          <Plus size={14} /> Place Your First Order
        </Link>
      </div>
    </div>
  );
}
