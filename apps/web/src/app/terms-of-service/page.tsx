"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-body-md antialiased landing-page">
      <Navbar />

      <main className="flex-1 flex flex-col pt-32 pb-24 relative overflow-hidden gradient-bg">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10">
          <div className="max-w-3xl mx-auto mb-12">
            <span className="material-symbols-outlined text-primary text-4xl mb-2">
              gavel
            </span>
            <h1 className="font-display-lg text-headline-lg text-on-surface mb-4">
              Terms of Service
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Last updated: June 2026
            </p>
          </div>

          <div className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-3xl card-ambient bg-white/70 space-y-8">
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold">1. Acceptance of Terms</h2>
              <p className="text-on-surface-variant leading-relaxed">
                By accessing and using Gatherly, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>
            
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold">2. Provision of Services</h2>
              <p className="text-on-surface-variant leading-relaxed">
                Gatherly is constantly innovating in order to provide the best possible experience for its users. You acknowledge and agree that the form and nature of the services which Gatherly provides may change from time to time without prior notice to you.
              </p>
            </section>

            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold">3. User Conduct</h2>
              <p className="text-on-surface-variant leading-relaxed">
                You agree to use the services only for purposes that are permitted by (a) the Terms and (b) any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions.
              </p>
              <ul className="list-disc pl-6 mt-4 text-on-surface-variant space-y-2">
                <li>You must not use Gatherly for any illegal or unauthorized purpose.</li>
                <li>You must not modify, adapt or hack Gatherly or modify another website so as to falsely imply that it is associated with Gatherly.</li>
                <li>You agree not to reproduce, duplicate, copy, sell, trade, resell or exploit for any commercial purposes, any portion of the Gatherly service.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold">4. Limitation of Liability</h2>
              <p className="text-on-surface-variant leading-relaxed">
                You expressly understand and agree that Gatherly shall not be liable to you for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses resulting from the use or the inability to use the service.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
