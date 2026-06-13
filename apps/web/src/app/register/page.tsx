"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../../lib/auth-client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await signUp.email({
        email,
        password,
        name,
        // Since we changed role schema to input: true on the backend,
        // we can pass custom fields like role directly to signUp.email:
        // @ts-ignore
        role,
      });

      if (response.error) {
        setError(response.error.message || "Failed to create account");
      } else {
        router.refresh();
        if (role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-body-md antialiased landing-page">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-24 relative overflow-hidden gradient-bg">
        {/* Decorative blur blobs */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-fixed/30 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="w-full max-w-md px-margin-mobile relative z-10">
          <div className="glass-panel p-8 rounded-3xl card-ambient bg-white/70">
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-primary text-4xl mb-2">
                person_add
              </span>
              <h1 className="font-display-lg text-headline-lg text-on-surface mb-2">
                Get Started
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Create a Gatherly account to plan or book events.
              </p>
            </div>

            {error && (
              <div
                className="bg-error-container text-on-error-container p-4 rounded-xl border border-error/20 mb-6 flex items-start gap-3"
                role="alert"
                id="register-error-alert"
              >
                <span className="material-symbols-outlined text-error mt-0.5">
                  error
                </span>
                <span className="font-label-sm text-label-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5" id="register-form">
              <div>
                <label
                  htmlFor="register-name"
                  className="block font-label-md text-label-md text-on-surface mb-2"
                >
                  Full Name
                </label>
                <input
                  id="register-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface"
                />
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="block font-label-md text-label-md text-on-surface mb-2"
                >
                  Email Address
                </label>
                <input
                  id="register-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface"
                />
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="block font-label-md text-label-md text-on-surface mb-2"
                >
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface"
                />
              </div>

              <div>
                <label
                  htmlFor="register-role"
                  className="block font-label-md text-label-md text-on-surface mb-2"
                >
                  Choose Your Account Type
                </label>
                <select
                  id="register-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface cursor-pointer"
                >
                  <option value="user">User (Book and attend events)</option>
                  <option value="admin">Admin (Organize and manage events)</option>
                </select>
              </div>

              <button
                id="register-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary font-label-md text-label-md py-3.5 rounded-full hover:shadow-ambient hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
              <p className="font-body-md text-label-md text-on-surface-variant">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-primary hover:text-on-primary-container font-semibold transition-colors"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
