interface StatsSummaryProps {
  activeCount: number;
  completedCount: number;
  missedCount: number;
}

export default function StatsSummary({
  activeCount,
  completedCount,
  missedCount,
}: StatsSummaryProps) {
  const items = [
    {
      label: "Aktif",
      emoji: "📌",
      value: activeCount,
      valueClass: "text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "Selesai",
      emoji: "✅",
      value: completedCount,
      valueClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Terlewat",
      emoji: "⏰",
      value: missedCount,
      valueClass: "text-slate-500 dark:text-slate-400",
    },
  ];

  return (
    <div className="mb-5 grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <p className={`text-2xl font-bold tabular-nums sm:text-3xl ${item.valueClass}`}>
            {item.value}
          </p>
          <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="mr-0.5">{item.emoji}</span>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
