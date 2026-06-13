import { Request, Response } from "express";
import { usersService } from "../services/users.js";
import { asyncHandler } from "../utils/errors.js";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await usersService.getAllUsers();
  return res.json(users);
});

export const updateUserRole = asyncHandler(async (req: Request, res: Response) => {
  const { userId, role } = req.body;
  await usersService.updateUserRole(userId, role);
  return res.json({ success: true });
});
