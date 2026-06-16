import { NavLink, Outlet } from "react-router-dom";
import type { ComponentType } from "react";
import ThemeToggle from "../settings/ThemeToggle";
import {
  ClockIcon,
  HomeIcon,
  PlusIcon,
  SettingsIcon,
  TagIcon,
} from "./NavIcons";

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
  Icon: ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", end: true, Icon: HomeIcon },
  { to: "/add", label: "Tambah", Icon: PlusIcon },
  { to: "/categories", label: "Kategori", Icon: TagIcon },
  { to: "/history", label: "Riwayat", Icon: ClockIcon },
  { to: "/settings", label: "Pengaturan", Icon: SettingsIcon },
];

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-rose-50 via-violet-50 to-sky-50 text-slate-900 sm:h-screen sm:min-h-0 sm:overflow-hidden dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <NavLink to="/" className="text-lg font-extrabold tracking-tight">
            <span className="bg-linear-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
              KerjainYuk
            </span>
          </NavLink>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-1 text-sm sm:flex">
            {navItems.map(({ to, label, end, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-all ${
                    isActive
                      ? "bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white shadow-sm shadow-fuchsia-500/30"
                      : "text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      {/* Konten — di desktop area ini yang scroll (bukan halaman), agar muat 1 layar.
          Di mobile tetap scroll halaman biasa + pb ekstra untuk bottom bar. */}
      <main className="flex-1 sm:min-h-0 sm:overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-6 pb-24 sm:pb-10">
          <Outlet />
        </div>
      </main>

      {/* Bottom tab bar mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/40 bg-white/80 backdrop-blur-xl sm:hidden dark:border-white/10 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-3xl items-stretch justify-around">
          {navItems.map(({ to, label, end, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "text-fuchsia-600 dark:text-fuchsia-400"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
