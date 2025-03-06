import { Router } from "express";
import {
  getAllCompletedChallenges,
  getCompletedChallengeById,
  createCompletedChallenge,
  updateCompletedChallenge,
  deleteCompletedChallenge,
} from "../controllers/completed.controllers.js";

const router = Router();

// Routes for completed challenges
router.route("/").get(getAllCompletedChallenges).post(createCompletedChallenge);
router
  .route("/:id")
  .get(getCompletedChallengeById)
  .put(updateCompletedChallenge)
  .delete(deleteCompletedChallenge);

export default router;
