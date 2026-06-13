"use client";

import styles from "./components.module.css";
import { useSession } from "../lib/auth-client";
import { useRouter } from "next/navigation";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="h-20 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 flex items-center justify-between px-6 sticky top-0 z-40 md:justify-end">
      {/* Mobile Brand */}
      <div className="md:hidden flex items-center">
        <button
          onClick={onMenuClick}
          className="material-symbols-outlined mr-4 text-on-surface hover:text-primary cursor-pointer p-1 rounded-full hover:bg-surface-container-low transition-colors"
        >
          menu
        </button>
        <span className="font-display-lg text-headline-md tracking-tight text-primary flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary-container text-2xl">eco</span>
          Gatherly
        </span>
      </div>
      
      {/* Global Actions */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors relative cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-tertiary-container border-2 border-surface-container-low"></span>
        </button>
        
        {session?.user?.role === "admin" ? (
          <button
            onClick={() => router.push("/events/create")}
            className="bg-primary-container text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary hover:shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Create Event
          </button>
        ) : (
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary-container hover:shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">explore</span>
            Explore Events
          </button>
        )}
      </div>
    </header>
  );
}
