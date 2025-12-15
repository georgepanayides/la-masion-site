import { Treatment } from "../../../data/Treatments";

interface PricingProps {
  treatment: Treatment;
}

export default function Pricing({ treatment }: PricingProps) {
  return (
    <section id="pricing" className="py-8 md:py-24 px-4 md:px-6">
      <div className="container max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl uppercase tracking-wider text-sumi-ink font-light mb-3">Pricing</h2>
          <p className="text-sm text-stone-grey">Save up to $150 with package deals</p>
        </div>

        {treatment.groupPricing ? (
          <>
            {/* Pricing Cards */}
            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 max-w-4xl mx-auto mb-12">
              {treatment.groupPricing.map((option, index) => (
                <div 
                  key={option.size}
                  className={`relative border p-6 md:p-8 transition-all duration-300 bg-warm-white ${
                    index === 1 
                      ? 'border-stone-800 shadow-lg' 
                      : 'border-stone-800/15 hover:border-stone-800/30'
                  }`}
                >
                  {/* Discount Badge */}
                  {option.discount && (
                    <div className="absolute -top-2.5 right-4">
                      <span className="inline-block bg-stone-800 text-warm-white text-[10px] uppercase tracking-widest px-3 py-1">
                        {option.discount}
                      </span>
                    </div>
                  )}
                  
                  {/* Package Name */}
                  <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-wider text-sumi-ink font-medium mb-1">{option.size}</h3>
                    {index === 1 && (
                      <p className="text-[10px] uppercase tracking-wider text-stone-grey/60">Most Popular</p>
                    )}
                  </div>
                  
                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline justify-start gap-1">
                      <span className="text-base text-stone-grey">$</span>
                      <span className="text-4xl md:text-5xl font-light text-sumi-ink">{option.price}</span>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <button className={`w-full py-3.5 border text-xs uppercase tracking-widest transition-all font-medium ${
                    index === 1
                      ? 'border-stone-800 bg-stone-800 text-warm-white hover:bg-stone-800/90'
                      : 'border-stone-800/30 text-stone-800 hover:bg-stone-800 hover:text-warm-white hover:border-stone-800'
                  }`}>
                    Book Now
                  </button>
                </div>
              ))}
            </div>

            {/* Value Proposition */}
            <div className="text-center py-8 border-t border-stone-800/10">
              <div className="flex flex-row justify-center gap-3">
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-stone-800/40 text-xs">✦</span>
                  <span className="text-xs text-stone-grey">Better Value</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-stone-800/40 text-xs">✦</span>
                  <span className="text-xs text-stone-grey">Consistent Results</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-stone-800/40 text-xs">✦</span>
                  <span className="text-xs text-stone-grey">Valid 12 Months</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-sm mx-auto">
            <div className="border border-stone-800/15 p-8 md:p-10">
              <h3 className="text-xs uppercase tracking-wider text-sumi-ink mb-6 font-medium">Single Session</h3>
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-base text-stone-grey">$</span>
                  <span className="text-5xl font-light text-sumi-ink">{treatment.price}</span>
                </div>
              </div>
              
              <button className="w-full py-3.5 border border-stone-800 bg-stone-800 text-warm-white text-xs uppercase tracking-widest hover:bg-stone-800/90 transition-all font-medium">
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
