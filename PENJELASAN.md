# Dashboard Pengelolaan Peminjaman Buku Perpustakaan

Aplikasi React Native + Expo (TypeScript) untuk mencatat peminjaman buku, mengubah status pengembalian, menyaring data, dan menampilkan ringkasan. Tema terang dan gelap juga tersedia.

## Menjalankan aplikasi

```bash

npm install
npx expo start      # pindai QR dengan Expo Go, atau tekan a (Android) / w (web)
```

## Struktur proyek

```
perpustakaan-app/
├── App.tsx                      # Menyusun Provider dan layar utama
└── src/
    ├── types/loan.ts            # Tipe Loan, LoanFilter, LoanState, LoanAction
    ├── reducers/loanReducer.ts  # initial state + reducer (aturan perubahan state)
    ├── contexts/
    │   ├── LoanContext.tsx      # Membagikan state & dispatch peminjaman
    │   └── ThemeContext.tsx     # Mengelola tema terang/gelap
    ├── components/
    │   ├── LoanSummary.tsx      # Dashboard ringkasan (total, belum, sudah kembali)
    │   ├── LoanForm.tsx         # Formulir tambah peminjaman
    │   ├── LoanFilter.tsx       # Pilihan filter
    │   ├── LoanList.tsx         # Daftar peminjaman sesuai filter
    │   └── LoanItem.tsx         # Satu data peminjaman + ubah status / hapus
    ├── screens/DashboardScreen.tsx
    └── utils/date.ts            # Validasi & format tanggal
```

## Penerapan state management

State aplikasi dibagi menurut cakupannya:

| Data | Jenis state | Pengelolaan |
|---|---|---|
| Daftar peminjaman & filter aktif | Shared state | `useReducer` di `LoanProvider`, dibagikan lewat Context |
| Tema terang/gelap | Shared state | `useState` di `ThemeProvider`, dibagikan lewat Context terpisah |
| Isi input formulir & pesan error | Local state | `useState` di `LoanForm` |
| Jumlah total/belum/sudah kembali, daftar hasil filter | Derived state | Dihitung dari `loans` dan `filter`, tidak disimpan sebagai state |

Daftar `loans` menjadi **single source of truth**. Ringkasan di dashboard dan daftar hasil filter dihitung ulang dari data tersebut setiap kali render, sehingga angka ringkasan selalu sesuai dengan isi daftar.

## Fungsi useReducer

`useReducer(loanReducer, initialLoanState)` menghasilkan `state` (data saat ini) dan `dispatch` (fungsi pengirim action). Semua aturan perubahan data ada di satu fungsi murni, `loanReducer`:

| Action | Payload | Perubahan state |
|---|---|---|
| `loan/add` | objek `Loan` | Menambah peminjaman baru di awal array |
| `loan/toggleReturned` | `{ id }` | Membalik `returned` (sudah ⇄ belum dikembalikan) |
| `loan/delete` | `{ id }` | Menghapus peminjaman berdasarkan id |
| `filter/set` | `{ filter }` | Mengganti filter: `all`, `borrowed`, `returned` |

Reducer selalu mengembalikan objek atau array baru (`...spread`, `map`, `filter`) dan tidak pernah mengubah state lama secara langsung (immutable). Tipe `LoanAction` berupa *discriminated union*, dan bagian `default` pada reducer berisi pengecekan `never`. Akibatnya, TypeScript akan menolak action yang tidak dikenal.

Setiap peminjaman menyimpan `borrowerName` (nama peminjam), `bookTitle` (judul buku), `borrowDate` (tanggal peminjaman), dan `returned` (status pengembalian).

## Context API

- **LoanContext** memakai dua Context: `LoanStateContext` untuk data dan `LoanDispatchContext` untuk `dispatch`. Komponen membacanya melalui custom hook `useLoanState()` dan `useLoanDispatch()`. Kedua hook melempar error yang jelas jika dipakai di luar Provider. Komponen yang hanya mengirim action, seperti `LoanForm` dan `LoanItem`, cukup memakai dispatch.
- **ThemeContext** menyediakan `isDark`, palet `colors`, dan `toggleTheme()`. Nilainya dibungkus `useMemo` agar objek hanya dibuat ulang ketika tema berubah.
- Di `App.tsx`, susunannya `ThemeProvider` → `LoanProvider` → `AppContent`. Semua komponen bisa mengakses data dan tema tanpa *prop drilling*. Satu-satunya prop yang diteruskan adalah `loan` ke `LoanItem`.

## Proses perubahan state (contoh: menandai buku sudah dikembalikan)

1. Pengguna menekan **"Tandai sudah kembali"** di `LoanItem`.
2. `LoanItem` memanggil `dispatch({ type: 'loan/toggleReturned', payload: { id } })`.
3. React menjalankan `loanReducer(stateLama, action)`. Reducer menghasilkan array `loans` baru, dengan peminjaman ber-id tersebut kini `returned: true`.
4. `LoanProvider` menerima state baru, dan nilai `LoanStateContext` berubah.
5. Semua komponen yang memakai `useLoanState()` di-render ulang:
   - `LoanSummary` menghitung ulang: *Belum dikembalikan* berkurang 1, *Sudah dikembalikan* bertambah 1.
   - `LoanList` menyaring ulang sesuai filter aktif.
   - `LoanItem` menampilkan badge "Sudah dikembalikan" dan latar hijau.

Alur yang sama berlaku untuk menambah data (`loan/add` dari `LoanForm`, setelah validasi input kosong dan format tanggal) dan mengganti filter (`filter/set` dari `LoanFilter`). Tombol tema memanggil `toggleTheme()`, sehingga seluruh komponen yang memakai `useTheme()` mendapat palet warna baru.

## Pengujian yang dilakukan

| Skenario | Hasil |
|---|---|
| Data awal | Total 3, belum 2, sudah 1 |
| Simpan dengan input kosong | Data tidak ditambahkan, pesan error tampil |
| Tambah peminjaman valid | Muncul di daftar, total jadi 4, belum jadi 3 |
| Tandai sudah kembali | Belum 2, sudah 2, badge berubah |
| Filter "Belum dikembalikan" / "Sudah dikembalikan" | Hanya data dengan status tersebut yang tampil |
| Ganti tema | Seluruh warna antarmuka berubah ke gelap/terang |
