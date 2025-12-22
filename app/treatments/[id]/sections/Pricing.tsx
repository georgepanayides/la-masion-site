import Link from "next/link";

import { bookingAddOns, Treatment } from "../../../data/Treatments";
import PackageDisclaimer from "../../../components/ui/PackageDisclaimer";

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
          {treatment.groupPricing ? (
            <p className="text-sm text-stone-grey">Save with package deals</p>
          ) : (
            <p className="text-sm text-stone-grey">Single session pricing</p>
          )}
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
                      ? "border-stone-800 shadow-lg"
                      : "border-stone-800/15 hover:border-stone-800/30"
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
                  <Link
                    href={`/booking?service=${treatment.id}`}
                    className={`block w-full py-3.5 border text-xs uppercase tracking-widest transition-all font-medium text-center ${
                      index === 1
                        ? "border-stone-800 bg-stone-800 text-warm-white hover:bg-stone-800/90"
                        : "border-stone-800/30 text-stone-800 hover:bg-stone-800 hover:text-warm-white hover:border-stone-800"
                    }`}
                  >
                    Book Now
                  </Link>
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

            <PackageDisclaimer />

            <div className="mt-10 pt-8 border-t border-stone-800/10">
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-stone-grey/70 text-center mb-5">
                Enhancement Add-Ons (Optional)
              </p>
              <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                {bookingAddOns.map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between text-xs text-stone-grey">
                    <span>{addon.name}</span>
                    <span className="text-sumi-ink">+${addon.price}</span>
                  </div>
                ))}
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

              <Link
                href={`/booking?service=${treatment.id}`}
                className="block w-full py-3.5 border border-stone-800 bg-stone-800 text-warm-white text-xs uppercase tracking-widest hover:bg-stone-800/90 transition-all font-medium text-center"
              >
                Book Now
              </Link>

              <div className="mt-8 pt-6 border-t border-stone-800/10">
                <p className="text-[10px] uppercase tracking-widest text-stone-grey/70 text-center mb-4">
                  Enhancement Add-Ons (Optional)
                </p>
                <div className="space-y-2">
                  {bookingAddOns.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between text-xs text-stone-grey">
                      <span>{addon.name}</span>
                      <span className="text-sumi-ink">+${addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
