import React, { useState } from 'react';
import { Send, PhoneCall, Check, MessageSquare } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    concern: 'Bridal Set Price Breakdown Inquiry'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Simulate launching real whatsapp chat
      const message = encodeURIComponent(`Namaste Svarna Team, my name is ${formData.name}. I would like to inquire regarding: ${formData.concern}.`);
      window.open(`https://api.whatsapp.com/send?phone=919999999999&text=${message}`, '_blank');
      setIsOpen(false);
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
      {isOpen ? (
        <div id="whatsapp-box-panel" className="bg-[#FAF8F5] border border-[#C9973A]/40 rounded-2xl shadow-2xl w-80 overflow-hidden text-left animate-scale-up">
          
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 bg-[#C9973A] rounded-full flex items-center justify-center font-serif font-black text-sm">
                  S
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-white">Svarna Heritage Concierge</h4>
                <p className="text-[10px] text-teal-100 flex items-center gap-1">Replies under 5 mins • Online</p>
              </div>
            </div>
            <button
              id="close-whatsapp-widget"
              onClick={() => setIsOpen(false)}
              className="text-[#FAF8F5] hover:text-[#C9973A] text-xs font-semibold px-2 cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#F5F2EB]/40 min-h-[160px] flex flex-col justify-between">
            <p className="text-xs bg-white text-[#2C2A29] rounded-xl p-3 shadow-xs border border-teal-100/30 leading-normal max-w-[90%]">
              Namaste! 🙏 Welcome to Svarna. Talk live to our seasoned gold and bridal jewellery consultants. Would you like a live video verification of of our BIS-hallmarked hallmarks ?
            </p>

            {submitted ? (
              <div className="bg-white rounded-xl p-4 text-center border border-[#C9973A]/30">
                <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-[#2C2A29]">Connecting to WhatsApp...</p>
                <p className="text-[10px] text-[#A29E9A] mt-1">Check your external browser tabs to continue.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <input
                  id="whatsapp-user-name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-[#C9973A]/10 text-xs px-3 py-2 rounded-lg text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C9973A]"
                />
                
                <select
                  id="whatsapp-user-topic"
                  value={formData.concern}
                  onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                  className="w-full bg-white border border-[#C9973A]/10 text-xs px-2 py-2 rounded-lg text-[#2C2A29] focus:outline-none cursor-pointer"
                >
                  <option value="Bridal Set Price Breakdown Inquiry">Bridal Set Price Consultation</option>
                  <option value="Custom Jewelry Making Order">Custom Jewelry Making Charge Adjustment</option>
                  <option value="Live Bullion Quality Hallmarking Check">Purity Cert Verification</option>
                  <option value="Book Home Trial Consultation">Request Home Trial Visit</option>
                </select>

                <button
                  id="submit-whatsapp-chat"
                  type="submit"
                  className="w-full bg-[#075E54] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#128C7E] transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Start Heritage WhatsApp Chat <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <button
          id="open-whatsapp-btn"
          onClick={() => setIsOpen(true)}
          className="bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all transform hover:scale-110 flex items-center gap-2 cursor-pointer border border-[#C9973A]/10"
          title="Consult on WhatsApp"
        >
          <MessageSquare className="w-6 h-6 shrink-0" />
          <span className="hidden sm:inline text-xs tracking-wider font-bold">Ask Concierge</span>
        </button>
      )}
    </div>
  );
}
