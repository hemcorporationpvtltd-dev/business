"use client";

import React from "react";
import Image from "next/image";
import { X, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeatherGuaranteeModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0e0e12] border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-neutral-100 gold-glow overflow-hidden">
        {/* Decorative corner borders */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-amber-400 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="flex justify-center mb-2">
            <div className="relative w-16 h-16 rounded-full border-2 border-amber-400/60 p-1 flex items-center justify-center bg-black/50">
              <Image
                src="/logo-mark.jpg"
                alt="HEMLIFESTYLE Monogram"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Award className="w-4 h-4 text-amber-400" />
            Official Certificate of Authenticity
          </div>
          <h2 className="text-2xl sm:text-3xl font-luxury font-bold gold-gradient-text">
            100% Premium Certified Leather Guarantee
          </h2>
          <p className="text-xs text-neutral-400 tracking-wider uppercase">
            HEMLIFESTYLE &bull; HEM Corporation pvt Ltd &bull; Agra Atelier
          </p>
        </div>

        {/* Certificate Body */}
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed bg-black/40 border border-neutral-800 rounded-xl p-5">
          <p>
            This document certifies that all leather goods produced under the{" "}
            <strong className="text-amber-400 font-semibold">HEMLIFESTYLE</strong> marque are crafted
            exclusively from{" "}
            <strong className="text-neutral-100 font-semibold">
              100% full-grain, unadulterated certified leather
            </strong>
            .
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-200">Zero Synthetic Blends:</strong> No bonded, PU, or split leather.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-200">Natural Grain & Patina:</strong> Matures gracefully with character over decades.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-200">Ethical Tanning:</strong> Vegetable extracts complying with REACH standards.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-200">Agra Heritage:</strong> Hand-stitched by multi-generational master craftsmen.
              </span>
            </div>
          </div>
        </div>

        {/* Seal and Signatory */}
        <div className="mt-6 pt-5 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-neutral-400 text-center sm:text-left">
            <p className="font-mono text-[11px] text-amber-500/80">
              Cert No: {COMPANY_DETAILS.policies.leatherGuarantee.certificationNo}
            </p>
            <p className="text-[11px]">GSTIN: {COMPANY_DETAILS.gstin}</p>
          </div>

          <div className="text-center sm:text-right">
            <div className="font-luxury text-base text-amber-300 font-bold italic tracking-wide">
              {COMPANY_DETAILS.owner}
            </div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
              Founder &amp; Proprietor, HEM Corporation pvt Ltd
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
