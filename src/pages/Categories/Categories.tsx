import { useMemo } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useTasks } from "../../hooks/useTasks";
import CategoryForm from "../../components/category/CategoryForm";
import CategoryList from "../../components/category/CategoryList";

export default function Categories() {
  const { categories, addCategory, editCategory, deleteCategory } = useCategories();
  const { tasks, history } = useTasks();

  const usageCount = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of tasks) counts[t.categoryId] = (counts[t.categoryId] ?? 0) + 1;
    for (const h of history) counts[h.categoryId] = (counts[h.categoryId] ?? 0) + 1;
    return counts;
  }, [tasks, history]);

  function handleDelete(id: string) {
    if ((usageCount[id] ?? 0) > 0) {
      window.alert("Kategori ini masih dipakai tugas. Hapus/ubah tugas itu dulu ya.");
      return;
    }
    if (window.confirm("Hapus kategori ini?")) {
      deleteCategory(id);
    }
  }

  return (
    <section className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold">Kategori</h1>
      <p className="mt-1 mb-5 text-sm text-slate-500 dark:text-slate-400">
        Kelola kategori untuk mengelompokkan tugasmu.
      </p>

      <div className="mb-5">
        <CategoryForm submitLabel="Tambah" onSubmit={addCategory} />
      </div>

      <CategoryList
        categories={categories}
        usageCount={usageCount}
        onEdit={editCategory}
        onDelete={handleDelete}
      />
    </section>
  );
}
