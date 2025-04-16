import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controllers/usersController.js";
import { getAllUsers } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.get("/users", getAllUsers);

export default userRouter;
