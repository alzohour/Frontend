import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "الزهور | أفضل شركة تنظيف منازل وفلل بالدمام والخبر والمنطقة الشرقية",
  description: "شركة الزهور الأولى للتنظيف والخدمات المنزلية بالمنطقة الشرقية. تنظيف منازل، شقق، فلل بعد التشطيب، غسيل كنب ومجالس بالبخار، وجلي وتلميع الرخام في الدمام، الخبر، الظهران، سيهات والقطيف بأعلى جودة وضمان الرضا.",
  metadataBase: new URL("https://alzohour.runasp.net"),
  alternates: {
    canonical: "https://alzohour.runasp.net",
  },
  keywords: [
    "شركة تنظيف بالدمام",
    "شركة تنظيف بالخبر",
    "شركة تنظيف بالظهران",
    "شركة تنظيف بسيهات",
    "شركة تنظيف بالقطيف",
    "تنظيف منازل بالدمام",
    "تنظيف شقق بالدمام",
    "تنظيف فلل وقصور بالخبر",
    "غسيل كنب بالبخار بالدمام",
    "غسيل مجالس وموكيت بالخبر",
    "جلي وتلميع رخام بالدمام",
    "تنظيف ما بعد التشطيب والترميم",
    "تنظيف وتعقيم المطابخ والحمامات",
    "أفضل شركة تنظيف بالمنطقة الشرقية",
    "مؤسسة الزهور للتنظيف",
    "رقم شركة تنظيف بالدمام 0570094733"
  ],
  authors: [{ name: "شركة الزهور للخدمات المنزلية" }],
  creator: "الزهور للتنظيف والخدمات المنزلية",
  publisher: "الزهور للتنظيف والخدمات المنزلية",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "W0TmOCkhU3MfLIi0qVz5_X6WjWx2LMdjESb2a1oy_oU",
  },
  openGraph: {
    title: "شركة الزهور للتنظيف والخدمات المنزلية | الدمام والخبر والشرقية",
    description: "نظافة احترافية متكاملة للمنازل والمفروشات والرخام بأحدث المعدات الألمانية والإيطالية بالمنطقة الشرقية. احجز الآن بضمان الرضا التام.",
    url: "https://alzohour.runasp.net",
    siteName: "الزهور للتنظيف",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "https://alzohour.runasp.net/hero-bg.webp",
        width: 1200,
        height: 630,
        alt: "شركة الزهور للتنظيف بالدمام والمنطقة الشرقية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "الزهور | أفضل خدمات تنظيف بالدمام والخبر والمنطقة الشرقية",
    description: "تنظيف فلل، شقق، كنب ومجالس بالبخار، جلي رخام بأيدي طواقم محترفة وضمان معتمد.",
    images: ["https://alzohour.runasp.net/hero-bg.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Rich Structured Data (JSON-LD) for LocalBusiness & Rich Search Results
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://alzohour.runasp.net/#business",
    "name": "الزهور للتنظيف والخدمات المنزلية",
    "alternateName": "Al-Zohour Cleaning & Home Services",
    "image": "https://alzohour.runasp.net/logo.png",
    "logo": "https://alzohour.runasp.net/logo.png",
    "telephone": "+966570094733",
    "email": "alzohour2@gmail.com",
    "url": "https://alzohour.runasp.net",
    "priceRange": "$$",
    "currenciesAccepted": "SAR",
    "paymentAccepted": "Cash, Credit Card, Mada, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "حي الشاطئ",
      "addressLocality": "الدمام",
      "addressRegion": "المنطقة الشرقية",
      "postalCode": "32414",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.4207,
      "longitude": 50.0888
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "الدمام",
        "sameAs": "https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D8%AF%D9%85%D8%A7%D9%85"
      },
      {
        "@type": "City",
        "name": "الخبر",
        "sameAs": "https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D8%AE%D8%A8%D8%B1"
      },
      {
        "@type": "City",
        "name": "الظهران",
        "sameAs": "https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D8%B8%D9%87%D8%B1%D8%A7%D9%86"
      },
      {
        "@type": "City",
        "name": "سيهات"
      },
      {
        "@type": "City",
        "name": "القطيف"
      },
      {
        "@type": "City",
        "name": "الجبيل"
      },
      {
        "@type": "City",
        "name": "الأحساء"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "154",
      "reviewCount": "142"
    },
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
      "opens": "07:00",
      "closes": "23:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات التنظيف المتخصصة",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تنظيف الشقق السكنية بالدمام والخبر",
            "description": "تنظيف عميق وشامل لجميع غرف وصالات الشقق مع تعقيم وتلميع الأرضيات والمرافق."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تنظيف الفلل والقصور بالمنطقة الشرقية",
            "description": "باقات تنظيف مخصصة للمساحات الواسعة تشمل الواجهات والمسابح والأحواش والأسطح."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "غسيل الكنب والمفروشات بالبخار الحار",
            "description": "إزالة أصعب البقع والدهون والروائح والتعقيم ضد البكتيريا وحشرات الفراش بأجهزة إيطالية حديثة."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "جلي وتلميع الرخام والبلاط بالكريستال",
            "description": "معالجة الخدوش والفواصل واستعادة اللمعان الزجاجي للرخام الطبيعي والصناعي والجرانيت."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تنظيف وتعقيم المطابخ والحمامات",
            "description": "تفتيت الدهون المحترقة وإزالة التكلسات والتعقيم الشامل بمواد آمنة مصرحة."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تنظيف ما بعد التشطيب والترميم",
            "description": "إزالة بقايا الدهانات والأسمنت والغراء وتجهيز المكان بالكامل للسكن الفوري."
          }
        }
      ]
    }
  };

  // FAQ Schema to get Rich FAQ Snippets in Google Search
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "هل تقومون بتوفير مواد وأجهزة التنظيف معكم؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نعم، يصل الفريق ومعه كافة المعدات والأجهزة الحديثة (أجهزة البخار الحار، ماكينات جلي وتلميع الرخام، مكانس الشفط العميق) بالإضافة لمواد التنظيف والتعقيم المعتمدة والآمنة 100%."
        }
      },
      {
        "@type": "Question",
        "name": "كيف يتم تحديد سعر الخدمة؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "يتم تحديد التكلفة بكل شفافية بناءً على نوع الخدمة (شقق، فلل، أطقم كنب، جلي رخام) ومساحة المكان أو عدد القطع، دون أي رسوم خفية أو تكاليف إضافية بعد الاتفاق."
        }
      },
      {
        "@type": "Question",
        "name": "هل يمكنني طلب الخدمة في نفس اليوم (حجز فوري)؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نعم، لدينا فرق طوارئ وتغطية سريعة في الدمام والخبر والظهران للطلبات العاجلة حسب توفر الفرق في منطقتك وقت الطلب."
        }
      },
      {
        "@type": "Question",
        "name": "كم تستغرق مدة تنفيذ عملية التنظيف؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "يعتمد ذلك على حجم العمل؛ تنظيف الشقق والمجالس يستغرق من ساعتين إلى 4 ساعات، والفلل الكبيرة وما بعد التشطيب من 4 إلى 8 ساعات مع طاقم متعدد لضمان الإنجاز السريع."
        }
      },
      {
        "@type": "Question",
        "name": "هل تقدمون ضماناً على النظافة وجودة العمل؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "بالتأكيد! نلتزم بضمان الرضا بنسبة 100%، حيث تتم معاينة المكان مع المشرف قبل السداد، وفي حال وجود أي ملاحظة يعاد تنظيفها فوراً دون أي تكلفة إضافية."
        }
      },
      {
        "@type": "Question",
        "name": "هل يمكنني الجمع بين أكثر من خدمة في نفس الزيارة؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نعم وبكل تأكيد، كما نوفر باقات خصم خاصة عند الجمع بين تنظيف الشقق وغسيل الكنب بالبخار أو جلي الرخام معاً."
        }
      }
    ]
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="W0TmOCkhU3MfLIi0qVz5_X6WjWx2LMdjESb2a1oy_oU" />
        <link rel="preconnect" href="https://a.basemaps.cartocdn.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${cairo.className} ${cairo.variable}`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
