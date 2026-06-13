import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Check if it's a known operational/AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Handle Firebase or general ID errors
  if (err.name === "BSONError" || err.message?.includes("Argument passed in must be a string of 12 bytes")) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  // Log other unexpected errors
  console.error(`[Internal Error] ${err.name || "Error"}: ${err.message}`, err.stack);
  return res.status(500).json({ error: "Internal Server Error" });
}
