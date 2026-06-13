import { db } from "../db.js";
import { NotFoundError } from "../utils/errors.js";

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

export const eventsService = {
  async getAll() {
    const snapshot = await db.collection("events").get();
    return snapshot.docs.map((doc: any) =>
      convertTimestamps({ _id: doc.id, ...doc.data() })
    );
  },

  async getById(id: string) {
    const doc = await db.collection("events").doc(id).get();
    if (!doc.exists) {
      throw new NotFoundError("Event not found");
    }
    return convertTimestamps({ _id: doc.id, ...doc.data() });
  },

  async create(data: any) {
    const result = await db.collection("events").add({
      ...data,
      createdAt: new Date(),
    });
    return result.id;
  },

  async update(id: string, data: any) {
    const docRef = db.collection("events").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundError("Event not found");
    }
    await docRef.update({
      ...data,
      updatedAt: new Date(),
    });
  },

  async delete(id: string) {
    const docRef = db.collection("events").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundError("Event not found");
    }
    await docRef.delete();
  }
};
