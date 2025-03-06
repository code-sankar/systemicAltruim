import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/admin.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Unprotected Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// Protected Routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
