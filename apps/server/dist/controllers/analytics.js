import { analyticsService } from "../services/analytics.js";
import { asyncHandler } from "../utils/errors.js";
export const getAnalytics = asyncHandler(async (req, res) => {
    const metrics = await analyticsService.getDashboardAnalytics();
    return res.json(metrics);
});
