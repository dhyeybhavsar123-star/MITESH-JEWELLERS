import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { TrendingUp, TrendingDown, RefreshCw, Sparkles } from 'lucide-react';

export default function GoldRateTicker() {
  const { goldRates, updateGoldRates } = useShop();
  const [showSimulate, setShowSimulate] = useState(false);

  // Function to simulate real time fluctuations slightly
  const handleSimulateFluctuation = () => {
    const changePercent = (Math.random() * 1.5 - 0.7) / 100; // -0.7% to +0.8%
    const new24K = Math.round(goldRates['24K'] * (1 + changePercent));
    const new22K = Math.round(goldRates['22K'] * (1 + changePercent));
    const new18K = Math.round(goldRates['18K'] * (1 + changePercent));
    
    updateGoldRates({
      '24K': new24K,
      '22K': new22K,
      '18K': new18K
    });
  };

  return (
    <div id="gold-rate-ticker-bar" className="bg-[#1C1B19] text-white py-2 px-4 shadow-inner border-b border-[#C9973A]/10 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Ticker marquee simulation */}
        <div className="flex items-center gap-2 overflow-hidden w-full md:w-auto">
          <div className="bg-[#C9973A] text-[#1C1B19] px-2 py-0.5 rounded-sm font-semibold tracking-wider text-[10px] flex items-center gap-1 animate-pulse shrink-0 uppercase">
            <Sparkles className="w-3 h-3" /> Live Gold Rate Today
          </div>
          
          <div className="flex items-center gap-6 animate-marquee whitespace-nowrap overflow-x-auto scrollbar-hide py-0.5">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[#A29E9A] font-medium">24K Gold 99.9% Purity:</span>
              <span className="font-semibold text-[#F5F2EB]">₹{goldRates['24K'].toLocaleString('en-IN')}/g</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="hidden md:inline text-[#3F3D3A]" aria-hidden="true">•</div>
            
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[#A29E9A] font-medium">22K Gold (BIS 916 Hallmark):</span>
              <span className="font-semibold text-[#C9973A]">₹{goldRates['22K'].toLocaleString('en-IN')}/g</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="hidden md:inline text-[#3F3D3A]" aria-hidden="true">•</div>
            
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[#A29E9A] font-medium">18K Gold Standard:</span>
              <span className="font-semibold text-[#F5F2EB]">₹{goldRates['18K'].toLocaleString('en-IN')}/g</span>
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            </div>
          </div>
        </div>

        {/* Live Simulator for conversion & trust showcasing real calculated updates */}
        <div className="flex items-center justify-between md:justify-end gap-3 self-end md:self-auto shrink-0 border-t border-[#3F3D3A] md:border-t-0 pt-2 md:pt-0 w-full md:w-auto">
          <span className="text-[#A29E9A] text-[11px] font-mono tracking-tight">
            {goldRates.updatedTime}
          </span>
          <div className="relative">
            <button
              id="simulate-fluctuation-btn"
              onClick={() => setShowSimulate(!showSimulate)}
              className="text-[#C9973A] hover:text-[#E2B755] cursor-pointer transition-all duration-200 py-0.5 px-2 rounded border border-[#C9973A]/20 hover:border-[#C9973A]/40 flex items-center gap-1 hover:bg-[#C9973A]/5 text-[11px]"
            >
              <RefreshCw className="w-3 h-3 animate-spin-slow" />
              Simulate Live Feed
            </button>
            
            {showSimulate && (
              <div id="simulate-rate-box" className="absolute right-0 top-10 z-50 bg-[#2C2A29] border border-[#C9973A]/30 p-3 rounded-lg shadow-2xl w-64 text-left transition-all">
                <h4 className="font-serif text-[#C9973A] text-sm font-medium mb-1">Simulate MCX Market Feed</h4>
                <p className="text-[11px] text-[#A29E9A] leading-relaxed mb-3">
                  Force a slight market fluctuation. Watch PDP live calculators update weights and taxes instantly!
                </p>
                <div className="flex gap-2">
                  <button
                    id="trigger-fluctuation-btn"
                    onClick={() => {
                      handleSimulateFluctuation();
                      setShowSimulate(false);
                    }}
                    className="w-full bg-[#C9973A] text-[#1C1B19] py-1.5 px-3 rounded text-xs font-semibold hover:bg-[#E2B755] transition text-center cursor-pointer"
                  >
                    Trigger Market Change
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
