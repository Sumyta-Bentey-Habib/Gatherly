"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../../lib/auth-client";
import { apiFetch } from "../../../lib/api";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

interface EventItem {
  _id: string;
  title: string;
  category: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  location: string;
  price: number;
  imgUrl?: string;
  imageUrl?: string;
  description: string;
  distanceNote?: string;
  rating?: string | number;
  reviews?: string | number;
  inclusions?: string[];
  itinerary?: ItineraryItem[];
}

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const router = useRouter();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`/api/events/${id}`);
      setEvent(data);

      // Check if user has this event wishlisted
      if (session && session.user.role === "user") {
        const wishlistRes = await apiFetch("/api/wishlist");
        const eventIds: string[] = wishlistRes.eventIds || [];
        setIsWishlisted(eventIds.includes(id));
      }
    } catch (err) {
      console.error("Error loading event:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvent();
  }, [id, session]);

  const handleWishlistToggle = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    if (session.user.role === "admin") {
      alert("Admins cannot use the wishlist feature");
      return;
    }

    setWishlistLoading(true);
    try {
      if (isWishlisted) {
        await apiFetch("/api/wishlist", {
          method: "DELETE",
          body: JSON.stringify({ eventId: id }),
        });
        setIsWishlisted(false);
      } else {
        await apiFetch("/api/wishlist", {
          method: "POST",
          body: JSON.stringify({ eventId: id }),
        });
        setIsWishlisted(true);
      }
    } catch (err: any) {
      alert(err.message || "Failed to update wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }
    if (session.user.role === "admin") {
      setBookingError("Admins cannot book events.");
      return;
    }
    if (!event) return;

    setBookingLoading(true);
    setBookingError("");

    try {
      const totalAmount = event.price * guests;
      const formattedDate = event.startDate
        ? new Date(event.startDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : event.date || "Upcoming Event";

      await apiFetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          eventId: id,
          eventTitle: event.title,
          date: formattedDate,
          guests,
          totalAmount,
        }),
      });

      setBookingSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: any) {
      setBookingError(err.message || "Failed to complete booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-24">
          <span className="material-symbols-outlined text-outline text-6xl mb-4">error</span>
          <h1 className="font-display-lg text-headline-lg text-on-surface mb-2">Event Not Found</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            The event listing you are looking for does not exist or has been deleted.
          </p>
          <a href="/" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md">
            Go to Explore
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  const image = event.imgUrl || event.imageUrl || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4";
  
  const formattedDate = event.startDate
    ? new Date(event.startDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : event.date || "Upcoming Event";

  const cleanItinerary = event.itinerary || [
    {
      day: 1,
      title: "Introduction and Kickoff",
      description: "Welcome address, opening keynotes, and initial networking sessions.",
    },
  ];

  const cleanInclusions = event.inclusions || [
    "Full access pass to the venue",
    "Food and beverages during the event hours",
    "Attendee gift box and certificate of participation",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-body-md antialiased landing-page">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        {/* Breadcrumb / Back Navigation */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-on-surface-variant hover:text-primary mb-8 font-label-md text-label-md cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back
        </button>

        {/* Hero details container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Header info */}
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary-container/15 px-3 py-1 rounded-full border border-secondary-fixed-dim/20 mb-3 text-secondary capitalize font-label-sm text-label-sm">
                {event.category}
              </div>
              <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-label-md text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {event.location} {event.distanceNote && `(${event.distanceNote})`}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">star</span>
                  {event.rating || "9.5"} ({event.reviews || "24"} reviews)
                </span>
              </div>
            </div>

            {/* Banner Image */}
            <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden card-ambient bg-surface-container">
              <img
                src={image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <section className="space-y-4">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                About the Event
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {event.description}
              </p>
            </section>

            {/* Inclusions */}
            <section className="space-y-6">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                What's Included
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cleanInclusions.map((inclusion, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                    <span className="text-on-surface-variant">{inclusion}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section className="space-y-8">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Event Itinerary
              </h2>
              <div className="relative border-l-2 border-primary-container/20 pl-8 ml-4 space-y-8">
                {cleanItinerary.map((day, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle icon */}
                    <span className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-[10px] text-on-primary font-bold border-2 border-surface">
                      {day.day}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                      Day {day.day}: {day.title}
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed">
                      {day.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Ticket Purchase Column */}
          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <div className="glass-panel p-8 rounded-3xl card-ambient bg-white/70 space-y-6">
              
              {/* Price Row */}
              <div className="flex justify-between items-end pb-6 border-b border-outline-variant/30">
                <div>
                  <span className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Price per guest</span>
                  <span className="font-display-lg text-display-lg text-primary font-bold">
                    {event.price === 0 ? "Free" : `$${event.price}`}
                  </span>
                </div>
                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  disabled={wishlistLoading}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                    isWishlisted
                      ? "bg-tertiary-container/20 border-tertiary text-tertiary"
                      : "bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:text-tertiary"
                  }`}
                  title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <span className={`material-symbols-outlined ${isWishlisted ? "fill-1" : ""}`}>
                    favorite
                  </span>
                </button>
              </div>

              {/* Event details mini bento */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
                  <div>
                    <span className="block font-label-sm text-label-sm text-on-surface-variant">Date</span>
                    <span className="font-label-md text-label-md text-on-surface">{formattedDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">schedule</span>
                  <div>
                    <span className="block font-label-sm text-label-sm text-on-surface-variant">Duration</span>
                    <span className="font-label-md text-label-md text-on-surface">1 Day</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">pin_drop</span>
                  <div>
                    <span className="block font-label-sm text-label-sm text-on-surface-variant">Location</span>
                    <span className="font-label-md text-label-md text-on-surface">{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              {bookingSuccess ? (
                <div className="bg-primary-container/15 border border-primary-container/20 p-6 rounded-2xl text-center text-primary space-y-2">
                  <span className="material-symbols-outlined text-4xl animate-bounce">check_circle</span>
                  <h3 className="font-headline-md text-headline-md">Booking Successful!</h3>
                  <p className="font-label-sm text-label-sm">Redirecting to your dashboard...</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="pt-4 space-y-4 border-t border-outline-variant/20">
                  {bookingError && (
                    <div className="bg-error-container text-on-error-container p-3 rounded-xl border border-error/20 text-xs">
                      {bookingError}
                    </div>
                  )}

                  {event.price > 0 && (
                    <div>
                      <label htmlFor="booking-guests" className="block font-label-md text-label-md text-on-surface mb-2">
                        Number of Guests
                      </label>
                      <input
                        id="booking-guests"
                        type="number"
                        min={1}
                        max={10}
                        required
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                        className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                  )}

                  {event.price > 0 && (
                    <div className="flex justify-between items-center py-2 font-semibold">
                      <span className="text-on-surface-variant">Total Amount</span>
                      <span className="text-primary text-headline-md">${event.price * guests}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-full hover:shadow-ambient hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {bookingLoading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Completing Booking...
                      </>
                    ) : session ? (
                      session.user.role === "admin" ? (
                        "Admins Cannot Book"
                      ) : (
                        "Book Tickets"
                      )
                    ) : (
                      "Sign In to Book"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
