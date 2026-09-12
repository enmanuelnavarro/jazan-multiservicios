/**
 * Procesa las fotografías de producto y las deja optimizadas en
 * /public/images, con los nombres y proporciones que espera el sitio.
 *
 *   node scripts/process-photos.mjs <carpeta-con-las-fotos>
 *
 * Espera un archivo por producto, nombrado como la clave de `CATALOGO`
 * (sin distinguir mayúsculas, acentos ni espacios sobrantes). Las imágenes
 * del catálogo se recortan a 4:5 y las de sección a su proporción propia.
 */
import { readdir } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const OUT = join(process.cwd(), "public", "images");

/** nombre del archivo de origen → slug de /data/solutions.ts */
const CATALOGO = {
  shutters: "shutters",
  "cortina zebra": "cortinas-zebra",
  "cortina screen": "cortinas-screen",
  blackout: "blackout",
  "cortina perma": "cortinas-perma",
  "cortina motorizada": "cortinas-motorizadas",
  "cortinas hoteleras": "cortinas-hoteleras",
  toldos: "toldos",
  mallas: "mallas",
};

/**
 * Imágenes de sección. `from` es la clave del catálogo de la que se recorta,
 * y `gravity` decide qué parte del encuadre se conserva.
 */
const SECCIONES = [
  { file: "general/hero.jpg", from: "cortina screen", w: 2000, h: 1250, gravity: "centre" },
  { file: "general/shutters.jpg", from: "shutters", w: 1122, h: 1402, gravity: "centre" },
  { file: "general/automatizacion.jpg", from: "cortina motorizada", w: 1600, h: 1067, gravity: "centre" },
  { file: "general/contacto.jpg", from: "toldos", w: 1600, h: 1000, gravity: "centre" },
];

const normaliza = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const dir = process.argv[2];
if (!dir) {
  console.error("Uso: node scripts/process-photos.mjs <carpeta>");
  process.exit(1);
}

const archivos = await readdir(dir);
const porNombre = new Map();
for (const f of archivos) {
  if (!/\.(png|jpe?g|webp|heic)$/i.test(f)) continue;
  porNombre.set(normaliza(parse(f).name), join(dir, f));
}

const encontrar = (clave) => porNombre.get(normaliza(clave));

// Catálogo: 4:5, la proporción de las tarjetas.
for (const [clave, slug] of Object.entries(CATALOGO)) {
  const src = encontrar(clave);
  if (!src) {
    console.warn(`  falta: ${clave}`);
    continue;
  }
  const destino = join(OUT, "soluciones", `${slug}.jpg`);
  await sharp(src)
    .resize(1122, 1402, { fit: "cover", position: "centre", kernel: "lanczos3" })
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(destino);
  console.log("→ soluciones/" + slug + ".jpg");
}

// Secciones: recortes apaisados a partir de las mismas fotos.
for (const s of SECCIONES) {
  const src = encontrar(s.from);
  if (!src) {
    console.warn(`  falta el origen de ${s.file}`);
    continue;
  }
  await sharp(src)
    .resize(s.w, s.h, { fit: "cover", position: s.gravity, kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(join(OUT, s.file));
  console.log("→ " + s.file);
}
