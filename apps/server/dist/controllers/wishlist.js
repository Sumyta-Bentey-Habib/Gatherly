import { wishlistService } from "../services/wishlist.js";
import { asyncHandler, ForbiddenError } from "../utils/errors.js";
export const getWishlist = asyncHandler(async (req, res) => {
    const session = req.session;
    const eventIds = await wishlistService.getWishlist(session.user.id);
    return res.json({ eventIds });
});
export const addToWishlist = asyncHandler(async (req, res) => {
    const session = req.session;
    if (session.user.role === "admin") {
        throw new ForbiddenError("Admins cannot add to wishlist");
    }
    const { eventId } = req.body;
    await wishlistService.addToWishlist(session.user.id, eventId);
    return res.json({ success: true });
});
export const removeFromWishlist = asyncHandler(async (req, res) => {
    const session = req.session;
    const { eventId } = req.body;
    await wishlistService.removeFromWishlist(session.user.id, eventId);
    return res.json({ success: true });
});
