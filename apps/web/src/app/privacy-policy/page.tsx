"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-body-md antialiased landing-page">
      <Navbar />

      <main className="flex-1 flex flex-col pt-32 pb-24 relative overflow-hidden gradient-bg">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10">
          <div className="max-w-3xl mx-auto mb-12">
            <span className="material-symbols-outlined text-primary text-4xl mb-2">
              policy
            </span>
            <h1 className="font-display-lg text-headline-lg text-on-surface mb-4">
              Privacy Policy
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Last updated: June 2026
            </p>
          </div>

          <div className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-3xl card-ambient bg-white/70 space-y-8">
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold">1. Introduction</h2>
              <p className="text-on-surface-variant leading-relaxed">
                Welcome to Gatherly. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>
            
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold">2. Data We Collect</h2>
              <p className="text-on-surface-variant leading-relaxed">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mt-4 text-on-surface-variant space-y-2">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold">3. How We Use Your Data</h2>
              <p className="text-on-surface-variant leading-relaxed">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-4 text-on-surface-variant space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold">4. Contact Us</h2>
              <p className="text-on-surface-variant leading-relaxed">
                If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:privacy@gatherly.com" className="text-primary hover:underline">privacy@gatherly.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
