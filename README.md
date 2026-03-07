# Buana Tour & Travel

Website travel bilingual berbasis Next.js dengan halaman publik premium dan CMS admin sederhana untuk mengelola:

- paket tour
- artikel blog
- upload gambar
- inquiry dari halaman publik

## Menjalankan project

Gunakan folder project ini:

```bash
cd web-goldenrama-clone
npm install
npm run dev
```

Project akan berjalan di:

```bash
http://localhost:3000
```

## Environment variables

Salin `.env.example` menjadi `.env.local`, lalu isi minimal:

```bash
ADMIN_EMAIL=admin@buanatravel.com
ADMIN_PASSWORD=admin123
```

## Login admin

Route admin:

```bash
/id/admin/login
```

Setelah login kamu bisa akses:

- `/id/admin`
- `/id/admin/tours`
- `/id/admin/blog`
- `/id/admin/inquiries`

## Cara kerja CMS lokal

- data disimpan di `src/lib/cms-data.json`
- upload gambar disimpan di `public/uploads`
- session admin menggunakan cookie httpOnly

## Catatan penting

- CMS ini cocok untuk MVP/local development
- semua data CMS saat ini tersimpan lokal di project
