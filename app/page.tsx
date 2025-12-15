
import type { Metadata } from "next";
import { localBusinessStructuredData } from "./seo/structuredData";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Benefits from "./components/Benefits";
import Spa from "./components/Spa";
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
      <Hero />

      {/* Intro */}
      <section className="py-12 md:py-20 bg-silk-cream">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="md:pt-12 md:pb-12 pt-2 pb-2 flex flex-col items-center">
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

      {/* The Space Gallery */}
      <SpaceGallery />

      {/* Testimonials & Social Proof */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Booking */}
      <BookingPanel />
    </main>
  );
}