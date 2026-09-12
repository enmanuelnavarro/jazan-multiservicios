import { NextResponse } from "next/server";
import { formatQuoteMessage, validateQuote, type QuoteRequest } from "@/lib/quote";

/**
 * Recepción de solicitudes de cotización.
 *
 * Hoy valida los datos y, si existe la variable de entorno `QUOTE_WEBHOOK_URL`,
 * reenvía la solicitud a ese destino. Ese punto único es el que hay que
 * conectar más adelante con Kommo CRM, un servicio de correo, una automatización
 * (Make/Zapier/n8n) o cualquier API propia: el formulario no necesita cambios.
 */
export async function POST(request: Request) {
  let payload: Partial<QuoteRequest>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Solicitud inválida."] },
      { status: 400 },
    );
  }

  const errors = validateQuote(payload);
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const quote: QuoteRequest = {
    name: payload.name!.trim(),
    phone: payload.phone!.trim(),
    email: payload.email?.trim() ?? "",
    projectType: payload.projectType?.trim() ?? "",
    product: payload.product?.trim() ?? "",
    message: payload.message?.trim() ?? "",
  };

  const webhook = process.env.QUOTE_WEBHOOK_URL;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "jazan.com.do",
          receivedAt: new Date().toISOString(),
          ...quote,
          summary: formatQuoteMessage(quote),
        }),
      });
    } catch (error) {
      // El lead no se pierde: el formulario abre WhatsApp igualmente.
      console.error("No se pudo reenviar la cotización al webhook", error);
    }
  } else {
    console.info("Nueva solicitud de cotización:\n" + formatQuoteMessage(quote));
  }

  return NextResponse.json({ ok: true });
}
