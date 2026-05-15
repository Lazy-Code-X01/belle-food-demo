import React from 'react';

export function ImageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-brand-surface animate-pulse absolute inset-0 -z-10 ${className}`} />
  );
}
