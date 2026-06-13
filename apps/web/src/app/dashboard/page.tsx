"use client";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useDashboard } from "../hooks/useDashboard";

export default function UserDashboard() {
  const {
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
    filteredBookings,
  } = useDashboard();

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex w-full">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
      />

      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Topbar onMenuClick={() => setIsSidebarOpenMobile(true)} />

        <div className="flex-1 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full space-y-stack-lg">
          
          {/* Dashboard Header */}
          <div className="flex justify-between items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-container/15 px-3 py-1 rounded-full border border-primary-container/20 mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                  Member Space
                </span>
              </div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 capitalize">
                {activeSection === "overview" ? "Dashboard Overview" : `${activeSection} Management`}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Welcome back, {session.user.name}. Here is your gathering activity.
              </p>
            </div>
          </div>

          {loadingData ? (
            <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-on-surface-variant">Syncing database changes...</p>
            </div>
          ) : (
            <>
              {/* SECTION 1: OVERVIEW */}
              {activeSection === "overview" && (
                <div className="space-y-8">
                  {/* Stats Bento Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 ambient-shadow flex items-center justify-between">
                      <div>
                        <span className="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">
                          Total Points
                        </span>
                        <span className="font-display-lg text-headline-lg text-primary font-bold">
                          {session.user.points || 0}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 ambient-shadow flex items-center justify-between">
                      <div>
                        <span className="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">
                          Active Bookings
                        </span>
                        <span className="font-display-lg text-headline-lg text-secondary font-bold">
                          {bookings.filter((b) => b.status === "Pending" || b.status === "Confirmed").length}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-secondary-container/10 border border-secondary-container/20 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-2xl">confirmation_number</span>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 ambient-shadow flex items-center justify-between">
                      <div>
                        <span className="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">
                          Wishlist Items
                        </span>
                        <span className="font-display-lg text-headline-lg text-tertiary font-bold">
                          {wishlistEvents.length}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-tertiary-container/10 border border-tertiary-container/20 flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-2xl">favorite</span>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Bookings & Quick Actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upcoming Bookings */}
                    <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 ambient-shadow">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Bookings</h2>
                        <button
                          onClick={() => setActiveSection("bookings")}
                          className="text-primary hover:text-on-primary-container font-label-md text-label-md cursor-pointer"
                        >
                          View All
                        </button>
                      </div>

                      {bookings.filter((b) => b.status === "Pending" || b.status === "Confirmed").length === 0 ? (
                        <div className="text-center py-10 border border-dashed border-outline-variant/50 rounded-xl bg-surface/50">
                          <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2">event_busy</span>
                          <p className="text-on-surface-variant font-body-md">No upcoming reservations</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {bookings
                            .filter((b) => b.status === "Pending" || b.status === "Confirmed")
                            .slice(0, 3)
                            .map((booking) => (
                              <div
                                key={booking._id}
                                className="flex justify-between items-center p-4 rounded-xl border border-outline-variant/30 bg-surface/40 hover:bg-surface-container-low/30 transition-colors"
                              >
                                <div>
                                  <h3 className="font-semibold text-on-surface">{booking.eventTitle || "Gathering Event"}</h3>
                                  <div className="flex gap-4 text-xs text-on-surface-variant mt-1">
                                    <span className="flex items-center gap-1">
                                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                                      {booking.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <span className="material-symbols-outlined text-sm">groups</span>
                                      {booking.guests} Guests
                                    </span>
                                  </div>
                                </div>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-container/10 border border-primary-container/20 text-primary uppercase">
                                  {booking.status}
                                </span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Quick Tools */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 ambient-shadow flex flex-col justify-between">
                      <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Quick Actions</h2>
                        <div className="space-y-4">
                          <button
                            onClick={() => router.push("/")}
                            className="w-full flex items-center gap-4 p-4 rounded-xl border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-left cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-primary">explore</span>
                            <div>
                              <span className="block font-label-md text-label-md text-on-surface">Browse Gatherings</span>
                              <span className="block text-xs text-on-surface-variant">Find active events</span>
                            </div>
                          </button>
                          
                          <button
                            onClick={() => setActiveSection("wishlist")}
                            className="w-full flex items-center gap-4 p-4 rounded-xl border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-left cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-tertiary">favorite</span>
                            <div>
                              <span className="block font-label-md text-label-md text-on-surface">View Wishlist</span>
                              <span className="block text-xs text-on-surface-variant">Manage saved events</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: BOOKINGS */}
              {activeSection === "bookings" && (
                <div className="space-y-6">
                  {/* Filter Tabs */}
                  <div className="flex flex-wrap gap-2 pb-2 border-b border-outline-variant/20">
                    {(["All", "Pending", "Confirmed", "Completed", "Cancelled"] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setBookingFilter(filter)}
                        className={`px-4 py-2 rounded-full font-label-sm text-xs cursor-pointer transition-all ${
                          bookingFilter === filter
                            ? "bg-primary text-on-primary font-semibold shadow-sm"
                            : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                        }`}
                      >
                        {filter} ({filter === "All" ? bookings.length : bookings.filter((b) => b.status === filter).length})
                      </button>
                    ))}
                  </div>

                  {/* Bookings List */}
                  <div className="space-y-4">
                    {filteredBookings.length === 0 ? (
                      <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30">
                        <span className="material-symbols-outlined text-5xl mb-3 text-on-surface-variant/40">
                          confirmation_number
                        </span>
                        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No Bookings Found</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                          No reservations match the "{bookingFilter}" status.
                        </p>
                        <button
                          onClick={() => router.push("/")}
                          className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md hover:bg-primary-container transition-all cursor-pointer"
                        >
                          Explore Events
                        </button>
                      </div>
                    ) : (
                      filteredBookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 ambient-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                        >
                          <div>
                            <h3 className="font-headline-md text-lg text-on-surface mb-1.5 font-bold">
                              {booking.eventTitle || "Special Event"}
                            </h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-label-sm text-on-surface-variant">
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">groups</span>
                                {booking.guests} Guest(s)
                              </span>
                              <span className="flex items-center gap-1 font-semibold text-primary">
                                ${booking.totalAmount} Paid
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                            <span
                              className={`px-3 py-1 rounded-full font-semibold text-xs border uppercase ${
                                booking.status === "Confirmed"
                                  ? "bg-primary-container/10 border-primary-container/20 text-primary"
                                  : booking.status === "Pending"
                                  ? "bg-secondary-container/10 border-secondary-container/20 text-secondary"
                                  : booking.status === "Completed"
                                  ? "bg-surface-container-high border-outline-variant/30 text-on-surface-variant"
                                  : "bg-error-container/10 border-error-container/20 text-error"
                              }`}
                            >
                              {booking.status}
                            </span>

                            {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                              <button
                                onClick={() => handleCancelBooking(booking._id)}
                                disabled={actionLoading === booking._id}
                                className="text-error border border-error/30 hover:bg-error-container/10 font-label-sm text-label-sm px-4 py-2 rounded-full transition-colors cursor-pointer disabled:opacity-50"
                              >
                                Cancel Booking
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* SECTION 3: WISHLIST */}
              {activeSection === "wishlist" && (
                <div>
                  {wishlistEvents.length === 0 ? (
                    <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30">
                      <span className="material-symbols-outlined text-5xl mb-3 text-on-surface-variant/40">
                        favorite_border
                      </span>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Wishlist is Empty</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                        Explore gatherings and save them here to purchase tickets later.
                      </p>
                      <button
                        onClick={() => router.push("/")}
                        className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md hover:bg-primary-container transition-all cursor-pointer"
                      >
                        Browse Events
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistEvents.map((event) => (
                        <div
                          key={event._id}
                          className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden ambient-shadow flex flex-col justify-between"
                        >
                          <div className="relative h-48 w-full bg-surface-container">
                            <img src={event.imgUrl} alt={event.title} className="w-full h-full object-cover" />
                            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-secondary-fixed-dim/20">
                              <span className="font-label-sm text-xs text-secondary capitalize font-bold">
                                {event.category}
                              </span>
                            </div>
                          </div>

                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-headline-md text-lg text-on-surface mb-1 font-bold truncate">
                                {event.title}
                              </h3>
                              <p className="font-label-sm text-sm text-on-surface-variant mb-4 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">location_on</span>
                                {event.location}
                              </p>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20 mt-4">
                              <span className="font-display-lg text-lg text-primary font-bold">
                                {event.price === 0 ? "Free" : `$${event.price}`}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleRemoveWishlist(event._id)}
                                  disabled={actionLoading === event._id}
                                  className="text-error hover:bg-error-container/10 p-2 rounded-full border border-error/20 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
                                  title="Remove from Wishlist"
                                >
                                  <span className="material-symbols-outlined text-base">delete</span>
                                </button>
                                <button
                                  onClick={() => router.push(`/events/${event._id}`)}
                                  className="bg-secondary text-on-secondary px-4 py-2 rounded-full font-label-sm text-xs hover:shadow-sm transition-all cursor-pointer font-semibold"
                                >
                                  Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 4: PROFILE */}
              {activeSection === "profile" && (
                <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 ambient-shadow max-w-2xl">
                  <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-outline-variant/30 mb-6">
                    <div className="w-24 h-24 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary border border-secondary/15 shadow-sm">
                      <span className="material-symbols-outlined text-5xl">person</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="font-headline-md text-2xl text-on-surface mb-1 font-bold">
                        {session.user.name}
                      </h2>
                      <p className="font-label-sm text-sm text-on-surface-variant">
                        {session.user.email}
                      </p>
                      <span className="inline-block mt-2 bg-surface-variant px-2.5 py-0.5 rounded text-xs font-semibold capitalize text-on-surface-variant">
                        {session.user.role}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-headline-md text-lg text-on-surface font-semibold">Account details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <span className="block text-xs text-on-surface-variant uppercase tracking-wider mb-1">Account ID</span>
                        <span className="font-mono text-sm text-on-surface bg-surface-container-low px-2 py-1 rounded select-all break-all">
                          {session.user.id}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs text-on-surface-variant uppercase tracking-wider mb-1">Points Balance</span>
                        <span className="font-semibold text-primary flex items-center gap-1">
                          <span className="material-symbols-outlined text-lg">workspace_premium</span>
                          {session.user.points || 0} Points
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs text-on-surface-variant uppercase tracking-wider mb-1">Email Verification</span>
                        <span className="font-semibold text-green-700 flex items-center gap-1">
                          <span className="material-symbols-outlined text-lg">check_circle</span>
                          Verified
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs text-on-surface-variant uppercase tracking-wider mb-1">Membership Level</span>
                        <span className="font-semibold text-secondary flex items-center gap-1">
                          <span className="material-symbols-outlined text-lg">verified</span>
                          Standard Member
                        </span>
                      </div>
                    </div>
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
