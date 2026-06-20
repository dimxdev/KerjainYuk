import ExportButton from "../../components/settings/ExportButton";
import ImportButton from "../../components/settings/ImportButton";
import DangerZone from "../../components/settings/DangerZone";
import qrisImage from "../../assets/qris.png";

function handleDownloadQris() {
  const a = document.createElement("a");
  a.href = qrisImage;
  a.download = "qris-kerjainyuk.png";
  a.click();
}

export default function Settings() {
  return (
    <section className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Kelola tema dan data aplikasimu. Tema bisa diganti lewat tombol di header.
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Backup Data</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Unduh data untuk cadangan, atau pulihkan dari file backup.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <ExportButton />
          <ImportButton />
        </div>
      </div>

      <DangerZone />

      {/* Support Developer */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4 p-6 text-center">
          <div>
            <div className="mb-1 flex items-center justify-center gap-2">
              <span className="text-xl">☕</span>
              <h2 className="font-bold text-slate-800 dark:text-slate-100">Support Developer</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Suka pakai KerjainYuk? Traktir developer segelas kopi, yuk! 😄
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-white">
            <img
              src={qrisImage}
              alt="QRIS Support Developer KerjainYuk"
              className="h-52 w-52 object-contain"
            />
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            Sekecil apapun sangat berarti dan memotivasi pengembangan lebih lanjut 🙏
          </p>

          <button
            type="button"
            onClick={handleDownloadQris}
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            ⬇️ Unduh QR
          </button>
        </div>
      </div>
    </section>
  );
}
