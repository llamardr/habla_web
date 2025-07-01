'use client'

import React, { useEffect, useState } from "react";

const VideoStepsSection = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;

        // Ensure the scale is within a safe range (1x to 1.3x)
        const newScale = Math.min(1 + scrollTop / 1000, 1.1);
        setScale(newScale);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="flex justify-center w-full">
      <div className="w-full max-w-7xl bg-[#0C1229] rounded-lg pt-16 pb-8 px-4 flex flex-col items-center">
        
        {/* Video Container with Smooth Scaling */}
        <div
          className="w-full md:w-2/3 aspect-video rounded-lg bg-gray-300 mb-16 transition-transform duration-500 ease-out overflow-hidden"
          style={{
            transform: `scale(${scale})`,
            maxWidth: "50%", // Prevents overflow
            maxHeight: "40vh", // Ensures it never gets too tall
          }}
        >
          <video
            src="/explainer/video.mp4"
            controls
            className="w-full h-full object-cover rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white mb-8">
          <div>
            <div className="text-3xl">🗳️</div>
            <div className="text-sm mt-2">Sube tu estado de cuenta en PDF</div>
          </div>
          <div>
            <div className="text-3xl">🪄</div>
            <div className="text-sm mt-2">Presiona convertir</div>
          </div>
          <div>
            <div className="text-3xl">🗂️</div>
            <div className="text-sm mt-2">Descárgalo como una tabla en Excel</div>
          </div>
        </div>

        {/* Security Disclaimer */}
        <div className="flex items-center justify-center text-[#8A9099] text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#8A9099"
            className="h-6 w-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M12.516 2.17a.75.75 0 0 0-1.032 0 ... "
              clipRule="evenodd"
            />
          </svg>
          <p>
            Si la conversión no cumplió con tus expectativas te devolvemos 100% del dinero.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoStepsSection;