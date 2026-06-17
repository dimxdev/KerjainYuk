// Util untuk memformat tanggal & waktu ke tampilan yang ramah pengguna (locale Indonesia).

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

const dateLongFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const dateTimeWithDayFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/** Format ISO string jadi tanggal singkat, mis. "Sen, 16 Jun 2026". */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** Format ISO string jadi tanggal lengkap, mis. "Selasa, 17 Juni 2026". */
export function formatDateFull(iso: string): string {
  return dateLongFormatter.format(new Date(iso));
}

/** Format ISO string jadi tanggal + waktu, mis. "16 Jun 2026, 23.59". */
export function formatDateTime(iso: string): string {
  return dateTimeFormatter.format(new Date(iso));
}

/** Format ISO string jadi tanggal + waktu dengan hari, mis. "Sen, 16 Jun 2026, 23.59". */
export function formatDateTimeWithDay(iso: string): string {
  return dateTimeWithDayFormatter.format(new Date(iso));
}

/**
 * Gabungkan input tanggal (yyyy-mm-dd) dan waktu (HH:mm) jadi ISO string.
 * Jika waktu kosong, default ke 23:59 sesuai aturan spec.
 */
export function buildDeadlineISO(date: string, time?: string): string {
  const finalTime = time && time.length > 0 ? time : "23:59";
  return new Date(`${date}T${finalTime}`).toISOString();
}

/** Tanggal hari ini dalam format yyyy-mm-dd (untuk atribut min pada input date). */
export function todayDateString(): string {
  return toLocalInputs(new Date()).date;
}

/**
 * Pecah ISO string menjadi nilai input lokal { date: "yyyy-mm-dd", time: "HH:mm" }.
 * Berguna untuk mengisi form saat edit tugas.
 */
export function isoToInputs(iso: string): { date: string; time: string } {
  return toLocalInputs(new Date(iso));
}

function toLocalInputs(d: Date): { date: string; time: string } {
  const offset = d.getTimezoneOffset() * 60000;
  const local = new Date(d.getTime() - offset).toISOString();
  return { date: local.slice(0, 10), time: local.slice(11, 16) };
}

/**
 * Kapital di awal setiap kata, mis. "modul pengujian" -> "Modul Pengujian".
 * Dipakai untuk judul tugas & nama kategori saat disimpan.
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}
