import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://akmiecik.pl"),
  title: "Adrian Kmiecik — sprzedaż B2B i produkty cyfrowe",
  description:
    "Key Account Manager w branży ciężarowej. Buduję własne produkty: Smilerate, iAtlas, dbajOBHP. Zadzwoń: +48 664 430 080.",
  openGraph: {
    title: "Adrian Kmiecik",
    description: "Sprzedaję. Buduję. Dowożę.",
    url: "https://akmiecik.pl",
    locale: "pl_PL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05080a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
