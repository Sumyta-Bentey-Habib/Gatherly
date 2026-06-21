import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";

export function useBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  const fetchBookings = async () => {
    try {
      const data = await apiFetch("/api/bookings/my");
      if (Array.isArray(data)) setBookings(data);
    } catch (error) {
      console.error("Failed to fetch user bookings", error);
    }
  };

  const createBooking = async (payload: any) => {
    try {
      await apiFetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      fetchBookings();
    } catch (error) {
      console.error("Failed to create booking", error);
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      await apiFetch(`/api/bookings/${id}`, { method: "DELETE" });
      fetchBookings();
    } catch (error) {
      console.error("Failed to delete booking", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, createBooking, deleteBooking, refreshBookings: fetchBookings };
}
