import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { reasons } from "@/data/site";

export function PorQue() {
  return (
    <section id="nosotros" className="bg-paper-deep py-section">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Por qué Jazán"
              title="Soluciones pensadas para durar."
              description="Trabajamos de cerca con cada cliente, cuidamos el detalle de la instalación y seguimos disponibles cuando la obra ya está entregada."
            />
          </div>

          <dl className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={(index % 2) * 90}>
                <dt className="font-display text-xl leading-snug text-ink">
                  {reason.title}
                </dt>
                <dd className="mt-3 text-[0.95rem] leading-relaxed text-muted text-pretty">
                  {reason.description}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
