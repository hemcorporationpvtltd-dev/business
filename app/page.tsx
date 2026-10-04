"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import CategoryFilter, { FilterCategory } from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import LeatherGuaranteeModal from "@/components/LeatherGuaranteeModal";
import ReturnPolicyModal from "@/components/ReturnPolicyModal";
import { useProducts } from "@/context/ProductContext";
import {
  Search,
  ShieldCheck,
  Award,
  Video,
  ArrowLeftRight,
  Landmark,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";
import { COMPANY_DETAILS, CORE_CATEGORIES } from "@/lib/constants";

export default function HomePage() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [guaranteeOpen, setGuaranteeOpen] = useState(false);
  const [returnPolicyOpen, setReturnPolicyOpen] = useState(false);

  // Track visit telemetry
  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "/" }),
    }).catch(() => {});
  }, []);

  // Empty category counts to prevent errors
const categoryCounts = useMemo(() => {
  return {};
}, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "All" || p.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === "" ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "rating") return (b.rating || 0) - (a.rating || 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100">
      {/* 1. Luxury Hero Section */}
      <Hero />

      {/* 2. 100% Certified Full-Grain Leather Feature Ribbon */}
      <section className="bg-gradient-to-r from-[#0d0d12] via-[#14141c] to-[#0d0d12] border-y border-amber-500/25 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Feature 1 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-amber-500/20">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">
                  100% Certified Full-Grain
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Natural grain, zero synthetics, bespoke Tuscan tanning.
                </p>
                <button
                  onClick={() => setGuaranteeOpen(true)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 underline font-semibold mt-1"
                >
                  Inspect Certificate &rarr;
                </button>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-amber-500/20">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <ArrowLeftRight className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">
                  7-Days Exchange Policy
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Effortless size or silhouette exchange across India.
                </p>
                <button
                  onClick={() => setReturnPolicyOpen(true)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 underline font-semibold mt-1"
                >
                  Policy Terms &rarr;
                </button>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-amber-500/20">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Video className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">
                  Damage-Only Return Protocol
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Mandatory continuous unboxing video requirement.
                </p>
                <button
                  onClick={() => setReturnPolicyOpen(true)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 underline font-semibold mt-1"
                >
                  Unboxing Rules &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Product Categories Showcase (6 Categories) */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold mb-2">
            Maison Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-luxury text-white">
            6 Core Leather Categories
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mt-2 font-light">
            Indulge in master-crafted silhouettes tailored from vegetable-tanned hides and solid brass hardware.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              category: "Women's Leather Bags",
              image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
              
            },
            {
              category: "Men's Leather Bags",
              image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
              
            },
            {
              category: "Leather Jackets",
              image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
             
            },
            {
              category: "Travel Bags",
              image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
             
            },
            {
              category: "Handbags",
              image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80",
             
            },
            {
              category: "Backpacks & Messenger",
              image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
              
            },
          ].map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                setSelectedCategory(cat.category as any);
                document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-neutral-900 border border-amber-500/20 hover:border-amber-400 transition-all duration-300 text-left shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.category}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
              
                <h3 className="text-xs font-bold text-white font-serif group-hover:text-amber-300 transition-colors leading-tight">
                  {cat.category}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Main Shop Catalog Section */}
      <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Section Header & Search/Sort */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-neutral-800 gap-4">
          <div>
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-amber-400 font-semibold">
              The Catalog &bull; {filteredProducts.length} Creations Available
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-luxury text-white mt-1">
              SHOP ALL CREATIONS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search leather creations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 text-xs rounded-full bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 w-44 sm:w-56"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
                >
                  &times;
                </button>
              )}
            </div>

            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(
                  e.target.value as "featured" | "price-asc" | "price-desc" | "rating"
                )
              }
              aria-label="Sort products"
              className="px-3 py-2 text-xs rounded-full bg-neutral-900 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-amber-400 cursor-pointer font-medium"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Patron Rating</option>
            </select>
          </div>
        </div>

        {/* Dynamic Category Filtering Tabs */}
        <div className="mb-10">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          categoryCounts={{}}
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#0e0e12] border border-neutral-800 rounded-2xl p-8">
            <p className="text-sm font-semibold text-neutral-300 mb-4 font-serif">
              No leather pieces located matching your filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black text-xs uppercase tracking-wider font-bold hover:scale-105 transition-transform"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Agra Atelier Craftsmanship & Heritage Section */}
      <section className="border-t border-amber-500/20 py-20 bg-[#070709] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Agra Atelier Heritage
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold font-luxury text-white leading-tight">
                Generational Leather Artistry Under{" "}
                <span className="gold-gradient-text">{COMPANY_DETAILS.owner}</span>
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                Agra has stood for centuries as the epicenter of royal leathercraft and tannery prestige.
                Under the direction of <strong className="text-amber-400">{COMPANY_DETAILS.owner}</strong>,{" "}
                <strong className="text-white">{COMPANY_DETAILS.legalName}</strong> produces pieces that
                honor generational methods while implementing surgical modern tailoring.
              </p>

              <div className="space-y-3 pt-2 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Vegetable Tanning Rituals:</strong> Tannins extracted
                    from mimosa bark and chestnut create leather that breathes and matures gracefully.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Architectural Solid Brass:</strong> Heavy-gauge buckles,
                    clasps, and Swiss-grade zippers that resist tarnishing for decades.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Verified Current Account Settlement:</strong> Safe, direct
                    banking with Punjab National Bank, backed by formal GST invoices.
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-transform hover:scale-105 shadow-md shadow-amber-500/20"
                >
                  Discover Atelier Story
                </Link>
                <button
                  onClick={() => setGuaranteeOpen(true)}
                  className="px-5 py-3 rounded-full bg-neutral-900 text-neutral-200 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider hover:text-amber-300 transition-colors"
                >
                  100% Leather Warranty
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl gold-glow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85"
                  alt="Agra Leather Craftsman Workshop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white font-serif">Agra Master Atelier</p>
                    <p className="text-neutral-400 text-[11px]">
                      {COMPANY_DETAILS.registeredAddress.formatted}
                    </p>
                  </div>
                  <span className="font-mono text-amber-400 font-bold bg-black/60 px-3 py-1 rounded border border-amber-500/40">
                    GSTIN: {COMPANY_DETAILS.gstin}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <LeatherGuaranteeModal
        isOpen={guaranteeOpen}
        onClose={() => setGuaranteeOpen(false)}
      />
      <ReturnPolicyModal
        isOpen={returnPolicyOpen}
        onClose={() => setReturnPolicyOpen(false)}
      />
    </div>
  );
}
