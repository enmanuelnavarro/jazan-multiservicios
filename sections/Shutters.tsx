import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, WhatsAppIcon } from "@/components/Button";
import { shutterBenefits } from "@/data/site";
import { whatsappForSolution } from "@/lib/whatsapp";

export function Shutters() {
  return (
    <section id="shutters" className="bg-ink text-paper">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Reveal className="relative min-h-[60vh] lg:min-h-[92vh]">
          <Image
            src="/images/general/shutters.jpg"
            alt="Lamas de shutters filtrando la luz en un interior"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <div className="flex items-center px-6 py-24 sm:px-12 lg:px-16 xl:px-24">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow text-brass-soft">Shutters</p>
              <h2 className="mt-5 font-display text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.06] tracking-[-0.01em] text-paper text-balance">
                Privacidad cuando la necesitas.
              </h2>
              <p className="mt-7 text-lg leading-relaxed text-paper/65 text-pretty">
                Transforma terrazas, balcones, viviendas y espacios comerciales
                con shutters diseñados para combinar privacidad, protección y
                estética.
              </p>
            </Reveal>

            <dl className="mt-12 divide-y divide-paper/10 border-y border-paper/10">
              {shutterBenefits.map((benefit, index) => (
                <Reveal
                  key={benefit.title}
                  delay={index * 70}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8"
                >
                  <dt className="w-36 shrink-0 font-display text-lg text-paper">
                    {benefit.title}
                  </dt>
                  <dd className="text-[0.95rem] leading-relaxed text-paper/60">
                    {benefit.description}
                  </dd>
                </Reveal>
              ))}
            </dl>

            <Reveal className="mt-12 flex flex-wrap gap-3">
              <ButtonLink
                href={whatsappForSolution("Shutters")}
                size="lg"
                variant="paper"
              >
                <WhatsAppIcon />
                Cotizar Shutters
              </ButtonLink>
              <ButtonLink href="/soluciones/shutters" variant="light" size="lg">
                Ver detalles
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
