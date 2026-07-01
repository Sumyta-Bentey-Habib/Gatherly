import { db } from "../db.js";
import { NotFoundError, ForbiddenError } from "../utils/errors.js";

// Helper function to recursively convert Firestore Timestamps to JavaScript Date objects
function convertTimestamps(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;
  
  if (typeof obj.toDate === "function") {
    return obj.toDate();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(convertTimestamps);
  }
  
  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = convertTimestamps(obj[key]);
    }
  }
  return result;
}

export const bookingsService = {
  async getBookings(userId: string, role: string, fetchAll: boolean) {
    let query: any = db.collection("bookings");
    if (!(fetchAll && role === "admin")) {
      query = query.where("userId", "==", userId);
    }
    const snapshot = await query.get();
    const bookings = snapshot.docs.map((doc: any) =>
      convertTimestamps({ _id: doc.id, ...doc.data() })
    );
    // Sort in-memory to avoid requiring a composite index in Firestore
    bookings.sort((a: any, b: any) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });
    return bookings;
  },

  async getBookingById(id: string, userId: string, role: string) {
    const doc = await db.collection("bookings").doc(id).get();
    if (!doc.exists) {
      throw new NotFoundError("Booking not found");
    }
    const booking = convertTimestamps({ _id: doc.id, ...doc.data() });
    if (role !== "admin" && booking.userId !== userId) {
      throw new ForbiddenError("You do not have permission to access this booking");
    }
    return booking;
  },

  async createBooking(userId: string, data: any) {
    const newBooking = {
      ...data,
      userId,
      status: "Pending",
      createdAt: new Date(),
    };
    const result = await db.collection("bookings").add(newBooking);
    return result.id;
  },

  async updateBookingStatus(id: string, status: string) {
    const docRef = db.collection("bookings").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundError("Booking not found");
    }
    await docRef.update({
      status,
      updatedAt: new Date(),
    });
  },

  async deleteBooking(id: string, userId: string, role: string) {
    const docRef = db.collection("bookings").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundError("Booking not found");
    }
    const booking = doc.data();
    if (role !== "admin" && booking?.userId !== userId) {
      throw new ForbiddenError("You do not have permission to delete this booking");
    }
    await docRef.delete();
  }
};
