export const API_ENDPOINTS = {
  analytics: "/api/analytics",
  bookings: "/api/bookings?all=true",
  bookingsDetail: (bookingId: string) => `/api/bookings/${bookingId}`,
  users: "/api/users",
  events: "/api/events",
  eventsDetail: (eventId: string) => `/api/events/${eventId}`,
};

export const INITIAL_ANALYTICS = {
  totalRevenue: 0,
  activeTrips: 0,
  completedBookings: 0,
  newUsers: 0,
  conversionRate: 4.2,
};

export const CHART_DUMMY_DATA = [4, 7, 5, 9, 12, 10, 15];
export const CHART_DUMMY_LABELS = ["Jun 7", "Jun 8", "Jun 9", "Jun 10", "Jun 11", "Jun 12", "Jun 13"];

export const CHART_COLOR_CONFIG = {
  borderColor: "#3EB489",
  backgroundColor: "rgba(62, 180, 137, 0.1)",
  pointBackgroundColor: "#3EB489",
  gridColor: "rgba(109, 122, 114, 0.1)",
  tickColor: "#3d4943",
  tooltipBg: "#2c322e",
  tooltipBorder: "#bccac1",
};

export const getChartOptions = (
  tickColor: string = CHART_COLOR_CONFIG.tickColor,
  gridColor: string = CHART_COLOR_CONFIG.gridColor,
  tooltipBg: string = CHART_COLOR_CONFIG.tooltipBg,
  tooltipBorder: string = CHART_COLOR_CONFIG.tooltipBorder
) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: "index" as const,
      intersect: false,
      backgroundColor: tooltipBg,
      titleColor: "#ffffff",
      bodyColor: "#ffffff",
      borderColor: tooltipBorder,
      borderWidth: 1,
    },
  },
  scales: {
    y: {
      grid: { color: gridColor },
      ticks: {
        color: tickColor,
        font: { family: "Inter", size: 12 },
        stepSize: 1,
      },
    },
    x: {
      grid: { display: false },
      ticks: {
        color: tickColor,
        font: { family: "Inter", size: 12 },
      },
    },
  },
});

export const STATS_CARDS_DEFINITIONS = [
  {
    id: "stat-revenue",
    title: "Total Revenue",
    change: "+8.3% vs last month",
    isPositive: true,
    icon: "payments",
    iconBgClass: "bg-primary-container/20",
    iconTextClass: "text-primary-container",
  },
  {
    id: "stat-bookings",
    title: "Active Bookings",
    change: "+12.1% vs last month",
    isPositive: true,
    icon: "confirmation_number",
    iconBgClass: "bg-secondary-container/20",
    iconTextClass: "text-secondary",
  },
  {
    id: "stat-users",
    title: "Platform Users",
    isPositive: true,
    icon: "group",
    iconBgClass: "bg-tertiary-container/20",
    iconTextClass: "text-tertiary",
  },
];

export const BOOKING_STATUS_STYLES: Record<string, string> = {
  Confirmed: "bg-primary-container/10 border-primary-container/20 text-primary",
  Pending: "bg-secondary-container/10 border-secondary-container/20 text-secondary",
  Completed: "bg-surface-container-high border-outline-variant/30 text-on-surface-variant",
  Cancelled: "bg-error-container/10 border-error-container/20 text-error",
};

export const USER_ROLE_STYLES: Record<string, string> = {
  admin: "bg-primary-container/10 text-primary border border-primary-container/20",
  user: "bg-surface-variant text-on-surface-variant",
};

export const ADMIN_STRINGS = {
  syncingData: "Syncing database changes...",
  noEvents: "No events found in database. Click Create Event to add one.",
  noBookings: "No bookings found in database.",
  createEventBtn: "+ Create Event",
  deleteBtn: "Delete",
  demoteBtn: "Demote to User",
  promoteBtn: "Promote to Admin",
  confirmBtn: "Confirm",
  completeBtn: "Complete",
  cancelBtn: "Cancel",
  weeklyTrendsTitle: "Weekly Booking Trends",
  quickActionsTitle: "Quick Actions",
  manageEventsLabel: "Manage Events",
  manageEventsDesc: "Update active listings",
  manageUsersLabel: "Manage Users",
  manageUsersDesc: "Edit roles & accounts",

  // Table headers
  eventsTableHeaders: ["Cover", "Event Title", "Category", "Location", "Price", "Actions"],
  usersTableHeaders: ["Name", "Email", "Current Role", "Toggle Role"],
  bookingsTableHeaders: ["Event Title", "Customer", "Details", "Total amount", "Status", "Actions"],

  // Confirmation / Error messages
  confirmUserRoleChange: (role: string) => `Are you sure you want to change this user's role to ${role}?`,
  confirmDeleteEvent: "Are you sure you want to delete this event? This action is permanent.",
  errorUpdateBooking: "Failed to update booking status",
  errorUpdateUserRole: "Failed to update user role",
  errorDeleteEvent: "Failed to delete event",
};
