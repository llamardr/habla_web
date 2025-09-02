import { Work_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const workSans = Work_Sans({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-work-sans'
});

export const metadata = {
  metadataBase: new URL('https://habla.pe'),
  title: {
    default: 'Habla - Consultora de Estrategia Basada en Datos',
    template: '%s | Habla'
  },
  description: 'Consultora líder en estrategia empresarial basada en investigación y datos. Servicios de innovación estratégica, diseño de servicios y desarrollo de productos en Latinoamérica.',
  keywords: ['consultora estrategia', 'investigación de mercado', 'innovación empresarial', 'diseño de servicios', 'consultora latam', 'estrategia basada en datos', 'GTM strategy', 'MVP development'],
  authors: [{ name: 'Habla LATAM' }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Habla - Consultora de Estrategia Basada en Datos',
    description: 'Transformamos negocios con estrategias basadas en investigación y análisis de datos',
    url: 'https://habla.pe',
    siteName: 'Habla',
    images: [
      {
        url: '/isotipo_blue.png',
        width: 1200,
        height: 630,
        alt: 'Habla - Consultora de Estrategia',
      }
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habla - Consultora de Estrategia Basada en Datos',
    description: 'Transformamos negocios con estrategias basadas en investigación',
    images: ['/isotipo_blue.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#006aef',
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Habla LATAM',
    description: 'Consultora líder en estrategia empresarial basada en investigación y datos',
    url: 'https://habla.pe',
    logo: 'https://habla.pe/main_logo.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+51 934 132 700',
      areaServed: ['PE', 'MX', 'LATAM'],
      availableLanguage: ['Spanish', 'English']
    },
    address: [
      {
        '@type': 'PostalAddress',
        addressCountry: 'PE',
        addressRegion: 'Lima',
        addressLocality: 'Lima'
      },
      {
        '@type': 'PostalAddress',
        addressCountry: 'MX',
        addressRegion: 'Ciudad de México',
        addressLocality: 'Ciudad de México'
      }
    ],
    services: [
      'Strategic Innovation',
      'Service Design', 
      'Operational Excellence',
      'GTM Strategy',
      'MVP Development'
    ]
  };

  return (
    <html lang="es" data-theme="light" className="scroll-smooth">
      <body className={workSans.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div>
          <Toaster />
        </div>
        {children}
      </body>
    </html>
  );
}
