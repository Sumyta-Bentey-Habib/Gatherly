import { bookingsService } from "../services/bookings.js";
import { asyncHandler, ForbiddenError } from "../utils/errors.js";
export const getBookings = asyncHandler(async (req, res) => {
    const session = req.session;
    const fetchAll = req.query.all === "true";
    const bookings = await bookingsService.getBookings(session.user.id, session.user.role, fetchAll);
    return res.json(bookings);
});
export const createBooking = asyncHandler(async (req, res) => {
    const session = req.session;
    if (session.user.role === "admin") {
        throw new ForbiddenError("Admins cannot book events");
    }
    const bookingId = await bookingsService.createBooking(session.user.id, req.body);
    return res.json({ success: true, bookingId });
});
export const getBookingById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const session = req.session;
    const booking = await bookingsService.getBookingById(id, session.user.id, session.user.role);
    return res.json(booking);
});
export const updateBookingStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    await bookingsService.updateBookingStatus(id, status);
    return res.json({ success: true });
});
export const deleteBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const session = req.session;
    await bookingsService.deleteBooking(id, session.user.id, session.user.role);
    return res.json({ success: true });
});
