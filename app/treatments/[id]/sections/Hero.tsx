import Image from "next/image";
import Link from "next/link";
import { Treatment } from "../../../data/Treatments";

interface HeroProps {
  treatment: Treatment;
}

export default function Hero({ treatment }: HeroProps) {
  return (
    <section className="relative h-[60vh] md:h-[70vh] min-h-[500px] w-full overflow-hidden">
      <Image
        src={treatment.image}
        alt={treatment.name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-800/90 via-stone-800/60 to-stone-800/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-16 px-4">
        <div className="text-center text-white max-w-3xl w-full">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-light uppercase tracking-wide mb-4 md:mb-6">{treatment.name}</h1>
          <div className="flex items-center justify-center gap-3 md:gap-4 text-xs md:text-sm uppercase tracking-wider mb-6 md:mb-8">
            <span>{treatment.duration}</span>
            <span>•</span>
            <span>From ${treatment.price}</span>
          </div>
          
          {/* Primary CTA - Above the fold */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-rice-paper text-stone-800 text-xs uppercase tracking-widest hover:bg-rice-paper/90 transition font-medium shadow-lg"
            >
              View Pricing
            </a>
            <Link 
              href={`/booking?service=${treatment.id}`}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-rice-paper text-rice-paper text-xs uppercase tracking-widest hover:bg-rice-paper/10 transition"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
