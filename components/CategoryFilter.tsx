"use client";

import React from "react";
import { ProductCategory } from "@/types";
import { CORE_CATEGORIES } from "@/lib/constants";

export type FilterCategory = "All" | ProductCategory;

export const CATEGORY_TABS: FilterCategory[] = [
  "All",
  ...CORE_CATEGORIES,
];

interface CategoryFilterProps {
  selectedCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
  categoryCounts: Record<string, number>;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: CategoryFilterProps) {
  return (
    <div className="w-full">
      {/* Luxury horizontal filter pills with gold accents */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORY_TABS.map((category) => {
          const isSelected = selectedCategory === category;
          const count =
            category === "All"
              ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
              : categoryCounts[category] || 0;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-full text-[11px] uppercase tracking-[0.16em] font-medium transition-all duration-200 flex items-center gap-2 shrink-0 ${
                isSelected
                  ? "bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold shadow-lg shadow-amber-500/20"
                  : "bg-neutral-900/80 text-neutral-300 border border-neutral-800 hover:border-amber-500/40 hover:text-white"
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? "bg-black/20 text-black font-bold" : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
