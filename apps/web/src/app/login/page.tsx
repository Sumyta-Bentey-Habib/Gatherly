"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../../lib/auth-client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await signIn.email({
        email,
        password,
      });

      if (response.error) {
        setError(response.error.message || "Invalid email or password");
      } else {
        // Force refresh router to let Navbar see the new session
        router.refresh();
        // The middleware or client router redirect will handle routing.
        // Let's explicitly redirect to dashboard or admin dashboard
        // We will fetch session info or simply route them to dashboard.
        // For convenience, we can route to /dashboard and let it check.
        // Better: we can check the returned response or just wait,
        // but since response redirects by default or returns user details:
        const user = response.data?.user;
        if (user?.role === "admin") {
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
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-fixed/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-container/30 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="w-full max-w-md px-margin-mobile relative z-10">
          <div className="glass-panel p-8 rounded-3xl card-ambient bg-white/70">
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-primary text-4xl mb-2">
                lock_open
              </span>
              <h1 className="font-display-lg text-headline-lg text-on-surface mb-2">
                Welcome Back
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Sign in to manage and join events.
              </p>
            </div>

            {error && (
              <div
                className="bg-error-container text-on-error-container p-4 rounded-xl border border-error/20 mb-6 flex items-start gap-3"
                role="alert"
                id="login-error-alert"
              >
                <span className="material-symbols-outlined text-error mt-0.5">
                  error
                </span>
                <span className="font-label-sm text-label-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5" id="login-form">
              <div>
                <label
                  htmlFor="login-email"
                  className="block font-label-md text-label-md text-on-surface mb-2"
                >
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="login-password"
                    className="block font-label-md text-label-md text-on-surface"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface"
                />
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary font-label-md text-label-md py-3.5 rounded-full hover:shadow-ambient hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
              <p className="font-body-md text-label-md text-on-surface-variant">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-primary hover:text-on-primary-container font-semibold transition-colors"
                >
                  Create one now
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
