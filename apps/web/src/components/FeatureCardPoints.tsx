export default function FeatureCardPoints() {
  return (
    <div className="glass-panel p-8 rounded-3xl card-ambient bg-white/70 hover:shadow-ambient-deep hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[300px]">
      <div>
        <span className="material-symbols-outlined text-secondary text-3xl mb-4">
          workspace_premium
        </span>
        <h3 className="font-headline-md text-xl text-on-surface mb-2 font-bold">
          Loyalty Points
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Earn points dynamically as you book tickets or host gatherings. Redeem rewards for custom venue discounts and luxury partner benefits.
        </p>
      </div>
      <div className="bg-secondary-container/30 px-3 py-1.5 rounded-full border border-secondary-fixed-dim/20 text-xs font-semibold text-secondary w-fit">
        Points Program Active
      </div>
    </div>
  );
}
