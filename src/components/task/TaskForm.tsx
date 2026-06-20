import { useState, type FormEvent } from "react";
import { useCategories } from "../../hooks/useCategories";
import type { NewTaskInput } from "../../contexts/TasksContext";
import { buildDeadlineISO, isoToInputs, todayDateString } from "../../utils/formatter";

interface TaskFormProps {
  /** Nilai awal (ISO deadline) untuk mode edit. */
  initial?: { title: string; categoryId: string; deadline: string };
  submitLabel: string;
  onSubmit: (input: NewTaskInput) => void;
  onCancel?: () => void;
}

export default function TaskForm({ initial, submitLabel, onSubmit, onCancel }: TaskFormProps) {
  const { categories } = useCategories();
  const initialInputs = initial ? isoToInputs(initial.deadline) : null;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [categoryId, setCategoryId] = useState(
    initial?.categoryId ?? categories[0]?.id ?? ""
  );
  const [date, setDate] = useState(initialInputs?.date ?? "");
  const [time, setTime] = useState(initialInputs?.time ?? "");
  const [error, setError] = useState("");

  const today = todayDateString();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Judul tugas wajib diisi.");
      return;
    }
    if (!categoryId) {
      setError("Pilih kategori dulu.");
      return;
    }
    if (!date) {
      setError("Tanggal deadline wajib diisi.");
      return;
    }
    if (date < today) {
      setError("Deadline tidak boleh sebelum hari ini.");
      return;
    }

    setError("");
    onSubmit({
      title: title.trim(),
      categoryId,
      deadline: buildDeadlineISO(date, time),
    });
  }

  const fieldClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";
  const labelClass = "mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Kategori</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className={fieldClass}
        >
          {categories.length === 0 && <option value="">Belum ada kategori</option>}
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Judul Tugas</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Kerjakan laporan praktikum"
          className={fieldClass}
          autoFocus
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Tanggal Deadline</label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Waktu{" "}
            <span className="font-normal text-slate-400 dark:text-slate-500">
              (opsional)
            </span>
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500">
        Jika waktu dikosongkan, deadline diset ke pukul 23.59.
      </p>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="submit"
          className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
