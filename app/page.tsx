
import type { Metadata } from "next";
import Image from "next/image";
import { localBusinessStructuredData } from "./seo/structuredData";
import Experience from "./components/Experience";
import Benefits from "./components/Benefits";
import Spa from "./components/Spa";
import Treatments from "./components/Treatments";
import Testimonials from "./components/Testimonials";
import SpaceGallery from "./components/SpaceGallery";
import FAQ from "./components/FAQ";
import BookingPanel from "./components/BookingPanel";

export const metadata: Metadata = {
  title: "Japanese Head Spa Sunshine Coast — La Maison de Aesthetics",
  description: "Luxury Japanese head spa on the Sunshine Coast — restorative scalp treatments, massage and lasting results.",
  openGraph: {
    title: "La Maison de Aesthetics — Japanese Head Spa, Sunshine Coast",
    description: "Luxury Japanese head spa. Deep scalp detox, relaxing massage and renewed hair health.",
    images: [
      {
        url: "/images/la-masion-treatment.png",
        width: 1200,
        height: 630,
        alt: "La Maison treatment room"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "La Maison de Aesthetics — Head Spa",
    description: "Book a restorative Japanese head spa on the Sunshine Coast",
  }
};

export default function Home() {
  return (
    <main id="main-content" className="antialiased">
      <script type="application/ld+json">{JSON.stringify(localBusinessStructuredData)}</script>

      {/* Hero */}
      <section id="home" className="relative min-h-screen grid grid-cols-1 items-end bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(images/la-masion-receiption.png)" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-800/75 via-stone-800/35 to-transparent" />
        <div className="max-w-4xl mx-auto text-center lg:p-21 p-12 z-10">
            <h1 className="text-xl lg:text-2xl mb-3 text-white font-regular uppercase tracking-wide">La Maison de Aesthetics</h1>
            <p className="max-w-3xl text-cream text-sm tracking-wide uppercase mb-6">Japanese Head Spa — Sunshine Coast</p>
            <a href="#booking" className="inline-flex items-center gap-2 px-6 py-3 border border-stone bg-rice-paper text-stone-800 text-xs uppercase tracking-widest">Book an Appointment</a>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-20 bg-silk-cream">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="pt-12 pb-12 flex flex-col items-center">
            <hr className="text-sand-stone w-1/3 pb-9"/>
            <p className="text-center text-xs md:text-sm uppercase tracking-wide leading-loose text-stone-grey font-light">
              La Maison de Aesthetics is the Sunshine Coast&apos;s premier destination for authentic Japanese head spa treatments.
              We specialise in restorative scalp therapy, combining traditional techniques with modern wellness.
              Our signature rituals promote deep relaxation, improved circulation, and lasting hair health.
              Experience personalised care in a serene, minimal environment designed for renewal.
            </p>
            <hr className="text-sand-stone w-1/3 mt-9"/>
          </div>
        </div>
      </section>

      {/* Experience */}
      <Experience />

      {/* Benefits */}
      <Benefits />

      {/* Spa & Equipment */}
      <Spa />

      {/* Treatments Menu */}
      <Treatments />

      {/* Testimonials & Social Proof */}
      <Testimonials />

      {/* The Space Gallery */}
      <SpaceGallery />

      {/* FAQ */}
      <FAQ />

      {/* Booking */}
      <BookingPanel />
    </main>
  );
}