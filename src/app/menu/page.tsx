"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { CategoryTabs } from '@/components/menu/CategoryTabs';
import { FoodCard } from '@/components/menu/FoodCard';
import { menuItems } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function MenuPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const { cartCount, cartTotal } = useCart();

  useEffect(() => {
    setMounted(true);
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col flex-1 pb-24 md:pb-8 animate-in fade-in duration-300">
      {/* Sticky Header */}
      <div className="sticky top-14 z-40 bg-brand-black/95 backdrop-blur-md border-b border-brand-border pt-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="px-5 mb-4">
            <Input 
              placeholder="Search for dishes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          <CategoryTabs 
            activeCategory={activeCategory} 
            onChange={setActiveCategory} 
          />
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length > 0 ? (
        <div className="max-w-6xl mx-auto w-full px-5 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <FoodCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center flex-1 py-20 px-5 text-center">
          <span className="text-6xl mb-4">😕</span>
          <h2 className="font-display font-bold text-xl text-brand-white">No dishes found</h2>
          <p className="font-body text-sm text-brand-muted mt-2">
            Try a different search term or category.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="mt-6 font-body font-semibold text-sm text-brand-red uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Sticky Bottom Cart Bar */}
      {mounted && cartCount > 0 && (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div className="max-w-6xl w-full pointer-events-auto">
            <Link 
              href="/cart"
              className="bg-brand-red rounded-t-xl px-5 py-4 flex items-center justify-between transition-transform animate-in slide-in-from-bottom-full duration-300 shadow-2xl"
            >
              <span className="font-body font-bold text-[15px] text-white uppercase tracking-wider">
                View Cart
              </span>
              <span className="font-body font-semibold text-sm text-white/90">
                {formatPrice(cartTotal)} · {cartCount} item{cartCount !== 1 && 's'}
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
