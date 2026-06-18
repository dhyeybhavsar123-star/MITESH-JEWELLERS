import React from 'react';

export default function FestiveDecoration() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-50 overflow-hidden h-32 select-none">
      {/* Hanging Genda Phool (Marigold) Garlands & Fairy Lights */}
      <div id="marigold-garlands-container" className="absolute top-0 inset-x-0 flex justify-between px-2 sm:px-6">
        {[...Array(12)].map((_, idx) => {
          // Staggered heights for realistic luxury feel
          const heights = ['h-12', 'h-24', 'h-16', 'h-20', 'h-14', 'h-28', 'h-18', 'h-22', 'h-16', 'h-26', 'h-12', 'h-20'];
          const h = heights[idx % heights.length];
          const isBellLong = idx % 3 === 0;

          return (
            <div key={idx} className={`flex flex-col items-center ${h} relative animate-fade-in`}>
              {/* Thin thread */}
              <div className="w-[1px] bg-[#C9973A]/40 flex-1 flex flex-col items-center justify-between py-1">
                {/* Petals along the string */}
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
                <div className="w-2 h-2 rounded-full bg-orange-600 shadow-sm shadow-orange-600/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                {idx % 2 === 0 && (
                  <div className="w-2 h-2 rounded-full bg-orange-500 shadow-sm" />
                )}
              </div>
              
              {/* Hanging Brass Bell at the end of garland */}
              <div className="flex flex-col items-center mt-[-2px]">
                <div className="w-3.5 h-3.5 rounded-t-full bg-gradient-to-b from-[#C9973A] to-[#A37B2E] border border-[#C9973A]/40 flex items-center justify-center shadow-lg relative">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce absolute -bottom-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fairy Lights glow dots draping elegantly */}
      <div id="fairy-lights-overlay" className="absolute top-0 inset-x-0 h-4 flex justify-around px-8">
        {[...Array(18)].map((_, idx) => {
          const delays = ['delay-0', 'delay-100', 'delay-200', 'delay-300', 'delay-500', 'delay-700'];
          const delay = delays[idx % delays.length];
          
          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Connecting virtual cable node */}
              <div className="w-1.5 h-1 bg-amber-900/60 rounded-full" />
              {/* Pulsating Micro bulb */}
              <span className={`w-1.5 h-2 bg-yellow-300 rounded-b-full shadow-[0_0_8px_#FCD34D] animate-pulse ${delay}`} />
            </div>
          );
        })}
      </div>

      {/* Aesthetic Marigold Garland curve underneath */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
    </div>
  );
}
