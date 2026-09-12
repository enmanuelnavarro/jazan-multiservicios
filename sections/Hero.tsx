import Image from "next/image";
import { Container } from "@/components/Container";
import { ButtonLink, ArrowIcon } from "@/components/Button";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      <Image
        src="/images/general/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={82}
        className="object-cover"
      />
      {/*
        Velo para el contraste del texto. En móvil cae de abajo hacia arriba
        (el texto ocupa todo el ancho) y a partir de sm se vuelve horizontal,
        de modo que la fotografía queda limpia en la mitad derecha.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,17,17,0.92)_0%,rgba(17,17,17,0.7)_45%,rgba(17,17,17,0.35)_100%)] sm:bg-[linear-gradient(to_right,rgba(17,17,17,0.9)_0%,rgba(17,17,17,0.72)_34%,rgba(17,17,17,0.3)_68%,rgba(17,17,17,0.08)_100%)]"
      />

      <Container className="relative z-10 pt-28 pb-16 sm:pt-24 sm:pb-20">
        <p className="eyebrow animate-[reveal_0.9s_cubic-bezier(0.22,1,0.36,1)_both] text-paper/55">
          Residencial • Comercial
        </p>

        <h1 className="mt-7 max-w-4xl animate-[reveal_0.9s_cubic-bezier(0.22,1,0.36,1)_0.1s_both] font-display text-[clamp(2.6rem,6.5vw,5.4rem)] leading-[1.03] tracking-[-0.02em] text-paper text-balance">
          Diseñamos espacios con privacidad, confort y estilo.
        </h1>

        <p className="mt-8 max-w-xl animate-[reveal_0.9s_cubic-bezier(0.22,1,0.36,1)_0.2s_both] text-lg leading-relaxed text-paper/70 text-pretty">
          Soluciones modernas para controlar la luz, proteger tus espacios y
          transformar cada ambiente.
        </p>

        <div className="mt-11 flex animate-[reveal_0.9s_cubic-bezier(0.22,1,0.36,1)_0.3s_both] flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/#cotizar" size="lg" variant="paper">
            Solicitar cotización
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="/#soluciones" variant="light" size="lg">
            Ver soluciones
          </ButtonLink>
        </div>
      </Container>

      <span
        aria-hidden="true"
        className="absolute bottom-8 right-8 hidden h-16 w-px bg-gradient-to-b from-transparent to-paper/40 lg:block"
      />
    </section>
  );
}
