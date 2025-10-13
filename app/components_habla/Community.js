"use client";

import Image from "next/image";
import Link from "next/link";

const Community = () => {
  return (
    <section id="community" className="pt-32 pb-24 md:pb-36 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-5xl md:text-6xl mb-6 leading-tight pb-4">
              Comunidad Habla
            </h2>
            <Link
              href="https://chat.whatsapp.com/IECQLcG7PSdKmQ5H3SYJv3"
              target="_blank"
              className="text-sm mb-4 inline-block opacity-80 relative group"
            >
              <span className="relative z-10">
                Unirme a la comunidad &rarr;
              </span>
              <span
                className="absolute left-0 bottom-0 w-full h-[2px] bg-black opacity-80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="md:w-1/2 md:pl-12 flex items-center">
            <p className="text-base opacity-80">
              Contamos con una comunidad activa y comprometida de personas
              reales dispuestas a compartir sus opiniones y experiencias en
              encuestas, entrevistas y focus groups.
              <br />
              <br />
              Su participación nos permite realizar investigaciones ágiles,
              humanas y con resultados de calidad para nuestros clientes.
            </p>
          </div>
        </div>
        <div className="pt-10 flex flex-col md:flex-row gap-8 items-center justify-center">
          <Image
            src="/community/1.png"
            className="md:ml-8 max-w-80 border-8 rounded-xl border-[#EB8FFE] aspect-[3/4] hover:scale-105 transform translate-x-2 transition-transform duration-300"
            width={384}
            height={512}
          />
          <Image
            src="/community/2.png"
            className="md:mt-12 max-w-80 border-8 rounded-xl border-[#eaff7e] aspect-[3/4] hover:scale-105 transform translate-x-2 transition-transform duration-300"
            width={384}
            height={512}
          />
        </div>
      </div>
    </section>
  );
};

export default Community;
