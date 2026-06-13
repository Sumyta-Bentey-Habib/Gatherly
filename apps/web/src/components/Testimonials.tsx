export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-surface-container-lowest animate-in fade-in duration-500">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <span className="material-symbols-outlined text-tertiary text-4xl mb-2">
            reviews
          </span>
          <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
            Loved by Elite Organizers
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Here is how Sophisticated Hosts use Gatherly to make their events unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Testimonial 1 */}
          <div className="glass-panel p-8 rounded-3xl card-ambient bg-white/70 flex flex-col justify-between min-h-[250px]">
            <p className="text-on-surface-variant italic leading-relaxed text-sm">
              "Gatherly transformed the way we host our Tech Leadership Summits. The dynamic itinerary and guest check-in dashboard saved us hours of back-and-forth emails. A truly premium experience."
            </p>
            <div className="flex items-center gap-3 pt-6 border-t border-outline-variant/30 mt-6">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80" alt="Sarah Jenkins" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-sm">Alexander Wright</h4>
                <p className="text-primary text-xs font-semibold">Director of Events, TechHub</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="glass-panel p-8 rounded-3xl card-ambient bg-white/70 flex flex-col justify-between min-h-[250px]">
            <p className="text-on-surface-variant italic leading-relaxed text-sm">
              "As a regular conference host, I appreciate the simplicity of the design systems. Gatherly makes RSVP coordination extremely intuitive. The loyalty points are a wonderful addition for regular guest loyalty!"
            </p>
            <div className="flex items-center gap-3 pt-6 border-t border-outline-variant/30 mt-6">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80" alt="Marcus Chen" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-sm">Clara Ross</h4>
                <p className="text-primary text-xs font-semibold">Founder, Design Circle</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="glass-panel p-8 rounded-3xl card-ambient bg-white/70 flex flex-col justify-between min-h-[250px]">
            <p className="text-on-surface-variant italic leading-relaxed text-sm">
              "The aesthetic quality of Gatherly events is unmatched. No other tool makes it so fast to draft a premium event listing with customizable inclusions and beautiful presets. Highly recommended!"
            </p>
            <div className="flex items-center gap-3 pt-6 border-t border-outline-variant/30 mt-6">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80" alt="Jane Miller" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-sm">Marcus Vance</h4>
                <p className="text-primary text-xs font-semibold">VP of Operations, Creative Collective</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
