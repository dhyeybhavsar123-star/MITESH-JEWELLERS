import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { CreditCard, Check, ArrowRight, ShieldCheck, Heart, Landmark, Gift, MessageSquare, Ticket, Award, RefreshCw, ShoppingBag } from 'lucide-react';

export default function Checkout() {
  const {
    cart,
    clearCart,
    giftWrap,
    setGiftWrap,
    promoCode,
    promoDiscount,
    applyPromo,
    setActivePage
  } = useShop();

  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1); // 1: Cart, 2: Address, 3: Payment
  
  // Custom states for address
  const [addressData, setAddressData] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    deliverySpeed: 'insured-regular'
  });

  const [promoText, setPromoText] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);
  
  // Payment variables
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'emi' | 'bnpl'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [completedOrderNo, setCompletedOrderNo] = useState('');

  // Calculations
  const calculatedSums = React.useMemo(() => {
    let subtotal = 0;
    cart.forEach(item => {
      const rate = item.product.karat === '22K' ? 7015 : 5740;
      const baseCost = item.product.goldWeight * rate;
      const makingCost = item.product.goldWeight * item.product.makingChargePerGram;
      const withWastageAndMaking = (baseCost * (1 + item.product.wastagePercent / 100)) + makingCost;
      const calculatedUnitPrice = Math.round(withWastageAndMaking * 1.03); // featuring 3% GST
      subtotal += (calculatedUnitPrice * item.quantity);
    });

    const wrapCharge = giftWrap ? 450 : 0;
    const speedCharge = addressData.deliverySpeed === 'insured-express' ? 1200 : 0;
    const discountedTotal = Math.max(0, subtotal + wrapCharge + speedCharge - promoDiscount);

    return {
      subtotal,
      wrapCharge,
      speedCharge,
      discountedTotal
    };
  }, [cart, giftWrap, addressData.deliverySpeed, promoDiscount]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoText.trim()) return;
    const result = applyPromo(promoText);
    setPromoFeedback(result);
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate high precision order processing
    const randomOrder = `SVR-${Math.floor(Math.random()*899999+100000)}`;
    setCompletedOrderNo(randomOrder);
  };

  // Safe checks for emptyness
  if (cart.length === 0 && !completedOrderNo) {
    return (
      <div id="checkout-empty-fallback" className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#FAF8F5] text-center">
        <div className="w-16 h-16 bg-[#F5F2EB] rounded-full flex items-center justify-center mb-4 border border-[#C9973A]/20 text-[#C9973A]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-[#1C1B19] text-2xl font-black">Your Checkout Cart is Empty</h2>
        <p className="text-xs text-[#A29E9A] max-w-sm mt-2">
          Please select some certified gold earrings, wedding sets, or hoops before visiting the secure payment checkout.
        </p>
        <button
          id="empty-checkout-back-btn"
          onClick={() => setActivePage('collections')}
          className="mt-6 bg-[#C9973A] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1C1B19] transition cursor-pointer"
        >
          Browse Showroom
        </button>
      </div>
    );
  }

  return (
    <div id="checkout-view-root" className="min-h-screen bg-[#FAF8F5] pb-24 text-left select-none">
      
      {/* 1. Progress Indicator on top */}
      <div className="bg-[#1C1B19] text-white py-6 border-b border-[#C9973A]/15 select-none text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between text-xs font-serif uppercase tracking-widest text-[#FAF8F5]">
            
            <div className="flex flex-col items-center gap-1">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                checkoutStep >= 1 ? 'bg-[#C9973A] text-white' : 'bg-gray-700'
              }`}>
                {checkoutStep > 1 ? '✓' : '1'}
              </span>
              <span className={checkoutStep === 1 ? 'text-[#C9973A] font-black' : 'text-[#A29E9A]'}>Bag Overview</span>
            </div>

            <div className="flex-1 h-0.5 bg-[#C9973A]/20 mx-4" />

            <div className="flex flex-col items-center gap-1">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                checkoutStep >= 2 ? 'bg-[#C9973A] text-white' : 'bg-gray-700'
              }`}>
                {checkoutStep > 2 ? '✓' : '2'}
              </span>
              <span className={checkoutStep === 2 ? 'text-[#C9973A] font-black' : 'text-[#A29E9A]'}>Insured Address</span>
            </div>

            <div className="flex-1 h-0.5 bg-[#C9973A]/20 mx-4" />

            <div className="flex flex-col items-center gap-1">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                checkoutStep >= 3 ? 'bg-[#C9973A] text-white' : 'bg-gray-700'
              }`}>
                3
              </span>
              <span className={checkoutStep === 3 ? 'text-[#C9973A] font-black' : 'text-[#A29E9A]'}>Secure Payment</span>
            </div>

          </div>
        </div>
      </div>

      {completedOrderNo ? (
        /* ORDER COMPLETED SUCCESS VIEW */
        <div id="order-completed-modal" className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <h2 className="font-serif text-[#1C1B19] text-3xl font-black">Auspicious Purchase Complete!</h2>
          <p className="text-xs text-[#A29E9A] leading-relaxed">
            Your transaction has been processed securely via Bureau of Indian Standards (BIS) premium safety gateways. Our family jeweler is preparing your certified insured wooden chest now.
          </p>

          <div className="bg-white border-2 border-dashed border-[#C9973A]/30 p-6 rounded-3xl text-left space-y-3">
            <div className="flex justify-between border-b pb-2 text-xs">
              <span className="text-[#A29E9A]">Order Registry ID:</span>
              <span className="font-mono font-black text-[#1C1B19]">{completedOrderNo}</span>
            </div>
            <div className="flex justify-between border-b pb-2 text-xs">
              <span className="text-[#A29E9A]">Recipient Customer:</span>
              <span className="font-bold text-[#1C1B19]">{addressData.fullName || 'Patron dhyeybhavsar123'}</span>
            </div>
            <div className="flex justify-between border-b pb-2 text-xs">
              <span className="text-[#A29E9A]">Insured Shipping Address:</span>
              <span className="text-[#2C2A29] max-w-[210px] text-right truncate">{addressData.addressLine || 'Metropolitan Hub'}, {addressData.city || 'Mumbai'}</span>
            </div>
            <div className="flex justify-between text-xs pt-1">
              <span className="text-emerald-700 font-bold">Transit Promise:</span>
              <span className="text-emerald-700 font-bold">Guaranteed within 3 business days</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              id="success-browse-btn"
              onClick={() => {
                clearCart();
                setCompletedOrderNo('');
                setActivePage('home');
              }}
              className="w-full bg-[#1C1B19] text-white py-3.5 rounded-full text-xs font-semibold hover:bg-[#C9973A] transition cursor-pointer"
            >
              Return Home
            </button>
            <button
              id="success-whatsapp-contact"
              onClick={() => window.open('https://api.whatsapp.com/send?phone=919999999999&text=Inquire%20order%20status', '_blank')}
              className="w-full bg-emerald-600 text-white py-3.5 rounded-full text-xs font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Verify on WhatsApp <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* STANDARD 3 STEP FLOW */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT 2 COLUMNS: Step content modules */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* STEP 1: BAG OVERVIEW REVIEW */}
              {checkoutStep === 1 && (
                <div id="checkout-step1" className="bg-white border border-[#F5F2EB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
                  <h3 className="font-serif text-[#1C1B19] text-xl font-bold border-b border-[#FAF8F5] pb-3">1. Your Selected Treasures</h3>
                  
                  <div className="space-y-4">
                    {cart.map((item) => {
                      const rate = item.product.karat === '22K' ? 7015 : 5740;
                      const basePrice = (item.product.goldWeight * rate * (1 + item.product.wastagePercent / 100)) + (item.product.goldWeight * item.product.makingChargePerGram);
                      const unitPrice = Math.round(basePrice * 1.03);

                      return (
                        <div id={`checkout-cart-item-${item.product.id}`} key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                          <div className="flex gap-4 items-center">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 object-cover rounded-lg border border-[#C9973A]/10"
                            />
                            <div>
                              <h4 className="font-serif text-[#1C1B19] text-xs font-bold leading-tight">{item.product.name}</h4>
                              <p className="text-[10px] text-[#A29E9A] mt-0.5">{item.product.karat} • {item.product.goldWeight}g Gold {item.selectedSize ? `• Size ${item.selectedSize}` : ''}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-xs font-mono font-bold text-[#1C1B19]">₹{(unitPrice * item.quantity).toLocaleString('en-IN')}</p>
                            <p className="text-[9px] text-[#A29E9A] leading-tight mt-0.5">Qty {item.quantity}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* SANDALWOOD GIFT WRAP SPECIFICATION CHECKS */}
                  <div className="bg-[#FAF8F5] border border-[#C9973A]/10 rounded-2xl p-4 flex items-start gap-3.5 text-left">
                    <input
                      id="giftwrap-checkbox"
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="mt-1 accent-[#C9973A] cursor-pointer"
                    />
                    <div>
                      <label htmlFor="giftwrap-checkbox" className="font-serif text-xs font-bold text-[#1C1B19] flex items-center gap-1 cursor-pointer select-none">
                        <Gift className="w-4 h-4 text-[#C9973A] shrink-0" /> sandalwood Incense Silk Gift Wrap (+₹450)
                      </label>
                      <p className="text-[10px] text-[#A29E9A] leading-normal mt-1">
                        We box your gold inside hand-finished mahogany cases layered with organic dried sandalwood bark chips, silk linen drapes and a hand-tied red wedding ribbon. Excellent for gifting.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      id="step1-continue-btn"
                      onClick={() => setCheckoutStep(2)}
                      className="bg-[#1C1B19] text-[#FAF8F5] font-bold py-3.5 px-8 rounded-full text-xs hover:bg-[#C9973A] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      Continue to Address Info <ArrowRight className="w-4 h-4 text-[#C9973A]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: ADDRESS AND SHIP TYPE */}
              {checkoutStep === 2 && (
                <div id="checkout-step2" className="bg-white border border-[#F5F2EB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
                  <h3 className="font-serif text-[#1C1B19] text-xl font-bold border-b border-[#FAF8F5] pb-3">2. Insured Transit Destination</h3>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setCheckoutStep(3); }} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Recipient Full Name *</label>
                        <input
                          id="ship-name"
                          type="text"
                          required
                          placeholder="e.g. Ananya Deshmukh"
                          value={addressData.fullName}
                          onChange={(e) => setAddressData({ ...addressData, fullName: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-3 py-2.5 rounded-xl text-[#2C2A29] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Contact Phone Number *</label>
                        <input
                          id="ship-phone"
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={addressData.phone}
                          onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-3 py-2.5 rounded-xl text-[#2C2A29] focus:outline-none"
                        />
                      </div>

                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Insured Delivery Address *</label>
                      <input
                        id="ship-address1"
                        type="text"
                        required
                        placeholder="e.g. Flat 405, Shiv Kripa Apartments, JVPD Scheme"
                        value={addressData.addressLine}
                        onChange={(e) => setAddressData({ ...addressData, addressLine: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-3 py-2.5 rounded-xl text-[#2C2A29] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">City *</label>
                        <input
                          id="ship-city"
                          type="text"
                          required
                          placeholder="Mumbai"
                          value={addressData.city}
                          onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-3 py-2.5 rounded-xl text-[#2C2A29] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">State *</label>
                        <input
                          id="ship-state"
                          type="text"
                          required
                          placeholder="Maharashtra"
                          value={addressData.state}
                          onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-3 py-2.5 rounded-xl text-[#2C2A29] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Pincode *</label>
                        <input
                          id="ship-pincode"
                          type="text"
                          required
                          maxLength={6}
                          placeholder="400001"
                          value={addressData.pincode}
                          onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-3 py-2.5 rounded-xl text-[#2C2A29] focus:outline-none"
                        />
                      </div>

                    </div>

                    {/* Delivery Speeds selection layout */}
                    <div className="space-y-2 pt-2 text-left">
                      <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Insured Transit Speed Calibrator</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        
                        <button
                          id="speed-regular-btn"
                          type="button"
                          onClick={() => setAddressData({ ...addressData, deliverySpeed: 'insured-regular' })}
                          className={`text-xs p-3.5 rounded-2xl border text-left flex items-start gap-3 transition ${
                            addressData.deliverySpeed === 'insured-regular'
                              ? 'border-[#C9973A] bg-[#C9973A]/5 text-[#2C2A29]'
                              : 'border-gray-200 bg-white hover:border-[#C9973A]/40'
                          }`}
                        >
                          <input type="radio" checked={addressData.deliverySpeed === 'insured-regular'} readOnly className="mt-0.5 accent-[#C9973A]" />
                          <div>
                            <span className="font-bold text-[#1C1B19] block">Guaranteed SafeSec Delivery (Free)</span>
                            <span className="text-[10px] text-[#A29E9A] block pt-0.5">Delivery in 3 business days. Sealed premium velvet containment bag.</span>
                          </div>
                        </button>

                        <button
                          id="speed-express-btn"
                          type="button"
                          onClick={() => setAddressData({ ...addressData, deliverySpeed: 'insured-express' })}
                          className={`text-xs p-3.5 rounded-2xl border text-left flex items-start gap-3 transition ${
                            addressData.deliverySpeed === 'insured-express'
                              ? 'border-[#C9973A] bg-[#C9973A]/5 text-[#2C2A29]'
                              : 'border-gray-200 bg-white hover:border-[#C9973A]/40'
                          }`}
                        >
                          <input type="radio" checked={addressData.deliverySpeed === 'insured-express'} readOnly className="mt-0.5 accent-[#C9973A]" />
                          <div>
                            <span className="font-bold text-emerald-700 block">Metropolitan Next Day-Air (+₹1,200)</span>
                            <span className="text-[10px] text-[#A29E9A] block pt-0.5">Hand-carried by bonded security officer directly to your doorstep with passcode entry check.</span>
                          </div>
                        </button>

                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#F5F2EB] flex justify-between">
                      <button
                        id="step2-back-btn"
                        type="button"
                        onClick={() => setCheckoutStep(1)}
                        className="text-[#2C2A29] hover:text-[#C9973A] font-semibold text-xs border border-gray-300 rounded-full py-2.5 px-6"
                      >
                        Back to Bag
                      </button>
                      <button
                        id="step2-continue-btn"
                        type="submit"
                        className="bg-[#1C1B19] text-[#FAF8F5] font-bold py-3.5 px-8 rounded-full text-xs hover:bg-[#C9973A] transition"
                      >
                        Continue to Secure Payment
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* STEP 3: PAYMENT SECURE PORTAL */}
              {checkoutStep === 3 && (
                <div id="checkout-step3" className="bg-white border border-[#F5F2EB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
                  <h3 className="font-serif text-[#1C1B19] text-xl font-bold border-b border-[#FAF8F5] pb-3 flex items-center gap-1.5 matches-trust">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 animate-pulse" /> 3. Secure Financial Checkout
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {/* Payment Mode Selector layout cards */}
                    {[
                      { id: 'upi', label: 'One-Tap UPI' },
                      { id: 'card', label: 'Credit Card' },
                      { id: 'emi', label: 'Easy EMI' },
                      { id: 'bnpl', label: 'Razor BNPL' }
                    ].map((mode) => (
                      <button
                        id={`payment-tab-${mode.id}`}
                        key={mode.id}
                        onClick={() => setPaymentMode(mode.id as any)}
                        className={`text-xs py-3 px-3.5 rounded-2xl border text-center font-bold tracking-tight transition ${
                          paymentMode === mode.id
                            ? 'border-[#C9973A] bg-[#C9973A]/10 text-[#C9973A]'
                            : 'border-gray-200 bg-white hover:border-[#1C1B19]'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>

                  {/* Payment Form according to mode selected */}
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C9973A]/10 mt-6 text-left">
                    
                    {paymentMode === 'upi' && (
                      <div className="space-y-4 text-left">
                        <p className="text-xs text-[#2C2A29] font-semibold">Select Your Prefered Indian UPI App</p>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { id: 'gpay', label: 'Google Pay' },
                            { id: 'phonepe', label: 'PhonePe' },
                            { id: 'paytm', label: 'Paytm UPI' }
                          ].map((app) => (
                            <button
                              id={`upi-app-${app.id}`}
                              key={app.id}
                              type="button"
                              onClick={() => setSelectedUpiApp(app.id)}
                              className={`text-xs py-2 px-3 rounded-lg border text-center transition ${
                                selectedUpiApp === app.id
                                  ? 'bg-[#1C1B19] text-white border-[#1C1B19]'
                                  : 'bg-white text-gray-700 border-gray-300'
                              }`}
                            >
                              {app.label}
                            </button>
                          ))}
                        </div>

                        <div className="space-y-1.5 pt-2">
                          <label className="text-[10px] uppercase tracking-wider text-[#A29E9A] font-bold">Or enter Virtual Payment Address (VPA)</label>
                          <input
                            id="vpa-input"
                            type="text"
                            placeholder="username@okicici"
                            className="bg-white border border-gray-200 text-xs px-3 py-2 rounded-xl text-[#2C2A29] w-full focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMode === 'card' && (
                      <div className="space-y-3 text-left">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Card Number</label>
                          <input
                            id="card-number"
                            type="text"
                            placeholder="4321 8871 2910 8839"
                            maxLength={19}
                            className="bg-white border border-gray-200 text-xs px-3 py-2.5 rounded-xl text-[#2C2A29] w-full focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Expiry Date</label>
                            <input
                              id="card-expiry"
                              type="text"
                              placeholder="MM/YY"
                              maxLength={5}
                              className="bg-white border border-gray-200 text-xs px-3 py-2.5 rounded-xl text-[#2C2A29] w-full focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">CVV Secure Key</label>
                            <input
                              id="card-cvv"
                              type="password"
                              placeholder="***"
                              maxLength={3}
                              className="bg-white border border-gray-200 text-xs px-3 py-2.5 rounded-xl text-[#2C2A29] w-full focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMode === 'emi' && (
                      <div className="space-y-3 text-left">
                        <span className="text-xs font-semibold text-[#1C1B19] block">Bespoke 0% EMI financing partnership</span>
                        <p className="text-[11px] text-[#A29E9A]">Our financing engine partners with leading banks to support instant approval. Choose your preferred banking partner:</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <button id="bank-hdfc-btn" type="button" className="p-2 bg-white text-gray-700 border hover:border-[#C9973A] text-left rounded-lg text-xs">HDFC Credit Card EMI (Flat 12-Month)</button>
                          <button id="bank-icici-btn" type="button" className="p-2 bg-white text-gray-700 border hover:border-[#C9973A] text-left rounded-lg text-xs">ICICI Golden Wedding Fin (24-Month)</button>
                        </div>
                      </div>
                    )}

                    {paymentMode === 'bnpl' && (
                      <div className="space-y-2 text-left">
                        <p className="text-xs text-[#2C2A29] font-medium">PayU & LazyPay Deferred Settlement option</p>
                        <p className="text-[10px] text-[#A29E9A]">Verify your OTP below to settle this balance after 14 days with zero extra platform fees.</p>
                        <input
                          id="ota-otp-verifier"
                          placeholder="Verify Mobile OTP"
                          type="text"
                          className="bg-white border border-gray-200 text-xs px-3 py-2 rounded-xl text-[#2C2A29]"
                        />
                      </div>
                    )}

                  </div>

                  {/* Complete Action row */}
                  <form onSubmit={handleCreateOrder} className="pt-6 border-t border-[#F5F2EB] flex justify-between">
                    <button
                      id="step3-back-btn"
                      type="button"
                      onClick={() => setCheckoutStep(2)}
                      className="text-[#2C2A29] hover:text-[#C9973A] font-semibold text-xs border border-gray-300 rounded-full py-2.5 px-6"
                    >
                      Back to Address
                    </button>
                    <button
                      id="step3-complete-btn"
                      type="submit"
                      className="bg-emerald-600 hover:bg-[#C9973A] text-white font-serif font-black py-4 px-8 rounded-full text-xs hover:shadow-lg transition-all"
                    >
                      Process Transact - ₹{calculatedSums.discountedTotal.toLocaleString('en-IN')}
                    </button>
                  </form>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: Interactive Billing Breakdown with promo code input */}
            <div className="space-y-6">
              
              <div className="bg-white border border-[#C9973A]/10 rounded-3xl p-6 space-y-4 shadow-sm text-left">
                <h3 className="font-serif text-[#1C1B19] text-sm font-black border-b border-gray-100 pb-3 uppercase tracking-wider">
                  Receipt Summary Breakup
                </h3>

                {/* Promo Code Input block */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#A29E9A] block">Auspicious Promo Code Coupons</label>
                  <div className="flex gap-2">
                    <input
                      id="checkout-promo-input"
                      type="text"
                      placeholder="Try FESTIVE10 or BRIDE25"
                      value={promoText}
                      onChange={(e) => setPromoText(e.target.value)}
                      className="bg-[#FAF8F5] border border-gray-200 text-xs px-3 py-2 rounded-xl text-[#2C2A29] focus:outline-none w-full uppercase font-mono"
                    />
                    <button
                      id="apply-promo-btn"
                      type="submit"
                      className="bg-[#1C1B19] hover:bg-[#C9973A] text-white text-[10px] font-bold px-4 rounded-xl transition cursor-pointer select-none shrink-0"
                    >
                      Apply Code
                    </button>
                  </div>
                  {promoFeedback && (
                    <p className={`text-[10px] tracking-tight ${promoFeedback.success ? 'text-emerald-700 font-bold' : 'text-rose-600 font-medium'}`}>
                      {promoFeedback.message}
                    </p>
                  )}
                </form>

                {/* Price break downs */}
                <div className="space-y-2 text-xs pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-[#A29E9A]">
                    <span>Gold Treasures Subtotal</span>
                    <span className="font-mono text-[#2C2A29] font-medium">₹{calculatedSums.subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {giftWrap && (
                    <div className="flex justify-between text-[#A29E9A]">
                      <span>Sandlewood premium gifting pack</span>
                      <span className="font-mono text-[#2C2A29] font-medium">+₹450</span>
                    </div>
                  )}

                  {addressData.deliverySpeed === 'insured-express' && (
                    <div className="flex justify-between text-[#A29E9A]">
                      <span>Metropolitan Next-Day Air Shipping</span>
                      <span className="font-mono text-[#2C2A29] font-medium">+₹1,200</span>
                    </div>
                  )}

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50 p-1 rounded">
                      <span className="flex items-center gap-1"><Ticket className="w-3.5 h-3.5" /> Coupon "{promoCode}" applied</span>
                      <span className="font-mono">-₹{promoDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm pt-3 border-t border-gray-100 items-baseline font-black font-serif">
                    <span className="text-[#1C1B19]">Gross billing Amount:</span>
                    <span className="font-mono text-[#C9973A] text-sm sm:text-lg">
                      ₹{calculatedSums.discountedTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Trust symbols on Checkout sidebar info */}
                <div className="pt-4 border-t border-gray-100 space-y-2 text-[10px] text-gray-400 leading-normal">
                  <p className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> BIS HM Certified spectrum diagnostics</p>
                  <p className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#C9973A]" /> 100% Fully Insured Bullion transit coverage</p>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
