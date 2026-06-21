"use client";

import { useRegister } from "../hooks/useRegister";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleRegister,
  } = useRegister();

  const router = useRouter();

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center font-body-md text-body-md antialiased overflow-hidden">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/50 backdrop-blur-sm" />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all flex items-center justify-center border border-white/10 text-white cursor-pointer group"
      >
        <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">
          arrow_back
        </span>
      </motion.button>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md px-margin-mobile relative z-10"
      >
        <div className="bg-surface/90 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">

          <div className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4"
            >
              <span className="material-symbols-outlined text-primary text-3xl">
                person_add
              </span>
            </motion.div>
            <h1 className="font-display-lg text-headline-lg text-on-surface mb-2">
              Get Started
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Create a Gatherly account to plan or book events.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-error-container text-on-error-container p-4 rounded-xl border border-error/20 mb-6 flex items-start gap-3 relative z-10"
              role="alert"
              id="register-error-alert"
            >
              <span className="material-symbols-outlined text-error mt-0.5">
                error
              </span>
              <span className="font-label-sm text-label-sm">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-5 relative z-10" id="register-form">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
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
                placeholder="Enter your name"
                className="w-full bg-surface-container-lowest/50 border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface backdrop-blur-sm"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
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
                className="w-full bg-surface-container-lowest/50 border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface backdrop-blur-sm"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
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
                className="w-full bg-surface-container-lowest/50 border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface backdrop-blur-sm"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="register-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-label-md text-label-md py-3.5 rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer mt-4"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-6 border-t border-outline-variant/30 text-center relative z-10"
          >
            <p className="font-body-md text-label-md text-on-surface-variant">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
