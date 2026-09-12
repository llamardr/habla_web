export const SITE_URL = "https://www.hablalatam.com";

export function siteUrl(path = "/") {
  return path === "/" ? SITE_URL : new URL(path, SITE_URL).toString();
}
