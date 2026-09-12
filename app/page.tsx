import { Hero } from "@/sections/Hero";
import { Soluciones } from "@/sections/Soluciones";
import { Shutters } from "@/sections/Shutters";
import { Automatizacion } from "@/sections/Automatizacion";
import { Proyectos } from "@/sections/Proyectos";
import { Proceso } from "@/sections/Proceso";
import { PorQue } from "@/sections/PorQue";
import { CtaFinal } from "@/sections/CtaFinal";
import { Contacto } from "@/sections/Contacto";

export default function Home() {
  return (
    <>
      <Hero />
      <Soluciones />
      <Shutters />
      <Automatizacion />
      <Proyectos />
      <Proceso />
      <PorQue />
      <CtaFinal />
      <Contacto />
    </>
  );
}
