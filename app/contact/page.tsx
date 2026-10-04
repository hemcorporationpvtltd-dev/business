"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Building2, Landmark, CheckCircle2, Clock, ShieldCheck, Send } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/constants";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Artisan Leather Commission Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 py-12 sm:py-20 bg-leather-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-[0.25em]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Headquarter &bull; Agra</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-luxury text-white">
            CONTACT <span className="gold-gradient-text">THE ATELIER</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xl mx-auto">
            Direct your inquiries to the master artisans and executive desk of {COMPANY_DETAILS.legalName} in Agra, Uttar Pradesh.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Contact & Corporate Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-amber-500/30 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white font-serif uppercase tracking-wider text-amber-400">
                Official Registered Office
              </h3>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">
                      {COMPANY_DETAILS.legalName}
                    </strong>
                    <p className="text-neutral-300 leading-relaxed">
                      {COMPANY_DETAILS.registeredAddress.formatted}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 border-t border-neutral-800">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                      Support Email
                    </span>
                    <a
                      href={`mailto:${COMPANY_DETAILS.contact.email}`}
                      className="text-amber-300 hover:underline font-mono"
                    >
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 border-t border-neutral-800">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                      Helpline &amp; WhatsApp
                    </span>
                    <a
                      href={`tel:${COMPANY_DETAILS.contact.phone.replace(/\s+/g, "")}`}
                      className="text-amber-300 font-bold hover:underline font-mono"
                    >
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 border-t border-neutral-800">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                      Concierge Hours
                    </span>
                    <p className="text-neutral-400">
                      {COMPANY_DETAILS.contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Punjab National Bank Current Account Verification Card */}
            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-amber-500/20 space-y-3 shadow-xl">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                <Landmark className="w-4 h-4" />
                
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                For commercial settlements, institutional commissions, and direct bank transfers:
              </p>
              <div className="p-3.5 rounded-lg bg-black/60 border border-neutral-800 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Beneficiary:</span>
                  <span className="text-white font-bold">{COMPANY_DETAILS.bankDetails.beneficiaryName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Bank:</span>
                  <span className="text-white">{COMPANY_DETAILS.bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Account (Current):</span>
                  <span className="text-amber-300 font-bold">{COMPANY_DETAILS.bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">IFSC Code:</span>
                  <span className="text-amber-300 font-bold">{COMPANY_DETAILS.bankDetails.ifscCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">GSTIN:</span>
                  <span className="text-amber-400 font-bold">{COMPANY_DETAILS.gstin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Patron Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-[#0e0e12] border border-neutral-800 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold font-luxury text-white">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your message has been routed to our Agra headquarters. An executive specialist will respond within 4 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "Artisan Leather Commission Inquiry",
                        message: "",
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-neutral-900 text-amber-400 border border-amber-500/30 text-xs uppercase tracking-wider font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-white font-serif mb-2">
                    Send an Inquiry to Kapil Chahar &amp; Team
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-amber-400 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikramaditya Rathore"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-amber-400 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98201 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1">
                        Inquiry Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-amber-400 mb-1">
                      Message &amp; Commission Specifications *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please describe your product inquiry, bespoke monogramming request, or wholesale commission..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 text-black font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message to Atelier</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
