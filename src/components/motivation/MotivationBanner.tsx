import { useMotivation } from "../../hooks/useMotivation";

export default function MotivationBanner() {
  const quote = useMotivation();

  return (
    <div className="relative mb-5 overflow-hidden rounded-2xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-4 text-white shadow-md shadow-indigo-500/20">
      {/* Aksen dekoratif */}
      <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-10 right-10 h-20 w-20 rounded-full bg-white/10" />
      <p className="relative text-xs font-semibold uppercase tracking-wider text-white/70">
        Motivasi hari ini
      </p>
      <p className="relative mt-1 font-medium leading-snug">{quote}</p>
    </div>
  );
}
