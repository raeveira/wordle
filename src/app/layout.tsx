import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raeveira - Wordle",
  description:
    "A simple wordle game made by raeveira that uses social issue words to educate / make people aware of social issues",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Creative Developer",
    "Wordle",
    "Interactive Design",
  ],
  authors: [{ name: "Raeveira", url: "https://raeveira.nl" }],
  creator: "Raeveira",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raeveira.nl",
    title: "Wordle - Raeveira",
    description:
      "A simple wordle game using social issue words to educate / make people aware of social issues.",
    siteName: "raeveira.nl",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "raeveira desktop portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "raeveira · creative developer",
    description:
      "A simple wordle game using social issue words to educate / make people aware of social issues.",
    images: ["/images/og-image.png"],
    creator: "@raeveira",
  },
  icons: {
    icon: "/images/logos/logo-rounded.ico",
    shortcut: "/images/logos/logo-rounded.png",
    apple: "/images/logos/logo-rounded.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
