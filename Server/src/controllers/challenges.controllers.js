import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Challenge } from "../models/challenges.model.js";
import mongoose, { isValidObjectId } from "mongoose";

const getAllChallenges = asyncHandler(async (req, res) => {
  try {
    const challenges = await Challenge.find();
    return res
      .status(200)
      .json(new ApiResponse(200, challenges, "Challenges retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, "Error retrieving challenges: " + error.message);
  }
});

const getChallengeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid challenge ID");
  }

  try {
    const challenge = await Challenge.findById(id);
    
    if (!challenge) {
      throw new ApiError(404, "Challenge not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, challenge, "Challenge retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, "Error retrieving challenge: " + error.message);
  }
});

const createChallenge = asyncHandler(async (req, res) => {
  const { logo, title, fundingAmount, description, deadline } = req.body;

  if (
    [title, fundingAmount, description, deadline].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All required fields must be filled");
  }

  try {
    const challenge = await Challenge.create({
      logo,
      title,
      fundingAmount,
      description,
      deadline,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, challenge, "Challenge created successfully"));
  } catch (error) {
    throw new ApiError(400, "Error creating challenge: " + error.message);
  }
});

const updateChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid challenge ID");
  }

  try {
    const challenge = await Challenge.findById(id);

    if (!challenge) {
      throw new ApiError(404, "Challenge not found");
    }

    // Update fields if provided
    if (updates.logo !== undefined) challenge.logo = updates.logo;
    if (updates.title !== undefined) challenge.title = updates.title;
    if (updates.fundingAmount !== undefined)
      challenge.fundingAmount = updates.fundingAmount;
    if (updates.description !== undefined)
      challenge.description = updates.description;
    if (updates.deadline !== undefined) challenge.deadline = updates.deadline;
    if (updates.visible !== undefined) challenge.visible = updates.visible;

    const updatedChallenge = await challenge.save();

    return res
      .status(200)
      .json(new ApiResponse(200, updatedChallenge, "Challenge updated successfully"));
  } catch (error) {
    throw new ApiError(400, "Error updating challenge: " + error.message);
  }
});

const deleteChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid challenge ID");
  }

  try {
    const challenge = await Challenge.findByIdAndDelete(id);

    if (!challenge) {
      throw new ApiError(404, "Challenge not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, challenge, "Challenge deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Error deleting challenge: " + error.message);
  }
});

export {
  getAllChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
};