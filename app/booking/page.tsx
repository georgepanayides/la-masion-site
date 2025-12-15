import type { Metadata } from "next";
import BookingPanel from "../components/BookingPanel";

export const metadata: Metadata = {
  title: "Book Your Treatment — La Maison de Aesthetics",
  description: "Schedule your Japanese head spa treatment. Choose your preferred date, time, and ritual for a transformative wellness experience.",
};

export default function BookingPage() {
  return (
    <main className="antialiased bg-silk-cream min-h-screen">
      <BookingPanel />
    </main>
  );
}
