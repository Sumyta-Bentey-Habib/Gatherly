import styles from "./components.module.css";
import { popularCategories } from "../app/data/dummyData";

export default function SearchSection() {
  return (
    <section className="relative z-20 -mt-8 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-24">
      <div className="glass-panel card-ambient rounded-3xl p-6 md:p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant px-2">
              What are you looking for?
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary-container focus:bg-white transition-all font-body-md text-body-md"
                placeholder="Event name or keyword"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant px-2">
              Where?
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                location_on
              </span>
              <input
                className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary-container focus:bg-white transition-all font-body-md text-body-md"
                placeholder="City or zip code"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant px-2">
              When?
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                calendar_today
              </span>
              <input
                className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary-container focus:bg-white transition-all font-body-md text-body-md"
                placeholder="Any date"
                type="text"
              />
            </div>
          </div>
          <button className="bg-primary text-on-primary font-label-md text-label-md py-3 rounded-xl hover:bg-on-primary-container transition-colors w-full h-[48px] flex items-center justify-center gap-2">
            <span className={`material-symbols-outlined ${styles.iconFilled}`}>
              search
            </span>{" "}
            Search
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-outline-variant/20">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Popular:
          </span>
          {popularCategories.map((category, idx) => (
            <button
              key={idx}
              className="px-4 py-1.5 rounded-full bg-surface-container hover:bg-secondary-container/50 text-secondary font-label-sm text-label-sm transition-colors border border-transparent hover:border-secondary-fixed-dim/30"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
