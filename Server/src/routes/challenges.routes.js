import { Router } from "express";
import {
  getAllChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from "../controllers/challenges.controllers.js";

const router = Router();

// Routes for challenge operations
router.route("/").get(getAllChallenges).post(createChallenge);
router
  .route("/:id")
  .get(getChallengeById)
  .put(updateChallenge)
  .delete(deleteChallenge);

export default router;
