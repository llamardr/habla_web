import BehaviorFocusSection from "@/app/components_habla/BehaviorFocusSection";
import EnfoqueSection from "@/app/components_habla/EnfoqueSection";
import Footer from "@/app/components_habla/Footer";
import BusinessDecisionsSection from "@/app/components_habla/BusinessDecisionsSection";
import HeroSection from "@/app/components_habla/HeroSection";
import Navbar from "@/app/components_habla/Navbar";
import AnnouncementBanner from "./components_habla/AnnouncementBanner";
import CampoSection from "./components_habla/CampoSection";
import Community from "./components_habla/Community";
import CommunityCTASection from "./components_habla/CommunityCTASection";
import RecruitersSection from "./components_habla/RecruitersSection";
import Partners from "./components_habla/Partners";
import SuccessCases from "./components_habla/SuccessCases";
import SuccessCasesCarouselSection from "./components_habla/SuccessCasesCarouselSection";
import Team from "./components_habla/Team";
import UsSection from "./components_habla/UsSection";

async function Home() {
  return (
    <main>
      <AnnouncementBanner />
      <Navbar hasAnnouncementBanner></Navbar>
      <HeroSection subtitle="Diseñamos rutas de éxito para ti"></HeroSection>
      <BusinessDecisionsSection />
      <Team></Team>
      <Partners></Partners>     
      <SuccessCasesCarouselSection></SuccessCasesCarouselSection>
      <BehaviorFocusSection />
      <EnfoqueSection />
      <CampoSection />
      <RecruitersSection />
      <CommunityCTASection />
      <Footer></Footer>
    </main>
  );
}

export default Home;
