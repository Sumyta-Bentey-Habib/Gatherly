import { config } from "./config.js";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import mainRouter from "./routes/index.js";
import { errorHandler } from "./middleware/errors.js";
import { db } from "./db.js";
const app = express();
const port = config.PORT;
// CORS setup - critical for cross-port sessions
const allowedOrigin = config.NEXT_PUBLIC_FRONTEND_URL;
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));
// Better Auth Route Handler - MUST be mounted BEFORE express.json()
app.all("/api/auth/*", toNodeHandler(auth));
// Express body parsers (only applied to downstream routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Modular API routes
app.use("/api", mainRouter);
// Basic health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", time: new Date() });
});
// Centralized error handling middleware (MUST be mounted last)
app.use(errorHandler);
// Test Firestore connection
db.listCollections()
    .then(() => {
    console.log("Firestore is connected successfully 🎉");
})
    .catch((err) => {
    console.error("Firestore connection failed ❌", err);
});
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`[Server] Running on port ${port} 🎶`);
    });
}
export default app;
