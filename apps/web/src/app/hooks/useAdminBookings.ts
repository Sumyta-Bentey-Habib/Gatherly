import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";

export function useAdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  const fetchBookings = async () => {
    try {
      const data = await apiFetch("/api/admin/bookings");
      if (Array.isArray(data)) setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await apiFetch(`/api/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      fetchBookings();
    } catch (error) {
      console.error("Failed to update booking", error);
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      await apiFetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
      fetchBookings();
    } catch (error) {
      console.error("Failed to delete booking", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, updateBookingStatus, deleteBooking, refreshBookings: fetchBookings };
}
