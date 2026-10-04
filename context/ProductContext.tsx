"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Order, COMPANY_DETAILS } from "@/types";
import { INITIAL_PRODUCTS } from "@/data/products";

interface ProductContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefault: () => void;
  getProductById: (id: string) => Product | undefined;
  getOrderById: (id: string) => Order | undefined;
  placeOrder: (orderData: Partial<Order> & { customerName: string; address: string; items: any[]; total: number }) => Order;
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
  };
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const INITIAL_ORDERS: Order[] = [
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
    createdAt: "2026-09-28T14:32:00Z",
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
    createdAt: "2026-10-01T09:15:00Z",
    companyDetails: COMPANY_DETAILS,
  },
  {
    id: "ord-1003",
    orderNumber: "HL-2026-8903",
    customerName: "Aishwarya Oberoi",
    customerEmail: "aishwarya.o@oberoi.in",
    customerPhone: "+91 99112 88402",
    address: "42 Amrita Shergill Marg",
    city: "New Delhi",
    state: "Delhi",
    postalCode: "110003",
    items: [
      {
        product: INITIAL_PRODUCTS[4], // The Sovereign Biker Jacket
        quantity: 1,
      },
    ],
    subtotal: 24999,
    discount: 2499,
    shipping: 0,
    tax: 4499.82,
    total: 22500,
    status: "Delivered",
    paymentMethod: "Credit / Debit Card",
    paymentStatus: "Paid",
    transactionUtr: "CARD_PVE_994123",
    unboxingVideoAgreed: true,
    createdAt: "2026-10-02T18:40:00Z",
    companyDetails: COMPANY_DETAILS,
  },
];

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem("hemlifestyle_products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }

      const storedOrders = localStorage.getItem("hemlifestyle_orders");
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (e) {
      console.error("Failed to load products/orders from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("hemlifestyle_products", JSON.stringify(products));
      } catch (e) {
        console.error("Failed to persist products", e);
      }
    }
  }, [products, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("hemlifestyle_orders", JSON.stringify(orders));
      } catch (e) {
        console.error("Failed to persist orders", e);
      }
    }
  }, [orders, isInitialized]);

  const addProduct = (productData: Omit<Product, "id">): Product => {
    const newProduct: Product = {
      ...productData,
      id: `hl-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 1,
      inStock: productData.inStock ?? true,
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    localStorage.removeItem("hemlifestyle_products");
    localStorage.removeItem("hemlifestyle_orders");
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id || p.slug === id);
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find((o) => o.id === id || o.orderNumber === id);
  };

  const placeOrder = (
    orderData: Partial<Order> & { customerName: string; address: string; items: any[]; total: number }
  ): Order => {
    const orderNumber = `HL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail || "patron@hemlifestyle.com",
      customerPhone: orderData.customerPhone || "+91 98971 98570",
      address: orderData.address,
      city: orderData.city || "Agra",
      state: orderData.state || "Uttar Pradesh",
      postalCode: orderData.postalCode || "283105",
      items: orderData.items,
      subtotal: orderData.subtotal || orderData.total,
      discount: orderData.discount || 0,
      shipping: orderData.shipping || 0,
      tax: orderData.tax || Math.round((orderData.total * 0.18) * 100) / 100,
      total: orderData.total,
      status: "Confirmed",
      paymentMethod: orderData.paymentMethod || "Direct Bank Transfer",
      paymentStatus: orderData.paymentMethod === "Cash on Delivery" ? "Pending" : "Verified",
      transactionUtr: orderData.transactionUtr,
      unboxingVideoAgreed: orderData.unboxingVideoAgreed ?? true,
      createdAt: new Date().toISOString(),
      companyDetails: COMPANY_DETAILS,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  return (
    <ProductContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefault,
        getProductById,
        getOrderById,
        placeOrder,
        stats: {
          totalProducts,
          totalOrders,
          totalRevenue,
        },
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
