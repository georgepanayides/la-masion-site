import { FaHeartbeat, FaCertificate, FaShieldAlt, FaStar } from 'react-icons/fa';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "The most relaxing experience I've ever had. My scalp feels completely renewed and my hair has never looked better. I leave feeling like a different person.",
      author: "Sarah M.",
      location: "Noosa Heads",
      rating: 5,
      treatment: "Signature Head Spa"
    },
    {
      quote: "Professional, luxurious, and genuinely therapeutic. The team knows exactly what they're doing. I've had chronic tension headaches for years—this is the only thing that helps.",
      author: "Michael T.",
      location: "Mooloolaba",
      rating: 5,
      treatment: "Deep Renewal"
    },
    {
      quote: "Incredible attention to detail and such a serene space. I book this monthly as self-care and it's become essential to my wellness routine. Worth every cent.",
      author: "Emma L.",
      location: "Caloundra",
      rating: 5,
      treatment: "Signature Head Spa"
    },
  ];

  const credentials = [
    {
      icon: <FaHeartbeat />,
      title: "Medical Grade Equipment",
      desc: "Professional-grade tools and technology"
    },
    {
      icon: <FaCertificate />,
      title: "Qualified Practitioners",
      desc: "Certified in Japanese head spa techniques"
    },
    {
      icon: <FaShieldAlt />,
      title: "TGA Approved Products",
      desc: "Therapeutic-grade, safety-tested formulations"
    },
    {
      icon: <FaStar />,
      title: "5-Star Rated",
      desc: "Consistently excellent reviews from clients"
    },
  ];

  return (
    <section id="testimonials" className="relative py-16 md:py-24 bg-warm-white">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-stone-grey/70 mb-3">
            Client Reviews
          </p>
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 font-light uppercase tracking-[0.12em] text-sumi-ink">
            What Our Clients Say
          </h2>
          <p className="max-w-2xl mx-auto text-stone-grey text-sm leading-relaxed">
            Hear from our community about their experiences at La Maison de Aesthetics.
          </p>
        </div>

        {/* Google Rating Badge */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-driftwood text-lg">★</span>
              ))}
            </div>
            <span className="text-sm font-light text-stone-grey">5.0</span>
          </div>
          <p className="text-xs uppercase tracking-wider text-stone-grey/70">
            Based on 127+ Google Reviews
          </p>
        </div>

        {/* Testimonials Grid - Mobile: Stack, Desktop: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="bg-silk-cream border border-stone-800/12 p-8 hover:border-stone-800/25 transition-all duration-300 group"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-driftwood text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xs leading-relaxed text-stone-grey mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="pt-4 border-t border-stone-800/12">
                <p className="text-xs uppercase tracking-wider text-sumi-ink font-normal mb-1">
                  {testimonial.author}
                </p>
                <p className="text-xs text-stone-grey/70">{testimonial.location}</p>
                <p className="text-xs text-stone-grey/70 mt-2 italic">{testimonial.treatment}</p>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-driftwood group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Trust Badges / Credentials */}
        <div className="border-t border-stone-800/20 pt-12">
          <h3 className="text-sm uppercase tracking-wider text-sumi-ink mb-8 text-center">
            Clinical Excellence & Trust
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {credentials.map((cred) => (
              <div 
                key={cred.title}
                className="text-center p-8 md:p-6 bg-silk-cream border border-stone-800/12 hover:border-driftwood/40 transition-all duration-300"
              >
                <div className="flex justify-center mb-4 text-clay text-3xl md:text-2xl">
                  {cred.icon}
                </div>
                <p className="text-xs uppercase tracking-wider text-sumi-ink mb-2 font-normal">
                  {cred.title}
                </p>
                <p className="text-xs text-stone-grey/70 leading-relaxed">
                  {cred.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Reviews */}
        <div className="mt-12 text-center">
          <a 
            href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-stone-800/20 text-stone-grey text-xs uppercase tracking-widest hover:border-driftwood hover:text-driftwood transition-all duration-300"
          >
            Read All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
