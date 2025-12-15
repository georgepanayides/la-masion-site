import Link from 'next/link';

export default function Experience() {
  const steps = [
    { 
      number: "01",
      title: "Consultation", 
      desc: "Personal assessment to understand your scalp health, hair concerns, and wellness goals." 
    },
    { 
      number: "02",
      title: "Deep Cleanse", 
      desc: "Clarifying ritual to remove build-up, toxins, and impurities while promoting scalp balance." 
    },
    { 
      number: "03",
      title: "Scalp Treatment", 
      desc: "Targeted therapy with nourishing serums, essential oils, and precision tools to restore vitality." 
    },
    { 
      number: "04",
      title: "Massage", 
      desc: "Relaxing pressure-point massage to release tension, improve circulation, and promote deep calm." 
    },
    { 
      number: "05",
      title: "Finishing", 
      desc: "Final polish and styling ritual for luminous hair shine and lasting results." 
    },
  ];

  return (
    <section id="experience" className="relative min-h-screen grid grid-cols-1 items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/la-masion-treatment.png)" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-stone-800/75 via-stone-800/25 to-stone-800/75" />
      
      <div className="relative z-10 container max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-2xl lg:text-3xl mb-4 font-regular uppercase tracking-wide text-clay">
            The Experience
          </h2>
          <p className="text-xs md:text-sm uppercase tracking-wider text-silk-cream mb-8">
            What is a Japanese Head Spa?
          </p>
          <p className="max-w-2xl mx-auto text-silk-cream text-sm leading-relaxed">
            A carefully curated sensory ritual combining targeted scalp treatment with expert massage techniques—designed to cleanse, restore, and deeply relax. Experience stress relief, improved circulation, and renewed hair health.
          </p>
        </div>

        {/* Steps - Mobile: Stack, Tablet+: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {steps.map((step, idx) => (
            <div 
              key={step.number} 
              className="relative"
            >
              {/* Mobile: horizontal line between steps */}
              {idx > 0 && (
                <div className="md:hidden absolute -top-4 left-8 w-px h-4 bg-stone-800/20" />
              )}
              
              <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-3">
                {/* Number */}
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full border border-stone-800/20 bg-warm-white/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-xs md:text-sm font-light tracking-widest text-stone-800">
                    {step.number}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex-1 md:text-center">
                  <h3 className="text-md uppercase tracking-wider mb-2 text-warm-white font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-xs leading-relaxed text-silk-cream">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Desktop: connecting line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 -right-3 w-6 h-px bg-stone-800/20" />
              )}
            </div>
          ))}
        </div>

        {/* Sensory Keywords */}
        <div className="mt-16 pt-12 border-t border-clay/20 flex flex-wrap justify-center gap-6 md:gap-8">
          {['Relaxation', 'Stress Relief', 'Scalp Health', 'Hair Shine', 'Deep Calm', 'Renewal'].map((keyword) => (
            <span 
              key={keyword}
              className="text-[0.65rem] uppercase tracking-widest text-clay"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 px-8 py-3 border border-clay bg-warm-white text-stone-800 text-xs uppercase tracking-widest hover:bg-clay/10 transition"
            aria-label="View our treatments"
          >
            View Treatments
          </Link>
        </div>
      </div>
    </section>
  );
}
