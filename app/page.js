import Navbar from "@/app/components_habla/Navbar";
import HeroSection from "@/app/components_habla/HeroSection";
import Footer from "@/app/components_habla/Footer";
import UsSection from "./components_habla/UsSection";
import Partners from "./components_habla/Partners";
import Team from "./components_habla/Team";
import SuccessCases from "./components_habla/SuccessCases";

async function Home() {
  
  return (
    <main>

      
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <UsSection></UsSection>
      <Partners></Partners>
      <Team></Team>
      <SuccessCases></SuccessCases>
      <Footer></Footer>
      

    </main>
  );
}


export default Home;