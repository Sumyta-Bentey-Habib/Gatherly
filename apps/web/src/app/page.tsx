"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ExploreEvents from "../components/ExploreEvents";
import FeaturesBento from "../components/FeaturesBento";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import { useExploreEvents } from "./hooks/useExploreEvents";

export default function Home() {
  const exploreEventsState = useExploreEvents();

  return (
    <div className="font-body-md text-body-md antialiased overflow-x-hidden landing-page bg-surface text-on-surface">
      <Navbar />

      <Hero />

      <ExploreEvents {...exploreEventsState} />

      <FeaturesBento />
      <HowItWorks />
      <Testimonials />
      <CallToAction />

      <Footer />
    </div>
  );
}

