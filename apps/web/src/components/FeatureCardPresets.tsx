export default function FeatureCardPresets() {
  return (
    <div className="glass-panel p-8 rounded-3xl card-ambient bg-white/70 hover:shadow-ambient-deep hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[300px]">
      <div>
        <span className="material-symbols-outlined text-tertiary text-3xl mb-4">
          photo_library
        </span>
        <h3 className="font-headline-md text-xl text-on-surface mb-2 font-bold">
          Aesthetic Presets
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Design beautiful event cover layouts instantly. Choose from curated photography assets on Unsplash and set sophisticated color palettes.
        </p>
      </div>
      <div className="flex gap-2">
        <span className="w-5 h-5 rounded-full bg-primary-container"></span>
        <span className="w-5 h-5 rounded-full bg-secondary-container"></span>
        <span className="w-5 h-5 rounded-full bg-tertiary-container"></span>
      </div>
    </div>
  );
}
