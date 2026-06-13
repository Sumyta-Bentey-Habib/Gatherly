import { Request, Response } from "express";
import { eventsService } from "../services/events.js";
import { asyncHandler } from "../utils/errors.js";

export const getAllEvents = asyncHandler(async (req: Request, res: Response) => {
  const events = await eventsService.getAll();
  return res.json(events);
});

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const eventId = await eventsService.create(req.body);
  return res.json({ success: true, eventId });
});

export const getEventById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await eventsService.getById(id);
  return res.json(event);
});

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await eventsService.update(id, req.body);
  return res.json({ success: true });
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await eventsService.delete(id);
  return res.json({ success: true });
});
