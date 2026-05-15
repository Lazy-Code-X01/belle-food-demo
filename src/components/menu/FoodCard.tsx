"use client";

import React from 'react';
import { MenuItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';
import { Check, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { ImageSkeleton } from '@/components/ui/ImageSkeleton';

interface FoodCardProps {
  item: MenuItem;
  onAdd?: () => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onAdd }) => {
  const { items, addItem } = useCart();
  const { showToast } = useToast();
  
  const inCart = items.some(cartItem => cartItem.menuItem.id === item.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!inCart) {
      addItem(item);
      showToast(`${item.name} added to order`);
    }
    if (onAdd) onAdd();
  };

  return (
    <div className="bg-brand-card rounded-md overflow-hidden border border-transparent hover:border-brand-border transition-all duration-200 hover:-translate-y-1 cursor-pointer group flex flex-col w-full h-full relative">
      <Link href={`/menu/${item.id}`} className="flex flex-col w-full h-full">
        <div className="relative h-[130px] md:h-[150px] overflow-hidden bg-brand-surface shrink-0">
          <ImageSkeleton />
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none z-10" />
          {item.tag && (
            <div className="absolute top-2 left-2 z-20">
              <Badge>{item.tag}</Badge>
            </div>
          )}
        </div>
        
        <div className="p-3 flex flex-col gap-1.5 flex-1">
          <h3 className="font-display font-semibold text-[15px] text-brand-white leading-tight">
            {item.name}
          </h3>
          <p className="font-body text-xs text-brand-muted line-clamp-2 leading-relaxed flex-1">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between mt-1 pt-1 shrink-0 h-7">
            <span className="font-display font-bold text-base text-brand-gold">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </Link>
      
      <button 
        onClick={handleAdd}
        className={`absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-colors z-20 ${
          inCart 
            ? 'bg-green-900 text-green-400 hover:bg-green-800' 
            : 'bg-brand-red text-white hover:bg-brand-red-hover'
        }`}
      >
        {inCart ? <Check size={14} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
      </button>
    </div>
  );
};
