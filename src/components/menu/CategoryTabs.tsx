import React from 'react';
import { categories } from '@/data/menu';

interface CategoryTabsProps {
  activeCategory: string;
  onChange: (categoryId: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onChange }) => {
  return (
    <div className="px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              px-4 py-2 rounded-sm font-body font-semibold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer
              ${isActive 
                ? 'bg-brand-red text-white border border-brand-red' 
                : 'bg-transparent border border-brand-border text-brand-muted hover:text-brand-white hover:border-brand-white/30'
              }
            `}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
