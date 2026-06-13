import { Router } from "express";
import eventsRouter from "./events.js";
import bookingsRouter from "./bookings.js";
import analyticsRouter from "./analytics.js";
import usersRouter from "./users.js";
import wishlistRouter from "./wishlist.js";
import uploadRouter from "./upload.js";

const router = Router();

router.use("/events", eventsRouter);
router.use("/bookings", bookingsRouter);
router.use("/analytics", analyticsRouter);
router.use("/users", usersRouter);
router.use("/wishlist", wishlistRouter);
router.use("/upload", uploadRouter);

export default router;
