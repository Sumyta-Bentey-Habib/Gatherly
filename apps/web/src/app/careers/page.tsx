"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-body-md antialiased landing-page">
      <Navbar />

      <main className="flex-1 flex flex-col pt-32 pb-24 relative overflow-hidden gradient-bg">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="material-symbols-outlined text-primary text-4xl mb-2">
              work
            </span>
            <h1 className="font-display-lg text-headline-lg text-on-surface mb-4">
              Join Our Team
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              We're on a mission to bring people together. Help us build the future of event coordination.
            </p>
          </div>

          <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-3xl card-ambient bg-white/70">
            <div className="text-center py-12 space-y-4">
              <span className="material-symbols-outlined text-5xl text-primary/50">
                search
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                No Open Positions
              </h2>
              <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
                We're currently not hiring, but we're always looking for talented individuals. Feel free to reach out to us at <a href="mailto:careers@gatherly.com" className="text-primary hover:underline">careers@gatherly.com</a>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
