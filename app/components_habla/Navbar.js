'use client';

import { useState, useEffect } from "react";
import ButtonContacto from "./ButtonContacto";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrolledOrMenuOpen = isScrolled || menuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-200 ease-in-out
                    ${scrolledOrMenuOpen ? "top-0 lg:top-4 w-full lg:w-3/4 lg:rounded-xl bg-[rgba(255,255,255,0.8)] border border-[rgba(180,180,180,0.3)] backdrop-blur-lg shadow-lg" 
                              : "text-white top-0 w-full rounded-none"}
                    `}>
      
      
      <div className={`${scrolledOrMenuOpen ? "lg:px-2 px-5" : "lg:px-10 px-5"} py-2 transition-all duration-200 ease-in-out`}>
        <div className="flex items-center justify-between px-4 py-2 md:px-10">
          {/* Left: Logo */}
          <div className="flex justify-start pl-4">
            <Link href="/">
              <Image src={scrolledOrMenuOpen ? "/isotipo_blue.png" : "/isotipo.png"} alt="Logo de Habla - Ir al Inicio" width={30} height={30}/>
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-base font-normal">
            <Link href="/#us" className={scrolledOrMenuOpen ?  "hover:underline" : "hover:text-white hover:underline"} >CONSULTORA</Link>
            <Link href="/#partners" className= {scrolledOrMenuOpen ?  "hover:underline" : "hover:text-white hover:underline"}>CLIENTES</Link>
            <Link href="/#team" className= {scrolledOrMenuOpen ?  "hover:underline" : "hover:text-white hover:underline"}>EQUIPO</Link>
          </div>
          {/* Contact Button (desktop) */}
          <div className="hidden md:flex">
            <ButtonContacto/>
          </div>
          {/* Hamburger (mobile) */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden flex flex-col shadow-lg pb-6 px-6 mt-2 ${scrolledOrMenuOpen ? "bg-[rgba(255,255,255,0)]" : "bg-white"}`}>
          <div className="flex flex-col space-y-4 text-black font-medium text-lg py-4">
            <Link href="/#us" className="hover:underline">CONSULTORA</Link>
            <Link href="/#partners" className="hover:underline">CLIENTES</Link>
            <Link href="/#team" className="hover:underline">EQUIPO</Link>
          </div>
          <ButtonContacto />
        </div>
      )}

      
    </nav>
  );
};

export default Navbar;




// 