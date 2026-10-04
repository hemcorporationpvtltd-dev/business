"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { Order, PaymentMethod } from "@/types";
import { COMPANY_DETAILS } from "@/lib/constants";
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  Printer,
  ArrowLeft,
  Video,
  Copy,
  Check,
  Landmark,
  FileText,
  AlertCircle,
  Tag,
  ShieldAlert,
} from "lucide-react";

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
    discount,
    shipping,
    total,
    clearCart,
    applyDiscountCode,
    appliedCode,
    removeDiscountCode,
  } = useCart();
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

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name || !formData.email || !formData.address || !formData.phone || !formData.postalCode) {
      setErrorMsg("Please provide all required shipping and contact details.");
      return;
    }

    if (!formData.unboxingVideoAgreed) {
      setErrorMsg(
        "Mandatory requirement: Please review and check the Unboxing Video protocol acknowledgment for delivery & return verification."
      );
      return;
    }

    if (formData.paymentMethod === "Direct Bank Transfer" && !formData.transactionUtr) {
      setErrorMsg(
        "Please enter your Bank Transfer Transaction Reference / UTR Number for verified settlement."
      );
      return;
    }

    if (cart.length === 0) {
      setErrorMsg("Your shopping bag is empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order via API or fallback store
      const orderPayload = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
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

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      let order: Order;
      if (res.ok) {
        const json = await res.json();
        order = json.order;
      } else {
        // Fallback local placement
        order = placeOrder(orderPayload as any);
      }

      clearCart();
      setIsSubmitting(false);
      setConfirmedOrder(order);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.warn("Order API fallback to local store:", err);
      const order = placeOrder({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        items: [...cart],
        subtotal,
        discount,
        shipping,
        total,
        paymentMethod: formData.paymentMethod,
      } as any);

      clearCart();
      setIsSubmitting(false);
      setConfirmedOrder(order);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 py-10 sm:py-14 print:bg-white print:text-black print:py-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        {!confirmedOrder && (
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-amber-400 transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Shopping Bag</span>
            </Link>
            <span className="text-[11px] font-mono text-amber-400/80">
              Encrypted Luxury Checkout &bull; 256-Bit SSL
            </span>
          </div>
        )}

        {confirmedOrder ? (
          /* ========================================================
             ORDER SUCCESS SCREEN & OFFICIAL TAX INVOICE
             ======================================================== */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Success Banner */}
            <div className="p-8 rounded-2xl bg-[#0f0f14] border border-amber-500/40 text-center shadow-2xl gold-glow print:hidden">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400 mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h1 className="text-3xl font-luxury font-bold gold-gradient-text">
                Order Confirmed Successfully
              </h1>
              <p className="text-sm text-neutral-300 mt-2 max-w-lg mx-auto leading-relaxed">
                Honored patron <strong className="text-white">{confirmedOrder.customerName}</strong>, your
                order has been commissioned at our Agra Atelier. An official tax invoice has been generated.
              </p>
              <p className="text-xs text-amber-400/90 font-mono mt-1">
                Order ID: {confirmedOrder.orderNumber || confirmedOrder.id} &bull; Punjab National Bank Settlement
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save Tax Invoice</span>
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-amber-500/30 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Official Tax Invoice Container (Print-Ready) */}
            <div
              id="tax-invoice"
              className="p-8 sm:p-12 rounded-2xl bg-white text-neutral-900 border border-neutral-300 shadow-xl print:border-none print:p-0 print:shadow-none print:w-full"
            >
              {/* Invoice Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b-2 border-neutral-900">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 bg-black rounded p-0.5 shrink-0">
                      <Image
                        src="/logo-mark.png"
                        alt="HL Monogram"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-widest text-black uppercase font-serif">
                        {COMPANY_DETAILS.brandName}
                      </h2>
                      <p className="text-xs font-bold text-neutral-800">
                        {COMPANY_DETAILS.legalName}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-600 space-y-0.5 pt-1">
                    <p>Proprietor: <strong className="text-neutral-900">{COMPANY_DETAILS.owner}</strong></p>
                    <p>{COMPANY_DETAILS.registeredAddress.formatted}</p>
                    <p>Support: <strong className="text-neutral-900">{COMPANY_DETAILS.contact.email}</strong> | Phone: <strong className="text-neutral-900">{COMPANY_DETAILS.contact.phone}</strong></p>
                    <p>GSTIN: <span className="font-mono font-bold text-neutral-900">{COMPANY_DETAILS.gstin}</span></p>
                  </div>
                </div>

                <div className="sm:text-right text-xs text-neutral-700 space-y-1 bg-neutral-50 sm:bg-transparent p-4 sm:p-0 rounded-xl w-full sm:w-auto border sm:border-none border-neutral-200">
                  <span className="inline-block bg-neutral-900 text-amber-400 text-xs font-mono uppercase tracking-widest px-3 py-1 font-bold">
                    ORIGINAL TAX INVOICE
                  </span>
                  <p className="pt-1">
                    Invoice No: <span className="font-mono font-black text-black text-sm">{confirmedOrder.orderNumber || confirmedOrder.id}</span>
                  </p>
                  <p>
                    Date: {new Date(confirmedOrder.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    Payment Mode: <strong className="text-neutral-900">{confirmedOrder.paymentMethod}</strong>
                  </p>
                  {confirmedOrder.transactionUtr && (
                    <p>
                      UTR Reference: <strong className="font-mono text-neutral-900">{confirmedOrder.transactionUtr}</strong>
                    </p>
                  )}
                  <p className="text-emerald-700 font-bold uppercase pt-0.5">
                    &bull; Status: {confirmedOrder.paymentStatus}
                  </p>
                </div>
              </div>

              {/* Billed To / Official Bank Settlement */}
              <div className="py-6 border-b border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <h3 className="text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-500 mb-1">
                    Billed &amp; Shipped To
                  </h3>
                  <div className="space-y-0.5 text-neutral-800">
                    <p className="font-bold text-sm text-neutral-900">{confirmedOrder.customerName}</p>
                    <p>{confirmedOrder.address}</p>
                    <p>{confirmedOrder.city}, {confirmedOrder.state || "Uttar Pradesh"} - {confirmedOrder.postalCode}</p>
                    <p>Mobile: {confirmedOrder.customerPhone}</p>
                    <p>Email: {confirmedOrder.customerEmail}</p>
                  </div>
                </div>

                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-1 text-xs">
                  <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-500">
                  
                  </p>
                  <p className="text-neutral-900">
                    Beneficiary: <strong>{COMPANY_DETAILS.bankDetails.beneficiaryName}</strong>
                  </p>
                  <p className="text-neutral-900">
                    Bank: <strong>{COMPANY_DETAILS.bankDetails.bankName}</strong> ({COMPANY_DETAILS.bankDetails.branch})
                  </p>
                  <p className="font-mono text-neutral-900">
                    Account: <strong>{COMPANY_DETAILS.bankDetails.accountNumber}</strong>
                  </p>
                  <p className="font-mono text-neutral-900">
                    IFSC: <strong>{COMPANY_DETAILS.bankDetails.ifscCode}</strong>
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="py-6 border-b border-neutral-200 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 text-neutral-700 uppercase text-[10px] tracking-wider border-b border-neutral-300">
                    <tr>
                      <th className="py-2.5 px-3">Item Description</th>
                      <th className="py-2.5 px-3">HSN Code</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Taxable Val</th>
                      <th className="py-2.5 px-3 text-right">Total (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {confirmedOrder.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50">
                        <td className="py-3 px-3">
                          <p className="font-bold text-neutral-900">{item.product.title}</p>
                          <p className="text-[10px] text-neutral-500">
                            {item.product.category} &bull; 100% Full-Grain Certified Leather
                          </p>
                        </td>
                        <td className="py-3 px-3 font-mono text-neutral-600">
                          {item.product.category.includes("Jacket") ? "4203" : "4202"}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-neutral-900">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-neutral-700">
                          ₹{Math.round(((item.product.price * item.quantity) / 1.18)).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-3 text-right font-bold font-mono text-neutral-900">
                          {formatINR(item.product.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="pt-6 flex flex-col sm:flex-row justify-between items-start gap-6 text-xs">
                <div className="text-neutral-600 max-w-sm space-y-1">
                  <p className="font-bold text-neutral-900">Maison Policies &amp; Unboxing Clause:</p>
                  <p>
                    100% Certified Leather Guarantee from Agra Atelier. Returns permitted strictly for items damaged in transit with mandatory recorded unboxing video. 7-days exchange policy applicable.
                  </p>
                </div>

                <div className="w-full sm:w-64 space-y-2">
                  <div className="flex justify-between text-neutral-600">
                    <span>Taxable Subtotal:</span>
                    <span className="font-mono">₹{Math.round((confirmedOrder.subtotal / 1.18)).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>GST (18% Included):</span>
                    <span className="font-mono">₹{Math.round((confirmedOrder.subtotal - (confirmedOrder.subtotal / 1.18))).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Insured Courier:</span>
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-black pt-2 border-t-2 border-neutral-900">
                    <span>Total Amount:</span>
                    <span className="font-mono">{formatINR(confirmedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Signatory */}
              <div className="mt-12 pt-6 border-t border-neutral-300 flex justify-between items-end text-xs">
                <div className="text-[10px] text-neutral-500">
                  <p>Digital Tax Invoice issued by {COMPANY_DETAILS.legalName}</p>
                  <p>Agra, Uttar Pradesh &bull; CIN: {COMPANY_DETAILS.cin}</p>
                </div>
                <div className="text-right">
                  <p className="font-serif italic font-bold text-base text-neutral-900">
                    {COMPANY_DETAILS.owner}
                  </p>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase">
                    Authorized Signatory &bull; HEM Corporation pvt Ltd
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================
             CHECKOUT FORM (SHIPPING, PAYMENT & UNBOXING AGREEMENT)
             ======================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Checkout Inputs */}
            <div className="lg:col-span-7">
              <form onSubmit={handlePlaceOrder} className="space-y-8">
                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 1. Delivery & Patron Address */}
                <div className="p-6 rounded-2xl bg-[#0f0f14] border border-neutral-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h2 className="text-base font-bold text-white uppercase tracking-wider font-serif flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-mono">
                        1
                      </span>
                      <span>Patron &amp; Delivery Destination</span>
                    </h2>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80">
                      Step 1 of 3
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Vikramaditya Rathore"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 focus:outline-none text-xs text-white placeholder-neutral-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Mobile Phone (+91) *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98201 44521"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 focus:outline-none text-xs text-white placeholder-neutral-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Email Address (for GST Tax Invoice &amp; Courier Tracking) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="vikram@luxury.in"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 focus:outline-none text-xs text-white placeholder-neutral-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Street Address &amp; Suite / Residence *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Villa 12, Golden Palms Avenue"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 focus:outline-none text-xs text-white placeholder-neutral-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="Agra"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 focus:outline-none text-xs text-white placeholder-neutral-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        placeholder="Uttar Pradesh"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 focus:outline-none text-xs text-white placeholder-neutral-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        placeholder="283105"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-amber-400 focus:outline-none text-xs text-white placeholder-neutral-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Payment Method Selection (PNB Current Account, UPI, Card, COD) */}
                <div className="p-6 rounded-2xl bg-[#0f0f14] border border-neutral-800 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h2 className="text-base font-bold text-white uppercase tracking-wider font-serif flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-mono">
                        2
                      </span>
                      <span>Payment Method &amp; Settlement</span>
                    </h2>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80">
                      Step 2 of 3
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "Direct Bank Transfer" as PaymentMethod,
                        icon: Landmark,
                        title: "Direct Bank Transfer",
                        
                      },
                      {
                        id: "UPI / QR" as PaymentMethod,
                        icon: QrCode,
                        title: "UPI / QR Pay",
                        badge: "Instant",
                        desc: "GPay, PhonePe, Paytm, BHIM",
                      },
                      {
                        id: "Credit / Debit Card" as PaymentMethod,
                        icon: CreditCard,
                        title: "Credit / Debit Card",
                        badge: "Encrypted",
                        desc: "Visa, MasterCard, RuPay, Amex",
                      },
                      {
                        id: "Cash on Delivery" as PaymentMethod,
                        icon: Banknote,
                        title: "Cash on Delivery",
                        badge: "Doorstep Pay",
                        desc: "Pay cash or UPI at delivery",
                      },
                    ].map((m) => {
                      const Icon = m.icon;
                      const isSelected = formData.paymentMethod === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: m.id,
                            }))
                          }
                          className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 ${
                            isSelected
                              ? "bg-neutral-900 border-amber-400 shadow-lg shadow-amber-500/10"
                              : "bg-neutral-950/60 border-neutral-800 hover:border-neutral-700"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  isSelected
                                    ? "bg-amber-500/20 text-amber-400"
                                    : "bg-neutral-800 text-neutral-400"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-500/30">
                                {m.badge}
                              </span>
                            </div>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? "border-amber-400 bg-amber-400" : "border-neutral-600"
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-xs text-white">{m.title}</p>
                            <p className="text-[10px] text-neutral-400 mt-0.5">{m.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* SUBPANEL 1: Direct Bank Transfer (PNB Current Account) */}
                  {formData.paymentMethod === "Direct Bank Transfer" && (
                    <div className="p-5 rounded-xl bg-black/60 border border-amber-500/40 space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-amber-400" />
                          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                            Official PNB Current Account Details
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                          Active &bull; Verified
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-neutral-900/80 p-4 rounded-lg border border-neutral-800">
                        <div>
                          <p className="text-[10px] uppercase font-mono text-neutral-400">
                            Beneficiary Name
                          </p>
                          <p className="font-bold text-white text-xs mt-0.5">
                            {COMPANY_DETAILS.bankDetails.beneficiaryName}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase font-mono text-neutral-400">
                            Bank &amp; Branch
                          </p>
                          <p className="font-bold text-white text-xs mt-0.5">
                            {COMPANY_DETAILS.bankDetails.bankName} ({COMPANY_DETAILS.bankDetails.branch})
                          </p>
                        </div>

                        <div className="flex items-center justify-between bg-black/50 p-2.5 rounded border border-neutral-700">
                          <div>
                            <p className="text-[10px] uppercase font-mono text-neutral-400">
                              Account Number (Current)
                            </p>
                            <p className="font-mono font-bold text-amber-300 text-sm">
                              {COMPANY_DETAILS.bankDetails.accountNumber}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(COMPANY_DETAILS.bankDetails.accountNumber, "acc")
                            }
                            className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-400 transition-colors"
                            title="Copy Account Number"
                          >
                            {copiedField === "acc" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between bg-black/50 p-2.5 rounded border border-neutral-700">
                          <div>
                            <p className="text-[10px] uppercase font-mono text-neutral-400">
                              IFSC Code
                            </p>
                            <p className="font-mono font-bold text-amber-300 text-sm">
                              {COMPANY_DETAILS.bankDetails.ifscCode}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(COMPANY_DETAILS.bankDetails.ifscCode, "ifsc")
                            }
                            className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-400 transition-colors"
                            title="Copy IFSC Code"
                          >
                            {copiedField === "ifsc" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Transaction UTR Input */}
                      <div>
                        <label className="block text-xs font-semibold text-amber-300 mb-1">
                          Bank Transfer Reference / UTR Number *
                        </label>
                        <input
                          type="text"
                          name="transactionUtr"
                          placeholder="e.g. PUNBN261003449812 or NEFT/IMPS Ref No"
                          value={formData.transactionUtr}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-amber-500/40 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                        />
                        <p className="text-[11px] text-neutral-400 mt-1">
                          Enter the 12 or 16-digit reference number from your bank transfer receipt.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SUBPANEL 2: UPI / QR Pay */}
                  {formData.paymentMethod === "UPI / QR" && (
                    <div className="p-5 rounded-xl bg-black/60 border border-neutral-800 space-y-3 text-xs">
                      <p className="font-semibold text-neutral-200">
                        Scan &amp; Pay via Any UPI App (GPay, PhonePe, Paytm, BHIM):
                      </p>
                      <div className="flex items-center gap-4 bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                        <div className="w-16 h-16 bg-white p-1 rounded flex items-center justify-center shrink-0">
                          <QrCode className="w-14 h-14 text-black" />
                        </div>
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-mono">
                            Merchant UPI ID
                          </p>
                          <p className="font-mono font-bold text-amber-400 text-sm">
                            {COMPANY_DETAILS.bankDetails.upiId}
                          </p>
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            Auto-routed to {COMPANY_DETAILS.bankDetails.bankName} Current Account
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBPANEL 3: Cards */}
                  {formData.paymentMethod === "Credit / Debit Card" && (
                    <div className="p-5 rounded-xl bg-black/60 border border-neutral-800 space-y-3 text-xs">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="4532 •••• •••• 9821"
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Expiry</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">CVV</label>
                          <input
                            type="password"
                            placeholder="•••"
                            maxLength={4}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBPANEL 4: COD */}
                  {formData.paymentMethod === "Cash on Delivery" && (
                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300">
                      <p>
                        Pay in cash or scan the delivery executive&apos;s UPI QR upon receiving the sealed parcel at your doorstep.
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Key Business Policies: Mandatory Unboxing Video Clause */}
                <div className="p-6 rounded-2xl bg-[#0f0f14] border border-amber-500/30 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h2 className="text-base font-bold text-white uppercase tracking-wider font-serif flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-mono">
                        3
                      </span>
                      <span>Maison Policy Acknowledgment</span>
                    </h2>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80">
                      Step 3 of 3
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/90 border border-amber-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <Video className="w-4 h-4" />
                      <span>Mandatory Unboxing Video Protocol (Damaged / Defective Only)</span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Due to the bespoke craftsmanship and value of our 100% certified leather goods,
                      returns and refunds are permitted{" "}
                      <strong className="text-amber-300">
                        exclusively for items damaged or defective upon arrival
                      </strong>
                      . Customers are required to record a continuous, unedited unboxing video starting
                      from the sealed courier flyer until the product is unboxed.
                    </p>

                    <label className="flex items-start gap-3 pt-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="unboxingVideoAgreed"
                        checked={formData.unboxingVideoAgreed}
                        onChange={handleInputChange}
                        className="mt-0.5 w-4 h-4 rounded border-amber-500/60 bg-neutral-900 text-amber-500 focus:ring-amber-400 shrink-0"
                      />
                      <span className="text-xs text-neutral-200 font-medium">
                        I have read and agree to the{" "}
                        <strong className="text-amber-300 underline underline-offset-2">
                          Mandatory Unboxing Video Protocol
                        </strong>{" "}
                        and 7-Days Exchange Policy for HEMLIFESTYLE (HEM Corporation pvt Ltd).
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <span>
                      {isSubmitting
                        ? "Issuing Official Invoice & Order..."
                        : `PLACE ORDER ; ${formatINR(total)}`}
                    </span>
                  </button>
                  <p className="text-[11px] text-center text-neutral-400 mt-2">
                    Managed by {COMPANY_DETAILS.legalName} &bull; GSTIN: {COMPANY_DETAILS.gstin} &bull; Agra Atelier
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary & PNB Trust Strip */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-[#0f0f14] border border-neutral-800 shadow-xl space-y-5 sticky top-24">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-serif">
                    Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)})
                  </h3>
                  <Link
                    href="/cart"
                    className="text-xs font-semibold text-amber-400/80 hover:text-amber-300 underline"
                  >
                    Edit Bag
                  </Link>
                </div>

                {/* Items Mini List */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg bg-neutral-900 overflow-hidden shrink-0 border border-neutral-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white line-clamp-1">{item.product.title}</p>
                          <p className="text-[10px] text-amber-400/80 font-mono">
                            Qty: {item.quantity} &bull; {item.product.category}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-amber-400 font-mono shrink-0">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-3 border-t border-neutral-800">
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
                        placeholder="Privilege Code (e.g. LUXURY10)"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError("");
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
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

                {/* Financial Totals */}
                <div className="space-y-2 text-xs text-neutral-400 pt-3 border-t border-neutral-800">
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
                    <span>White-Glove Insured Shipping:</span>
                    <span className="text-amber-400 font-semibold uppercase tracking-wider">
                      {shipping === 0 ? "Complimentary" : formatINR(shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-neutral-800">
                    <span className="font-serif">Total Amount:</span>
                    <span className="font-mono text-amber-400 text-lg">{formatINR(total)}</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 text-right">
                    Includes 18% GST (HSN 4202/4203) &bull; Official Tax Invoice Provided
                  </p>
                </div>

                {/* Company Credential Pill */}
                <div className="p-4 rounded-xl bg-black/60 border border-amber-500/20 text-[11px] text-neutral-400 space-y-1.5">
                  <div className="flex items-center gap-2 text-neutral-200 font-bold">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>{COMPANY_DETAILS.legalName}</span>
                  </div>
                  <p>Founder / Proprietor: <strong className="text-neutral-200">{COMPANY_DETAILS.owner}</strong></p>
                  <p>GSTIN: <span className="font-mono text-amber-400">{COMPANY_DETAILS.gstin}</span></p>
                  <p>Agra Atelier &bull; PNB Current Account Settlement</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
