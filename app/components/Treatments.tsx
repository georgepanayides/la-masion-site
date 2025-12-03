export default function Treatments() {
  const treatments = [
    {
      name: 'Signature Head Spa',
      duration: '60 min',
      price: '180',
      description: 'Our signature ritual combining deep scalp cleanse, targeted treatment, and pressure-point massage. Ideal for first-time guests.',
      features: ['Consultation', 'Deep Cleanse', 'Scalp Treatment', 'Massage', 'Finishing']
    },
    {
      name: 'Deep Renewal',
      duration: '90 min',
      price: '260',
      description: 'Extended therapy session for intensive restoration. Includes enhanced massage, aromatic infusions, and luxury finishing ritual.',
      features: ['Extended Consultation', 'Double Cleanse', 'Intensive Treatment', 'Extended Massage', 'Luxury Finishing'],
      featured: true
    },
    {
      name: 'Express Refresh',
      duration: '30 min',
      price: '95',
      description: 'Quick reset for busy schedules. Focused scalp cleanse and revitalizing massage to restore balance and clarity.',
      features: ['Quick Consultation', 'Cleanse', 'Focused Massage']
    },
    {
      name: 'Couples Experience',
      duration: '60 min',
      price: '340',
      description: 'Share the experience. Two guests享受 side-by-side signature treatments in our private dual-treatment suite.',
      features: ['Private Suite', 'Dual Treatments', 'Shared Ritual', 'Refreshments']
    },
  ];

  return (
    <section id="treatments" className="relative py-16 md:py-24 bg-silk-cream">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-stone-grey/70 mb-3">
            Treatment Menu
          </p>
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 font-light uppercase tracking-[0.12em] text-sumi-ink">
            Our Rituals
          </h2>
          <p className="max-w-2xl mx-auto text-stone-grey text-sm leading-relaxed">
            Each treatment is carefully curated to restore, renew, and deeply relax. Choose the ritual that speaks to your needs.
          </p>
        </div>

        {/* Treatments Grid - Mobile: Stack, Desktop: 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {treatments.map((treatment) => (
            <div 
              key={treatment.name}
              className={`relative bg-warm-white border transition-all duration-300 group ${
                treatment.featured 
                  ? 'border-driftwood md:scale-105 shadow-lg' 
                  : 'border-stone-800/12 hover:border-stone-800/25'
              }`}
            >
              {/* Featured Badge */}
              {treatment.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone px-4 py-1">
                  <span className="text-xs uppercase tracking-widest text-warm-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="mb-6 pb-6 border-b border-stone-800/12">
                  <h3 className="text-base md:text-lg uppercase tracking-wider text-sumi-ink font-normal mb-3">
                    {treatment.name}
                  </h3>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-stone-grey">
                      {treatment.duration}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-stone-grey">$</span>
                      <span className="text-2xl font-light text-sumi-ink">{treatment.price}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed text-stone-grey mb-6">
                  {treatment.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {treatment.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="text-stone text-xs mt-0.5">✦</span>
                      <span className="text-xs text-stone-grey">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a 
                  href="#booking"
                  className={`block w-full text-center py-3 text-xs uppercase tracking-widest transition-all duration-300 ${
                    treatment.featured
                      ? 'bg-stone text-warm-white hover:bg-stone-grey'
                      : 'border border-stone-800/20 text-stone-grey hover:border-stone hover:text-stone'
                  }`}
                >
                  Book Now
                </a>
              </div>

              {/* Hover accent line */}
              {!treatment.featured && (
                <div className="absolute bottom-0 left-0 w-0 h-px bg-stone group-hover:w-full transition-all duration-500" />
              )}
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="border-t border-stone-800/20 pt-12">
          <h3 className="text-sm uppercase tracking-wider text-sumi-ink mb-6 text-center">
            Enhancement Add-Ons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Aromatherapy Upgrade', price: '25', desc: 'Custom essential oil blend' },
              { name: 'Extended Massage', price: '45', desc: 'Additional 20 minutes' },
              { name: 'Hair Treatment Mask', price: '35', desc: 'Intensive nourishing mask' },
            ].map((addon) => (
              <div key={addon.name} className="text-center p-6 bg-warm-white border border-stone-800/12">
                <p className="text-xs uppercase tracking-wider text-sumi-ink mb-2">
                  {addon.name}
                </p>
                <p className="text-xs text-stone-grey mb-3">{addon.desc}</p>
                <p className="text-sm font-light text-stone">+${addon.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
