import Footer from "../components_habla/Footer";
import JsonLd from "../components_habla/JsonLd";
import Navbar from "../components_habla/Navbar";
import TeamShowcase from "../components_habla/TeamShowcase";
import { teamSchema } from "../lib/schema";

export const metadata = {
  alternates: { canonical: "/equipo" },
  title: "Equipo",
  description:
    "Conoce al equipo de HABLA y a las personas que conectan estrategia, research, producto, operaciones y diseño.",
  openGraph: {
    title: "Equipo | Habla",
    description:
      "Conoce al equipo de HABLA y a las personas que conectan estrategia, research, producto, operaciones y diseño.",
    url: "/equipo",
  },
  twitter: {
    title: "Equipo | Habla",
    description:
      "Conoce al equipo de HABLA y a las personas que conectan estrategia, research, producto, operaciones y diseño.",
  },
};

export default function EquipoPage() {
  return (
    <main className="bg-[#fdf6ea]">
      <JsonLd data={teamSchema()} />
      <Navbar forceSolid />
      <TeamShowcase mode="page"/>
      <Footer />
    </main>
  );
}
