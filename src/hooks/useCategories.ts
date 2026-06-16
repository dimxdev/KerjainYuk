import { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";

export function useCategories() {
  const ctx = useContext(CategoriesContext);
  if (!ctx) {
    throw new Error("useCategories harus dipakai di dalam <CategoriesProvider>");
  }
  return ctx;
}
