import { Product } from '../types';

export const INITIAL_GOLD_RATES = {
  '24K': 7650, // per gram (as of mid-2026 average market rate in Indian Rupee INR)
  '22K': 7015, // per gram
  '18K': 5740, // per gram
  updatedTime: "Live MCX Feed • Updated 5 mins ago"
};

export const INSTALLED_PINCODES: Record<string, { days: number; cod: boolean }> = {
  '110001': { days: 2, cod: true }, // Delhi
  '400001': { days: 1, cod: true }, // Mumbai
  '560001': { days: 2, cod: true }, // Bangalore
  '600001': { days: 3, cod: true }, // Chennai
  '700001': { days: 3, cod: true }, // Kolkata
  '380001': { days: 2, cod: true }, // Ahmedabad
  '500001': { days: 2, cod: true }, // Hyderabad
  '302001': { days: 2, cod: true }, // Jaipur
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'The Maharaja Rose Cut Polki Choker Set',
    shortDescription: 'Exquisite 22K gold choker adorned with premium uncut Polki diamonds and dangling emerald beads.',
    description: 'Evoking the timeless opulence of princely India, this Maharaja Choker is hand-forged in 22K gold. It features majestic, custom-set uncut Polki diamonds selected for their antique luster, bordered with fine red and green meenakar (enamelling) work on the reverse. The drape is elegantly suspended from heavy hand-spun silk tassels and finishes with natural Russian emerald bead clusters that rest beautifully against the collarbone.',
    category: 'Bridal Sets',
    karat: '22K',
    goldWeight: 68.4,
    makingChargePerGram: 450,
    wastagePercent: 1.5,
    style: 'Polki',
    rating: 4.9,
    reviewsCount: 38,
    isBestseller: true,
    isBridalSet: true,
    certificationNo: 'BIS-HM-916-2917382',
    length: '14 Inches with adjustable heavy silk dori',
    customizable: true,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80', // Polki choker focal
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', // Royal Bride look
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80', // Craftsmanship details
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'  // Luxury packaging
    ],
    reviews: [
      {
        id: 'r1_1',
        userName: 'Ananya Deshmukh',
        userType: 'Bridal Buyer',
        rating: 5,
        comment: 'Absolutely breathtaking! The weight feels incredibly regal, and the polish shines beautifully against traditional red zardozi silk. The transparent price breakup won over my family.',
        date: '2026-04-12',
        location: 'Mumbai, MH',
        avatarSeed: 'ananya',
        skinToneDescription: 'Warm golden skin tone, wore it on a crimson bridal Banarasi sari'
      },
      {
        id: 'r1_2',
        userName: 'Megha Singhania',
        userType: 'Verified Buyer',
        rating: 5,
        comment: 'Received this in fully insured, heavy mahogany box container. The hallmarking standard is laser etched clearly on the hook. Exquisite craft!',
        date: '2026-05-20',
        location: 'Jaipur, RJ',
        avatarSeed: 'megha',
        skinToneDescription: 'Fair olive tone, wore to her reception ceremony'
      }
    ]
  },
  {
    id: 'p2',
    name: 'Kalyani Divine Temple Haramu Necklace',
    shortDescription: 'Intricately handcrafted 22K gold long necklace with Kasu coins and a masterfully chased Lakshmi pendant.',
    description: 'An heirloom piece that channels the temple architecture of Madurai. Handcrafted in 22K yellow gold, the neckpiece forms an exquisite chain of "Kasu" (propitious gold coins), each engraved with the goddess of wealth, Lakshmi. It culminates in a grand, heavy central pendant depicted using traditional south Indian "repoussé" sheet gold work. Garnished with select natural cabochon rubies.',
    category: 'Necklaces',
    karat: '22K',
    goldWeight: 45.2,
    makingChargePerGram: 380,
    wastagePercent: 1.2,
    style: 'Temple',
    rating: 4.8,
    reviewsCount: 24,
    isBestseller: true,
    certificationNo: 'BIS-HM-916-4839201',
    length: '24 Inches with secure adjustable screw hook',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80', // Temple work focal
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80', // Henna-clad traditional photo
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80', // Gold layout
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'r2_1',
        userName: 'Sujatha Iyer',
        userType: 'Verified Buyer',
        rating: 5,
        comment: 'Incredible detail on the Lakshmi pendant. It has premium weight and looks like a royal antique passed down through generations.',
        date: '2026-03-01',
        location: 'Chennai, TN',
        avatarSeed: 'sujatha'
      }
    ]
  },
  {
    id: 'p3',
    name: 'Gulnaz Royal Kundan Jhumkas',
    shortDescription: 'Imperial 22K gold chandelier earrings set with glass-stone Kundan and seed pearl drops.',
    description: 'These grand 22K gold Jhumkas capture Mughal aesthetics with high-precision jadau craft. Glass stones are nestled under meticulous 24K pure gold foils (Kundan technique), resulting in a glowing bezel. The bell displays intricate floral patterns inside and out, finished with clusters of micro seed pearls that sway gracefully.',
    category: 'Earrings',
    karat: '22K',
    goldWeight: 19.4,
    makingChargePerGram: 420,
    wastagePercent: 1.0,
    style: 'Kundan',
    rating: 4.7,
    reviewsCount: 19,
    isNewArrival: true,
    certificationNo: 'BIS-HM-916-5548391',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80', // Antique Kundan earrings look
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80', // Stud earrings close up
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'r3_1',
        userName: 'Riddhi Mehta',
        userType: 'Gifting Customer',
        rating: 4,
        comment: 'Bought this for my daughter’s mehndi. Elegant size and beautifully balanced so they don’t pull or weigh the lobes down too much.',
        date: '2026-05-15',
        location: 'Ahmedabad, GJ',
        avatarSeed: 'riddhi'
      }
    ]
  },
  {
    id: 'p4',
    name: 'Devi Shanti Temple Kada Bangles',
    shortDescription: 'Meticulously chased pair of 22K gold premium bangles with floral leaf relief patterns.',
    description: 'A pair of traditional heavy screw-lock Kadas that symbolize divine protection and grace. Created with high-relief gold work showing elegant floral creepers, traditional lion-head (Vyala) terminal clasps, and a seamless hidden screw-lock. Made of solid 22K gold, allowing a luxury heirloom touch.',
    category: 'Bangles & Bracelets',
    karat: '22K',
    goldWeight: 36.8,
    makingChargePerGram: 350,
    wastagePercent: 1.1,
    style: 'Temple',
    rating: 4.9,
    reviewsCount: 42,
    isBestseller: true,
    certificationNo: 'BIS-HM-916-1029482',
    sizes: ['2.4 (2.25 inch Inner Dia)', '2.6 (2.37 inch Inner Dia)', '2.8 (2.50 inch Inner Dia)'],
    images: [
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80', // Bangles on hands
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', // Ring/Bangle flatlay
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'r4_1',
        userName: 'Kavitha Ramachandran',
        userType: 'Verified Buyer',
        rating: 5,
        comment: 'Absolutely robust and gorgeous. The screw-lock mechanism is robust and very secure. We tested the purity at a local hallmark center and it matched 91.6% perfectly!',
        date: '2026-01-18',
        location: 'Coimbatore, TN',
        avatarSeed: 'kavitha',
        skinToneDescription: 'Warm dusky skin tone, paired with heavy silk bangles'
      }
    ]
  },
  {
    id: 'p5',
    name: 'Linear Rib Aura 18K Sleek Cuff',
    shortDescription: 'Contemporary fluid torque cuff made in polished 18K yellow gold, perfect for premium daily-wear.',
    description: 'Designed for the modern Indian woman who appreciates understated luxury. Crafted in premium 18K yellow gold, this cuff offers high-tensile flexibility with a gorgeous rib-texture detail. It is lightweight, strong, and highly polished, making it perfect to slide on for boardroom meetings or evening catchups.',
    category: 'Bangles & Bracelets',
    karat: '18K',
    goldWeight: 12.6,
    makingChargePerGram: 290,
    wastagePercent: 0.8,
    style: 'Contemporary',
    rating: 4.6,
    reviewsCount: 15,
    isNewArrival: true,
    certificationNo: 'BIS-HM-750-9938472',
    sizes: ['Regular S/M', 'Large L'],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', // Gold jewelry modern look
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', 
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'r5_1',
        userName: 'Priya Sen',
        userType: 'Verified Buyer',
        rating: 5,
        comment: 'Minimal and sleek! I wear this every single day to work. Got so many compliments. High quality shine.',
        date: '2026-06-02',
        location: 'Kolkata, WB',
        avatarSeed: 'priya'
      }
    ]
  },
  {
    id: 'p6',
    name: 'Vaikuntha Lotus Polki Cocktial Ring',
    shortDescription: 'Majestic floral signature ring with prime uncut Polki, finished in ruby-tasselled 22K gold.',
    description: 'An expansive Statement Ring featuring an antique lotus floret concept. A single heavy Polki diamond takes center stage, ringed by meticulously layered 22K petals embellished with bright pink cabochon rubies and beautiful meenakari borders. Ideal as the central accent for festive celebrations and cocktail outfits.',
    category: 'Rings',
    karat: '22K',
    goldWeight: 9.4,
    makingChargePerGram: 440,
    wastagePercent: 1.2,
    style: 'Polki',
    rating: 4.8,
    reviewsCount: 22,
    isBestseller: true,
    certificationNo: 'BIS-HM-916-2910394',
    sizes: ['11 (16.2mm)', '13 (16.8mm)', '15 (17.5mm)', '17 (18.2mm)'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', // Ring close up
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80', // Polki on beautiful hand
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'r6_1',
        userName: 'Shalini Singhal',
        userType: 'Verified Buyer',
        rating: 5,
        comment: 'Adjustable shank makes it easy to wear on any finger. The Polki shine is incredibly deep and rustic. It was the talk of my housewarming party!',
        date: '2026-05-28',
        location: 'New Delhi, DL',
        avatarSeed: 'shalini',
        skinToneDescription: 'Fair neutral skin, paired with ivory silk salwar suite'
      }
    ]
  },
  {
    id: 'p7',
    name: 'Devi Shringar South Temple Hari Haram Set',
    shortDescription: 'Grand royal 22K temple bridal necklace flanked with matched kirthimukha motif earrings.',
    description: 'Created for the ultimate South Indian bride, this grand neckpiece depicts divine motifs with unparalleled fidelity. Traditional goldsmiths meticulously chase the design, taking over 120 hours of manual detailing. Pure 22K gold yields a matte antique luster accented with premium pink rubies, emerald beads, and intricate hand-woven chains.',
    category: 'Bridal Sets',
    karat: '22K',
    goldWeight: 95.8,
    makingChargePerGram: 460,
    wastagePercent: 1.6,
    style: 'Temple',
    rating: 5.0,
    reviewsCount: 16,
    isBridalSet: true,
    certificationNo: 'BIS-HM-916-8839201',
    length: 'Adjustable traditional gold zari thread loop',
    customizable: true,
    images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', // Royal Bride look
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80', // Close detail
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80', 
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'r7_1',
        userName: 'Lakshmi Narayanan',
        userType: 'Bridal Buyer',
        rating: 5,
        comment: 'My daughter looked like a queen in this set for her wedding. Worth every rupee! The customer support from Mitesh Jewellers was remarkable - they sent a home consultant with the test kit.',
        date: '2026-02-14',
        location: 'Kochi, KL',
        avatarSeed: 'lakshmi'
      }
    ]
  },
  {
    id: 'p8',
    name: 'Contemporary Dewdrop 18K hoop Studs',
    shortDescription: 'Asymmetric modern dewdrop pattern earrings crafted in pure 18K rose-gold with hand-burnished highlights.',
    description: 'Our minimalist contemporary hoops are inspired by morning dew on golden leaves. Engineered with a feather-light hollow interior and advanced friction-back post for effortless use, these 18K gold earrings present a stunning high-polish finish that coordinates brilliantly with both desk wears and modern attire.',
    category: 'Earrings',
    karat: '18K',
    goldWeight: 6.2,
    makingChargePerGram: 260,
    wastagePercent: 0.6,
    style: 'Contemporary',
    rating: 4.8,
    reviewsCount: 31,
    certificationNo: 'BIS-HM-750-2910392',
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80', // Minimal gold drop earrings
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'r8_1',
        userName: 'Tanvi Kapoor',
        userType: 'Verified Buyer',
        rating: 5,
        comment: 'So delicate and modern. They catch the light beautifully and are extremely safe for sensitive ears. Loving the sleek design.',
        date: '2026-06-11',
        location: 'Chandigarh, PB',
        avatarSeed: 'tanvi'
      }
    ]
  }
];
