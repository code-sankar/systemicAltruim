import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Subscriber } from "../models/subscriber.model.js";
import { isValidObjectId } from "mongoose";

const getAllSubscribers = asyncHandler(async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json(new ApiResponse(200, subscribers, "Subscribers retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to fetch subscribers: " + error.message);
  }
});

const createSubscriber = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email?.trim()) {
    throw new ApiError(400, "Email is required");
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  try {
    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      throw new ApiError(409, "Email already subscribed");
    }

    const subscriber = await Subscriber.create({ email });
    return res
      .status(201)
      .json(new ApiResponse(201, subscriber, "Subscribed successfully"));
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(400, "Failed to create subscriber: " + error.message);
  }
});

const deleteSubscriber = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid subscriber ID");
  }

  try {
    const subscriber = await Subscriber.findByIdAndDelete(id);
    
    if (!subscriber) {
      throw new ApiError(404, "Subscriber not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, subscriber, "Subscriber deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to delete subscriber: " + error.message);
  }
});

export {
  getAllSubscribers,
  createSubscriber,
  deleteSubscriber
};