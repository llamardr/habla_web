import Image from "next/image";

const RESPONSIBILITIES = [
  "Diseño de criterios de reclutamiento",
  "Activación de convocatorias",
  "Supervisión de validación",
  "Control de incentivos",
  "Seguimiento de calidad en campo",
];

export default function CampoSection() {
  return (
    <section id="campo" className="w-full">
      <div className="bg-[#006aef]">
        <div className="mx-auto grid max-w-6xl px-4 pt-10 text-[#fdf6ea] sm:px-6 md:grid-cols-[minmax(0,18rem)_1fr] md:pt-14 lg:px-8">
          <div className="flex items-center py-6 md:py-8">
            <h2 className="type-h2 type-beige">Campo</h2>
          </div>
          <div className="flex items-center py-6 md:py-8 md:pl-8">
            <p className="type-subheading type-beige max-w-2xl">
              En Habla Latam tenemos una estructura propia de reclutamiento,
              validación y coordinación que garantiza precisión en cada perfil.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl px-4 sm:px-6 lg:px-8 lg:grid-cols-[minmax(0,38rem)_1fr]">
          <div className="flex flex-col justify-center gap-6 py-10 text-[#fdf6ea] lg:min-h-[34rem] lg:py-16 lg:pl-16">
            <p className="type-body max-w-xl">
              Habla en Campo está liderado por Patricio y Lady, responsables de
              diseñar, activar y supervisar todo el sistema de levantamiento de
              información.
            </p>
            <p className="type-body max-w-xl">
              Desde la definición de perfiles hasta la validación final de
              participantes, cada filtro pasa por esta coordinación.
            </p>
          </div>

          {/* La foto recortada mide 1046x1053 y las personas terminan en el
              83.3% de la altura: los porcentajes de abajo alinean el corte de
              las personas con el borde azul/negro y dejan que el teléfono
              caiga sobre la franja negra. Se ancla a la derecha de su columna
              para que el teléfono nunca toque el texto. */}
          <div className="lg:order-first lg:relative">
            <div className="relative z-10 mx-auto mt-4 w-full max-w-[26rem] lg:static lg:mx-0 lg:mt-0 lg:max-w-none">
              <div className="relative z-10 aspect-[1046/1053] -mb-[16.8%] lg:absolute lg:right-0 lg:top-0 lg:mb-0 lg:h-[120%] lg:w-auto">
                <Image
                  src="/comunidad/campo-lady-pato-v2.webp"
                  alt="Patricio y Lady, líderes de Habla en Campo, junto a un teléfono colgando"
                  fill
                  sizes="(max-width: 1023px) 88vw, 42rem"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-12 lg:px-8">
          <p className="type-h3 type-beige">
            Se encargan de
          </p>
          <ul className="mt-6 divide-y divide-[#fdf6ea]/25 md:mt-8 md:grid md:grid-cols-5 md:divide-x md:divide-y-0">
            {RESPONSIBILITIES.map((item) => (
              <li
                key={item}
                className="type-body-small py-4 text-[#fdf6ea] md:px-5 md:py-2 md:first:pl-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
