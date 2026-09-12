import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { solutions } from "@/data/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: company.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...solutions.map((solution) => ({
      url: `${company.url}/soluciones/${solution.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
