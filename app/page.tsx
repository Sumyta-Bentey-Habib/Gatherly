"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchSection from "../components/SearchSection";
import EventCard from "../components/EventCard";
import { featuredEvents } from "./data/dummyData";

export default function Home() {
  return (
    <div className="font-body-md text-body-md antialiased overflow-x-hidden landing-page">
      {/* TopNavBar */}
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
              <button className="bg-tertiary-container text-on-tertiary font-label-md text-label-md px-8 py-3.5 rounded-full hover:shadow-ambient-deep hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center active:scale-95">
                Start Planning
              </button>
              <button className="bg-transparent border border-secondary text-secondary font-label-md text-label-md px-8 py-3.5 rounded-full hover:bg-secondary-container/20 transition-all duration-300 w-full sm:w-auto text-center">
                View Demo
              </button>
            </div>
          </div>
          <div className="relative z-10 w-full h-full min-h-[400px] rounded-3xl overflow-hidden card-ambient bg-surface">
            <img
              alt="Event gathering"
              className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkIjwvm38nrNhDWJ2EuORkxJ3iv224Y8dqNy03I6YfRR7Ga8hQUgoAwb_p5PiHYzQ709QsFPsikrm15wabx7DlAz-QQi2Ze5u-mh8NWxTHCDx0448RubdN8D3KWkzBYx1uzXaNXvflH5ltgZmlVBpmRwonSs5k2Xk7GEVwecka_k6oD4ew7Xr2aJXc8PAnwbOHcf-OUrJ50pxhdKFMqH1djX60y_98kL9WSHqhnjLS3rWGgAIO4_0M3A"
            />
            {/* Floating UI Elements */}
            <div className="absolute top-8 right-8 glass-panel rounded-2xl p-4 shadow-ambient animate-bounce">
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

      {/* Search & Categories Section */}
      <SearchSection />

      {/* Featured Events Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
                Featured Events
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Curated gatherings near you
              </p>
            </div>
            <a
              className="hidden md:flex items-center gap-1 text-primary font-label-md text-label-md hover:text-on-primary-container transition-colors"
              href="#"
            >
              View all{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <a
              className="inline-flex items-center gap-1 text-primary font-label-md text-label-md border border-primary/30 px-6 py-2 rounded-full"
              href="#"
            >
              View all events
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
