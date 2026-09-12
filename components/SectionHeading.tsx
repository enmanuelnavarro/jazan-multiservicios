import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** `dark` = texto oscuro sobre fondo claro. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-5",
            tone === "dark" ? "text-brass" : "text-brass-soft",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08] tracking-[-0.01em] text-balance",
          tone === "dark" ? "text-ink" : "text-paper",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 text-[1.05rem] leading-relaxed text-pretty",
            tone === "dark" ? "text-muted" : "text-paper/70",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
