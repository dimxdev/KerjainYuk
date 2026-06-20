// Memberi warna unik & konsisten untuk tiap kategori berdasarkan id-nya.
// Palet dibatasi pada beberapa warna lembut yang serasi agar tampilan tetap bersih.

const PALETTE: string[] = [
  "bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
];

/** Hash string sederhana & deterministik. */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** Kembalikan kelas Tailwind (bg + text + varian dark) untuk sebuah kategori. */
export function getCategoryColor(categoryId: string): string {
  return PALETTE[hashString(categoryId) % PALETTE.length];
}
