export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-surface animate-in fade-in duration-500">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <span className="material-symbols-outlined text-secondary text-4xl mb-2">
            help_center
          </span>
          <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
            How It Works
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Plan and execute your event with Gatherly in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Step 1 */}
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-bold font-display-lg text-2xl">
              1
            </div>
            <h3 className="font-headline-md text-xl text-on-surface font-bold">
              Create Account
            </h3>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
              Sign up as a host or attendee. Get access to your personalized dashboard panel with points balances.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center text-secondary font-bold font-display-lg text-2xl">
              2
            </div>
            <h3 className="font-headline-md text-xl text-on-surface font-bold">
              List or Join Events
            </h3>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
              As admin, draft a premium event listing. As guest, explore curated listings and confirm tickets instantly.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-tertiary/10 border-2 border-tertiary flex items-center justify-center text-tertiary font-bold font-display-lg text-2xl">
              3
            </div>
            <h3 className="font-headline-md text-xl text-on-surface font-bold">
              Connect & Scale
            </h3>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
              Share updates, build relationships during live chat hours, and earn rewards points for engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
