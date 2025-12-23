export interface Treatment {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
  image: string;
  featured?: boolean;
  bestFor?: string[];
  groupPricing?: {
    size: string;
    price: string;
    discount?: string;
  }[];
}

export interface AddOn {
  id: string;
  name: string;
  duration?: string;
  price: string;
  description: string;
  category: 'beauty' | 'massage' | 'facial' | 'therapy';
}

export interface BookingAddOn {
  id: string;
  name: string;
  price: number;
}

// Head spa enhancements shown during booking and under treatment pricing.
export const bookingAddOns: BookingAddOn[] = [
  { id: 'reflexology', name: 'Reflexology Foot Massage', price: 40 },
  { id: 'facial-sculpt', name: 'Facials Sculpt Massage', price: 40 },
  { id: 'collagen-eye', name: 'Collagen Eye Treatment', price: 30 },
  { id: 'magnesium-soak', name: 'Magnesium Foot Soak', price: 25 },
  { id: 'aromatherapy', name: 'Aromatherapy Upgrade', price: 25 },
  { id: 'massage', name: 'Extended Massage', price: 45 },
  { id: 'mask', name: 'Hair Treatment Mask', price: 35 },
];

export const addOns: AddOn[] = [
  // Beauty
  { id: 'brow-wax-tint', name: 'Brow Wax & Tint', duration: '20 min', price: '45', description: 'Shape and define your brows with professional waxing and tinting for a polished, natural look.', category: 'beauty' },
  { id: 'lash-tint', name: 'Lash Tint', duration: '15 min', price: '35', description: 'Enhance your natural lashes with a subtle tint for definition without mascara.', category: 'beauty' },
  
  // Massage
  { id: 'foot-scrub-massage', name: 'Foot Scrub & Massage', duration: '20 min', price: '40', description: 'Exfoliating foot treatment followed by a relaxing massage to restore tired feet.', category: 'massage' },
  { id: 'pedicure', name: 'Pedicure', duration: '45 min', price: '65', description: 'Complete foot care including soak, exfoliation, nail shaping, cuticle care, and polish.', category: 'beauty' },
  { id: 'back-massage', name: 'Back Massage', duration: '30 min', price: '55', description: 'Targeted massage to release tension and knots in the back and shoulders.', category: 'massage' },
  { id: 'hot-stone-massage', name: 'Hot Stone Massage', duration: '30 min', price: '70', description: 'Therapeutic massage using heated stones to melt away deep muscle tension.', category: 'massage' },
  
  // Facial Treatments
  { id: 'eye-mask', name: 'Youth Renewal Collagen Eye Mask', duration: '15 min', price: '25', description: 'Intensive collagen eye treatment to reduce puffiness, dark circles, and fine lines.', category: 'facial' },
  { id: 'gua-sha', name: 'Gua Sha Massage', duration: '20 min', price: '35', description: 'Traditional Chinese facial massage technique to sculpt, lift, and promote lymphatic drainage.', category: 'facial' },
  { id: 'mini-facial', name: 'Mini Facial', duration: '30 min', price: '60', description: 'Express facial treatment including cleanse, exfoliation, mask, and hydration.', category: 'facial' },
  { id: 'dermaplaning', name: 'Dermaplaning', duration: '30 min', price: '85', description: 'Exfoliating treatment that removes dead skin and peach fuzz for instant radiance.', category: 'facial' },
  
  // Therapy
  { id: 'led-therapy', name: 'LED Light Therapy', duration: '20 min', price: '40', description: 'Advanced light therapy to target skin concerns, promote healing, and boost collagen.', category: 'therapy' },
];

export const treatments: Treatment[] = [
  {
    id: 'tranquility-ritual',
    name: 'Tranquility Ritual',
    duration: '90 min',
    price: '260',
    description: 'A restorative Japanese head spa ritual designed to ease tension, deeply cleanse, and hydrate the scalp and hair while supporting full-body relaxation.',
    features: [
      'Signature welcome ritual',
      'Aromatherapy relaxation with warm oil scalp, neck & shoulder massage',
      'Refining exfoliating scalp treatment',
      'Blissful therapeutic scalp massage',
      'Hydrating deep-cleansing shampoo',
      'Halo water therapy with scalp massage',
      'Nourishing conditioner',
      'Hydrating steam therapy with deep moisture hair treatment',
      'Grounding neck, shoulders & arm massage',
      'Hydrating leave-in serum',
      'Luxurious hot towel therapy',
      'Facial lymphatic drainage massage',
      'Gentle dry-off',
      'Ayurvedic herbal tea'
    ],
    image: '/images/la-masion-treatment.png',
    bestFor: ['Deep relaxation', 'Scalp hydration', 'Stress relief'],
    groupPricing: [
      { size: 'Single Session', price: '260' },
      { size: 'Package of 3', price: '700', discount: 'Save $80' },
      { size: 'Package of 5', price: '1100', discount: 'Save $200' }
    ]
  },
  {
    id: 'revival-ritual',
    name: 'The Revival Ritual',
    duration: '120 min',
    price: '355',
    description: 'An extended head spa experience with deeper cleansing, hydration, and a rejuvenating custom facial for complete renewal from scalp to skin.',
    features: [
      'Signature welcoming ritual',
      'Aromatherapy relaxation with warm oil scalp, neck & shoulder massage',
      'Soothing scalp exfoliation',
      'Blissful therapeutic scalp massage',
      'Sensory deep hair cleanse',
      'Nourishing scalp conditioner with firming facial massage',
      'Halo water therapy with scalp massage',
      'Hydrating steam therapy & deep moisture hair treatment',
      'Tension-relieving head, neck, shoulders & arm massage',
      'Hydrating leave-in serum',
      'Luxurious hot towel therapy',
      'Rejuvenating custom facial',
      'Facial lymphatic drainage massage',
      'Cooling ice globes therapy',
      'Youth-renewal eye mask',
      'Gentle dry-off',
      'Ayurvedic tea & artisanal dessert'
    ],
    featured: true,
    image: '/images/treatments-hero.png',
    bestFor: ['Full reset', 'Deep tension relief', 'Skin + scalp renewal'],
    groupPricing: [
      { size: 'Single Session', price: '355' },
      { size: 'Package of 3', price: '960', discount: 'Save $105' },
      { size: 'Package of 5', price: '1510', discount: 'Save $265' }
    ]
  },
  {
    id: 'premium-serenity-ritual',
    name: 'Premium Serenity Ritual',
    duration: '150 min',
    price: '410',
    description: 'Our most indulgent ritual combining advanced scalp therapy, hot stone bodywork, facial sculpting, and restorative treatments for full-body serenity.',
    features: [
      'Welcome essential oil ritual with aromatic foot soak',
      'Warm oil therapy with acupressure scalp massage',
      'Hot stone upper-body massage',
      'Soothing facial reflexology',
      'Gentle detoxifying scalp exfoliation',
      'Double shampoo cleanse with signature massage',
      'Nourishing serum & conditioning hair treatment',
      'Shoulder, neck & arm relaxation therapy',
      'Floral warm hair-growth drip',
      'Soothing waterfall rinse',
      'Hydrating steam therapy with nourishing hair mask',
      'Leave-in restorative conditioner',
      'Rejuvenating custom facial',
      'Facial lymphatic massage & sculpting therapy',
      'Youth-renewal eye mask',
      'Meridian Gua Sha massage',
      'Revitalising foot reflexology',
      'Gentle dry-off or professional blow-dry',
      'Post-treatment beverage & artisanal dessert'
    ],
    featured: true,
    image: '/images/treatment-2.png',
    bestFor: ['Ultimate luxury', 'Complete transformation', 'Special occasions'],
    groupPricing: [
      { size: 'Single Session', price: '410' },
      { size: 'Package of 3', price: '1110', discount: 'Save $120' },
      { size: 'Package of 5', price: '1745', discount: 'Save $305' }
    ]
  },
  {
    id: 'prenatal-blossom-ritual',
    name: 'Prenatal Blossom Ritual',
    duration: '75 min',
    price: '250',
    description: 'A gentle, pregnancy-safe head spa ritual designed for comfort, hydration, and relaxation with supportive positioning and nurturing massage.',
    features: [
      'Signature welcome ritual',
      'Indulgent face, neck, shoulders & arms massage',
      'Pregnancy-safe warm oil scalp massage',
      'Personalised comfort with adjustable lower-back support',
      'Optional purifying scalp exfoliation',
      'Deep hydrating double cleanse',
      'Signature waterfall therapy with scalp massage',
      'Nourishing, restorative hair treatment',
      'Luxurious hot towel therapy',
      'Hydrating leave-in serum',
      'Revitalising foot reflexology',
      'Gentle dry-off',
      'Curated/natural herbal tea & light refreshment'
    ],
    image: '/images/stress-relief.png',
    bestFor: ['Expectant mothers', 'Stress relief', 'Safe relaxation'],
    groupPricing: [
      { size: 'Single Session', price: '250' },
      { size: 'Package of 3', price: '675', discount: 'Save $75' },
      { size: 'Package of 5', price: '1065', discount: 'Save $185' }
    ]
  },
];
