import React from 'react';


// Assuming we don't have clsx/tailwind-merge setup, I'll use simple template literals for now
// wait, the user didn't ask for cn utility, so I will just use string concatenation.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', fullWidth, children, ...props }, ref) => {
    const baseStyles = "font-body font-semibold text-sm uppercase tracking-wider px-6 py-3.5 rounded-sm transition-all duration-200 inline-flex items-center justify-center";
    
    const variants = {
      primary: "bg-brand-red text-white hover:bg-brand-red-hover",
      ghost: "bg-transparent border border-brand-border text-brand-white hover:border-brand-white/40",
    };

    const classes = `${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className || ''}`;

    return (
      <button ref={ref} className={classes.trim()} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
