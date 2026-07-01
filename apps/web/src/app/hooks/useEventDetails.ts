"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../lib/auth-client";
import { apiFetch } from "../../lib/api";

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface EventItem {
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

export function useEventDetails(id: string) {
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

      const res = await apiFetch("/api/bookings", {
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
        if (totalAmount > 0 && res.bookingId) {
          router.push(`/payment/${res.bookingId}`);
        } else {
          router.push("/dashboard?section=bookings");
        }
      }, 1500);
    } catch (err: any) {
      setBookingError(err.message || "Failed to complete booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  return {
    session,
    router,
    event,
    loading,
    guests,
    setGuests,
    isWishlisted,
    wishlistLoading,
    bookingLoading,
    bookingError,
    bookingSuccess,
    handleWishlistToggle,
    handleBooking,
  };
}
