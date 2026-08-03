# Kedai KotaKu

Website katalog dan pemesanan untuk Kedai KotaKu, Wonosobo. Pengunjung dapat melihat menu makanan dan minuman, memilih varian serta opsi pesanan, mengelola keranjang, lalu mengirim pesanan melalui WhatsApp.

## Fitur

- Katalog menu makanan dan minuman berdasarkan kategori
- Pilihan varian, saus, tingkat penyajian, dan topping
- Keranjang pesanan dengan jumlah item dan catatan per item
- Total pesanan otomatis
- Pengiriman format pesanan ke WhatsApp
- Informasi lokasi, jam buka, dan peta kedai
- Tampilan responsif untuk perangkat seluler dan desktop

## Teknologi

- React 19
- Vite 8
- Tailwind CSS 4
- React Icons

## Menjalankan Proyek

Prasyarat: Node.js 20.19+ atau 22.12+.

```bash
npm install
npm run dev
```

Vite akan menampilkan URL lokal aplikasi di terminal, biasanya `http://localhost:5173`.

## Perintah

```bash
# Menjalankan server pengembangan
npm run dev

# Membuat build produksi ke direktori dist
npm run build

# Menjalankan pemeriksaan ESLint
npm run lint

# Menjalankan build produksi secara lokal
npm run preview
```

## Mengubah Konten

- Informasi kedai dan nomor WhatsApp: `src/data/Setting.js`
- Data makanan: `src/data/makanan.js`
- Data minuman: `src/data/minuman.js`
- Gambar hero, logo, dan poster menu: `src/assets/kotaku/`

Nomor WhatsApp pada `Setting.js` harus menggunakan format internasional tanpa karakter `+`, misalnya `6281234567890`.

## Struktur Proyek

```text
src/
  assets/kotaku/       Gambar aplikasi
  components/          Komponen antarmuka
  data/                Data menu dan konfigurasi kedai
  pages/               Halaman aplikasi
  styles/              Gaya global Tailwind
  App.jsx              Status keranjang dan aplikasi utama
  main.jsx             Entry point React
```
