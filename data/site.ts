import { company } from "./company";
import { solutions } from "./solutions";
import { projects } from "./projects";

/**
 * Enlaces del menú principal. El orden es el que se ve en el header.
 *
 * "Proyectos" aparece automáticamente en cuanto se añade la primera foto real
 * a /data/projects.ts; mientras la galería esté vacía no se muestra, para no
 * llevar al visitante a una sección sin contenido.
 */
export const navigation = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Soluciones", href: "/#soluciones" },
  { label: "Shutters", href: "/#shutters" },
  ...(projects.length > 0
    ? [{ label: "Proyectos", href: "/#proyectos" }]
    : []),
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

/** Pasos del proceso de trabajo. */
export const processSteps = [
  {
    number: "01",
    title: "Cuéntanos qué necesitas",
    description:
      "Escríbenos por WhatsApp o envía el formulario con una idea de lo que buscas para tu espacio.",
  },
  {
    number: "02",
    title: "Evaluamos tu espacio",
    description:
      "Revisamos medidas, orientación de la luz y uso del área para recomendar la solución adecuada.",
  },
  {
    number: "03",
    title: "Preparamos tu propuesta",
    description:
      "Recibes una propuesta clara con los productos, acabados y alcance del trabajo.",
  },
  {
    number: "04",
    title: "Instalamos tu solución",
    description:
      "Nuestro equipo realiza la instalación y te acompaña después de entregada la obra.",
  },
];

/** Razones para elegir Jazán. Solo afirmaciones verificables por la empresa. */
export const reasons = [
  {
    title: "Atención personalizada",
    description:
      "Cada espacio se evalúa por separado: te acompañamos desde la primera consulta hasta la entrega.",
  },
  {
    title: "Productos de calidad",
    description:
      "Trabajamos con materiales y sistemas pensados para el uso diario y el clima local.",
  },
  {
    title: "Instalación profesional",
    description:
      "Instalamos con nuestro propio equipo, cuidando medidas, acabados y limpieza final.",
  },
  {
    title: "Soluciones a medida",
    description:
      "Adaptamos medidas, materiales y mecanismos a la ventana y al uso real del espacio.",
  },
  {
    title: "Experiencia residencial y comercial",
    description:
      "Atendemos tanto viviendas como locales, oficinas y proyectos de varias unidades.",
  },
  {
    title: "Servicio postventa",
    description:
      "Seguimos disponibles después de la instalación para ajustes, mantenimiento y consultas.",
  },
];

/** Beneficios destacados de la sección de shutters. */
export const shutterBenefits = [
  {
    title: "Privacidad",
    description: "Cierra la vista desde afuera sin perder la luz que entra.",
  },
  {
    title: "Protección",
    description: "Una capa adicional frente al sol, el viento y la lluvia.",
  },
  {
    title: "Control de luz",
    description: "Gradúa la entrada de luz moviendo las lamas.",
  },
  {
    title: "Diseño",
    description: "Líneas limpias que se integran a la arquitectura.",
  },
  {
    title: "Durabilidad",
    description: "Materiales y herrajes pensados para durar a la intemperie.",
  },
];

/** Beneficios de la sección de automatización. */
export const automationBenefits = [
  "Comodidad",
  "Automatización",
  "Control remoto",
  "Integración moderna",
  "Ideal para hogares",
  "Ideal para empresas",
];

/** Tipos de proyecto del formulario de cotización. */
export const projectTypes = [
  "Residencial",
  "Comercial",
  "Hotelero",
  "Remodelación",
  "Obra nueva",
  "Otro",
];

/** Opciones del selector "Producto de interés": se derivan del catálogo. */
export const productOptions = [
  ...solutions.map((s) => s.name),
  "Aún no lo sé",
];

export const siteMeta = {
  title: `${company.name} | Shutters, Cortinas y Soluciones para tus Espacios`,
  description: `${company.description} ${company.name} en ${company.address.city}, ${company.address.country}.`,
};
