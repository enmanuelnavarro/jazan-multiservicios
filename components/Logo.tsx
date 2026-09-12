import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Marca denominativa. Sin ícono a propósito: en móvil cualquier símbolo de
 * líneas compite visualmente con el botón de menú.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex flex-col leading-none", className)}
      aria-label={company.name}
    >
      <span className="font-display text-[1.6rem] tracking-[-0.01em]">
        Jazán
      </span>
      <span className="eyebrow mt-1 text-[0.5rem] opacity-55">
        Multiservicios
      </span>
    </span>
  );
}
