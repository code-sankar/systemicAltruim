import { Router } from "express";
import {
  getAllSubscribers,
  createSubscriber,
  deleteSubscriber,
} from "../controllers/subscriber.controllers.js";

const router = Router();

// Routes for subscribers
router.route("/").get(getAllSubscribers).post(createSubscriber);
router.route("/:id").delete(deleteSubscriber);

export default router;
