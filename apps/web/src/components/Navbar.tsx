"use client";

import styles from "./components.module.css";
import { useNavbarScroll } from "../app/hooks/useNavbarScroll";

interface NavbarProps {
  activePage?: "explore" | "features" | "about" | "contact" | "";
}

export default function Navbar({ activePage = "" }: NavbarProps) {
  const isScrolled = useNavbarScroll();

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-surface/70 dark:bg-inverse-surface/70 backdrop-blur-xl border-b border-outline-variant/30 transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
      id="main-nav"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
        {/* Brand */}
        <a
          className="font-display-lg text-headline-md tracking-tight text-primary flex items-center gap-2 hover:opacity-90 transition-all duration-200"
          href="/"
        >
          <span className={`material-symbols-outlined text-primary-container ${styles.iconFilled}`}>
            eco
          </span>
          Gatherly
        </a>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            className={`font-label-md text-label-md transition-colors ${
              activePage === "explore"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary"
            }`}
            href="/"
          >
            Explore
          </a>
          <a
            className={`font-label-md text-label-md transition-colors ${
              activePage === "features"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary"
            }`}
            href="#"
          >
            Features
          </a>
          <a
            className={`font-label-md text-label-md transition-colors ${
              activePage === "about"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary"
            }`}
            href="/about"
          >
            About
          </a>
          <a
            className={`font-label-md text-label-md transition-colors ${
              activePage === "contact"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary"
            }`}
            href="#"
          >
            Contact
          </a>
        </nav>
        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            className="text-secondary font-label-md text-label-md hover:text-primary transition-colors px-4 py-2"
            href="#"
          >
            Sign In
          </a>
          <a
            className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-full hover:shadow-ambient hover:-translate-y-0.5 transition-all active:scale-95"
            href="#"
          >
            Create Event
          </a>
        </div>
        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-on-surface p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}
