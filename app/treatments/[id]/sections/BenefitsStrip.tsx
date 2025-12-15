export default function BenefitsStrip() {
  return (
    <section className="bg-stone-800 py-4 md:py-6">
      <div className="container max-w-6xl mx-auto px-1 md:px-4">
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-8 text-center">
          <div className="flex items-center gap-2 text-warm-white">
            <span className="text-xs">✦</span>
            <span className="text-xs uppercase tracking-wider">Expert Therapists</span>
          </div>
          <div className="flex items-center gap-2 text-warm-white">
            <span className="text-xs">✦</span>
            <span className="text-xs uppercase tracking-wider">Premium Products</span>
          </div>
          <div className="flex items-center gap-2 text-warm-white">
            <span className="text-xs">✦</span>
            <span className="text-xs uppercase tracking-wider">Instant Relaxation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
