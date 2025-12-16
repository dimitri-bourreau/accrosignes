import HomeIntroduction from "@/components/home-introduction";
import FeaturesSection from "@/components/features-section";
import SupportSection from "@/components/support-section";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HomeIntroduction />
      <FeaturesSection />
      <SupportSection />
      <Footer />
    </div>
  );
}
