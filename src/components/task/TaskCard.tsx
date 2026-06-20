import { useState } from "react";
import type { Task } from "../../types";
import { useCategories } from "../../hooks/useCategories";
import {
  getCountdownText,
  getDeadlineStatus,
  type DeadlineStatus,
} from "../../utils/deadline";
import { formatDateTimeWithDay } from "../../utils/formatter";
import { getCategoryColor } from "../../utils/categoryColor";

interface TaskCardProps {
  task: Task;
  onComplete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const STATUS_STYLE: Record<
  DeadlineStatus,
  { badge: string; label: string; accent: string }
> = {
  overdue: {
    badge: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
    label: "Terlewat",
    accent: "before:bg-red-400",
  },
  urgent: {
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
    label: "Mepet",
    accent: "before:bg-orange-400",
  },
  soon: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    label: "Segera",
    accent: "before:bg-amber-400",
  },
  normal: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    label: "Aman",
    accent: "before:bg-emerald-400",
  },
};

export default function TaskCard({ task, onComplete, onEdit, onDelete }: TaskCardProps) {
  const { getCategoryName } = useCategories();
  const status = getDeadlineStatus(task.deadline);
  const style = STATUS_STYLE[status];
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <li
        className={`relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-4 pl-5 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md before:absolute before:inset-y-0 before:left-0 before:w-1.5 ${style.accent} dark:border-white/10 dark:bg-slate-800/80`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${getCategoryColor(task.categoryId)}`}
              >
                {getCategoryName(task.categoryId)}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}>
                {style.label}
              </span>
            </div>
            <h3 className="mt-2 truncate font-semibold text-slate-800 dark:text-slate-100">
              {task.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {formatDateTimeWithDay(task.deadline)}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold ${style.badge}`}
          >
            {getCountdownText(task.deadline)}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3 text-sm dark:border-slate-700">
          {onComplete && (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="rounded-md bg-emerald-600 px-3 py-1.5 font-medium text-white transition-colors hover:bg-emerald-700"
            >
              ✓ Selesai
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(task.id)}
              className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="rounded-md border border-red-200 px-3 py-1.5 font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              Hapus
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
            <div className="mb-1 text-3xl">✅</div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Tandai sebagai selesai?
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Tugas{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                "{task.title}"
              </span>{" "}
              akan dipindahkan ke riwayat.
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
                  onComplete?.(task.id);
                  setShowConfirm(false);
                }}
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
              >
                Ya, Selesai!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
