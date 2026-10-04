"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { X, CheckCircle2, ShieldCheck, CreditCard, QrCode, Banknote, Landmark, Video, Copy, Check } from "lucide-react";
import { Order, PaymentMethod } from "@/types";
import { COMPANY_DETAILS } from "@/lib/constants";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, subtotal, discount, shipping, total, clearCart } = useCart();
  const { placeOrder } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Agra",
    state: "Uttar Pradesh",
    postalCode: "",
    paymentMethod: "Direct Bank Transfer" as PaymentMethod,
    transactionUtr: "",
    unboxingVideoAgreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.phone) {
      setErrorMsg("Please complete all shipping address and contact fields.");
      return;
    }

    if (!formData.unboxingVideoAgreed) {
      setErrorMsg(
        "Please acknowledge the Mandatory Unboxing Video Protocol for delivery verification."
      );
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode || "283105",
      items: [...cart],
      subtotal,
      discount,
      shipping,
      tax: Math.round(subtotal * 0.18 * 100) / 100,
      total,
      paymentMethod: formData.paymentMethod,
      transactionUtr: formData.transactionUtr,
      unboxingVideoAgreed: formData.unboxingVideoAgreed,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      let order: Order;
      if (res.ok) {
        const json = await res.json();
        order = json.order;
      } else {
        order = placeOrder(orderData as any);
      }

      clearCart();
      setIsSubmitting(false);
      setCompletedOrder(order);
    } catch {
      const order = placeOrder(orderData as any);
      clearCart();
      setIsSubmitting(false);
      setCompletedOrder(order);
    }
  };

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0e0e12] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-[#0a0a0d]">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">
              Encrypted Luxury Checkout &bull; 256-Bit SSL
            </span>
            <h2 className="text-lg font-bold text-white tracking-wide mt-0.5 font-serif">
              {completedOrder ? "Commission Confirmed" : "Delivery Destination & Payment"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#0e0e12]">
          {completedOrder ? (
            /* Order Success View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-400 flex items-center justify-center mx-auto text-amber-400 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-1 font-serif">
                  Honored Patron, {completedOrder.customerName}
                </h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Your commission <span className="font-mono text-amber-400 font-bold">{completedOrder.orderNumber || completedOrder.id}</span> is confirmed at our Agra Atelier.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-amber-500/20 max-w-md mx-auto text-left space-y-2.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Order Number</span>
                  <span className="font-mono text-amber-300 font-bold">{completedOrder.orderNumber || completedOrder.id}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Payment Settlement</span>
                  <span className="text-white font-medium">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping Address</span>
                  <span className="text-white truncate max-w-[200px]">{completedOrder.address}, {completedOrder.city}</span>
                </div>
                <div className="flex justify-between text-neutral-400 pt-2 border-t border-neutral-800">
                  <span>Total Amount</span>
                  <span className="text-amber-400 font-bold text-sm font-mono">{formatINR(completedOrder.total)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <a
                  href="/checkout"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20"
                >
                  View Full GST Invoice
                </a>
                <button
                  onClick={() => {
                    setCompletedOrder(null);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Order Quick Summary */}
              <div className="p-4 rounded-xl bg-black/50 border border-amber-500/20 flex items-center justify-between text-sm">
                <div>
                  <p className="text-xs text-neutral-400 uppercase tracking-wider font-mono">
                    Total Pieces ({cart.reduce((a, b) => a + b.quantity, 0)})
                  </p>
                  <p className="text-lg font-bold text-amber-400 font-mono">{formatINR(total)}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Complimentary Shipping</span>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="space-y-3.5">
                <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 font-mono">
                  1. Shipping Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Vikramaditya Rathore"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="vikram@luxury.in"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98201 XXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Apartment, Street Address, Landmark"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-xs"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2.5">
                <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 font-mono">
                  2. Payment Method
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                  
                    { id: "UPI / QR" as PaymentMethod, icon: QrCode, label: "UPI / QR" },
                    { id: "Credit / Debit Card" as PaymentMethod, icon: CreditCard, label: "Card" },
                    { id: "Cash on Delivery" as PaymentMethod, icon: Banknote, label: "COD" },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = formData.paymentMethod === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            paymentMethod: method.id,
                          }))
                        }
                        className={`p-3 rounded-lg border flex flex-col items-center justify-center text-center gap-1.5 transition-all ${
                          isSelected
                            ? "bg-neutral-900 border-amber-400 text-amber-400 shadow-md shadow-amber-500/10"
                            : "bg-black/40 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] font-semibold">{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {formData.paymentMethod === "Direct Bank Transfer" && (
                  <div className="p-3 bg-neutral-900/90 border border-amber-500/30 rounded-lg text-xs space-y-1.5">
                    <p className="text-amber-300 font-semibold text-[11px]">
                      
                    </p>
                    <input
                      type="text"
                      name="transactionUtr"
                      placeholder="Enter Bank Transfer UTR / Ref No"
                      value={formData.transactionUtr}
                      onChange={handleInputChange}
                      className="w-full px-2.5 py-1.5 rounded bg-black/60 border border-neutral-700 text-xs text-white placeholder-neutral-500 font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Unboxing Video Protocol */}
              <div className="p-3.5 rounded-lg bg-neutral-900/80 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                  <Video className="w-3.5 h-3.5" />
                  <span>Mandatory Unboxing Video Protocol</span>
                </div>
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    name="unboxingVideoAgreed"
                    checked={formData.unboxingVideoAgreed}
                    onChange={handleInputChange}
                    className="mt-0.5 w-4 h-4 rounded border-amber-500/60 bg-neutral-900 text-amber-500 focus:ring-amber-400 shrink-0"
                  />
                  <span>
                    I acknowledge that returns are accepted <strong>EXCLUSIVELY for transit damage/defects</strong> and require an unedited opening video upon delivery.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 border-t border-neutral-800">
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 disabled:opacity-50 text-black font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-amber-500/20"
                >
                  {isSubmitting ? "Commissioning Order..." : `Place Order &bull; ${formatINR(total)}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
