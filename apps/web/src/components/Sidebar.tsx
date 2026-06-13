"use client";

import styles from "./components.module.css";
import { useSession, signOut } from "../lib/auth-client";
import { useRouter } from "next/navigation";

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: any) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  activeSection = "overview",
  onSectionChange,
  isOpenMobile = false,
  onCloseMobile,
}: SidebarProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const role = session?.user?.role || "user";

  const navItems =
    role === "admin"
      ? ([
          { id: "overview", label: "Overview", icon: "dashboard" },
          { id: "events", label: "Events", icon: "event" },
          { id: "users", label: "Users", icon: "group" },
          { id: "bookings", label: "Bookings", icon: "confirmation_number" },
        ] as const)
      : ([
          { id: "overview", label: "Overview", icon: "dashboard" },
          { id: "bookings", label: "My Bookings", icon: "confirmation_number" },
          { id: "wishlist", label: "Wishlist", icon: "favorite" },
          { id: "profile", label: "Profile", icon: "person" },
        ] as const);

  const renderNavContent = () => (
    <>
      <div className="h-20 flex items-center px-6 border-b border-outline-variant/30 justify-between">
        <span className="font-display-lg text-headline-md tracking-tight text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container">eco</span>
          Gatherly
        </span>
        {isOpenMobile && onCloseMobile && (
          <button onClick={onCloseMobile} className="md:hidden text-on-surface-variant hover:text-primary cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>
      <nav className="flex-1 py-6 px-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onSectionChange?.(item.id);
                    onCloseMobile?.();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-label-md text-label-md transition-colors text-left cursor-pointer ${
                    isActive
                      ? "bg-primary-container text-on-primary font-semibold"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                  }`}
                >
                  <span className={`material-symbols-outlined ${isActive ? styles.iconFilled : ""}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-6 border-t border-outline-variant/30 space-y-4">
        {session && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary border border-secondary/15">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-label-md text-label-md text-on-surface truncate">
                {session.user.name}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant capitalize">
                {session.user.role}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="w-full text-center text-error border border-error/20 hover:bg-error-container/10 py-2 rounded-full font-label-sm text-label-sm transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/30 hidden md:flex flex-col h-screen sticky top-0">
        {renderNavContent()}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={onCloseMobile}
          />
          {/* Drawer content */}
          <aside className="relative w-64 max-w-[280px] bg-surface-container-lowest h-full flex flex-col shadow-2xl transition-transform duration-300 ease-out z-10">
            {renderNavContent()}
          </aside>
        </div>
      )}
    </>
  );
}
