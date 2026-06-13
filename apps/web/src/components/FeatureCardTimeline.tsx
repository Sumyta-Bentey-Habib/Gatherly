export default function FeatureCardTimeline() {
  return (
    <div className="glass-panel p-8 rounded-3xl card-ambient bg-white/70 hover:shadow-ambient-deep hover:-translate-y-1 transition-all duration-300 md:col-span-2 flex flex-col justify-between min-h-[300px]">
      <div>
        <span className="material-symbols-outlined text-primary text-3xl mb-4">
          splitscreen
        </span>
        <h3 className="font-headline-md text-2xl text-on-surface mb-2 font-bold">
          Dynamic Multi-day Timeline
        </h3>
        <p className="text-on-surface-variant leading-relaxed max-w-xl">
          Build elegant hour-by-hour agendas for complex networking summits, music festivals, or multi-day conventions. Let attendees follow changes live from their dashboard.
        </p>
      </div>
      <div className="flex items-center gap-3 pt-6 text-primary font-semibold">
        <span>See timeline demo</span>
        <span className="material-symbols-outlined">arrow_forward</span>
      </div>
    </div>
  );
}
