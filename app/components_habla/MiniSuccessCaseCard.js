import Image from 'next/image';
import Link from 'next/link';

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
        <span className="text-white text-sm font-light">{location}</span>
        <div className="flex-1 mx-3 border-t border-white h-0.5" />
        {logo && (
          <div className="w-16 h-10 flex items-center justify-end">
            <Image src={logo} alt={`Partner: ${title} - Cliente de Habla`} width={64} height={40} className="object-contain" />
          </div>
        )}
      </div>
      {/* Bottom: title and button */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col items-start px-5 pb-5">
        <h3 className="text-white text-lg font-bold mb-2 text-left px-0 leading-tight w-full break-words whitespace-normal">{title}</h3>
        <Link href={href} className="text-white text-sm hover:underline transition-all duration-200">
          Ver caso
        </Link>
      </div>
    </div>
  </div>
);

export default MiniSuccessCaseCard; 