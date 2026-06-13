"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../lib/auth-client";
import { apiFetch } from "../../lib/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface Booking {
  _id: string;
  eventId: string;
  eventTitle?: string;
  date: string;
  guests: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

interface EventItem {
  _id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  imgUrl: string;
}

export default function UserDashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [wishlistEvents, setWishlistEvents] = useState<EventItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<"bookings" | "wishlist">("bookings");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const loadDashboardData = async () => {
    if (!session) return;
    try {
      setLoadingData(true);
      // Fetch bookings and wishlist (using our apiFetch utility)
      const bookingsData = await apiFetch("/api/bookings");
      setBookings(bookingsData);

      // Wishlist endpoint returns { eventIds: string[] }
      const wishlistRes = await apiFetch("/api/wishlist");
      const eventIds: string[] = wishlistRes.eventIds || [];

      if (eventIds.length > 0) {
        const allEvents: EventItem[] = await apiFetch("/api/events");
        const filtered = allEvents.filter((evt) => eventIds.includes(evt._id));
        setWishlistEvents(filtered);
      } else {
        setWishlistEvents([]);
      }
    } catch (err) {
      console.error("Error loading user dashboard data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (session) {
      loadDashboardData();
    }
  }, [session]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setActionLoading(bookingId);
    try {
      await apiFetch(`/api/bookings/${bookingId}`, { method: "DELETE" });
      // Reload bookings list
      const updated = await apiFetch("/api/bookings");
      setBookings(updated);
    } catch (err: any) {
      alert(err.message || "Failed to cancel booking");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemoveWishlist = async (eventId: string) => {
    setActionLoading(eventId);
    try {
      await apiFetch("/api/wishlist", {
        method: "DELETE",
        body: JSON.stringify({ eventId }),
      });
      setWishlistEvents((prev) => prev.filter((evt) => evt._id !== eventId));
    } catch (err: any) {
      alert(err.message || "Failed to remove from wishlist");
    } finally {
      setActionLoading(null);
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

      <main className="flex-1 pt-32 pb-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        {/* User Greeting & Stats Banner */}
        <section className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/30 ambient-shadow mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-container/15 px-3 py-1 rounded-full border border-primary-container/20 mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary">
                  User Account
                </span>
              </div>
              <h1 className="font-display-lg text-headline-lg text-on-surface">
                Welcome, {session.user.name}
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Manage your reservations, view points, and coordinate your upcoming events.
              </p>
            </div>
            
            {/* Stats Bento */}
            <div className="grid grid-cols-2 md:flex items-center gap-4">
              <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl px-6 py-4 min-w-[140px] text-center">
                <span className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Total Points
                </span>
                <span className="font-display-lg text-headline-lg text-primary font-bold">
                  {session.user.points || 0}
                </span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl px-6 py-4 min-w-[140px] text-center">
                <span className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Active Bookings
                </span>
                <span className="font-display-lg text-headline-lg text-secondary font-bold">
                  {bookings.filter((b) => b.status === "Pending" || b.status === "Confirmed").length}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter items-start">
          {/* Side Profile Card */}
          <div className="lg:col-span-1 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 ambient-shadow">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary mx-auto mb-4 border border-secondary/15">
                <span className="material-symbols-outlined text-4xl">person</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {session.user.name}
              </h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                {session.user.email}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-outline-variant/30">
              <div className="flex justify-between items-center text-label-md">
                <span className="text-on-surface-variant">Account ID</span>
                <span className="text-on-surface font-semibold max-w-[120px] truncate" title={session.user.id}>
                  {session.user.id}
                </span>
              </div>
              <div className="flex justify-between items-center text-label-md">
                <span className="text-on-surface-variant">Role</span>
                <span className="bg-surface-variant px-2 py-0.5 rounded text-xs font-semibold capitalize">
                  {session.user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Main Activity Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-outline-variant/30 pb-3">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`font-label-md text-label-md pb-2 px-1 transition-all relative cursor-pointer ${
                  activeTab === "bookings"
                    ? "text-primary font-bold border-b-2 border-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                My Bookings ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`font-label-md text-label-md pb-2 px-1 transition-all relative cursor-pointer ${
                  activeTab === "wishlist"
                    ? "text-primary font-bold border-b-2 border-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                Wishlist ({wishlistEvents.length})
              </button>
            </div>

            {/* Content Loading */}
            {loadingData ? (
              <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-on-surface-variant">Retrieving data...</p>
              </div>
            ) : activeTab === "bookings" ? (
              /* Bookings Tab */
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30">
                    <span className="material-symbols-outlined text-outline text-5xl mb-3">
                      confirmation_number
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                      No Bookings Found
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                      You haven't reserved tickets for any events yet.
                    </p>
                    <a
                      href="/"
                      className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md inline-block hover:shadow-sm"
                    >
                      Explore Events
                    </a>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 ambient-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                    >
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                          {booking.eventTitle || "Special Event"}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">calendar_today</span>
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">groups</span>
                            {booking.guests} Guest(s)
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            ${booking.totalAmount} Paid
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                        {/* Status Badge */}
                        <span
                          className={`px-3 py-1 rounded-full font-semibold text-xs border ${
                            booking.status === "Confirmed"
                              ? "bg-primary-container/10 border-primary-container/20 text-primary"
                              : booking.status === "Pending"
                              ? "bg-secondary-container/10 border-secondary-container/20 text-secondary"
                              : booking.status === "Completed"
                              ? "bg-surface-container-high border-outline-variant/30 text-on-surface-variant"
                              : "bg-error-container/10 border-error-container/20 text-error"
                          }`}
                        >
                          {booking.status}
                        </span>

                        {/* Actions */}
                        {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            disabled={actionLoading === booking._id}
                            className="text-error border border-error/30 hover:bg-error-container/10 font-label-sm text-label-sm px-4 py-2 rounded-full transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              /* Wishlist Tab */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {wishlistEvents.length === 0 ? (
                  <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30 col-span-2">
                    <span className="material-symbols-outlined text-outline text-5xl mb-3">
                      favorite_border
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                      Wishlist is Empty
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                      Add events to your wishlist to keep track of gatherings you'd love to join.
                    </p>
                    <a
                      href="/"
                      className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md inline-block hover:shadow-sm"
                    >
                      Browse Events
                    </a>
                  </div>
                ) : (
                  wishlistEvents.map((event) => (
                    <div
                      key={event._id}
                      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden ambient-shadow flex flex-col justify-between"
                    >
                      <div className="relative h-48 w-full bg-surface-container">
                        <img
                          src={event.imgUrl}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-secondary-fixed-dim/20">
                          <span className="font-label-sm text-label-sm text-secondary capitalize">
                            {event.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                            {event.title}
                          </h3>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">
                            {event.location}
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20 mt-4">
                          <span className="font-display-lg text-headline-md text-primary font-bold">
                            {event.price === 0 ? "Free" : `$${event.price}`}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleRemoveWishlist(event._id)}
                              disabled={actionLoading === event._id}
                              className="text-error hover:bg-error-container/10 p-2 rounded-full border border-error/20 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
                              title="Remove from Wishlist"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                            <a
                              href={`/events/${event._id}`}
                              className="bg-secondary text-on-secondary px-4 py-2 rounded-full font-label-sm text-label-sm hover:shadow-sm transition-all"
                            >
                              Details
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
