import { company } from "@/data/company";

/**
 * Mapa de la oficina.
 *
 * Para cambiarlo por la ubicación exacta basta con sustituir
 * `company.maps.embedUrl` en /data/company.ts por el enlace "Insertar un mapa"
 * que da Google Maps. Se carga en diferido para no afectar el LCP.
 */
export function MapEmbed({ className }: { className?: string }) {
  return (
    <div className={className}>
      <iframe
        title={`Ubicación de ${company.name} en ${company.address.city}`}
        src={company.maps.embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[380px] w-full border-0 sm:min-h-[440px]"
      />
    </div>
  );
}
