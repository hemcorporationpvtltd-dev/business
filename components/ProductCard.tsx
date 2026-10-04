"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Plus, ShieldCheck, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

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
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="group flex flex-col bg-[#101014] border border-neutral-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5">
      {/* High-quality image container with smooth hover zoom */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              {product.badge}
            </span>
          ) : (
            <span className="bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-medium text-neutral-300 border border-neutral-700 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              100% Leather
            </span>
          )}

          {discountPercent && (
            <span className="bg-amber-500/90 text-black px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Hover Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link
            href={`/product/${product.id}`}
            className="flex-1 py-2.5 px-3 rounded-lg bg-black/90 hover:bg-black text-amber-300 text-[11px] uppercase tracking-[0.16em] font-bold text-center border border-amber-500/40 shadow-lg backdrop-blur-md transition-colors"
          >
            Add to cart
          </Link>
          <button
            onClick={() => addToCart(product, 1)}
            className="p-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black transition-all shadow-md shadow-amber-500/20"
            title="Add to Bag"
            aria-label="Add to Bag"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-neutral-400 font-medium mb-1">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400 font-mono">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating || 4.9}</span>
            </div>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="text-sm font-semibold text-neutral-100 hover:text-amber-300 transition-colors line-clamp-1 font-serif"
          >
            {product.title}
          </Link>
        </div>

        <div className="flex items-baseline gap-2 pt-2 border-t border-neutral-800/80">
          <span className="text-base font-bold text-amber-400 font-mono">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-xs text-neutral-500 line-through font-mono">
              {formattedOriginalPrice}
            </span>
          )}
          <span className="text-[10px] text-neutral-400 ml-auto font-mono">
            Agra Atelier
          </span>
        </div>
      </div>
    </div>
  );
}
