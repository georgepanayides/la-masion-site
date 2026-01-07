import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import Banner from "@/components/banner/Banner";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileCallButton from "@/components/ui/MobileCallButton";

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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-PQ6BHL36";
  const googleAdsId = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "").trim();

  return (
    <html lang="en">
      <body className={`${brandSans.variable} ${brandSerif.variable} ${geistMono.variable} antialiased`}>
        <GoogleTagManager gtmId={gtmId} />
        {googleAdsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-gtag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                // Prevent an automatic page_view hit (which can't include transaction_id)
                gtag('config', '${googleAdsId}', { send_page_view: false });
              `}
            </Script>
          </>
        ) : null}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:translate-y-0 focus:opacity-100 block m-4 p-2 bg-white rounded-md border border-gray-200 z-50">Skip to main content</a>
        <Banner/>
        <Header/>
        {children}
        <Footer />
        <MobileCallButton />
      </body>
    </html>
  );
}
