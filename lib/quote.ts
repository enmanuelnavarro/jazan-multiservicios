import { company } from "@/data/company";

export type QuoteRequest = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  product: string;
  message: string;
};

/**
 * Formatea la solicitud como un mensaje legible.
 *
 * Se reutiliza tanto para el envío por WhatsApp como para el cuerpo del
 * correo o el payload que se mande a un CRM más adelante.
 */
export function formatQuoteMessage(data: QuoteRequest): string {
  const lines = [
    `Solicitud de cotización — ${company.name}`,
    "",
    `Nombre: ${data.name}`,
    `Teléfono: ${data.phone}`,
    data.email ? `Correo: ${data.email}` : null,
    `Tipo de proyecto: ${data.projectType}`,
    `Producto de interés: ${data.product}`,
    data.message ? `` : null,
    data.message ? `Mensaje: ${data.message}` : null,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

/** Validación compartida por el formulario y la API route. */
export function validateQuote(data: Partial<QuoteRequest>): string[] {
  const errors: string[] = [];
  if (!data.name?.trim()) errors.push("El nombre es obligatorio.");
  if (!data.phone?.trim()) errors.push("El teléfono es obligatorio.");
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("El correo no tiene un formato válido.");
  }
  return errors;
}
