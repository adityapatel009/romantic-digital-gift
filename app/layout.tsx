import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GlobalFloatingHearts from "@/components/GlobalFloatingHearts";
import GlobalRomanticMusic from "@/components/GlobalRomanticMusic";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

/* Fonts (NO EXPORT HERE) */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-accent",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-dancing",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Valentine Gift",
  description: "A beautiful love experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${dancing.variable}`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <AuthProvider>
          <GlobalFloatingHearts />
          <GlobalRomanticMusic />
          <Navbar />
          {children}
        </AuthProvider>

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
