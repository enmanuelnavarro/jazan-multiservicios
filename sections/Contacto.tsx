import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
import { MapEmbed } from "@/components/MapEmbed";
import { WhatsAppIcon, ButtonLink } from "@/components/Button";
import { company } from "@/data/company";
import { mailUrl, telUrl, whatsappUrl } from "@/lib/whatsapp";

export function Contacto() {
  return (
    <section id="contacto" className="bg-paper py-section">
      <Container>
        <div id="cotizar" className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-brass">Contacto</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.07] tracking-[-0.01em] text-ink text-balance">
                Solicita tu cotización
              </h2>
              <p className="mt-6 leading-relaxed text-muted text-pretty">
                Escríbenos por WhatsApp o completa el formulario. Te respondemos
                con las opciones que mejor encajan en tu espacio.
              </p>
            </Reveal>

            <Reveal className="mt-10 space-y-6 border-t border-line pt-10">
              <div>
                <h3 className="eyebrow text-muted">Dirección</h3>
                <p className="mt-2 leading-relaxed text-ink">
                  {company.name}
                  <br />
                  {company.address.street}
                  <br />
                  {company.address.city}, {company.address.country}
                </p>
              </div>
              <div>
                <h3 className="eyebrow text-muted">Teléfono / WhatsApp</h3>
                <a
                  href={telUrl}
                  className="mt-2 block text-ink transition-colors hover:text-brass"
                >
                  {company.phoneDisplay}
                </a>
              </div>
              <div>
                <h3 className="eyebrow text-muted">Correo</h3>
                <a
                  href={mailUrl}
                  className="mt-2 block text-ink transition-colors hover:text-brass"
                >
                  {company.email}
                </a>
              </div>
              <div>
                <h3 className="eyebrow text-muted">Horario</h3>
                <p className="mt-2 text-ink">{company.hours.display}</p>
              </div>
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={whatsappUrl()} variant="whatsapp">
                <WhatsAppIcon />
                WhatsApp
              </ButtonLink>
              <ButtonLink href={telUrl} variant="outline">
                Llamar
              </ButtonLink>
              <ButtonLink href={mailUrl} variant="outline">
                Enviar correo
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7">
            <QuoteForm />
          </Reveal>
        </div>
      </Container>

      <Reveal className="mt-24">
        <MapEmbed />
        <Container className="mt-4">
          <a
            href={company.maps.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted underline-offset-4 transition-colors hover:text-brass hover:underline"
          >
            Abrir en Google Maps
          </a>
        </Container>
      </Reveal>
    </section>
  );
}
