import { Product, Order, AnalyticsMetric, OrderStatus, PaymentStatus } from "@/types";
import { INITIAL_PRODUCTS } from "@/data/products";
import { COMPANY_DETAILS } from "@/lib/constants";
import prisma from "@/lib/prisma";

// Global in-memory storage fallback for resilient local execution without Postgres setup
declare global {
  // eslint-disable-next-line no-var
  var __HEM_PRODUCTS__: Product[] | undefined;
  // eslint-disable-next-line no-var
  var __HEM_ORDERS__: Order[] | undefined;
  // eslint-disable-next-line no-var
  var __HEM_VISITS__: number | undefined;
  // eslint-disable-next-line no-var
  var __HEM_LOGS__: Array<{ id: string; event: string; path: string; timestamp: string }> | undefined;
}

if (!global.__HEM_PRODUCTS__) {
  global.__HEM_PRODUCTS__ = [...INITIAL_PRODUCTS];
}

if (!global.__HEM_ORDERS__) {
  global.__HEM_ORDERS__ = [
    {
      id: "ord-1001",
      orderNumber: "HL-2026-8901",
      customerName: "Vikramaditya Rathore",
      customerEmail: "vikram.rathore@example.com",
      customerPhone: "+91 98290 11223",
      address: "42, Civil Lines, Near Circuit House",
      city: "Jaipur",
      state: "Rajasthan",
      postalCode: "302006",
      items: [
        {
          product: INITIAL_PRODUCTS[2], // The Viceroy Briefcase
          quantity: 1,
        },
      ],
      subtotal: 18999,
      discount: 0,
      shipping: 0,
      tax: 3419.82,
      total: 18999,
      status: "Processing",
      paymentMethod: "Direct Bank Transfer",
      paymentStatus: "Verified",
      transactionUtr: "PNBN261003449812",
      unboxingVideoAgreed: true,
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      companyDetails: COMPANY_DETAILS,
    },
    {
      id: "ord-1002",
      orderNumber: "HL-2026-8902",
      customerName: "Ananya Deshmukh",
      customerEmail: "ananya.d@example.com",
      customerPhone: "+91 97654 32109",
      address: "Penthouse 14B, Hiranandani Gardens, Powai",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400076",
      items: [
        {
          product: INITIAL_PRODUCTS[0], // Royal Agra Tote
          quantity: 1,
        },
      ],
      subtotal: 14999,
      discount: 0,
      shipping: 0,
      tax: 2699.82,
      total: 14999,
      status: "Shipped",
      paymentMethod: "UPI / QR",
      paymentStatus: "Paid",
      transactionUtr: "UPI/328901844910",
      unboxingVideoAgreed: true,
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      companyDetails: COMPANY_DETAILS,
    },
  ];
}

if (typeof global.__HEM_VISITS__ === "undefined") {
  global.__HEM_VISITS__ = 1420;
}

if (!global.__HEM_LOGS__) {
  global.__HEM_LOGS__ = [
    {
      id: "log-1",
      event: "PAGE_VIEW",
      path: "/",
      timestamp: new Date().toISOString(),
    },
  ];
}

export const dbStore = {
  // Products API
  async getProducts(): Promise<Product[]> {
    if (process.env.DATABASE_URL) {
      try {
        const dbProducts = await prisma.product.findMany({
          orderBy: { createdAt: "desc" },
        });
        if (dbProducts && dbProducts.length > 0) {
          return dbProducts.map((p: any) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            price: p.price,
            originalPrice: p.originalPrice || undefined,
            category: p.category as any,
            image: p.image,
            additionalImages: p.additionalImages,
            description: p.description,
            rating: p.rating,
            reviewCount: p.reviewCount,
            inStock: p.inStock,
            badge: p.badge || undefined,
            isFeatured: p.isFeatured,
            details: {
              material: p.material,
              dimensions: p.dimensions || "Artisanal Specifications",
              hardware: p.hardware || "Solid Brass",
              warranty: p.warranty || "5-Year Guarantee",
              origin: p.origin || "Agra Atelier, India",
              lining: p.lining || "Cotton canvas",
              closure: p.closure || "YKK Brass Zips",
              weight: p.weight || "1.2 kg",
            },
          }));
        }
      } catch (err) {
        console.warn("Prisma query fallback to memory store:", err);
      }
    }
    return global.__HEM_PRODUCTS__ || INITIAL_PRODUCTS;
  },

  async getProductById(id: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find((p) => p.id === id || p.slug === id) || null;
  },

  async addProduct(newProduct: Omit<Product, "id">): Promise<Product> {
    const product: Product = {
      ...newProduct,
      id: `hl-${Date.now().toString(36)}`,
    };
    if (process.env.DATABASE_URL) {
      try {
        const slug =
          product.slug ||
          product.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        await prisma.product.create({
          data: {
            id: product.id,
            title: product.title,
            slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
            price: product.price,
            originalPrice: product.originalPrice,
            category: product.category,
            image: product.image,
            additionalImages: product.additionalImages || [],
            description: product.description,
            badge: product.badge,
            inStock: product.inStock ?? true,
            isFeatured: product.isFeatured ?? false,
            material: product.details?.material || "100% Certified Full-Grain Leather",
            dimensions: product.details?.dimensions,
            hardware: product.details?.hardware,
            warranty: product.details?.warranty,
            origin: product.details?.origin,
          },
        });
      } catch (err) {
        console.warn("Prisma insert fallback:", err);
      }
    }
    global.__HEM_PRODUCTS__ = [product, ...(global.__HEM_PRODUCTS__ || [])];
    return product;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const products = global.__HEM_PRODUCTS__ || [];
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const updated = { ...products[index], ...updates };
    products[index] = updated;
    global.__HEM_PRODUCTS__ = products;
    return updated;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const products = global.__HEM_PRODUCTS__ || [];
    const beforeCount = products.length;
    global.__HEM_PRODUCTS__ = products.filter((p) => p.id !== id);
    return global.__HEM_PRODUCTS__.length < beforeCount;
  },

  // Orders API
  async getOrders(): Promise<Order[]> {
    return global.__HEM_ORDERS__ || [];
  },

  async getOrderById(id: string): Promise<Order | null> {
    const orders = await this.getOrders();
    return orders.find((o) => o.id === id || o.orderNumber === id) || null;
  },

  async createOrder(data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    city: string;
    state?: string;
    postalCode: string;
    items: Order["items"];
    paymentMethod: Order["paymentMethod"];
    transactionUtr?: string;
    unboxingVideoAgreed: boolean;
  }): Promise<Order> {
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.18 * 100) / 100; // 18% GST calculation
    const shipping = 0; // Complimentary luxury shipping
    const total = subtotal;

    const orderNumber = `HL-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      address: data.address,
      city: data.city,
      state: data.state || "Uttar Pradesh",
      postalCode: data.postalCode,
      items: data.items,
      subtotal,
      discount: 0,
      shipping,
      tax,
      total,
      status: "Confirmed",
      paymentMethod: data.paymentMethod,
      paymentStatus:
        data.paymentMethod === "Cash on Delivery"
          ? "Pending"
          : data.transactionUtr
          ? "Verified"
          : "Paid",
      transactionUtr: data.transactionUtr,
      unboxingVideoAgreed: data.unboxingVideoAgreed,
      createdAt: new Date().toISOString(),
      companyDetails: COMPANY_DETAILS,
    };

    global.__HEM_ORDERS__ = [newOrder, ...(global.__HEM_ORDERS__ || [])];
    return newOrder;
  },

  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    paymentStatus?: PaymentStatus
  ): Promise<Order | null> {
    const orders = global.__HEM_ORDERS__ || [];
    const index = orders.findIndex((o) => o.id === orderId || o.orderNumber === orderId);
    if (index === -1) return null;
    orders[index].status = status;
    if (paymentStatus) {
      orders[index].paymentStatus = paymentStatus;
    }
    return orders[index];
  },

  // Analytics & Tracking API
  async trackVisit(path: string = "/"): Promise<number> {
    global.__HEM_VISITS__ = (global.__HEM_VISITS__ || 1420) + 1;
    global.__HEM_LOGS__ = [
      {
        id: `log-${Date.now()}`,
        event: "PAGE_VIEW",
        path,
        timestamp: new Date().toISOString(),
      },
      ...(global.__HEM_LOGS__ || []).slice(0, 99),
    ];
    return global.__HEM_VISITS__;
  },

  async getAnalytics(): Promise<AnalyticsMetric & { logs: typeof global.__HEM_LOGS__ }> {
    const orders = global.__HEM_ORDERS__ || [];
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const totalVisits = global.__HEM_VISITS__ || 1420;
    const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    const conversionRate =
      totalVisits > 0 ? Math.round((totalOrders / totalVisits) * 1000) / 10 : 0;

    return {
      totalRevenue,
      totalOrders,
      totalVisits,
      averageOrderValue,
      conversionRate,
      recentOrdersCount: orders.filter(
        (o) => new Date(o.createdAt).getTime() > Date.now() - 3600000 * 24 * 7
      ).length,
      logs: global.__HEM_LOGS__ || [],
    };
  },
};
