import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer";
import HeroSection from "@/components/HeroSection/HeroSection";
import VaccinesGrid from "../components/VaccineGrid/VaccineGrid";
import TaglineSection from "@/components/TagLineSection/TaglineSection";
import AgeGroupSection from "@/components/AgeGroupSection/AgeGroupSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-[86rem] mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <VaccinesGrid />
      </main>
      <AgeGroupSection />
      <main className="max-w-[86rem] mx-auto px-4 sm:px-6 lg:px-8">
        <TaglineSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
