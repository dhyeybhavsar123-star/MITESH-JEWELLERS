/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import GoldRateTicker from './components/GoldRateTicker';
import Header from './components/Header';
import BottomBar from './components/BottomBar';
import WhatsAppWidget from './components/WhatsAppWidget';
import ExitIntentWishlist from './components/ExitIntentWishlist';

// Pages
import Home from './pages/Home';
import Collections from './pages/Collections';
import PDP from './pages/PDP';
import BridalStudio from './pages/BridalStudio';
import Checkout from './pages/Checkout';

function ShopContent() {
  const { activePage } = useShop();

  // Dynamically load premium fonts into document head so it's gorgeous out-of-the-box
  useEffect(() => {
    // Add Playfair Display for headers and DM Sans for body
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Apply font-families globally through custom style injection
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        font-family: 'DM Sans', sans-serif !important;
        background-color: #121212 !important;
        color: #FDFBF7 !important;
      }
      h1, h2, h3, h4, .font-serif {
        font-family: 'Playfair Display', serif !important;
      }
      /* Custom fine gold marquee scroll styles */
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div id="svarna-lifestyle-application" className="min-h-screen bg-[#121212] flex flex-col justify-between font-sans subpixel-antialiased selection:bg-[#C9973A] selection:text-white text-[#FDFBF7]">
      
      <div>
        {/* Sticky Global Live Gold Rate Header ticker */}
        <GoldRateTicker />

        {/* Brand Luxury Navigation Header */}
        <Header />

        {/* Dynamic Multi-Page Router View */}
        <main id="primary-showroom-view">
          {activePage === 'home' && <Home />}
          {activePage === 'collections' && <Collections />}
          {activePage === 'pdp' && <PDP />}
          {activePage === 'bridal' && <BridalStudio />}
          {activePage === 'checkout' && <Checkout />}
        </main>
      </div>

      {/* Floating Patron Incentives & WhatsApp Widget help Desk */}
      <WhatsAppWidget />
      <ExitIntentWishlist />

      {/* Mobile focused responsive bottom-nav bar anchor */}
      <BottomBar />

    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <ShopContent />
    </ShopProvider>
  );
}
