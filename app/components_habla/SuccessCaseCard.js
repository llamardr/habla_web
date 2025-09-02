import Image from 'next/image';

const SuccessCaseCard = ({
  id,
  imageUrl,
  title,
  services,
  description,
  location = '',
  logo = '',
  aspectRatio = '',
  marginClass = '',
  transformClass = '',
  borderColor = ''
}) => (
  <div key={id} className={`group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid mb-8 ${aspectRatio} ${marginClass} ${transformClass} transition-transform duration-300 z-50`}>
    <div className={`absolute inset-0 border-8 ${borderColor} rounded-2xl z-30 pointer-events-none`}></div>
    <Image
      src={imageUrl}
      alt={title}
      layout="fill"
      className="object-cover rounded-2xl"
    />
    {/* Subtle dark overlay */}
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
    {/* Top info: location, line, logo */}
    <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 pt-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-white text-sm font-light">{location}</span>
      <div className="flex-1 mx-3 border-t border-white h-0.5" />
      {logo && (
        <div className="w-16 h-10 flex items-center justify-end">
          <Image src={logo} alt="logo" width={64} height={40} className="object-contain" />
        </div>
      )}
    </div>
    {/* Overlay content */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-start p-6 text-left z-20">
      <h3 className="text-white text-2xl font-bold mb-2 leading-[0.9]">{title}</h3>
      <p className="text-white text-xs mb-4 font-light">{services}</p>
      <p className="text-white text-xs font-normal">{description}</p>
    </div>
  </div>
);

export default SuccessCaseCard; 