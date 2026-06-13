import { z } from "zod";

// Event Schemas
export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    duration: z.string().min(1, "Duration is required"),
    location: z.string().optional(),
    distanceNote: z.string().optional(),
    imgUrl: z.string().optional(),
    popular: z.boolean().optional(),
    maxGroupSize: z.coerce.number().optional(),
    category: z.string().min(1, "Category is required"),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
    images: z.array(z.string().url()).optional(),
  }).passthrough()
});

export const updateEventSchema = z.object({
  body: createEventSchema.shape.body.partial().passthrough()
});

// Booking / Ticket Schemas
export const createBookingSchema = z.object({
  body: z.object({
    eventId: z.string().min(1, "Event ID is required"),
    eventTitle: z.string().optional(),
    date: z.string().min(1, "Event date is required"),
    guests: z.coerce.number().min(1, "Guests must be at least 1"),
    totalAmount: z.coerce.number().min(0, "Total amount must be positive"),
  }).passthrough()
});

export const updateBookingStatusSchema = z.object({
  body: z.object({
    status: z.enum(["Pending", "Confirmed", "Completed", "Cancelled"]),
  })
});

// Wishlist Schemas
export const wishlistSchema = z.object({
  body: z.object({
    eventId: z.string().min(1, "Event ID is required"),
  })
});

// User Schemas
export const updateUserRoleSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    role: z.string().min(1, "Role is required"),
  })
});
