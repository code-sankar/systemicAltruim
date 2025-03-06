import { Admin } from "../models/admin.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const checkUser = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (!decodedToken) {
        next();
      }

      const user = await Admin.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        next();
      }

      req.user = user;
    }
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
