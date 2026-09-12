# Material de origen

Archivo de las piezas que alimentan el sitio. **No se publica**: queda fuera de
`/public`, así que Vercel no lo sirve.

## originales/

Fotografías de producto a resolución completa (JPEG q94, visualmente idénticas
a los PNG de entrega). Son la fuente de todas las imágenes del sitio.

Para regenerar las imágenes publicadas a partir de aquí:

```bash
node scripts/process-photos.mjs design/originales
npm run build
```

El script reconoce cada archivo por su nombre y produce:

- `public/images/soluciones/*.jpg` — una por producto, recortada a 4:5
- `public/images/general/hero.jpg` — panorámica de inicio (desde `hero.jpg`)
- `public/images/general/shutters.jpg` — sección de shutters
- `public/images/general/automatizacion.jpg` — sección de motorizadas
- `public/images/general/contacto.jpg` — fondo del CTA final

Para añadir o cambiar una foto, basta con dejar el archivo nuevo aquí con el
mismo nombre y volver a ejecutar el script.

## Logotipo

El vector del logotipo sí se publica, porque la web lo usa: vive en
`public/brand/` (`jazan-logo.svg` y `jazan-isotipo.svg`), monocromo y
heredando `currentColor`. Se obtuvo del PDF oficial de marca.
