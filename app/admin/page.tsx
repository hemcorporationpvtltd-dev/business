"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProducts } from "@/context/ProductContext";
import { Product, ProductCategory } from "@/types";
import { COMPANY_DETAILS, CORE_CATEGORIES } from "@/lib/constants";
import InvoiceModal from "@/components/InvoiceModal";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Plus,
  Trash2,
  Edit3,
  Search,
  RotateCcw,
  CheckCircle2,
  X,
  ExternalLink,
  Eye,
  Printer,
  Landmark,
  ShieldCheck,
  Video,
  Activity,
  Calendar,
  Building2,
  ArrowUpRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefault,
    stats,
  } = useProducts();

  const [activeTab, setActiveTab] = useState<"products" | "orders" | "analytics" | "company">("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("All");

  // Invoice Modal State
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Analytics & visits
  const [websiteVisits, setWebsiteVisits] = useState(1482);
  const [analyticsLogs, setAnalyticsLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.analytics) {
          setWebsiteVisits(d.analytics.totalVisits || 1482);
          if (d.analytics.logs) setAnalyticsLogs(d.analytics.logs);
        }
      })
      .catch(() => {});
  }, []);

  // Form Fields
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    category: "Women's Leather Bags" as ProductCategory,
    image: "",
    description: "",
    badge: "100% Certified Leather",
    material: "100% Certified Full-Grain Leather",
    dimensions: "Standard Atelier Cut",
    hardware: "Solid Antiqued Brass",
    warranty: "5-Year Artisan Warranty",
    inStock: true,
    isFeatured: false,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      price: "",
      originalPrice: "",
      category: "Women's Leather Bags",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
      description: "Handcrafted from certified full-grain cowhide leather with antique brass hardware.",
      badge: "100% Certified Leather",
      material: "100% Certified Full-Grain Leather",
      dimensions: "40cm (W) x 30cm (H) x 14cm (D)",
      hardware: "Solid Antiqued Brass",
      warranty: "5-Year Craftsmanship Warranty",
      inStock: true,
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
      category: product.category,
      image: product.image,
      description: product.description,
      badge: product.badge || "100% Certified Leather",
      material: product.details?.material || "100% Certified Full-Grain Leather",
      dimensions: product.details?.dimensions || "Standard Atelier Dimensions",
      hardware: product.details?.hardware || "Solid Antiqued Brass",
      warranty: product.details?.warranty || "5-Year Guarantee",
      inStock: product.inStock ?? true,
      isFeatured: product.isFeatured ?? false,
    });
    setIsModalOpen(true);
  };

const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.image) {
      alert("Please provide Title, Price, and Product Image URL.");
      return;
    }

    const priceNum = parseFloat(formData.price);
    const originalPriceNum = formData.originalPrice
      ? parseFloat(formData.originalPrice)
      : Math.round(priceNum * 1.25);

    const productPayload = {
      title: formData.title,
      price: priceNum,
      originalPrice: originalPriceNum,
      category: formData.category,
      image: formData.image,
      description: formData.description,
      badge: formData.badge,
      inStock: formData.inStock,
      isFeatured: formData.isFeatured,
      details: {
        material: formData.material,
        dimensions: formData.dimensions,
        hardware: formData.hardware,
        warranty: formData.warranty,
        origin: "Agra Atelier, Uttar Pradesh, India",
      },
    };

    try {
      const response = await fetch("/api/products", {
        method: editingProduct ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingProduct ? { id: editingProduct.id, ...productPayload } : productPayload
        ),
      });

      if (!response.ok) throw new Error("Failed to save product to database");

      if (editingProduct) {
        updateProduct(editingProduct.id, productPayload);
        showNotification(`Updated "${formData.title}" in database.`);
      } else {
        addProduct(productPayload);
        showNotification(`Added "${formData.title}" to database.`);
      }

      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error saving product. Please check console.");
    }
  };
  const handleDelete = (id: string, title: string) => {
    if (confirm(`Remove "${title}" permanently from inventory?`)) {
      deleteProduct(id);
      showNotification(`Removed "${title}".`);
    }
  };

  const handleOpenInvoice = (order: any) => {
    setSelectedInvoiceOrder(order);
    setIsInvoiceOpen(true);
  };

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      filterCategory === "All" || p.category === filterCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === "All") return true;
    return o.status.toLowerCase() === orderStatusFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 py-10 sm:py-14 bg-leather-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Notification Toast */}
        {notification && (
          <aside
            aria-label="Notification"
            className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center justify-between animate-in fade-in"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{notification}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-neutral-400 hover:text-white"
            >
              &times;
            </button>
          </aside>
        )}

        {/* Dashboard Executive Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 mb-8 border-b border-amber-500/20 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-amber-400 overflow-hidden shrink-0">
                <Image
                  src="/logo-mark.png"
                  alt="HL"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                HEMLIFESTYLE &bull; Executive Command Center
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-luxury gold-gradient-text tracking-wide">
              Proprietor Dashboard: {COMPANY_DETAILS.owner}
            </h1>
            <p className="text-xs text-neutral-400 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>{COMPANY_DETAILS.legalName}</span>
              <span>&bull;</span>
              <span>GSTIN: <strong className="font-mono text-amber-400">{COMPANY_DETAILS.gstin}</strong></span>
              <span>&bull;</span>
              <span>Agra Headquarter</span>
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Creation</span>
            </button>

            <button
              onClick={() => {
                if (confirm("Reset catalog and orders to default seed data?")) {
                  resetToDefault();
                  showNotification("Catalog and sample orders reset to defaults.");
                }
              }}
              className="px-4 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <Link
              href="/"
              className="px-4 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Real-Time Key Performance Indicators (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* KPI 1: Total Revenue */}
          <div className="p-5 rounded-2xl bg-[#0e0e12] border border-amber-500/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase font-mono tracking-wider text-neutral-400">
                  Gross Revenue (INR)
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 mt-1">
                  {formatINR(stats.totalRevenue)}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 mt-3 flex items-center gap-1">
              
            </p>
          </div>

          {/* KPI 2: Total Orders */}
          <div className="p-5 rounded-2xl bg-[#0e0e12] border border-amber-500/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase font-mono tracking-wider text-neutral-400">
                  Total Orders
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                  {stats.totalOrders}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 mt-3 flex items-center gap-1">
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>Unboxing protocol verified</span>
            </p>
          </div>

          {/* KPI 3: Live Website Visits */}
          <div className="p-5 rounded-2xl bg-[#0e0e12] border border-amber-500/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase font-mono tracking-wider text-neutral-400">
                  Total Website Visits
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                  {websiteVisits.toLocaleString("en-IN")}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-emerald-400 mt-3 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-time audience tracking</span>
            </p>
          </div>

          {/* KPI 4: Catalog Creations */}
          <div className="p-5 rounded-2xl bg-[#0e0e12] border border-amber-500/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase font-mono tracking-wider text-neutral-400">
                  Catalog Inventory
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                  {stats.totalProducts} Pieces
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 mt-3 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Across 6 Core Categories</span>
            </p>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-6 mb-8 border-b border-neutral-800 overflow-x-auto whitespace-nowrap">
          {[
            { id: "products", label: `Product Catalog (${products.length})` },
            { id: "orders", label: `Client Commissions (${orders.length})` },
            { id: "analytics", label: "Traffic & Visitor Tracking" },
            
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all relative ${
                activeTab === tab.id
                  ? "text-amber-400 border-b-2 border-amber-400 font-bold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================
            TAB 1: PRODUCT CATALOG MANAGEMENT (6 CATEGORIES)
            ======================================================== */}
        {activeTab === "products" && (
          <div className="space-y-5">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#0e0e12] border border-neutral-800">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by title, ID, or leather type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 focus:outline-none focus:border-amber-400 cursor-pointer font-medium"
                >
                  <option value="All">All 6 Categories</option>
                  {CORE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="rounded-2xl border border-neutral-800 bg-[#0e0e12] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121217] text-amber-400 uppercase tracking-wider text-[11px] font-mono border-b border-neutral-800">
                    <tr>
                      <th className="py-4 px-5">Creation</th>
                      <th className="py-4 px-5">Category</th>
                      <th className="py-4 px-5">Price (INR)</th>
                      <th className="py-4 px-5">Material Guarantee</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-neutral-500">
                          No creations match the selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-neutral-900/60 transition-colors">
                          {/* Image & Title */}
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-14 rounded-lg overflow-hidden bg-neutral-950 shrink-0 border border-neutral-800">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={p.image}
                                  alt={p.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <Link
                                  href={`/product/${p.id}`}
                                  className="font-bold text-white hover:text-amber-300 transition-colors line-clamp-1 font-serif"
                                >
                                  {p.title}
                                </Link>
                                <span className="text-[10px] text-neutral-500 font-mono">
                                  ID: {p.id}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-5 text-neutral-300">
                            <span className="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-[10px] uppercase font-mono text-amber-300">
                              {p.category}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-5">
                            <div className="font-bold text-amber-400 font-mono text-xs">
                              {formatINR(p.price)}
                            </div>
                            {p.originalPrice && (
                              <div className="text-[10px] text-neutral-500 line-through font-mono">
                                {formatINR(p.originalPrice)}
                              </div>
                            )}
                          </td>

                          {/* Material */}
                          <td className="py-3.5 px-5 text-neutral-300">
                            <span className="inline-flex items-center gap-1 text-[11px] text-neutral-300">
                              <ShieldCheck className="w-3 h-3 text-amber-400" />
                              <span>{p.badge || "100% Certified Leather"}</span>
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                                p.inStock ?? true
                                  ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                                  : "bg-rose-950/60 text-rose-400 border border-rose-500/30"
                              }`}
                            >
                              {p.inStock ?? true ? "In Stock" : "Archived"}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditModal(p)}
                                className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 text-amber-400 transition-colors border border-neutral-700"
                                title="Edit Product"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(p.id, p.title)}
                                className="p-2 rounded bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 transition-colors border border-rose-500/30"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <Link
                                href={`/product/${p.id}`}
                                className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors border border-neutral-700"
                                title="View on Storefront"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: CLIENT ORDERS LOG & TAX INVOICE GENERATION
            ======================================================== */}
        {activeTab === "orders" && (
          <div className="space-y-5">
            {/* Orders Filter */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0e0e12] border border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono text-neutral-400">Filter Status:</span>
                {["All", "Confirmed", "Processing", "Shipped", "Delivered"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                      orderStatusFilter === st
                        ? "bg-amber-400 text-black font-bold"
                        : "bg-neutral-900 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <span className="text-xs text-neutral-400 font-mono">
                {filteredOrders.length} Commissions
              </span>
            </div>

            {/* Orders Table */}
            <div className="rounded-2xl border border-neutral-800 bg-[#0e0e12] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121217] text-amber-400 uppercase tracking-wider text-[11px] font-mono border-b border-neutral-800">
                    <tr>
                      <th className="py-4 px-5">Order ID</th>
                      <th className="py-4 px-5">Client / Phone</th>
                      <th className="py-4 px-5">Destination</th>
                      <th className="py-4 px-5">Payment &amp; UTR</th>
                      <th className="py-4 px-5">Total</th>
                      <th className="py-4 px-5">Unboxing Video</th>
                      <th className="py-4 px-5 text-right">Tax Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-neutral-900/60 transition-colors">
                        <td className="py-4 px-5 font-mono font-bold text-amber-300">
                          {ord.orderNumber || ord.id}
                        </td>
                        <td className="py-4 px-5">
                          <div className="font-bold text-white">{ord.customerName}</div>
                          <div className="text-[10px] text-neutral-400 font-mono">
                            {ord.customerPhone} &bull; {ord.customerEmail}
                          </div>
                        </td>
                        <td className="py-4 px-5 text-neutral-300">
                          <div>{ord.address}</div>
                          <div className="text-[10px] text-neutral-400">
                            {ord.city}, {ord.postalCode}
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <span className="font-semibold text-neutral-200 block">
                            {ord.paymentMethod}
                          </span>
                          {ord.transactionUtr ? (
                            <span className="text-[10px] font-mono text-amber-300">
                              UTR: {ord.transactionUtr}
                            </span>
                          ) : (
                            <span className="text-[10px] text-neutral-500 font-mono">
                              Settlement Pending
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-5 font-bold text-amber-400 font-mono text-xs">
                          {formatINR(ord.total)}
                        </td>
                        <td className="py-4 px-5">
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-mono">
                            <Video className="w-3 h-3" />
                            Agreed
                          </span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button
                            onClick={() => handleOpenInvoice(ord)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black font-semibold text-xs transition-colors border border-amber-500/40"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>View GST Invoice</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: TRAFFIC & REAL-TIME ANALYTICS TRACKING
            ======================================================== */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl bg-[#0e0e12] border border-amber-500/20 space-y-2">
                <span className="text-xs uppercase font-mono text-neutral-400">Total Site Footfall</span>
                <p className="text-3xl font-bold font-mono text-white">
                  {websiteVisits.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-neutral-500">Continuous centralized session tracking</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0e0e12] border border-amber-500/20 space-y-2">
                <span className="text-xs uppercase font-mono text-neutral-400">Orders Conversion Rate</span>
                <p className="text-3xl font-bold font-mono text-amber-400">
                  {websiteVisits > 0
                    ? ((orders.length / websiteVisits) * 100).toFixed(2)
                    : "0.00"}
                  %
                </p>
                <p className="text-xs text-neutral-500">Commission completed per visit</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0e0e12] border border-amber-500/20 space-y-2">
                <span className="text-xs uppercase font-mono text-neutral-400">Average Commission Value</span>
                <p className="text-3xl font-bold font-mono text-white">
                  {orders.length > 0
                    ? formatINR(Math.round(stats.totalRevenue / orders.length))
                    : "₹0"}
                </p>
                <p className="text-xs text-neutral-500">Luxury leather cart average</p>
              </div>
            </div>

            {/* Event Audit Log */}
            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-neutral-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono">
                Recent Traffic &amp; Visit Telemetry Logs
              </h3>

              <div className="space-y-2 font-mono text-xs">
                {analyticsLogs.length > 0 ? (
                  analyticsLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-neutral-800"
                    >
                      <span className="text-neutral-300">{log.event} &bull; {log.path}</span>
                      <span className="text-neutral-500 text-[11px]">
                        {new Date(log.timestamp).toLocaleTimeString("en-IN")}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-neutral-500 text-xs py-4">
                    Tracking incoming requests from patrons across India...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: CORPORATE & PNB BANK SETTLEMENT VERIFICATION
            ======================================================== */}
        {activeTab === "company" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1: Official Corporate Entity */}
            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white font-serif">
                  Corporate Registration &bull; Uttar Pradesh
                </h3>
              </div>

              <div className="space-y-2.5 text-xs text-neutral-300">
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Brand Name:</span>
                  <span className="font-bold text-white font-serif">{COMPANY_DETAILS.brandName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Legal Corporate Entity:</span>
                  <span className="font-bold text-white">{COMPANY_DETAILS.legalName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Proprietor / Director:</span>
                  <span className="font-bold text-amber-400">{COMPANY_DETAILS.owner}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Official GSTIN:</span>
                  <span className="font-mono font-bold text-amber-300">{COMPANY_DETAILS.gstin}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Agra Registered Address:</span>
                  <span className="text-right max-w-xs">{COMPANY_DETAILS.registeredAddress.formatted}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">Official Support Email:</span>
                  <span className="font-mono text-amber-400">{COMPANY_DETAILS.contact.email}</span>
                </div>
              </div>
            </div>

            {/* Card 2: Punjab National Bank Current Account */}
            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                <Landmark className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white font-serif">
                  Punjab National Bank Settlement Channel
                </h3>
              </div>

              <div className="space-y-2.5 text-xs text-neutral-300">
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Bank Name:</span>
                  <span className="font-bold text-white">{COMPANY_DETAILS.bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Account Type:</span>
                  <span className="font-bold text-emerald-400">{COMPANY_DETAILS.bankDetails.accountType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Account Number:</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">
                    {COMPANY_DETAILS.bankDetails.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">IFSC Code:</span>
                  <span className="font-mono font-bold text-amber-300">
                    {COMPANY_DETAILS.bankDetails.ifscCode}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Beneficiary:</span>
                  <span className="font-bold text-white">{COMPANY_DETAILS.bankDetails.beneficiaryName}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">Branch Location:</span>
                  <span>{COMPANY_DETAILS.bankDetails.branch}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0e0e12] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-neutral-100">
            {/* Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-[#0a0a0d]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">
                  Atelier Catalog Management
                </span>
                <h3 className="text-lg font-bold text-white font-serif">
                  {editingProduct ? `Edit: ${editingProduct.title}` : "Commission New Leather Creation"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitForm} className="p-6 overflow-y-auto space-y-4 bg-[#0e0e12]">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-amber-400 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Venetian Woven Leather Backpack"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-amber-400 mb-1">
                    Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="24999"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1">
                    Original Price / MRP (INR ₹)
                  </label>
                  <input
                    type="number"
                    placeholder="29999"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-amber-400 mb-1">
                  Core Category (6 Categories) *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as ProductCategory,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer font-medium"
                >
                  {CORE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-amber-400 mb-1">
                  Product Image URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />

                {/* Preset Options */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                  <span>Presets:</span>
                  {[
                    { label: "Tote Bag", url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85" },
                    { label: "Biker Jacket", url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85" },
                    { label: "Briefcase", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85" },
                    { label: "Weekender Duffle", url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85" },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: p.url })}
                      className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-300"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-amber-400 mb-1">
                  Description &amp; Leather Narrative *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the natural grain, tanning ritual, hardware, and stitching..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1">
                    Material Specification
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GST Tax Invoice Generator Modal */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        isOpen={isInvoiceOpen}
        onClose={() => {
          setIsInvoiceOpen(false);
          setSelectedInvoiceOrder(null);
        }}
      />
    </div>
  );
}
