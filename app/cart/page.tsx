"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CheckoutModal from "@/components/CheckoutModal";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
  Landmark,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/constants";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    totalItems,
    applyDiscountCode,
    appliedCode,
    removeDiscountCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscountCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError("");
      setPromoInput("");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 py-10 sm:py-14 bg-leather-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-amber-500/20 gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-wider text-neutral-400 hover:text-amber-400 mb-2 transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Atelier Gallery</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold font-luxury text-white tracking-wide">
              MY SHOPPING BAG ({totalItems})
            </h1>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-neutral-400 hover:text-rose-400 underline self-start sm:self-auto transition-colors font-mono"
            >
              Clear Bag
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-[#0e0e12] border border-amber-500/20 rounded-2xl max-w-xl mx-auto px-6 gold-glow-subtle">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 mb-4 shadow-lg">
              <ShoppingBag className="w-8 h-8 stroke-1" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2 font-luxury">
              Your bag is currently empty
            </h2>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6 leading-relaxed">
              Explore our handcrafted 100% full-grain leather pieces and commission your next heirloom.
            </p>
            <Link
              href="/#shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
            >
              <span>Explore Creations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-8 space-y-3">
              <div className="divide-y divide-neutral-800 bg-[#0e0e12] rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Image Thumbnail */}
                      <div className="relative w-20 h-24 rounded-lg bg-neutral-950 overflow-hidden shrink-0 border border-neutral-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400/90 font-semibold">
                          {item.product.category}
                        </span>
                        <Link
                          href={`/product/${item.product.id}`}
                          className="block text-sm font-bold text-white hover:text-amber-300 transition-colors mt-0.5 line-clamp-1 font-serif"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-xs text-neutral-400 mt-1 font-mono">
                          Unit: {formatINR(item.product.price)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden bg-black/60">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-white font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <span className="text-sm font-bold text-amber-400 font-mono">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-neutral-500 hover:text-rose-400 p-2 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-2xl bg-[#0e0e12] border border-amber-500/20 space-y-5 sticky top-24 shadow-xl">
                <h2 className="text-base font-bold text-white tracking-wide border-b border-neutral-800 pb-3 font-serif">
                  Commission Summary
                </h2>

                {/* Promo Code Input */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-amber-400 mb-1.5">
                    Patron Privilege Code
                  </label>
                  {appliedCode ? (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs">
                      <div className="flex items-center gap-2 text-amber-300 font-semibold">
                        <Tag className="w-3.5 h-3.5 text-amber-400" />
                        <span>Code &quot;{appliedCode}&quot; Active</span>
                      </div>
                      <button
                        onClick={removeDiscountCode}
                        className="text-neutral-400 hover:text-white text-xs underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. LUXURY10"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError("");
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 border border-amber-500/30"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-rose-400 mt-1.5">{promoError}</p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                  <div className="flex justify-between">
                    <span>Taxable Subtotal:</span>
                    <span className="font-mono text-neutral-200">{formatINR(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-amber-400 font-semibold">
                      <span>Privilege Deduction:</span>
                      <span className="font-mono">-{formatINR(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>White-Glove Insured Courier:</span>
                    <span className="text-amber-400 font-semibold uppercase tracking-wider">
                      {shipping === 0 ? "Complimentary" : formatINR(shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-neutral-800">
                    <span className="font-serif">Total Amount:</span>
                    <span className="font-mono text-amber-400 text-lg">{formatINR(total)}</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 text-right">
                    Includes 18% GST &bull; Official Tax Invoice Generated
                  </p>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-center hover:scale-[1.01]"
                >
                  <span>Proceed to Luxury Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1">
                  <Landmark className="w-3.5 h-3.5 text-amber-400" />
                
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  );
}
