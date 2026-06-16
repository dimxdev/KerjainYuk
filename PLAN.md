# Plan Pengembangan KerjainYuk

> Dokumen perencanaan teknis untuk mengerjakan KerjainYuk dari kondisi scaffold sampai siap publish ke Vercel.
> Acuan spesifikasi: [KerjainYuk.md](KerjainYuk.md)

---

## 1. Kondisi Saat Ini (Baseline)

Project baru sebatas scaffold Vite default:

* ✅ Vite + React 19 + TypeScript + Tailwind 4 sudah terpasang
* ✅ Struktur file dasar (`src/App.tsx`, `src/main.tsx`, `src/index.css`) ada
* ❌ `App.tsx` masih "Hello World"
* ❌ **`react-router-dom` belum terinstall** (padahal masuk tech stack)
* ❌ Belum ada struktur folder sesuai spec (`components`, `pages`, `hooks`, dll)
* ❌ Belum ada satupun fitur

**Kesimpulan:** mulai dari nol secara implementasi, fondasi tooling sudah siap.

---

## 2. Prinsip yang Dipegang Selama Development

Mengacu ke spec, semua keputusan teknis tunduk pada 6 prinsip:

1. Utamakan kesederhanaan — tidak over-engineering.
2. Jangan menambah fitur yang memperumit pencatatan tugas.
3. Fokus pada pengalaman pengguna yang cepat.
4. Selalu prioritaskan deadline terdekat.
5. Pertahankan nuansa fun dan motivatif.
6. Seluruh fitur berjalan tanpa backend (LocalStorage only).

---

## 3. Urutan Pengerjaan (Fase)

Pengerjaan dibagi per-fase. Tiap fase menghasilkan sesuatu yang bisa dijalankan/diuji, jadi progress selalu terlihat. Urutannya: **fondasi data dulu, baru UI, baru polish.**

### Fase 0 — Setup & Fondasi ✅
**Tujuan:** menyiapkan dependency, struktur folder, dan tipe data.

* [x] Install `react-router-dom`
* [x] Bikin struktur folder sesuai spec (lihat bagian 5)
* [x] Definisikan semua tipe di `src/types/` (`Task`, `HistoryTask`, `Category`)
* [x] Bikin `localStorageService` — wrapper aman untuk `get`/`set`/`remove` dengan `try/catch` dan key yang terpusat (`kerjainyuk:tasks`, `kerjainyuk:history`, `kerjainyuk:categories`, `kerjainyuk:theme`)
* [x] Bikin util `formatter` (format tanggal/waktu) dan util `deadline` (hitung countdown, cek lewat deadline, urutan prioritas)
* [x] Setup router + layout dasar (navigasi antar halaman) di `App.tsx`

**Selesai jika:** app jalan, bisa pindah-pindah halaman kosong via router.

---

### Fase 1 — Core Task Management (MVP inti) ✅
**Tujuan:** CRUD tugas + LocalStorage. Ini jantung aplikasi.

* [x] `useTasks` hook + `TasksContext` — state tugas aktif, sync ke LocalStorage
* [x] **Tambah Tugas** (`AddTask`): form (kategori dropdown, judul, tanggal deadline wajib, waktu opsional default `23:59`)
  * Validasi: tanggal tidak boleh sebelum hari ini
* [x] **Dashboard / Daftar Tugas**: render tugas aktif, urut deadline terdekat → terjauh
  * Tampilkan: judul, kategori, deadline, countdown, badge status deadline
* [x] **Edit Tugas**: ubah judul, kategori, deadline
* [x] **Hapus Tugas**

**Selesai jika:** bisa tambah/lihat/edit/hapus tugas, data persist setelah refresh.

---

### Fase 2 — History & Lifecycle Tugas ✅
**Tujuan:** alur hidup tugas dari aktif → riwayat.

* [x] **Tandai Selesai**: pindahkan tugas dari aktif ke riwayat, status `completed`, isi `completedAt`
* [x] **Riwayat** (`History`): tampilkan tugas `completed` & `missed`
* [x] **Auto Missed System**: saat app dibuka, cek semua tugas aktif; yang lewat deadline → pindah ke riwayat dengan status `missed`
  * Implementasi: dihitung sekali saat lazy initializer state (bukan `useEffect`, agar tidak memicu cascading render / dobel di StrictMode)

**Selesai jika:** tugas selesai masuk riwayat, tugas lewat deadline auto jadi missed.

---

### Fase 3 — Kategori ✅
**Tujuan:** CRUD kategori.

* [x] `useCategories` hook + context, sync LocalStorage
* [x] Kategori bawaan saat pertama kali: **Kuliah**, **Keseharian**
* [x] **CRUD Kategori** (`Categories`): tambah, ubah, hapus
* [x] Tangani edge case: kategori dipakai tugas lalu dihapus — **diputuskan: tolak hapus** jika kategori masih dipakai tugas aktif/riwayat (tombol hapus dinonaktifkan + pesan jumlah pemakaian)

**Selesai jika:** kategori bisa dikelola dan terhubung ke form tugas.

---

### Fase 4 — Statistik & Motivasi ✅
**Tujuan:** elemen fun & informatif di dashboard.

* [x] **Statistik**: total tugas aktif, total selesai, total terlewat (tanpa progress percentage)
* [x] `useMotivation` hook + util `motivation`: kumpulan kata motivasi, tampil acak
* [x] Tampilkan banner motivasi di dashboard

**Selesai jika:** statistik akurat dan motivasi tampil acak tiap buka.

---

### Fase 5 — Theme & Settings ✅
**Tujuan:** personalisasi & manajemen data.

* [x] `useTheme` hook: light/dark, simpan ke LocalStorage, apply via class Tailwind (`@custom-variant dark` di `index.css`)
* [x] **Theme switcher** di UI (tombol di header `Layout`)
* [x] **Export Data**: download semua data jadi `kerjainyuk-backup.json`
* [x] **Import Data**: upload & restore dari JSON (validasi struktur, reload setelah sukses)
* [x] **Hapus Semua Data**: hapus tugas/riwayat/kategori (tema tidak ikut terhapus) — konfirmasi dua langkah

**Selesai jika:** tema persist, export/import jalan, hapus semua aman (ada konfirmasi).

---

### Fase 6 — Polish & Rilis ✅ (kode), deploy ditunda atas keputusan user
**Tujuan:** memenuhi Definition of Done.

* [x] Responsif desktop & mobile (cek semua halaman) — header/nav, form, list pakai `flex-wrap`/`grid-cols-1 sm:grid-cols-2`
* [x] Perhalus nuansa visual (fun/friendly sesuai branding) — dark mode dilengkapi di semua card/form/halaman, bukan cuma Layout
* [x] Empty states (belum ada tugas, riwayat kosong, kategori kosong)
* [x] Cek error LocalStorage (quota, JSON corrupt) tertangani — `localStorageService` sudah try/catch + fallback sejak Fase 0
* [x] `npm run lint` bersih
* [x] `npm run build` sukses tanpa error
* [ ] Deploy ke Vercel — **ditunda atas pilihan user**, kode sudah production-ready (build sukses) sehingga bisa dideploy kapan saja nanti

**Selesai jika:** semua poin Definition of Done di spec terpenuhi (deploy menyusul kapan saja).

---

## 4. Future Features (di luar MVP, opsional)

Dikerjakan **hanya** setelah MVP rilis: Streak, Achievement, Sound Effect + Confetti, PWA.

---

## 5. Target Struktur Folder

Sesuai spec, akan dibangun bertahap mengikuti fase:

```text
src
├── assets
├── components
│   ├── task
│   ├── category
│   ├── motivation
│   ├── statistics
│   ├── settings
│   └── shared
├── pages
│   ├── Dashboard
│   ├── AddTask
│   ├── Categories
│   ├── History
│   └── Settings
├── hooks          (useTasks, useCategories, useTheme, useMotivation)
├── contexts
├── services       (localStorageService)
├── types
├── utils          (deadline, exportImport, motivation, formatter)
└── router
```

---

## 6. Catatan Teknis & Keputusan yang Perlu Ditetapkan

Hal-hal yang belum 100% ditentukan di spec dan perlu diputuskan saat ngoding:

* **Generate `id`**: pakai `crypto.randomUUID()` (cukup, native, tanpa lib).
* **Format `deadline`**: simpan sebagai ISO string agar mudah dibandingkan & diurutkan.
* **Hapus kategori yang dipakai tugas**: tentukan aturannya (rekomendasi: tolak hapus jika masih dipakai, atau pindahkan ke kategori default).
* **Badge status deadline**: definisikan ambang batas (mis. < 24 jam = "mepet", lewat = "terlewat").
* **Auto-missed timing**: cukup saat app mount; tidak perlu interval realtime untuk MVP.
* **State management**: Context API + custom hooks (tanpa Redux, sesuai spec).

---

## 7. Cara Verifikasi Tiap Fase

* `npm run dev` — uji manual fitur fase tersebut
* Refresh browser — pastikan data persist (LocalStorage)
* `npm run lint` — jaga kualitas kode
* `npm run build` — jalankan sebelum rilis (Fase 6)

---

Versi Dokumen Plan: 1.0
Basis: KerjainYuk.md v1.0
