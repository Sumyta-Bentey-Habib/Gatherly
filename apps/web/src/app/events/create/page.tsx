"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../../lib/auth-client";
import { apiFetch } from "../../../lib/api";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function CreateEventPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Form States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [location, setLocation] = useState("");
  const [distanceNote, setDistanceNote] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  
  const [inclusions, setInclusions] = useState<string[]>(["Full access pass", "Food & drinks included"]);
  const [inclusionInput, setInclusionInput] = useState("");

  const [itinerary, setItinerary] = useState<{ day: number; title: string; description: string }[]>([
    { day: 1, title: "Opening and Keynotes", description: "Introduction, welcome address, and main presentations." },
  ]);
  const [itineraryTitle, setItineraryTitle] = useState("");
  const [itineraryDesc, setItineraryDesc] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Preset premium cover images
  const coverPresets = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", // Summit
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80", // Workshop
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", // Festival
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", // Cocktail/Gala
  ];

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/login");
      } else if (session.user.role !== "admin") {
        router.push("/dashboard");
      }
    }
  }, [session, isPending, router]);

  const handleAddInclusion = () => {
    if (inclusionInput.trim()) {
      setInclusions((prev) => [...prev, inclusionInput.trim()]);
      setInclusionInput("");
    }
  };

  const handleRemoveInclusion = (idx: number) => {
    setInclusions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddItinerary = () => {
    if (itineraryTitle.trim() && itineraryDesc.trim()) {
      setItinerary((prev) => [
        ...prev,
        {
          day: prev.length + 1,
          title: itineraryTitle.trim(),
          description: itineraryDesc.trim(),
        },
      ]);
      setItineraryTitle("");
      setItineraryDesc("");
    }
  };

  const handleRemoveItinerary = (idx: number) => {
    const filtered = itinerary.filter((_, i) => i !== idx);
    // Re-index days
    const reindexed = filtered.map((item, i) => ({
      ...item,
      day: i + 1,
    }));
    setItinerary(reindexed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!imgUrl) {
      // Pick random preset if empty
      setImgUrl(coverPresets[Math.floor(Math.random() * coverPresets.length)]);
    }

    try {
      await apiFetch("/api/events", {
        method: "POST",
        body: JSON.stringify({
          title,
          category,
          price: Number(price),
          startDate,
          endDate: startDate,
          location,
          distanceNote,
          imgUrl: imgUrl || coverPresets[0],
          description,
          inclusions,
          itinerary,
        }),
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-body-md antialiased landing-page">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-3xl mx-auto px-margin-mobile w-full">
        {/* Back Link */}
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center gap-1 text-on-surface-variant hover:text-primary mb-8 font-label-md text-label-md cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Admin
        </button>

        <div className="glass-panel p-8 md:p-10 rounded-3xl card-ambient bg-white/70">
          <div className="mb-8">
            <span className="material-symbols-outlined text-primary text-4xl mb-2">post_add</span>
            <h1 className="font-display-lg text-headline-lg text-on-surface mb-2">Create New Event</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Draft a premium event listing with pricing, locations, and schedules.
            </p>
          </div>

          {success ? (
            <div className="bg-primary-container/15 border border-primary-container/20 p-8 rounded-2xl text-center text-primary space-y-2">
              <span className="material-symbols-outlined text-5xl animate-bounce">check_circle</span>
              <h3 className="font-headline-md text-headline-md">Event Created Successfully!</h3>
              <p className="font-label-sm text-label-sm">Returning to the admin overview...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" id="create-event-form">
              {error && (
                <div className="bg-error-container text-on-error-container p-4 rounded-xl border border-error/20 text-sm">
                  {error}
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="evt-title" className="block font-label-md text-label-md text-on-surface mb-2">
                    Event Title
                  </label>
                  <input
                    id="evt-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g., Design Leadership Summit"
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="evt-category" className="block font-label-md text-label-md text-on-surface mb-2">
                    Category
                  </label>
                  <select
                    id="evt-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="Design">Design</option>
                    <option value="Networking">Networking</option>
                    <option value="Conference">Conference</option>
                    <option value="Music">Music</option>
                    <option value="Tech Summits">Tech Summits</option>
                  </select>
                </div>
              </div>

              {/* Price & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="evt-price" className="block font-label-md text-label-md text-on-surface mb-2">
                    Price per Ticket ($)
                  </label>
                  <input
                    id="evt-price"
                    type="number"
                    min={0}
                    required
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="evt-date" className="block font-label-md text-label-md text-on-surface mb-2">
                    Event Date
                  </label>
                  <input
                    id="evt-date"
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                  />
                </div>
              </div>

              {/* Location & Distance Note */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="evt-location" className="block font-label-md text-label-md text-on-surface mb-2">
                    Location / City
                  </label>
                  <input
                    id="evt-location"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="E.g., San Francisco, CA"
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="evt-distance" className="block font-label-md text-label-md text-on-surface mb-2">
                    Location Sub-Note (Optional)
                  </label>
                  <input
                    id="evt-distance"
                    type="text"
                    value={distanceNote}
                    onChange={(e) => setDistanceNote(e.target.value)}
                    placeholder="E.g., 2.5 km from City Center"
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Cover Image Selector */}
              <div>
                <label htmlFor="evt-image" className="block font-label-md text-label-md text-on-surface mb-2">
                  Cover Image URL (or click to select preset below)
                </label>
                <input
                  id="evt-image"
                  type="url"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary mb-3"
                />
                <div className="flex gap-3 overflow-x-auto py-1">
                  {coverPresets.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setImgUrl(preset)}
                      className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer ${
                        imgUrl === preset ? "border-primary scale-95 shadow-sm" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={preset} className="w-full h-full object-cover" alt={`Preset ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="evt-description" className="block font-label-md text-label-md text-on-surface mb-2">
                  About / Description
                </label>
                <textarea
                  id="evt-description"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a compelling overview of your event..."
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary font-body-md text-body-md"
                />
              </div>

              {/* Inclusions */}
              <div className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 space-y-4">
                <label className="block font-headline-md text-headline-md text-on-surface">
                  What's Included
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inclusionInput}
                    onChange={(e) => setInclusionInput(e.target.value)}
                    placeholder="E.g., Welcome Cocktail Hour"
                    className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2 text-on-surface focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddInclusion}
                    className="bg-secondary text-on-secondary px-4 py-2 rounded-xl font-label-md text-label-md hover:bg-secondary/90 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {inclusions.map((inclusion, idx) => (
                    <li key={idx} className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 border border-outline-variant/20">
                      {inclusion}
                      <button
                        type="button"
                        onClick={() => handleRemoveInclusion(idx)}
                        className="text-error hover:text-error-container font-bold text-[10px]"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary */}
              <div className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 space-y-4">
                <label className="block font-headline-md text-headline-md text-on-surface">
                  Timeline / Itinerary
                </label>
                <div className="space-y-3 p-4 bg-surface-container-low/30 rounded-xl border border-outline-variant/20">
                  <input
                    type="text"
                    value={itineraryTitle}
                    onChange={(e) => setItineraryTitle(e.target.value)}
                    placeholder="Timeline item title (e.g., Executive Keynotes)"
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2 text-on-surface focus:outline-none"
                  />
                  <textarea
                    value={itineraryDesc}
                    onChange={(e) => setItineraryDesc(e.target.value)}
                    placeholder="Short description of activities during this block..."
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2 text-on-surface focus:outline-none"
                    rows={2}
                  />
                  <button
                    type="button"
                    onClick={handleAddItinerary}
                    className="bg-secondary text-on-secondary px-4 py-2 rounded-xl font-label-md text-label-md hover:bg-secondary/90 cursor-pointer w-full text-center"
                  >
                    + Add Timeline Block
                  </button>
                </div>
                <div className="space-y-2 mt-4">
                  {itinerary.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 gap-4">
                      <div>
                        <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded font-bold">Day {item.day}</span>
                        <h4 className="font-semibold text-on-surface mt-1">{item.title}</h4>
                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{item.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItinerary(idx)}
                        className="text-error border border-error/20 hover:bg-error/10 p-1.5 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-full hover:shadow-ambient hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Publishing Event...
                  </>
                ) : (
                  "Publish Event Listing"
                )}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
