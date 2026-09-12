"use client";

import { useState } from "react";
import { ArrowIcon, WhatsAppIcon } from "./Button";
import { projectTypes, productOptions } from "@/data/site";
import { formatQuoteMessage, validateQuote, type QuoteRequest } from "@/lib/quote";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const empty: QuoteRequest = {
  name: "",
  phone: "",
  email: "",
  projectType: projectTypes[0],
  product: productOptions[0],
  message: "",
};

const fieldClasses =
  "w-full border-b border-line bg-transparent py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink";

const labelClasses = "eyebrow block text-muted";

export function QuoteForm({ defaultProduct }: { defaultProduct?: string }) {
  const [data, setData] = useState<QuoteRequest>({
    ...empty,
    product: defaultProduct ?? empty.product,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<string[]>([]);

  const update =
    (field: keyof QuoteRequest) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setData((prev) => ({ ...prev, [field]: event.target.value }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateQuote(data);
    setErrors(found);
    if (found.length > 0) return;

    setStatus("sending");

    // La solicitud se registra en la API route (lista para conectarse a un CRM
    // o a un webhook) y, pase lo que pase, el cliente termina en WhatsApp con
    // el mensaje ya escrito para que ningún lead se pierda.
    try {
      const response = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al enviar");
      setStatus("sent");
    } catch {
      setStatus("error");
    }

    window.open(whatsappUrl(formatQuoteMessage(data)), "_blank", "noopener");
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col justify-center">
        <p className="eyebrow text-muted">Solicitud enviada</p>
        <h3 className="mt-5 font-display text-3xl leading-tight text-ink">
          Gracias, {data.name.split(" ")[0]}.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          Recibimos tu solicitud. Si no se abrió WhatsApp automáticamente, puedes
          escribirnos directamente y continuamos por ahí.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappUrl(formatQuoteMessage(data))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-medium text-[#07301a]"
          >
            <WhatsAppIcon />
            Abrir WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setData(empty);
              setStatus("idle");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-7 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label className={labelClasses} htmlFor="name">
          Nombre *
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          value={data.name}
          onChange={update("name")}
          placeholder="Tu nombre"
          className={fieldClasses}
        />
      </div>

      <div className="sm:col-span-1">
        <label className={labelClasses} htmlFor="phone">
          Teléfono *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={data.phone}
          onChange={update("phone")}
          placeholder="809-000-0000"
          className={fieldClasses}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClasses} htmlFor="email">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={data.email}
          onChange={update("email")}
          placeholder="tucorreo@ejemplo.com"
          className={fieldClasses}
        />
      </div>

      <div className="sm:col-span-1">
        <label className={labelClasses} htmlFor="projectType">
          Tipo de proyecto
        </label>
        <select
          id="projectType"
          name="projectType"
          value={data.projectType}
          onChange={update("projectType")}
          className={cn(fieldClasses, "cursor-pointer")}
        >
          {projectTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-1">
        <label className={labelClasses} htmlFor="product">
          Producto de interés
        </label>
        <select
          id="product"
          name="product"
          value={data.product}
          onChange={update("product")}
          className={cn(fieldClasses, "cursor-pointer")}
        >
          {productOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={labelClasses} htmlFor="message">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={data.message}
          onChange={update("message")}
          placeholder="Cuéntanos qué espacio quieres transformar"
          className={cn(fieldClasses, "resize-none")}
        />
      </div>

      {errors.length > 0 && (
        <ul className="sm:col-span-2 space-y-1 text-sm text-[#a3341f]" role="alert">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-muted" role="status">
          No pudimos registrar la solicitud automáticamente. Te abrimos WhatsApp
          con los datos para que puedas enviarlos directamente.
        </p>
      )}

      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[0.95rem] font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Solicitar cotización"}
          <ArrowIcon />
        </button>
        <p className="text-xs text-muted">
          Al enviar, se abre WhatsApp con tu solicitud lista.
        </p>
      </div>
    </form>
  );
}
