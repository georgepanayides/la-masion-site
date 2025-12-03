export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "La Maison de Aesthetics",
  "description": "Luxury Japanese head spa on the Sunshine Coast providing restorative scalp treatments and relaxing head massages.",
  "url": "https://your-domain.example/",
  "telephone": "+61 ",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sunshine Coast",
    "addressLocality": "Sunshine Coast",
    "addressRegion": "QLD",
    "addressCountry": "AU"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "$$$"
};
