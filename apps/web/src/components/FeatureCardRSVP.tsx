export default function FeatureCardRSVP() {
  return (
    <div className="glass-panel p-8 rounded-3xl card-ambient bg-white/70 hover:shadow-ambient-deep hover:-translate-y-1 transition-all duration-300 md:col-span-2 flex flex-col justify-between min-h-[300px]">
      <div>
        <span className="material-symbols-outlined text-primary text-3xl mb-4">
          notifications_active
        </span>
        <h3 className="font-headline-md text-2xl text-on-surface mb-2 font-bold">
          Real-time RSVP & Guest Coordination
        </h3>
        <p className="text-on-surface-variant leading-relaxed max-w-xl">
          Keep track of confirmations, ticket counts, and guest requirements instantly. Send automated updates and check-in guests seamlessly on the day of the event.
        </p>
      </div>
      <div className="flex items-center gap-3 pt-6 text-primary font-semibold">
        <span>Learn more about Guest CRM</span>
        <span className="material-symbols-outlined">arrow_forward</span>
      </div>
    </div>
  );
}
