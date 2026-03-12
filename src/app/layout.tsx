import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Golden Compass — Your Best Year Ever",
  description:
    "A premium, interactive self-improvement experience. Clear your mind, learn from your past, and set your compass for an extraordinary future.",
  keywords: [
    "self-improvement",
    "goal setting",
    "life planning",
    "personal development",
  ],
  openGraph: {
    title: "The Golden Compass",
    description:
      "A premium, interactive exercise to plan your best year ever.",
    type: "website",
    siteName: "The Golden Compass",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Golden Compass — Your Best Year Ever",
    description:
      "A premium, interactive exercise to plan your best year ever.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
