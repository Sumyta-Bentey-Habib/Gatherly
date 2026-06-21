"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ExploreEvents from "../../components/ExploreEvents";
import { useExploreEvents } from "../hooks/useExploreEvents";

export default function ExplorePage() {
  const exploreEventsState = useExploreEvents();

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-body-md antialiased landing-page">
      <Navbar />

      <main className="flex-1 flex flex-col pt-32 pb-24 relative overflow-hidden gradient-bg">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-fixed/30 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10 text-center mb-16">
          <span className="material-symbols-outlined text-primary text-4xl mb-2">
            explore
          </span>
          <h1 className="font-display-lg text-headline-lg text-on-surface mb-4">
            Explore Events
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Discover the best gatherings around you and book your tickets instantly.
          </p>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10">
          <ExploreEvents
            filteredEvents={exploreEventsState.filteredEvents}
            loading={exploreEventsState.loading}
            searchKeyword={exploreEventsState.searchKeyword}
            setSearchKeyword={exploreEventsState.setSearchKeyword}
            searchLocation={exploreEventsState.searchLocation}
            setSearchLocation={exploreEventsState.setSearchLocation}
            selectedCategory={exploreEventsState.selectedCategory}
            popularCategories={exploreEventsState.popularCategories}
            handleSearch={exploreEventsState.handleSearch}
            handleCategoryClick={exploreEventsState.handleCategoryClick}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
