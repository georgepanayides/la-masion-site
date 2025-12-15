import { Treatment } from "../../../data/Treatments";

interface DescriptionProps {
  treatment: Treatment;
}

export default function Description({ treatment }: DescriptionProps) {
  return (
    <section className="py-9 md:py-20 px-4 md:px-6">
      <div className="container max-w-4xl mx-auto">
        {/* Description */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-lg md:text-xl uppercase tracking-wider text-sumi-ink font-light mb-4 md:mb-6">Why Choose This Treatment</h2>
          <p className="text-sm md:text-base leading-relaxed text-stone-grey">
            {treatment.description}
          </p>
        </div>

        {/* Features List */}
        <div>
          <h3 className="text-base md:text-lg uppercase tracking-wider text-sumi-ink font-light mb-6 md:mb-8">What&apos;s Included</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6">
            {treatment.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 border border-stone/10 py-2 px-4 bg-cream/35">
                <span className="text-stone-800/40 text-xs mt-0.5 flex-shrink-0">✦</span>
                <span className="text-xs md:text-sm text-stone-grey leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
