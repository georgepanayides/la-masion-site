"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SpaceGallery() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const images = [
    { src: '/images/la-masion-receiption.png', alt: 'Reception area', position: 'left' },
    { src: '/images/la-masion-receiption.png', alt: 'Main treatment room', position: 'center' },
    { src: '/images/la-masion-receiption.png', alt: 'Product display', position: 'right' },
    { src: '/images/la-masion-receiption.png', alt: 'Entrance hallway', position: 'left' },
    { src: '/images/la-masion-receiption.png', alt: 'Treatment space', position: 'center' },
    { src: '/images/la-masion-receiption.png', alt: 'Interior detail', position: 'right' },
    { src: '/images/la-masion-receiption.png', alt: 'Relaxation lounge', position: 'center' },
    { src: '/images/la-masion-receiption.png', alt: 'Ambient lighting', position: 'right' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrolled = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight + windowHeight)));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="space" 
      className="relative py-16 md:py-24 bg-sumi-ink overflow-hidden"
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

      {/* Gallery Swiper */}
      <div className="relative">
        <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-4 md:px-8 py-8 snap-x snap-mandatory">
          {images.map((image, idx) => {
            const isCenter = image.position === 'center';
            const isLeft = image.position === 'left';
            const isRight = image.position === 'right';
            
            return (
              <div
                key={idx}
                className={`flex-shrink-0 snap-center relative overflow-hidden group ${
                  isCenter ? 'w-[70vw] md:w-[45vw] lg:w-[35vw]' : 'w-[50vw] md:w-[30vw] lg:w-[25vw]'
                } ${
                  isLeft ? '-translate-y-8' : isRight ? 'translate-y-8' : ''
                }`}
                style={{
                  transform: isCenter 
                    ? `scale(${1 + scrollProgress * 0.05}) translateY(0)` 
                    : isLeft 
                    ? `scale(${1 - scrollProgress * 0.08}) translateY(-2rem)`
                    : `scale(${1 - scrollProgress * 0.08}) translateY(2rem)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      isCenter 
                        ? 'group-hover:scale-110 brightness-100' 
                        : 'group-hover:scale-105 brightness-75 group-hover:brightness-90'
                    }`}
                  />
                  
                  {/* Overlay gradient - stronger on side columns */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isCenter 
                      ? 'bg-gradient-to-t from-sumi-ink/40 to-transparent opacity-0 group-hover:opacity-100'
                      : 'bg-gradient-to-t from-sumi-ink/70 to-transparent'
                  }`} />

                  {/* Center images get subtle label */}
                  {isCenter && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-xs uppercase tracking-widest text-warm-white">
                        {image.alt}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Gradient overlays to fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-sumi-ink to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-sumi-ink to-transparent pointer-events-none" />
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
