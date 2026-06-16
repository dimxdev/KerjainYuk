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
      style: "from-indigo-500 to-blue-500 shadow-indigo-500/25",
    },
    {
      label: "Selesai",
      emoji: "✅",
      value: completedCount,
      style: "from-emerald-500 to-teal-500 shadow-emerald-500/25",
    },
    {
      label: "Terlewat",
      emoji: "⏰",
      value: missedCount,
      style: "from-rose-500 to-orange-500 shadow-rose-500/25",
    },
  ];

  return (
    <div className="mb-5 grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className={`rounded-2xl bg-linear-to-br p-3 text-center text-white shadow-md ${item.style}`}
        >
          <p className="text-2xl font-bold tabular-nums sm:text-3xl">{item.value}</p>
          <p className="mt-0.5 text-xs font-medium text-white/90">
            <span className="mr-0.5">{item.emoji}</span>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
