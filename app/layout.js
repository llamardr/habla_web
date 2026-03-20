import { Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "react-hot-toast";
import AnnouncementBanner from "./components_habla/AnnouncementBanner";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

const stacion = localFont({
  src: [
    {
      path: "./fonts/stacion/Stacion Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/stacion/Stacion Light Italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/stacion/Stacion Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/stacion/Stacion Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-stacion",
});

export const metadata = {
  metadataBase: new URL("https://hablalatam.com"),
  title: {
    default: "Habla - Diseñamos rutas de éxito para ti",
    template: "%s | Habla",
  },
  description:
    "HABLA LatAm es un estudio especializado en el lanzamiento de nuevos productos en Latinoamérica. Somos un grupo de profesionales que traduce data de usuarios, negocios, mercados, redes y demás para traer claridad que funciona.",
  keywords: [
    "consultora estrategia",
    "investigación de mercado",
    "innovación empresarial",
    "diseño de servicios",
    "consultora latam",
    "estrategia basada en datos",
    "GTM strategy",
    "MVP development",
  ],
  authors: [{ name: "Habla LATAM" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Habla - Diseñamos rutas de éxito para ti",
    description:
      "HABLA LatAm es un estudio especializado en el lanzamiento de nuevos productos en Latinoamérica. Somos un grupo de profesionales que traduce data de usuarios, negocios, mercados, redes y demás para traer claridad que funciona.",
    url: "https://hablalatam.com",
    siteName: "Habla",
    images: [
      {
        url: "/isotipo_blue.png",
        width: 1200,
        height: 630,
        alt: "Habla - Consultora de Estrategia",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Habla - Diseñamos rutas de éxito para ti",
    description:
      "HABLA LatAm es un estudio especializado en el lanzamiento de nuevos productos en Latinoamérica. Somos un grupo de profesionales que traduce data de usuarios, negocios, mercados, redes y demás para traer claridad que funciona.",
    images: ["/isotipo_blue.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#006aef",
};

export default function RootLayout({ children }) {
  const metaPixelId = "1673789470026632";
  const linkedinPartnerId = "8697042";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Habla - Estudio especializado",
    description:
      "HABLA LatAm es un estudio especializado en el lanzamiento de nuevos productos en Latinoamérica. Somos un grupo de profesionales que traduce data de usuarios, negocios, mercados, redes y demás para traer claridad que funciona. ",
    url: "https://hablalatam.com",
    logo: "https://hablalatam.com/main_logo.svg",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51 934 132 700",
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
    services: [
      "Strategic Innovation",
      "Service Design",
      "Operational Excellence",
      "GTM Strategy",
      "MVP Development",
    ],
  };

  return (
    <html lang="es" data-theme="light" className="scroll-smooth">
      <body className={`${workSans.className} ${stacion.variable} pt-[44px]`}>
        <AnnouncementBanner />
        <Script id="linkedin-pixel" strategy="afterInteractive">
          {`
            window._linkedin_partner_id = "${linkedinPartnerId}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
            (function(l) {
              if (!l) {
                window.lintrk = function(a, b) {
                  window.lintrk.q.push([a, b]);
                };
                window.lintrk.q = [];
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";
              b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://px.ads.linkedin.com/collect/?pid=${linkedinPartnerId}&fmt=gif`}
            alt=""
          />
        </noscript>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div>
          <Toaster />
        </div>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
