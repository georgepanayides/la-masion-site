import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Banner from "@/components/banner/Banner";

const brandSans = Inter({
  variable: "--font-brand-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const brandSerif = Cormorant_Garamond({
  variable: "--font-brand-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Maison de Aesthetics — Japanese Head Spa",
  description:
    "Luxury Japanese head spa on the Sunshine Coast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${brandSans.variable} ${brandSerif.variable} ${geistMono.variable} antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:translate-y-0 focus:opacity-100 block m-4 p-2 bg-white rounded-md border border-gray-200 z-50">Skip to main content</a>
        <Banner/>
        {children}
        <footer className="border-t border-driftwood/20 py-8 px-6 text-stone">
          <div className="container max-w-6xl mx-auto flex justify-between items-center">
            <small>&copy; {new Date().getFullYear()} La Maison de Aesthetics</small>
            <small>Elegance, reimagined.</small>
          </div>
        </footer>
      </body>
    </html>
  );
}
