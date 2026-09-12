import { successCaseArticles } from "./lib/successCaseArticles";
import { siteUrl } from "./lib/site";

export default function sitemap() {
  // Most recent article date as a content-revision signal for the static pages
  // that surface the article feed (home, estudio abierto).
  const latestArticleDate = successCaseArticles
    .map((article) => article.datePublished)
    .filter(Boolean)
    .sort()
    .at(-1);

  const routes = ["/", "/servicios", "/estudio-abierto", "/equipo"].map((route) => ({
    url: siteUrl(route),
    lastModified: latestArticleDate,
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
    lastModified: article.dateModified || article.datePublished,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...routes, ...articles];
}
