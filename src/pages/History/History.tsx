import { useMemo, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import HistoryCard from "../../components/task/HistoryCard";
import type { HistoryStatus } from "../../types";

type Filter = "all" | HistoryStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "completed", label: "Selesai" },
  { value: "missed", label: "Terlewat" },
];

export default function History() {
  const { history } = useTasks();
  const [filter, setFilter] = useState<Filter>("all");

  const items = useMemo(() => {
    const filtered =
      filter === "all" ? history : history.filter((h) => h.status === filter);
    // Terbaru di atas berdasarkan kapan dipindah ke riwayat.
    return [...filtered].sort(
      (a, b) => new Date(b.movedAt).getTime() - new Date(a.movedAt).getTime()
    );
  }, [history, filter]);

  return (
    <section>
      <h1 className="text-2xl font-bold">Riwayat</h1>
      <p className="mt-1 mb-4 text-sm text-slate-500 dark:text-slate-400">
        Tugas yang sudah selesai atau terlewat.
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-indigo-600 text-white"
                : "border border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-800">
          <p className="text-4xl">🗂️</p>
          <p className="mt-3 font-medium text-slate-700 dark:text-slate-200">
            Riwayat masih kosong
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Tugas yang selesai atau terlewat akan muncul di sini.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <HistoryCard key={`${item.id}-${item.movedAt}`} item={item} />
          ))}
        </ul>
      )}
    </section>
  );
}
