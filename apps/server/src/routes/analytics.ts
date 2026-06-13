import { Router } from "express";
import { adminMiddleware } from "../middleware/auth.js";
import { getAnalytics } from "../controllers/analytics.js";

const router = Router();

router.get("/", adminMiddleware, getAnalytics);

export default router;
