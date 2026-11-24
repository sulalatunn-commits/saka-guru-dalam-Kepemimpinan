# 🏮 SAKA GURU — Ruang Imersif Kepemimpinan & Kerja Sama Tim

Media pembelajaran interaktif **VR + AR + Generative AI** untuk MK **Kepemimpinan Pendidikan (AI3I23)**, Minggu 10 — *Kepemimpinan dan Kerja Sama Tim* (Sub-CPMK 10), Prodi Pendidikan Agama Islam, Universitas Sunan Gresik.

Pengembang: **Sulalatun Nikma, S.Pd., M.Pd.**

| Halaman | Isi |
|---|---|
| `index.html` | Beranda, 9 Saka materi (Pahami · Hayati · Contoh · Coba · Analisis AI · Refleksi), Arisan Diskusi, Evaluasi |
| `vr.html` | Pendopo joglo VR berisi 9 lampion Damar Kurung, avatar Ki Among, dan gamelan interaktif |
| `ar.html` | Meja AR: Piramida Lencioni, Tangga Tuckman, Ansambel Gamelan Tim |

## Cara publikasi di GitHub Pages (± 5 menit)

1. Masuk ke <https://github.com> → klik **New repository** → beri nama `saka-guru` → pilih **Public** → **Create repository**.
2. Klik **uploading an existing file** → seret **seluruh isi** folder ini (`index.html`, `vr.html`, `ar.html`, `README.md`, `.nojekyll`, dan folder `assets`) → **Commit changes**.
   > Pastikan `index.html` berada di akar repositori, bukan di dalam subfolder.
3. Buka **Settings → Pages** → *Source*: **Deploy from a branch** → *Branch*: **main** / **(root)** → **Save**.
4. Tunggu 1–2 menit. Tautan publik muncul di atas halaman Pages, misalnya:
   `https://NAMA-AKUN.github.io/saka-guru/`

## Mengaktifkan Generative AI (opsional, gratis)

Aplikasi berjalan penuh tanpa kunci API (**mode offline**: bank kasus + umpan balik berbasis rubrik).
Untuk AI daring: buka <https://aistudio.google.com/apikey> → *Create API key* → di aplikasi klik **⚙️ AI** → tempel kunci → **Uji koneksi** → **Simpan**.
Kunci hanya tersimpan di peramban pengguna (localStorage) dan dikirim langsung ke Google.

## Perangkat yang disarankan
- Ponsel Android + Chrome (AR penuh WebXR, giroskop, suara).
- Laptop (mouse + WASD), kacamata Cardboard, atau Meta Quest (tombol VR).
- Kamera & mikrofon membutuhkan HTTPS — sudah otomatis di GitHub Pages.

## Teknologi
A-Frame 1.6 (WebXR) · Web Audio API (bunyi gamelan disintesis) · Web Speech API (suara & dikte Bahasa Indonesia) · Google Gemini API. Tanpa server, tanpa model 3D eksternal — ringan untuk jaringan kampus.
