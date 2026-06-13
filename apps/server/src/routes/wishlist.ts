import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlist.js";
import { validateRequest } from "../middleware/validation.js";
import { wishlistSchema } from "../validation/schemas.js";

const router = Router();

router.get("/", authMiddleware, getWishlist);
router.post("/", authMiddleware, validateRequest(wishlistSchema), addToWishlist);
router.delete("/", authMiddleware, validateRequest(wishlistSchema), removeFromWishlist);

export default router;
