"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./Button";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Botón flotante de WhatsApp.
 *
 * Aparece tras un poco de scroll para no competir con el hero y usa el mismo
 * enlace `wa.me` que el resto del sitio, válido en escritorio y en móvil.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-[#07301a] shadow-lg shadow-ink/15 transition-all duration-500 hover:scale-105 sm:bottom-8 sm:right-8",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
