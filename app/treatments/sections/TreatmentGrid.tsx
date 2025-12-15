import Image from "next/image";
import Link from "next/link";
import { treatments } from "../../data/Treatments";

export default function TreatmentGrid() {
  return (
    <section className="py-16 md:py-24 px-3">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header for Context */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-widest text-stone-grey/70 mb-3">
            Find Your Perfect Treatment
          </p>
          <h2 className="text-xl md:text-2xl uppercase tracking-wider text-sumi-ink font-light mb-4">
            Our Rituals
          </h2>
          <p className="text-sm text-stone-grey max-w-2xl mx-auto leading-relaxed">
            Each treatment is designed to restore, rejuvenate, and reconnect you with deep wellness.
          </p>
        </div>

        {/* Grid: Stack on mobile, 2 cols on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {treatments.map((treatment) => (
            <div 
              key={treatment.id}
              className="group bg-warm-white border border-stone-800/15 flex flex-col h-full hover:border-stone-800/40 hover:shadow-lg transition-all duration-300 relative"
            >
              {/* Featured Badge */}
              {treatment.featured && (
                <div className="absolute top-4 right-4 z-10 bg-clay text-warm-white text-[10px] uppercase tracking-widest px-3 py-1.5 font-medium">
                  Most Popular
                </div>
              )}

              {/* Image at Top */}
              <div className="relative aspect-[4/3] overflow-hidden border-b border-stone-800/10">
                <Image
                  src={treatment.image}
                  alt={treatment.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-lg md:text-xl uppercase tracking-wider text-sumi-ink font-normal mb-3">
                    {treatment.name}
                  </h3>
                  <div className="flex items-center gap-3 text-stone-grey">
                    <span className="text-xs uppercase tracking-wider">{treatment.duration}</span>
                    <span className="text-xs">•</span>
                    <span className="text-lg font-light text-sumi-ink">${treatment.price}</span>
                  </div>
                </div>

                {/* Best For Chips */}
                {treatment.bestFor && treatment.bestFor.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {treatment.bestFor.map((tag) => (
                      <span 
                        key={tag}
                        className="inline-block px-3 py-1 bg-clay/10 text-clay text-[10px] uppercase tracking-widest font-medium border border-clay/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                <p className="text-sm leading-relaxed text-stone-grey mb-6 flex-grow">
                  {treatment.description}
                </p>

                {/* Features - Condensed */}
                <div className="mb-6 pb-6 border-t border-stone-800/10 pt-4">
                  <p className="text-[10px] uppercase tracking-widest text-stone-grey/60 mb-3">Includes</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {treatment.features.slice(0, 3).map((feature, idx) => (
                      <span key={feature} className="text-xs text-stone-grey/80">
                        {feature}{idx < Math.min(treatment.features.length - 1, 2) && ' •'}
                      </span>
                    ))}
                    {treatment.features.length > 3 && (
                      <span className="text-xs text-stone-grey/60 italic">+{treatment.features.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Action - Larger CTA */}
                <div className="mt-auto space-y-3">
                  <Link 
                    href={`/treatments/${treatment.id}`}
                    className="block w-full py-3.5 md:py-4 border border-stone-800 bg-stone-800 text-warm-white text-xs uppercase tracking-widest hover:bg-stone-800/90 transition-all duration-300 text-center font-medium"
                  >
                    View Full Details
                  </Link>
                  {treatment.groupPricing && (
                    <p className="text-center text-[10px] uppercase tracking-wider text-stone-grey/60">
                      Package deals available
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center border-t border-stone-800/20 pt-12">
          <p className="text-xs uppercase tracking-widest text-stone-grey/70 mb-4">
            Not sure which treatment is right for you?
          </p>
          <a 
            href="#booking" 
            className="inline-flex items-center gap-2 px-6 py-3 border border-stone-800/30 text-stone-800 text-xs uppercase tracking-widest hover:bg-stone-800 hover:text-warm-white transition-all duration-300"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
