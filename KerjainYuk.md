# KerjainYuk

> Catat cepat, kerjakan sekarang, selesai tepat waktu.

## Deskripsi Project

KerjainYuk adalah aplikasi pencatat tugas (task management) sederhana yang dirancang untuk membantu pengguna mencatat dan menyelesaikan tugas dengan cepat tanpa distraksi.

Berbeda dengan aplikasi task management yang kompleks, KerjainYuk berfokus pada:

* Input tugas yang cepat
* Tampilan yang sederhana
* Prioritas berdasarkan deadline
* Motivasi untuk menyelesaikan tugas
* Pengalaman penggunaan yang fun dan ringan

Target utama aplikasi ini adalah mahasiswa, pelajar, pekerja, maupun siapa saja yang ingin mencatat tugas sehari-hari tanpa perlu menggunakan aplikasi yang terlalu kompleks.

---

# Tujuan Project

## Tujuan Utama

Membantu pengguna:

* Mencatat tugas dengan cepat
* Fokus pada tugas yang paling dekat deadline
* Mengurangi tugas yang terlupakan
* Memberikan motivasi untuk menyelesaikan tugas

## Tujuan Portfolio

Project ini dibuat sebagai portfolio Frontend Developer menggunakan:

* React
* TypeScript
* TailwindCSS
* LocalStorage

---

# Tech Stack

## Frontend

* React
* TypeScript
* React Router DOM
* TailwindCSS

## State Management

Menggunakan:

* React Context API
* Custom Hooks

Tidak menggunakan Redux karena kebutuhan aplikasi masih sederhana.

## Penyimpanan Data

LocalStorage

Semua data disimpan di browser pengguna tanpa backend.

---

# Branding

## Nama Aplikasi

KerjainYuk

## Tagline

Catat cepat, kerjakan sekarang, selesai tepat waktu.

## Karakter Aplikasi

* Fun
* Ringan
* Friendly
* Produktif
* Memotivasi

---

# Fitur Utama

## 1. Dashboard / Daftar Tugas

Menampilkan seluruh tugas aktif.

### Aturan Pengurutan

Urut berdasarkan deadline:

1. Deadline paling dekat
2. Deadline lebih jauh

### Informasi yang Ditampilkan

* Judul tugas
* Kategori
* Deadline
* Countdown deadline
* Badge status deadline

### Aksi

* Tandai selesai
* Edit
* Hapus

---

## 2. Tambah Tugas

Form dibuat sesingkat mungkin.

### Input

#### Kategori

Dropdown kategori.

#### Judul Tugas

Input text.

#### Tanggal Deadline

Wajib diisi.

Aturan:

* Tidak boleh memilih tanggal sebelum hari ini.

#### Waktu Deadline

Opsional.

Jika tidak dipilih:

23:59

---

## 3. Edit Tugas

Pengguna dapat mengubah:

* Judul
* Kategori
* Deadline

---

## 4. Hapus Tugas

Menghapus tugas aktif dari daftar tugas.

---

## 5. Tandai Selesai

Saat tombol "Tandai Selesai" ditekan:

* Tugas dihapus dari daftar aktif
* Dipindahkan ke riwayat
* Diberi status completed

---

## 6. Riwayat Tugas

Menyimpan semua tugas yang sudah tidak aktif.

### Status

#### Completed

Tugas berhasil diselesaikan.

#### Missed

Tugas melewati deadline tanpa diselesaikan.

---

## 7. Auto Missed System

Setiap aplikasi dibuka:

* Periksa seluruh tugas aktif
* Jika deadline sudah lewat

Maka:

* Pindahkan ke riwayat
* Status menjadi missed

Tugas tidak lagi muncul di daftar aktif.

---

## 8. CRUD Kategori

Kategori bawaan:

* Kuliah
* Keseharian

Pengguna dapat:

* Menambah kategori
* Mengubah kategori
* Menghapus kategori

---

## 9. Statistik

Dashboard menampilkan statistik sederhana.

### Data

* Total tugas aktif
* Total tugas selesai
* Total tugas terlewat

Tidak menampilkan progress percentage.

---

## 10. Motivasi

Aplikasi memiliki kumpulan kata-kata motivasi.

Contoh:

"Kerjakan sedikit hari ini daripada menyesal besok."

"Deadline tidak menunggu siapa pun."

"Satu tugas selesai lebih baik daripada sepuluh tugas yang direncanakan."

"Kamu lebih dekat ke tujuanmu daripada kemarin."

Motivasi ditampilkan secara acak.

---

## 11. Theme

### Light Mode

Nuansa:

* Cerah
* Fun
* Fresh

### Dark Mode

Nuansa:

* Nyaman
* Modern
* Fokus

Pilihan tema disimpan ke LocalStorage.

---

## 12. Settings

### Export Data

Mengunduh seluruh data aplikasi ke file JSON.

Contoh:

kerjainyuk-backup.json

---

### Import Data

Mengunggah file backup JSON.

---

### Hapus Semua Data

Menghapus:

* Tugas aktif
* Riwayat
* Kategori

Harus melalui konfirmasi terlebih dahulu.

---

# Struktur Data

## Task

```ts
export interface Task {
  id: string;
  title: string;
  categoryId: string;
  deadline: string;
  createdAt: string;
}
```

## History Task

```ts
export interface HistoryTask {
  id: string;
  title: string;
  categoryId: string;
  deadline: string;
  status: "completed" | "missed";
  completedAt?: string;
  movedAt: string;
}
```

## Category

```ts
export interface Category {
  id: string;
  name: string;
}
```

---

# Struktur Folder

```text
src
│
├── assets
│
├── components
│   ├── task
│   ├── category
│   ├── motivation
│   ├── statistics
│   ├── settings
│   └── shared
│
├── pages
│   ├── Dashboard
│   ├── AddTask
│   ├── Categories
│   ├── History
│   └── Settings
│
├── hooks
│   ├── useTasks
│   ├── useCategories
│   ├── useTheme
│   └── useMotivation
│
├── contexts
│
├── services
│   └── localStorageService
│
├── types
│
├── utils
│   ├── deadline
│   ├── exportImport
│   ├── motivation
│   └── formatter
│
└── router
```

---

# MVP Scope

Versi pertama wajib memiliki:

* Daftar tugas
* Tambah tugas
* Edit tugas
* Hapus tugas
* Tandai selesai
* Riwayat
* CRUD kategori
* Statistik
* Motivasi
* Theme switcher
* Export JSON
* Import JSON
* Hapus semua data

---

# Future Features (Optional)

Fitur tambahan jika project ingin dikembangkan:

## Streak

Menampilkan jumlah hari berturut-turut menyelesaikan tugas.

Contoh:

🔥 7 Hari Produktif

---

## Achievement

Contoh:

🏆 Menyelesaikan 10 tugas

🏆 Menyelesaikan 50 tugas

🏆 Menyelesaikan 100 tugas

---

## Sound Effect

Saat tugas selesai:

* Confetti
* Suara sukses ringan

---

## PWA

Aplikasi dapat diinstal seperti aplikasi mobile.

---

# Prinsip Pengembangan

Saat melakukan development:

1. Utamakan kesederhanaan.
2. Jangan menambah fitur yang memperumit pencatatan tugas.
3. Fokus pada pengalaman pengguna yang cepat.
4. Selalu prioritaskan deadline terdekat.
5. Pertahankan nuansa fun dan motivatif.
6. Seluruh fitur harus tetap berjalan tanpa backend.

---

# Definisi Selesai (Definition of Done)

Project dianggap selesai apabila:

* Seluruh fitur MVP berjalan.
* Tidak ada error pada LocalStorage.
* Theme tersimpan dengan benar.
* Import/export berjalan.
* Auto missed berjalan.
* Tampilan responsif desktop dan mobile.
* Build production berhasil tanpa error.
* Siap dipublikasikan ke Vercel.

---

Versi Dokumen: 1.0
Nama Project: KerjainYuk
Status: Planning & Design Phase
