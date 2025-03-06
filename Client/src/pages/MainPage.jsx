// File: src/pages/MainPage.jsx
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import HeroHeader from "../components/HeroHeader";
import RewardsSection from "../components/RewardsSection";
import OngoingChallenges from "../components/OngoingChallenges";
import GuideSection from "../components/GuideSection";
import CompletedChallenges from "../components/CompletedChallenges";
import FoundersSection from "../components/FoundersSection";
import TweetSection from "../components/TweetSection";
import Footer from "../components/Footer";

function MainPage() {
  const location = useLocation();

  // Refs for auto-scrolling
  const guideRef = useRef(null);
  const completedRef = useRef(null);

  useEffect(() => {
    // If the route is /guide, scroll to guide section
    if (location.pathname === "/guide" && guideRef.current) {
      guideRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // If the route is /completed, scroll to completed section
    if (location.pathname === "/completed" && completedRef.current) {
      completedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="bg-[#0d0a1a] text-white">
      <HeroHeader />
      <RewardsSection />
      <OngoingChallenges />

      {/* Guide Section with ref */}
      <div ref={guideRef}>
        <GuideSection />
      </div>

      {/* Completed Section with ref */}
      <div ref={completedRef}>
        <CompletedChallenges />
      </div>

      <FoundersSection />
      <TweetSection />
      <Footer />
    </div>
  );
}

export default MainPage;
