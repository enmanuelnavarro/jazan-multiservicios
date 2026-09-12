/**
 * Galería de proyectos realizados.
 *
 * IMPORTANTE: este arreglo se entrega vacío a propósito. Aquí solo deben
 * entrar fotografías reales de trabajos hechos por Jazán Multiservicios.
 *
 * Para publicar la galería:
 *   1. Copiar las fotos en /public/images/proyectos/
 *   2. Añadir una entrada por foto siguiendo el ejemplo de abajo.
 *
 * La sección de la home detecta automáticamente si hay proyectos: con el
 * arreglo vacío muestra un bloque de invitación a contactar, y en cuanto
 * se agrega la primera entrada aparecen los filtros, la grilla y el visor
 * ampliado. No hay que tocar ningún componente.
 *
 * Ejemplo:
 *   {
 *     id: "terraza-la-vega",
 *     title: "Shutters en terraza",
 *     location: "La Vega",
 *     categories: ["shutters", "residencial"],
 *     image: "/images/proyectos/terraza-la-vega.jpg",
 *     alt: "Terraza con shutters de lamas abiertas",
 *     width: 1600,
 *     height: 1200,
 *   },
 */

export type ProjectCategory =
  | "shutters"
  | "cortinas"
  | "residencial"
  | "comercial";

export type Project = {
  id: string;
  title: string;
  location?: string;
  categories: ProjectCategory[];
  image: string;
  alt: string;
  width: number;
  height: number;
};

export const projectFilters: { id: "todos" | ProjectCategory; label: string }[] =
  [
    { id: "todos", label: "Todos" },
    { id: "shutters", label: "Shutters" },
    { id: "cortinas", label: "Cortinas" },
    { id: "residencial", label: "Residencial" },
    { id: "comercial", label: "Comercial" },
  ];

export const projects: Project[] = [];
