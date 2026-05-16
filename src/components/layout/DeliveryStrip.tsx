import React from 'react';
import { Bike, Clock, MapPin } from 'lucide-react';

export const DeliveryStrip = () => {
  return (
    <div className="w-full bg-brand-red py-2.5 px-5">
      <div className="max-w-6xl mx-auto flex justify-center items-center gap-4">
        <span className="flex items-center gap-1.5 text-white">
          <Bike size={13} className="flex-shrink-0" />
          <span className="font-body text-[11px] font-medium tracking-wide">Free delivery in Chevron &amp; Lekki</span>
        </span>
        <span className="text-white/40">·</span>
        <span className="flex items-center gap-1.5 text-white">
          <Clock size={13} className="flex-shrink-0" />
          <span className="font-body text-[11px] font-medium tracking-wide">35–50 min</span>
        </span>
        <span className="hidden md:flex items-center gap-4">
          <span className="text-white/40">·</span>
          <span className="flex items-center gap-1.5 text-white">
            <MapPin size={13} className="flex-shrink-0" />
            <span className="font-body text-[11px] font-medium tracking-wide">Open daily 9am–10pm</span>
          </span>
        </span>
      </div>
    </div>
  );
};
