"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, Info, X } from "lucide-react";

export default function Toast() {
  const { toast, hideToast } = useCart();

  if (!toast) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-neutral-200 text-neutral-900 px-4 py-3.5 rounded-lg shadow-xl max-w-md animate-in slide-in-from-bottom-4 duration-300"
    >
      {toast.type === "success" ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-neutral-500 shrink-0" />
      )}
      <p className="text-xs font-semibold text-neutral-900 flex-1">{toast.message}</p>
      <button
        onClick={hideToast}
        className="text-neutral-400 hover:text-black transition-colors p-1"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
