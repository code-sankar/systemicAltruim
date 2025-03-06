import { Router } from "express";
import {
  getAllFounders,
  getFounderById,
  createFounder,
  updateFounder,
  deleteFounder,
} from "../controllers/founder.controllers.js";

const router = Router();

// Routes for founders
router.route("/").get(getAllFounders).post(createFounder);
router
  .route("/:id")
  .get(getFounderById)
  .put(updateFounder)
  .delete(deleteFounder);

export default router;
