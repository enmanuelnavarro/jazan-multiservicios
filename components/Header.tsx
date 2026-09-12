"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { ButtonLink, WhatsAppIcon } from "./Button";
import { navigation } from "@/data/site";
import { company } from "@/data/company";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        open
          ? "border-b border-line/70 bg-paper"
          : scrolled
            ? "border-b border-line/70 bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link
          href="/#inicio"
          onClick={() => setOpen(false)}
          className={cn(
            "transition-colors",
            scrolled || open ? "text-ink" : "text-paper",
          )}
        >
          <Logo />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-8 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors",
                scrolled
                  ? "text-ink-soft hover:text-brass"
                  : "text-paper/80 hover:text-paper",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/#cotizar" variant={scrolled ? "primary" : "light"}>
            Cotizar ahora
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className={cn(
            "flex h-10 w-10 items-center justify-center lg:hidden",
            scrolled || open ? "text-ink" : "text-paper",
          )}
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                "absolute left-0 block h-px w-6 bg-current transition-all duration-300",
                open ? "top-2 rotate-45" : "top-0.5",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px w-6 bg-current transition-all duration-300",
                open ? "top-2 -rotate-45" : "top-3.5",
              )}
            />
          </span>
        </button>
      </Container>

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-line/70 bg-paper lg:hidden"
      >
        <Container className="flex flex-col gap-1 py-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/60 py-4 font-display text-2xl text-ink"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink href="/#cotizar" size="lg" onClick={() => setOpen(false)}>
              Cotizar ahora
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} variant="outline" size="lg">
              <WhatsAppIcon />
              {company.phoneDisplay}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
