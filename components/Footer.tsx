"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Building2,
  Landmark,
  ArrowLeftRight,
  Video,
  FileCheck2,
} from "lucide-react";
import { COMPANY_DETAILS, CORE_CATEGORIES } from "@/lib/constants";
import LeatherGuaranteeModal from "./LeatherGuaranteeModal";
import ReturnPolicyModal from "./ReturnPolicyModal";

export default function Footer() {
  const [guaranteeOpen, setGuaranteeOpen] = useState(false);
  const [returnPolicyOpen, setReturnPolicyOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#070709] border-t border-amber-500/20 text-neutral-400 text-xs">
        {/* Upper Luxury Trust Strip */}
        <div className="border-b border-neutral-800/80 bg-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Trust Item 1 */}
            <button
              onClick={() => setGuaranteeOpen(true)}
              className="flex items-center gap-3.5 text-left group hover:text-amber-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-neutral-200 text-xs uppercase tracking-wider group-hover:text-amber-300">
                  100% Certified Leather
                </p>
                <p className="text-[11px] text-neutral-500">
                  Full-grain certified cowhide &amp; lambskin
                </p>
              </div>
            </button>

            {/* Trust Item 2 */}
            <button
              onClick={() => setReturnPolicyOpen(true)}
              className="flex items-center gap-3.5 text-left group hover:text-amber-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ArrowLeftRight className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-neutral-200 text-xs uppercase tracking-wider group-hover:text-amber-300">
                  7-Days Exchange Policy
                </p>
                <p className="text-[11px] text-neutral-500">
                  Doorstep exchange across India
                </p>
              </div>
            </button>

            {/* Trust Item 3 */}
            <button
              onClick={() => setReturnPolicyOpen(true)}
              className="flex items-center gap-3.5 text-left group hover:text-amber-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Video className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-neutral-200 text-xs uppercase tracking-wider group-hover:text-amber-300">
                  Damage-Only Returns
                </p>
                <p className="text-[11px] text-neutral-500">
                  Mandatory unboxing video protocol
                </p>
              </div>
            </button>

            {/* Trust Item 4 */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-neutral-200 text-xs uppercase tracking-wider">
                  Direct Bank Settlement
                </p>
                <p className="text-[11px] text-neutral-500">
                  Punjab National Bank Current A/C
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Column 1 & 2: Brand Identity & Corporate Credentials */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-amber-500/40 p-0.5 bg-black shrink-0">
                  <Image
                    src="/logo-mark.png"
                    alt="HL Monogram"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-xl font-black tracking-[0.22em] text-white uppercase font-serif block">
                    HEM<span className="text-amber-400">LIFESTYLE</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-amber-400/80 font-mono">
                    {COMPANY_DETAILS.legalName}
                  </span>
                </div>
              </div>

              <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
                A prestigious Indian luxury marque founded by{" "}
                <strong className="text-neutral-200 font-semibold">{COMPANY_DETAILS.owner}</strong>.
                Handcrafting timeless leather artifacts in our historic Agra ateliers using generational
                vegetable-tanning rituals and architectural hardware.
              </p>

              {/* Badges */}
              <div className="space-y-2 pt-1 text-[11px]">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    Proprietor: <strong className="text-white">{COMPANY_DETAILS.owner}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <FileCheck2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    GSTIN: <span className="font-mono text-amber-300 font-bold">{COMPANY_DETAILS.gstin}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3: 6 Core Categories */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-amber-400 mb-4 font-mono">
                Core Categories
              </h4>
              <ul className="space-y-2.5 text-neutral-400">
                {CORE_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/?category=${encodeURIComponent(cat)}#shop`}
                      className="hover:text-amber-300 transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Policies & Navigation */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-amber-400 mb-4 font-mono">
                Maison Policies
              </h4>
              <ul className="space-y-2.5 text-neutral-400">
                <li>
                  <button
                    onClick={() => setGuaranteeOpen(true)}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    100% Certified Leather Guarantee
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setReturnPolicyOpen(true)}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    7-Days Exchange Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setReturnPolicyOpen(true)}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Damage-Only Return Clause
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setReturnPolicyOpen(true)}
                    className="hover:text-amber-300 transition-colors text-left text-amber-400/90 font-medium"
                  >
                    Unboxing Video Protocol
                  </button>
                </li>
                <li>
                  <Link href="/about" className="hover:text-amber-300 transition-colors">
                    Atelier Heritage &amp; Agra Tannery
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-amber-300 transition-colors text-amber-300/90 font-semibold">
                    Admin Portal (Kapil Chahar)
                  </Link>
                </li>
              </ul>
            </div>

            
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-amber-400 mb-4 font-mono">
                Official Headquarter
              </h4>
              <ul className="space-y-3 text-neutral-400">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed">
                    {COMPANY_DETAILS.registeredAddress.formatted}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href={`mailto:${COMPANY_DETAILS.contact.email}`}
                    className="hover:text-amber-300 text-neutral-300 font-medium break-all"
                  >
                    {COMPANY_DETAILS.contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href={`tel:${COMPANY_DETAILS.contact.phone.replace(/\s+/g, "")}`}
                    className="hover:text-amber-300 font-bold text-neutral-200"
                  >
                    {COMPANY_DETAILS.contact.phone}
                  </a>
                </li>

                {/* Bank Details Brief */}
                <li className="pt-2 border-t border-neutral-800/80">
                  <div className="bg-[#121217] p-2.5 rounded border border-amber-500/20 text-[10px] space-y-1">
                    <p className="text-amber-400 font-bold uppercase tracking-wider">
                    
                    </p>
                    <p className="text-neutral-300">
                      Bank: {COMPANY_DETAILS.bankDetails.bankName}
                    </p>
                    <p className="font-mono text-neutral-300">
                      A/C: {COMPANY_DETAILS.bankDetails.accountNumber}
                    </p>
                    <p className="font-mono text-neutral-300">
                      IFSC: {COMPANY_DETAILS.bankDetails.ifscCode}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Luxury Bar */}
          <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
            <p>
              &copy; {new Date().getFullYear()} {COMPANY_DETAILS.brandName} &bull;{" "}
              {COMPANY_DETAILS.legalName}. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <button onClick={() => setReturnPolicyOpen(true)} className="hover:text-amber-300">
                Returns &amp; Exchanges
              </button>
              <button onClick={() => setGuaranteeOpen(true)} className="hover:text-amber-300">
                100% Leather Warranty
              </button>
              <span className="text-neutral-600">&bull;</span>
              <span className="text-neutral-400">Agra, Uttar Pradesh</span>
            </div>
          </div>
        </div>
      </footer>

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
