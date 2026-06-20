import { useRegisterSW } from "virtual:pwa-register/react";
import { APP_VERSION, WHATS_NEW } from "../../data/changelog";

export default function UpdatePrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-20 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 sm:bottom-6">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">
                Update tersedia ✨
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Versi {APP_VERSION} siap dipasang
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
              v{APP_VERSION}
            </span>
          </div>

          <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 dark:border-slate-700">
            {WHATS_NEW.map((item) => (
              <li key={item} className="text-sm text-slate-600 dark:text-slate-300">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => updateServiceWorker(true)}
              className="flex-1 rounded-full bg-indigo-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Muat Ulang & Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
