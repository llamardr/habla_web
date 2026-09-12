import { successCaseArticles } from "./lib/successCaseArticles";
import { siteUrl } from "./lib/site";

export default function sitemap() {
  const routes = ["/", "/servicios", "/estudio-abierto", "/equipo"].map((route) => ({
    url: siteUrl(route),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority:
      route === "/"
        ? 1
        : route === "/estudio-abierto"
          ? 0.9
          : route === "/equipo"
            ? 0.85
            : 0.8,
  }));

  const articles = successCaseArticles.map((article) => ({
    url: siteUrl(`/casos-de-exito/${article.slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Add lastModified only when a reliable content revision date is available.
  return [...routes, ...articles];
}
