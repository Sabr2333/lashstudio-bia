import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import Hero from "./components/Hero";
import AmesMarqueeBand from "./components/AmesMarqueeBand";
import Showcase from "./components/Showcase";
import AmesPackagesSection from "./components/AmesPackagesSection";
import Pricing from "./components/Pricing";
import VideoCardsSection from "./components/VideoCardsSection";
import Footer from "./components/Footer";
import ChatbotButton from "./components/ChatbotButton";

export default function Home() {
  return (
    <>
      <Hero />
      <AmesMarqueeBand />
      <Showcase />
      <AmesPackagesSection />
      <VideoCardsSection />
      <Pricing />
      <Footer />
      <Navbar />
      <MobileMenu />
      <ChatbotButton />
    </>
  );
}
