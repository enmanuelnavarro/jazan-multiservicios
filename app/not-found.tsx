import { Container } from "@/components/Container";
import { ButtonLink, ArrowIcon } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-ink">
      <Container>
        <p className="eyebrow text-paper/55">Error 404</p>
        <h1 className="mt-5 max-w-2xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-paper text-balance">
          No encontramos la página que buscas.
        </h1>
        <p className="mt-6 max-w-md leading-relaxed text-paper/60">
          Puede que el enlace haya cambiado. Vuelve al inicio para ver todas las
          soluciones disponibles.
        </p>
        <ButtonLink
          href="/"
          size="lg"
          variant="paper"
          className="mt-10"
        >
          Volver al inicio
          <ArrowIcon />
        </ButtonLink>
      </Container>
    </section>
  );
}
