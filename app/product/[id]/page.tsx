"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import LeatherGuaranteeModal from "@/components/LeatherGuaranteeModal";
import ReturnPolicyModal from "@/components/ReturnPolicyModal";
import {
  Star,
  ShoppingBag,
  Zap,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  ArrowLeftRight,
  Video,
  Award,
  Landmark,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/constants";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const router = useRouter();

  const { products, getProductById } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [guaranteeOpen, setGuaranteeOpen] = useState(false);
  const [returnPolicyOpen, setReturnPolicyOpen] = useState(false);

  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#09090b] text-neutral-100">
        <h1 className="text-3xl font-luxury font-bold gold-gradient-text mb-2">
          Piece Not Located
        </h1>
        <p className="text-xs text-neutral-400 max-w-sm mb-6">
          This creation may have been archived or belongs to an exclusive private vault collection.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-amber-500/20"
        >
          Return to Atelier Gallery
        </Link>
      </div>
    );
  }

  const galleryImages = [
    product.image,
    ...(product.additionalImages || []),
  ];

  const currentImage = galleryImages[selectedImageIndex] || product.image;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <div className="min-h-screen bg-[#09090b] text-neutral-100 py-8 sm:py-14 bg-leather-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap">
            <Link
              href="/"
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Maison Atelier</span>
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400">{product.category}</span>
            <span className="text-neutral-600">/</span>
            <span className="text-amber-300 font-semibold truncate max-w-xs">
              {product.title}
            </span>
          </nav>

          {/* Product Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column: Image Viewer & Gallery Thumbnails */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-20 rounded-lg overflow-hidden border transition-all ${
                        selectedImageIndex === idx
                          ? "border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/20"
                          : "border-neutral-800 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Primary Image */}
              <div className="relative flex-1 aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-amber-500/30 shadow-2xl gold-glow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                  <div className="bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-amber-500/40 uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>100% Certified Full-Grain Leather</span>
                  </div>

                  {discountPercent && (
                    <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-black px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider w-max shadow-md">
                      {discountPercent}% OFF
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Narrative & Luxury Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Star Rating */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-amber-400/90 font-semibold">
                    {product.category}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{product.rating || 4.9}</span>
                    <span className="text-neutral-500">
                      ({product.reviewCount || 34} artisan reviews)
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3 font-luxury leading-tight">
                  {product.title}
                </h1>

                {/* Prominent Leather Guarantee Banner */}
                <div className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        100% Premium Certified Leather
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        Inspected &amp; Certified in Agra Atelier
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setGuaranteeOpen(true)}
                    className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold tracking-wider shrink-0"
                  >
                    View Cert &rarr;
                  </button>
                </div>

                {/* Pricing in INR ₹ */}
                <div className="flex items-baseline gap-3 mb-6 p-4 rounded-xl bg-[#121217] border border-amber-500/25">
                  <span className="text-3xl font-bold text-amber-400 font-mono">
                    {formattedPrice}
                  </span>
                  {formattedOriginalPrice && (
                    <span className="text-sm text-neutral-500 line-through font-mono">
                      {formattedOriginalPrice}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="text-xs font-extrabold text-black bg-amber-400 px-2 py-0.5 rounded font-mono">
                      SAVE {discountPercent}%
                    </span>
                  )}
                  <span className="text-[11px] text-neutral-400 ml-auto font-mono">
                    GST Included
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xs uppercase font-mono tracking-widest text-amber-400/90 mb-2">
                    Artisan Narrative &amp; Craft
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                {/* Technical Specifications */}
                <div className="mb-6 p-4 rounded-xl bg-[#0e0e12] border border-neutral-800 space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-400">Leather Grade</span>
                    <span className="text-amber-300 font-medium text-right">
                      {product.details?.material || "100% Full-Grain Vegetable-Tanned Hide"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-400">Dimensions</span>
                    <span className="text-neutral-200 font-medium text-right font-mono">
                      {product.details?.dimensions || "Artisanal Tailored Proportion"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-400">Hardware &amp; Clasps</span>
                    <span className="text-neutral-200 font-medium text-right">
                      {product.details?.hardware || "Solid Antiqued Brass & Heavy-Duty Zips"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-400">Artisan Origin</span>
                    <span className="text-neutral-200 font-medium text-right">
                      {product.details?.origin || "Agra Atelier, Uttar Pradesh, India"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Craft Warranty</span>
                    <span className="text-amber-400 font-semibold text-right">
                      {product.details?.warranty || "5-Year HEM Master Warranty"}
                    </span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs uppercase font-mono tracking-wider text-neutral-400">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden bg-neutral-900">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3.5 text-xs font-bold text-white min-w-[28px] text-center font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    In Stock &bull; Agra Atelier Ready
                  </span>
                </div>

                {/* Action Buttons: Add to Bag and Buy Now */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 px-6 rounded-full bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-amber-500/40 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:border-amber-400"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Bag</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Zap className="w-4 h-4 fill-black" />
                    <span>BUY NOW</span>
                  </button>
                </div>
              </div>

              {/* Built-in Key Business Policies Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-neutral-800 text-xs">
                {/* Policy 1: 7-Days Exchange */}
                <button
                  onClick={() => setReturnPolicyOpen(true)}
                  className="p-3.5 rounded-xl bg-[#0e0e12] border border-neutral-800 hover:border-amber-500/40 transition-colors text-left flex items-start gap-2.5 group"
                >
                  <ArrowLeftRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-neutral-200 group-hover:text-amber-300">
                      7-Days Exchange Policy
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Complimentary size/style doorstep exchange.
                    </p>
                  </div>
                </button>

                {/* Policy 2: Strict Damaged-Only Return & Unboxing Video */}
                <button
                  onClick={() => setReturnPolicyOpen(true)}
                  className="p-3.5 rounded-xl bg-[#0e0e12] border border-amber-500/20 hover:border-amber-500/50 transition-colors text-left flex items-start gap-2.5 group"
                >
                  <Video className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-amber-300">
                      Strict Return Policy
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Returns ONLY for damage with unboxing video.
                    </p>
                  </div>
                </button>
              </div>

              
              <div className="flex items-center justify-between text-[11px] text-neutral-400 p-2.5 rounded-lg bg-black/40 border border-neutral-800">
                <span className="flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-amber-400" />
                  Settled via Punjab National Bank Current A/C
                </span>
                <span className="font-mono text-neutral-400">{COMPANY_DETAILS.gstin}</span>
              </div>
            </div>
          </div>

          {/* Related Atelier Creations */}
          {relatedProducts.length > 0 && (
            <div className="mt-24 pt-12 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-amber-400">
                    Atelier Synergy
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-luxury mt-0.5">
                    More From {product.category}
                  </h2>
                </div>
                <Link
                  href="/#shop"
                  className="text-xs uppercase font-mono tracking-wider text-amber-400 hover:text-amber-300 underline"
                >
                  View Full Catalog &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <LeatherGuaranteeModal
        isOpen={guaranteeOpen}
        onClose={() => setGuaranteeOpen(false)}
      />
      <ReturnPolicyModal
        isOpen={returnPolicyOpen}
        onClose={() => setReturnPolicyOpen(false)}
      />
    </>
  );
}
