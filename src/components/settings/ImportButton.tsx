import { useRef, useState, type ChangeEvent } from "react";
import { importData } from "../../utils/exportImport";

export default function ImportButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importData(file);
      window.alert("Data berhasil diimpor. Halaman akan dimuat ulang.");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengimpor data.");
    } finally {
      e.target.value = "";
    }
  }

  return (
    <div>
      <button
        onClick={() => inputRef.current?.click()}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        Import Data (.json)
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        onChange={handleChange}
        className="hidden"
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
