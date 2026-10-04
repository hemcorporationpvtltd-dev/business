import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Landmark, Building2, MapPin, Mail, Phone } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/constants";

export const metadata = {
  title: "About HEMLIFESTYLE | Agra Leather Atelier & Heritage",
  description:
    "Discover the heritage of HEMLIFESTYLE (HEM Corporation pvt Ltd) founded by Kapil Chahar. Handcrafted in historic Agra ateliers from 100% certified full-grain leather.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 py-12 sm:py-20 bg-leather-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] uppercase text-amber-400 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Maison Atelier &bull; Agra Heritage</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-luxury">
            THE ARCHITECTURE OF{" "}
            <span className="gold-gradient-text block sm:inline">LUXURY LEATHER</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Founded by <strong className="text-amber-400 font-semibold">{COMPANY_DETAILS.owner}</strong> under{" "}
            <strong className="text-white font-semibold">{COMPANY_DETAILS.legalName}</strong>,{" "}
            HEMLIFESTYLE was born with a singular conviction: that true luxury is not ephemeral fashion, but generational permanence sculpted from 100% certified full-grain hides.
          </p>
        </div>

        {/* Hero Visual Collage */}
        <div className="rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl mb-16 relative aspect-[16/9] sm:aspect-[21/9] bg-neutral-900 gold-glow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1600&q=85"
            alt="HEMLIFESTYLE Master Leather Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400">
                Purity of Material
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-luxury text-white mt-0.5">
                Zero Bonded Blends. Generational Agra Mastery.
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg border border-amber-500/30 font-mono text-xs text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% Certified Full-Grain</span>
            </div>
          </div>
        </div>

        {/* Founder & Atelier Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div className="space-y-4 text-neutral-300 text-sm leading-relaxed font-light">
            <h3 className="text-2xl font-bold text-white font-luxury">
              Kapil Chahar&apos;s Vision &amp; The Agra Atelier
            </h3>
            <p>
              Agra has commanded worldwide respect as India’s imperial center of leathercraft for over four centuries. Under the visionary stewardship of <strong className="text-amber-400 font-normal">{COMPANY_DETAILS.owner}</strong>, HEMLIFESTYLE merges this historic savoir-faire with architectural modern aesthetics.
            </p>
            <p>
              Every hide selected undergoes rigorous structural inspection. Raw cowhide and lambskin are steeped in organic chestnut, quebracho, and mimosa bark tannins for over forty days—a patient alchemy ensuring rich tensile strength and deep patina development.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0e12] border border-amber-500/20 space-y-4 shadow-xl">
            <h4 className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
              The HEM Quality Benchmark
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Unadulterated Full-Grain:</strong> Strictly unbuffed, authentic surface preserving natural pore character.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Saddle-Stitched Resilience:</strong> Heavy-gauge waxed thread preventing unraveling even under extreme stress.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Solid Antique Brass:</strong> Swiss YKK Excella zips and custom electroplated 24k gold/brass fittings.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">5-Year Master Warranty:</strong> Backed by official HEM Corporation pvt Ltd guarantee certificates.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Leather Care Guide Section */}
        <div id="leather-care" className="p-8 rounded-2xl bg-[#0e0e12] border border-neutral-800 mb-16">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400">
              Preservation &amp; Patina
            </span>
            <h3 className="text-2xl font-bold font-luxury text-white">
              Caring for Your Heirloom Creation
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-neutral-300">
            <div className="p-5 rounded-xl bg-black/60 border border-neutral-800 space-y-2">
              <h4 className="font-bold text-amber-300 uppercase tracking-wider font-mono">
                1. Nourish &amp; Condition
              </h4>
              <p className="leading-relaxed text-neutral-400">
                Apply a natural organic beeswax or lanolin leather balm every 4-6 months with a microfiber cloth to maintain suppleness.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-black/60 border border-neutral-800 space-y-2">
              <h4 className="font-bold text-amber-300 uppercase tracking-wider font-mono">
                2. Moisture Protocols
              </h4>
              <p className="leading-relaxed text-neutral-400">
                If caught in monsoonal downpours, pat gently with a dry cotton towel. Allow natural ambient air-drying away from artificial blowers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-black/60 border border-neutral-800 space-y-2">
              <h4 className="font-bold text-amber-300 uppercase tracking-wider font-mono">
                3. Breathable Dust Bag
              </h4>
              <p className="leading-relaxed text-neutral-400">
                Always store your bag inside the custom linen dust bag supplied by HEMLIFESTYLE. Avoid sealed plastics that suffocate the hide.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Governance & Official Registry */}
        <div className="p-8 rounded-2xl bg-[#0e0e12] border border-amber-500/30 mb-16 text-xs text-neutral-300">
          <div className="max-w-3xl mx-auto space-y-5">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold">
                Official Registered Headquarter &amp; Banking
              </span>
              <h3 className="text-2xl font-bold font-luxury text-white">
                {COMPANY_DETAILS.legalName}
              </h3>
              <p className="text-neutral-400 text-xs">
                Proprietor: <strong className="text-amber-300">{COMPANY_DETAILS.owner}</strong> &bull; Operating Luxury Marque <strong>{COMPANY_DETAILS.brandName}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
              <div className="p-4 rounded-xl bg-black/50 border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase font-mono text-xs">
                  <MapPin className="w-4 h-4" />
                  <span>Registered Address</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  {COMPANY_DETAILS.registeredAddress.formatted}
                </p>
                <p className="text-neutral-400 font-mono text-[11px] pt-1">
                  GSTIN: <strong className="text-amber-300">{COMPANY_DETAILS.gstin}</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase font-mono text-xs">
                  <Landmark className="w-4 h-4" />
                  <span>Punjab National Bank Channel</span>
                </div>
                <p className="text-neutral-300">
                  Beneficiary: <strong>{COMPANY_DETAILS.bankDetails.beneficiaryName}</strong>
                </p>
                <p className="font-mono text-amber-300">
                  A/C: {COMPANY_DETAILS.bankDetails.accountNumber} ({COMPANY_DETAILS.bankDetails.accountType})
                </p>
                <p className="font-mono text-amber-300">
                  IFSC: {COMPANY_DETAILS.bankDetails.ifscCode} ({COMPANY_DETAILS.bankDetails.branch})
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-neutral-400 text-xs gap-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white hover:text-amber-300 font-mono">
                  {COMPANY_DETAILS.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <a href={`tel:${COMPANY_DETAILS.contact.phone.replace(/\s+/g, "")}`} className="text-white hover:text-amber-300 font-mono font-bold">
                  {COMPANY_DETAILS.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="text-center py-6">
          <Link
            href="/#shop"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 text-black font-bold text-xs uppercase tracking-widest transition-transform hover:scale-105 shadow-xl shadow-amber-500/20"
          >
            <span>Experience The Atelier Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
