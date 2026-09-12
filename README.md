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

## Imágenes

Las imágenes actuales de `public/images/` son composiciones abstractas de luz y
lamas generadas con `scripts/generate-images.mjs`. **Son temporales**: para
sustituirlas por fotografías reales basta con sobrescribir los archivos con el
mismo nombre y las mismas proporciones (4:5 en el catálogo).

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
