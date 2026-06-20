import { useMotivation } from "../../hooks/useMotivation";

export default function MotivationBanner() {
  const quote = useMotivation();

  return (
    <div className="mb-5 rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
        Motivasi hari ini
      </p>
      <p className="mt-1 font-medium leading-snug text-slate-700 dark:text-slate-200">
        {quote}
      </p>
    </div>
  );
}
