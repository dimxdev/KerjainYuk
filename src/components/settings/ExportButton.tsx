import { exportData } from "../../utils/exportImport";

export default function ExportButton() {
  return (
    <button
      onClick={exportData}
      className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
    >
      Export Data (.json)
    </button>
  );
}
