import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth.js";

export interface AuthenticatedRequest extends Request {
  session?: any;
}

export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.session = session;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}

export async function adminMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session || session.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.session = session;
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}
