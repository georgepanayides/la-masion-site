import Image from "next/image";

export default function Spa() {
  const highlights = [
    {
      title: 'Our Team',
      desc: 'Expert therapists trained in authentic Japanese head spa techniques, combining clinical precision with luxury care.',
      image: '/images/PRINT-23.webp',
      alt: 'La Maison de Aesthetics team'
    },
    {
      title: 'The Space',
      desc: 'A serene, minimal sanctuary designed for renewal. Every detail curated to enhance your wellness journey.',
      image: '/images/la-masion-relax-lounge.png',
      alt: 'Treatment room interior'
    },
    {
      title: 'Our Equipment',
      desc: 'State-of-the-art tools and premium products. Professional-grade technology meets traditional techniques.',
      image: '/images/la-masion-stock.png',
      alt: 'Japanese head spa equipment'
    },
  ];

  return (
    <section id="spa" className="relative py-16 md:py-24 bg-warm-white">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 font-light uppercase tracking-[0.12em] text-sumi-ink">
            The Clinic
          </h2>
          <p className="text-stone-grey text-sm leading-relaxed mb-2">
            Clinical expertise meets luxury wellness. We combine traditional Japanese techniques with modern equipment in a space designed for complete restoration.
          </p>
        </div>

        {/* Image Grid - Mobile: Stack, Desktop: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-12">
          {highlights.map((item) => (
            <div key={item.title} className="group">
              {/* Image */}
              <div className="relative aspect-square mb-6 overflow-hidden border border-stone-800/12">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-sumi-ink/60 via-sumi-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="text-center px-4">
                <h3 className="mb-3 text-sm uppercase tracking-wider text-sumi-ink font-normal">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-stone-grey">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
