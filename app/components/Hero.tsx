import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-100px)] grid grid-cols-1 items-end overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 h-full w-full margin-0 object-cover"
      >
        <source src="/videos/la-masion-hero-video.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-t from-stone-800/75 via-stone-800/35 to-transparent" />
      <div className="max-w-4xl mx-auto text-center lg:p-21 p-12 z-10">
        <h1 className="text-xl lg:text-2xl mb-3 text-white font-regular uppercase tracking-wide">La Maison de Aesthetics</h1>
        <p className="max-w-3xl text-cream text-xs md:text-sm tracking-wide uppercase mb-6">Japanese Head Spa — Sunshine Coast</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/treatments" className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-stone bg-rice-paper text-stone-800 text-xs uppercase tracking-widest hover:bg-rice-paper/90 transition min-w-[180px]">View Treatments</Link>
          <a href="https://www.lamaisondeaesthetics.com/store-2" className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-rice-paper/40 text-rice-paper text-xs uppercase tracking-widest hover:bg-stone-800/20 transition min-w-[180px]">Gift Experience</a>
        </div>
      </div>
    </section>
  );
}
