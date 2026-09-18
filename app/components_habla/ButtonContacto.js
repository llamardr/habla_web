"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { trackGAEvent } from "../lib/googleAnalytics";
import { trackMetaEvent } from "../lib/metaPixel";

const WHATSAPP_URL = "https://wa.link/qma2r5";
const CALENDAR_URL = "https://calendar.app.google/fCrNanFzD2SR3SWJ9";

function lightenColor(color, percent) {
    // Accepts hex color, returns lighter hex color
    let num = parseInt(color.replace("#", ""), 16);
    let r = (num >> 16) + Math.round((255 - (num >> 16)) * percent);
    let g = ((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent);
    let b = (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent);
    return (
        "#" +
        (1 << 24 | (r << 16) | (g << 8) | b)
            .toString(16)
            .slice(1)
            .toUpperCase()
    );
}

const ButtonContacto = ({
    backgroundColor = "#eaff7e",
    color = "#000000"
}) => {
    const [hovered, setHovered] = useState(false);
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    // Close the menu when clicking outside or pressing Escape
    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    // Shadow: very light shadow of backgroundColor
    const boxShadow = hovered
        ? `0 4px 16px 0 ${lightenColor(backgroundColor, 0.7)}55`
        : "none";

    const optionStyle = {
        backgroundColor: backgroundColor,
        color: color,
        border: `2px solid ${backgroundColor}`,
    };

    const handleWhatsappClick = () => {
        trackGAEvent("generate_lead", {
            source: "button_contacto",
            method: "whatsapp",
            lead_type: "contact",
        });
        trackMetaEvent("Lead", {
            source: "button_contacto",
            channel: "whatsapp",
        });
        setOpen(false);
        window.open(WHATSAPP_URL, "_blank");
    };

    const handleCalendarClick = () => {
        trackGAEvent("generate_lead", {
            source: "button_contacto",
            method: "schedule_call",
            lead_type: "contact",
        });
        trackMetaEvent("Lead", {
            source: "button_contacto",
            channel: "schedule_call",
        });
        setOpen(false);
        window.open(CALENDAR_URL, "_blank");
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <button
                className="btn w-full transition-transform duration-200 ease-in-out hover:scale-105"
                style={{
                    backgroundColor: backgroundColor,
                    color: color,
                    border: `2px solid ${backgroundColor}`,
                    boxShadow: boxShadow,
                }}
                onClick={() => setOpen((prev) => !prev)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                aria-haspopup="true"
                aria-expanded={open}
            >
                CONTACTO
            </button>

            {open && (
                <div className="absolute right-0 top-full z-50 mt-2 flex w-max min-w-full flex-col gap-2">
                    <button
                        type="button"
                        className="btn flex w-full items-center justify-center gap-2 whitespace-nowrap uppercase transition-transform duration-200 ease-in-out hover:scale-105"
                        style={optionStyle}
                        onClick={handleWhatsappClick}
                    >
                        <FaWhatsapp aria-hidden="true" className="text-lg" />
                        Escribir por WhatsApp
                    </button>
                    <button
                        type="button"
                        className="btn flex w-full items-center justify-center gap-2 whitespace-nowrap uppercase transition-transform duration-200 ease-in-out hover:scale-105"
                        style={optionStyle}
                        onClick={handleCalendarClick}
                    >
                        <HiOutlineCalendar aria-hidden="true" className="text-lg" />
                        Agendar una llamada
                    </button>
                </div>
            )}
        </div>
    );
};

export default ButtonContacto;
