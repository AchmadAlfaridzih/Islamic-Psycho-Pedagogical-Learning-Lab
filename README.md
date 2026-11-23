# Islamic Psycho-Pedagogical Learning Lab (IPPL Lab)

**Laboratorium Pembelajaran PAI Berbasis Psikologi Pendidikan Islam**

IPPL Lab adalah prototipe lingkungan belajar interaktif untuk dosen dan mahasiswa calon pendidik. Fokus awalnya adalah pengembangan motivasi, kemandirian, dan regulasi diri dalam pembelajaran Pendidikan Agama Islam.

## Model MIRAI
1. **Motivation** — aktivasi tujuan, kesiapan, dan kesadaran hambatan.
2. **Immersion** — eksplorasi konsep melalui pengalaman visual AR/VR.
3. **Regulation** — latihan perencanaan, pemantauan, dan pengelolaan belajar.
4. **AI Scaffolding** — pertanyaan pemantik dan umpan balik adaptif.
5. **Improvement** — refleksi dan perbaikan strategi belajar.

## Fitur prototipe
- Dashboard dan navigasi pembelajaran.
- Check-in motivasi dan efikasi diri.
- AR Explorer berbasis marker Hiro (memerlukan kamera dan HTTPS).
- VR scene berbasis A-Frame (perangkat/ browser yang mendukung WebXR untuk pengalaman imersif).
- AI Learning Companion dengan respons demonstrasi lokal.
- Learning Planner dan Reflection Journal dengan penyimpanan lokal browser.
- Simulasi keputusan dalam skenario belajar calon guru PAI.

## Publikasi dengan GitHub Pages
1. Unggah seluruh isi folder ini ke root repository.
2. Pastikan `index.html` berada langsung di root, bukan di dalam subfolder.
3. Buka **Settings → Pages**.
4. Pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu Save.
5. Tunggu proses deployment, kemudian buka URL GitHub Pages repository.

## Catatan teknis dan batasan
- Prototipe menggunakan HTML, CSS, dan JavaScript statis.
- AR.js dan A-Frame dimuat dari CDN; koneksi internet diperlukan.
- AR membutuhkan izin kamera dan umumnya harus dibuka melalui HTTPS. Untuk AR, cetak atau tampilkan marker Hiro dari perangkat lain.
- Fitur AI Companion pada versi ini adalah **simulasi respons kurasi lokal**, bukan koneksi ke model AI generatif/API.
- Jangan pernah menaruh API key di `app.js` atau file frontend publik. Integrasi AI sungguhan memerlukan backend/proxy yang aman.
- Data planner dan jurnal tersimpan di `localStorage` browser/perangkat yang digunakan, tidak tersinkron otomatis.
- Ini adalah prototipe pembelajaran untuk demonstrasi dan pengujian awal, bukan instrumen psikologis terstandar atau alat diagnosis.

## Lisensi
Belum ditentukan.
