export interface Review {
  id: string;
  userName: string;
  userType: 'Verified Buyer' | 'Bridal Buyer' | 'Gifting Customer';
  rating: number;
  comment: string;
  date: string;
  location: string;
  avatarSeed: string;
  skinToneDescription?: string;
  productImage?: string; // photo on real skin / outfit
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: 'Bridal Sets' | 'Necklaces' | 'Earrings' | 'Bangles & Bracelets' | 'Rings';
  karat: '18K' | '22K';
  goldWeight: number; // in grams
  makingChargePerGram: number; // INR
  wastagePercent: number; // like 1% to 2%
  images: string[]; // at least 4 photos for PDP gallery (from professional jewelry photos)
  style: 'Temple' | 'Kundan' | 'Polki' | 'Contemporary';
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isBridalSet?: boolean;
  certificationNo: string; // BIS Hallmarking certification number
  sizes?: string[]; // size selection for rings/bangles
  length?: string; // for necklaces (e.g., "16 Inches + Adjustable Thread")
  customizable?: boolean;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface BookingDetails {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  regionStylePreference: 'North Indian' | 'South Indian' | 'Bengali' | 'Marwari' | 'No Preference';
  consultationType: 'Virtual (Zoom/WhatsApp)' | 'In-person (Mumbai Flagship)';
  notes?: string;
}

export interface GoldRates {
  '24K': number; // per gram in INR
  '22K': number; // per gram in INR
  '18K': number; // per gram in INR
  updatedTime: string;
}
