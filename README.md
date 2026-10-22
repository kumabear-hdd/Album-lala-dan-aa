# Our Little Universe — Aa & Lalaa 💗
> "Satu dunia kecil, berisi cerita kita."

Sebuah website interaktif romantis berbentuk mini desktop operating system & romantic digital scrapbook yang dipersembahkan untuk **Lalaa** oleh **Aa**.

---

## ✨ Fitur-Fitur Utama

1. **Opening Scrapbook Cover**:
   - Cover buku kenangan dengan animasi lipatan, stempel pos retro, dan tombol *"Buka Dunia Kita 💗"*.
   - Taburan konfeti hati & bunga saat dibuka.

2. **Cute Desktop Environment**:
   - Wallpaper pastel lembut (#FFF9F2, #F7C9D4, #EBA7BA, #E7DDF8, #FFF0B8, #DCE8D5).
   - Ikon-ikon aplikasi di desktop:
     - 📷 **Our Memories** (Album & File Manager Kenangan)
     - 💌 **Love Letter** (Surat Cinta Interaktif)
     - 💐 **Digital Bouquet** (Taman Bunga Interaktif)
     - 🎵 **Our Soundtrack** (Pemutar Musik Kenangan)
     - 🎁 **Little Surprises** (Kotak Kejutan & Doa)
   - Sticky note catatan dari Aa dengan washi tape pastel.
   - Jam & tanggal langsung (live clock).
   - Taskbar bawah dengan tombol Start menu, tab jendela aktif, dan mini widget audio.
   - Adaptif untuk mobile: berubah menjadi panel layar penuh / sheet yang rapi dan nyaman disentuh.

3. **Our Memories (Interactive File Manager)**:
   - 7 folder kenangan:
     - *Our First Memories*
     - *Silly Moments*
     - *Favorite Photos*
     - *Little Adventures*
     - *Screenshots & Chats*
     - *Moments I Want to Keep*
     - *For Lalaa Only*
   - Navigasi breadcrumb nyata: `Our Universe / Our Memories / [Nama Folder]`
   - Pencarian real-time berdasarkan judul, caption, tanggal, dan catatan.
   - Filter kategori (*First Dates*, *Silly*, *Traveling*, *Chats*, *Sweet*, *Special*).
   - Filter hanya favorit & pengurutan (Terbaru, Terlama, Judul A-Z, Paling Favorit).
   - Tampilan Grid Polaroid (dengan washi tape & kemiringan dinamis) dan Tampilan List.
   - Lightbox foto lengkap dengan navigasi keyboard (Esc untuk tutup, ← / → untuk foto sebelumnya/berikutnya).
   - Fitur upload foto langsung dari browser.

4. **Love Letter (Surat Cinta Interaktif)**:
   - Amplop berstempel lilin segel hati (wax seal).
   - Kertas surat terbuka dengan teks pesan dari Aa untuk Lalaa.
   - Tombol simpan/cetak surat (*Print-friendly*) dan salin teks.

5. **Digital Bouquet (Buket Bunga Interaktif)**:
   - Ilustrasi vektor SVG buket bunga lengkap dengan kertas pembungkus kraft & pita *"A Little Bouquet for Lalaa"*.
   - 6 bunga interaktif independen:
     - **Mawar (Rose)**: *Simbol cinta dan kasih sayang.*
     - **Tulip**: *Simbol cinta yang tulus.*
     - **Daisy**: *Simbol keceriaan dan kepolosan.*
     - **Sunflower**: *Simbol kehangatan dan kekaguman.*
     - **Baby's Breath**: *Simbol kasih sayang yang bertahan lama.*
     - **Lily**: *Simbol ketulusan dan harapan baik.*
   - Interaksi hover di desktop dan tap di mobile untuk melihat makna tiap bunga.
   - Tombol *"Kirim Peluk Virtual 💗"* dengan taburan konfeti dan popup peluk hangat.

6. **Our Soundtrack (Scrapbook Music Player)**:
   - Desain piringan hitam (vinyl) yang berputar saat musik diputar.
   - Mesin audio Web Audio built-in yang memainkan harmoni melodi santai (music box/piano) tanpa ketergantungan file eksternal yang rentan error.
   - Mendukung penambahan file MP3 kustom dari folder `public/music/`.
   - Playlist lengkap, progress bar scrubber, dan pengatur volume.

7. **Little Surprises (Kotak Kejutan & Doa)**:
   - *Pesan Hangat Hari Ini*: generator doa dan kalimat penyemangat acak.
   - *Bintang Rahasia*: stiker bintang interaktif yang membuka pesan rahasia saat diketuk.
   - *Random Memory*: membuka satu foto kenangan secara acak.
   - *Stiker Cinta*: stiker interaktif yang menghamburkan hati saat diklik.

---

## 🛠️ Panduan Kustomisasi & Setup Konten

### 1. Menambahkan Foto Asli

Terdapat dua cara untuk menambahkan foto:

- **Cara 1: Melalui Antarmuka Upload (Langsung di Browser)**
  Klik tombol **"Tambah Foto"** di jendela *Our Memories*. Pilih file gambar (JPG, PNG, WebP) dari perangkatmu, beri judul, caption, dan pilih folder tujuannya.
  *Catatan:* Foto yang diunggah melalui formulir ini disimpan di `localStorage` browser perangkat tersebut.

- **Cara 2: Menambahkan Foto Permanen ke Proyek**
  1. Letakkan berkas foto asli kalian di dalam folder `public/photos/` (misalnya `public/photos/kencan-pertama.jpg`).
  2. Buka berkas `src/data/memories.ts`.
  3. Tambahkan entri baru pada array `INITIAL_MEMORIES`:
  ```ts
  {
    id: 'mem-custom-1',
    folderId: 'our-first-memories',
    title: 'Kencan Pertama di Kafe',
    caption: 'Kopi hangat dan obrolan berjam-jam yang nggak terasa.',
    date: '14 Februari 2024',
    imageUrl: '/photos/kencan-pertama.jpg',
    category: 'First Dates',
    note: 'Hari itu Aa grogi banget tapi bahagia.',
    rotation: -1.5,
    tapeColor: '#FFF0B8'
  }
  ```

### 2. Mengubah atau Menambah Folder

Buka berkas `src/data/memories.ts`, lalu edit array `MEMORY_FOLDERS`:
```ts
{
  id: 'nama-folder-baru',
  name: 'Nama Folder',
  description: 'Deskripsi singkat kenangan...',
  color: '#F7C9D4', // warna pastel
  icon: '🌸'
}
```

### 3. Mengedit Surat Cinta

Buka berkas `src/data/letter.ts`. Seluruh isi surat, sapaan, paragraf, penutup, dan tanda tangan tersimpan rapi dan dapat disesuaikan sesuka hati.

### 4. Menambahkan Bunga atau Mengubah Maknanya

Buka berkas `src/data/flowers.ts`. Anda dapat mengedit nama, pesan doa, maupun warna pada array `BOUQUET_FLOWERS`.

### 5. Mengatur Lagu / Soundtrack (4 Lagu Pilihan Aa & Lalaa)

Playlist telah dikonfigurasikan khusus dengan 4 lagu romantis pilihan:
1. **1000x** — Ghea Indrawari
2. **Jadian Yuk** — Chloe Pawapuwa
3. **Kita Usahakan Rumah Itu** — Sal Priadi
4. **Night Changes** — One Direction

Terdapat 2 cara untuk mendengarkan lagu:
- **Melodi Akustik Otomatis**: Secara default, pemutar musik menyintesis melodi akustik dan music box yang diselaraskan dengan nada khas masing-masing lagu tanpa perlu file tambahan.
- **Memutar Rekaman Lagu Asli (MP3)**:
  - **Cara Langsung di Browser**: Buka pemutar musik *Our Soundtrack* di aplikasi, lalu klik tombol **"Unggah File MP3"** untuk memilih file lagu dari komputer atau HP-mu.
  - **Cara Permanen Proyek**: Taruh file MP3 ke dalam folder `public/music/` dengan penamaan:
    - `public/music/1000x-ghea-indrawari.mp3`
    - `public/music/jadian-yuk-chloe-pawapuwa.mp3`
    - `public/music/kita-usahakan-rumah-itu-sal-priadi.mp3`
    - `public/music/night-changes-one-direction.mp3`
    Pemutar musik akan otomatis memutar rekaman asli lagu tersebut!

---

## 🚀 Build & Deployment

Aplikasi ini menggunakan **Vite**, **React 19**, dan **Tailwind CSS**.

### Menjalankan di Lingkungan Pengembangan
```bash
npm run dev
```
Dev server akan berjalan di `http://localhost:3000`. Tambahkan parameter `?autostart=1` pada URL untuk langsung membuka desktop tanpa cover sambutan.

### Menjalankan Unit Test
```bash
npx tsx --test src/utils/memoryUtils.test.ts
```

### Menyiapkan Build Produksi (Netlify / Vercel / Cloud Run)
```bash
npm run build
```
Hasil build statis akan tersimpan di direktori `dist/` dan siap di-deploy ke Netlify, Vercel, GitHub Pages, atau platform hosting pilihan Anda.
