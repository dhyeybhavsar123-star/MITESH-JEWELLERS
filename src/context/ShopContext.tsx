import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, GoldRates, BookingDetails } from '../types';
import { PRODUCTS, INITIAL_GOLD_RATES } from '../data/products';

type PageType = 'home' | 'collections' | 'pdp' | 'bridal' | 'checkout';

interface ShopContextType {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateCartQty: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  goldRates: GoldRates;
  updateGoldRates: (newRates: Partial<GoldRates>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  selectedKarat: string;
  setSelectedKarat: (karat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  weightRange: [number, number];
  setWeightRange: (range: [number, number]) => void;
  resetFilters: () => void;
  bookings: BookingDetails[];
  addBooking: (booking: BookingDetails) => void;
  checkoutStep: number;
  setCheckoutStep: (step: number) => void;
  giftWrap: boolean;
  setGiftWrap: (wrap: boolean) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoDiscount: number; // in INR
  applyPromo: (code: string) => { success: boolean; message: string };
  triggerExitPrompt: boolean;
  setTriggerExitPrompt: (trigger: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePageState] = useState<PageType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('svarna_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('svarna_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [goldRates, setGoldRates] = useState<GoldRates>(INITIAL_GOLD_RATES);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtering States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedKarat, setSelectedKarat] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500000]);
  const [weightRange, setWeightRange] = useState<[number, number]>([0, 200]);

  // Bookings state
  const [bookings, setBookings] = useState<BookingDetails[]>(() => {
    const saved = localStorage.getItem('svarna_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Checkout flows
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Exit intent
  const [triggerExitPrompt, setTriggerExitPrompt] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('svarna_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('svarna_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('svarna_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Handle URL hashes or screen transitions gracefully
  const setActivePage = (page: PageType) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, size?: string) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const updateCartQty = (productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === productId && item.selectedSize === size
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity = quantity;
        return updated;
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCheckoutStep(1);
    setPromoCode('');
    setPromoDiscount(0);
    setGiftWrap(false);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const updateGoldRates = (newRates: Partial<GoldRates>) => {
    setGoldRates((prev) => ({
      ...prev,
      ...newRates,
      updatedTime: `Live MCX Feed • Updated just now`
    }));
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedStyle('All');
    setSelectedKarat('All');
    setPriceRange([0, 1500000]);
    setWeightRange([0, 200]);
    setSearchQuery('');
  };

  const addBooking = (booking: BookingDetails) => {
    setBookings((prev) => [booking, ...prev]);
  };

  const applyPromo = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'FESTIVE10') {
      setPromoCode(formatted);
      // Give a neat discount code trigger
      setPromoDiscount(15000); // flat 15000 rs discount on festive season
      return { success: true, message: 'FESTIVE10 applied! Flat ₹15,000 Off.' };
    } else if (formatted === 'BRIDE25') {
      setPromoCode(formatted);
      setPromoDiscount(25000); // flat 25000 rs discount on heavy orders
      return { success: true, message: 'BRIDE25 applied! Royal bridal discount of ₹25,000 Off.' };
    } else if (formatted === 'GIFTGOLD') {
      setPromoCode(formatted);
      setPromoDiscount(5000);
      return { success: true, message: 'GIFTGOLD applied! Flat ₹5,000 Off.' };
    }
    return { success: false, message: 'Invalid promo code. Try FESTIVE10 or BRIDE25.' };
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        wishlist,
        toggleWishlist,
        goldRates,
        updateGoldRates,
        searchQuery,
        setSearchQuery,
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
        resetFilters,
        bookings,
        addBooking,
        checkoutStep,
        setCheckoutStep,
        giftWrap,
        setGiftWrap,
        promoCode,
        setPromoCode,
        promoDiscount,
        applyPromo,
        triggerExitPrompt,
        setTriggerExitPrompt,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
