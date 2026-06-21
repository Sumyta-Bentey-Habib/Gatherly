import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";

export function useWishlist() {
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);

  const fetchWishlist = async () => {
    try {
      const data = await apiFetch("/api/wishlist");
      if (Array.isArray(data)) {
        setSavedEventIds(data.map((item: any) => item.eventId || item._id));
      }
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  };

  const toggleWishlist = async (eventId: string) => {
    try {
      if (savedEventIds.includes(eventId)) {
        await apiFetch(`/api/wishlist/${eventId}`, { method: "DELETE" });
        setSavedEventIds(prev => prev.filter(id => id !== eventId));
      } else {
        await apiFetch("/api/wishlist", {
          method: "POST",
          body: JSON.stringify({ eventId })
        });
        setSavedEventIds(prev => [...prev, eventId]);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return { savedEventIds, toggleWishlist, refreshWishlist: fetchWishlist };
}
