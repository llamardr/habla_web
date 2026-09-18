import { SITE_URL, siteUrl } from "./site";
import { TEAM_MEMBERS } from "../components_habla/teamData";

// Stable @id so every schema block on a page references the same entity.
export const ORG_ID = `${SITE_URL}/#organization`;

const ORG_DESCRIPTION =
  "HABLA LATAM es un estudio de investigación aplicada a la toma de decisiones de negocio. Traducimos el comportamiento real de usuarios, mercados y equipos en rutas de acción claras para empresas en Perú, México y el resto de Latinoamérica.";

const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/habla-latam",
  "https://www.instagram.com/hablalatam",
  "https://www.tiktok.com/@hablalatam_",
  "https://www.facebook.com/profile.php?id=61550240902611",
];

// Founders, per the team that built Habla (see /equipo and the applied-research article).
const FOUNDER_SLUGS = ["anais-freitas", "patricio-yrigoyen", "santiago-burga"];

const SERVICES = [
  "Strategic Innovation",
  "Service Design",
  "Operational Excellence",
  "GTM Strategy",
  "MVP Development",
];

function personRef(member) {
  return {
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
  };
}

export function organizationSchema() {
  const founders = TEAM_MEMBERS.filter((member) =>
    FOUNDER_SLUGS.includes(member.slug),
  ).map(personRef);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Habla LATAM",
    alternateName: "Habla",
    description: ORG_DESCRIPTION,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: siteUrl("/main_logo.svg"),
    },
    image: siteUrl("/isotipo_blue.png"),
    slogan: "Diseñamos rutas de éxito para ti",
    founders,
    sameAs: SOCIAL_PROFILES,
    knowsAbout: [
      "Investigación aplicada",
      "Investigación de mercado",
      "Estrategia de negocio",
      "Go-to-market",
      "Product-market fit",
      "Diseño de servicios",
      "Comportamiento del consumidor",
      "Innovación estratégica",
    ],
    areaServed: [
      { "@type": "Country", name: "Perú" },
      { "@type": "Country", name: "México" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51 934 132 700",
      contactType: "sales",
      areaServed: ["PE", "MX", "LATAM"],
      availableLanguage: ["Spanish", "English"],
    },
    address: [
      {
        "@type": "PostalAddress",
        addressCountry: "PE",
        addressRegion: "Lima",
        addressLocality: "Lima",
      },
      {
        "@type": "PostalAddress",
        addressCountry: "MX",
        addressRegion: "Ciudad de México",
        addressLocality: "Ciudad de México",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Habla LATAM",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service },
      })),
    },
  };
}

export function articleSchema(article) {
  const url = siteUrl(`/casos-de-exito/${article.slug}`);
  const image = article.imageUrl
    ? siteUrl(article.imageUrl)
    : siteUrl("/isotipo_blue.png");

  const wordCount = article.content
    .filter((block) => block.type === "paragraph" || block.type === "quote")
    .reduce((total, block) => total + block.text.trim().split(/\s+/).length, 0);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: article.title,
    description: article.description,
    image: [image],
    articleSection: article.subtitle,
    inLanguage: "es",
    wordCount,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Habla LATAM",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Habla LATAM",
      logo: {
        "@type": "ImageObject",
        url: siteUrl("/main_logo.svg"),
      },
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: Array.isArray(item.answer)
          ? item.answer.join("\n\n")
          : item.answer,
      },
    })),
  };
}

export function teamSchema() {
  return TEAM_MEMBERS.map((member) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: siteUrl(member.image),
    url: siteUrl("/equipo"),
    ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
    worksFor: {
      "@id": ORG_ID,
      "@type": "Organization",
      name: "Habla LATAM",
    },
  }));
}
