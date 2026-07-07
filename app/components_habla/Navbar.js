'use client';

import { useState, useEffect } from "react";
import ButtonContacto from "./ButtonContacto";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { trackGAEvent } from "../lib/googleAnalytics";

const Navbar = ({
  forceSolid = false,
  hasAnnouncementBanner = false,
  initialTextColor = "light",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrolledOrMenuOpen = forceSolid || isScrolled || menuOpen;
  const useDarkInitialText = initialTextColor === "dark";
  const initialNavTextClass = useDarkInitialText ? "text-black" : "text-[#fdf6ea]";
  const initialLogoSrc = useDarkInitialText ? "/isotipo_blue.png" : "/isotipo.png";
  const initialLinkClass = useDarkInitialText
    ? "hover:text-black hover:underline"
    : "hover:text-[#fdf6ea] hover:underline";
  const navTopClass = hasAnnouncementBanner
    ? scrolledOrMenuOpen
      ? "top-[50px] lg:top-[66px]"
      : "top-[50px]"
    : scrolledOrMenuOpen
      ? "top-0 lg:top-4"
      : "top-0";

  const trackNavClick = (itemName, href) => {
    trackGAEvent("select_content", {
      source: "navbar",
      content_type: "navigation_link",
      item_name: itemName,
      link_url: href,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed left-1/2 transform -translate-x-1/2 z-[90] transition-all duration-200 ease-in-out ${navTopClass}
                    ${scrolledOrMenuOpen ? "w-full lg:w-3/4 lg:rounded-xl bg-[rgba(253,246,234,0.8)] border border-[rgba(180,180,180,0.3)] backdrop-blur-lg shadow-lg"
                              : `${initialNavTextClass} w-full rounded-none`}
                    `}>
      
      
      <div className={`${scrolledOrMenuOpen ? "lg:px-2 px-5" : "lg:px-10 px-5"} py-2 transition-all duration-200 ease-in-out`}>
        <div className="flex items-center justify-between px-4 py-2 md:px-10">
          {/* Left: Logo */}
          <div className="flex justify-start pl-4">
            <Link href="/" onClick={() => trackNavClick("logo", "/")}>
              <Image
                src={scrolledOrMenuOpen ? "/isotipo_blue.png" : initialLogoSrc}
                alt="Logo de Habla - Ir al Inicio"
                width={30}
                height={30}
                unoptimized
              />
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="type-ui hidden md:flex space-x-8">
            <Link href="/equipo" onClick={() => trackNavClick("equipo", "/equipo")} className={scrolledOrMenuOpen ? "hover:underline" : initialLinkClass}>EQUIPO</Link>
            <Link href="/#partners" onClick={() => trackNavClick("clientes", "/#partners")} className={scrolledOrMenuOpen ? "hover:underline" : initialLinkClass}>CLIENTES</Link>
            <Link href="/#successcases" onClick={() => trackNavClick("casos_de_exito", "/#successcases")} className={scrolledOrMenuOpen ? "hover:underline" : initialLinkClass}>CASOS DE ÉXITO</Link>
            <Link href="/#enfoque" onClick={() => trackNavClick("enfoque", "/#enfoque")} className={scrolledOrMenuOpen ? "hover:underline" : initialLinkClass}>ENFOQUE</Link>
            <Link href="/#campo" onClick={() => trackNavClick("comunidad", "/#campo")} className={scrolledOrMenuOpen ? "hover:underline" : initialLinkClass}>COMUNIDAD</Link>
          </div>
          {/* Contact Button (desktop) */}
          <div className="hidden md:flex">
            <ButtonContacto/>
          </div>
          {/* Hamburger (mobile) */}
          <button
            className={`md:hidden ${scrolledOrMenuOpen || useDarkInitialText ? "text-black" : "text-[#fdf6ea]"}`}
            onClick={() => {
              trackGAEvent("select_content", {
                source: "navbar",
                content_type: "mobile_menu",
                item_name: menuOpen ? "close_menu" : "open_menu",
              });
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden flex flex-col shadow-lg pb-6 px-6 mt-2 ${scrolledOrMenuOpen ? "bg-[rgba(253,246,234,0)]" : "bg-[#fdf6ea]"}`}>
          <div className="type-ui flex flex-col space-y-4 py-4 text-black">
            <Link href="/equipo" onClick={() => trackNavClick("equipo", "/equipo")} className="hover:underline">EQUIPO</Link>
            <Link href="/#partners" onClick={() => trackNavClick("clientes", "/#partners")} className="hover:underline">CLIENTES</Link>
            <Link href="/#successcases" onClick={() => trackNavClick("casos_de_exito", "/#successcases")} className="hover:underline">CASOS DE ÉXITO</Link>
            <Link href="/#enfoque" onClick={() => trackNavClick("enfoque", "/#enfoque")} className="hover:underline">ENFOQUE</Link>
            <Link href="/#campo" onClick={() => trackNavClick("comunidad", "/#campo")} className="hover:underline">COMUNIDAD</Link>
          </div>
          <ButtonContacto />
        </div>
      )}

      
    </nav>
  );
};

export default Navbar;




// 
