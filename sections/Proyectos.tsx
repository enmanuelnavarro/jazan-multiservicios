"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { projectFilters, projects, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = "todos" | ProjectCategory;

/**
 * Composición editorial: algunas piezas ocupan más ancho o más alto para
 * romper la retícula y evitar la típica galería de cuadrados iguales.
 */
const spans = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-7",
  "lg:col-span-7",
];

export function Proyectos() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      filter === "todos"
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [filter],
  );

  // Sin fotos reales no hay sección: es preferible que no exista a que el
  // visitante encuentre un portafolio anunciado como "en preparación".
  if (projects.length === 0) return null;

  return (
    <section id="proyectos" className="bg-paper py-section">
      <Container>
        <SectionHeading
          eyebrow="Portafolio"
          title="Proyectos Jazán"
          description="Trabajos realizados en viviendas, terrazas y espacios comerciales."
        />


        <div
          role="tablist"
          aria-label="Filtrar proyectos"
          className="mt-12 flex flex-wrap gap-2"
        >
          {projectFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm transition-colors",
                filter === item.id
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-muted hover:border-ink hover:text-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 auto-rows-[minmax(220px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {visible.map((project, index) => (
            <Reveal
              key={project.id}
              delay={(index % 3) * 80}
              className={cn(
                "group relative overflow-hidden bg-paper-deep",
                spans[index % spans.length],
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(index)}
                className="block h-full w-full"
                aria-label={`Ampliar: ${project.title}`}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent p-5 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="block font-display text-lg text-paper">
                    {project.title}
                  </span>
                  {project.location && (
                    <span className="block text-sm text-paper/70">
                      {project.location}
                    </span>
                  )}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {open !== null && (
          <Lightbox
            items={visible}
            index={open}
            onClose={() => setOpen(null)}
            onNavigate={setOpen}
          />
        )}

      </Container>
    </section>
  );
}
