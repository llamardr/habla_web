"use client";

import React, { useMemo, useState } from "react";

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

    // Shadow: very light shadow of backgroundColor
    const boxShadow = hovered
        ? `0 4px 16px 0 ${lightenColor(backgroundColor, 0.7)}55`
        : "none";

    return (
        <button
            className="btn w-full transition-transform duration-200 ease-in-out hover:scale-105"
            style={{
                backgroundColor: backgroundColor,
                color: color,
                border: `2px solid ${backgroundColor}`,
                boxShadow: boxShadow,
            }}
            onClick={() => window.open("https://wa.link/qma2r5", "_blank")}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            CONTACTO
        </button>
    );
};

export default ButtonContacto;