import { useState } from "react";
import { removeItem, STORAGE_KEYS } from "../../services/localStorageService";

export default function DangerZone() {
  const [confirming, setConfirming] = useState(false);

  function handleConfirm() {
    removeItem(STORAGE_KEYS.tasks);
    removeItem(STORAGE_KEYS.history);
    removeItem(STORAGE_KEYS.categories);
    window.location.reload();
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40">
      <h3 className="font-semibold text-red-700 dark:text-red-400">Hapus Semua Data</h3>
      <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">
        Menghapus seluruh tugas aktif, riwayat, dan kategori. Tindakan ini tidak bisa
        dibatalkan.
      </p>

      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="mt-3 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
        >
          Hapus Semua Data
        </button>
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            Yakin? Semua data akan hilang permanen.
          </p>
          <button
            onClick={handleConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Ya, Hapus Semua
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            Batal
          </button>
        </div>
      )}
    </div>
  );
}
