import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, INSTALLED_PINCODES } from '../data/products';
import { Star, ShieldCheck, Heart, Truck, RefreshCw, Layers, Calendar, HelpCircle, Sparkles, Check, ChevronDown, Award } from 'lucide-react';
import ARTryOnModal from '../components/ARTryOnModal';

export default function PDP() {
  const {
    selectedProduct,
    setSelectedProduct,
    goldRates,
    addToCart,
    wishlist,
    toggleWishlist,
    setActivePage
  } = useShop();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [emiDuration, setEmiDuration] = useState<6 | 12 | 24>(12);
  const [arOpen, setArOpen] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  
  // 360 Degree spin simulation state
  const [is360Mode, setIs360Mode] = useState(false);
  const [spinIndex, setSpinIndex] = useState(0);

  // Set default size if sizes present
  useEffect(() => {
    if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
      setSelectedSize(selectedProduct.sizes[0]);
    } else {
      setSelectedSize('');
    }
    setActiveImageIdx(0);
    setIs360Mode(false);
  }, [selectedProduct]);

  // Handle 360 rotating angles simulation effect
  useEffect(() => {
    let timer: any;
    if (is360Mode) {
      timer = setInterval(() => {
        setSpinIndex((prev) => (prev + 1) % 4);
      }, 700);
    }
    return () => clearInterval(timer);
  }, [is360Mode]);

  // Transparent interactive rates breakdown calculation
  const karatRate = selectedProduct.karat === '22K' ? goldRates['22K'] : goldRates['18K'];
  const baseRawGoldVal = selectedProduct.goldWeight * karatRate;
  const wastageMultiplier = 1 + (selectedProduct.wastagePercent / 100);
  const goldCostWithWastage = Math.round(baseRawGoldVal * wastageMultiplier);
  const makingChargesVal = Math.round(selectedProduct.makingChargePerGram * selectedProduct.goldWeight);
  
  const subtotalCost = goldCostWithWastage + makingChargesVal;
  const gstCharges = Math.round(subtotalCost * 0.03); // standard 3% GST on jewelry
  const totalCalulatedPrice = subtotalCost + gstCharges;

  // EMI calculation
  const calculatedEmiMonthly = Math.round(totalCalulatedPrice / emiDuration);

  // Pincode Delivery Estimator
  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (cleanPin.length !== 6 || isNaN(Number(cleanPin))) {
      setPincodeStatus({ success: false, message: 'Please enter a valid 6-digit Indian Pincode.' });
      return;
    }

    const matched = INSTALLED_PINCODES[cleanPin];
    if (matched) {
      setPincodeStatus({
        success: true,
        message: `Insured delivery guaranteed in ${matched.days} ${matched.days === 1 ? 'day' : 'days'}! Cash on Delivery (COD) is ${matched.cod ? 'Fully Supported' : 'Unavailable'}.`
      });
    } else {
      setPincodeStatus({
        success: true,
        message: 'Delivery region supported! Fully insured standard transit estimated in 4 to 5 working days.'
      });
    }
  };

  // Find related products matching either style or category, omitting current
  const related = PRODUCTS.filter(p => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.style === selectedProduct.style)).slice(0, 3);

  const isInWishlist = wishlist.includes(selectedProduct.id);

  return (
    <div id="pdp-root" className="bg-[#FAF8F5] pb-24 text-left">
      
      {/* PDP Content layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Breadcrumbs */}
        <div id="breadcrumbs" className="text-xs text-[#A29E9A] uppercase tracking-wider mb-6 flex items-center gap-1">
          <span className="hover:text-[#1C1B19] cursor-pointer" onClick={() => setActivePage('home')}>Svarna</span>
          <span>/</span>
          <span className="hover:text-[#1C1B19] cursor-pointer" onClick={() => setActivePage('collections')}>Collections</span>
          <span>/</span>
          <span className="text-[#C9973A] font-bold">{selectedProduct.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT CHUNKS: Gallery + 360 Spin Visualizer */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-[#FAF8F5] border border-[#F5F2EB] rounded-3xl overflow-hidden shadow-sm flex items-center justify-center select-none group">
              
              {is360Mode ? (
                <div className="w-full h-full relative">
                  <img
                    src={selectedProduct.images[spinIndex]}
                    alt={`${selectedProduct.name} - 360 angle ${spinIndex + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#C9973A] text-[#1C1B19] text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Live 360° Sandbox Auto-Spinning
                  </div>
                </div>
              ) : (
                <img
                  src={selectedProduct.images[activeImageIdx]}
                  alt={`${selectedProduct.name} main showcase`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              )}

              {/* Badges Overlay */}
              {!is360Mode && (
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-[#1C1B19] text-white text-[9px] font-black uppercase tracking-widest py-1 px-3 rounded-full shadow-md flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#C9973A] fill-[#C9973A]" /> BIS 916 Hallmark Checked
                  </span>
                  {selectedProduct.isBestseller && (
                    <span className="bg-[#C9973A]/90 text-[#1C1B19] text-[9.5px] font-black uppercase tracking-wider py-1 px-3 rounded-full shadow-md">
                      Patron Pick
                    </span>
                  )}
                </div>
              )}

              {/* 360 Mode Trigger Button */}
              <button
                id="toggle-360-btn"
                onClick={() => setIs360Mode(!is360Mode)}
                className="absolute bottom-4 right-4 bg-white/95 border border-[#C9973A]/30 text-[#1C1B19] hover:bg-[#1C1B19] hover:text-[#FAF8F5] px-4 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition shadow-lg flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> {is360Mode ? 'Stop 360°' : 'Rotate 360°'}
              </button>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-4 gap-3">
              {selectedProduct.images.map((img, idx) => (
                <button
                  id={`pdp-thumb-${idx}`}
                  key={idx}
                  onClick={() => {
                    setIs360Mode(false);
                    setActiveImageIdx(idx);
                  }}
                  className={`aspect-square rounded-xl overflow-hidden border transition bg-white ${
                    activeImageIdx === idx && !is360Mode
                      ? 'border-[#C9973A] ring-2 ring-[#C9973A]/20 scale-102'
                      : 'border-[#F5F2EB] hover:border-[#C9973A]/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${selectedProduct.name} thumb ${idx}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover shrink-0"
                  />
                </button>
              ))}
            </div>

            {/* Virtual AR Try-On Promotional Widget */}
            <div className="box bg-[#F5F2EB]/50 border-2 border-dashed border-[#C9973A]/30 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#C9973A] bg-white px-2 py-0.5 rounded border border-[#C9973A]/10">SV-AR Camera</span>
                  <span className="text-[10px] text-emerald-600 animate-pulse font-bold">• Active Studio</span>
                </div>
                <h4 className="font-serif text-[#1C1B19] text-sm font-black">Interactive Gold AR Simulator</h4>
                <p className="text-[11px] text-[#A29E9A]">
                  Enable your notebook or mobile front camera. Drag, rotate and position this jewelry piece in real-time onto your neck.
                </p>
              </div>

              <button
                id="ar-launch-pdp-btn"
                onClick={() => setArOpen(true)}
                className="w-full sm:w-auto bg-[#1C1B19] text-[#FAF8F5] hover:bg-[#C9973A] px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition cursor-pointer select-none shrink-0"
              >
                Start AR Try-on Now
              </button>
            </div>
          </div>

          {/* RIGHT CHUNKS: Product Specs, Live Price Calculator & EMI */}
          <div className="space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 uppercase font-mono text-[10px] font-bold text-[#C9973A]">
                <span>{selectedProduct.style} Heritage Series</span>
                <span>•</span>
                <span>BIS Registered Purity Check</span>
              </div>
              
              <h1 className="font-serif text-[#1C1B19] text-2xl sm:text-4xl font-extrabold leading-tight">
                {selectedProduct.name}
              </h1>

              <div className="flex items-center gap-2 pt-1">
                <div className="flex gap-0.5 text-[#C9973A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9973A]" />
                  ))}
                </div>
                <span className="text-[#2C2A29] text-xs font-semibold">
                  {selectedProduct.rating} / 5
                </span>
                <span className="text-[#A29E9A] text-xs">
                  ({selectedProduct.reviewsCount} verified royal reviews)
                </span>
              </div>
            </div>

            {/* Spec tags bar */}
            <div className="flex flex-wrap gap-2.5">
              <span className="bg-white border select-none border-gray-200 text-[#2C2A29] text-[11px] px-3.5 py-1 rounded-full font-mono">
                Metal: <span className="font-bold text-[#C9973A]">{selectedProduct.karat} Gold</span>
              </span>
              <span className="bg-white border border-gray-200 text-[#2C2A29] text-[11px] px-3.5 py-1 rounded-full font-mono">
                Net Weight: <span className="font-bold text-[#1C1B19]">{selectedProduct.goldWeight}g</span>
              </span>
              <span className="bg-white border border-gray-200 text-[#2C2A29] text-[11px] px-3.5 py-1 rounded-full font-mono">
                Wastage: <span className="font-bold text-[#1C1B19]">{selectedProduct.wastagePercent}%</span>
              </span>
            </div>

            <p className="text-xs text-[#2C2A29] leading-relaxed font-light">
              {selectedProduct.description}
            </p>

            {/* TRANSPARENT BILL BREAKDOWN INTERACTIVE CALCULATOR */}
            <div className="bg-white border border-[#C9973A]/20 rounded-2xl p-5 shadow-xs text-left">
              <div className="flex items-center justify-between pb-3 border-b border-[#F5F2EB]">
                <h3 className="font-serif font-black text-xs text-[#1C1B19] tracking-wider uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Transparent Pricing Bill
                </h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2.5 py-0.5 rounded border border-emerald-100 uppercase">
                  MCX Live Rate Feed
                </span>
              </div>

              {/* Bill Details */}
              <div className="space-y-2 mt-4 text-xs">
                
                <div className="flex justify-between text-[#A29E9A]">
                  <span>Raw {selectedProduct.karat} Gold Cost ({selectedProduct.goldWeight}g × ₹{karatRate}/g)</span>
                  <span className="font-mono text-[#2C2A29] font-medium">₹{baseRawGoldVal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-[#A29E9A]">
                  <span>Gold wastage ({selectedProduct.wastagePercent}% of raw value)</span>
                  <span className="font-mono text-[#2C2A29] font-medium">₹{Math.round(baseRawGoldVal * (selectedProduct.wastagePercent/100)).toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-[#A29E9A]">
                  <span>Professional Making Charges (₹{selectedProduct.makingChargePerGram}/g)</span>
                  <span className="font-mono text-[#2C2A29] font-medium">₹{makingChargesVal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-[#A29E9A] border-t border-[#FAF8F5] pt-2">
                  <span>Subtotal Value</span>
                  <span className="font-mono text-[#2C2A29] font-bold">₹{subtotalCost.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-[#A29E9A]">
                  <span>Value Added Tax (3% standard GST on Jewels)</span>
                  <span className="font-mono text-[#2C2A29] font-medium">₹{gstCharges.toLocaleString('en-IN')}</span>
                </div>

                {/* Final calculated total */}
                <div className="flex justify-between text-sm pt-3 border-t border-[#FAF8F5] items-baseline font-black">
                  <span className="font-serif text-[#1C1B19]">Total Transparent Pricing:</span>
                  <div className="text-right">
                    <span className="font-mono text-[#C9973A] text-lg">
                      ₹{totalCalulatedPrice.toLocaleString('en-IN')}
                    </span>
                    <p className="text-[8px] text-[#A29E9A] font-light leading-none mt-0.5">All taxes inclusive. Ships with certification.</p>
                  </div>
                </div>

              </div>

              {/* Hallmark verification cert block */}
              <div className="mt-4 bg-[#FAF8F5] p-3 rounded-xl flex items-center gap-3.5 border border-[#FAF8F5]">
                <div className="w-10 h-10 bg-[#C9973A]/10 text-[#C9973A] rounded-full flex items-center justify-center shrink-0">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#1C1B19] uppercase tracking-wider">BIS Hallmarking License Cert</p>
                  <p className="text-[10px] text-gray-500">Cert License Registry: <span className="font-mono font-bold text-[#C9973A] select-all">{selectedProduct.certificationNo}</span></p>
                </div>
              </div>
            </div>

            {/* SIZING OPTION ZONE IF EXISTS */}
            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider">Select Inner Diameter / Size</label>
                  <button
                    id="size-guide-modal-btn"
                    onClick={() => setShowSizeGuide(true)}
                    className="text-[10px] text-[#C9973A] hover:underline hover:text-[#1C1B19] font-semibold uppercase"
                  >
                    Size Guide Guide
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((sz) => (
                    <button
                      id={`size-${sz.replace(/\s+/g, '-').toLowerCase()}`}
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`text-xs py-2 px-4 rounded-xl border text-center font-semibold transition cursor-pointer select-none ${
                        selectedSize === sz
                          ? 'border-[#C9973A] bg-[#C9973A]/10 text-[#C9973A] scale-102'
                          : 'border-gray-200 bg-white hover:border-[#C9973A]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ADD TO TREASURE BAG ACTION CTA FOR PDP */}
            <div className="flex gap-3">
              <button
                id="add-to-cart-cta-pdp"
                onClick={() => {
                  addToCart(selectedProduct, 1, selectedSize || undefined);
                  alert(`Auspicious piece "${selectedProduct.name}" successfully added to your gold bag!`);
                }}
                className="flex-1 bg-[#1C1B19] text-[#FAF8F5] py-4 rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#C9973A] transition flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                Secure Purchase & Add to Bag
              </button>

              <button
                id="wishlist-btn-pdp"
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="bg-white border border-[#C9973A]/30 text-[#2C2A29] p-3.5 rounded-full hover:bg-red-50 hover:text-red-500 transition cursor-pointer"
                title="Save piece"
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400 stroke-[1.8]'}`} />
              </button>
            </div>

            {/* INTERACTIVE EMI CALCULATOR */}
            <div className="bg-[#FAF8F5] border border-[#F5F2EB] rounded-2xl p-4 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-black uppercase text-[#1C1B19]">Easy gold loan & Financing</span>
                <span className="text-[10px] text-[#C9973A] font-bold">0% Interest Schemes Available</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <select
                    id="emi-duration-selector"
                    value={emiDuration}
                    onChange={(e: any) => setEmiDuration(parseInt(e.target.value) as any)}
                    className="bg-white border border-[#C9973A]/20 text-xs px-3 py-2 rounded-xl focus:outline-none cursor-pointer text-[#2C2A29]"
                  >
                    <option value="6">6 Months Term</option>
                    <option value="12">12 Months Term</option>
                    <option value="24">24 Months Term</option>
                  </select>
                </div>

                <p className="text-xs text-[#2C2A29]">
                  Own this masterpiece from only <span className="font-mono text-[#C9973A] font-black">₹{calculatedEmiMonthly.toLocaleString('en-IN')}/month</span> with authorized banking channels of ICICI, HDFC, or Razorpay BNPL.
                </p>
              </div>
            </div>

            {/* PINCODE-BASED SECURITY TRANSIT ESTIMATOR */}
            <div className="bg-white border border-[#F5F2EB] p-4 rounded-2xl">
              <form onSubmit={handlePincodeCheck} className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#A29E9A] block text-left">Check Insured Shipping Estimate</label>
                <div className="flex gap-2">
                  <input
                    id="shipping-pincode-input"
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode (e.g., 400001)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="bg-[#FAF8F5] border border-gray-200 text-xs px-3 py-2.5 rounded-xl text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C9973A] w-full"
                  />
                  <button
                    id="check-pincode-btn"
                    type="submit"
                    className="bg-[#1C1B19] hover:bg-[#C9973A] text-white text-xs font-semibold px-5 rounded-xl transition cursor-pointer select-none"
                  >
                    Calculate Verify
                  </button>
                </div>
              </form>

              {pincodeStatus && (
                <p className={`text-[11px] leading-normal pt-2.5 ${pincodeStatus.success ? 'text-emerald-700 font-medium' : 'text-rose-600'}`}>
                  {pincodeStatus.success ? '✓ ' : '× '}{pincodeStatus.message}
                </p>
              )}
            </div>

          </div>

        </div>

        {/* REVIEWS SEGMENT ON INDIAN SKIN TONES */}
        <section id="pdp-reviews-zone" className="mt-20 pt-12 border-t border-[#F5F2EB]">
          <h3 className="font-serif font-black text-[#1C1B19] text-xl sm:text-2xl mb-8 text-center sm:text-left">
            Patron reviews & Skin Tone photographs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selectedProduct.reviews.map((r) => (
              <div id={`pdp-review-${r.id}`} key={r.id} className="bg-white p-5 rounded-2xl border border-[#F5F2EB] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#FAF8F5]">
                  <div className="flex gap-1 text-[#C9973A]">
                    {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4.5 h-4.5 fill-[#C9973A] text-[#C9973A]" />)}
                  </div>
                  <span className="text-[10px] text-[#A29E9A] font-mono">{r.date}</span>
                </div>

                <p className="text-xs text-[#2C2A29] leading-relaxed italic">
                  "{r.comment}"
                </p>

                {r.skinToneDescription && (
                  <div className="bg-[#F5F2EB]/50 p-2.5 rounded-lg border border-[#F5F2EB] text-[10px] text-gray-600">
                    💅 <span className="font-bold text-[#1C1B19]">Skin Tone/Outfit Context:</span> {r.skinToneDescription}
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 bg-[#C9973A]/20 text-[#C9973A] rounded-full flex items-center justify-center font-bold text-xs">
                    {r.userName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1C1B19]">{r.userName}</h5>
                    <p className="text-[9px] text-[#A29E9A]">{r.userType} • {r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED CAROUSEL GRID */}
        {related.length > 0 && (
          <section id="pdp-related-gallery" className="mt-20">
            <h3 className="font-serif font-black text-[#1C1B19] text-lg sm:text-2xl mb-6 text-center sm:text-left">
              Complementary Legacy Pieces
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((item) => {
                const itemRate = item.karat === '22K' ? 7015 : 5740;
                const price = Math.round(
                  (item.goldWeight * itemRate * (1 + item.wastagePercent / 100)) + 
                  (item.goldWeight * item.makingChargePerGram)
                ) * 1.03;

                return (
                  <div
                    id={`pdp-related-card-${item.id}`}
                    key={item.id}
                    onClick={() => {
                      setSelectedProduct(item);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white rounded-xl overflow-hidden border border-[#F5F2EB] p-3.5 hover:shadow-lg transition cursor-pointer"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-square object-cover rounded-md mb-3 border border-[#C9973A]/10"
                    />
                    <p className="text-[8px] uppercase tracking-wider font-mono text-[#C9973A]">{item.karat} • {item.goldWeight}g • {item.style}</p>
                    <h4 className="font-serif font-black text-xs text-[#2C2A29] line-clamp-1 mt-1 hover:text-[#C9973A]">{item.name}</h4>
                    <p className="text-xs font-mono font-bold text-[#1C1B19] mt-2">₹{Math.round(price).toLocaleString('en-IN')}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </div>

      {/* STICKY ADD TO CART MOBILE FLOATING BOTTOM PANEL WRAPPER (For ultimate conversions on mobile scroll) */}
      <div id="mobile-pdp-sticky-drawer" className="fixed bottom-14 left-0 right-0 z-30 bg-white border-t border-[#C9973A]/20 p-3 shadow-2xl block lg:hidden">
        <div className="flex items-center justify-between max-w-md mx-auto gap-3">
          <div className="select-none text-left">
            <p className="text-[9px] text-gray-400 leading-none">Price ({selectedProduct.goldWeight}g):</p>
            <p className="text-sm font-mono font-bold text-[#C9973A] leading-tight">
              ₹{totalCalulatedPrice.toLocaleString('en-IN')}
            </p>
            <span className="text-[8px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">Hallmarked</span>
          </div>

          <button
            id="mobile-sticky-pdp-add-btn"
            onClick={() => {
              addToCart(selectedProduct, 1, selectedSize || undefined);
              alert(`Piece "${selectedProduct.name}" added successfully to your gold bag!`);
            }}
            className="flex-1 bg-[#1C1B19] text-[#FAF8F5] py-3.5 px-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-[#C9973A] transition cursor-pointer text-center text-[10px]"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* SIZING GUIDE DIALOG BOX */}
      {showSizeGuide && (
        <div id="size-guide-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowSizeGuide(false)} />
          <div className="relative bg-[#FAF8F5] border border-[#C9973A]/30 p-6 rounded-2xl shadow-2xl max-w-sm w-full text-left">
            <h3 className="font-serif font-bold text-base text-[#1C1B19] tracking-wider uppercase border-b border-[#F5F2EB] pb-2">
              Svarna Sizing Standards
            </h3>
            
            <p className="text-xs text-[#A29E9A] leading-relaxed mt-3">
              We align our size diameters to standards verified under the Bureau of Indian Standards guidance benchmarks:
            </p>

            <div className="my-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-[#FAF8F5] pb-1">
                <span className="text-[#2C2A29] font-medium">Bangle size 2.4</span>
                <span className="text-gray-500">2.25 inch / 57.2mm Dia</span>
              </div>
              <div className="flex justify-between border-b border-[#FAF8F5] pb-1">
                <span className="text-[#2C2A29] font-medium">Bangle size 2.6</span>
                <span className="text-gray-500">2.37 inch / 60.3mm Dia</span>
              </div>
              <div className="flex justify-between border-b border-[#FAF8F5] pb-1">
                <span className="text-[#2C2A29] font-medium">Bangle size 2.8</span>
                <span className="text-gray-500">2.50 inch / 63.5mm Dia</span>
              </div>
              <div className="flex justify-between border-b border-[#FAF8F5] pb-1">
                <span className="text-[#2C2A29] font-medium">Ring size 11</span>
                <span className="text-gray-500">16.2mm Dia</span>
              </div>
              <div className="flex justify-between border-b border-[#FAF8F5] pb-1">
                <span className="text-[#2C2A29] font-medium">Ring size 13</span>
                <span className="text-gray-500">16.8mm Dia</span>
              </div>
            </div>

            <p className="text-[10px] text-[#A29E9A]">
              We offer free home trial sizing kits inside metropolitan regions. Reach our concierge above to book.
            </p>

            <button
              id="close-size-guide-btn"
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 w-full bg-[#1C1B19] text-white py-2 rounded-full text-xs font-semibold hover:bg-[#C9973A] transition cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

      {/* AR Live Simulation Modal wrapper */}
      {arOpen && (
        <ARTryOnModal
          product={selectedProduct}
          onClose={() => setArOpen(false)}
        />
      )}

    </div>
  );
}
