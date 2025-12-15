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

export const treatments: Treatment[] = [
  {
    id: 'signature-head-spa',
    name: 'Signature Head Spa',
    duration: '60 min',
    price: '180',
    description: 'Our signature ritual combining deep scalp cleanse, targeted treatment, and pressure-point massage. Ideal for first-time guests.',
    features: ['Consultation', 'Deep Cleanse', 'Scalp Treatment', 'Massage', 'Finishing'],
    image: '/images/la-masion-treatment.png',
    bestFor: ['First-time guests', 'Stress relief', 'Hair health'],
    groupPricing: [
      { size: 'Single Session', price: '180' },
      { size: 'Package of 3', price: '510', discount: 'Save $30' },
      { size: 'Package of 5', price: '810', discount: 'Save $90' }
    ]
  },
  {
    id: 'deep-renewal',
    name: 'Deep Renewal',
    duration: '90 min',
    price: '260',
    description: 'Extended therapy session for intensive restoration. Includes enhanced massage, aromatic infusions, and luxury finishing ritual.',
    features: ['Extended Consultation', 'Double Cleanse', 'Intensive Treatment', 'Extended Massage', 'Luxury Finishing'],
    featured: true,
    image: '/images/scalp-health2.png',
    bestFor: ['Deep relaxation', 'Chronic tension', 'Ultimate luxury'],
    groupPricing: [
      { size: 'Single Session', price: '260' },
      { size: 'Package of 3', price: '720', discount: 'Save $60' },
      { size: 'Package of 5', price: '1150', discount: 'Save $150' }
    ]
  },
  {
    id: 'express-refresh',
    name: 'Express Refresh',
    duration: '30 min',
    price: '95',
    description: 'Quick reset for busy schedules. Focused scalp cleanse and revitalizing massage to restore balance and clarity.',
    features: ['Quick Consultation', 'Cleanse', 'Focused Massage'],
    image: '/images/stress-relief.png',
    bestFor: ['Busy schedules', 'Quick refresh', 'Lunch break'],
    groupPricing: [
      { size: 'Single Session', price: '95' },
      { size: 'Package of 5', price: '425', discount: 'Save $50' }
    ]
  },
  {
    id: 'couples-experience',
    name: 'Couples Experience',
    duration: '60 min',
    price: '340',
    description: 'Share the experience. Two guests enjoy side-by-side signature treatments in our private dual-treatment suite.',
    features: ['Private Suite', 'Dual Treatments', 'Shared Ritual', 'Refreshments'],
    image: '/images/la-masion-relax-lounge.png',
    bestFor: ['Couples', 'Special occasions', 'Shared wellness']
  },
];
