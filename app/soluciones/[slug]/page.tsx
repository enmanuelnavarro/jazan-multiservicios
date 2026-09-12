import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, WhatsAppIcon, ArrowIcon } from "@/components/Button";
import { QuoteForm } from "@/components/QuoteForm";
import { solutions, getSolution } from "@/data/solutions";
import { company } from "@/data/company";
import { whatsappForSolution } from "@/lib/whatsapp";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) return {};

  const description = `${solution.summary} ${company.name} en ${company.address.city}, ${company.address.country}.`;

  return {
    title: solution.name,
    description,
    alternates: { canonical: `/soluciones/${solution.slug}` },
    openGraph: {
      title: `${solution.name} | ${company.name}`,
      description,
      url: `${company.url}/soluciones/${solution.slug}`,
      images: [{ url: solution.image, alt: solution.name }],
    },
  };
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) notFound();

  const related = solutions.filter((item) => item.slug !== solution.slug).slice(0, 3);

  return (
    <>
      <section className="relative isolate flex min-h-[75svh] items-end overflow-hidden bg-ink">
        <Image
          src={solution.image}
          alt={`${solution.name} — ${solution.summary}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30"
        />
        <Container className="relative z-10 pb-16 pt-36">
          <nav aria-label="Ruta" className="eyebrow text-paper/50">
            <Link href="/#soluciones" className="transition-colors hover:text-paper">
              Soluciones
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brass-soft">{solution.name}</span>
          </nav>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.04] tracking-[-0.02em] text-paper text-balance">
            {solution.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70 text-pretty">
            {solution.summary}
          </p>
        </Container>
      </section>

      <section className="bg-paper py-section">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-snug text-ink text-pretty">
                {solution.intro}
              </p>

              <ul className="mt-12 divide-y divide-line border-y border-line">
                {solution.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-baseline gap-4 py-5 text-[0.98rem] text-ink-soft"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-brass" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-5">
              <div className="border border-line p-8">
                <h2 className="eyebrow text-muted">Ideal para</h2>
                <ul className="mt-5 space-y-2 font-display text-xl text-ink">
                  {solution.idealFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col gap-3">
                  <ButtonLink
                    href={whatsappForSolution(solution.name)}
                    variant="whatsapp"
                    size="lg"
                  >
                    <WhatsAppIcon />
                    Cotizar {solution.name}
                  </ButtonLink>
                  <ButtonLink href="#cotizar" variant="outline" size="lg">
                    Usar el formulario
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="cotizar" className="bg-paper-deep py-section">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-brass">Cotización</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.07] text-ink text-balance">
                Pide tu propuesta de {solution.name.toLowerCase()}
              </h2>
              <p className="mt-6 leading-relaxed text-muted text-pretty">
                Cuéntanos las medidas aproximadas y el uso del espacio. Te
                respondemos con las opciones que mejor encajan.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-7">
              <QuoteForm defaultProduct={solution.name} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-section">
        <Container>
          <h2 className="font-display text-3xl text-ink">Otras soluciones</h2>
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="group">
                <Link href={`/soluciones/${item.slug}`} className="block">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={1200}
                    height={1500}
                    sizes="(min-width: 640px) 30vw, 90vw"
                    className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <h3 className="mt-5 flex items-center gap-2 font-display text-xl text-ink">
                    {item.name}
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
