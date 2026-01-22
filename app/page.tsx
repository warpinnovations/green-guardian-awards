import Header from "./components/Header";
import HeroSection from "./components/sections/HeroSection";
import NominationSection from "./components/sections/NominationSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />
      <div className="h-16" />
      <HeroSection />
      <NominationSection />
    </main>
  );
}
