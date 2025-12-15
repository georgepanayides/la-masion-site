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
    duration: '70 min',
    price: '195',
    description: 'A deeply restorative journey designed to melt away stress and restore balance. This immersive experience combines therapeutic massage, aromatic rituals, and hydrating treatments to leave you feeling completely renewed.',
    features: [
      'Welcome ritual',
      'Aromatherapy relaxation & warm oil scalp massage',
      'Exfoliating scalp treatment',
      'Hydrating deep cleansing shampoo',
      'Blissful scalp massage',
      'Nourishing conditioner',
      'Halo Water therapy & head, neck, shoulders massage',
      'Hydrating steam therapy & deep moisture hair treatment',
      'Face, neck, shoulders & arms massage',
      'Hydrating leave-in serum',
      'Hot towel therapy',
      'Gentle dry-off'
    ],
    image: '/images/la-masion-treatment.png',
    bestFor: ['Stress relief', 'Deep hydration', 'Mental clarity'],
    groupPricing: [
      { size: 'Single Session', price: '195' },
      { size: 'Package of 3', price: '555', discount: 'Save $30' },
      { size: 'Package of 5', price: '875', discount: 'Save $100' }
    ]
  },
  {
    id: 'revival-ritual',
    name: 'The Revival Ritual',
    duration: '90 min',
    price: '260',
    description: 'A transformative sensory escape that awakens the senses and revitalizes from within. This extended treatment combines ancient healing techniques with modern therapies to restore vitality, promote hair growth, and release deep-seated tension.',
    features: [
      'Welcome ritual & scalp health check',
      'Essential oil ritual & warm head, neck, shoulders oil massage',
      'Soothing scalp exfoliation',
      'Sensory deep hair cleanse & scalp massage',
      'Floral warm hair growth drip',
      'Scalp conditioner & firming facial massage',
      'Halo Water therapy (waterfall head bath)',
      'Extended scalp massage',
      'Hydrating steam therapy & deep moisture hair treatment',
      'Tension-relieving head, neck, shoulders & arms massage',
      'Cooling Gua Sha therapy',
      'Hot towel therapy',
      'Gentle dry-off',
      'Ayurvedic tea & dessert'
    ],
    featured: true,
    image: '/images/scalp-health2.png',
    bestFor: ['Hair growth', 'Deep tension relief', 'Complete renewal'],
    groupPricing: [
      { size: 'Single Session', price: '260' },
      { size: 'Package of 3', price: '735', discount: 'Save $45' },
      { size: 'Package of 5', price: '1170', discount: 'Save $130' }
    ]
  },
  {
    id: 'premium-serenity-ritual',
    name: 'Premium Serenity Ritual',
    duration: '120 min',
    price: '340',
    description: 'Our signature luxury experience — a multisensory healing journey that harmonizes body, mind, and spirit. This comprehensive ritual combines cutting-edge AI scalp analysis, advanced facial treatments, and therapeutic bodywork for the ultimate in holistic wellness and rejuvenation.',
    features: [
      'Welcome essential oil ritual & aroma foot soak',
      'Comprehensive AI scalp & skin analysis',
      'Warm oil therapy & acupressure point scalp massage',
      'Detoxifying gentle exfoliating scalp treatment',
      'Double shampoo cleanse with signature massage',
      'Soothing waterfall rinse',
      'Nourishing serum & conditioning hair treatment',
      'Rejuvenating custom facial',
      'Grounding neck, shoulders & arm massage',
      'Soothing upper body massage & face reflexology',
      'Meridian Gua Sha massage',
      'Shoulder & neck relaxation therapy',
      'Facial lymphatic massage & face sculpt',
      'Youth renewal eye mask',
      'Hydrating steam therapy & nourishing hair mask',
      'Leave-in restorative conditioner',
      'Foot reflexology massage',
      'Gentle dry-off or blow dry',
      'Post-treatment beverage & dessert'
    ],
    featured: true,
    image: '/images/la-masion-relax-lounge.png',
    bestFor: ['Ultimate luxury', 'Complete transformation', 'Special occasions'],
    groupPricing: [
      { size: 'Single Session', price: '340' },
      { size: 'Package of 3', price: '969', discount: 'Save $51' },
      { size: 'Package of 5', price: '1530', discount: 'Save $170' }
    ]
  },
  {
    id: 'prenatal-blossom-ritual',
    name: 'Prenatal Blossom Ritual',
    duration: '60 min',
    price: '185',
    description: 'A gentle, nurturing treatment designed exclusively for expectant mothers. Using pregnancy-safe products and specialized techniques, this soothing ritual relieves stress, enhances circulation, and promotes scalp health while providing the care and comfort you deserve during this special time. Adjustable support and positioning ensure complete relaxation.',
    features: [
      'Welcome ritual',
      'Gentle scalp exfoliation (optional)',
      'Deep double cleanse',
      'Pregnancy-safe scalp massage & relaxing techniques',
      'Waterfall therapy',
      'Face, neck & shoulders massage',
      'Nourishing & repairing hair treatment',
      'Gentle foot massage',
      'Adjustable lower back support',
      'Gentle dry-off',
      'Herbal tea & light refreshment'
    ],
    image: '/images/stress-relief.png',
    bestFor: ['Expectant mothers', 'Stress relief', 'Safe relaxation'],
    groupPricing: [
      { size: 'Single Session', price: '185' },
      { size: 'Package of 3', price: '525', discount: 'Save $30' }
    ]
  },
];
