import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Ganti tema"
      title="Ganti tema"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-base transition-colors hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
