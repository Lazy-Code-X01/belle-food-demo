import React from 'react';

export const DeliveryStrip = () => {
  return (
    <div className="w-full bg-brand-red py-2.5 px-5">
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        <p className="font-body text-[11px] font-medium text-white tracking-wide text-center">
          <span className="inline-block">🛵 Free delivery in Chevron & Lekki</span>
          <span className="mx-2">·</span>
          <span className="inline-block">⏱ 35–50 min</span>
          <span className="hidden md:inline-block">
            <span className="mx-2">·</span>
            📍 Open daily 9am–10pm
          </span>
        </p>
      </div>
    </div>
  );
};
