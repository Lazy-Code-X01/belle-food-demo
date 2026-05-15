import React from 'react';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`bg-brand-red text-white font-body font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm inline-block ${className || ''}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
