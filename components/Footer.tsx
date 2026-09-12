import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { company } from "@/data/company";
import { navigation } from "@/data/site";
import { solutions } from "@/data/solutions";
import { mailUrl, telUrl } from "@/lib/whatsapp";

const socialsWithUrl = company.social.filter((s) => s.url);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <Container className="py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-xs font-display text-2xl leading-snug text-paper/90">
              {company.tagline}
            </p>

            {socialsWithUrl.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {socialsWithUrl.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-paper/60 underline-offset-4 transition-colors hover:text-paper hover:underline"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-paper/40">Navegación</h2>
            <ul className="mt-6 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-paper/70 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-paper/40">Soluciones</h2>
            <ul className="mt-6 space-y-3">
              {solutions.slice(0, 6).map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/soluciones/${solution.slug}`}
                    className="text-sm text-paper/70 transition-colors hover:text-paper"
                  >
                    {solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-paper/40">Contacto</h2>
            <ul className="mt-6 space-y-3 text-sm text-paper/70">
              <li>
                <a
                  href={mailUrl}
                  className="transition-colors hover:text-paper"
                >
                  {company.email}
                </a>
              </li>
              <li>
                <a href={telUrl} className="transition-colors hover:text-paper">
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="leading-relaxed">
                {company.address.street}
                <br />
                {company.address.city}, {company.address.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/10 pt-8 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. Todos los derechos reservados.
          </p>
          {company.credits.name && (
            <p>
              ©&nbsp;{year}{" "}
              <a
                href={company.credits.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-paper hover:underline"
              >
                {company.credits.name}
              </a>
              . Todos los derechos reservados.
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
