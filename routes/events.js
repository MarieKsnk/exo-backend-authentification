import { Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware.js";

const eventRouter = Router();

eventRouter.get("/events", AuthMiddleware, (req, res) => {
  console.log(req.headers);
  res.send("Welcome to");
});

export default eventRouter;
