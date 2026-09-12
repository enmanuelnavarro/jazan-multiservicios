/**
 * Catálogo de soluciones.
 *
 * Para añadir un producto nuevo basta con agregar un objeto a este arreglo:
 * la grilla de la home, las páginas de detalle (/soluciones/[slug]), el
 * sitemap y el selector del formulario de cotización se actualizan solos.
 */

export type Solution = {
  slug: string;
  name: string;
  /** Frase corta que se muestra en la tarjeta de la grilla. */
  summary: string;
  /** Texto de apoyo en la página de detalle. */
  intro: string;
  /** Puntos concretos del producto. Evitar afirmaciones no verificables. */
  highlights: string[];
  /** Usos habituales; alimenta el bloque "Ideal para". */
  idealFor: string[];
  image: string;
  /** Marcar como true para destacar la tarjeta en la grilla. */
  featured?: boolean;
};

export const solutions: Solution[] = [
  {
    slug: "shutters",
    name: "Shutters",
    summary:
      "Soluciones elegantes y resistentes para privacidad, seguridad y control de luz.",
    intro:
      "Los shutters combinan estructura y diseño: regulan la entrada de luz con un movimiento, aportan privacidad real y se integran de forma permanente a la arquitectura del espacio.",
    highlights: [
      "Control de luz graduable desde las lamas",
      "Privacidad sin renunciar a la ventilación",
      "Acabados pensados para interior y exterior",
      "Instalación fija, limpia y duradera",
    ],
    idealFor: ["Terrazas y balcones", "Viviendas", "Locales comerciales"],
    image: "/images/soluciones/shutters.jpg",
    featured: true,
  },
  {
    slug: "cortinas-zebra",
    name: "Cortinas Zebra",
    summary: "Diseño moderno para controlar iluminación y privacidad.",
    intro:
      "El sistema de bandas alternas permite pasar de la luz filtrada a la privacidad total simplemente desplazando la tela, con una estética limpia que encaja en interiores contemporáneos.",
    highlights: [
      "Bandas alternas translúcidas y opacas",
      "Transición suave entre luz y privacidad",
      "Línea visual discreta y contemporánea",
      "Amplia variedad de tonos neutros",
    ],
    idealFor: ["Salas y comedores", "Oficinas", "Habitaciones"],
    image: "/images/soluciones/cortinas-zebra.jpg",
  },
  {
    slug: "cortinas-screen",
    name: "Cortinas Screen",
    summary: "Control solar manteniendo iluminación natural.",
    intro:
      "Las telas screen reducen el deslumbramiento y el calor sin cerrar el espacio: mantienen la vista hacia el exterior y dejan entrar luz natural durante todo el día.",
    highlights: [
      "Reducción del deslumbramiento y del calor",
      "Conserva la visibilidad hacia el exterior",
      "Distintos grados de apertura de tela",
      "Ideal para ventanales amplios",
    ],
    idealFor: ["Oficinas", "Ventanales", "Áreas de trabajo"],
    image: "/images/soluciones/cortinas-screen.jpg",
  },
  {
    slug: "blackout",
    name: "Blackout",
    summary: "Máximo control de iluminación y privacidad.",
    intro:
      "Telas de bloqueo total para espacios donde la oscuridad importa: descanso, proyección o cualquier ambiente que necesite privacidad completa.",
    highlights: [
      "Bloqueo total de la luz exterior",
      "Privacidad completa de día y de noche",
      "Ayuda a mantener la temperatura interior",
      "Acabados mate en tonos neutros",
    ],
    idealFor: ["Habitaciones", "Salas de proyección", "Hotelería"],
    image: "/images/soluciones/blackout.jpg",
  },
  {
    slug: "cortinas-perma",
    name: "Cortinas Perma",
    summary: "Soluciones prácticas y elegantes para ventanas.",
    intro:
      "Una opción versátil y de mantenimiento sencillo para quienes buscan una solución resistente, funcional y con buena presencia en cualquier ventana.",
    highlights: [
      "Manejo sencillo en el día a día",
      "Mantenimiento y limpieza fáciles",
      "Buen equilibrio entre precio y durabilidad",
      "Se adapta a distintos tipos de ventana",
    ],
    idealFor: ["Viviendas", "Alquileres", "Espacios de servicio"],
    image: "/images/soluciones/cortinas-perma.jpg",
  },
  {
    slug: "cortinas-motorizadas",
    name: "Cortinas motorizadas",
    summary: "Automatización y comodidad para hogares y empresas.",
    intro:
      "Sistemas motorizados que se accionan con control remoto o desde el móvil, pensados para ventanales de difícil acceso y para espacios donde la comodidad marca la diferencia.",
    highlights: [
      "Accionamiento con control remoto",
      "Ideal para ventanales altos o de difícil acceso",
      "Movimiento silencioso y uniforme",
      "Preparadas para escenarios programados",
    ],
    idealFor: ["Viviendas", "Salas de reuniones", "Proyectos comerciales"],
    image: "/images/soluciones/cortinas-motorizadas.jpg",
    featured: true,
  },
  {
    slug: "cortinas-hoteleras",
    name: "Cortinas hoteleras",
    summary:
      "Soluciones para hoteles, apartamentos y proyectos comerciales.",
    intro:
      "Configuraciones pensadas para volumen y uso intensivo, con criterios de uniformidad, resistencia y facilidad de reposición en proyectos de varias habitaciones.",
    highlights: [
      "Criterios uniformes para todo el proyecto",
      "Materiales pensados para uso intensivo",
      "Combinación de screen y blackout",
      "Acompañamiento en proyectos por etapas",
    ],
    idealFor: ["Hoteles", "Apartamentos", "Proyectos comerciales"],
    image: "/images/soluciones/cortinas-hoteleras.jpg",
  },
  {
    slug: "toldos",
    name: "Toldos",
    summary: "Protección solar para espacios exteriores.",
    intro:
      "Sombra donde hace falta: terrazas, patios y áreas exteriores que ganan horas de uso cuando se controla el sol directo.",
    highlights: [
      "Sombra efectiva en exteriores",
      "Amplía las horas de uso de la terraza",
      "Materiales pensados para la intemperie",
      "Medidas y configuraciones a medida",
    ],
    idealFor: ["Terrazas", "Patios", "Restaurantes"],
    image: "/images/soluciones/toldos.jpg",
  },
  {
    slug: "mallas",
    name: "Mallas",
    summary: "Protección para puertas y ventanas.",
    intro:
      "Mallas de protección que permiten ventilar sin insectos, con perfiles discretos que no compiten con la ventana.",
    highlights: [
      "Ventilación sin insectos",
      "Perfiles discretos y limpios",
      "Puertas y ventanas a medida",
      "Instalación adaptada a cada vano",
    ],
    idealFor: ["Viviendas", "Cocinas", "Áreas exteriores"],
    image: "/images/soluciones/mallas.jpg",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
