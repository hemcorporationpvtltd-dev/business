import type { Metadata } from "next";
import "./globals.css";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { COMPANY_DETAILS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "HEMLIFESTYLE | Artisanal Luxury Leather Goods (Agra Atelier)",
  description:
    "HEMLIFESTYLE (HEM Corporation pvt Ltd). Handcrafted luxury 100% certified full-grain leather bags, jackets, weekenders, and accessories. Founded by Kapil Chahar in Agra.",
  icons: {
    icon: "/logo-mark.png",
    apple: "/logo-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#09090b] text-neutral-100 antialiased selection:bg-amber-400 selection:text-black">
        <ProductProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 w-full bg-[#09090b]">{children}</main>
            <Footer />
            <CartDrawer />
            <Toast />
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
