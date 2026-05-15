"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, ArrowRight, Truck, UtensilsCrossed, BadgeCheck, Star, ChevronLeft, ChevronRight, Play, ShoppingBag, Clock, RotateCcw } from 'lucide-react';
import { FoodCard } from '@/components/menu/FoodCard';
import { menuItems, categories } from '@/data/menu';
import { ImageSkeleton } from '@/components/ui/ImageSkeleton';
import { useAuth } from '@/context/AuthContext';

const categoryImages: Record<string, string> = {
  rice:     'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=250&fit=crop&auto=format&q=80',
  pasta:    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=250&fit=crop&auto=format&q=80',
  proteins: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=250&fit=crop&auto=format&q=80',
  drinks:   'https://plus.unsplash.com/premium_photo-1677000666461-fbefa43c2c7f?w=400&h=250&fit=crop&auto=format&q=80',
  soups:    'https://plus.unsplash.com/premium_photo-1669831178095-005ed789250a?w=400&h=250&fit=crop&auto=format&q=80',
  swallow:  'https://plus.unsplash.com/premium_photo-1696835870634-e6484e8ed4d7?w=400&h=250&fit=crop&auto=format&q=80',
  snacks:   'https://plus.unsplash.com/premium_photo-1665669263531-cdcbe18e7fe4?w=400&h=250&fit=crop&auto=format&q=80',
  combos:   'https://images.unsplash.com/photo-1544025162-811114cd3543?w=400&h=250&fit=crop&auto=format&q=80',
};

const pad = (n: number) => String(n).padStart(2, '0');

export default function Home() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const featuredRef  = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  // Countdown to midnight
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const calc = () => {
      const now  = new Date();
      const end  = new Date(); end.setHours(24, 0, 0, 0);
      const diff = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
      return { h: Math.floor(diff / 3600), m: Math.floor((diff % 3600) / 60), s: diff % 60 };
    };
    setTimeLeft(calc());
    const t = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(t);
  }, []);

  // Floating CTA visibility
  const [floatVisible, setFloatVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setFloatVisible(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Video cards animate in when scrolled into view
  const [videosVisible, setVideosVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVideosVisible(true); },
      { threshold: 0.15 }
    );
    if (videoSectionRef.current) observer.observe(videoSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const { isLoggedIn, user } = useAuth();

  const featuredDishes = menuItems.filter(item =>
    ['jollof-rice', 'spaghetti-bolognese', 'seafood-pasta', 'asun', 'grilled-chicken', 'meat-pie', 'egusi-soup', 'chapman'].includes(item.id)
  );
  const dealItem = menuItems.find(i => i.id === 'jollof-rice')!;

  // Mock last order for quick reorder
  const lastOrder = [
    menuItems.find(i => i.id === 'jollof-rice')!,
    menuItems.find(i => i.id === 'grilled-chicken')!,
  ];

  const scroll = (ref: React.RefObject<HTMLDivElement>, dir: 'left' | 'right') =>
    ref.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });

  const handleAddressSubmit = (e: React.FormEvent) => { e.preventDefault(); router.push('/menu'); };

  // ── Logged-in dashboard ──────────────────────────────────────
  if (isLoggedIn) {
    return (
      <div className="w-full flex flex-col gap-0 bg-brand-black min-h-screen">

        {/* Greeting banner */}
        <section className="px-6 pt-8 pb-6 border-b border-brand-border">
          <div className="max-w-5xl mx-auto">
            <p className="font-body text-xs text-brand-muted uppercase tracking-widest mb-1">Dashboard</p>
            <h1 className="font-display font-bold text-[28px] text-brand-white">
              What are you eating today?
            </h1>

            {/* Address bar */}
            <form onSubmit={handleAddressSubmit} className="mt-4 flex items-stretch max-w-lg rounded-sm overflow-hidden border border-brand-border bg-brand-surface focus-within:border-brand-red transition-colors">
              <div className="flex items-center pl-3 pr-2 text-brand-red flex-shrink-0"><MapPin size={16} strokeWidth={2} /></div>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                placeholder="Delivery address..."
                className="flex-1 bg-transparent font-body text-sm text-brand-white placeholder:text-brand-muted/50 py-3 focus:outline-none min-w-0" />
              <button type="submit" className="flex items-center gap-1.5 bg-brand-red hover:bg-brand-red-hover text-white font-body font-bold text-[11px] uppercase tracking-widest px-4 transition-colors">
                Go <ArrowRight size={13} />
              </button>
            </form>
          </div>
        </section>

        {/* Quick Reorder */}
        <section className="px-6 py-6 border-b border-brand-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-brand-muted" />
                <h2 className="font-body font-semibold text-sm text-brand-white uppercase tracking-widest">Last Order</h2>
              </div>
              <Link href="/order" className="font-body text-xs text-brand-red hover:underline">View all orders</Link>
            </div>
            <div className="flex items-center gap-4 p-4 bg-brand-surface border border-brand-border rounded-sm">
              <div className="flex -space-x-3">
                {lastOrder.map(item => (
                  <div key={item.id} className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-black flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  </div>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-sm text-brand-white truncate">
                  {lastOrder.map(i => i.name).join(', ')}
                </p>
                <p className="font-body text-xs text-brand-muted mt-0.5">
                  ₦{lastOrder.reduce((s, i) => s + i.price, 0).toLocaleString()} · Yesterday, 7:42pm
                </p>
              </div>
              <button className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white font-body font-bold text-[11px] uppercase tracking-widest px-4 py-2.5 rounded-sm transition-colors flex-shrink-0">
                <RotateCcw size={12} /> Reorder
              </button>
            </div>
          </div>
        </section>

        {/* Featured Dishes */}
        <section className="px-6 py-6 border-b border-brand-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="font-display font-bold text-[20px] text-brand-white">Featured Dishes</h2>
                <p className="font-body text-xs text-brand-muted mt-0.5">Our most ordered today</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => scroll(featuredRef, 'left')} className="w-7 h-7 rounded-full border border-brand-border bg-brand-surface hover:border-brand-red hover:text-brand-red text-brand-muted flex items-center justify-center transition-colors"><ChevronLeft size={14} /></button>
                <button onClick={() => scroll(featuredRef, 'right')} className="w-7 h-7 rounded-full border border-brand-border bg-brand-surface hover:border-brand-red hover:text-brand-red text-brand-muted flex items-center justify-center transition-colors"><ChevronRight size={14} /></button>
              </div>
            </div>
            <div ref={featuredRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-6 px-6">
              {featuredDishes.map(item => (
                <div key={item.id} className="snap-start flex-shrink-0 w-[160px]"><FoodCard item={item} /></div>
              ))}
            </div>
          </div>
        </section>

        {/* Browse Categories */}
        <section className="px-6 py-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-4">
              <h2 className="font-display font-bold text-[20px] text-brand-white">Browse Menu</h2>
              <Link href="/menu" className="font-body text-xs text-brand-red hover:underline uppercase tracking-widest">View all</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.filter(c => c.id !== 'all').map(category => (
                <Link key={category.id} href={`/menu?category=${category.id}`} className="block group">
                  <div className="relative h-[90px] rounded-sm overflow-hidden bg-brand-surface border border-transparent group-hover:border-brand-red transition-all duration-300">
                    <Image
                      src={categoryImages[category.id] || ''}
                      alt={category.label} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <span className="font-display font-semibold text-sm text-white group-hover:text-brand-red transition-colors flex items-center gap-1">
                        {category.label} <span className="text-xs">{category.emoji}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative px-5 pt-12 pb-8 md:pt-20 md:pb-14 w-full overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-red opacity-[0.08] blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-red opacity-[0.06] blur-[60px]" />
        </div>
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {[
            { emoji: '🍛', left: '5%',  delay: '0s',   dur: '9s',  size: '1.8rem' },
            { emoji: '🍗', left: '15%', delay: '1.5s', dur: '11s', size: '1.4rem' },
            { emoji: '🥘', left: '25%', delay: '3s',   dur: '8s',  size: '2rem'   },
            { emoji: '🍝', left: '35%', delay: '0.8s', dur: '13s', size: '1.5rem' },
            { emoji: '🥩', left: '50%', delay: '2s',   dur: '10s', size: '1.6rem' },
            { emoji: '🍹', left: '62%', delay: '4s',   dur: '9s',  size: '1.4rem' },
            { emoji: '🌶️', left: '72%', delay: '1s',   dur: '12s', size: '1.3rem' },
            { emoji: '🍲', left: '82%', delay: '3.5s', dur: '11s', size: '1.8rem' },
            { emoji: '🥗', left: '90%', delay: '0.5s', dur: '8s',  size: '1.5rem' },
            { emoji: '🍖', left: '45%', delay: '5s',   dur: '14s', size: '1.2rem' },
            { emoji: '🫙', left: '8%',  delay: '6s',   dur: '10s', size: '1.3rem' },
            { emoji: '🧆', left: '58%', delay: '2.5s', dur: '9s',  size: '1.6rem' },
          ].map((item, i) => (
            <span key={i} className="food-float absolute bottom-0 select-none"
              style={{ left: item.left, fontSize: item.size, animationDelay: item.delay, animationDuration: item.dur, opacity: 0 }}>
              {item.emoji}
            </span>
          ))}
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-5 h-px bg-brand-red" />
            <span className="font-body font-semibold text-[10px] text-brand-red tracking-[0.15em] uppercase">NOW DELIVERING IN LAGOS</span>
            <div className="w-5 h-px bg-brand-red" />
          </div>
          <h1 className="font-display font-bold text-[42px] md:text-[64px] leading-[1.05] text-brand-white">
            Good Food,<br /><em className="font-display italic text-brand-red">Delivered.</em>
          </h1>
          <p className="font-body text-sm md:text-base text-brand-muted leading-relaxed max-w-sm mt-4">
            King Mitchy&apos;s Belle Food — Lagos&apos;s favourite restaurant, now online. Order your favourites, delivered fresh to your door.
          </p>
          <form onSubmit={handleAddressSubmit} className="mt-8 flex items-stretch w-full rounded-sm overflow-hidden border-2 border-brand-border bg-brand-surface focus-within:border-brand-red transition-colors shadow-lg">
            <div className="flex items-center pl-4 pr-3 text-brand-red flex-shrink-0"><MapPin size={22} strokeWidth={2} /></div>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)}
              placeholder="Enter your delivery address..."
              className="flex-1 bg-transparent font-body text-base text-brand-white placeholder:text-brand-muted/50 py-4 pr-2 focus:outline-none min-w-0" />
            <button type="submit" className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white font-body font-bold text-xs uppercase tracking-widest px-6 py-4 transition-colors flex-shrink-0">
              <span className="hidden sm:block">Find Food</span>
              <ArrowRight size={17} strokeWidth={2.5} />
            </button>
          </form>
          <p className="font-body text-[11px] text-brand-muted mt-3">
            Serving <span className="text-brand-white font-medium">Chevron, Lekki, Ajah</span> & environs
          </p>
          <div className="flex gap-0 mt-10 pt-8 border-t border-brand-border w-full justify-center">
            <div className="flex-1"><p className="font-display font-bold text-2xl text-brand-red">2k+</p><p className="font-body text-[10px] text-brand-muted uppercase tracking-widest mt-1">Happy Customers</p></div>
            <div className="flex-1"><p className="font-display font-bold text-2xl text-brand-red">4.8★</p><p className="font-body text-[10px] text-brand-muted uppercase tracking-widest mt-1">Average Rating</p></div>
            <div className="flex-1"><p className="font-display font-bold text-2xl text-brand-red">35m</p><p className="font-body text-[10px] text-brand-muted uppercase tracking-widest mt-1">Avg. Delivery</p></div>
          </div>
        </div>
      </section>

      {/* ── Featured Dishes ────────────────────────────────────── */}
      <section className="px-5 py-10 w-full bg-brand-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="font-display font-bold text-[22px] text-brand-white">Featured Dishes</h2>
              <p className="font-body text-xs text-brand-muted mt-1">Our most ordered</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => scroll(featuredRef, 'left')} className="w-8 h-8 rounded-full border border-brand-border bg-brand-surface hover:border-brand-red hover:text-brand-red text-brand-muted flex items-center justify-center transition-colors"><ChevronLeft size={16} /></button>
              <button onClick={() => scroll(featuredRef, 'right')} className="w-8 h-8 rounded-full border border-brand-border bg-brand-surface hover:border-brand-red hover:text-brand-red text-brand-muted flex items-center justify-center transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div ref={featuredRef} className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0">
            {featuredDishes.map((item) => (
              <div key={item.id} className="snap-start flex-shrink-0 w-[175px] md:w-[220px]"><FoodCard item={item} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Break ───────────────────────────────────────── */}
      <section className="relative w-full py-16 md:py-20 px-5 bg-brand-red overflow-hidden flex items-center justify-center text-center">
        {/* Subtle texture blobs */}
        <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-black/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="font-display text-[80px] md:text-[120px] leading-none text-white/10 select-none absolute -top-6 left-0">&ldquo;</span>
          <p className="font-display font-bold italic text-[28px] md:text-[42px] leading-tight text-white relative z-10">
            Order from Belle Food<br />
            <span className="text-white/80">make your skin full.</span>
          </p>
          <span className="font-display text-[80px] md:text-[120px] leading-none text-white/10 select-none absolute -bottom-10 right-0">&rdquo;</span>
        </div>
      </section>

      {/* ── Deal of the Day ────────────────────────────────────── */}
      <section className="px-5 py-10 w-full bg-brand-surface">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-sm overflow-hidden border border-brand-border bg-brand-card grid md:grid-cols-2 min-h-[320px]">

            {/* Food image */}
            <div className="relative min-h-[220px] md:min-h-full overflow-hidden">
              <ImageSkeleton />
              <Image
                src="https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop&auto=format&q=80"
                alt="Deal of the Day"
                fill className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-card/80 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-card/90 to-transparent md:hidden" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center px-7 py-8 gap-4">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-brand-red text-white font-body font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                  🔥 Today&apos;s Special
                </span>
              </div>

              <div>
                <h2 className="font-display font-bold text-[28px] md:text-[34px] text-brand-white leading-tight">{dealItem.name}</h2>
                <p className="font-body text-sm text-brand-muted mt-2 leading-relaxed max-w-xs">{dealItem.description}</p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-display font-bold text-[32px] text-brand-red">₦{dealItem.price.toLocaleString()}</span>
                <span className="font-body text-sm text-brand-muted line-through">₦{(dealItem.price * 1.15).toLocaleString('en', { maximumFractionDigits: 0 })}</span>
                <span className="font-body text-xs font-bold text-green-400">15% OFF</span>
              </div>

              {/* Countdown */}
              <div className="flex flex-col gap-1.5">
                <p className="font-body text-[10px] text-brand-muted uppercase tracking-widest">Deal ends in</p>
                <div className="flex items-center gap-2">
                  {[
                    { val: pad(timeLeft.h), label: 'hrs' },
                    { val: pad(timeLeft.m), label: 'min' },
                    { val: pad(timeLeft.s), label: 'sec' },
                  ].map(({ val, label }, i) => (
                    <React.Fragment key={label}>
                      <div className="flex flex-col items-center bg-brand-black border border-brand-border rounded-sm px-3 py-1.5 min-w-[48px]">
                        <span className="font-display font-bold text-xl text-brand-white tabular-nums">{val}</span>
                        <span className="font-body text-[9px] text-brand-muted uppercase tracking-widest">{label}</span>
                      </div>
                      {i < 2 && <span className="font-display font-bold text-brand-red text-lg">:</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <Link href={`/menu/${dealItem.id}`}
                className="mt-1 inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white font-body font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-colors self-start">
                <ShoppingBag size={14} /> Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse by Category — 2×4 grid ─────────────────────── */}
      <section className="px-5 py-10 w-full bg-brand-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="font-display font-bold text-[22px] text-brand-white">Browse by Category</h2>
              <p className="font-body text-xs text-brand-muted mt-1">What are you craving?</p>
            </div>
            <Link href="/menu" className="font-body text-xs text-brand-red hover:underline uppercase tracking-widest">View all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.filter(c => c.id !== 'all').map((category) => (
              <Link key={category.id} href={`/menu?category=${category.id}`} className="block group">
                <div className="relative h-[110px] md:h-[130px] rounded-sm overflow-hidden bg-brand-surface border border-transparent group-hover:border-brand-red transition-all duration-300">
                  <ImageSkeleton />
                  <Image
                    src={categoryImages[category.id] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop'}
                    alt={category.label} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="font-display font-semibold text-sm text-white group-hover:text-brand-red transition-colors flex items-center gap-1.5">
                      {category.label} <span className="text-xs">{category.emoji}</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Marquee ──────────────────────────────────────── */}
      <section className="w-full bg-brand-red overflow-hidden py-3 relative">
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-brand-red to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-brand-red to-transparent z-10 pointer-events-none" />
        <div className="marquee-track flex items-center gap-0 whitespace-nowrap">
          {[...Array(2)].map((_, gi) => (
            <div key={gi} className="flex items-center gap-0">
              {[
                { icon: <Truck size={14} />,                            text: 'Free delivery above ₦10,000' },
                { icon: <Star size={14} className="fill-white" />,      text: '4.8★ Rated in Lagos' },
                { icon: <BadgeCheck size={14} />,                       text: 'Fresh & hot, every order' },
                { icon: <Truck size={14} />,                            text: 'Chevron · Lekki · Ajah' },
                { icon: <Star size={14} className="fill-white" />,      text: '2,000+ happy customers' },
                { icon: <BadgeCheck size={14} />,                       text: 'Order in under 2 minutes' },
              ].map(({ icon, text }, i) => (
                <div key={i} className="flex items-center gap-8">
                  <div className="flex items-center gap-2 text-white">
                    <span className="opacity-70">{icon}</span>
                    <span className="font-body font-semibold text-sm">{text}</span>
                  </div>
                  <span className="text-white/30 font-bold text-lg mx-4">·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Full-bleed Magazine Section ────────────────────────── */}
      <section className="relative w-full min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=900&fit=crop&auto=format&q=75"
          alt="Belle Food kitchen"
          fill className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="relative z-10 px-8 md:px-16 max-w-2xl">
          <p className="font-body text-[10px] text-brand-red uppercase tracking-[0.25em] mb-4">The Belle Food Promise</p>
          <h2 className="font-display font-bold text-[36px] md:text-[54px] leading-[1.05] text-white">
            Every plate tells<br />
            <em className="italic text-brand-red">a story.</em>
          </h2>
          <p className="font-body text-sm md:text-base text-white/70 mt-5 leading-relaxed max-w-md">
            We cook with the same care your grandmother did — fresh ingredients, no shortcuts, every single day. That&apos;s the Belle Food difference.
          </p>
          <Link href="/menu" className="mt-8 inline-flex items-center gap-2 bg-white text-brand-black font-body font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm hover:bg-white/90 transition-colors">
            Explore the Menu <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────── */}
      <section className="px-5 py-14 w-full bg-brand-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-body text-[10px] text-brand-red uppercase tracking-[0.2em] mb-2">Simple & Fast</p>
            <h2 className="font-display font-bold text-[26px] text-brand-white">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <UtensilsCrossed size={24} />, step: '01', title: 'Browse the Menu',   desc: 'Explore our full menu — rice, pasta, proteins, soups, drinks and more. Filter by category or search for your favourite.' },
              { icon: <BadgeCheck size={24} />,      step: '02', title: 'Place Your Order',  desc: 'Add items to your cart, choose your size and extras, then head to checkout. Delivery or pickup — your choice.' },
              { icon: <Truck size={24} />,            step: '03', title: 'Get It Delivered', desc: 'Your food is prepared fresh and dispatched hot. Track your order in real time and receive it at your door.' },
            ].map(({ icon, step, title, desc }) => (
              <div key={step} className="flex flex-col gap-4 p-6 bg-brand-card border border-brand-border rounded-sm group hover:border-brand-red/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-sm bg-brand-red/10 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors">{icon}</div>
                  <span className="font-display font-bold text-[40px] leading-none text-brand-border">{step}</span>
                </div>
                <h3 className="font-display font-bold text-base text-brand-white">{title}</h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Testimonials ─────────────────────────────────── */}
      <section className="px-5 py-14 w-full bg-brand-black" ref={videoSectionRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-body text-[10px] text-brand-red uppercase tracking-[0.2em] mb-2">What People Say</p>
            <h2 className="font-display font-bold text-[26px] text-brand-white">Real reviews from real customers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { platform: 'tiktok' as const,    url: 'https://www.tiktok.com',    handle: '@bellefood_customer', caption: 'This jollof rice hits different 🔥',         thumbnail: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=700&fit=crop&auto=format&q=80' },
              { platform: 'instagram' as const, url: 'https://www.instagram.com', handle: '@emeka_eats',          caption: 'Belle Food never disappoints 🙌',            thumbnail: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=700&fit=crop&auto=format&q=80' },
              { platform: 'tiktok' as const,    url: 'https://www.tiktok.com',    handle: '@funmiajah',           caption: 'The egusi soup brought me to tears 😭❤️',    thumbnail: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=700&fit=crop&auto=format&q=80' },
            ].map(({ platform, url, handle, caption, thumbnail }, idx) => (
              <a key={handle} href={url} target="_blank" rel="noopener noreferrer"
                className="group relative flex flex-col rounded-sm overflow-hidden border border-brand-border hover:border-brand-red transition-all duration-500"
                style={{
                  opacity: videosVisible ? 1 : 0,
                  transform: videosVisible ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 0.5s ease ${idx * 0.15}s, transform 0.5s ease ${idx * 0.15}s, border-color 0.2s`,
                }}
              >
                <div className="relative w-full aspect-[9/16] bg-brand-surface overflow-hidden">
                  <Image src={thumbnail} alt={caption} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

                  {/* Platform badge */}
                  <div className="absolute top-3 left-3 z-10">
                    {platform === 'tiktok' ? (
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
                        <span className="font-body text-[10px] font-bold text-white">TikTok</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                        <span className="font-body text-[10px] font-bold text-white">Instagram</span>
                      </div>
                    )}
                  </div>

                  {/* Play button — pulses when first visible */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className={`w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red transition-colors ${videosVisible ? 'animate-[ping-slow_1.5s_ease-out_1]' : ''}`}
                      style={{ animationDelay: `${idx * 0.2}s` }}>
                      <Play size={20} className="text-white fill-white ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <p className="font-body font-semibold text-xs text-white/70">{handle}</p>
                    <p className="font-body text-sm text-white mt-0.5 leading-snug">{caption}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <p className="text-center font-body text-xs text-brand-muted mt-6">Tap any video to watch on TikTok or Instagram</p>
        </div>
      </section>

      {/* ── Sign-up CTA — with background ──────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=700&fit=crop&auto=format&q=70"
          alt="Food background"
          fill className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 px-5 py-20 max-w-2xl mx-auto text-center">
          <p className="font-body text-[10px] text-brand-red uppercase tracking-[0.2em] mb-3">Join Belle Food</p>
          <h2 className="font-display font-bold text-[30px] md:text-[42px] text-white leading-tight">
            Create a free account &<br />start ordering today
          </h2>
          <p className="font-body text-sm text-white/60 mt-4 max-w-sm mx-auto leading-relaxed">
            Save your delivery address, track every order, and unlock exclusive deals — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <Link href="/auth" className="bg-brand-red hover:bg-brand-red-hover text-white font-body font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-sm transition-colors">
              Create Free Account
            </Link>
            <Link href="/menu" className="border border-white/30 hover:border-white text-white font-body font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-sm transition-colors">
              Browse Menu First
            </Link>
          </div>
        </div>
      </section>

      {/* ── As Seen On ─────────────────────────────────────────── */}
      <section className="bg-brand-black border-t border-brand-border py-8 px-5 w-full">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-5">
          <p className="font-body text-[10px] text-brand-muted uppercase tracking-[0.2em]">As seen on</p>
          <div className="flex items-center gap-10 justify-center flex-wrap">
            <a href="#" className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-brand-white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
              <span className="font-body font-semibold text-sm text-brand-white">TikTok</span>
            </a>
            <div className="w-px h-5 bg-brand-border" />
            <a href="#" className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-brand-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              <span className="font-body font-semibold text-sm text-brand-white">Instagram</span>
            </a>
            <div className="w-px h-5 bg-brand-border" />
            <a href="#" className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-brand-white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span className="font-body font-semibold text-sm text-brand-white">YouTube</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Floating mobile CTA ────────────────────────────────── */}
      <div className={`md:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${floatVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <Link href="/menu" className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white font-body font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-xl shadow-brand-red/30 transition-colors">
          <ShoppingBag size={15} /> Order Now
        </Link>
      </div>

    </div>
  );
}
