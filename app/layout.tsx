import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car showroom",
  description: "Browse our collection of premium cars",
  icons: {
    icon: "/final2.png",
  },
  openGraph: {
    title: "Car showroom",
    description: "Browse our collection of premium cars",
    images: ["/final2.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/final2.png"],
  },
};

import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./contexts/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} `}
    >
      <body className="">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
