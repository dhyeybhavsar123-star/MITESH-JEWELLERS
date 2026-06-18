import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { SlidersHorizontal, Heart, Eye, ArrowUpDown, CornerDownRight, Check, Sparkles, Filter, X } from 'lucide-react';

export default function Collections() {
  const {
    activePage,
    setActivePage,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    selectedCategory,
    setSelectedCategory,
    selectedStyle,
    setSelectedStyle,
    selectedKarat,
    setSelectedKarat,
    priceRange,
    setPriceRange,
    weightRange,
    setWeightRange,
    resetFilters
  } = useShop();

  // Sorting State
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'weight-asc' | 'weight-desc'>('recommended');
  
  // Mobile Filter Drawer visibility
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter Categories Lists
  const categoriesList = ['All', 'Bridal Sets', 'Necklaces', 'Earrings', 'Bangles & Bracelets', 'Rings'];
  const stylesList = ['All', 'Temple', 'Kundan', 'Polki', 'Contemporary'];
  const karatsList = ['All', '18K', '22K'];

  // Calculate prices and filter items dynamically
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Category match
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      
      // Style match
      if (selectedStyle !== 'All' && p.style !== selectedStyle) return false;

      // Karat match
      if (selectedKarat !== 'All' && p.karat !== selectedKarat) return false;

      // Price match (approx calculated price)
      const baseRate = p.karat === '22K' ? 7015 : 5740;
      const basePrice = (p.goldWeight * baseRate * (1 + p.wastagePercent / 100)) + (p.goldWeight * p.makingChargePerGram);
      const approxPrice = basePrice * 1.03; // including GST
      if (approxPrice < priceRange[0] || approxPrice > priceRange[1]) return false;

      // Weight match
      if (p.goldWeight < weightRange[0] || p.goldWeight > weightRange[1]) return false;

      return true;
    }).sort((a, b) => {
      const getPrice = (p: typeof a) => {
        const r = p.karat === '22K' ? 7015 : 5740;
        return ((p.goldWeight * r * (1 + p.wastagePercent / 100)) + (p.goldWeight * p.makingChargePerGram)) * 1.03;
      };

      if (sortBy === 'price-asc') return getPrice(a) - getPrice(b);
      if (sortBy === 'price-desc') return getPrice(b) - getPrice(a);
      if (sortBy === 'weight-asc') return a.goldWeight - b.goldWeight;
      if (sortBy === 'weight-desc') return b.goldWeight - a.goldWeight;
      return b.rating - a.rating; // default recommended is highest rating
    });
  }, [selectedCategory, selectedStyle, selectedKarat, priceRange, weightRange, sortBy]);

  // Set selected product and open PDP
  const handleInspect = (p: any) => {
    setSelectedProduct(p);
    setActivePage('pdp');
  };

  return (
    <div id="collections-view-root" className="min-h-screen bg-[#FAF8F5] pb-20">
      
      {/* Editorial Header Banner */}
      <section id="collection-hero-banner" className="bg-[#1C1B19] text-white py-12 px-4 shadow-md border-b border-[#C9973A]/10 text-center select-none">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9973A]">Hand-Forged Grandeur</p>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#FAF8F5]">Exquisite Gold Collections</h1>
          <p className="text-[#A29E9A] text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed pt-2">
            Adorn your narratives with 18-karat and 22-karat hallmark pure golds. Filter by ancestral style, weight calibrator and billing values.
          </p>
        </div>
      </section>

      {/* Floating Active Filter Toggles and Sort Options bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white border border-[#F5F2EB] rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button toggle */}
            <button
              id="mobile-filters-trigger"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-[#FAF8F5] border border-[#C9973A]/20 px-4 py-2 rounded-full text-xs font-semibold hover:border-[#C9973A]/85 transition select-none cursor-pointer text-[#2C2A29]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C9973A]" /> Filters
            </button>

            <span className="text-xs text-[#A29E9A]">
              Showing <span className="font-semibold text-[#1C1B19]">{filteredProducts.length}</span> stunning masterpieces
            </span>
          </div>

          {/* Active Filter Pills list if filters set */}
          <div className="hidden lg:flex flex-wrap items-center gap-2 max-w-xl">
            {selectedCategory !== 'All' && (
              <span id="pill-category" className="inline-flex items-center gap-1 text-[10px] bg-[#F5F2EB] text-[#2C2A29] px-2.5 py-1 rounded-full border border-[#C9973A]/10">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="hover:text-red-500 font-extrabold pr-0.5 pointer-events-auto">×</button>
              </span>
            )}
            {selectedStyle !== 'All' && (
              <span id="pill-style" className="inline-flex items-center gap-1 text-[10px] bg-[#F5F2EB] text-[#2C2A29] px-2.5 py-1 rounded-full border border-[#C9973A]/10">
                {selectedStyle} Style
                <button onClick={() => setSelectedStyle('All')} className="hover:text-red-500 font-extrabold pr-0.5">×</button>
              </span>
            )}
            {selectedKarat !== 'All' && (
              <span id="pill-karat" className="inline-flex items-center gap-1 text-[10px] bg-[#F5F2EB] text-[#2C2A29] px-2.5 py-1 rounded-full border border-[#C9973A]/10">
                {selectedKarat} Gold
                <button onClick={() => setSelectedKarat('All')} className="hover:text-red-500 font-extrabold pr-0.5">×</button>
              </span>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 1500000) && (
              <span id="pill-price" className="inline-flex items-center gap-1 text-[10px] bg-[#F5F2EB] text-[#2C2A29] px-2.5 py-1 rounded-full border border-[#C9973A]/10">
                ₹{(priceRange[0]/1000).toFixed(0)}k - ₹{(priceRange[1]/1000).toFixed(0)}k+
                <button onClick={() => setPriceRange([0, 1500000])} className="hover:text-red-500 font-extrabold pr-0.5">×</button>
              </span>
            )}
            
            {/* Reset button */}
            {(selectedCategory !== 'All' || selectedStyle !== 'All' || selectedKarat !== 'All') && (
              <button
                id="collections-reset-all-pills"
                onClick={resetFilters}
                className="text-[10px] text-[#C9973A] hover:underline hover:text-[#1C1B19] font-bold"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sorter Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#C9973A]" />
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-[#FAF8F5] border border-[#C9973A]/10 rounded-lg text-xs py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#C9973A] cursor-pointer text-[#2C2A29]"
            >
              <option value="recommended">Best Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="weight-asc">Weight: Light to Heavy</option>
              <option value="weight-desc">Weight: Heavy to Light</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Structural Layout: Left sidebar filters & Right product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* STATIC STICKY SIDEBAR FILTER FOR DESKTOP */}
          <aside id="desktop-filters-sidebar" className="hidden lg:block bg-white border border-[#F5F2EB] rounded-2xl p-6 h-fit sticky top-28 space-y-6 shadow-xs text-left">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F2EB]">
              <h3 className="font-serif font-black text-xs text-[#1C1B19] tracking-wider uppercase flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#C9973A]" /> Filter Vault
              </h3>
              <button
                id="sidebar-clear-btn"
                onClick={resetFilters}
                className="text-[10px] font-bold text-[#C9973A] hover:text-[#1C1B19]"
              >
                Reset All
              </button>
            </div>

            {/* A. Karat Filter */}
            <div className="space-y-2">
              <label className="text-[11px] font-serif uppercase tracking-wider text-[#A29E9A] font-bold">Metal Purity (Karat)</label>
              <div className="grid grid-cols-3 gap-1.5">
                {karatsList.map((k) => (
                  <button
                    id={`sidebar-karat-${k}`}
                    key={k}
                    onClick={() => setSelectedKarat(k)}
                    className={`text-xs py-1.5 rounded-lg border text-center transition cursor-pointer select-none font-semibold ${
                      selectedKarat === k
                        ? 'bg-[#C9973A] text-white border-[#C9973A] shadow-sm'
                        : 'bg-[#FAF8F5] text-[#2C2A29] border-gray-200 hover:border-[#C9973A]'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            {/* B. Category Selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-serif uppercase tracking-wider text-[#A29E9A] font-bold">Jewellery Category</label>
              <div className="space-y-1">
                {categoriesList.map((cat) => (
                  <button
                    id={`sidebar-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-xs py-1.5 px-3 rounded-lg transition-all flex items-center justify-between cursor-pointer select-none ${
                      selectedCategory === cat
                        ? 'bg-[#C9973A]/10 text-[#C9973A] font-bold'
                        : 'text-[#2C2A29] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* C. Region Styles */}
            <div className="space-y-2">
              <label className="text-[11px] font-serif uppercase tracking-wider text-[#A29E9A] font-bold">Region & Design Style</label>
              <div className="space-y-1">
                {stylesList.map((style) => (
                  <button
                    id={`sidebar-style-${style.toLowerCase()}`}
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`w-full text-left text-xs py-1.5 px-3 rounded-lg transition-all flex items-center justify-between cursor-pointer select-none ${
                      selectedStyle === style
                        ? 'bg-[#1C1B19] text-[#FAF8F5] font-black'
                        : 'text-[#2C2A29] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>{style} {style !== 'All' ? 'Design' : ''}</span>
                    {selectedStyle === style && <Check className="w-3.5 h-3.5 text-[#C9973A]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* D. Pricing Sliders Calibration */}
            <div className="space-y-3">
              <label className="text-[11px] font-serif uppercase tracking-wider text-[#A29E9A] font-bold">Estimated Budget Limit</label>
              <div className="space-y-2">
                <input
                  id="budget-slider"
                  type="range"
                  min="5000"
                  max="1200000"
                  step="20000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#C9973A] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono font-semibold text-[#2C2A29]">
                  <span>₹0 Base</span>
                  <span>Max: ₹{priceRange[1].toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* E. Net Weight Calibrator */}
            <div className="space-y-3">
              <label className="text-[11px] font-serif uppercase tracking-wider text-[#A29E9A] font-bold">Net Gold Weight (Grams)</label>
              <div className="space-y-2">
                <input
                  id="weight-slider"
                  type="range"
                  min="2"
                  max="150"
                  step="5"
                  value={weightRange[1]}
                  onChange={(e) => setWeightRange([weightRange[0], parseFloat(e.target.value)])}
                  className="w-full accent-[#C9973A] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono font-semibold text-[#2C2A29]">
                  <span>1g Light</span>
                  <span>Max: {weightRange[1]}g Heavy</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#F5F2EB] pt-4 text-center">
              <p className="text-[10px] text-[#A29E9A] leading-normal">
                Need bespoke customizations on carat weights, size dimensions or dori beads? Consult our Bridal Boutique.
              </p>
            </div>
          </aside>

          {/* RIGHT PRODUCT GRID PART (3 columns desktop, 2 columns mobile) */}
          <main id="collections-main-grid" className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div id="no-products-fallback" className="bg-white border border-[#F5F2EB] rounded-2xl p-16 text-center shadow-xs">
                <Sparkles className="w-12 h-12 text-[#C9973A]/20 mx-auto mb-4" />
                <h4 className="font-serif text-[#1C1B19] text-xl font-bold">Zero Jewellery in these Filters</h4>
                <p className="text-xs text-[#A29E9A] mt-2 max-w-sm mx-auto">
                  Every jewelry design is unique. Please adjust your purity karat values, price estimates, weight tolerances, or style categories to preview items.
                </p>
                <button
                  id="reset-filter-fallback-btn"
                  onClick={resetFilters}
                  className="mt-6 bg-[#C9973A] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#1C1B19] transition cursor-pointer"
                >
                  Show All Masterpieces
                </button>
              </div>
            ) : (
              <div id="product-records" className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((p) => {
                  const hasSaved = wishlist.includes(p.id);
                  const rate = p.karat === '22K' ? 7015 : 5740;
                  const itemPrice = Math.round(
                    (p.goldWeight * rate * (1 + p.wastagePercent / 100)) + 
                    (p.goldWeight * p.makingChargePerGram)
                  ) * 1.03;

                  return (
                    <div
                      id={`grid-card-${p.id}`}
                      key={p.id}
                      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#F5F2EB] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-square overflow-hidden bg-[#FAF8F5]">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          onError={(e) => {
                            // High quality fallbacks if any image blocks
                            const target = e.currentTarget as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80";
                          }}
                          referrerPolicy="no-referrer"
                          onClick={() => handleInspect(p)}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 cursor-pointer"
                        />
                        
                        {/* Purity Indicator */}
                        <span className="absolute top-2 left-2 bg-[#C9973A] text-white text-[8px] font-bold py-0.5 px-2 rounded font-sans uppercase">
                          {p.karat}
                        </span>

                        {p.isNewArrival && (
                          <span className="absolute top-2 left-12 bg-emerald-600 text-white text-[8px] font-bold py-0.5 px-2 rounded font-sans uppercase">
                            New
                          </span>
                        )}

                        <button
                          id={`wish-btn-${p.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(p.id);
                          }}
                          className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[#2C2A29] p-1.5 rounded-full shadow hover:text-red-500 transition cursor-pointer"
                          title="Heart selection"
                        >
                          <Heart className={`w-4 h-4 ${hasSaved ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                        </button>
                      </div>

                      {/* Details Segment */}
                      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                        <div className="space-y-1 select-none">
                          <p className="text-[9px] text-[#A29E9A] uppercase tracking-wider font-mono">
                            {p.style} Craft • {p.goldWeight}g Gold
                          </p>
                          <h4
                            onClick={() => handleInspect(p)}
                            className="font-serif text-[#1C1B19] font-bold text-xs sm:text-sm hover:text-[#C9973A] transition cursor-pointer leading-snug line-clamp-2 min-h-[36px]"
                          >
                            {p.name}
                          </h4>
                        </div>

                        <div className="pt-2 border-t border-[#F5F2EB] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          <div>
                            <p className="text-xs font-mono font-black text-[#1C1B19]">
                              ₹{Math.round(itemPrice).toLocaleString('en-IN')}
                            </p>
                            <span className="text-[9px] text-[#A29E9A] uppercase font-mono">Transparent Bill</span>
                          </div>

                          <button
                            id={`details-inspector-${p.id}`}
                            onClick={() => handleInspect(p)}
                            className="w-full sm:w-auto bg-[#1C1B19] group-hover:bg-[#C9973A] text-white text-[9px] font-bold tracking-wider uppercase py-1.5 px-3 rounded-md text-center transition cursor-pointer"
                          >
                            Inspect Set
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* MOBILE FULL DRAWER FILTERS (Only visible when mobileFiltersOpen is true) */}
      {mobileFiltersOpen && (
        <div id="mobile-filter-drawer-backdrop" className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 max-w-xs w-4/5 bg-white flex flex-col h-full shadow-2xl p-6 overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB] mb-4">
              <span className="font-serif font-black text-sm text-[#2C2A29]">Filter Pavilion</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-[#A29E9A] hover:text-[#2C2A29]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filters Body */}
            <div className="space-y-6 text-left">
              
              <div className="space-y-2">
                <label className="text-[10px] font-serif uppercase tracking-widest text-[#A29E9A]">Purity Karat</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {karatsList.map((k) => (
                    <button
                      id={`mob-filter-karat-${k}`}
                      key={k}
                      onClick={() => { setSelectedKarat(k); }}
                      className={`text-xs py-1 px-2.5 rounded-lg border text-center font-medium ${
                        selectedKarat === k ? 'bg-[#C9973A] text-white border-[#C9973A]' : 'bg-[#FAF8F5]'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-serif uppercase tracking-widest text-[#A29E9A]">Category</label>
                <div className="space-y-1">
                  {categoriesList.map((cat) => (
                    <button
                      id={`mob-filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); }}
                      className={`w-full text-left text-xs py-1.5 px-3 rounded-lg flex items-center justify-between ${
                        selectedCategory === cat ? 'bg-[#C9973A]/10 text-[#C9973A] font-bold' : ''
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-serif uppercase tracking-widest text-[#A29E9A]">Heritage Style</label>
                <div className="space-y-1">
                  {stylesList.map((style) => (
                    <button
                      id={`mob-filter-style-${style.toLowerCase()}`}
                      key={style}
                      onClick={() => { setSelectedStyle(style); }}
                      className={`w-full text-left text-xs py-1.5 px-3 rounded-lg flex items-center justify-between ${
                        selectedStyle === style ? 'bg-[#1C1B19] text-white' : ''
                      }`}
                    >
                      <span>{style}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-serif uppercase tracking-widest text-[#A29E9A]">Max Budget</label>
                <input
                  id="mob-budget-slider"
                  type="range"
                  min="5000"
                  max="1200000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#C9973A]"
                />
                <p className="text-[11px] font-mono text-[#2C2A29] font-bold">₹{priceRange[1].toLocaleString('en-IN')}</p>
              </div>

              <button
                id="apply-mob-filters-btn"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-[#C9973A] text-white py-2.5 rounded-full text-xs font-semibold hover:bg-[#1C1B19] transition mt-6 text-center cursor-pointer"
              >
                Apply Selected filters
              </button>

              <button
                id="mob-reset-all-btn"
                onClick={() => { resetFilters(); setMobileFiltersOpen(false); }}
                className="w-full bg-gray-100 text-[#2C2A29] py-2 rounded-full text-xs transition text-center cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
