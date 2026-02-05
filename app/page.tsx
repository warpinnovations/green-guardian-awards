import CategoriesSection from "@/app//components/sections/Categories";
import FAQSection from "@/app/components/sections/FAQSection";
import FooterSection from "@/app/components/sections/FooterSection";
import HeroSection from "@/app/components/sections/HeroSection";
import NominationSection from "@/app/components/sections/NominationSection";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-white font-sans">
      {/* <Header /> */}
      <HeroSection />
      <CategoriesSection />
      <FAQSection />
      <NominationSection />
      <FooterSection  />
    </main>
  );
}
