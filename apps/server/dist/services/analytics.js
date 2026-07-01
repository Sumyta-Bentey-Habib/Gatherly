import { db } from "../db.js";
export const analyticsService = {
    async getDashboardAnalytics() {
        const bookingsSnapshot = await db.collection("bookings").get();
        const bookings = bookingsSnapshot.docs.map((doc) => doc.data());
        // Better Auth saves users in the "user" collection
        const userSnapshot = await db.collection("user").count().get();
        const usersCount = userSnapshot.data().count;
        let totalRevenue = 0;
        let completedBookings = 0;
        bookings.forEach((b) => {
            if (b.status === "Completed" && b.totalAmount) {
                totalRevenue += b.totalAmount;
                completedBookings++;
            }
        });
        return {
            totalRevenue,
            activeTrips: bookings.filter((b) => b.status === "Pending").length,
            completedBookings,
            newUsers: usersCount,
            conversionRate: 4.2,
        };
    },
};
