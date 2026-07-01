import EventCard from "./EventCard";
import { EventItem } from "../app/hooks/useExploreEvents";

interface ExploreEventsProps {
  filteredEvents: EventItem[];
  loading: boolean;
  searchKeyword: string;
  setSearchKeyword: (val: string) => void;
  searchLocation: string;
  setSearchLocation: (val: string) => void;
  selectedCategory: string;
  popularCategories: string[];
  handleSearch: (e?: React.FormEvent) => void;
  handleCategoryClick: (category: string) => void;
  limit?: number;
}

export default function ExploreEvents({
  filteredEvents,
  loading,
  searchKeyword,
  setSearchKeyword,
  searchLocation,
  setSearchLocation,
  selectedCategory,
  popularCategories,
  handleSearch,
  handleCategoryClick,
  limit,
}: ExploreEventsProps) {
  const displayedEvents = limit ? filteredEvents.slice(0, limit) : filteredEvents;
  const showExploreMore = limit && filteredEvents.length > limit;

  return (
    <>
      {/* Dynamic Search & Categories Section */}
      <section className="relative z-20 -mt-8 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-24 animate-in fade-in duration-500">
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
              className="bg-primary text-on-primary font-label-md text-label-md py-3 rounded-xl hover:bg-on-primary-container transition-colors w-full h-[48px] flex items-center justify-center gap-2 cursor-pointer font-semibold"
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
      <section id="events-section" className="py-16 md:py-24 bg-surface animate-in fade-in duration-500">
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {displayedEvents.map((event) => (
                  <EventCard key={event._id || event.id} event={event} />
                ))}
              </div>
              {showExploreMore && (
                <div className="flex justify-center mt-12">
                  <a
                    href="/explore"
                    className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-label-md text-label-md shadow-lg hover:shadow-primary/30 hover:bg-on-primary-container transition-all duration-300 flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    Explore More
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
