import { MetadataRoute } from "next";
import { COUNTRY_PAGES } from "@/lib/countryPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://schengenim.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/ulkeler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const countryRoutes: MetadataRoute.Sitemap = COUNTRY_PAGES.map((c) => ({
    url: `${base}/ulkeler/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...countryRoutes];
}
