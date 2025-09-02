'use client';

import Image from "next/image";

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
        Basado en datos impulsado por humanos
      </p>
    </aside>
    <nav>
      <h3 className="footer-title">Contacto y soporte</h3>
      <a className="link link-hover" onClick={() => window.open("https://wa.link/qma2r5", "_blank")} style={{cursor: 'pointer'}}>Contáctanos</a>
      <a href="/#us" className="link link-hover">Sobre Habla</a>
    </nav>
    <nav>
      <h3 className="footer-title">Legal</h3>
      <a className="link link-hover" onClick={() => window.open("https://docs.google.com/document/d/1rdoQGLYoBwZbu6Amga5cVC34AU6xfwmhQpQo3S3XRT4/edit?tab=t.0", "_blank")} style={{cursor: 'pointer'}}>Política de privacidad</a>
      <a className="link link-hover" onClick={() => window.open("https://docs.google.com/document/d/1cABUK1ozAwzBLrNOh1mhlE5taRmkpwnPDoe7bYC3lhY/edit?tab=t.0#heading=h.v572f46y7ns2", "_blank")} style={{cursor: 'pointer'}}>Términos y condiciones</a>
    </nav>
    <nav>
      <h3 className="footer-title">Libro de reclamaciones</h3>
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