import { db } from "../db.js";
import { FieldValue } from "firebase-admin/firestore";

export const wishlistService = {
  async getWishlist(userId: string) {
    const doc = await db.collection("wishlists").doc(userId).get();
    if (!doc.exists) {
      return [];
    }
    return doc.data()?.eventIds || [];
  },

  async addToWishlist(userId: string, eventId: string) {
    const docRef = db.collection("wishlists").doc(userId);
    await docRef.set(
      {
        userId,
        eventIds: FieldValue.arrayUnion(eventId),
      },
      { merge: true }
    );
  },

  async removeFromWishlist(userId: string, eventId: string) {
    const docRef = db.collection("wishlists").doc(userId);
    const doc = await docRef.get();
    if (doc.exists) {
      await docRef.update({
        eventIds: FieldValue.arrayRemove(eventId),
      });
    }
  }
};
