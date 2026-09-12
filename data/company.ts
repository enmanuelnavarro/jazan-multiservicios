/**
 * Configuración central de Jazán Multiservicios.
 *
 * Este es el único archivo que hay que editar para cambiar los datos de
 * contacto, el dominio o las redes sociales del sitio. Todos los componentes
 * leen desde aquí.
 */

export const company = {
  name: "Jazán Multiservicios",
  shortName: "Jazán",
  legalName: "Jazán Multiservicios",
  tagline: "Soluciones para transformar tus espacios.",
  description:
    "Soluciones en shutters, cortinas, sistemas motorizados y control de luz para hogares y empresas.",

  domain: "jazan.com.do",
  url: "https://jazan.com.do",

  email: "info@jazan.com.do",

  /** Teléfono en formato local, tal como se muestra en pantalla. */
  phoneDisplay: "809-737-2700",
  /** Formato E.164 para enlaces tel: (República Dominicana, +1). */
  phoneE164: "+18097372700",
  /** Solo dígitos con código de país, requerido por wa.me. */
  whatsappNumber: "18097372700",
  /** Mensaje precargado al abrir WhatsApp. */
  whatsappMessage:
    "Hola, visité la página web de Jazán Multiservicios y me gustaría recibir información o solicitar una cotización.",

  address: {
    street: "Calle Balilo Gómez #10",
    city: "La Vega",
    region: "La Vega",
    country: "República Dominicana",
    countryCode: "DO",
    /** Línea completa para mostrar en una sola cadena. */
    full: "Calle Balilo Gómez #10, La Vega, República Dominicana",
  },

  /**
   * Coordenadas aproximadas de La Vega usadas por el mapa embebido.
   * Sustituir por la ubicación exacta del local cuando esté disponible
   * (o pegar el enlace definitivo de Google Maps en `maps.embedUrl`).
   */
  maps: {
    query: "Calle Balilo Gómez 10, La Vega, República Dominicana",
    link: "https://www.google.com/maps/search/?api=1&query=Calle+Balilo+G%C3%B3mez+10%2C+La+Vega%2C+Rep%C3%BAblica+Dominicana",
    embedUrl:
      "https://www.google.com/maps?q=Calle%20Balilo%20G%C3%B3mez%2010%2C%20La%20Vega%2C%20Rep%C3%BAblica%20Dominicana&z=17&output=embed",
  },

  hours: {
    /** Texto mostrado en la sección de contacto. Ajustar si cambia. */
    display: "Lunes a viernes · 8:00 a.m. – 6:00 p.m. · Sábados por cita",
  },

  /**
   * Redes sociales. Dejar el `url` vacío oculta el ícono automáticamente,
   * así que basta con rellenar el enlace cuando el perfil esté listo.
   */
  social: [
    { name: "Instagram", url: "", handle: "" },
    { name: "Facebook", url: "", handle: "" },
    { name: "TikTok", url: "", handle: "" },
  ],
} as const;

export type Company = typeof company;
