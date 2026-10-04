"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  discountCode: string;
  appliedCode: string | null;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toast: { message: string; type: "success" | "info" } | null;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("hemlifestyle_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCode = localStorage.getItem("hemlifestyle_discount_code");
      if (savedCode) {
        setAppliedCode(savedCode);
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("hemlifestyle_cart", JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart to storage", e);
      }
    }
  }, [cart, isInitialized]);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const hideToast = () => setToast(null);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });

    showToast(`Added "${product.title}" to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from your cart", "info");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCode(null);
    localStorage.removeItem("hemlifestyle_cart");
    localStorage.removeItem("hemlifestyle_discount_code");
  };

  const applyDiscountCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === "LUXURY10" || formatted === "HEM10") {
      setAppliedCode(formatted);
      localStorage.setItem("hemlifestyle_discount_code", formatted);
      showToast(`Promo code ${formatted} applied! 10% discount added.`);
      return { success: true, message: "10% off applied successfully!" };
    } else if (formatted === "VIP20") {
      setAppliedCode(formatted);
      localStorage.setItem("hemlifestyle_discount_code", formatted);
      showToast(`VIP Code applied! 20% discount added.`);
      return { success: true, message: "20% VIP discount applied!" };
    } else {
      return {
        success: false,
        message: "Invalid code. Try 'LUXURY10' or 'VIP20' for exclusive privilege.",
      };
    }
  };

  const removeDiscountCode = () => {
    setAppliedCode(null);
    localStorage.removeItem("hemlifestyle_discount_code");
    showToast("Promo discount removed", "info");
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  let discountRate = 0;
  if (appliedCode === "LUXURY10" || appliedCode === "HEM10") discountRate = 0.1;
  if (appliedCode === "VIP20") discountRate = 0.2;

  const discount = Math.round(subtotal * discountRate);
  // Free shipping for luxury orders above ₹5000 (all our products qualify!)
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 499;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        shipping,
        total,
        discountCode: appliedCode || "",
        appliedCode,
        applyDiscountCode,
        removeDiscountCode,
        isCartOpen,
        setIsCartOpen,
        toast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
