"use client";

import React from "react";
import { X, Video, ShieldAlert, ArrowLeftRight, Clock, CheckCircle } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReturnPolicyModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f0f14] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-neutral-100 gold-glow-subtle max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-amber-400 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-neutral-800 pb-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400">
              Official Maison Protocols
            </span>
            <h2 className="text-2xl font-luxury font-bold text-neutral-100 mt-1">
              Exchange &amp; Strict Return Policy
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              HEMLIFESTYLE &bull; HEM Corporation pvt Ltd
            </p>
          </div>

          {/* Section 1: 7-Days Exchange Policy */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-400 font-semibold text-sm">
              <ArrowLeftRight className="w-4 h-4" />
              <span>7-Days Exchange Policy</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              We gladly offer a <strong>7-day exchange window</strong> for any size preference or
              alternative leather silhouette from our catalog.
            </p>
            <ul className="text-xs text-neutral-400 space-y-1.5 list-disc pl-5">
              <li>Item must be unused, in pristine condition, with authentic tags and dust bag.</li>
              <li>Exchange request must be initiated within 7 days of package delivery.</li>
              <li>Free doorstep pickup and replacement dispatch arranged across India.</li>
            </ul>
          </div>

          {/* Section 2: Strict Return Policy & Mandatory Video */}
          <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2.5 text-red-400 font-semibold text-sm">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Strict Return Policy: Damaged or Defective Only</span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Due to the bespoke nature and luxury craftsmanship of our full-grain leather pieces,
              returns and refunds are accepted{" "}
              <strong className="text-red-300 underline underline-offset-2">
                EXCLUSIVELY for items that arrive damaged or defective in transit
              </strong>
              .
            </p>

            <div className="bg-black/60 border border-amber-500/40 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Video className="w-4 h-4 text-amber-400" />
                Mandatory Unboxing Video Requirement
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                To claim a return or refund for transit damage or defects, customers{" "}
                <strong className="text-amber-200">
                  must record a clear, continuous unboxing video
                </strong>{" "}
                starting from the unsevered sealed external courier flyer until the product is fully
                inspected. No cuts, edits, or post-opened footage can be accepted.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              <span>Damage claims must be submitted to support within 48 hours of delivery.</span>
            </div>
          </div>

          {/* Support contact info */}
          <div className="pt-2 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-3">
            <div>
              Support Email:{" "}
              <a
                href={`mailto:${COMPANY_DETAILS.contact.email}`}
                className="text-amber-400 hover:underline"
              >
                {COMPANY_DETAILS.contact.email}
              </a>
            </div>
            <div>
              WhatsApp / Hotline:{" "}
              <a
                href={`tel:${COMPANY_DETAILS.contact.phone.replace(/\s+/g, "")}`}
                className="text-amber-400 font-semibold"
              >
                {COMPANY_DETAILS.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
