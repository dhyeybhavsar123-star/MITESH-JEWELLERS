import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Calendar, Clock, ChevronDown, Check, ArrowRight, MessageCircle, Heart, Award, Users } from 'lucide-react';
import { BookingDetails } from '../types';

export default function BridalStudio() {
  const { addBooking, bookings, setActivePage, setSelectedProduct } = useShop();
  
  // Custom states for booking form
  const [formData, setFormData] = useState<BookingDetails>({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '11:00 AM - 01:00 PM',
    regionStylePreference: 'No Preference',
    consultationType: 'Virtual (Zoom/WhatsApp)',
    notes: ''
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Curated Regional Bridal sets info
  const regionalSets = [
    {
      region: 'North Indian Bridal Collection',
      title: 'Grand Rajkumari Jadau Set',
      desc: 'Heavy 22-Karat gold collars layered with pristine Kundan work, multi-strand natural basra seed pearls and emerald beads.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      customizableField: 'Custom cluster pearls & dori tassels included'
    },
    {
      region: 'South Indian Temple Series',
      title: 'Aishwarya Lakshmi Kasu Haramu',
      desc: 'Legendary temple coin necklaces engraved with Lakshmi motifs, bordered by micro-carved ruby-encrusted Guttapusalu drops.',
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80',
      customizableField: 'Traditional heavy gold red rubies adjustable loops'
    },
    {
      region: 'Bengali Legacy Collection',
      title: 'Gulaab Phool Chokers & Sankha',
      desc: 'Hand-chased sheet gold repoussé chokers displaying delicate rose patterns, complemented by solid gold terminal bangles.',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80',
      customizableField: 'Hand burnished antique red enamel finishes'
    },
    {
      region: 'Marwari Royal Aad Chest Collar',
      title: 'The Jodhpur Meenakari Aad Set',
      desc: 'Extravagant rectangular chest collar showcasing intense geometric wire loops, dense Polki bezels, and complex lattice-worked reverse meenakari.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      customizableField: 'Sourced from the heart of Johari Bazaar Rajasthan'
    }
  ];

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.date) {
      alert('Please complete all mandatory appointment parameters.');
      return;
    }

    addBooking(formData);
    setBookingSuccess(true);
    
    // Auto clear form state
    setTimeout(() => {
      setBookingSuccess(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        date: '',
        timeSlot: '11:00 AM - 01:00 PM',
        regionStylePreference: 'No Preference',
        consultationType: 'Virtual (Zoom/WhatsApp)',
        notes: ''
      });
    }, 4000);
  };

  return (
    <div id="bridal-studio-root" className="bg-[#FAF8F5] pb-24 text-left">
      
      {/* 1. Full screen Editorial Imagery hero */}
      <section id="bridal-hero" className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black select-none">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=80"
            alt="Royal bridal showcase background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[36%] object-top scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-black/10 to-transparent" />
        </div>

        <div className="relative text-center px-4 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#C9973A]/10 border border-[#C9973A]/40 px-3.5 py-1 rounded-full text-[#FAF8F5] text-[10px] font-bold tracking-[0.25em] uppercase">
            <Sparkles className="w-4 h-4 text-[#C9973A] animate-pulse" /> The Royal Bridal Salon
          </div>

          <h1 className="font-serif text-[#FAF8F5] text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Curated For Your<br />
            <span className="text-[#C9973A] italic font-normal font-serif">Infinite Beginnings</span>
          </h1>

          <p className="text-sm text-gray-200 font-light max-w-lg mx-auto leading-relaxed">
            Experience bespoke luxury fit for royalty. Book a personal session with one of our family's veteran bridal gold designers from Mumbai.
          </p>

          <div className="pt-2">
            <a
              href="#booking-anchor"
              className="bg-[#C9973A] text-[#1C1B19] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all select-none inline-flex items-center gap-2"
            >
              Book Royal Session <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Brand Value Cards */}
      <section className="bg-[#1C1B19] py-8 text-white select-none text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center p-3">
            <Award className="w-7 h-7 text-[#C9973A] mb-2" />
            <p className="font-serif font-black tracking-wider uppercase text-white mb-1 text-sm">Privé customizations</p>
            <p className="text-[#A29E9A] text-[11px]">We adjust choker circumference dimensions & pearl beads to complement your wedding neckline.</p>
          </div>
          <div className="flex flex-col items-center p-3 border-y sm:border-y-0 sm:border-x border-[#C9973A]/20">
            <Users className="w-7 h-7 text-[#C9973A] mb-2" />
            <p className="font-serif font-black tracking-wider uppercase text-white mb-1 text-sm">Design Veterans</p>
            <p className="text-[#A29E9A] text-[11px]">Bridal consultations led by senior karigars with over 30 years of traditional jadau experience.</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <MessageCircle className="w-7 h-7 text-[#C9973A] mb-2" />
            <p className="font-serif font-black tracking-wider uppercase text-white mb-1 text-sm">Video Lounging</p>
            <p className="text-[#A29E9A] text-[11px]">High-definition video verifications of hallmarks, weights, and rubies under premium conditions.</p>
          </div>
        </div>
      </section>

      {/* 4. Curated Regional sets */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-16">
          <p className="text-xs uppercase tracking-widest text-[#C9973A] font-semibold">Imperial Curations</p>
          <h2 className="font-serif text-[#1C1B19] text-3xl sm:text-4xl font-black">Regional Bridal Masterpieces</h2>
          <div className="w-16 h-0.5 bg-[#C9973A] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {regionalSets.map((set, idx) => (
            <div
              id={`bridal-regional-card-${idx}`}
              key={idx}
              className="bg-white border border-[#F5F2EB] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100 select-none">
                <img
                  src={set.image}
                  alt={set.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-102 transition duration-500"
                />
                
                <span className="absolute top-3 left-3 bg-[#1C1B19]/85 text-[#FAF8F5] text-[9px] font-bold py-1 px-3 rounded-full uppercase tracking-wider shadow">
                  {set.region}
                </span>
                
                <span className="absolute top-3 right-3 bg-white text-[#C9973A] border border-[#C9973A]/20 text-[9px] font-bold py-1 px-2.5 rounded-full shadow">
                  Bespoke Sizing
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h4 className="font-serif text-[#1C1B19] text-lg font-black">{set.title}</h4>
                <p className="text-xs text-[#2C2A29] leading-relaxed font-light">{set.desc}</p>
                <div className="bg-[#FAF8F5] border border-gray-100 p-2 text-center rounded text-[10px] font-mono text-[#C9973A] font-medium uppercase">
                  ✨ Features: {set.customizableField}
                </div>
                
                <div className="pt-3 border-t border-[#F5F2EB] flex items-center justify-between">
                  <button
                    id={`bridal-reg-inspect-${idx}`}
                    onClick={() => {
                      // Navigate to Collections and auto filter Bridal Sets
                      setSelectedProduct(null as any);
                      setActivePage('collections');
                    }}
                    className="text-[#C9973A] hover:text-[#1C1B19] transition text-xs font-semibold uppercase flex items-center gap-1.5 cursor-pointer"
                  >
                    View Matching Collections <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. interactive consul booking Form & Confirmations */}
      <section id="booking-anchor" className="py-20 bg-[#F5F2EB] border-y border-[#C9973A]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="space-y-2 mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9973A] font-semibold">Privé Appointment</p>
            <h3 className="font-serif text-[#1C1B19] text-2xl sm:text-3xl font-black">
              Book Your Bridal Consultation
            </h3>
            <p className="text-xs text-[#A29E9A] font-light max-w-sm mx-auto">
              Our consultants will reach out within 2 hours to confirm scheduling and send video lounge links.
            </p>
          </div>

          {bookingSuccess ? (
            <div id="booking-success-box" className="bg-white border-2 border-emerald-500 rounded-3xl p-10 max-w-lg mx-auto shadow-2xl text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>

              <h4 className="font-serif text-[#1C1B19] text-lg font-extrabold">Auspicious Slot Confirmed!</h4>
              <p className="text-[#C9973A] text-xs font-bold uppercase tracking-wider py-1">Appointment Saved ID: SV-B-{Math.floor(Math.random()*90000+10000)}</p>
              
              <div className="mt-4 bg-[#FAF8F5] border border-gray-200 p-4 rounded-2xl text-xs space-y-1.5 text-left">
                <p className="text-[#2C2A29]"><span className="font-bold">Patron Name:</span> {formData.fullName}</p>
                <p className="text-[#2C2A29]"><span className="font-bold">Consultation Mode:</span> {formData.consultationType}</p>
                <p className="text-[#2C2A29]"><span className="font-bold">Date:</span> {formData.date}</p>
                <p className="text-[#2C2A29]"><span className="font-bold">Time Range:</span> {formData.timeSlot}</p>
                <p className="text-emerald-700 font-mono text-[10px] mt-2 block">✓ Senior designer allotted. Secure invitation email and link transmitted.</p>
              </div>

              <p className="text-[10px] text-gray-400 mt-6 font-serif">
                Refreshing boutique workspace setup...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="bg-white border border-[#C9973A]/20 p-6 sm:p-10 rounded-3xl shadow-xl max-w-2xl mx-auto space-y-6 text-left">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">FullName *</label>
                  <input
                    id="book-name-input"
                    type="text"
                    required
                    placeholder="e.g. Ananya Deshmukh"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-3.5 py-3 rounded-xl text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C9973A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Phone Number (WhatsApp) *</label>
                  <input
                    id="book-phone-input"
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-3.5 py-3 rounded-xl text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C9973A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Email Address *</label>
                  <input
                    id="book-email-input"
                    type="email"
                    required
                    placeholder="e.g. ananya@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-3.5 py-3 rounded-xl text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C9973A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Preferred Auspicious Date *</label>
                  <input
                    id="book-date-input"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-2 py-3 rounded-xl text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C9973A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Time Slot Range</label>
                  <select
                    id="book-slot-select"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-2 py-3 rounded-xl text-[#2C2A29] focus:outline-none cursor-pointer"
                  >
                    <option value="11:00 AM - 01:00 PM">Morning (11:00 AM - 01:00 PM)</option>
                    <option value="02:00 PM - 04:00 PM">Afternoon (02:00 PM - 04:00 PM)</option>
                    <option value="05:00 PM - 07:00 PM">Sunset (05:00 PM - 07:00 PM)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Heritage Preference</label>
                  <select
                    id="book-pref-select"
                    value={formData.regionStylePreference}
                    onChange={(e: any) => setFormData({ ...formData, regionStylePreference: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-2 py-3 rounded-xl text-[#2C2A29] focus:outline-none cursor-pointer"
                  >
                    <option value="No Preference">All Designs (No Preference)</option>
                    <option value="North Indian">North Indian Jadau & Polki</option>
                    <option value="South Indian">South Indian Temple Coin</option>
                    <option value="Bengali">Bengali Hand-Chased Gold</option>
                    <option value="Marwari">Marwari Traditional Aad Collar</option>
                  </select>
                </div>

              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Consultation Type Preference</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Virtual (Zoom/WhatsApp)', 'In-person (Mumbai Flagship)'].map((mode) => (
                    <button
                      id={`book-mode-${mode.replace(/\s+/g, '-').toLowerCase()}`}
                      key={mode}
                      type="button"
                      onClick={() => setFormData({ ...formData, consultationType: mode as any })}
                      className={`text-xs p-3 rounded-xl border text-center font-semibold transition cursor-pointer select-none ${
                        formData.consultationType === mode
                          ? 'border-[#C9973A] bg-[#C9973A]/10 text-[#C9973A]'
                          : 'border-gray-200 bg-white hover:border-[#C9973A]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1C1B19] uppercase tracking-wider block">Custom notes (drape styles, colors, budget limits)</label>
                <textarea
                  id="book-notes-input"
                  rows={3}
                  placeholder="e.g. Wearing a deep magenta wedding Lehenga with antique silver zari embroidery..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-gray-200 text-xs px-3.5 py-3 rounded-xl text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C9973A]"
                />
              </div>

              <button
                id="submit-bridal-booking-btn"
                type="submit"
                className="w-full bg-[#1C1B19] text-[#FAF8F5] hover:bg-[#C9973A] py-4 rounded-full text-xs font-black tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none"
              >
                Confirm Auspicious Appointment Booking <ArrowRight className="w-4 h-4 text-[#C9973A]" />
              </button>

              <p className="text-[10px] text-gray-400 text-center select-none leading-normal">
                No booking fee required. Access links, custom wedding catalogue brochures and designated concierge details are sent immediately upon submission.
              </p>
            </form>
          )}

        </div>
      </section>

    </div>
  );
}
