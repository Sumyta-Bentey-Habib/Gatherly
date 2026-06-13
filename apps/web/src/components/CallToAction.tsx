export default function CallToAction() {
  return (
    <section className="py-20 bg-surface relative overflow-hidden animate-in fade-in duration-500">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="glass-panel rounded-3xl p-12 md:p-16 card-ambient bg-white/70 text-center space-y-6 max-w-4xl mx-auto gradient-bg">
          <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface max-w-2xl mx-auto">
            Ready to Host Your Next Masterpiece?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Join elite event planners who leverage Gatherly to make coordinating gatherings effortless and elegant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="/register"
              className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3.5 rounded-full hover:shadow-ambient-deep hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-center font-semibold"
            >
              Create Free Account
            </a>
            <a
              href="/login"
              className="bg-transparent border border-secondary text-secondary font-label-md text-label-md px-8 py-3.5 rounded-full hover:bg-secondary-container/20 transition-all duration-300 text-center font-semibold"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-secondary-container/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>
      <div className="absolute bottom-1/2 right-1/4 w-72 h-72 bg-primary-fixed/15 rounded-full blur-3xl -z-0 pointer-events-none"></div>
    </section>
  );
}
