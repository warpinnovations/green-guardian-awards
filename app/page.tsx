import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />
      <div className="h-16" />
      <HeroSection />
    </main>
  );
}
