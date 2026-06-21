"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../lib/auth-client";
import { apiFetch } from "../../lib/api";
import {
  API_ENDPOINTS,
  INITIAL_ANALYTICS,
  CHART_DUMMY_DATA,
  CHART_DUMMY_LABELS,
  CHART_COLOR_CONFIG,
  getChartOptions,
  ADMIN_STRINGS,
} from "../admin/admin.constants";

export interface Booking {
  _id: string;
  eventId: string;
  eventTitle?: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  date: string;
  guests: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export interface EventItem {
  _id: string;
  title: string;
  price: number;
  category: string;
  location: string;
  imgUrl: string;
}

export interface Analytics {
  totalRevenue: number;
  activeTrips: number;
  completedBookings: number;
  newUsers: number;
  conversionRate: number;
}

export function useAdminDashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<"overview" | "events" | "users" | "bookings">("overview");
  const [analytics, setAnalytics] = useState<Analytics>(INITIAL_ANALYTICS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/login");
      } else if (session.user.role !== "admin") {
        router.push("/dashboard");
      }
    }
  }, [session, isPending, router]);

  const loadDashboardData = async () => {
    if (!session || session.user.role !== "admin") return;
    try {
      setLoadingData(true);

      // Fetch analytics, bookings, users, events
      const [analyticsData, bookingsData, usersData, eventsData] = await Promise.all([
        apiFetch(API_ENDPOINTS.analytics).catch(() => null),
        apiFetch(API_ENDPOINTS.bookings).catch(() => []),
        apiFetch(API_ENDPOINTS.users).catch(() => []),
        apiFetch(API_ENDPOINTS.events).catch(() => []),
      ]);

      if (analyticsData) setAnalytics(analyticsData);
      setUsers(usersData);
      setEvents(eventsData);

      // Join user details on bookings
      const joinedBookings = bookingsData.map((b: Booking) => {
        const u = usersData.find((user: UserItem) => user._id === b.userId);
        return {
          ...b,
          userName: u?.name || "Unknown User",
          userEmail: u?.email || "No Email",
        };
      });
      setBookings(joinedBookings);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (session && session.user.role === "admin") {
      loadDashboardData();
    }
  }, [session]);

  const initChart = () => {
    const canvas = document.getElementById("registrationsChart") as HTMLCanvasElement | null;
    const customWindow = typeof window !== "undefined" ? (window as any) : null;
    if (!canvas || !customWindow?.Chart) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Generate recent 7 days labels and compute booking counts
    const labels: string[] = [];
    const chartData: number[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const labelStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      labels.push(labelStr);

      // Filter bookings matching this date
      const count = bookings.filter((b) => {
        const bDate = new Date(b.createdAt);
        return (
          bDate.getDate() === d.getDate() &&
          bDate.getMonth() === d.getMonth() &&
          bDate.getFullYear() === d.getFullYear()
        );
      }).length;
      chartData.push(count);
    }

    // Fallback to dummy curve if database is clean
    const hasData = chartData.some((val) => val > 0);
    const finalData = hasData ? chartData : CHART_DUMMY_DATA;
    const finalLabels = hasData ? labels : CHART_DUMMY_LABELS;

    chartInstance.current = new customWindow.Chart(ctx, {
      type: "line",
      data: {
        labels: finalLabels,
        datasets: [
          {
            label: "Bookings Created",
            data: finalData,
            borderColor: CHART_COLOR_CONFIG.borderColor,
            backgroundColor: CHART_COLOR_CONFIG.backgroundColor,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: CHART_COLOR_CONFIG.pointBackgroundColor,
            pointHoverRadius: 7,
          },
        ],
      },
      options: getChartOptions(
        CHART_COLOR_CONFIG.tickColor,
        CHART_COLOR_CONFIG.gridColor,
        CHART_COLOR_CONFIG.tooltipBg,
        CHART_COLOR_CONFIG.tooltipBorder
      ),
    });
  };

  useEffect(() => {
    if (activeSection === "overview" && !loadingData && typeof window !== "undefined" && (window as any).Chart) {
      initChart();
    }
  }, [activeSection, loadingData, bookings]);

  // Actions
  const handleUpdateBookingStatus = async (bookingId: string, status: "Confirmed" | "Completed" | "Cancelled") => {
    setActionLoading(bookingId);
    try {
      await apiFetch(API_ENDPOINTS.bookingsDetail(bookingId), {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || ADMIN_STRINGS.errorUpdateBooking);
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (!confirm(ADMIN_STRINGS.confirmUserRoleChange(newRole))) return;
    setActionLoading(userId);
    try {
      await apiFetch(API_ENDPOINTS.users, {
        method: "PATCH",
        body: JSON.stringify({ userId, role: newRole }),
      });
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || ADMIN_STRINGS.errorUpdateUserRole);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm(ADMIN_STRINGS.confirmDeleteEvent)) return;
    setActionLoading(eventId);
    try {
      await apiFetch(API_ENDPOINTS.eventsDetail(eventId), {
        method: "DELETE",
      });
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || ADMIN_STRINGS.errorDeleteEvent);
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
    analytics,
    bookings,
    users,
    events,
    loadingData,
    actionLoading,
    initChart,
    handleUpdateBookingStatus,
    handleUpdateUserRole,
    handleDeleteEvent,
  };
}
