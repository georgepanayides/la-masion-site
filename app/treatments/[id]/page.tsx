import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { treatments } from "../../data/Treatments";
import Hero from "./sections/Hero";
import BenefitsStrip from "./sections/BenefitsStrip";
import Description from "./sections/Description";
import Pricing from "./sections/Pricing";
import FinalCTA from "./sections/FinalCTA";

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return treatments.map((treatment) => ({
    id: treatment.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const treatment = treatments.find((t) => t.id === id);
  
  if (!treatment) {
    return {
      title: "Treatment Not Found — La Maison de Aesthetics",
    };
  }

  return {
    title: `${treatment.name} — La Maison de Aesthetics`,
    description: treatment.description,
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { id } = await params;
  const treatment = treatments.find((t) => t.id === id);

  if (!treatment) {
    notFound();
  }

  return (
    <main className="antialiased bg-silk-cream min-h-screen">
      <Hero treatment={treatment} />
      <BenefitsStrip />
      <Description treatment={treatment} />
      <Pricing treatment={treatment} />
      <FinalCTA treatmentName={treatment.name} />
    </main>
  );
}
