import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sparkles, Ribbon, Heart } from 'lucide-react';

export default function ExitIntentWishlist() {
  const { triggerExitPrompt, setTriggerExitPrompt } = useShop();
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Attempt detect mouse leaving top of screen to trigger standard exit-intent luxury banner
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && !closed && !triggerExitPrompt) {
        // Only fire if they haven't closed it in this session
        const logged = sessionStorage.getItem('dispatched_exit');
        if (!logged) {
          setTriggerExitPrompt(true);
          sessionStorage.setItem('dispatched_exit', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [closed, triggerExitPrompt]);

  if (!triggerExitPrompt) return null;

  return (
    <div id="exit-intent-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-xs" onClick={() => setTriggerExitPrompt(false)} />
      
      <div id="exit-intent-box" className="relative bg-[#FAF8F5] border-2 border-[#C9973A] p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full text-center overflow-hidden animate-scale-up">
        
        {/* Artistic Gold Frame Corner Styling */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9973A] rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9973A] rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C9973A] rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9973A] rounded-br-xl" />

        <button
          id="close-exit-intent-btn"
          onClick={() => {
            setTriggerExitPrompt(false);
            setClosed(true);
          }}
          className="absolute top-3 right-3 text-[#A29E9A] hover:text-[#2C2A29] p-1.5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-12 h-12 bg-[#F5F2EB] rounded-full flex items-center justify-center border border-[#C9973A]/20 mb-4 text-[#C9973A]">
          <Ribbon className="w-6 h-6 animate-pulse" />
        </div>

        <h3 className="font-serif text-[#1C1B19] text-xl font-black tracking-wide">
          An Exclusive Heritage Offer
        </h3>
        <p className="text-xs text-[#C9973A] font-semibold uppercase tracking-widest mt-1">
          For Your Auspicious Occasions
        </p>

        <p className="text-xs text-[#A29E9A] leading-relaxed mt-4">
          Before you depart our digital boutique, unlock an introductory discount on certified BIS hallmark jewellery sets for weddings and gifting.
        </p>

        {/* Promo code display */}
        <div className="my-6 bg-[#1C1B19] border border-[#C9973A]/30 p-4 rounded-2xl select-all cursor-pointer group">
          <p className="text-[10px] text-[#A29E9A] uppercase tracking-widest">Use Promo Code At Checkout</p>
          <p className="font-mono text-[#C9973A] text-lg font-black tracking-widest mt-1 group-hover:scale-105 transition duration-200">
            FESTIVE10
          </p>
          <p className="text-[11px] text-[#FAF8F5] mt-1 font-serif">
            Flat <span className="text-[#C9973A] font-bold">₹15,000 Off</span> on orders with making charge calculations
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            id="apply-exit-intent-code"
            onClick={() => {
              setTriggerExitPrompt(false);
              setClosed(true);
              // Simple sweet notification trigger
              alert('FESTIVE10 code saved! Continue your premium checkout, and click apply in checkout drawer to activate.');
            }}
            className="w-full bg-[#C9973A] text-[#1C1B19] font-bold py-2.5 rounded-full text-xs hover:bg-[#E2B755] transition text-center cursor-pointer select-none"
          >
            Claim ₹15,000 Off
          </button>
          
          <button
            id="exit-stay-button"
            onClick={() => {
              setTriggerExitPrompt(false);
              setClosed(true);
            }}
            className="w-full bg-transparent border border-gray-300 hover:bg-gray-50 text-[#2C2A29] py-2.5 rounded-full text-xs font-semibold transition text-center cursor-pointer select-none font-serif"
          >
            Just Browsing
          </button>
        </div>

        <p className="text-[9px] text-[#A29E9A] mt-4">
          *Applicable on 18K/22K Polki, Temple or Kundan designs. Minimum value applies.
        </p>

      </div>
    </div>
  );
}
