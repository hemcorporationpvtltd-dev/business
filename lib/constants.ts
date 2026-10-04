export const COMPANY_DETAILS = {
  legalName: "HEM Corporation pvt Ltd",
  brandName: "HEMLIFESTYLE",
  brandTagline: "Artisanal Luxury Leather Goods",
  owner: "Kapil Chahar",
  gstin: "09MJKPK3269A1ZX",
  pan: "AABCH9481M",
  cin: "U19120UP2024PTC198570",
  hsnCodes: {
    leatherBags: "4202",
    leatherJackets: "4203",
    leatherAccessories: "4205",
  },
  registeredAddress: {
    line1: "Ground floor, 01, Chaudhary Market",
    line2: "Laramda Maujs, Sahara",
    city: "Agra",
    state: "Uttar Pradesh",
    pincode: "283105",
    country: "India",
    formatted: "Ground floor, 01, Chaudhary Market, Laramda Maujs, Sahara, Agra, Uttar Pradesh - 283105",
  },
  contact: {
    email: "hemcorporationpvtltd@gmail.com",
    phone: "+91 9897198570",
    phoneFormatted: "+91 98971 98570",
    whatsapp: "+919897198570",
    workingHours: "Monday – Saturday: 10:00 AM – 7:30 PM IST",
  },
  bankDetails: {
    bankName: "Punjab National Bank",
    accountType: "Current Account",
    accountNumber: "6650002100003331",
    ifscCode: "PUNB0665000",
    branch: "Sahara, Agra",
    beneficiaryName: "HEM Corporation Pvt Ltd",
    upiId: "hemcorporation@pnb",
  },
  policies: {
    leatherGuarantee: {
      title: "100% Premium Certified Leather Guarantee",
      subtitle: "Full-Grain Certified Italian & Tuscan Tanned Hides",
      description:
        "Every HEMLIFESTYLE piece is handcrafted exclusively from certified top-tier full-grain leather, inspected rigorously for natural grain integrity, tensile durability, and enduring patina development. We guarantee zero synthetic blends or bonded leather.",
      certificationNo: "HL-CERT-2026-AGR",
      testingStandard: "ISO 17075 & REACH Compliant Tanning",
    },
    exchangePolicy: {
      title: "7-Days Exchange Policy",
      summary: "Hassle-free size or style exchange within 7 days of verified doorstep delivery.",
      conditions: [
        "Product must be completely unused, with original dust bag, tags, and authenticity certificate intact.",
        "Exchange request initiated within 7 calendar days from delivery timestamp.",
        "Reverse courier pickup arranged by our white-glove logistics partners.",
      ],
    },
    returnPolicy: {
      title: "Strict Return Policy (Damaged / Defective Only)",
      summary:
        "Returns and refunds are accepted STRICTLY for items received in damaged or defective condition, verified via mandatory continuous unboxing video.",
      mandatoryUnboxingClause:
        "To protect both patrons and our artisan workshop, an unedited, continuous unboxing video recorded from the moment of opening the original sealed shipping packaging is mandatory for reporting any transit damage, hardware defects, or manufacturing discrepancies.",
      timeline: "Report required within 48 hours of delivery with continuous video evidence.",
    },
  },
};

export const CORE_CATEGORIES = [
  "Women's Leather Bags",
  "Men's Leather Bags",
  "Leather Jackets",
  "Travel Bags",
  "Handbags",
  "Backpacks & Messenger",
] as const;

export type CoreCategory = (typeof CORE_CATEGORIES)[number];
