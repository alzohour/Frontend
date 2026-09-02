import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "الزهور | أفضل خدمات تنظيف وتعقيم المنازل والفلل بالدمام والخبر",
  description: "خدمات تنظيف احترافية للمنازل والشقق والفلل والكنب بالبخار وجلي الرخام في الدمام، الخبر، الظهران، سيهات، والقطيف. عمالة مدربة وأجهزة حديثة.",
  keywords: [
    "شركة تنظيف بالدمام",
    "تنظيف منازل بالدمام",
    "غسيل كنب بالبخار الخبر",
    "جلي رخام بالدمام",
    "تنظيف شقق بعد التشطيب",
    "شركة تنظيف بالخبر",
    "شركة تنظيف بالظهران",
    "تنظيف فلل الشرقية",
    "مؤسسة الزهور للتنظيف"
  ],
  verification: {
    google: "W0TmOCkhU3MfLIi0qVz5_X6WjWx2LMdjESb2a1oy_oU",
  },
  openGraph: {
    title: "الزهور | لخدمات التنظيف والتعقيم المنزلي بالمنطقة الشرقية",
    description: "نظافة تدوم وراحة تدوم أكثر - تنظيف شقق، فلل، كنب بالبخار، وجلي رخام بأعلى جودة.",
    url: "https://alzohour.runasp.net",
    siteName: "الزهور للخدمات المنزلية",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "الزهور للتنظيف والخدمات المنزلية",
    "image": "https://alzohour.runasp.net/logo.png",
    "telephone": "+966570094733",
    "email": "alzohour2@gmail.com",
    "url": "https://alzohour.runasp.net",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "الدمام",
      "addressRegion": "المنطقة الشرقية",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.4207,
      "longitude": 50.0888
    },
    "areaServed": [
      { "@type": "City", "name": "الدمام" },
      { "@type": "City", "name": "الخبر" },
      { "@type": "City", "name": "الظهران" },
      { "@type": "City", "name": "سيهات" },
      { "@type": "City", "name": "القطيف" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "22:00"
    }
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="W0TmOCkhU3MfLIi0qVz5_X6WjWx2LMdjESb2a1oy_oU" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
