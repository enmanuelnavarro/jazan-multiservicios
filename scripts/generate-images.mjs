/**
 * Genera las imágenes de apoyo del sitio (composiciones abstractas de luz y
 * lamas) en /public/images.
 *
 * Son un marcador de posición de diseño, NO fotografías de trabajos reales.
 * Cuando haya fotos propias de Jazán, basta con sobrescribir los archivos
 * con el mismo nombre y el sitio las toma sin tocar código.
 *
 *   node scripts/generate-images.mjs
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";

const OUT = join(process.cwd(), "public", "images");

const ink = "#111111";
// Luz neutra: la marca es monocroma, sin tonos cálidos.
const warm = "#d9d7d3";

const noise = `
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>`;

/** Lamas horizontales con luz que entra en diagonal. */
function louvers({ w, h, base, slat, accent, angle = -18, gap = 46, soft = 0.5 }) {
  const bars = [];
  const span = Math.ceil((w + h) / gap);
  for (let i = -span; i < span; i++) {
    const y = i * gap;
    // Alterna el grosor para que la luz no quede mecánicamente regular.
    const thickness = gap * (0.3 + ((i * 13) % 7) / 22);
    bars.push(
      `<rect x="${-w}" y="${y}" width="${w * 3}" height="${thickness.toFixed(1)}" fill="${accent}"/>`,
    );
  }
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.7" y2="1">
      <stop offset="0" stop-color="${base}"/>
      <stop offset="1" stop-color="${slat}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.74" cy="0.16" r="0.9">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.42"/>
      <stop offset="0.55" stop-color="${accent}" stop-opacity="0.08"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <!-- La luz solo cae en una zona: fuera de ella las lamas desaparecen. -->
    <radialGradient id="pool" cx="0.7" cy="0.22" r="0.78">
      <stop offset="0" stop-color="#fff" stop-opacity="${(0.9 * soft).toFixed(2)}"/>
      <stop offset="0.45" stop-color="#fff" stop-opacity="${(0.45 * soft).toFixed(2)}"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="lightMask">
      <rect width="${w}" height="${h}" fill="url(#pool)"/>
    </mask>
    <filter id="blur"><feGaussianBlur stdDeviation="${(gap * 0.06).toFixed(1)}"/></filter>
    <linearGradient id="vig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0.3"/>
      <stop offset="0.45" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.45"/>
    </linearGradient>
    ${noise}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <g mask="url(#lightMask)" filter="url(#blur)" opacity="0.55">
    <g transform="rotate(${angle} ${w / 2} ${h / 2})">${bars.join("")}</g>
  </g>
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.05"/>
</svg>`;
}

/** Bandas alternas translúcidas/opacas, tipo cortina zebra. */
function bands({ w, h, base, dark, accent, band = 58 }) {
  const rows = [];
  for (let y = 0; y < h + band; y += band * 2) {
    rows.push(
      `<rect x="0" y="${y}" width="${w}" height="${band}" fill="${dark}" opacity="0.55"/>`,
    );
  }
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="${base}"/>
      <stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <linearGradient id="light" x1="0" y1="0" x2="1" y2="0.6">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.4"/>
      <stop offset="0.6" stop-color="${accent}" stop-opacity="0.05"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.2"/>
    </linearGradient>
    ${noise}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <g>${rows.join("")}</g>
  <rect width="${w}" height="${h}" fill="url(#light)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.05"/>
</svg>`;
}

/** Trama fina, tipo tela screen o malla. */
function mesh({ w, h, base, dark, accent, step = 9 }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <pattern id="grid" width="${step}" height="${step}" patternUnits="userSpaceOnUse">
      <path d="M0 0 H${step} M0 0 V${step}" stroke="${dark}" stroke-width="1.6" opacity="0.5"/>
    </pattern>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${base}"/>
      <stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.75" cy="0.25" r="0.7">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    ${noise}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#sun)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)" opacity="0.5"/>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.05"/>
</svg>`;
}

/** Caída vertical de tela, con pliegues suaves. */
function drape({ w, h, base, dark, accent, folds = 14 }) {
  const cols = [];
  const step = w / folds;
  for (let i = 0; i < folds; i++) {
    // Cada pliegue es un degradado propio: sombra al borde, luz al centro.
    cols.push(`<linearGradient id="f${i}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity="0.42"/>
      <stop offset="0.42" stop-color="${accent}" stop-opacity="${(0.1 + Math.abs(Math.sin(i * 0.9)) * 0.22).toFixed(3)}"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.3"/>
    </linearGradient>`);
  }
  const rects = Array.from(
    { length: folds },
    (_, i) =>
      `<rect x="${(i * step).toFixed(1)}" y="0" width="${step.toFixed(1)}" height="${h}" fill="url(#f${i})"/>`,
  );
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="0.8">
      <stop offset="0" stop-color="${base}"/>
      <stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <radialGradient id="room" cx="0.3" cy="0.1" r="0.95">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.3"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0.4"/>
      <stop offset="0.4" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.42"/>
    </linearGradient>
    <filter id="soften"><feGaussianBlur stdDeviation="${(step * 0.12).toFixed(1)}"/></filter>
    ${cols.join("")}
    ${noise}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#room)"/>
  <g filter="url(#soften)">${rects.join("")}</g>
  <rect width="${w}" height="${h}" fill="url(#fade)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.05"/>
</svg>`;
}

const targets = [
  // Fondos generales
  ["general/hero.jpg", 2400, 1500, (d) => louvers({ ...d, base: "#17181a", slat: "#0b0c0d", accent: warm, gap: 64, angle: -14 })],
  ["general/shutters.jpg", 1400, 1750, (d) => louvers({ ...d, base: "#202124", slat: "#0e0f10", accent: warm, gap: 54, angle: 0, soft: 0.8 })],
  ["general/automatizacion.jpg", 1800, 1200, (d) => drape({ ...d, base: "#26282b", dark: "#0e1011", accent: "#cfcecb", folds: 18 })],
  ["general/contacto.jpg", 1600, 1000, (d) => louvers({ ...d, base: "#e6e5e2", slat: "#c9c8c5", accent: "#8c8c8c", gap: 52, angle: -10, soft: 0.45 })],
  ["general/og.jpg", 1200, 630, (d) => louvers({ ...d, base: "#17181a", slat: "#0b0c0d", accent: warm, gap: 40, angle: -14 })],

  // Catálogo de soluciones (4:5)
  ["soluciones/shutters.jpg", 1200, 1500, (d) => louvers({ ...d, base: "#1f2023", slat: "#0c0d0e", accent: warm, gap: 48, angle: 0, soft: 0.85 })],
  ["soluciones/cortinas-zebra.jpg", 1200, 1500, (d) => bands({ ...d, base: "#3a3b3d", dark: "#121314", accent: "#dcdbd8", band: 52 })],
  ["soluciones/cortinas-screen.jpg", 1200, 1500, (d) => mesh({ ...d, base: "#464749", dark: "#191a1c", accent: "#dedddb", step: 10 })],
  ["soluciones/blackout.jpg", 1200, 1500, (d) => drape({ ...d, base: "#161718", dark: "#08090a", accent: "#6a6a6b", folds: 12 })],
  ["soluciones/cortinas-perma.jpg", 1200, 1500, (d) => drape({ ...d, base: "#545557", dark: "#1e1f20", accent: "#d5d4d1", folds: 16 })],
  ["soluciones/cortinas-motorizadas.jpg", 1200, 1500, (d) => drape({ ...d, base: "#2a2c2f", dark: "#0d0e10", accent: "#c8c7c4", folds: 10 })],
  ["soluciones/cortinas-hoteleras.jpg", 1200, 1500, (d) => bands({ ...d, base: "#2b2c2d", dark: "#111213", accent: "#cecdca", band: 70 })],
  ["soluciones/toldos.jpg", 1200, 1500, (d) => louvers({ ...d, base: "#5e5f61", slat: "#242527", accent: "#e8e7e4", gap: 70, angle: -32, soft: 0.75 })],
  ["soluciones/mallas.jpg", 1200, 1500, (d) => mesh({ ...d, base: "#36383a", dark: "#101112", accent: "#c6c5c2", step: 7 })],
];

for (const [name, w, h, make] of targets) {
  const file = join(OUT, name);
  await mkdir(dirname(file), { recursive: true });
  const svg = make({ w, h, ink });
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(file);
  console.log("→", name);
}

// El favicon y el logotipo NO se generan aquí: provienen del logotipo oficial
// y viven en app/icon.svg, app/apple-icon.png y public/brand/.
