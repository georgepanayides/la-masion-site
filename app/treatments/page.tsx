import type { Metadata } from "next";
import Hero from "./sections/Hero";
import TreatmentGrid from "./sections/TreatmentGrid";

export const metadata: Metadata = {
  title: "Treatments & Rituals — La Maison de Aesthetics",
  description: "Explore our menu of Japanese head spa rituals. From express refresh to deep renewal, find the perfect treatment for your scalp and hair health.",
};

export default function TreatmentsPage() {
  return (
    <main className="antialiased bg-silk-cream min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Treatments Grid */}
      <TreatmentGrid />
    </main>
  );
}

