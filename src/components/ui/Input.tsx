import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="font-body text-xs font-medium text-brand-muted uppercase tracking-wide">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-brand-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-brand-surface border border-brand-border rounded-md text-brand-white font-body text-sm px-4 py-3 focus:border-brand-red focus:outline-none transition-colors ${
              icon ? 'pl-11' : ''
            } ${className || ''}`}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
