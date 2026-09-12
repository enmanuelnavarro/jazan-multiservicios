# Jazán Multiservicios — Sitio web

Sitio corporativo de **Jazán Multiservicios** (La Vega, República Dominicana):
shutters, cortinas, sistemas motorizados y control de luz para hogares y
empresas.

Producción: https://jazan.com.do

## Tecnología

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS 4
- Desplegado en Vercel

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm run start
```

## Estructura

```
app/                 Rutas, metadata, sitemap, robots y API routes
  soluciones/[slug]  Página de detalle de cada solución
  api/cotizacion     Recepción de solicitudes del formulario
components/          Piezas reutilizables (header, footer, formulario, visor…)
sections/            Secciones de la home
data/                Contenido editable sin tocar componentes
lib/                 Utilidades (WhatsApp, SEO, validación)
public/images/       Imágenes del sitio
scripts/             Generador de las imágenes de apoyo
```

## Qué editar para cambiar contenido

| Quiero cambiar…                        | Archivo                |
| -------------------------------------- | ---------------------- |
| Teléfono, correo, dirección, redes     | `data/company.ts`      |
| Productos del catálogo                 | `data/solutions.ts`    |
| Fotos de proyectos realizados          | `data/projects.ts`     |
| Menú, proceso, beneficios, formulario  | `data/site.ts`         |

### Añadir un producto

Agrega un objeto a `solutions` en `data/solutions.ts` y coloca su imagen en
`public/images/soluciones/`. La grilla de la home, la página de detalle, el
selector del formulario y el sitemap se actualizan solos.

### Publicar la galería de proyectos

`data/projects.ts` se entrega vacío a propósito: allí solo deben ir fotos
reales de trabajos de Jazán. Copia las fotos en `public/images/proyectos/`,
añade una entrada por foto y la sección mostrará automáticamente los filtros,
la grilla y el visor ampliado.

## Marca

El logotipo oficial vive en `public/brand/`:

- `jazan-logo.svg` — isotipo + marca denominativa (lockup horizontal)
- `jazan-isotipo.svg` — solo el isotipo

Ambos son monocromos y heredan `currentColor`, por lo que la misma pieza sirve
en blanco sobre fondo oscuro y en negro sobre fondo claro. El componente
`components/Logo.tsx` lleva el trazado en línea para poder cambiar de color sin
descargar otro archivo.

El favicon (`app/icon.svg`) y el icono de iOS (`app/apple-icon.png`) se
derivaron del mismo vector: círculo negro con el isotipo en blanco.

Colores del manual de marca: negro `#000000`, blanco `#FFFFFF`, gris `#8C8C8C`
y rojo corporativo `#E4002B`. La interfaz es deliberadamente monocroma; el rojo
queda declarado en `app/globals.css` como `--color-brand-red` pero sin usar.

## Imágenes

Las fotografías de producto viven en `public/images/soluciones/` (una por
producto, 4:5) y `public/images/general/` (hero y secciones).

Para reemplazarlas, hay un script que hace todo el trabajo de recorte y
optimización:

```bash
node scripts/process-photos.mjs <carpeta-con-las-fotos>
```

Espera un archivo por producto, nombrado como el producto (`Shutters.png`,
`Cortina Zebra.png`, `toldos.png`…). Recorta el catálogo a 4:5, genera los
recortes apaisados del hero y de las secciones, y exporta todo a JPEG
optimizado. Tras ejecutarlo, `npm run build` y listo.

`scripts/generate-images.mjs` queda como respaldo: genera composiciones
abstractas en escala de grises para cualquier hueco que no tenga fotografía.

## Formulario de cotización

El formulario envía los datos a `app/api/cotizacion/route.ts` y, en paralelo,
abre WhatsApp con la solicitud ya redactada para que ningún contacto se pierda.

Para integrar un CRM (Kommo), correo o automatización, define la variable de
entorno `QUOTE_WEBHOOK_URL` con el endpoint de destino — ver `.env.example`.
Ese es el único punto que hay que tocar.

## Variables de entorno

Copia `.env.example` a `.env.local` para desarrollo. En producción se
configuran en el panel de Vercel. Ninguna es obligatoria para que el sitio
funcione.
