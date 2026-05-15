"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, User, Eye, EyeOff, Phone, Gift, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// ── SVG brand icons ──────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function AuthPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login — use entered name or fallback
    login({
      firstName: firstName.trim() || 'Guest',
      lastName:  lastName.trim()  || 'User',
      email:     email.trim()     || 'guest@bellefood.ng',
    });
    router.push('/');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-brand-black">

      {/* ── Right Panel: Fixed Brand ─────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] h-screen flex-shrink-0 bg-brand-red relative overflow-hidden px-12 py-10 order-2">

        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-black/25 blur-3xl" />
        </div>

        {/* Scattered food icons (static, low opacity) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[
            { emoji: '🍛', top: '8%',  left: '8%',  size: '2.4rem', rotate: '-12deg' },
            { emoji: '🍗', top: '22%', left: '70%', size: '2rem',   rotate: '8deg'  },
            { emoji: '🥘', top: '52%', left: '12%', size: '2.6rem', rotate: '14deg' },
            { emoji: '🍝', top: '68%', left: '65%', size: '2rem',   rotate: '-8deg' },
            { emoji: '🌶️', top: '80%', left: '30%', size: '1.6rem', rotate: '-5deg' },
            { emoji: '🍹', top: '16%', left: '48%', size: '1.8rem', rotate: '10deg' },
          ].map((item, i) => (
            <span key={i} className="absolute opacity-[0.15] select-none"
              style={{ top: item.top, left: item.left, fontSize: item.size, transform: `rotate(${item.rotate})` }}>
              {item.emoji}
            </span>
          ))}
        </div>

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center">
          <span className="font-display font-bold text-2xl text-white">Belle</span>
          <span className="font-display font-bold text-2xl text-white/60">Food</span>
        </Link>

        {/* CEO image + copy */}
        <div className="relative z-10 flex flex-col gap-6">
          {/* CEO photo */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 shadow-xl">
            <Image
              src="/ceo.png"
              alt="CEO of Belle Food"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-body text-xs text-white/50 uppercase tracking-[0.2em] mb-3">Lagos&apos;s Favourite</p>
            <h2 className="font-display font-bold text-[44px] leading-[1.05] text-white">
              Real food,<br />
              <em className="italic text-white/70">real fast.</em>
            </h2>
            <p className="font-body text-sm text-white/60 mt-4 leading-relaxed max-w-xs">
              Join thousands of Lagosians ordering fresh, hot meals from King Mitchy&apos;s Belle Food — delivered straight to your door.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            <div>
              <p className="font-display font-bold text-3xl text-white">2k+</p>
              <p className="font-body text-[10px] text-white/50 uppercase tracking-widest mt-0.5">Customers</p>
            </div>
            <div>
              <p className="font-display font-bold text-3xl text-white">4.8★</p>
              <p className="font-body text-[10px] text-white/50 uppercase tracking-widest mt-0.5">Rating</p>
            </div>
            <div>
              <p className="font-display font-bold text-3xl text-white">35m</p>
              <p className="font-body text-[10px] text-white/50 uppercase tracking-widest mt-0.5">Delivery</p>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10 border-t border-white/20 pt-6">
          <p className="font-body text-sm italic text-white/60 leading-relaxed">
            &ldquo;Best jollof rice in Lagos, hands down. Always on time.&rdquo;
          </p>
          <p className="font-body text-xs text-white/40 mt-2">— Adaeze O., Lekki Phase 1</p>
        </div>
      </div>

      {/* ── Left Panel: Scrollable Form ──────────────────────── */}
      <div className="flex-1 h-screen overflow-y-auto bg-brand-black order-1">

        {/* Floating X — fixed to top-left of the form panel */}
        <Link
          href="/"
          className="fixed top-5 left-5 z-50 w-8 h-8 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-white hover:border-brand-red transition-colors shadow-md"
          aria-label="Close"
        >
          <X size={15} />
        </Link>

        {/* Centering wrapper — min-h-full so short forms (sign in) center, tall forms (sign up) scroll */}
        <div className="min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-20 py-16">
        <div className="flex flex-col w-full max-w-lg">

          <h1 className="font-display font-bold text-[28px] md:text-[34px] text-brand-white">
            {mode === 'signin' ? 'Welcome back 👋' : 'Create your account'}
          </h1>
          <p className="font-body text-sm text-brand-muted mt-2 mb-8">
            {mode === 'signin'
              ? 'Sign in to track your orders, save your address, and reorder with ease.'
              : 'Sign up to track orders, save your address, and get exclusive deals.'}
          </p>

          {/* Social logins */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 bg-brand-surface hover:bg-brand-card border border-brand-border hover:border-[#25D366]/40 rounded-sm py-3 transition-colors">
              <WhatsAppIcon />
              <span className="font-body text-sm font-medium text-brand-white">Continue with WhatsApp</span>
            </button>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-brand-surface hover:bg-brand-card border border-brand-border hover:border-[#4285F4]/40 rounded-sm py-3 transition-colors">
                <GoogleIcon />
                <span className="font-body text-sm font-medium text-brand-white">Google</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-brand-surface hover:bg-brand-card border border-brand-border hover:border-[#1877F2]/40 rounded-sm py-3 transition-colors">
                <FacebookIcon />
                <span className="font-body text-sm font-medium text-brand-white">Facebook</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-brand-border" />
            <span className="font-body text-[11px] text-brand-muted uppercase tracking-widest">or with email</span>
            <div className="flex-1 h-px bg-brand-border" />
          </div>

          {/* Form fields */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Sign up only fields */}
            {mode === 'signup' && (
              <>
                <div className="flex gap-3">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="font-body text-[11px] text-brand-muted uppercase tracking-widest">First Name <span className="text-brand-red">*</span></label>
                    <div className="flex items-center gap-2 bg-brand-surface border border-brand-border rounded-sm px-3 focus-within:border-brand-red transition-colors">
                      <User size={13} className="text-brand-muted flex-shrink-0" />
                      <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="e.g. John" className="flex-1 bg-transparent font-body text-sm text-brand-white placeholder:text-brand-muted/40 py-3 focus:outline-none" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="font-body text-[11px] text-brand-muted uppercase tracking-widest">Last Name <span className="text-brand-red">*</span></label>
                    <div className="flex items-center gap-2 bg-brand-surface border border-brand-border rounded-sm px-3 focus-within:border-brand-red transition-colors">
                      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="e.g. Doe" className="flex-1 bg-transparent font-body text-sm text-brand-white placeholder:text-brand-muted/40 py-3 focus:outline-none" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[11px] text-brand-muted uppercase tracking-widest">Phone Number <span className="text-brand-red">*</span></label>
                  <div className="flex items-stretch bg-brand-surface border border-brand-border rounded-sm overflow-hidden focus-within:border-brand-red transition-colors">
                    <div className="flex items-center gap-1.5 px-3 border-r border-brand-border flex-shrink-0">
                      <span className="text-sm">🇳🇬</span>
                      <span className="font-body text-sm text-brand-muted">+234</span>
                      <ChevronDown size={12} className="text-brand-muted" />
                    </div>
                    <div className="flex items-center gap-2 flex-1 px-3">
                      <Phone size={13} className="text-brand-muted flex-shrink-0" />
                      <input type="tel" placeholder="0800 000 0000" className="flex-1 bg-transparent font-body text-sm text-brand-white placeholder:text-brand-muted/40 py-3 focus:outline-none" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email — both modes */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-[11px] text-brand-muted uppercase tracking-widest">Email Address <span className="text-brand-red">*</span></label>
              <div className="flex items-center gap-2 bg-brand-surface border border-brand-border rounded-sm px-3 focus-within:border-brand-red transition-colors">
                <Mail size={13} className="text-brand-muted flex-shrink-0" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="sample@gmail.com" className="flex-1 bg-transparent font-body text-sm text-brand-white placeholder:text-brand-muted/40 py-3 focus:outline-none" />
              </div>
            </div>

            {/* Password — both modes */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-body text-[11px] text-brand-muted uppercase tracking-widest">Password <span className="text-brand-red">*</span></label>
                {mode === 'signin' && (
                  <button type="button" className="font-body text-[11px] text-brand-red hover:underline">Forgot password?</button>
                )}
              </div>
              <div className="flex items-center gap-2 bg-brand-surface border border-brand-border rounded-sm px-3 focus-within:border-brand-red transition-colors">
                <Lock size={13} className="text-brand-muted flex-shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent font-body text-sm text-brand-white placeholder:text-brand-muted/40 py-3 focus:outline-none"
                />
                <button type="button" onClick={() => setShowPassword(p => !p)} className="text-brand-muted hover:text-brand-white transition-colors">
                  {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>

            {/* Sign up extras */}
            {mode === 'signup' && (
              <>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[11px] text-brand-muted uppercase tracking-widest">Referral Code <span className="text-brand-muted/40">(optional)</span></label>
                  <div className="flex items-center gap-2 bg-brand-surface border border-brand-border rounded-sm px-3 focus-within:border-brand-red transition-colors">
                    <Gift size={13} className="text-brand-muted flex-shrink-0" />
                    <input type="text" placeholder="e.g. BF-JOHN67" className="flex-1 bg-transparent font-body text-sm text-brand-white placeholder:text-brand-muted/40 py-3 focus:outline-none" />
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    onClick={() => setMarketing(m => !m)}
                    className={`mt-0.5 w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-colors ${
                      marketing ? 'bg-brand-red border-brand-red' : 'border-brand-border group-hover:border-brand-red/50'
                    }`}
                  >
                    {marketing && <span className="text-white text-[10px] font-bold leading-none">✓</span>}
                  </div>
                  <span className="font-body text-xs text-brand-muted leading-relaxed">
                    I want to receive emails and promotional communications from Belle Food
                  </span>
                </label>
              </>
            )}

            {/* CTA */}
            <button type="submit" className="mt-2 w-full bg-brand-red hover:bg-brand-red-hover text-white font-body font-bold text-xs uppercase tracking-widest py-4 rounded-sm transition-colors">
              {mode === 'signin' ? 'Sign In' : 'Continue'}
            </button>

            {/* Switch mode */}
            <p className="text-center font-body text-sm text-brand-muted">
              {mode === 'signin' ? (
                <>Don&apos;t have an account?{' '}
                  <button type="button" onClick={() => setMode('signup')} className="text-brand-red font-medium hover:underline">Sign up</button>
                </>
              ) : (
                <>Have an account?{' '}
                  <button type="button" onClick={() => setMode('signin')} className="text-brand-red font-medium hover:underline">Login</button>
                </>
              )}
            </p>

          </form>
        </div>
        </div>
      </div>
    </div>
  );
}
