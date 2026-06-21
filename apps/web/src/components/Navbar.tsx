"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/app/hooks/useAuth";

const navLinks = [
  { name: "Explore", href: "/explore" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 transition-all duration-500 rounded-full px-8 py-3 flex justify-between items-center bg-black/75 backdrop-blur-xl border border-white/10 ${
          scrolled ? "scale-[0.99] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]" : "scale-100 shadow-xl"
        }`}
      >
        <Link href="/" className="font-serif text-2xl font-bold text-white tracking-tight">
          Gatherly
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-xs font-semibold uppercase tracking-widest pb-0.5 transition-all duration-300 hover:text-white hover:scale-105 border-b ${
                  isActive ? "text-white border-white" : "text-white/60 border-transparent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                className="hidden md:inline-block font-sans text-xs font-bold uppercase tracking-widest bg-white text-black px-5 py-2.5 rounded-full hover:scale-105 hover:bg-zinc-200 transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:inline-block font-sans text-xs font-bold uppercase tracking-widest bg-transparent text-white border border-white/40 px-5 py-2.5 rounded-full hover:scale-105 hover:bg-white/10 hover:border-white transition-all cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-block font-sans text-xs font-bold uppercase tracking-widest bg-white text-black px-5 py-2.5 rounded-full hover:scale-105 hover:bg-zinc-200 transition-all"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full border border-white/20 bg-transparent text-white flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div
        className={`md:hidden fixed top-20 right-4 w-64 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 p-6 z-45 transition-all duration-300 shadow-2xl ${
          mobileMenuOpen ? "translate-y-0 scale-100 opacity-100 pointer-events-auto" : "-translate-y-4 scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-sans text-sm uppercase tracking-widest pb-1 border-b transition-all duration-300 hover:text-white ${
                  isActive ? "font-bold text-white border-white" : "font-medium text-white/60 border-transparent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {user ? (
            <>
              <Link
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-sans text-sm uppercase tracking-widest pb-1 border-b transition-all duration-300 hover:text-white ${
                  pathname === "/dashboard" || pathname === "/admin" ? "font-bold text-white border-white" : "font-medium text-white/60 border-transparent"
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="font-sans text-sm font-medium uppercase tracking-widest pb-1 border-none bg-transparent text-left cursor-pointer text-white/60 hover:text-white transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-sans text-sm uppercase tracking-widest pb-1 border-b transition-all duration-300 hover:text-white ${
                pathname === "/login" ? "font-bold text-white border-white" : "font-medium text-white/60 border-transparent"
              }`}
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Bottom Mobile Navigation */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-black/90 border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] z-50 flex justify-between items-center px-5 py-2.5 rounded-full select-none">
        {[
          { href: "/", icon: "home", label: "Home" },
          { href: "/explore", icon: "explore", label: "Explore" },
          { href: "/dashboard?tab=wishlist", icon: "favorite", label: "Saved" },
          { href: user?.role === "admin" ? "/admin" : "/dashboard", icon: "person", label: "Profile" },
        ].map(({ href, icon, label }) => {
          const isActive = pathname === href || (href.includes("dashboard") && pathname === "/dashboard");
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 ${
                isActive ? "text-white bg-white/10" : "text-white/60 bg-transparent"
              }`}
            >
              <span className="material-symbols-outlined text-base">{icon}</span>
              <span className="font-sans text-[9px] font-medium mt-0.5">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
