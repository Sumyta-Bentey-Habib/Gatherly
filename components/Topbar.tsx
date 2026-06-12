import styles from "./components.module.css";

export default function Topbar() {
  return (
    <header className="h-20 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 flex items-center justify-between px-gutter sticky top-0 z-40 md:justify-end">
      {/* Mobile Brand */}
      <div className="md:hidden flex items-center">
        <span className="material-symbols-outlined mr-4 text-on-surface">
          menu
        </span>
        <span className="font-display-lg text-headline-md tracking-tight text-primary">
          Gatherly
        </span>
      </div>
      {/* Global Actions */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-tertiary-container border-2 border-surface-container-low"></span>
        </button>
        <button className="bg-primary-container text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary hover:shadow-sm transition-all duration-200 flex items-center gap-2">
          <span className={`material-symbols-outlined ${styles.iconSize18}`}>
            add
          </span>
          Create Event
        </button>
      </div>
    </header>
  );
}
