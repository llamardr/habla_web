'use client';

import Image from 'next/image';
import Link from 'next/link';
import { trackGAEvent } from "../lib/googleAnalytics";
import { trackMetaEvent } from "../lib/metaPixel";

const MiniSuccessCaseCard = ({
  id,
  imageUrl,
  title,
  location = '',
  logo = '',
  href = '#successcases',
  aspectRatio = '',
  marginClass = '',
  transformClass = '',
  borderColor = ''
}) => (
  <div
    key={id}
    className={`group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-6 ${aspectRatio} ${marginClass} ${transformClass} transition-transform duration-300 min-h-[180px]`}
  >
    <div className={`absolute inset-0 border-8 ${borderColor} rounded-xl z-40 pointer-events-none`}></div>
    <Image
      src={imageUrl}
      alt={`Caso de éxito: ${title} - ${location}`}
      width={900}
      height={1200}
      className="object-cover rounded-xl w-full h-full"
    />
    {/* Overlay on hover */}
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between z-30">
      {/* Top: location and logo */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 pt-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="type-body-small text-[#fdf6ea]">{location}</span>
        <div className="flex-1 mx-3 border-t border-[#fdf6ea] h-0.5" />
        {logo && (
          <div className="w-16 h-10 flex items-center justify-end">
            <Image src={logo} alt={`Partner: ${title} - Cliente de Habla`} width={64} height={40} unoptimized className="object-contain" />
          </div>
        )}
      </div>
      {/* Bottom: title and button */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col items-start px-5 pb-5">
        <h3 className="type-h3 type-white mb-2 w-full break-words px-0 text-left">{title}</h3>
        <Link
          href={href}
          className="type-body-small text-[#fdf6ea] transition-all duration-200 hover:underline"
          onClick={() => {
            trackGAEvent("select_content", {
              source: "mini_success_case_card",
              content_type: "success_case",
              item_name: title,
              link_url: href,
            });
            trackMetaEvent("ViewContent", {
              source: "mini_success_case_card",
              content_name: title,
            });
          }}
        >
          Ver caso
        </Link>
      </div>
    </div>
  </div>
);

export default MiniSuccessCaseCard; 
