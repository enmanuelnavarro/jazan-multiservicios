import { company } from "@/data/company";

/**
 * Construye el enlace de WhatsApp con el mensaje precargado.
 *
 * Se usa `wa.me`, que funciona igual en escritorio (WhatsApp Web / app) y en
 * móvil, y el número va en formato internacional sin signos (18097372700).
 */
export function whatsappUrl(message?: string): string {
  const text = encodeURIComponent(message ?? company.whatsappMessage);
  return `https://wa.me/${company.whatsappNumber}?text=${text}`;
}

/** Enlace de WhatsApp preguntando por una solución concreta. */
export function whatsappForSolution(solutionName: string): string {
  return whatsappUrl(
    `Hola, visité la página web de ${company.name} y me gustaría recibir información o una cotización de: ${solutionName}.`,
  );
}

export const telUrl = `tel:${company.phoneE164}`;
export const mailUrl = `mailto:${company.email}`;
