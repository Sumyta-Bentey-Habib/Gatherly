"use client";

import { useState } from "react";
import styles from "./components.module.css";
import { useNavbarScroll } from "../app/hooks/useNavbarScroll";
import { useSession, signOut } from "../lib/auth-client";
import { useRouter } from "next/navigation";

interface NavbarProps {
  activePage?: "explore" | "features" | "about" | "contact" | "";
}

export default function Navbar({ activePage = "" }: NavbarProps) {
  const isScrolled = useNavbarScroll();
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-container-max z-50 rounded-full border border-outline-variant/30 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? "bg-white/85 shadow-ambient-deep py-1" : "bg-white/60 shadow-ambient py-2"
      }`}
      id="main-nav"
    >
      <div className="mx-auto px-6 flex justify-between items-center h-16">
        {/* Brand */}
        <a
          className="font-display-lg text-headline-md tracking-tight text-primary flex items-center gap-2 hover:scale-105 transition-all duration-300 pl-2"
          href="/"
        >
          <span className={`material-symbols-outlined text-primary ${styles.iconFilled}`}>
            eco
          </span>
          <span className="font-bold">Gatherly</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          <a
            className={`font-label-md text-label-md px-4 py-2 rounded-full transition-all duration-300 ${
              activePage === "explore"
                ? "bg-primary text-on-primary shadow-sm font-semibold"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container/50"
            }`}
            href="/"
          >
            Explore
          </a>
          <a
            className={`font-label-md text-label-md px-4 py-2 rounded-full transition-all duration-300 ${
              activePage === "features"
                ? "bg-primary text-on-primary shadow-sm font-semibold"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container/50"
            }`}
            href="/features"
          >
            Features
          </a>
          <a
            className={`font-label-md text-label-md px-4 py-2 rounded-full transition-all duration-300 ${
              activePage === "about"
                ? "bg-primary text-on-primary shadow-sm font-semibold"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container/50"
            }`}
            href="/about"
          >
            About
          </a>
          <a
            className={`font-label-md text-label-md px-4 py-2 rounded-full transition-all duration-300 ${
              activePage === "contact"
                ? "bg-primary text-on-primary shadow-sm font-semibold"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container/50"
            }`}
            href="/contact"
          >
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4 pr-2">
          {isPending ? (
            <div className="w-16 h-8 bg-surface-container-high rounded-full animate-pulse"></div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                Hi, {session.user.name.split(" ")[0]}
              </span>
              <a
                className="text-secondary font-label-md text-label-md hover:text-primary transition-all duration-300 px-4 py-2 hover:bg-surface-container/50 rounded-full"
                href={session.user.role === "admin" ? "/admin" : "/dashboard"}
              >
                Dashboard
              </a>
              {session.user.role === "admin" && (
                <a
                  className="bg-primary-container text-on-primary font-label-md text-label-md px-5 py-2.5 rounded-full hover:shadow-ambient hover:-translate-y-0.5 transition-all duration-300 active:scale-95 font-semibold"
                  href="/events/create"
                >
                  Create Event
                </a>
              )}
              <button
                onClick={handleSignOut}
                className="text-error font-label-md text-label-md hover:bg-error-container/10 transition-all duration-300 px-4 py-2 rounded-full cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <a
                className="text-secondary font-label-md text-label-md hover:text-primary transition-all duration-300 px-4 py-2 hover:bg-surface-container/50 rounded-full"
                href="/login"
              >
                Sign In
              </a>
              <a
                className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-full hover:shadow-ambient-deep hover:-translate-y-0.5 transition-all duration-300 active:scale-95 font-semibold"
                href="/register"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-on-surface p-2 hover:bg-surface-container/50 rounded-full transition-colors cursor-pointer mr-2"
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border border-outline-variant/30 rounded-3xl p-6 shadow-ambient-deep flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-2">
            <a
              className={`font-label-md text-label-md p-3 rounded-xl transition-all ${
                activePage === "explore" ? "bg-primary/10 text-primary font-bold" : "text-on-surface-variant"
              }`}
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Explore
            </a>
            <a
              className={`font-label-md text-label-md p-3 rounded-xl transition-all ${
                activePage === "features" ? "bg-primary/10 text-primary font-bold" : "text-on-surface-variant"
              }`}
              href="/features"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              className={`font-label-md text-label-md p-3 rounded-xl transition-all ${
                activePage === "about" ? "bg-primary/10 text-primary font-bold" : "text-on-surface-variant"
              }`}
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              className={`font-label-md text-label-md p-3 rounded-xl transition-all ${
                activePage === "contact" ? "bg-primary/10 text-primary font-bold" : "text-on-surface-variant"
              }`}
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
          
          <div className="border-t border-outline-variant/20 pt-4 flex flex-col gap-3">
            {isPending ? (
              <div className="h-10 bg-surface-container-high rounded-xl animate-pulse"></div>
            ) : session ? (
              <>
                <span className="font-label-md text-label-md text-on-surface-variant px-3">
                  Signed in as <strong>{session.user.name}</strong>
                </span>
                <a
                  className="bg-surface-container-low text-secondary font-label-md text-label-md p-3 rounded-xl text-center hover:bg-surface-container transition-colors"
                  href={session.user.role === "admin" ? "/admin" : "/dashboard"}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </a>
                {session.user.role === "admin" && (
                  <a
                    className="bg-primary-container text-on-primary font-label-md text-label-md p-3 rounded-xl text-center font-semibold"
                    href="/events/create"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Create Event
                  </a>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-error/10 text-error font-label-md text-label-md p-3 rounded-xl text-center hover:bg-error/20 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <a
                  className="bg-surface-container-low text-secondary font-label-md text-label-md p-3 rounded-xl text-center hover:bg-surface-container transition-colors"
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </a>
                <a
                  className="bg-primary text-on-primary font-label-md text-label-md p-3 rounded-xl text-center font-semibold"
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
