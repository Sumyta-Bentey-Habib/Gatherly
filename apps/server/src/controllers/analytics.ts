import { Request, Response } from "express";
import { analyticsService } from "../services/analytics.js";
import { asyncHandler } from "../utils/errors.js";

export const getAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const metrics = await analyticsService.getDashboardAnalytics();
  return res.json(metrics);
});
