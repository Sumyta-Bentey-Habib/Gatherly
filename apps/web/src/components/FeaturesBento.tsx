import FeatureCardRSVP from "./FeatureCardRSVP";
import FeatureCardPoints from "./FeatureCardPoints";
import FeatureCardPresets from "./FeatureCardPresets";
import FeatureCardTimeline from "./FeatureCardTimeline";

export default function FeaturesBento() {
  return (
    <section className="py-20 md:py-28 bg-surface-container-lowest animate-in fade-in duration-500">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <span className="material-symbols-outlined text-primary text-4xl mb-2">
            insights
          </span>
          <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
            Designed for Extraordinary Hosts
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Gatherly provides sophisticated tools to plan, manage, and scale your social gatherings without the complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCardRSVP />
          <FeatureCardPoints />
          <FeatureCardPresets />
          <FeatureCardTimeline />
        </div>
      </div>
    </section>
  );
}
