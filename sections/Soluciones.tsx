import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/Button";
import { solutions } from "@/data/solutions";
import { whatsappForSolution } from "@/lib/whatsapp";

export function Soluciones() {
  return (
    <section id="soluciones" className="bg-paper py-section">
      <Container>
        <SectionHeading
          eyebrow="Catálogo"
          title="Soluciones para cada espacio"
          description="Productos para controlar la luz, ganar privacidad y proteger interiores y exteriores, en viviendas y en proyectos comerciales."
        />

        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <Reveal
              as="li"
              key={solution.slug}
              delay={(index % 3) * 90}
              className="group flex flex-col"
            >
              <Link
                href={`/soluciones/${solution.slug}`}
                className="relative block w-full min-w-0 overflow-hidden bg-paper-deep"
                aria-label={`Ver más sobre ${solution.name}`}
              >
                <Image
                  src={solution.image}
                  alt={`${solution.name} — ${solution.summary}`}
                  width={1200}
                  height={1500}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </Link>

              <h3 className="mt-6 font-display text-2xl leading-tight text-ink">
                <Link href={`/soluciones/${solution.slug}`}>{solution.name}</Link>
              </h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted text-pretty">
                {solution.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <Link
                  href={`/soluciones/${solution.slug}`}
                  className="inline-flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-brass"
                >
                  Más información
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href={whatsappForSolution(solution.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline-offset-4 transition-colors hover:text-brass hover:underline"
                >
                  Cotizar
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
