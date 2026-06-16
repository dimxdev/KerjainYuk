import { useState } from "react";
import type { Category } from "../../types";
import CategoryForm from "./CategoryForm";

interface CategoryListProps {
  categories: Category[];
  /** Jumlah pemakaian per id kategori (tugas aktif + riwayat). */
  usageCount: Record<string, number>;
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export default function CategoryList({
  categories,
  usageCount,
  onEdit,
  onDelete,
}: CategoryListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-4xl">🏷️</p>
        <p className="mt-3 font-medium text-slate-700 dark:text-slate-200">
          Belum ada kategori
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tambahkan kategori pertamamu di atas.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {categories.map((category) => {
        const count = usageCount[category.id] ?? 0;
        const inUse = count > 0;

        if (editingId === category.id) {
          return (
            <li
              key={category.id}
              className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
            >
              <CategoryForm
                initialName={category.name}
                submitLabel="Simpan"
                onSubmit={(name) => {
                  onEdit(category.id, name);
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            </li>
          );
        }

        return (
          <li
            key={category.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
          >
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">{category.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {inUse ? `Dipakai ${count} tugas` : "Belum dipakai"}
              </p>
            </div>
            <div className="flex gap-2 text-sm">
              <button
                onClick={() => setEditingId(category.id)}
                className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(category.id)}
                disabled={inUse}
                title={inUse ? "Kategori masih dipakai, tidak bisa dihapus" : undefined}
                className="rounded-md border border-red-200 px-3 py-1.5 font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40 dark:disabled:border-slate-700 dark:disabled:text-slate-500"
              >
                Hapus
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
