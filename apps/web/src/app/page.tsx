"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { featuredEvents } from "./data/dummyData";
import { apiFetch } from "../lib/api";

interface EventItem {
  _id?: string;
  id: string;
  title: string;
  category: string;
  startDate?: string;
  date?: string;
  location: string;
  price: string | number;
  imgUrl?: string;
  imageUrl?: string;
  description: string;
  tag?: string;
}

export default function Home() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Search States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const popularCategories = [
    "Design",
    "Networking",
    "Conference",
    "Tech Summits",
  ];

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/events");
      if (data && data.length > 0) {
        // Normalize IDs
        const normalized = data.map((evt: any) => ({
          ...evt,
          id: evt._id || evt.id,
        }));
        setEvents(normalized);
        setFilteredEvents(normalized);
      } else {
        // Fallback to dummy events if database is empty
        setEvents(featuredEvents);
        setFilteredEvents(featuredEvents);
      }
    } catch (err) {
      console.error("Failed to load events from server:", err);
      // Fallback
      setEvents(featuredEvents);
      setFilteredEvents(featuredEvents);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let result = [...events];

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      result = result.filter(
        (evt) =>
          evt.title.toLowerCase().includes(keyword) ||
          evt.description.toLowerCase().includes(keyword)
      );
    }

    if (searchLocation.trim()) {
      const loc = searchLocation.toLowerCase();
      result = result.filter((evt) =>
        evt.location.toLowerCase().includes(loc)
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (evt) => evt.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredEvents(result);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory, events]);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory.toLowerCase() === category.toLowerCase()) {
      setSelectedCategory(""); // toggle off
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="font-body-md text-body-md antialiased overflow-x-hidden landing-page bg-surface text-on-surface">
      <Navbar activePage="explore" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 gradient-bg overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-10 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-secondary-fixed-dim/30">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-secondary">
                New: Interactive Seating Charts
              </span>
            </div>
            <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface max-w-xl">
              Gatherly: <br />
              <span className="text-primary">Humanizing</span> Events
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Effortless coordination for sophisticated hosts. Design, manage,
              and elevate your gatherings with our premium, minimalist platform
              built for connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <a
                href="/register"
                className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3.5 rounded-full hover:shadow-ambient-deep hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center active:scale-95 flex items-center justify-center cursor-pointer"
              >
                Start Planning
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById("events-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-transparent border border-secondary text-secondary font-label-md text-label-md px-8 py-3.5 rounded-full hover:bg-secondary-container/20 transition-all duration-300 w-full sm:w-auto text-center cursor-pointer"
              >
                Browse Events
              </button>
            </div>
          </div>
          <div className="relative z-10 w-full h-full min-h-[400px] rounded-3xl overflow-hidden card-ambient bg-surface">
            <img
              alt="Event gathering"
              className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkIjwvm38nrNhDWJ2EuORkxJ3iv224Y8dqNy03I6YfRR7Ga8hQUgoAwb_p5PiHYzQ709QsFPsikrm15wabx7DlAz-QQi2Ze5u-mh8NWxTHCDx0448RubdN8D3KWkzBYx1uzXaNXvflH5ltgZmlVBpmRwonSs5k2Xk7GEVwecka_k6oD4ew7Xr2aJXc8PAnwbOHcf-OUrJ50pxhdKFMqH1djX60y_98kL9WSHqhnjLS3rWGgAIO4_0M3A"
            />
            <div className="absolute top-8 right-8 glass-panel rounded-2xl p-4 shadow-ambient">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary-container">
                    check_circle
                  </span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface">
                    RSVP Confirmed
                  </p>
                  <p className="font-body-sm text-[10px] text-on-surface-variant">
                    Sarah Jenkins • 2 mins ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative blur blobs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-secondary-container/40 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-primary-fixed/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
      </section>

      {/* Dynamic Search & Categories Section */}
      <section className="relative z-20 -mt-8 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-24">
        <form
          onSubmit={handleSearch}
          className="glass-panel card-ambient rounded-3xl p-6 md:p-8 flex flex-col gap-6 bg-white/70"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="flex flex-col gap-2">
              <label htmlFor="search-keyword" className="font-label-sm text-label-sm text-on-surface-variant px-2">
                What are you looking for?
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input
                  id="search-keyword"
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary-container focus:bg-white transition-all font-body-md text-body-md"
                  placeholder="Event name or keyword"
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="search-location" className="font-label-sm text-label-sm text-on-surface-variant px-2">
                Where?
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  location_on
                </span>
                <input
                  id="search-location"
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary-container focus:bg-white transition-all font-body-md text-body-md"
                  placeholder="City or location"
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant px-2">
                Category Selected
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  category
                </span>
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-on-surface capitalize font-body-md text-body-md"
                  readOnly
                  value={selectedCategory || "All Categories"}
                  type="text"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary text-on-primary font-label-md text-label-md py-3 rounded-xl hover:bg-on-primary-container transition-colors w-full h-[48px] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">search</span> Search
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-outline-variant/20">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Popular:
            </span>
            {popularCategories.map((category, idx) => {
              const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-1.5 rounded-full font-label-sm text-label-sm transition-colors border cursor-pointer ${
                    isActive
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface-container hover:bg-secondary-container/50 text-secondary border-transparent hover:border-secondary-fixed-dim/30"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </form>
      </section>

      {/* Featured Events Section */}
      <section id="events-section" className="py-16 md:py-24 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
                Available Events
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {selectedCategory ? `Showing ${selectedCategory} events` : "Curated gatherings near you"}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-on-surface-variant">Finding matches...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
              <span className="material-symbols-outlined text-outline text-5xl mb-3">
                search_off
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                No Events Found
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Try clearing your search terms or selecting a different category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {filteredEvents.map((event) => (
                <EventCard key={event._id || event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
