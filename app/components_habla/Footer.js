'use client';

import Image from "next/image";
import { FaInstagram, FaFacebook, FaTiktok, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-[#006aef] text-white p-10 w-full">
    <aside>
      <Image
        src="/isotipo.png"
        alt="Isotipo Habla LATAM"
        width={50}
        height={50}
        className="fill-current"
      />
      <p className="mt-3">
        <strong>Habla LATAM</strong>
        <br />
        Diseñando rutas de éxito para ti
      </p>
    </aside>
    <nav>
      <h3 className="footer-title">Contacto y Soporte</h3>
      <a className="link link-hover" onClick={() => window.open("https://wa.link/qma2r5", "_blank")} style={{cursor: 'pointer'}}>Contáctanos</a>
      <a href="/#us" className="link link-hover">Sobre Habla</a>
    </nav>
    <nav>
      <h3 className="footer-title">Redes</h3>
      <a className="link link-hover flex items-center gap-2" onClick={() => window.open("https://www.instagram.com/hablalatam", "_blank")} style={{cursor: 'pointer'}}>
        <FaInstagram size={20} /> Instagram
      </a>
      <a className="link link-hover flex items-center gap-2" onClick={() => window.open("https://www.facebook.com/profile.php?id=61550240902611", "_blank")} style={{cursor: 'pointer'}}>
        <FaFacebook size={20} /> Facebook
      </a>
      <a className="link link-hover flex items-center gap-2" onClick={() => window.open("https://www.tiktok.com/@hablalatam_", "_blank")} style={{cursor: 'pointer'}}>
        <FaTiktok size={20} /> TikTok
      </a>
      <a className="link link-hover flex items-center gap-2" onClick={() => window.open("https://www.linkedin.com/company/habla-latam", "_blank")} style={{cursor: 'pointer'}}>
        <FaLinkedin size={20} /> LinkedIn
      </a>
    </nav>
    <nav>
      <h3 className="footer-title">Legal</h3>
      <a className="link link-hover" onClick={() => window.open("https://docs.google.com/document/d/1rdoQGLYoBwZbu6Amga5cVC34AU6xfwmhQpQo3S3XRT4/edit?tab=t.0", "_blank")} style={{cursor: 'pointer'}}>Política de Privacidad</a>
      <a className="link link-hover" onClick={() => window.open("https://docs.google.com/document/d/1cABUK1ozAwzBLrNOh1mhlE5taRmkpwnPDoe7bYC3lhY/edit?tab=t.0#heading=h.v572f46y7ns2", "_blank")} style={{cursor: 'pointer'}}>Términos y Condiciones</a>
    </nav>
    <nav>
      <h3 className="footer-title">Libro de Reclamaciones</h3>
      <Image 
        src="/libro_reclamaciones.png" 
        alt="Libro de reclamaciones" 
        width={230.5*0.5} 
        height={131*0.5}
        onClick={() => window.open("https://form.jotform.com/242916429388065", "_blank")}
        style={{cursor: 'pointer'}}
      />
    </nav>
    </footer>
  )
}

export default Footer; 