import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";

export function useEvents() {
  const [events, setEvents] = useState<any[]>([]);

  const fetchEvents = async () => {
    try {
      const data = await apiFetch("/api/events");
      if (Array.isArray(data)) setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const createEvent = async (payload: any) => {
    try {
      await apiFetch("/api/events", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      fetchEvents();
    } catch (error) {
      console.error("Failed to create event", error);
    }
  };

  const updateEvent = async (id: string, payload: any) => {
    try {
      await apiFetch(`/api/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
      });
      fetchEvents();
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await apiFetch(`/api/events/${id}`, { method: "DELETE" });
      fetchEvents();
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, createEvent, updateEvent, deleteEvent, refreshEvents: fetchEvents };
}
