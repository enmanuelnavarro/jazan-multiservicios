"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { Project } from "@/data/projects";

/** Visor ampliado de la galería, con teclado y cierre por fondo. */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: Project[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const project = items[index];

  const go = useCallback(
    (step: number) => onNavigate((index + step + items.length) % items.length),
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/96 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-6 py-5 text-paper/70">
        <p className="text-sm">
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="text-sm underline-offset-4 transition-colors hover:text-paper hover:underline"
        >
          Cerrar
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-6"
        onClick={(event) => event.stopPropagation()}
      >
        {items.length > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper sm:left-6"
          >
            ←
          </button>
        )}

        <figure className="flex max-h-full flex-col items-center gap-4">
          <Image
            src={project.image}
            alt={project.alt}
            width={project.width}
            height={project.height}
            sizes="90vw"
            className="max-h-[75vh] w-auto object-contain"
          />
          <figcaption className="text-center text-sm text-paper/60">
            {project.title}
            {project.location ? ` · ${project.location}` : ""}
          </figcaption>
        </figure>

        {items.length > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Siguiente"
            className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper sm:right-6"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}
