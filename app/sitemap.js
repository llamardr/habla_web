export default async function sitemap() {
  const baseUrl = "https://hablalatam.com";

  const routes = ["/", "/servicios", "/estudio-abierto", "/equipo"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
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

  return routes;
}
