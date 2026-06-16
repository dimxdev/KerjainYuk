// Tipe data inti KerjainYuk.
// Semua tanggal/waktu disimpan sebagai ISO string agar mudah dibandingkan & diurutkan.

export interface Task {
  id: string;
  title: string;
  categoryId: string;
  deadline: string; // ISO string
  createdAt: string; // ISO string
}

export type HistoryStatus = "completed" | "missed";

export interface HistoryTask {
  id: string;
  title: string;
  categoryId: string;
  deadline: string; // ISO string
  status: HistoryStatus;
  completedAt?: string; // ISO string, hanya untuk status "completed"
  movedAt: string; // ISO string, kapan dipindah ke riwayat
}

export interface Category {
  id: string;
  name: string;
}

export type Theme = "light" | "dark";

// Bentuk data lengkap untuk export/import backup.
export interface AppData {
  tasks: Task[];
  history: HistoryTask[];
  categories: Category[];
}
