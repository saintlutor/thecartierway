import React, { useState } from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import ProcessSection from "../components/landing/ProcessSection";
import PlansSection from "../components/landing/PlansSection";
import ProfitSection from "../components/landing/ProfitSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import StoriesSection from "../components/landing/StoriesSection";
import TrustSection from "../components/landing/TrustSection";
import FAQSection from "../components/landing/FAQSection";
import BookingModal from "../components/landing/BookingModal";
import Footer from "../components/landing/Footer";

export default function Home() {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const openBooking = (plan) => {
    if (plan) setSelectedPlan(plan);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookCall={() => openBooking(null)} />
      <HeroSection onBookCall={() => openBooking(null)} />
      <ProcessSection />
      <PlansSection onSelectPlan={openBooking} />
      <ProfitSection />
      <TestimonialsSection />
      <StoriesSection />
      <TrustSection onBookCall={() => openBooking(null)} />
      <FAQSection />
      <Footer />
      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}