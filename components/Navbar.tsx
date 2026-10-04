"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, Search, ShieldCheck, Sparkles } from "lucide-react";
import LeatherGuaranteeModal from "./LeatherGuaranteeModal";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [guaranteeOpen, setGuaranteeOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collection", href: "/#shop" },
    { name: "Categories", href: "/#categories" },
    { name: "About Atelier", href: "/about" },
  
  ];

  const isLinkActive = (href: string) => {
    if (href === "/about" && pathname === "/about") return true;
    if (href === "/admin" && pathname === "/admin") return true;
    return false;
  };

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (pathname === "/") {
      const shopEl = document.getElementById("shop");
      if (shopEl) {
        shopEl.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/?search=${encodeURIComponent(searchQuery)}#shop`);
    }
    setSearchOpen(false);
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="w-full bg-[#070709] border-b border-amber-500/20 text-[11px] py-1.5 px-4 text-center text-amber-200/90 font-medium tracking-widest flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
        <span>100% CERTIFIED FULL-GRAIN LEATHER &bull; COMPLIMENTARY INSURED EXPRESS SHIPPING</span>
        <button
          onClick={() => setGuaranteeOpen(true)}
          className="hidden sm:inline-flex items-center gap-1 underline underline-offset-2 text-amber-400 hover:text-amber-300 ml-2 font-semibold"
        >
          View Guarantee &rarr;
        </button>
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#09090b]/95 backdrop-blur-md border-b border-amber-500/25 py-3 shadow-2xl"
            : "bg-[#09090b] border-b border-amber-500/15 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-amber-400/80 hover:text-amber-300 p-1.5 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Luxury Brand Logo ("HEMLIFESTYLE" with the 'HL' monogram) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-amber-500/40 group-hover:border-amber-400 transition-colors shadow-md shrink-0">
              <Image
                src="/logo-mark.png"
                alt="HEMLIFESTYLE Monogram"
                width={44}
                height={44}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-black tracking-[0.22em] text-white font-serif uppercase group-hover:text-amber-200 transition-colors">
                HEM<span className="text-amber-400">LIFESTYLE</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.32em] text-amber-400/70 font-mono -mt-1 hidden sm:block">
                PREMIUM LEATHER GOODS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[12px] uppercase tracking-[0.18em] font-medium transition-colors duration-200 relative py-1 ${
                  isLinkActive(link.href)
                    ? "text-amber-400 font-bold"
                    : "text-neutral-300 hover:text-amber-300"
                }`}
              >
                {link.name}
                {isLinkActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
                )}
              </Link>
            ))}

            {/* Quick Guarantee Badge Link */}
            <button
              onClick={() => setGuaranteeOpen(true)}
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Certified</span>
            </button>
          </nav>

          {/* Right Actions: Search & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input / Button */}
            <div className="relative">
              {searchOpen ? (
                <form
                  onSubmit={handleHeaderSearch}
                  className="flex items-center gap-1.5 animate-in fade-in duration-200"
                >
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search full-grain leather..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-full bg-neutral-900 border border-amber-500/40 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400 w-36 sm:w-56"
                  />
                  <button
                    type="submit"
                    className="p-1.5 text-amber-400 hover:text-amber-300"
                    aria-label="Submit Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1 text-neutral-400 hover:text-white"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-neutral-300 hover:text-amber-400 transition-colors"
                  title="Search Catalog"
                  aria-label="Search Catalog"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Cart Bag Icon with Gold Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-200 hover:text-amber-400 transition-colors group"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8] group-hover:scale-105 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black text-[10px] font-black flex items-center justify-center shadow-lg shadow-amber-500/30">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0c0c10] border-b border-amber-500/30 px-6 py-5 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-300 hover:text-amber-400 py-1 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setGuaranteeOpen(true);
                }}
                className="text-left text-xs uppercase tracking-[0.2em] font-semibold text-amber-400 py-1 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>100% Certified Leather Guarantee</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Leather Guarantee Modal */}
      <LeatherGuaranteeModal
        isOpen={guaranteeOpen}
        onClose={() => setGuaranteeOpen(false)}
      />
    </>
  );
}
