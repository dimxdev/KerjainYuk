// Util untuk export/import backup data aplikasi sebagai file JSON.

import type { AppData } from "../types";
import { STORAGE_KEYS, getItem, setItem } from "../services/localStorageService";

const BACKUP_FILENAME = "kerjainyuk-backup.json";

/** Ambil seluruh data aplikasi dari LocalStorage. */
function readAllData(): AppData {
  return {
    tasks: getItem(STORAGE_KEYS.tasks, []),
    history: getItem(STORAGE_KEYS.history, []),
    categories: getItem(STORAGE_KEYS.categories, []),
  };
}

/** Unduh seluruh data aplikasi sebagai file JSON. */
export function exportData(): void {
  const data = readAllData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = BACKUP_FILENAME;
  link.click();

  URL.revokeObjectURL(url);
}

/** Validasi bentuk data sebelum diterapkan sebagai backup. */
function isValidAppData(value: unknown): value is AppData {
  if (typeof value !== "object" || value === null) return false;
  const data = value as Record<string, unknown>;
  return (
    Array.isArray(data.tasks) &&
    Array.isArray(data.history) &&
    Array.isArray(data.categories)
  );
}

/**
 * Baca file backup JSON, validasi strukturnya, lalu tulis ke LocalStorage.
 * Melempar Error dengan pesan ramah pengguna jika file tidak valid.
 */
export async function importData(file: File): Promise<void> {
  const text = await file.text();

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("File bukan JSON yang valid.");
  }

  if (!isValidAppData(parsed)) {
    throw new Error("Struktur file backup tidak sesuai KerjainYuk.");
  }

  setItem(STORAGE_KEYS.tasks, parsed.tasks);
  setItem(STORAGE_KEYS.history, parsed.history);
  setItem(STORAGE_KEYS.categories, parsed.categories);
}
