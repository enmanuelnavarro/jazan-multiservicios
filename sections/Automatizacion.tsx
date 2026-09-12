import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, ArrowIcon } from "@/components/Button";
import { automationBenefits } from "@/data/site";
import { whatsappForSolution } from "@/lib/whatsapp";

export function Automatizacion() {
  return (
    <section id="automatizacion" className="bg-paper-deep py-section">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-muted">Automatización</p>
              <h2 className="mt-5 font-display text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.06] tracking-[-0.01em] text-ink text-balance">
                Tu espacio. Ahora más inteligente.
              </h2>
              <p className="mt-7 text-lg leading-relaxed text-muted text-pretty">
                Cortinas y sistemas motorizados que se abren y cierran sin
                esfuerzo: con un control remoto, desde el móvil o siguiendo la
                rutina del día.
              </p>
            </Reveal>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
              {automationBenefits.map((benefit, index) => (
                <Reveal
                  as="li"
                  key={benefit}
                  delay={index * 60}
                  className="flex items-baseline gap-3 border-t border-line pt-4 text-[0.95rem] text-ink-soft"
                >
                  <span className="h-1 w-1 shrink-0 translate-y-[-0.15em] rounded-full bg-ink" />
                  {benefit}
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-11">
              <ButtonLink
                href={whatsappForSolution("Cortinas motorizadas")}
                size="lg"
              >
                Cotizar motorización
                <ArrowIcon />
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7">
            <Image
              src="/images/general/automatizacion.jpg"
              alt="Cortinas motorizadas cerrándose sobre un ventanal"
              width={1800}
              height={1200}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-3/2 w-full object-cover"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
