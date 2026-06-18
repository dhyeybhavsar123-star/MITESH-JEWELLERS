import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Grid, Heart, Star, Search, User, Sparkles } from 'lucide-react';

export default function BottomBar() {
  const { activePage, setActivePage, wishlist, setSelectedCategory } = useShop();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  // Simple feedback when user clicks and views details
  const wishlistCount = wishlist.length;

  return (
    <>
      <div id="sticky-bottom-bar" className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#C9973A]/10 py-1.5 px-4 shadow-xl block lg:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          
          <button
            id="bottom-nav-home"
            onClick={() => {
              setActivePage('home');
              setShowSearchBox(false);
            }}
            className={`flex flex-col items-center justify-center p-2 text-center transition ${
              activePage === 'home' ? 'text-[#C9973A]' : 'text-[#A29E9A]'
            }`}
          >
            <Home className="w-5 h-5 stroke-[1.8]" />
            <span className="text-[9px] font-medium tracking-wide mt-1">Home</span>
          </button>

          <button
            id="bottom-nav-collections"
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('collections');
              setShowSearchBox(false);
            }}
            className={`flex flex-col items-center justify-center p-2 text-center transition ${
              activePage === 'collections' ? 'text-[#C9973A]' : 'text-[#A29E9A]'
            }`}
          >
            <Grid className="w-5 h-5 stroke-[1.8]" />
            <span className="text-[9px] font-medium tracking-wide mt-1">Collections</span>
          </button>

          <button
            id="bottom-nav-search"
            onClick={() => setShowSearchBox(!showSearchBox)}
            className={`flex flex-col items-center justify-center p-2 text-center transition ${
              showSearchBox ? 'text-[#C9973A]' : 'text-[#A29E9A]'
            }`}
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
            <span className="text-[9px] font-medium tracking-wide mt-1">Search</span>
          </button>

          <button
            id="bottom-nav-wishlist"
            onClick={() => {
              // Toggle wishlist panel via active drawer mechanism triggers on Header
              // But as fallback we can scroll to a nice target or prompt a drawer
              const btn = document.getElementById('header-wishlist-toggle');
              if (btn) btn.click();
            }}
            className="flex flex-col items-center justify-center p-2 text-center transition text-[#A29E9A] relative"
          >
            <Heart className="w-5 h-5 stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span id="bottom-wishlist-badge" className="absolute top-1.5 right-2 bg-[#C9973A] text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
            <span className="text-[9px] font-medium tracking-wide mt-1 font-mono">Vault</span>
          </button>

          <button
            id="bottom-nav-account"
            onClick={() => setShowAccountModal(true)}
            className="flex flex-col items-center justify-center p-2 text-center transition text-[#A29E9A]"
          >
            <User className="w-5 h-5 stroke-[1.8]" />
            <span className="text-[9px] font-medium tracking-wide mt-1">Account</span>
          </button>

        </div>
      </div>

      {/* Floating Interactive Search Box for mobile bottom menu */}
      {showSearchBox && (
        <div id="mobile-search-prompt" className="fixed bottom-16 left-4 right-4 z-40 bg-[#FAF8F5] border border-[#C9973A]/30 p-4 rounded-2xl shadow-2xl animate-fade-in block lg:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="font-serif text-xs font-semibold text-[#2C2A29]">Explore Masterpieces</span>
            <button id="close-mob-search" onClick={() => setShowSearchBox(false)} className="text-xs text-[#A29E9A]">Close</button>
          </div>
          
          <div className="flex bg-[#F5F2EB] rounded-lg p-2 items-center">
            <Search className="w-4 h-4 text-[#A29E9A] mr-2 shrink-0" />
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Search Polki, Temple gold, choker, 22k..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSelectedCategory('All');
                  setActivePage('collections');
                  setShowSearchBox(false);
                }
              }}
              className="bg-transparent text-xs w-full text-[#2C2A29] focus:outline-none"
            />
          </div>
          <p className="text-[9px] text-[#A29E9A] mt-1.5">Press Enter to look up the full database filters</p>
        </div>
      )}

      {/* Elegant Account & Loyalty Membership Modal */}
      {showAccountModal && (
        <div id="account-loyalty-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowAccountModal(false)} />
          <div className="relative bg-[#FAF8F5] border border-[#C9973A]/30 p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-scale-up text-center">
            <div className="mx-auto w-12 h-12 bg-[#F5F2EB] rounded-full flex items-center justify-center border border-[#C9973A]/20 mb-3 text-[#C9973A]">
              <Sparkles className="w-6 h-6" />
            </div>
            
            <h3 className="font-serif font-bold text-lg text-[#2C2A29]">Svarna Royale Elite</h3>
            <p className="text-[11px] uppercase tracking-widest text-[#C9973A] font-semibold mt-0.5">Indian Heritage Loyalty Circle</p>
            
            <div className="mt-4 bg-[#1C1B19] rounded-xl p-4 text-white text-left space-y-2">
              <div className="flex justify-between text-xs border-b border-[#FAF8F5]/10 pb-2">
                <span className="text-[#A29E9A]">Membership ID:</span>
                <span className="font-mono text-[#C9973A] font-semibold">SVR-291-88</span>
              </div>
              <div className="flex justify-between text-xs border-b border-[#FAF8F5]/10 pb-2">
                <span className="text-[#A29E9A]">Loyalty Points Balance:</span>
                <span className="font-mono font-bold text-[#FAF8F5]">4,250 Coins</span>
              </div>
              <p className="text-[10px] text-[#A29E9A] leading-normal pt-1 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#C9973A] fill-[#C9973A]" /> Exclusive early previews, birthday bullion gift coins & wave-free bespoke customizing on all sets.
              </p>
            </div>

            <p className="text-[11px] text-[#A29E9A] mt-4 leading-normal">
              Logged in successfully as <br/><span className="text-[#2C2A29] font-semibold">dhyeybhavsar123@gmail.com</span>
            </p>

            <button
              id="close-account-modal-btn"
              onClick={() => setShowAccountModal(false)}
              className="mt-6 w-full bg-[#C9973A] text-white font-semibold py-2 rounded-full text-xs hover:bg-[#1C1B19] transition cursor-pointer"
            >
              Back to Showroom
            </button>
          </div>
        </div>
      )}
    </>
  );
}
