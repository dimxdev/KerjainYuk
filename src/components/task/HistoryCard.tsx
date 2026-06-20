import { useState } from "react";
import type { HistoryTask } from "../../types";
import { useCategories } from "../../hooks/useCategories";
import { formatDateTimeWithDay } from "../../utils/formatter";
import { getCategoryColor } from "../../utils/categoryColor";

const STATUS_STYLE: Record<HistoryTask["status"], { badge: string; label: string }> = {
  completed: { badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300", label: "✓ Selesai" },
  missed: { badge: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300", label: "✕ Terlewat" },
};

interface HistoryCardProps {
  item: HistoryTask;
  onDelete?: (id: string) => void;
}

export default function HistoryCard({ item, onDelete }: HistoryCardProps) {
  const { getCategoryName } = useCategories();
  const style = STATUS_STYLE[item.status];
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <li className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-800/80">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
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
              Deadline: {formatDateTimeWithDay(item.deadline)}
            </p>
            {item.status === "completed" && item.completedAt && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                Diselesaikan: {formatDateTimeWithDay(item.completedAt)}
              </p>
            )}
          </div>

          {onDelete && (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="shrink-0 rounded-lg border border-red-200 p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:border-red-900 dark:text-red-500 dark:hover:bg-red-950/40"
              aria-label="Hapus riwayat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>
          )}
        </div>
      </li>

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/60 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 text-3xl">🗑️</div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Hapus riwayat ini?
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Riwayat{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                "{item.title}"
              </span>{" "}
              akan dihapus permanen.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onDelete?.(item.id);
                  setShowConfirm(false);
                }}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
