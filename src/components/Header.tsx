import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Search, Menu, X, Landmark, PhoneCall, Gift, Check, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function Header() {
  const {
    activePage,
    setActivePage,
    cart,
    wishlist,
    removeFromCart,
    updateCartQty,
    setSelectedProduct,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    toggleWishlist
  } = useShop();

  const [searchFocused, setSearchFocused] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Total calculation
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemsCount = wishlist.length;

  // Filter items matching search
  const searchedProducts = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleProductSelect = (p: any) => {
    setSelectedProduct(p);
    setActivePage('pdp');
    setSearchQuery('');
    setSearchFocused(false);
  };

  const navLinks = [
    { label: 'Royal Bridal Studio', page: 'bridal' as const },
    { label: 'Exquisite Collections', page: 'collections' as const },
    { label: 'Legacy Story', page: 'home' as const, scrollAnchor: 'brand-story' },
  ];

  return (
    <>
      <header id="main-heritage-header" className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#FAF8F5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Desktop Brand Menu */}
            <nav id="desktop-main-navigation" className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  id={`nav-link-${link.page}`}
                  key={link.label}
                  onClick={() => {
                    setActivePage(link.page);
                    if (link.scrollAnchor) {
                      setTimeout(() => {
                        const el = document.getElementById(link.scrollAnchor!);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                  className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors hover:text-[#C9973A] cursor-pointer ${
                    activePage === link.page && !link.scrollAnchor
                      ? 'text-[#C9973A] border-b border-[#C9973A] pb-0.5'
                      : 'text-[#2C2A29]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Trigger */}
            <div className="flex lg:hidden">
              <button
                id="toggle-mobile-menu"
                onClick={() => setMobileMenuOpen(true)}
                className="text-[#2C2A29] hover:text-[#C9973A] p-2"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Center Brand Identity */}
            <div className="text-center flex flex-col items-center select-none cursor-pointer" onClick={() => setActivePage('home')}>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-[#C9973A] text-xl font-bold tracking-widest sm:text-2xl">
                  M I T E S H
                </span>
              </div>
              <span className="text-[8px] sm:text-[9px] tracking-[0.4em] text-[#A29E9A] uppercase font-light mt-0.5">
                J E W E L L E R S
              </span>
            </div>

            {/* Right Quick Controls */}
            <div id="header-quick-controls" className="flex items-center gap-3 sm:gap-5">
              
              {/* Intelligent Search Input bar */}
              <div className="relative hidden md:block">
                <div className="flex items-center bg-[#F5F2EB] px-3 py-1.5 rounded-full border border-transparent focus-within:border-[#C9973A]/30 w-48 lg:w-64 transition-all duration-300">
                  <Search className="w-4 h-4 text-[#A29E9A] mr-2" />
                  <input
                    id="desktop-search-input"
                    type="text"
                    placeholder="Search Polki, Kundan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    className="bg-transparent text-xs text-[#2C2A29] focus:outline-none w-full placeholder-[#A29E9A] font-light"
                  />
                  {searchQuery && (
                    <button id="clear-search-query" onClick={() => setSearchQuery('')} className="text-[#A29E9A] hover:text-[#2C2A29] p-0.5">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Search suggestion drop-down Panel */}
                {searchFocused && (
                  <div id="search-suggestion-dropdown" className="absolute right-0 mt-2 bg-[#FAF8F5] border border-[#C9973A]/20 shadow-2xl rounded-xl w-80 p-4 z-50 text-left max-h-[400px] overflow-y-auto">
                    <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#F5F2EB]">
                      <span className="text-[10px] uppercase tracking-wider text-[#A29E9A] font-semibold">Search Suggestions</span>
                      <button id="close-search-focused" onClick={() => setSearchFocused(false)} className="text-[#A29E9A] hover:text-[#2C2A29] text-xs">
                        Done
                      </button>
                    </div>
                    {searchQuery.trim() === '' ? (
                      <div className="space-y-2">
                        <p className="text-[11px] text-[#A29E9A]">Trending searches:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {['Polki Choker', 'Lakshmi Pendant', 'Contemporary Studs', '22K Kada'].map(t => (
                            <button
                              id={`trending-tag-${t.replace(/\s+/g, '-').toLowerCase()}`}
                              key={t}
                              onMouseDown={() => {
                                setSearchQuery(t);
                                setSelectedCategory('All');
                                setActivePage('collections');
                              }}
                              className="text-[11px] bg-[#F5F2EB] text-[#2C2A29] hover:bg-[#C9973A] hover:text-white px-2.5 py-1 rounded-full transition"
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : searchedProducts.length > 0 ? (
                      <div className="space-y-3">
                        {searchedProducts.map(p => (
                          <div
                            id={`search-item-${p.id}`}
                            key={p.id}
                            onMouseDown={() => handleProductSelect(p)}
                            className="flex items-center gap-3 cursor-pointer p-1.5 hover:bg-[#F5F2EB] rounded-lg transition"
                          >
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-cover rounded border border-[#C9973A]/10"
                            />
                            <div>
                              <p className="text-xs font-serif text-[#2C2A29] font-medium leading-tight truncate max-w-[190px]">{p.name}</p>
                              <p className="text-[10px] text-[#C9973A] font-mono mt-0.5">{p.karat} • {p.goldWeight}g • {p.style}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#A29E9A] py-2 text-center">No luxury pieces match "{searchQuery}"</p>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                id="header-wishlist-toggle"
                onClick={() => setWishlistOpen(true)}
                className="relative text-[#2C2A29] hover:text-[#C9973A] p-2 transition-colors cursor-pointer"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistItemsCount > 0 && (
                  <span id="wishlist-badge" className="absolute -top-1 -right-1 bg-[#C9973A] text-[#FAF8F5] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistItemsCount}
                  </span>
                )}
              </button>

              {/* Shopping Cart Button */}
              <button
                id="header-cart-toggle"
                onClick={() => setCartOpen(true)}
                className="relative text-[#2C2A29] hover:text-[#C9973A] p-2 transition-colors cursor-pointer"
                title="Cart Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {totalItems > 0 && (
                  <span id="cart-badge" className="absolute -top-1 -right-1 bg-[#1C1B19] text-[#C9973A] border border-[#C9973A] text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-black animate-bounce-slow">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Cart Drawer Overlay */}
      {cartOpen && (
        <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={() => setCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div id="main-cart-drawer" className="w-screen max-w-sm sm:max-w-md bg-[#FAF8F5] flex flex-col shadow-2xl border-l border-[#C9973A]/20">
              
              <div className="px-6 py-5 border-b border-[#F5F2EB] flex items-center justify-between bg-[#1C1B19] text-[#FAF8F5]">
                <h2 className="text-base text-white tracking-widest uppercase font-serif flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C9973A]" /> Your Treasure Bag
                </h2>
                <button id="close-cart-drawer" onClick={() => setCartOpen(false)} className="text-[#A29E9A] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag className="w-12 h-12 text-[#A29E9A]/20 mx-auto mb-4 stroke-[1]" />
                    <p className="font-serif text-[#2C2A29] font-medium text-lg">Your bag is empty</p>
                    <p className="text-xs text-[#A29E9A] mt-2 max-w-xs mx-auto">Discover our curated collection of hallmark gold, Polki, & heritage bridal sets to fill it with splendor.</p>
                    <button
                      id="cart-shop-now-btn"
                      onClick={() => {
                        setCartOpen(false);
                        setSelectedCategory('All');
                        setActivePage('collections');
                      }}
                      className="mt-6 inline-flex items-center gap-2 bg-[#C9973A] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#E2B755] transition cursor-pointer"
                    >
                      Shop Masterpieces <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    // Quick rate calculator
                    const baseRate = PRODUCTS.find(p => p.id === item.product.id) ? (item.product.karat === '22K' ? 7015 : 5740) : 7000;
                    const baseCost = item.product.goldWeight * baseRate;
                    const makingCost = item.product.goldWeight * item.product.makingChargePerGram;
                    const wastageMultiplier = 1 + (item.product.wastagePercent / 100);
                    const withWastageAndMaking = (baseCost * wastageMultiplier) + makingCost;
                    const gstVal = withWastageAndMaking * 0.03; // 3% standard GST on precious jewelry in India
                    const calculatedUnitPrice = Math.round(withWastageAndMaking + gstVal);

                    return (
                      <div id={`cart-row-${item.product.id}`} key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 p-3 bg-white rounded-xl border border-[#F5F2EB] shadow-xs hover:shadow-md transition">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover rounded-lg border border-[#C9973A]/10 shrink-0 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(item.product);
                            setActivePage('pdp');
                            setCartOpen(false);
                          }}
                        />
                        <div className="flex-1 select-none">
                          <h4 className="text-xs font-serif font-semibold text-[#2C2A29] leading-tight line-clamp-1 hover:text-[#C9973A] cursor-pointer" onClick={() => {
                            setSelectedProduct(item.product);
                            setActivePage('pdp');
                            setCartOpen(false);
                          }}>
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-[#A29E9A] mt-0.5">
                            {item.product.karat} • {item.product.goldWeight}g {item.selectedSize ? `• Size ${item.selectedSize}` : ''}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Editor */}
                            <div className="flex items-center border border-[#F5F2EB] rounded-full px-2 py-0.5 bg-[#FAF8F5]">
                              <button
                                id={`cart-qty-dec-${item.product.id}`}
                                onClick={() => updateCartQty(item.product.id, item.quantity - 1, item.selectedSize)}
                                className="text-[#A29E9A] hover:text-[#2C2A29] px-1 font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-semibold text-[#2C2A29] text-center min-w-[16px]">
                                {item.quantity}
                              </span>
                              <button
                                id={`cart-qty-inc-${item.product.id}`}
                                onClick={() => updateCartQty(item.product.id, item.quantity + 1, item.selectedSize)}
                                className="text-[#A29E9A] hover:text-[#2C2A29] px-1 font-bold text-xs"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs font-mono font-bold text-[#1C1B19]">
                              ₹{(calculatedUnitPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Subtotal breakdown */}
              {cart.length > 0 && (
                <div className="border-t border-[#F5F2EB] bg-white p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#2C2A29]">
                    <span className="flex items-center gap-1"><Landmark className="w-3.5 h-3.5 text-[#C9973A]" /> BIS Hallmark Purity Standard</span>
                    <span className="font-semibold text-emerald-600">Guaranteed 100% Secure</span>
                  </div>
                  
                  <div className="space-y-1.5 border-b border-[#FAF8F5] pb-3 text-xs">
                    <div className="flex justify-between text-[#A29E9A]">
                      <span>In-Box Premium Insured Box</span>
                      <span className="text-[#2C2A29]">Included (Free)</span>
                    </div>
                    <div className="flex justify-between text-[#A29E9A]">
                      <span>Insured Transit (India-wide)</span>
                      <span className="text-[#2C2A29] font-mono">Free</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-serif text-[#2C2A29] font-medium">Estimated Total:</span>
                    <span className="text-lg font-mono font-black text-[#C9973A]">
                      ₹{cart.reduce((sum, item) => {
                        const baseRate = item.product.karat === '22K' ? 7015 : 5740;
                        const baseCost = item.product.goldWeight * baseRate;
                        const makingCost = item.product.goldWeight * item.product.makingChargePerGram;
                        const withWastageAndMaking = (baseCost * (1 + item.product.wastagePercent / 100)) + makingCost;
                        const calculatedUnitPrice = Math.round(withWastageAndMaking * 1.03);
                        return sum + (calculatedUnitPrice * item.quantity);
                      }, 0).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    id="checkout-bag-btn"
                    onClick={() => {
                      setCartOpen(false);
                      setActivePage('checkout');
                    }}
                    className="w-full bg-[#1C1B19] text-[#FAF8F5] py-3.5 rounded-full text-xs font-semibold tracking-wider hover:bg-[#C9973A] transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Secure Checkout <ArrowRight className="w-4 h-4 text-[#C9973A]" />
                  </button>
                  <p className="text-[10px] text-[#A29E9A] text-center leading-normal">
                    By clicking checkout you agree to the transparent raw material breakdown, GST 3% charges and secure bullion transit policies.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Drawer Overlay */}
      {wishlistOpen && (
        <div id="wishlist-drawer-backdrop" className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={() => setWishlistOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div id="main-wishlist-drawer" className="w-screen max-w-sm bg-[#FAF8F5] flex flex-col shadow-2xl border-l border-[#C9973A]/20">
              <div className="px-6 py-5 border-b border-[#F5F2EB] flex items-center justify-between bg-[#F5F2EB]">
                <h2 className="text-sm text-[#2C2A29] tracking-widest uppercase font-serif flex items-center gap-2 font-semibold">
                  <Heart className="w-5 h-5 text-[#C9973A] fill-[#C9973A]" /> Your Wishlist Vault
                </h2>
                <button id="close-wishlist-drawer" onClick={() => setWishlistOpen(false)} className="text-[#A29E9A] hover:text-[#2C2A29]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="text-center py-20">
                    <Heart className="w-12 h-12 text-[#A29E9A]/20 mx-auto mb-4 stroke-[1]" />
                    <p className="font-serif text-[#2C2A29] font-medium text-lg">Vault is Empty</p>
                    <p className="text-xs text-[#A29E9A] mt-2 max-w-xs mx-auto">Add precious pieces while browsing. Save them to compare karat values and wait for your perfect occasion.</p>
                  </div>
                ) : (
                  PRODUCTS.filter(p => wishlist.includes(p.id)).map((p) => (
                    <div id={`wishlist-row-${p.id}`} key={p.id} className="flex gap-4 p-3 bg-white rounded-xl border border-[#F5F2EB] shadow-xs">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover rounded-md border border-[#C9973A]/10 shrink-0 cursor-pointer"
                        onClick={() => {
                          setSelectedProduct(p);
                          setActivePage('pdp');
                          setWishlistOpen(false);
                        }}
                      />
                      <div className="flex-1 select-none">
                        <h4 className="text-xs font-serif font-semibold text-[#2C2A29] hover:text-[#C9973A] cursor-pointer" onClick={() => {
                          setSelectedProduct(p);
                          setActivePage('pdp');
                          setWishlistOpen(false);
                        }}>{p.name}</h4>
                        <p className="text-[10px] text-[#A29E9A] mt-0.5">{p.karat} • {p.goldWeight}g • {p.style}</p>
                        
                        <div className="flex gap-2 mt-2">
                          <button
                            id={`wishlist-add-to-cart-${p.id}`}
                            onClick={() => {
                              removeFromCart(p.id); // clean previous if exists
                              // default size logic is safe
                              const defaultSize = p.sizes ? p.sizes[0] : undefined;
                              updateCartQty(p.id, 1, defaultSize);
                              // Keep the wishlist toggled or remove? Let's leave in vault
                              setWishlistOpen(false);
                              setCartOpen(true);
                            }}
                            className="bg-[#C9973A]/10 hover:bg-[#C9973A] hover:text-white text-[#C9973A] px-2.5 py-1 rounded text-[10px] font-semibold transition cursor-pointer"
                          >
                            Add to Bag
                          </button>
                          <button
                            id={`wishlist-remove-btn-${p.id}`}
                            onClick={() => toggleWishlist(p.id)}
                            className="text-[#A29E9A] hover:text-red-600 text-[10px] px-1 transition cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-backdrop" className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-[#FAF8F5] flex flex-col p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#F5F2EB]">
              <span className="font-serif text-[#C9973A] font-bold tracking-widest text-lg">MITESH MENU</span>
              <button id="close-mobile-menu" onClick={() => setMobileMenuOpen(false)} className="text-[#2C2A29]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <button
                id="mob-link-home"
                onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
                className="w-full text-left text-sm uppercase tracking-wider font-semibold hover:text-[#C9973A]"
              >
                Home & Legacy
              </button>
              <button
                id="mob-link-collections"
                onClick={() => { setSelectedCategory('All'); setActivePage('collections'); setMobileMenuOpen(false); }}
                className="w-full text-left text-sm uppercase tracking-wider font-semibold hover:text-[#C9973A]"
              >
                Exquisite Collections
              </button>
              <button
                id="mob-link-bridal"
                onClick={() => { setActivePage('bridal'); setMobileMenuOpen(false); }}
                className="w-full text-left text-sm uppercase tracking-wider font-semibold hover:text-[#C9973A]"
              >
                Royal Bridal Studio
              </button>
              <button
                id="mob-link-checkout"
                onClick={() => { setActivePage('checkout'); setMobileMenuOpen(false); }}
                className="w-full text-left text-sm uppercase tracking-wider font-semibold hover:text-[#C9973A]"
              >
                Checkout Terminal
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-[#F5F2EB]">
              <div className="flex items-center gap-2.5 text-xs text-[#A29E9A] mb-2">
                <Landmark className="w-4 h-4 text-[#C9973A]" /> BIS Hallmark Registered • 100% Insured Shipping
              </div>
              <p className="text-[11px] text-[#A29E9A]">For inquiries, reach our heritage boutique at <span className="text-[#C9973A] font-semibold">1800-GOLD-MITESH</span></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
