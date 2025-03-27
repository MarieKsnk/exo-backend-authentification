import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;
