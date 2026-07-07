'use client';

import Image from "next/image";
import { FaInstagram, FaFacebook, FaTiktok, FaLinkedin } from 'react-icons/fa';
import { trackGAEvent } from "../lib/googleAnalytics";
import { trackMetaEvent } from "../lib/metaPixel";

const Footer = () => {
  const trackOutboundClick = ({ source, channel, url }) => {
    trackGAEvent("outbound_click", {
      source,
      channel,
      link_url: url,
    });
  };

  return (
    <footer className="footer bg-[#006aef] text-[#fdf6ea] p-10 w-full">
    <aside>
      <Image
        src="/isotipo.png"
        alt="Isotipo Habla LATAM"
        width={50}
        height={50}
        unoptimized
        className="fill-current"
      />
      <p className="mt-3">
        <strong>Habla LATAM</strong>
        <br />
        Diseñamos rutas de éxito para ti
      </p>
    </aside>
    <nav>
      <h3 className="footer-title">Contacto y Soporte</h3>
      <a
        className="link link-hover"
        onClick={() => {
          trackGAEvent("generate_lead", {
            source: "footer_contacto",
            method: "whatsapp",
            lead_type: "contact",
          });
          trackMetaEvent("Lead", { source: "footer_contacto", channel: "whatsapp" });
          window.open("https://wa.link/qma2r5", "_blank");
        }}
        style={{cursor: 'pointer'}}
      >
        Contáctanos
      </a>
      <a href="/#us" className="link link-hover">Sobre Habla</a>
    </nav>
    <nav>
      <h3 className="footer-title">Redes</h3>
      <a
        className="link link-hover flex items-center gap-2"
        onClick={() => {
          trackOutboundClick({
            source: "footer_social",
            channel: "instagram",
            url: "https://www.instagram.com/hablalatam",
          });
          trackMetaEvent("Contact", { source: "footer_social", channel: "instagram" });
          window.open("https://www.instagram.com/hablalatam", "_blank");
        }}
        style={{cursor: 'pointer'}}
      >
        <FaInstagram size={20} /> Instagram
      </a>
      <a
        className="link link-hover flex items-center gap-2"
        onClick={() => {
          trackOutboundClick({
            source: "footer_social",
            channel: "facebook",
            url: "https://www.facebook.com/profile.php?id=61550240902611",
          });
          trackMetaEvent("Contact", { source: "footer_social", channel: "facebook" });
          window.open("https://www.facebook.com/profile.php?id=61550240902611", "_blank");
        }}
        style={{cursor: 'pointer'}}
      >
        <FaFacebook size={20} /> Facebook
      </a>
      <a
        className="link link-hover flex items-center gap-2"
        onClick={() => {
          trackOutboundClick({
            source: "footer_social",
            channel: "tiktok",
            url: "https://www.tiktok.com/@hablalatam_",
          });
          trackMetaEvent("Contact", { source: "footer_social", channel: "tiktok" });
          window.open("https://www.tiktok.com/@hablalatam_", "_blank");
        }}
        style={{cursor: 'pointer'}}
      >
        <FaTiktok size={20} /> TikTok
      </a>
      <a
        className="link link-hover flex items-center gap-2"
        onClick={() => {
          trackOutboundClick({
            source: "footer_social",
            channel: "linkedin",
            url: "https://www.linkedin.com/company/habla-latam",
          });
          trackMetaEvent("Contact", { source: "footer_social", channel: "linkedin" });
          window.open("https://www.linkedin.com/company/habla-latam", "_blank");
        }}
        style={{cursor: 'pointer'}}
      >
        <FaLinkedin size={20} /> LinkedIn
      </a>
    </nav>
    <nav>
      <h3 className="footer-title">Legal</h3>
      <a
        className="link link-hover"
        onClick={() => {
          const url = "https://docs.google.com/document/d/1rdoQGLYoBwZbu6Amga5cVC34AU6xfwmhQpQo3S3XRT4/edit?tab=t.0";
          trackOutboundClick({
            source: "footer_legal",
            channel: "google_docs",
            url,
          });
          window.open(url, "_blank");
        }}
        style={{cursor: 'pointer'}}
      >
        Política de Privacidad
      </a>
      <a
        className="link link-hover"
        onClick={() => {
          const url = "https://docs.google.com/document/d/1cABUK1ozAwzBLrNOh1mhlE5taRmkpwnPDoe7bYC3lhY/edit?tab=t.0#heading=h.v572f46y7ns2";
          trackOutboundClick({
            source: "footer_legal",
            channel: "google_docs",
            url,
          });
          window.open(url, "_blank");
        }}
        style={{cursor: 'pointer'}}
      >
        Términos y Condiciones
      </a>
    </nav>
    <nav>
      <h3 className="footer-title">Libro de Reclamaciones</h3>
      <Image 
        src="/libro_reclamaciones.png" 
        alt="Libro de reclamaciones" 
        width={230.5*0.5} 
        height={131*0.5}
        unoptimized
        onClick={() => {
          const url = "https://form.jotform.com/242916429388065";
          trackOutboundClick({
            source: "footer_libro_reclamaciones",
            channel: "jotform",
            url,
          });
          window.open(url, "_blank");
        }}
        style={{cursor: 'pointer'}}
      />
    </nav>
    </footer>
  )
}

export default Footer; 
