"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../lib/auth-client";
import { apiFetch } from "../../lib/api";

export interface Booking {
  _id: string;
  eventId: string;
  eventTitle?: string;
  date: string;
  guests: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface EventItem {
  _id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  imgUrl: string;
}

export function useDashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<"overview" | "bookings" | "wishlist" | "profile">("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [wishlistEvents, setWishlistEvents] = useState<EventItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [bookingFilter, setBookingFilter] = useState<"All" | "Pending" | "Confirmed" | "Completed" | "Cancelled">("All");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const tab = searchParams.get("tab") || searchParams.get("section");
      if (
        tab === "overview" ||
        tab === "bookings" ||
        tab === "wishlist" ||
        tab === "profile"
      ) {
        setActiveSection(tab);
      }
    }
  }, []);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const loadDashboardData = async () => {
    if (!session) return;
    try {
      setLoadingData(true);
      
      const [bookingsData, wishlistRes] = await Promise.all([
        apiFetch("/api/bookings").catch(() => []),
        apiFetch("/api/wishlist").catch(() => ({ eventIds: [] })),
      ]);

      setBookings(bookingsData);

      const eventIds: string[] = wishlistRes.eventIds || [];
      if (eventIds.length > 0) {
        const allEvents: EventItem[] = await apiFetch("/api/events").catch(() => []);
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

  // Filter bookings based on active status filter
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === "All") return true;
    return b.status === bookingFilter;
  });

  const handleCompleteBooking = async (bookingId: string) => {
    if (!confirm("Have you attended this event? Mark as completed?")) return;
    setActionLoading(bookingId);
    try {
      await apiFetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "Completed" })
      });
      const updated = await apiFetch("/api/bookings");
      setBookings(updated);
    } catch (err: any) {
      alert(err.message || "Failed to complete booking");
    } finally {
      setActionLoading(null);
    }
  };

  return {
    session,
    isPending,
    router,
    activeSection,
    setActiveSection,
    bookings,
    wishlistEvents,
    loadingData,
    isSidebarOpenMobile,
    setIsSidebarOpenMobile,
    actionLoading,
    bookingFilter,
    setBookingFilter,
    handleCancelBooking,
    handleRemoveWishlist,
    handleCompleteBooking,
    filteredBookings,
  };
}
