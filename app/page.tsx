import Header from "./components/Header";
import CategoriesSection from "./components/sections/Categories";
import FooterSection from "./components/sections/FooterSection";
import HeroSection from "./components/sections/HeroSection";
import NominationSection from "./components/sections/NominationSection";
import VideoSection from "./components/sections/Video";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />
      <div className="h-16" />
      <HeroSection />
      <VideoSection />     
      <CategoriesSection/>
      <NominationSection />
      <FooterSection />
    </main>
  );
}
