import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getUserById,
  getUserProfile,
  getAllUsers,
} from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);

export default userRouter;
