# LUXURY EV — Modern Holographic Multi-Page Showroom

Electric vehicle showroom dengan UI holographic, 3D car (Three.js via CDN), dan animasi modern. **Bisa dijalankan dengan Live Server** — tanpa npm install, tanpa Vite, tanpa build step.

## Cara Menjalankan

1. Buka folder `luxury-ev` di VS Code (`File → Open Folder`)
2. Klik kanan `index.html` → **Open with Live Server**
3. Browser akan membuka `http://127.0.0.1:5500/index.html`

> **Jangan** membuka folder parent (`Digital Anniversarry`). Buka folder `luxury-ev` langsung.

## Halaman

| File | URL | Isi |
|------|-----|-----|
| `index.html` | `/index.html` | Home — hero 3D + showcase model + CTA |
| `models.html` | `/models.html` | Grid 3 mobil + viewer 3D |
| `features.html` | `/features.html` | Teknologi + angka performa |
| `gallery.html` | `/gallery.html` | Galeri + lightbox |
| `contact.html` | `/contact.html` | Dealer + form kontak |

## Struktur Folder
luxury-ev/
├── index.html, models.html, features.html, gallery.html, contact.html
├── README.md
├── css/
│ ├── tokens.css ← warna, font, spacing
│ ├── base.css ← reset, layout, background
│ ├── components.css ← navbar, tombol, modal
│ ├── hologram.css ← efek hologram, scanline
│ ├── animations.css ← keyframes, reveal
│ └── responsive.css ← breakpoint mobile
├── js/
│ ├── config.js ← ★ DATA mobil, fitur, dealer
│ ├── core/ ← sistem bersama
│ │ ├── app.js
│ │ ├── navigation.js
│ │ ├── theme.js
│ │ ├── particles.js
│ │ ├── reveal.js
│ │ ├── hologram.js
│ │ ├── three-scene.js
│ │ └── utils.js
│ └── pages/ ← logika per halaman
│ ├── home.js
│ ├── models.js
│ ├── features.js
│ ├── gallery.js
│ └── contact.js
└── images/
├── car-nova-s.jpg
├── car-terra-x.jpg
├── car-hyper-gt.jpg
├── gallery-1.jpg … gallery-4.jpg