import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Category } from "../types";
import { STORAGE_KEYS, getItem, setItem } from "../services/localStorageService";
import { toTitleCase } from "../utils/formatter";

const DEFAULT_CATEGORIES: Category[] = [
  { id: "kuliah", name: "Kuliah" },
  { id: "keseharian", name: "Keseharian" },
];

export interface CategoriesContextValue {
  categories: Category[];
  addCategory: (name: string) => void;
  editCategory: (id: string, name: string) => void;
  deleteCategory: (id: string) => void;
  getCategoryName: (id: string) => string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CategoriesContext = createContext<CategoriesContextValue | null>(null);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(() =>
    getItem<Category[]>(STORAGE_KEYS.categories, DEFAULT_CATEGORIES)
  );

  useEffect(() => {
    setItem(STORAGE_KEYS.categories, categories);
  }, [categories]);

  function addCategory(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCategories((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: toTitleCase(trimmed) },
    ]);
  }

  function editCategory(id: string, name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: toTitleCase(trimmed) } : c))
    );
  }

  function deleteCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  function getCategoryName(id: string) {
    return categories.find((c) => c.id === id)?.name ?? "Tanpa Kategori";
  }

  return (
    <CategoriesContext.Provider
      value={{ categories, addCategory, editCategory, deleteCategory, getCategoryName }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
