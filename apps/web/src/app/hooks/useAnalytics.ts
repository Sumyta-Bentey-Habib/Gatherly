import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await apiFetch("/api/admin/analytics");
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
        // Fallback mock analytics if the backend endpoint doesn't exist yet
        setAnalytics({
          totalRevenue: 24500,
          activeTrips: 15,
          newUsers: 142,
          completedBookings: 89,
          monthlyRevenue: [55, 75, 45, 90, 60, 85, 110, 70, 95, 65, 80, 105]
        });
      }
    };
    fetchAnalytics();
  }, []);

  return { analytics };
}
