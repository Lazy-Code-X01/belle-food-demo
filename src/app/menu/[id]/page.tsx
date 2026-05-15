"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Heart, Check, Minus, Plus } from 'lucide-react';
import { menuItems } from '@/data/menu';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import Image from 'next/image';
import { ImageSkeleton } from '@/components/ui/ImageSkeleton';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  
  // State
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1); // Default to Regular
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const item = menuItems.find(i => i.id === params.id);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-20 px-5 text-center">
        <span className="text-6xl mb-4">🤷🏽‍♀️</span>
        <h2 className="font-display font-bold text-xl text-brand-white">Dish not found</h2>
        <Link 
          href="/menu"
          className="mt-6 px-6 py-3 bg-brand-surface border border-brand-border rounded-sm font-body font-semibold text-sm text-brand-white hover:bg-brand-border transition-colors"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  // Ensure selected size is within bounds, or default to 0 if sizes exist
  const currentSizeIndex = item.sizes ? Math.min(selectedSizeIndex, item.sizes.length - 1) : 0;
  
  // Calculate price
  const basePrice = item.sizes ? item.sizes[currentSizeIndex].price : item.price;
  const extrasTotal = item.extras 
    ? selectedExtras.reduce((sum, idx) => sum + item.extras![idx].price, 0)
    : 0;
  const totalPrice = (basePrice + extrasTotal) * quantity;

  // Additional description
  const categoryDesc: Record<string, string> = {
    rice: "Cooked low and slow with our secret Belle Food spice mix for that authentic party flavor.",
    pasta: "Tossed in our rich, homemade sauces for the perfect al dente experience.",
    proteins: "Marinated overnight to ensure every bite is bursting with flavor.",
    drinks: "Chilled to perfection, the perfect companion to your meal.",
    combos: "A curated combination of our best sellers for maximum satisfaction."
  };
  const extendedDescription = `${item.description}. ${categoryDesc[item.category] || ""}`;

  // Goes well with (3 items from same or related category)
  const relatedItems = menuItems
    .filter(i => i.id !== item.id && (i.category === item.category || i.category === 'drinks'))
    .slice(0, 3);

  const toggleExtra = (index: number) => {
    setSelectedExtras(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Construct size and extras strings
    const sizeStr = item.sizes ? item.sizes[currentSizeIndex].name : undefined;
    const extrasStrs = item.extras ? selectedExtras.map(idx => item.extras![idx].name) : undefined;
    
    // Add item with quantity, size, and extras
    addItem(item, quantity, sizeStr, extrasStrs);
    
    showToast(`Added to order!`);
    
    setTimeout(() => {
      router.push('/menu');
    }, 500);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col flex-1 pb-24 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto w-full flex flex-col flex-1">
        {/* 1. Food Image Header */}
      <div className="relative w-full h-[260px] md:h-[360px] overflow-hidden bg-brand-surface">
        <ImageSkeleton />
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover opacity-0 transition-opacity duration-500"
          sizes="100vw"
          priority
          onLoad={(e) => {
            const img = e.currentTarget;
            img.classList.remove('opacity-0');
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-brand-black z-10 pointer-events-none" />
        
        {/* Top actions */}
        <button 
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-brand-black/50 backdrop-blur-md flex items-center justify-center text-white transition-transform active:scale-95"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-brand-black/50 backdrop-blur-md flex items-center justify-center transition-transform active:scale-95"
        >
          <Heart 
            size={18} 
            strokeWidth={2} 
            className={isFavorite ? "fill-brand-red text-brand-red" : "text-white"} 
          />
        </button>
        
        {/* Badge */}
        {item.tag && (
          <div className="absolute bottom-4 left-5 z-20">
            <Badge>{item.tag}</Badge>
          </div>
        )}
      </div>

      {/* 2. Product Info Section */}
      <div className="px-5 pt-5 pb-4">
        <h1 className="font-display font-bold text-[26px] text-brand-white leading-tight">
          {item.name}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-brand-gold tracking-widest">★★★★★</span>
          <span className="font-body font-semibold text-sm text-brand-gold">4.8</span>
          <span className="font-body text-xs text-brand-muted">(124 reviews)</span>
        </div>
        <p className="font-body text-sm text-brand-muted/80 leading-relaxed mt-3">
          {extendedDescription}
        </p>
        <div className="font-display font-bold text-[28px] text-brand-gold mt-4">
          {formatPrice(basePrice)}
        </div>
      </div>

      {/* 3. Portion Size Selector */}
      {item.sizes && item.sizes.length > 0 && (
        <div className="px-5 py-4">
          <h3 className="font-body font-semibold text-[11px] text-brand-white uppercase tracking-widest mb-3">
            Select Portion
          </h3>
          <div className="flex flex-col gap-2.5">
            {item.sizes.map((size, idx) => (
              <div 
                key={size.name}
                onClick={() => setSelectedSizeIndex(idx)}
                className={`flex items-center px-4 py-3 rounded-md border transition-all duration-200 cursor-pointer ${
                  selectedSizeIndex === idx 
                    ? 'border-brand-red bg-brand-red/5' 
                    : 'bg-brand-surface border-brand-border hover:border-brand-white/20'
                }`}
              >
                {/* Custom Radio */}
                <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedSizeIndex === idx ? 'border-brand-red' : 'border-brand-muted'
                }`}>
                  {selectedSizeIndex === idx && <div className="w-2 h-2 rounded-full bg-brand-red" />}
                </div>
                <span className="font-body font-medium text-sm text-brand-white flex-1 ml-3">
                  {size.name}
                </span>
                <span className="font-body text-sm text-brand-muted">
                  {formatPrice(size.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Extras / Add-ons */}
      {item.extras && item.extras.length > 0 && (
        <div className="px-5 py-4">
          <h3 className="font-body font-semibold text-[11px] text-brand-white uppercase tracking-widest mb-3">
            Add Extras
          </h3>
          <div className="flex flex-col gap-2.5">
            {item.extras.map((extra, idx) => {
              const isChecked = selectedExtras.includes(idx);
              return (
                <div 
                  key={extra.name}
                  onClick={() => toggleExtra(idx)}
                  className={`flex items-center px-4 py-3 rounded-md border transition-all duration-200 cursor-pointer ${
                    isChecked 
                      ? 'border-brand-red/50 bg-brand-red/5' 
                      : 'bg-brand-surface border-brand-border hover:border-brand-white/20'
                  }`}
                >
                  {/* Custom Checkbox */}
                  <div className={`w-[18px] h-[18px] rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                    isChecked ? 'border-brand-red bg-brand-red' : 'border-brand-muted'
                  }`}>
                    {isChecked && <Check size={12} strokeWidth={4} className="text-white" />}
                  </div>
                  <span className="font-body font-medium text-sm text-brand-white flex-1 ml-3">
                    {extra.name}
                  </span>
                  <span className="font-body text-sm text-brand-muted">
                    +{formatPrice(extra.price)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Quantity Selector */}
      <div className="px-5 py-4 flex items-center justify-between">
        <h3 className="font-body font-semibold text-[11px] text-brand-white uppercase tracking-widest">
          Quantity
        </h3>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className={`w-9 h-9 rounded-md bg-brand-surface flex items-center justify-center transition-all ${
              quantity <= 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-brand-border active:scale-95'
            }`}
          >
            <Minus size={16} strokeWidth={2.5} className="text-brand-white" />
          </button>
          <span className="font-body font-semibold text-lg text-brand-white min-w-[24px] text-center">
            {quantity}
          </span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 rounded-md bg-brand-surface flex items-center justify-center transition-all hover:bg-brand-border active:scale-95"
          >
            <Plus size={16} strokeWidth={2.5} className="text-brand-white" />
          </button>
        </div>
      </div>

      {/* 6. Goes Well With Section */}
      {relatedItems.length > 0 && (
        <div className="px-5 py-6 border-t border-brand-border mt-2">
          <h3 className="font-body font-semibold text-[11px] text-brand-white uppercase tracking-widest mb-4">
            Goes well with
          </h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {relatedItems.map((related) => (
              <Link 
                key={related.id} 
                href={`/menu/${related.id}`}
                className="w-[120px] flex-shrink-0 snap-start group"
              >
                <div className="relative h-[80px] bg-brand-surface rounded-md overflow-hidden transition-colors">
                  <ImageSkeleton />
                  <Image
                    src={related.image}
                    alt={related.name}
                    fill
                    className="object-cover opacity-0 transition-opacity duration-300"
                    sizes="120px"
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      img.classList.remove('opacity-0');
                    }}
                  />
                </div>
                <h4 className="font-body font-semibold text-xs text-brand-white mt-2 line-clamp-1 group-hover:text-brand-red transition-colors">
                  {related.name}
                </h4>
                <p className="font-body text-[11px] text-brand-gold mt-0.5">
                  {formatPrice(related.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 7. Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-black border-t border-brand-border px-5 py-4 pb-8 md:pb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-brand-red hover:bg-brand-red-hover rounded-md h-[52px] flex items-center justify-center transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="font-body font-bold text-[15px] text-white uppercase tracking-wide">
              {isAdding ? 'Adding...' : `Add to Order — ${formatPrice(totalPrice)}`}
            </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
