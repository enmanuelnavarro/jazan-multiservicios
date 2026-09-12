import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { processSteps } from "@/data/site";

export function Proceso() {
  return (
    <section id="proceso" className="bg-paper py-section">
      <Container>
        <SectionHeading
          eyebrow="Proceso"
          title="De la idea a la instalación"
          description="Un recorrido corto y claro, sin pasos innecesarios."
        />

        <ol className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 90}
              className="flex flex-col bg-paper p-8 lg:p-10"
            >
              <span className="font-display text-4xl text-brass/70">
                {step.number}
              </span>
              <h3 className="mt-8 font-display text-xl leading-snug text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted text-pretty">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
