"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles, Award } from "lucide-react";
import LeatherGuaranteeModal from "./LeatherGuaranteeModal";

export default function Hero() {
  const [guaranteeOpen, setGuaranteeOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[#09090b] pt-14 pb-20 md:pt-20 md:pb-28 border-b border-amber-500/20 bg-leather-dark">
        {/* Subtle Ambient Gold Glow Backgrounds */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Brand Statement & Accents */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              {/* Badge with Monogram */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-[0.25em] shadow-inner">
                <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 border border-amber-400/50">
                  <Image
                    src="/logo-mark.png"
                    alt="HL"
                    width={16}
                    height={16}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Agra Atelier &bull; Autumn/Winter 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] font-luxury">
                LUXURY LEATHER.{" "}
                <span className="gold-gradient-text block sm:inline">
                  DISTINGUISHED.
                </span>
              </h1>

              {/* Brand Narrative */}
              <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-light leading-relaxed">
                Forged from <strong className="text-amber-400 font-semibold">100% Certified Full-Grain Leather</strong> in the historic artisan workshops of Agra. Hand-burnished, vegetable-tanned, and engineered for those who demand uncompromising distinction.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#shop"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] group"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                <button
                  onClick={() => setGuaranteeOpen(true)}
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-amber-300 border border-amber-500/30 text-xs uppercase tracking-[0.16em] font-medium transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>100% Leather Certificate</span>
                </button>
              </div>

              {/* Heritage Stats Strip */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-800/80 w-full max-w-lg text-neutral-400">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white font-mono">100%</p>
                  <p className="text-[10px] uppercase tracking-wider text-amber-400/80">
                    Certified Full-Grain
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white font-mono">5-Year</p>
                  <p className="text-[10px] uppercase tracking-wider text-amber-400/80">
                    Artisan Warranty
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white font-mono">Agra</p>
                  <p className="text-[10px] uppercase tracking-wider text-amber-400/80">
                    Heritage Tannery
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Visual Showcase with Gold Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-amber-500/40 shadow-2xl gold-glow group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=85"
                  alt="HEMLIFESTYLE Luxury Leather Goods"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Brand Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md p-4 rounded-xl border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-400 shrink-0">
                      <Image
                        src="/logo-mark.png"
                        alt="HL"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white font-serif tracking-wider">
                        HEMLIFESTYLE
                      </p>
                      <p className="text-[10px] text-amber-400/90 font-mono">
                        Handmade in Agra Atelier
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">
                    Full-Grain
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Modal */}
      <LeatherGuaranteeModal
        isOpen={guaranteeOpen}
        onClose={() => setGuaranteeOpen(false)}
      />
    </>
  );
}
