import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "الزهور - لخدمات التنظيف والخدمات المنزلية",
  description: "خدمات تنظيف احترافية للمنازل والشقق والفلل في الدمام والمناطق المحيطة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
