"use client";

import Image from "next/image";

export default function SpaceGallery() {
  const images = [
    { src: '/images/la-masion-receiption.png', alt: 'Reception area' },
    { src: '/images/la-masion-receiption.png', alt: 'Main treatment room' },
    { src: '/images/la-masion-receiption.png', alt: 'Product display' },
    { src: '/images/la-masion-receiption.png', alt: 'Entrance hallway' },
    { src: '/images/la-masion-receiption.png', alt: 'Treatment space' },
    { src: '/images/la-masion-receiption.png', alt: 'Interior detail' },
    { src: '/images/la-masion-receiption.png', alt: 'Relaxation lounge' },
    { src: '/images/la-masion-receiption.png', alt: 'Ambient lighting' },
  ];

  return (
    <section 
      id="space" 
      className="relative py-16 md:py-24 bg-sumi-ink"
    >
      {/* Header */}
      <div className="container max-w-6xl mx-auto px-6 mb-12 md:mb-16 text-center">
        <p className="text-xs uppercase tracking-widest text-warm-white/60 mb-3">
          Our Environment
        </p>
        <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 font-light uppercase tracking-[0.12em] text-warm-white">
          The Space
        </h2>
        <p className="max-w-2xl mx-auto text-warm-white/80 text-sm leading-relaxed">
          A sanctuary designed for serenity. Every detail curated to enhance your wellness journey.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="relative overflow-hidden">
        {/* Scrollable container with smooth scroll */}
        <div 
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-8 py-8 snap-x snap-mandatory scroll-smooth"
        >
          {images.map((image, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 snap-center w-[75vw] md:w-[45vw] lg:w-[30vw] group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-800/20">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 75vw, (max-width: 1024px) 45vw, 30vw"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sumi-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image label on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-xs uppercase tracking-widest text-warm-white">
                    {image.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Spacer for end padding */}
          <div className="flex-shrink-0 w-6 md:w-8" />
        </div>

        {/* Gradient overlays to fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-sumi-ink to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-sumi-ink to-transparent pointer-events-none" />
      </div>

      {/* Scroll indicator */}
      <div className="container max-w-6xl mx-auto px-6 mt-8 text-center">
        <p className="text-xs uppercase tracking-wider text-warm-white/50">
          ← Scroll to explore →
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="container max-w-6xl mx-auto px-6 mt-12 md:mt-16 text-center">
        <p className="text-xs uppercase tracking-wider text-warm-white/70 mb-6">
          Experience the environment in person
        </p>
        <a 
          href="#booking"
          className="inline-flex items-center gap-2 px-6 py-3 border border-warm-white/30 text-warm-white text-xs uppercase tracking-widest hover:bg-warm-white hover:text-sumi-ink transition-all duration-300"
        >
          Book Your Visit
        </a>
      </div>
    </section>
  );
}
