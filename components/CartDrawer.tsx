"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
} from "lucide-react";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
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

  if (!isCartOpen) return null;

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
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Dark Backdrop */}
        <div
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-[#0c0c10] border-l border-amber-500/30 shadow-2xl flex flex-col justify-between text-neutral-100">
            {/* Drawer Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-[#0e0e12]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-amber-400 stroke-[2]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white uppercase tracking-wider font-serif">
                    Maison Shopping Bag
                  </h2>
                  <p className="text-xs text-amber-400/80 font-mono">
                    {totalItems} {totalItems === 1 ? "creation" : "creations"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-black/40">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                    <ShoppingBag className="w-7 h-7 stroke-1" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 font-serif">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xs mb-6">
                    Indulge in our masterfully crafted 100% full-grain leather pieces.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-amber-500/20"
                  >
                    Explore Atelier Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3.5 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 shadow-md hover:border-amber-500/40 transition-colors"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-24 rounded-lg bg-neutral-950 shrink-0 overflow-hidden border border-neutral-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details & Actions */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/product/${item.product.id}`}
                              onClick={() => setIsCartOpen(false)}
                              className="text-xs font-bold text-neutral-100 hover:text-amber-300 line-clamp-1 font-serif"
                            >
                              {item.product.title}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-neutral-500 hover:text-rose-400 transition-colors p-0.5"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[10px] text-amber-400/80 uppercase font-mono mt-0.5">
                            {item.product.category}
                          </p>
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                          <span className="text-sm font-bold text-amber-400 font-mono">
                            {formatINR(item.product.price * item.quantity)}
                          </span>

                          <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden bg-black/60">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-white font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer: Totals & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-neutral-800 bg-[#0e0e12] space-y-3.5">
                {/* Promo Code Input */}
                {appliedCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs">
                    <div className="flex items-center gap-2 text-amber-300 font-semibold">
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      <span>Code <b>{appliedCode}</b> Applied</span>
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
                      placeholder="Patron Privilege Code (e.g. LUXURY10)"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError("");
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-bold uppercase tracking-wider transition-colors border border-amber-500/30"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoError && (
                  <p className="text-[11px] text-rose-400 -mt-2">{promoError}</p>
                )}

                {/* Subtotal Breakdown */}
                <div className="space-y-1.5 text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-neutral-200 font-mono font-semibold">{formatINR(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-amber-400 font-semibold">
                      <span>Patron Benefit</span>
                      <span className="font-mono">-{formatINR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Insured White-Glove Shipping</span>
                    <span className="text-amber-400 font-semibold uppercase tracking-wider">
                      {shipping === 0 ? "Complimentary" : formatINR(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                    <span className="font-serif">Estimated Total</span>
                    <span className="text-amber-400 font-mono text-lg">{formatINR(total)}</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-2.5 pt-1">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-center hover:scale-[1.01]"
                  >
                    <span>Proceed to Luxury Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-semibold tracking-wider uppercase transition-colors text-center block"
                  >
                    View Full Bag Summary
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>100% Certified Full-Grain Leather &bull; Verified PNB Settlement</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => {
          setIsCheckoutModalOpen(false);
          setIsCartOpen(false);
        }}
      />
    </>
  );
}
