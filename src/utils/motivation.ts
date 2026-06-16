// Kumpulan kata motivasi sesuai spec. Ditampilkan secara acak.

export const MOTIVATION_QUOTES: string[] = [
  "Kerjakan sedikit hari ini daripada menyesal besok.",
  "Deadline tidak menunggu siapa pun.",
  "Satu tugas selesai lebih baik daripada sepuluh tugas yang direncanakan.",
  "Kamu lebih dekat ke tujuanmu daripada kemarin.",
];

export function getRandomQuote(): string {
  const index = Math.floor(Math.random() * MOTIVATION_QUOTES.length);
  return MOTIVATION_QUOTES[index];
}
