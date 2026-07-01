import { Router } from "express";
import { adminMiddleware } from "../middleware/auth.js";
import { getAllUsers, updateUserRole } from "../controllers/users.js";
import { validateRequest } from "../middleware/validation.js";
import { updateUserRoleSchema } from "../validation/schemas.js";
const router = Router();
router.get("/", adminMiddleware, getAllUsers);
router.patch("/", adminMiddleware, validateRequest(updateUserRoleSchema), updateUserRole);
export default router;
