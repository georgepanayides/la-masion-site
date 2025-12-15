import Image from "next/image";
import Link from 'next/link';

export default function Benefits() {
  const benefits = [
    { 
      title: 'Stress Relief', 
      desc: 'Unwind with calming, sensory-focused techniques. Reduce tension headaches and daily stress through targeted pressure-point massage.',
      image: '/images/stress-relief.png'
    },
    { 
      title: 'Scalp Health', 
      desc: 'Deeper scalp cleanse for lasting health. Restore and balance with targeted care that removes build-up and promotes circulation.',
      image: '/images/scalp-health2.png'
    },
    { 
      title: 'Hair Vitality', 
      desc: 'Improve hair strength, shine, and manageability. Nourishing treatments that enhance natural lustre and texture.',
      image: '/images/hair-vitality.png'
    },
  ];

  return (
    <section id="benefits" className="relative min-h-screen grid grid-cols-1 items-center bg-silk-cream py-16 md:py-24">
      <div className="relative z-10 container max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 font-light uppercase tracking-wide text-sumi-ink">
            Benefits & Results
          </h2>
          <p className="max-w-2xl mx-auto text-stone-grey text-sm leading-relaxed">
            Clinically inspired, subtly indulgent benefits—visible results and a rejuvenated sense of calm.
          </p>
        </div>

        {/* Image Pillars - Mobile: Stack, Desktop: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title}
              className="group"
            >
              {/* Image Pillar */}
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-warm-white border border-stone-800/12">
                <Image 
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sumi-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Text Content */}
              <div className="text-center">
                <h3 className="mb-3 text-lg uppercase tracking-wider text-sumi-ink font-normal">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-grey">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Note */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-stone-800/20 text-center">
          <p className="text-xs uppercase tracking-widest text-stone-grey/70 mb-8">
            Visible results • Lasting wellness • Renewed calm
          </p>
          
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 px-8 py-3 border border-stone-800 bg-stone-800 text-warm-white text-xs uppercase tracking-widest hover:bg-stone-800/90 transition"
            aria-label="View our treatments"
          >
            View Treatments
          </Link>
        </div>
      </div>
    </section>
  );
}
