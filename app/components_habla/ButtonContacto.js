"use client";

const ButtonContacto = () => {
    
    return (
        <button 
            className="btn w-full" // Tailwind w-64 for increased width (~16rem)
            style={{ backgroundColor: "#eaff7e", color: "#000000" }}
            onClick={() => window.open("https://wa.link/qma2r5", "_blank")}
        >
            CONTACTO
        </button>
    )


};

export default ButtonContacto;