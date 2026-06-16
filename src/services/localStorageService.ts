// Wrapper aman untuk akses LocalStorage.
// Semua key terpusat di sini agar konsisten dan mudah diubah.

export const STORAGE_KEYS = {
  tasks: "kerjainyuk:tasks",
  history: "kerjainyuk:history",
  categories: "kerjainyuk:categories",
  theme: "kerjainyuk:theme",
} as const;

/**
 * Ambil data dari LocalStorage dan parse JSON.
 * Mengembalikan `fallback` jika key tidak ada atau data corrupt.
 */
export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Gagal membaca "${key}" dari LocalStorage:`, error);
    return fallback;
  }
}

/**
 * Simpan data ke LocalStorage sebagai JSON.
 * Mengembalikan true jika sukses.
 */
export function setItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Gagal menyimpan "${key}" ke LocalStorage:`, error);
    return false;
  }
}

/** Hapus satu key dari LocalStorage. */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Gagal menghapus "${key}" dari LocalStorage:`, error);
  }
}

/** Hapus seluruh data aplikasi (tasks, history, categories, theme). */
export function clearAll(): void {
  Object.values(STORAGE_KEYS).forEach(removeItem);
}
