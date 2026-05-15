"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Package, LogOut, ChevronRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  if (!isLoggedIn) {
    router.replace('/auth?mode=signin');
    return null;
  }

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '?';

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex flex-col flex-1 bg-brand-black pb-24 page-enter">
      {/* Header */}
      <div className="border-b border-brand-border sticky top-0 bg-brand-black/95 backdrop-blur-md z-40">
        <div className="max-w-2xl mx-auto w-full px-5 py-4">
          <h1 className="font-body font-semibold text-base text-white">My Profile</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-5 py-6 flex flex-col gap-5">

        {/* Avatar + name */}
        <div className="flex items-center gap-4 p-5 bg-brand-surface border border-brand-border rounded-md">
          <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0">
            <span className="font-display font-bold text-2xl text-white">{initials}</span>
          </div>
          <div>
            <p className="font-display font-bold text-xl text-brand-white">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="font-body text-sm text-brand-muted mt-0.5">{user?.email}</p>
          </div>
        </div>

        {/* Account details */}
        <div className="flex flex-col gap-0 bg-brand-surface border border-brand-border rounded-md overflow-hidden">
          <p className="font-body text-[10px] text-brand-muted uppercase tracking-widest px-4 pt-4 pb-2">
            Account Details
          </p>

          {[
            { icon: User,  label: 'Full Name', value: `${user?.firstName} ${user?.lastName}` },
            { icon: Mail,  label: 'Email',     value: user?.email ?? '—' },
            { icon: Phone, label: 'Phone',     value: user?.phone ?? 'Not added' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3.5 border-t border-brand-border/60">
              <Icon size={15} className="text-brand-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-body text-[11px] text-brand-muted">{label}</p>
                <p className="font-body text-sm text-brand-white mt-0.5 truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-0 bg-brand-surface border border-brand-border rounded-md overflow-hidden">
          <p className="font-body text-[10px] text-brand-muted uppercase tracking-widest px-4 pt-4 pb-2">
            Quick Links
          </p>

          {[
            { icon: MapPin,      label: 'Saved Addresses', href: '/profile/addresses' },
            { icon: Package,     label: 'My Orders',        href: '/order' },
            { icon: ShieldCheck, label: 'Privacy & Terms',  href: '/profile' },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 px-4 py-3.5 border-t border-brand-border/60 hover:bg-brand-card transition-colors group"
            >
              <Icon size={15} className="text-brand-muted flex-shrink-0" />
              <span className="font-body text-sm text-brand-white flex-1">{label}</span>
              <ChevronRight size={14} className="text-brand-muted group-hover:text-brand-red transition-colors" />
            </Link>
          ))}
        </div>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 border border-brand-border hover:border-red-500/50 hover:bg-red-500/5 text-brand-muted hover:text-red-400 font-body font-semibold text-sm py-3.5 rounded-md transition-colors"
        >
          <LogOut size={15} />
          Sign Out
        </button>

      </div>
    </div>
  );
}
