import Image from "next/image";

export default function Hero() {
  return (
    <header className="w-full bg-transparent py-12 md:py-24">
      <div className="container max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl font-serif leading-tight text-sumi-ink">
            Japanese Head Spa in Sunshine Coast — Deep Scalp Detox & Total Relaxation
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-prose">
            A modern, clinical yet indulgent ritual that restores scalp health, relieves tension and leaves hair soft and luminous.
          </p>

          <div className="mt-6 flex gap-3 flex-wrap">
            <a
              href="#book"
              className="inline-block bg-[#2c2823] text-white px-5 py-3 rounded-md shadow-sm hover:opacity-95 transition font-medium"
              aria-label="Book your head spa"
            >
              Book Your Head Spa
            </a>

            <a
              href="tel:+61"
              className="inline-block border border-[#2c2823] px-5 py-3 rounded-md text-[#2c2823] hover:bg-brand-rice-paper transition font-medium"
              aria-label="Call the spa now"
            >
              Call Now
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="w-full md:w-[520px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/la-masion-treatment.png"
              alt="Therapist performing a Japanese head spa on a client"
              width={720}
              height={540}
              className="object-cover w-full h-full block"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
