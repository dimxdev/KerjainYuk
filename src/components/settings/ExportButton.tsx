import { exportData } from "../../utils/exportImport";

export default function ExportButton() {
  return (
    <button
      onClick={exportData}
      className="rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-fuchsia-500/30 transition-all hover:shadow-md hover:brightness-110"
    >
      Export Data (.json)
    </button>
  );
}
