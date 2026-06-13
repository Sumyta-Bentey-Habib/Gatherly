import { db } from "../db.js";

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

export const usersService = {
  async getAllUsers() {
    const snapshot = await db.collection("user").orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc: any) =>
      convertTimestamps({ _id: doc.id, ...doc.data() })
    );
  },

  async updateUserRole(userId: string, role: string) {
    await db.collection("user").doc(userId).update({ role });
  }
};
