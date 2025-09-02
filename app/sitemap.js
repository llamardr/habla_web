export default async function sitemap() {
  const baseUrl = 'https://habla.pe';
  
  // Static pages
  const routes = ['/'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
  
  return [...routes];
}