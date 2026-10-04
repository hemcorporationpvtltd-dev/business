# HEMLIFESTYLE (HEM Corporation pvt Ltd)
### Production-Ready Luxury Full-Stack E-Commerce Web Application

A full-stack luxury e-commerce web application engineered for **HEMLIFESTYLE** featuring an obsidian dark theme, sophisticated gold accents, and artisanal leather goods aesthetic.

---

## 1. Brand & Corporate Credentials
- **Brand Marque**: HEMLIFESTYLE (HEM Corporation pvt Ltd)
- **Proprietor / Director**: Kapil Chahar
- **Official GSTIN**: `09MJKPK3269A1ZX`
- **CIN**: `U19120UP2024PTC198570`
- **Registered Atelier Address**: Ground floor, 01, Chaudhary Market, Laramda Maujs, Sahara, Agra, Uttar Pradesh - 283105
- **Customer Support Email**: hemcorporationpvtltd@gmail.com
- **Customer Support Phone**: +91 9897198570

### Official Settlement Channel (Punjab National Bank)
- **Bank Name**: Punjab National Bank (PNB)
- **Account Type**: Current Account
- **Account Number**: `6650002100003331`
- **IFSC Code**: `PUNB0665000`
- **Beneficiary**: HEM Corporation Pvt Ltd
- **Branch**: Sahara, Agra

---

## 2. Core Leather Disciplines (6 Categories)
1. **Women's Leather Bags** (Signature Agra Totes, Structured Flap Shoulder Bags)
2. **Men's Leather Bags** (Executive Double-Gusset Briefcases, Heritage Crossbody Satchels)
3. **Leather Jackets** (Obsidian Lambskin Biker Jackets, Shearling Aviator Bombers)
4. **Travel Bags** (55cm Cabin Weekender Duffles, 2-in-1 Garment Holdalls)
5. **Handbags** (Winged Trapeze Handbags, Evening Minaudière Clutches)
6. **Backpacks & Messenger** (Vanguard Commuter Laptop Backpacks, Urban Leather Messengers)

---

## 3. Tech Stack Architecture
- **Framework**: Next.js 14/16 (App Router, Turbopack, React 19)
- **Language**: TypeScript (Strict typing for Orders, Products, Payments, Analytics)
- **Styling**: Tailwind CSS with custom obsidian black (`#09090b`), gold metallic gradients (`#D4AF37`), gold glow borders, and Cinzel/Playfair luxury serif headings
- **Database & ORM**: Prisma ORM with PostgreSQL (Supabase) integration
- **Icons**: Lucide Icons
- **Resilience**: Hybrid persistence layer with automatic PostgreSQL connection when `DATABASE_URL` is set, and instant zero-config in-memory/persisted local state fallback for dev environments.

---

## 4. Key Business Policies Built-In
- **100% Premium Certified Leather Guarantee**: Prominently highlighted across the storefront, product detail pages, and interactive Certificate of Authenticity modal.
- **7-Days Exchange Policy**: Doorstep replacement across India with dedicated terms modal.
- **Strict Return Policy (Damaged / Defective Only)**: Returns permitted solely for transit damage or defective pieces, enforced via a **mandatory unboxing video protocol checkbox** during checkout and on policy pages.
- **Direct PNB Current Account Checkout**: Patrons can pay directly via bank transfer (with one-click account/IFSC copy and UTR logging), UPI, Credit/Debit Cards, or Cash on Delivery.
- **Automated GST Tax Invoices**: Full printable/save-to-PDF original tax invoice generated with Kapil Chahar digital seal, registered Agra address, GSTIN, HSN codes (4202/4203), and 18% tax breakdown.

---

## 5. Kapil Chahar Admin Portal (`/admin`)
- **Real-Time KPIs**: Track Total Gross Sales (₹), Total Commissions, Live Footfall Visits, and Average Order Value.
- **Product Management**: Create, edit, and archive creations across all 6 core categories with image URL presets and stock controls.
- **Commission & Fulfillment Audit**: Filter orders, inspect client addresses, phone numbers, PNB transfer UTR reference numbers, and unboxing video agreements.
- **Instant Tax Invoice Generation**: Generate and print official GST invoices for any client commission directly from the admin table.
- **Telemetry & Traffic Tracker**: Centralized database logs for visitor events.

---

## 6. Getting Started

### Local Development
```bash
# Navigate to the project directory
cd C:\Users\Dell\.gemini\antigravity\scratch\hemlifestyle

# Install dependencies (if needed)
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront, or [http://localhost:3000/admin](http://localhost:3000/admin) to view Kapil Chahar's Admin Portal.

### Connecting to Live Supabase / PostgreSQL
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Insert your Supabase connection strings:
   ```env
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
   ```
3. Run migrations and generate Prisma client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

### Production Build
```bash
npm run build
npm run start
```
