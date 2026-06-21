"use client";

import Script from "next/script";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import StatCardComponent from "../../components/StatCard";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import {
  STATS_CARDS_DEFINITIONS,
  BOOKING_STATUS_STYLES,
  USER_ROLE_STYLES,
  ADMIN_STRINGS,
} from "./admin.constants";

export default function AdminDashboard() {
  const {
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
  } = useAdminDashboard();

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Map analytics metrics to StatCard structure using definitions from constants
  const statsCards = STATS_CARDS_DEFINITIONS.map((def) => {
    let value = "";
    let change = def.change || "";

    if (def.id === "stat-revenue") {
      value = `$${analytics.totalRevenue.toLocaleString()}`;
    } else if (def.id === "stat-bookings") {
      value = bookings.filter((b) => b.status === "Pending" || b.status === "Confirmed").length.toString();
    } else if (def.id === "stat-users") {
      value = users.length.toString();
      change = `+${users.filter((u) => u.role === "user").length} standard users`;
    }

    return {
      id: def.id,
      title: def.title,
      value,
      change,
      isPositive: def.isPositive,
      icon: def.icon,
      iconBgClass: def.iconBgClass,
      iconTextClass: def.iconTextClass,
    };
  });

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex w-full">
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (activeSection === "overview" && !loadingData) {
            initChart();
          }
        }}
      />
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Topbar />

        <div className="flex-1 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full space-y-stack-lg">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 capitalize">
                {activeSection} Management
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Platform operational controls for admin role: {session.user.name}.
              </p>
            </div>
            {activeSection === "events" && (
              <button
                onClick={() => router.push("/events/create")}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md hover:bg-primary-container hover:shadow-sm transition-all cursor-pointer"
              >
                {ADMIN_STRINGS.createEventBtn}
              </button>
            )}
          </div>

          {loadingData ? (
            <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-on-surface-variant">{ADMIN_STRINGS.syncingData}</p>
            </div>
          ) : (
            <>
              {/* SECTION 1: OVERVIEW */}
              {activeSection === "overview" && (
                <div className="space-y-stack-lg">
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                    {statsCards.map((stat) => (
                      <StatCardComponent key={stat.id} stat={stat} />
                    ))}

                    {/* Registrations Chart */}
                    <div className="bg-surface-container-lowest rounded-xl p-gutter ambient-shadow border border-outline-variant/30 md:col-span-2 min-h-[300px]">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="font-headline-md text-headline-md text-on-surface">
                          {ADMIN_STRINGS.weeklyTrendsTitle}
                        </h2>
                      </div>
                      <div className="relative h-[250px] w-full">
                        <canvas id="registrationsChart"></canvas>
                      </div>
                    </div>

                    {/* Quick Tools */}
                    <div className="bg-surface-container-lowest rounded-xl p-gutter ambient-shadow border border-outline-variant/30 flex flex-col justify-between">
                      <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
                          {ADMIN_STRINGS.quickActionsTitle}
                        </h2>
                        <div className="space-y-4">
                          <button
                            onClick={() => setActiveSection("events")}
                            className="w-full flex items-center gap-4 p-4 rounded-lg border border-outline-variant/50 hover:bg-surface-container-low transition-colors text-left"
                          >
                            <span className="material-symbols-outlined text-primary">event</span>
                            <div>
                              <span className="block font-label-md text-label-md text-on-surface">{ADMIN_STRINGS.manageEventsLabel}</span>
                              <span className="block font-label-sm text-label-sm text-on-surface-variant">{ADMIN_STRINGS.manageEventsDesc}</span>
                            </div>
                          </button>
                          <button
                            onClick={() => setActiveSection("users")}
                            className="w-full flex items-center gap-4 p-4 rounded-lg border border-outline-variant/50 hover:bg-surface-container-low transition-colors text-left"
                          >
                            <span className="material-symbols-outlined text-secondary">group</span>
                            <div>
                              <span className="block font-label-md text-label-md text-on-surface">{ADMIN_STRINGS.manageUsersLabel}</span>
                              <span className="block font-label-sm text-label-sm text-on-surface-variant">{ADMIN_STRINGS.manageUsersDesc}</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* SECTION 2: EVENTS MANAGEMENT */}
              {activeSection === "events" && (
                <div className="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/30 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                          {ADMIN_STRINGS.eventsTableHeaders.map((header, idx) => (
                            <th
                              key={header}
                              className={`px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold ${
                                idx === ADMIN_STRINGS.eventsTableHeaders.length - 1 ? "text-right" : ""
                              }`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/20">
                        {events.length === 0 ? (
                          <tr>
                            <td colSpan={ADMIN_STRINGS.eventsTableHeaders.length} className="px-6 py-12 text-center text-on-surface-variant">
                              {ADMIN_STRINGS.noEvents}
                            </td>
                          </tr>
                        ) : (
                          events.map((evt) => (
                            <tr key={evt._id} className="hover:bg-surface-container-low/30 transition-colors">
                              <td className="px-6 py-4">
                                <img
                                  src={evt.imgUrl}
                                  alt={evt.title}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              </td>
                              <td className="px-6 py-4 font-semibold text-on-surface">
                                {evt.title}
                              </td>
                              <td className="px-6 py-4 capitalize text-on-surface-variant">
                                {evt.category}
                              </td>
                              <td className="px-6 py-4 text-on-surface-variant">
                                {evt.location}
                              </td>
                              <td className="px-6 py-4 font-semibold text-primary">
                                {evt.price === 0 ? "Free" : `$${evt.price}`}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => handleDeleteEvent(evt._id)}
                                  disabled={actionLoading === evt._id}
                                  className="text-error border border-error/20 hover:bg-error/10 px-3 py-1.5 rounded-full font-label-sm text-label-sm cursor-pointer disabled:opacity-50"
                                >
                                  {ADMIN_STRINGS.deleteBtn}
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SECTION 3: USERS MANAGEMENT */}
              {activeSection === "users" && (
                <div className="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/30 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                          {ADMIN_STRINGS.usersTableHeaders.map((header, idx) => (
                            <th
                              key={header}
                              className={`px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold ${
                                idx === ADMIN_STRINGS.usersTableHeaders.length - 1 ? "text-right" : ""
                              }`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/20">
                        {users.map((user) => (
                          <tr key={user._id} className="hover:bg-surface-container-low/30 transition-colors">
                            <td className="px-6 py-4 font-semibold text-on-surface">
                              {user.name}
                            </td>
                            <td className="px-6 py-4 text-on-surface-variant">
                              {user.email}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
                                  USER_ROLE_STYLES[user.role] || USER_ROLE_STYLES.user
                                }`}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => handleUpdateUserRole(user._id, user.role)}
                                disabled={actionLoading === user._id || user._id === session.user.id}
                                className="text-secondary border border-secondary/20 hover:bg-secondary/10 px-4 py-1.5 rounded-full font-label-sm text-label-sm cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                              >
                                {user.role === "admin" ? ADMIN_STRINGS.demoteBtn : ADMIN_STRINGS.promoteBtn}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SECTION 4: BOOKINGS MANAGEMENT */}
              {activeSection === "bookings" && (
                <div className="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/30 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                          {ADMIN_STRINGS.bookingsTableHeaders.map((header, idx) => (
                            <th
                              key={header}
                              className={`px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold ${
                                idx === ADMIN_STRINGS.bookingsTableHeaders.length - 1 ? "text-right" : ""
                              }`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/20">
                        {bookings.length === 0 ? (
                          <tr>
                            <td colSpan={ADMIN_STRINGS.bookingsTableHeaders.length} className="px-6 py-12 text-center text-on-surface-variant">
                              {ADMIN_STRINGS.noBookings}
                            </td>
                          </tr>
                        ) : (
                          bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-surface-container-low/30 transition-colors">
                              <td className="px-6 py-4 font-semibold text-on-surface">
                                {booking.eventTitle || "Special Event"}
                              </td>
                              <td className="px-6 py-4">
                                <span className="block font-semibold text-on-surface">{booking.userName}</span>
                                <span className="block text-xs text-on-surface-variant">{booking.userEmail}</span>
                              </td>
                              <td className="px-6 py-4 text-on-surface-variant text-label-sm">
                                <span className="block">Date: {booking.date}</span>
                                <span className="block">Guests: {booking.guests}</span>
                              </td>
                              <td className="px-6 py-4 font-semibold text-primary">
                                ${booking.totalAmount}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                                    BOOKING_STATUS_STYLES[booking.status] || ""
                                  }`}
                                >
                                  {booking.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex gap-2 justify-end">
                                  {booking.status === "Pending" && (
                                    <button
                                      onClick={() => handleUpdateBookingStatus(booking._id, "Confirmed")}
                                      disabled={actionLoading === booking._id}
                                      className="text-primary border border-primary/20 hover:bg-primary/10 px-3 py-1 rounded-full font-label-sm text-label-sm cursor-pointer disabled:opacity-50"
                                    >
                                      {ADMIN_STRINGS.confirmBtn}
                                    </button>
                                  )}
                                  {booking.status === "Confirmed" && (
                                    <button
                                      onClick={() => handleUpdateBookingStatus(booking._id, "Completed")}
                                      disabled={actionLoading === booking._id}
                                      className="text-secondary border border-secondary/20 hover:bg-secondary/10 px-3 py-1 rounded-full font-label-sm text-label-sm cursor-pointer disabled:opacity-50"
                                    >
                                      {ADMIN_STRINGS.completeBtn}
                                    </button>
                                  )}
                                  {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                                    <button
                                      onClick={() => handleUpdateBookingStatus(booking._id, "Cancelled")}
                                      disabled={actionLoading === booking._id}
                                      className="text-error border border-error/20 hover:bg-error/10 px-3 py-1 rounded-full font-label-sm text-label-sm cursor-pointer disabled:opacity-50"
                                    >
                                      {ADMIN_STRINGS.cancelBtn}
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
