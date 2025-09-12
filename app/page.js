import Footer from "@/app/components_habla/Footer";
import HeroSection from "@/app/components_habla/HeroSection";
import Navbar from "@/app/components_habla/Navbar";
import Partners from "./components_habla/Partners";
import SuccessCases from "./components_habla/SuccessCases";
import Team from "./components_habla/Team";
import UsSection from "./components_habla/UsSection";

async function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <UsSection></UsSection>
      <Team></Team>
      <Partners></Partners>
      <SuccessCases></SuccessCases>
      <Footer></Footer>
    </main>
  );
}

export default Home;
