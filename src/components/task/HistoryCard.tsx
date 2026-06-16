import type { HistoryTask } from "../../types";
import { useCategories } from "../../hooks/useCategories";
import { formatDateTime } from "../../utils/formatter";
import { getCategoryColor } from "../../utils/categoryColor";

const STATUS_STYLE: Record<HistoryTask["status"], { badge: string; label: string }> = {
  completed: { badge: "bg-emerald-100 text-emerald-700", label: "✓ Selesai" },
  missed: { badge: "bg-red-100 text-red-700", label: "✕ Terlewat" },
};

export default function HistoryCard({ item }: { item: HistoryTask }) {
  const { getCategoryName } = useCategories();
  const style = STATUS_STYLE[item.status];

  return (
    <li className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-800/80">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${getCategoryColor(item.categoryId)}`}
            >
              {getCategoryName(item.categoryId)}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}>
              {style.label}
            </span>
          </div>
          <h3 className="mt-2 truncate font-semibold text-slate-800 dark:text-slate-100">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Deadline: {formatDateTime(item.deadline)}
          </p>
          {item.status === "completed" && item.completedAt && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Diselesaikan: {formatDateTime(item.completedAt)}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
