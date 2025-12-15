interface FinalCTAProps {
  treatmentName: string;
}

export default function FinalCTA({ treatmentName }: FinalCTAProps) {
  return (
    <section className="py-12 md:py-16 px-4 bg-stone-800">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl uppercase tracking-wide text-warm-white mb-4 font-light">Ready to Experience {treatmentName}?</h2>
        <p className="text-sm text-warm-white/70 mb-6 md:mb-8">Book your appointment today and discover ultimate relaxation</p>
        <a 
          href="#booking"
          className="inline-flex items-center justify-center px-10 py-4 bg-rice-paper text-stone-800 text-xs uppercase tracking-widest hover:bg-rice-paper/90 transition font-medium shadow-xl"
        >
          Book Your Session Now
        </a>
      </div>
    </section>
  );
}
