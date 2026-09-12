import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, WhatsAppIcon, ArrowIcon } from "@/components/Button";
import { whatsappUrl } from "@/lib/whatsapp";

export function CtaFinal() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/images/general/contacto.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-ink/70"
      />

      <Container className="relative z-10 py-28 sm:py-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] tracking-[-0.01em] text-paper text-balance">
            ¿Tienes un espacio que quieres transformar?
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-paper/65 text-pretty">
            Cuéntanos qué necesitas y nuestro equipo te ayudará a encontrar la
            solución adecuada.
          </p>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={whatsappUrl()} size="lg" variant="whatsapp">
              <WhatsAppIcon />
              Solicitar cotización por WhatsApp
            </ButtonLink>
            <ButtonLink href="/#cotizar" variant="light" size="lg">
              Usar el formulario
              <ArrowIcon />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
