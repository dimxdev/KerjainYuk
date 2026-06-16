import ExportButton from "../../components/settings/ExportButton";
import ImportButton from "../../components/settings/ImportButton";
import DangerZone from "../../components/settings/DangerZone";

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
    </section>
  );
}
