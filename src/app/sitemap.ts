import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://buanatourtravel-2rya-cki66bp43-irvans-projects-e50e03e6.vercel.app";
  const locales = ["id", "en"];

  const routes = [
    "",
    "/tours",
    "/blog",
    "/about",
    "/contact",
  ];

  const staticPages: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      const alternates: { [key: string]: string } = {};
      
      // Add alternate language links for hreflang
      locales.forEach((altLocale) => {
        alternates[altLocale] = `${baseUrl}/${altLocale}${route}`;
      });

      staticPages.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" || route === "/tours" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : route === "/tours" ? 0.9 : 0.7,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return staticPages;
}
