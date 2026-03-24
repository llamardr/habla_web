import Footer from "../components_habla/Footer";
import Navbar from "../components_habla/Navbar";
import TeamShowcase from "../components_habla/TeamShowcase";

export const metadata = {
  title: "Equipo",
  description:
    "Conoce al equipo de HABLA y a las personas que conectan estrategia, research, producto, operaciones y diseño.",
  openGraph: {
    title: "Equipo | Habla",
    description:
      "Conoce al equipo de HABLA y a las personas que conectan estrategia, research, producto, operaciones y diseño.",
    url: "https://hablalatam.com/equipo",
  },
  twitter: {
    title: "Equipo | Habla",
    description:
      "Conoce al equipo de HABLA y a las personas que conectan estrategia, research, producto, operaciones y diseño.",
  },
};

export default function EquipoPage() {
  return (
    <main className="bg-[#f6f0e5]">
      <Navbar forceSolid />
      <TeamShowcase mode="page"/>
      <Footer />
    </main>
  );
}
