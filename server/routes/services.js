import { Router } from "express";
import {
  getAllServices,
  createService,
} from "../controllers/servicesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const servicesRouter = Router();

servicesRouter.get("/services", getAllServices);
servicesRouter.post("/services", authMiddleware, createService);

export default servicesRouter;
