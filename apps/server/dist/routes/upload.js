import { Router } from "express";
import multer from "multer";
import { adminMiddleware } from "../middleware/auth.js";
import { uploadImage } from "../controllers/upload.js";
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/", adminMiddleware, upload.single("file"), uploadImage);
export default router;
