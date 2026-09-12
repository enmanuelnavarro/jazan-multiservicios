import { company } from "@/data/company";
import { solutions } from "@/data/solutions";

/**
 * Schema.org LocalBusiness.
 *
 * Solo incluye datos verificables que la empresa nos dio: sin valoraciones,
 * años de fundación ni cifras inventadas.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${company.url}/#negocio`,
    name: company.name,
    description: company.description,
    url: company.url,
    telephone: company.phoneE164,
    email: company.email,
    image: `${company.url}/images/general/og.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: company.address.countryCode,
    },
    areaServed: {
      "@type": "Country",
      name: company.address.country,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Soluciones",
      itemListElement: solutions.map((solution) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: solution.name,
          description: solution.summary,
          url: `${company.url}/soluciones/${solution.slug}`,
        },
      })),
    },
    sameAs: company.social.filter((s) => s.url).map((s) => s.url),
  };
}
