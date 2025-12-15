import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      <Image
        src="/images/treatments-hero.png"
        alt="La Maison Treatments"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-stone-800/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <p className="text-xs md:text-sm uppercase tracking-widest mb-4">Our Menu</p>
          <h1 className="text-3xl md:text-5xl font-light uppercase tracking-wide">Rituals & Treatments</h1>
        </div>
      </div>
    </section>
  );
}
