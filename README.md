<div align="center">

# 📝 KerjainYuk

### Catat cepat, kerjakan sekarang, selesai tepat waktu. ✨

Aplikasi pencatat tugas (task management) yang sederhana, fun, dan ringan —
tanpa backend, tanpa ribet, langsung kerjain aja! 🚀

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square)
![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-FFA500?style=flat-square)

</div>

---

## 💡 Tentang Project

**KerjainYuk** dibuat untuk siapa pun yang ingin mencatat dan menyelesaikan tugas
dengan cepat tanpa distraksi — mahasiswa, pelajar, pekerja, atau siapa saja yang
sering kelupaan deadline 😅

Berbeda dari aplikasi to-do list yang kompleks, KerjainYuk fokus pada:

- ⚡ **Input tugas secepat kilat**
- 🎯 **Prioritas otomatis berdasarkan deadline terdekat**
- 🧘 **Tampilan sederhana, tidak bikin pusing**
- 🔥 **Motivasi biar makin produktif**
- 😄 **Pengalaman yang fun & ringan**

> Project ini juga dibuat sebagai **portfolio Frontend Developer** 👨‍💻

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📋 **Dashboard Tugas** | Lihat semua tugas aktif, otomatis terurut dari deadline paling dekat |
| ➕ **Tambah Tugas** | Form super singkat — judul, kategori, deadline. Waktu opsional, default `23:59` |
| ✏️ **Edit Tugas** | Ubah judul, kategori, atau deadline kapan saja |
| 🗑️ **Hapus Tugas** | Hapus tugas yang sudah tidak relevan |
| ✅ **Tandai Selesai** | Satu klik, tugas langsung pindah ke riwayat sebagai *completed* |
| 🕘 **Riwayat Tugas** | Rekap semua tugas yang sudah *completed* maupun *missed* |
| ⏰ **Auto Missed System** | Tugas yang lewat deadline otomatis ditandai *missed* setiap app dibuka |
| 🏷️ **CRUD Kategori** | Tambah, ubah, hapus kategori sendiri (default: *Kuliah* & *Keseharian*) |
| 📊 **Statistik Ringkas** | Total tugas aktif, selesai, dan terlewat — tanpa progress bar yang bikin ribet |
| 💬 **Motivasi Acak** | Kata-kata penyemangat random tiap kali dashboard dibuka |
| 🌗 **Light & Dark Mode** | Tema tersimpan otomatis sesuai pilihanmu |
| 💾 **Export & Import Data** | Backup/restore semua data jadi file `.json` — datamu, kendalimu |
| ⚠️ **Hapus Semua Data** | Dengan konfirmasi dulu, biar nggak kepencet nggak sengaja |

---

## 🛠️ Tech Stack

<div align="center">

| Kategori | Teknologi |
|---|---|
| ⚛️ **UI Library** | [React 19](https://react.dev/) |
| 🔷 **Bahasa** | [TypeScript](https://www.typescriptlang.org/) |
| 🎨 **Styling** | [TailwindCSS 4](https://tailwindcss.com/) |
| 🧭 **Routing** | [React Router DOM](https://reactrouter.com/) |
| 🧠 **State Management** | React Context API + Custom Hooks (tanpa Redux!) |
| 💾 **Penyimpanan** | LocalStorage (100% client-side, tanpa backend) |
| ⚡ **Build Tool** | [Vite](https://vitejs.dev/) |

</div>

---

## 🚀 Menjalankan di Lokal

```bash
# 1. Clone repo ini
git clone https://github.com/<username>/kerjain-yuk.git
cd kerjain-yuk

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev
```

Buka `http://localhost:5173` dan mulai catat tugasmu! 🎉

### 📦 Script lainnya

```bash
npm run build    # 🏗️  build untuk production
npm run preview  # 👀  preview hasil build
npm run lint     # 🔍  cek kualitas kode
```

---

## 📁 Struktur Folder

```text
src
├── assets             # 🖼️  gambar & ikon
├── components         # 🧩  komponen UI per domain (task, category, motivation, dll)
├── pages               # 📄  halaman (Dashboard, AddTask, Categories, History, Settings)
├── hooks               # 🪝  custom hooks (useTasks, useCategories, useTheme, useMotivation)
├── contexts            # 🧠  React Context (state global)
├── services            # 💾  localStorageService
├── types               # 🔷  definisi tipe TypeScript
├── utils               # 🛠️  helper (deadline, formatter, exportImport, motivation)
└── router               # 🧭  konfigurasi routing
```

---

## 🎨 Tampilan

KerjainYuk hadir dengan tampilan **colorful & playful** — setiap kategori tugas
otomatis dapat warnanya sendiri 🌈, plus dukungan **light mode** ☀️ yang cerah dan
**dark mode** 🌙 yang nyaman di mata. Responsif di desktop maupun mobile, lengkap
dengan bottom navigation bar ala aplikasi native di layar kecil 📱

---

## 🗺️ Roadmap (Opsional, di luar MVP)

- [ ] 🔥 **Streak** — hitung hari berturut-turut produktif
- [ ] 🏆 **Achievement** — badge pencapaian (10, 50, 100 tugas selesai)
- [ ] 🎉 **Sound Effect & Confetti** — perayaan kecil saat tugas selesai
- [ ] 📲 **PWA** — install KerjainYuk seperti aplikasi native

---

## 🤝 Kontribusi

Project ini awalnya dibuat sebagai portfolio pribadi, tapi saran & masukan selalu
terbuka! Jangan ragu untuk membuka *issue* atau *pull request* 🙌

---

<div align="center">

Dibuat dengan ❤️ dan secangkir kopi ☕

**KerjainYuk** — *Catat cepat, kerjakan sekarang, selesai tepat waktu.*

</div>

