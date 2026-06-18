import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ArrowRight, Star, Heart, Sparkles, ShieldCheck, Truck, RefreshCw, CreditCard, Landmark } from 'lucide-react';

export default function Home() {
  const {
    setActivePage,
    setSelectedProduct,
    setSelectedCategory,
    toggleWishlist,
    wishlist
  } = useShop();

  // Find 3 bestsellers to display on homepage grid
  const bestsellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 3);

  // Occasions list for navigation tiles
  const occasions = [
    {
      title: 'Grand Bridal Studio',
      subtitle: 'Temple & Royal Jadau Sets',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      category: 'Bridal Sets',
      action: () => {
        setActivePage('bridal');
      }
    },
    {
      title: 'Heritage Necklaces',
      subtitle: 'Polki & Antique Statement Pieces',
      image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=800&q=80',
      category: 'Necklaces',
      action: () => {
        setSelectedCategory('Necklaces');
        setActivePage('collections');
      }
    },
    {
      title: 'Imperial Earrings',
      subtitle: 'Kundan Jhumkas & Chandeliers',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80',
      category: 'Earrings',
      action: () => {
        setSelectedCategory('Earrings');
        setActivePage('collections');
      }
    },
    {
      title: 'Daily Wear Aura',
      subtitle: 'Sleek 18K Modern Cuffs & Hoops',
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80',
      category: 'Bangles & Bracelets',
      action: () => {
        setSelectedCategory('Bangles & Bracelets');
        setActivePage('collections');
      }
    }
  ];

  return (
    <div id="homepage-root" className="bg-[#FAF8F5]">
      
      {/* 1. Full-bleed Hero Zone with Editorial Typography */}
      <section id="hero-view" className="relative h-[85vh] sm:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Full screen background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80"
            alt="Royal Heritage Indian Wedding and Festival Ceremony background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[32%] contrast-[105%] scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/35" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-[#121212]/80 opacity-70" />
        </div>

        {/* Content Box */}
        <div className="relative text-center px-4 max-w-4xl mx-auto space-y-6 select-none">
          <div className="inline-flex items-center gap-2 bg-[#C9973A]/20 border border-[#C9973A]/40 px-3 py-1 rounded-full text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9973A] animate-pulse" /> Generational Craftsmanship
          </div>

          <h1 className="font-serif text-white text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
            Auspicious Heritage.<br />
            <span className="text-[#C9973A] italic font-normal font-serif">Modern Splendor.</span>
          </h1>

          <p className="text-sm sm:text-lg text-gray-200 font-light max-w-xl mx-auto leading-relaxed">
            Hand-forged 22K certified hallmarked gold jewellery designed for royal weddings, festive celebrations, and modern boardroom wear.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="hero-explore-btn"
              onClick={() => {
                setSelectedCategory('All');
                setActivePage('collections');
              }}
              className="w-full sm:w-auto bg-[#C9973A] text-[#1C1B19] px-8 py-4 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              Explore Showroom <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-bridal-btn"
              onClick={() => setActivePage('bridal')}
              className="w-full sm:w-auto bg-transparent text-white border-2 border-white/60 hover:border-white px-8 py-4 rounded-full text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-all cursor-pointer select-none"
            >
              Consult Bridal Studio
            </button>
          </div>
        </div>

        {/* Real-time Ticker Anchor Pointer */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-[10px] uppercase text-[#A29E9A] tracking-widest font-mono">Scroll to explore</span>
          <div className="w-0.5 h-10 bg-[#C9973A] mt-2 animate-bounce" />
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section id="trust-banner" className="bg-[#1C1B19] py-8 text-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-center">
            
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 bg-[#C9973A]/10 border border-[#C9973A]/30 rounded-full flex items-center justify-center text-[#C9973A]">
                <Landmark className="w-5 h-5" />
              </div>
              <p className="text-xs font-serif font-black tracking-wider uppercase">BIS 916 Hallmark</p>
              <p className="text-[10px] text-[#A29E9A]">100% certified 22K and 18K purity gold with legal certification numbers</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 bg-[#C9973A]/10 border border-[#C9973A]/30 rounded-full flex items-center justify-center text-[#C9973A]">
                <Truck className="w-5 h-5" />
              </div>
              <p className="text-xs font-serif font-black tracking-wider uppercase">Transit Insured Shipping</p>
              <p className="text-[10px] text-[#A29E9A]">Ships in heavy mahogany wood security containers with fully-insured premium transit</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 bg-[#C9973A]/10 border border-[#C9973A]/30 rounded-full flex items-center justify-center text-[#C9973A]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <p className="text-xs font-serif font-black tracking-wider uppercase">14-Day Free Exchange</p>
              <p className="text-[10px] text-[#A29E9A]">Hassle-free sizing exchanges or buyback valuations at any national lounge</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 bg-[#C9973A]/10 border border-[#C9973A]/30 rounded-full flex items-center justify-center text-[#C9973A]">
                <CreditCard className="w-5 h-5" />
              </div>
              <p className="text-xs font-serif font-black tracking-wider uppercase">Easy Monthly EMI</p>
              <p className="text-[10px] text-[#A29E9A]">6, 12 or 24 months zero-cost financing options with credit score approval</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Occasions Grid (Bridal / Daily / Festive / Gifting) */}
      <section id="occasions-selection" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <p className="text-xs uppercase tracking-widest text-[#C9973A] font-semibold">Curation of Moments</p>
          <h2 className="font-serif text-[#1C1B19] text-3xl sm:text-4xl font-black">Shop by Royal Occasions</h2>
          <div className="w-16 h-0.5 bg-[#C9973A] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => (
            <div
              id={`occasion-tile-${occ.title.replace(/\s+/g, '-').toLowerCase()}`}
              key={occ.title}
              onClick={occ.action}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Background scaling */}
              <div className="absolute inset-0">
                <img
                  src={occ.image}
                  alt={occ.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
              </div>

              {/* Bottom text info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] tracking-[0.2em] text-[#C9973A] uppercase font-bold">{occ.subtitle}</span>
                <h3 className="font-serif text-lg font-black mt-1 text-white">{occ.title}</h3>
                <span className="text-xs flex items-center gap-1.5 text-gray-300 mt-3 group-hover:text-white transition">
                  Enter Pavilion <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Editorial Brand Story */}
      <section id="brand-story" className="bg-[#F5F2EB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            
            {/* Left Column Text details */}
            <div className="space-y-6">
              <span className="text-xs tracking-widest text-[#C9973A] uppercase font-bold block">The Legacy of Mitesh Jewellers</span>
              <h3 className="font-serif text-[#1C1B19] text-2xl sm:text-4xl font-extrabold leading-tight">
                世代相伝 — Handcrafted by Generational Karigars since 1912
              </h3>
              <p className="text-[#2C2A29] text-sm leading-relaxed font-light">
                In our workshop nestled near the marble steps of ancestral Rajasthan, master karigars treat gold as a sacred canvas. Every single design details a 100-year genealogy of repoussé sheet-work, heavy Kundan foiling, and Polki drapes. 
              </p>
              <p className="text-[#2C2A29] text-sm leading-relaxed font-light">
                We believe gold is not just an asset, but local pride, an heirloom, and the heartbeat of Indian wedding traditions. That’s why we source conflict-free metals and stand as pioneers for complete pricing transparency in the D2C space — displaying exact gold weights, market rates, and wastage margins on every piece we create.
              </p>
              
              <div className="pt-4">
                <button
                  id="story-consultation-btn"
                  onClick={() => setActivePage('bridal')}
                  className="bg-[#1C1B19] text-white hover:bg-[#C9973A] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                >
                  Our Ethical Sourcing Charter
                </button>
              </div>
            </div>

            {/* Right Column visual layout */}
            <div className="relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl relative border border-[#C9973A]/20">
                <img
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80"
                  alt="Generational craftsman forming gold filigree ornaments"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-95"
                />
              </div>
              {/* Overlay Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white border border-[#C9973A]/30 p-4 rounded-xl shadow-xl hidden sm:block max-w-xs text-left">
                <p className="font-serif text-[#1C1B19] font-black text-sm text-[#C9973A]">Certified BIS Hallmark</p>
                <p className="text-[10px] text-[#A29E9A] mt-1 leading-normal">Our boutique jewelry undergoes high-precision spectroscopy audits with legal certifications.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Bestsellers Grid */}
      <section id="bestsellers" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C9973A] font-semibold block mb-1">Most Coveted Jewels</span>
            <h2 className="font-serif text-[#1C1B19] text-3xl sm:text-4xl font-black">Bestsellling Masterpieces</h2>
          </div>
          <button
            id="view-all-bestsellers"
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('collections');
            }}
            className="text-xs tracking-wider text-[#C9973A] font-semibold hover:text-[#1C1B19] flex items-center gap-1.5 transition cursor-pointer uppercase mt-2 select-none"
          >
            View Full Showroom <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestsellers.map((product) => {
            const hasWishlisted = wishlist.includes(product.id);
            // Dynamic base pricing
            const baseRate = product.karat === '22K' ? 7015 : 5740;
            const priceVal = Math.round(
              (product.goldWeight * baseRate * (1 + product.wastagePercent / 100)) + 
              (product.goldWeight * product.makingChargePerGram)
            ) * 1.03;

            return (
              <div
                id={`product-card-${product.id}`}
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#F5F2EB] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-[#F5F2EB]/50 select-none">
                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-[#1C1B19]/80 backdrop-blur-xs text-[#C9973A] text-[9px] font-bold py-1 px-2.5 rounded-full z-10 uppercase tracking-widest">
                    Bestseller
                  </span>

                  {/* Image toggle/hover zoom */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setActivePage('pdp');
                    }}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 cursor-pointer"
                  />

                  {/* Quick Save wishlist Button */}
                  <button
                    id={`bestseller-wishlist-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#2C2A29] p-2 rounded-full shadow hover:bg-red-50 hover:text-red-500 transition cursor-pointer z-10"
                    title="Vault Piece"
                  >
                    <Heart className={`w-4.5 h-4.5 ${hasWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400 stroke-[1.8]'}`} />
                  </button>
                </div>

                {/* Info Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#FAF8F5]/30">
                  <div className="space-y-1">
                    <p className="text-[10px] text-[#C9973A] font-mono tracking-wide uppercase font-bold">
                      {product.karat} Pure Gold • {product.style} Design
                    </p>
                    <h3
                      onClick={() => {
                        setSelectedProduct(product);
                        setActivePage('pdp');
                      }}
                      className="font-serif text-[#1C1B19] font-black text-sm hover:text-[#C9973A] transition cursor-pointer leading-tight line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#A29E9A] leading-normal line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Metadata & Price row */}
                  <div className="pt-2 border-t border-[#F5F2EB] flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-[#A29E9A] uppercase tracking-widest">Weight: <span className="text-[#1C1B19] font-mono font-medium">{product.goldWeight}g</span></p>
                      <p className="text-sm font-black text-[#1C1B19] font-mono mt-0.5">
                        ₹{Math.round(priceVal).toLocaleString('en-IN')}<span className="text-[10px] text-[#A29E9A] font-light"> approx</span>
                      </p>
                    </div>

                    <button
                      id={`bestseller-view-details-${product.id}`}
                      onClick={() => {
                        setSelectedProduct(product);
                        setActivePage('pdp');
                      }}
                      className="bg-[#C9973A] hover:bg-[#1C1B19] text-white p-2 px-4 rounded-full text-[10px] font-bold tracking-wider uppercase transition cursor-pointer"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Live Testimonials */}
      <section id="reviews-testimonials" className="bg-[#FAF8F5] py-20 border-t border-[#F5F2EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-16">
            <p className="text-xs uppercase tracking-widest text-[#C9973A] font-semibold">Verified Voices of Praise</p>
            <h2 className="font-serif text-[#1C1B19] text-3xl sm:text-4xl font-extrabold">Patrons of Mitesh Jewellers</h2>
            <div className="w-16 h-0.5 bg-[#C9973A] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#F5F2EB] relative space-y-4">
              <div className="flex gap-1 text-[#C9973A]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C9973A]" />)}
              </div>
              <p className="text-xs text-[#2C2A29] leading-relaxed italic">
                "Finding jewelry with completely transparent billing is a rare pleasure in India. Mitesh Jewellers showed exact weight and taxes. The Polki Choker reached Bangalore in 3 days in an secure box with its BIS 916 certificate clear."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#FAF8F5]">
                <div className="w-9 h-9 bg-[#C9973A]/10 text-[#C9973A] font-serif font-black rounded-full flex items-center justify-center text-xs">A</div>
                <div>
                  <h4 className="font-serif text-xs font-semibold text-[#1C1B19]">Anshul Sharma</h4>
                  <p className="text-[9px] text-[#A29E9A]">Gifting Buyer • Bangalore, KA</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#F5F2EB] relative space-y-4 text-left">
              <div className="flex gap-1 text-[#C9973A]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C9973A]" />)}
              </div>
              <p className="text-xs text-[#2C2A29] leading-relaxed italic">
                "I bought the Kalyani Temple Lakshmi set for my wedding. The design team adjusted the dori threads at no cost. Handcrafted weight feels royal, and the rubies have a deep traditional shine."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#FAF8F5]">
                <div className="w-9 h-9 bg-[#C9973A]/10 text-[#C9973A] font-serif font-black rounded-full flex items-center justify-center text-xs">P</div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#1C1B19]">Prisha Nair</h4>
                  <p className="text-[9px] text-[#A29E9A]">Bridal Buyer • Kochi, KL</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#F5F2EB] relative space-y-4 text-left">
              <div className="flex gap-1 text-[#C9973A]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C9973A]" />)}
              </div>
              <p className="text-xs text-[#2C2A29] leading-relaxed italic">
                "Mitesh Jewellers has become my defacto for office rings and hoops. The sleek cuffs in 18K gold are light weight, and lock very securely. Highly recommend the virtual AR trial - it represents accurate sizes."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#FAF8F5]">
                <div className="w-9 h-9 bg-[#C9973A]/10 text-[#C9973A] font-serif font-black rounded-full flex items-center justify-center text-xs">K</div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#1C1B19]">Kasturi Banerji</h4>
                  <p className="text-[9px] text-[#A29E9A]">Verified Buyer • Kolkata, WB</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Branding section */}
      <footer className="bg-[#1C1B19] py-16 text-[#A29E9A] border-t border-[#C9973A]/15 pb-24 lg:pb-16 text-center select-none text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="font-serif text-white text-lg tracking-widest">M I T E S H  J E W E L L E R S</p>
          <p className="max-w-md mx-auto text-[11px] leading-relaxed">
            Mitesh Jewellers is registered with the Bureau of Indian Standards (BIS) under certification code HM-916. Live MCX gold feed values updated under licensed IBJA protocols.
          </p>
          <div className="w-12 h-[1px] bg-[#C9973A] mx-auto my-4" />
          <p className="text-[10px]">© 2026 Mitesh Jewellers Private Limited. All Rights Reserved. Designed for premium Indian D2C.</p>
        </div>
      </footer>

    </div>
  );
}
