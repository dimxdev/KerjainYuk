// Util seputar deadline: pengurutan, deteksi lewat deadline, countdown, dan status badge.

import type { Task } from "../types";

export type DeadlineStatus = "overdue" | "urgent" | "soon" | "normal";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/** Apakah deadline sudah lewat dibanding waktu sekarang. */
export function isOverdue(deadlineISO: string, now: Date = new Date()): boolean {
  return new Date(deadlineISO).getTime() < now.getTime();
}

/**
 * Status deadline untuk menentukan warna/teks badge:
 * - overdue : sudah lewat
 * - urgent  : < 24 jam lagi
 * - soon    : < 3 hari lagi
 * - normal  : selain itu
 */
export function getDeadlineStatus(
  deadlineISO: string,
  now: Date = new Date()
): DeadlineStatus {
  const diff = new Date(deadlineISO).getTime() - now.getTime();
  if (diff < 0) return "overdue";
  if (diff < DAY) return "urgent";
  if (diff < 3 * DAY) return "soon";
  return "normal";
}

/**
 * Teks countdown ramah pengguna menuju deadline.
 * Contoh: "Terlewat", "5 jam lagi", "3 hari lagi".
 */
export function getCountdownText(
  deadlineISO: string,
  now: Date = new Date()
): string {
  const diff = new Date(deadlineISO).getTime() - now.getTime();
  if (diff < 0) return "Terlewat";

  if (diff < HOUR) {
    const minutes = Math.max(1, Math.round(diff / (60 * 1000)));
    return `${minutes} menit lagi`;
  }
  if (diff < DAY) {
    const hours = Math.round(diff / HOUR);
    return `${hours} jam lagi`;
  }
  const days = Math.round(diff / DAY);
  return `${days} hari lagi`;
}

/** Urutkan tugas dari deadline terdekat ke terjauh (tidak memutasi array asli). */
export function sortByDeadline(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );
}
