import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeftRight, Video, Landmark, FileText, ArrowRight, AlertTriangle } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "Maison Policies | HEMLIFESTYLE (HEM Corporation pvt Ltd)",
  description:
    "Official exchange, return, and 100% genuine certified leather policies for HEMLIFESTYLE. Mandatory unboxing video protocol for damage returns.",
};

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 py-12 sm:py-20 bg-leather-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-[0.25em]">
            <FileText className="w-3.5 h-3.5" />
            <span>Maison Legal Protocols</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-luxury text-white">
            POLICIES &amp; <span className="gold-gradient-text">GUARANTEES</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-lg mx-auto">
            Official operational frameworks governing HEMLIFESTYLE marque under {COMPANY_DETAILS.legalName}.
          </p>
        </div>

        {/* Section 1: 100% Premium Certified Leather Guarantee */}
        <div className="p-8 rounded-2xl bg-[#0e0e12] border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-serif">
                1. 100% Premium Certified Leather Guarantee
              </h2>
              <span className="text-[10px] font-mono text-amber-400/80 uppercase">
                ISO 17075 &bull; REACH Compliant Tanning &bull; Zero Synthetics
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
            <p>
              Every artifact bearing the <strong>HEMLIFESTYLE</strong> marque is crafted exclusively from certified full-grain bovine, calfskin, or lambskin hides. We maintain an absolute zero-tolerance policy against bonded leather, split leather, polyurethane (PU), or synthetic vinyl imitations.
            </p>
            <p>
              Natural pores, slight tonal gradients, and organic fat wrinkles are the authentic hall-marks of unbuffed full-grain hides, rather than defects. With continuous wear, your piece will develop an incomparable golden patina.
            </p>
            <div className="p-4 rounded-xl bg-black/50 border border-neutral-800 text-xs font-mono text-amber-300">
              Official Certification Register: {COMPANY_DETAILS.policies.leatherGuarantee.certificationNo} (Agra Atelier)
            </div>
          </div>
        </div>

        {/* Section 2: 7-Days Exchange Policy */}
        <div className="p-8 rounded-2xl bg-[#0e0e12] border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-serif">
                2. 7-Days Doorstep Exchange Policy
              </h2>
              <span className="text-[10px] font-mono text-amber-400/80 uppercase">
                Size Preference &bull; Alternative Silhouette &bull; Pan-India Pickup
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
            <p>
              Patrons wishing to exchange their piece for an alternative size (particularly for leather jackets) or another silhouette from our 6 core categories may do so within <strong>7 calendar days</strong> of verified delivery.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-400 list-disc pl-5">
              <li>Item must be entirely unused and unworn with authentic dust bag and tags attached.</li>
              <li>Exchange request must be lodged via email to <strong className="text-white">{COMPANY_DETAILS.contact.email}</strong> or hotline.</li>
              <li>White-glove reverse pickup will be scheduled at your doorstep at no additional freight charge.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Strict Return Policy & Mandatory Unboxing Video Clause */}
        <div className="p-8 rounded-2xl bg-red-950/20 border border-red-500/40 space-y-4 shadow-xl">
          <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-serif">
                3. Strict Return Policy (Damaged / Defective Only)
              </h2>
              <span className="text-[10px] font-mono text-red-400 uppercase">
                Mandatory Unboxing Video Protocol Required
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
            <p>
              Due to the bespoke craftsmanship, high material cost, and limited production batches of our leather goods, <strong className="text-white">returns and refunds are accepted STRICTLY for items that arrive physically damaged or with manufacturing hardware defects</strong>.
            </p>

            <div className="p-4 rounded-xl bg-black/60 border border-amber-500/40 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Mandatory Video Protocol Requirement</span>
              </div>
              <p className="text-xs text-neutral-300">
                To claim a return or refund for transit damage, customers must record a continuous, unedited unboxing video from the moment of opening the original courier shipping flyer. The video must show the shipping label, all angles of the parcel, and the opening of the box without any cuts or pauses.
              </p>
            </div>

            <p className="text-xs text-neutral-400">
              Damage notifications with the recorded unboxing video must be submitted within <strong>48 hours of delivery</strong> to <strong className="text-amber-400">{COMPANY_DETAILS.contact.email}</strong>.
            </p>
          </div>
        </div>

        {/* Section 4: Commercial Registry & Banking */}
        <div className="p-8 rounded-2xl bg-[#0e0e12] border border-amber-500/20 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase font-mono">
            <Landmark className="w-4 h-4" />
            <span>Commercial Disclosures &bull; HEM Corporation pvt Ltd</span>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            All invoices and tax records are issued under GSTIN <strong className="text-amber-300 font-mono">{COMPANY_DETAILS.gstin}</strong>. Payments settled via official Punjab National Bank Current Account: <span className="font-mono text-white">{COMPANY_DETAILS.bankDetails.accountNumber}</span> (IFSC: {COMPANY_DETAILS.bankDetails.ifscCode}).
          </p>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/#shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform"
          >
            <span>Return to Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
