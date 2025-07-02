'use client';
import React, { useState, useEffect } from "react";


const teamMembers = [
  { name: "Anais Freitas", title: "Partner | UX & Storytelling", linkedin: "https://www.linkedin.com/in/anais-freitas-el%C3%A9spuru-54375073/", profile_pic: '/team/Anais.png' },
  { name: "Santiago Burga", title: "Partner | Product & Technology", linkedin: "https://www.linkedin.com/in/santiagoburgabenavides/", profile_pic: '/team/Santiago.png' },
  { name: "Patricio Yrigoyen", title: "Partner | Operations & Data", linkedin: "https://www.linkedin.com/in/patricio-yrigoyen/", profile_pic: '/team/Patricio.png'},
  { name: "Aldo Román", title: "Collaborator | Software", linkedin: "https://www.linkedin.com/in/aldoroman/", profile_pic: '/team/Aldo.png' },
  { name: "Lady Vargas", title: "Collaborator | Design and Research", linkedin: "https://www.linkedin.com/in/lady-vargas-9ba74913a/", profile_pic: '/team/Lady.png' },
  { name: "Maria Jose Tola", title: "Collaborator | Marketing and GenZ", linkedin: "https://www.linkedin.com/in/maria-jose-tola-dourojeanni-2674a5202/", profile_pic: '/team/Lady.png' },
  { name: "Sheila Acuña", title: "Collaborator | UX Research", linkedin: "https://www.linkedin.com/in/sheila-acu%C3%B1a-obreg%C3%B3n/", profile_pic: '/team/Shey.png'},
  { name: "Milagros Freitas", title: "Advisor | Market Research", linkedin: "https://www.linkedin.com/in/milagros-freitas-2930a451/" , profile_pic: '/team/Mili.png'},
  { name: "Silvia Angulo", title: "Collaborator | UX Research", linkedin: "https://www.linkedin.com/in/silviaangulogamero/", profile_pic: '/team/Silv.png' },
];


const Chip = ({ name, title, linkedin, profile_pic }) => (
  <div className="flex items-center gap-6 bg-white border border-gray-200 rounded-full px-10 py-4 shadow-sm w-full transition-transform duration-300 hover:scale-105">
    <img
      src={profile_pic}
      alt={name}
      className="w-16 h-16 rounded-full object-cover"
    />
    <div className="flex-1">
      <div className="font-semibold text-m text-gray-900">{name}</div>
      <div className="text-gray-500 text-xs">{title}</div>
    </div>
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="icon flex items-center gap-1"
      aria-label={`LinkedIn de ${name}`}
    >
      <svg width="25" height="26" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.2416 2.1001H3.76156C2.56156 2.1001 1.60156 3.0601 1.60156 4.1801V28.8201C1.60156 29.9401 2.56156 30.9001 3.76156 30.9001H28.3216C29.5216 30.9001 30.4816 29.9401 30.4816 28.8201V4.1801C30.4016 3.0601 29.4416 2.1001 28.2416 2.1001ZM10.1616 26.6601H5.84156V12.9001H10.0816V26.6601H10.1616ZM8.00156 10.9801C6.64156 10.9801 5.52156 9.8601 5.52156 8.5001C5.52156 7.1401 6.64156 6.1001 8.00156 6.1001C9.36156 6.1001 10.4816 7.2201 10.4816 8.5801C10.4816 9.9401 9.36156 10.9801 8.00156 10.9801ZM26.1616 26.6601H21.9216V19.9401C21.9216 18.3401 21.9216 16.2601 19.6816 16.2601C17.4416 16.2601 17.1216 18.0201 17.1216 19.7801V26.5801H12.8016V12.9001H16.8816V14.7401H16.9616C17.5216 13.6201 18.9616 12.5001 21.0416 12.5001C25.3616 12.5001 26.1616 15.3801 26.1616 19.0601V26.6601Z" fill="#262626"></path>
      </svg>
      <svg width="5" height="5" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.10066 2.11189L0.899458 2.10575L0.897684 0.602072L8.66669 0.61124L8.67586 8.38025L7.17218 8.37847L7.16604 3.17554L1.42093 8.92069L0.356419 7.85617L6.10066 2.11189Z" fill="#262626"></path>
      </svg>
    </a>
  </div>
);

const Team = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMediumOrBelow, setIsMediumOrBelow] = useState(false);

  useEffect(() => {
    // Function to check if the screen is medium or below
    const checkScreen = () => setIsMediumOrBelow(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const visibleMembers = isMediumOrBelow && !showAll ? teamMembers.slice(0, 3) : teamMembers;

  return (
    <section id="team" className="py-10 mb-10">
      <div className="mx-auto max-w-6xl mt-8 mb-10 px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-[#006aef] text-5xl md:text-6xl mb-6 leading-tight pb-4">
              Equipo
            </h2>
          </div>
          <div className="md:w-1/2 md:pl-12 flex items-center">
            <p className="text-[#006aef] text-base opacity-80">
              Durante la investigación te acompaña nuestro equipo de 5 researchers con más de 10 años de experiencia. Cuando llega el momento de ejecutar la estrategia nuestro equipo de Subject Matter Experts se encargará de ayudarte.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {visibleMembers.map((member, idx) => (
            <Chip key={idx} {...member} />
          ))}
        </div>
      </div>
      {/* Show button on mobile and medium, hide on large screens */}
      <div className="flex justify-center mt-6 lg:hidden">
        {teamMembers.length > 3 && (
          <button
            className="text-[#006aef] text-sm mb-4 inline-block opacity-80 relative group px-6 py-2 rounded-full bg-white transition-colors"
            onClick={() => setShowAll((prev) => !prev)}
          >
            <span className="relative z-10">{showAll ? 'Ver menos' : 'Ver a todo el equipo'}</span>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#006aef] opacity-80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true"/>
          </button>
        )}
      </div>
    </section>
  );
};

export default Team;
