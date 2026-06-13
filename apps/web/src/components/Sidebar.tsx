import styles from "./components.module.css";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/30 hidden md:flex flex-col h-screen sticky top-0">
      <div className="h-20 flex items-center px-gutter border-b border-outline-variant/30">
        <span className="font-display-lg text-headline-md tracking-tight text-primary">
          Gatherly
        </span>
      </div>
      <nav className="flex-1 py-stack-md px-base overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md transition-colors"
              href="#"
            >
              <span className={`material-symbols-outlined ${styles.iconFilled}`}>
                dashboard
              </span>
              Dashboard
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">event</span>
              Events
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">group</span>
              Users
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">monitoring</span>
              Analytics
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-label-md text-label-md"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
              Settings
            </a>
          </li>
        </ul>
      </nav>
      <div className="p-gutter border-t border-outline-variant/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden">
            <img
              alt="Admin Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg2Sv2DNhMmgwgkfFYks_GRzoMLeZ6XJYePrP3UNcXUH5XDB-Km-FMcx-KMOu_3-x0mw_HKXxhUsTtlxqLgqE2vezXlqUxz166vDkePGTCogBanc_VYaqjQu1ZCsSVJ6Q6EW-AyfpBuxGGkg08CYZxNl5hY4hgpMgqCgSw0nsx8RwalDAvOtXANXY93-hUGr2-Bp6xNKHCXTD_2RDBOqpMeLzm5c-O-S0hQ5cth_K-qQq6MusROJur7w"
            />
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface">
              Admin User
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              System Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
