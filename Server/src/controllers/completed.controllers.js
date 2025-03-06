import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Completed } from "../models/completed.model.js";
import mongoose, { isValidObjectId } from "mongoose";

const getAllCompletedChallenges = asyncHandler(async (req, res) => {
  try {
    const completeds = await Completed.find();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          completeds,
          "Completed challenges retrieved successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to fetch completed challenges: " + error.message
    );
  }
});

const getCompletedChallengeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid completed challenge ID");
  }

  try {
    const completed = await Completed.findById(id);

    if (!completed) {
      throw new ApiError(404, "Completed challenge not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          completed,
          "Completed challenge retrieved successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Error fetching completed challenge: " + error.message
    );
  }
});

const createCompletedChallenge = asyncHandler(async (req, res) => {
  const {
    challengerName,
    personName,
    position,
    linkedinProfile,
    description,
    fundingAmount,
    image,
  } = req.body;

  // Validate required fields
  if (
    [challengerName, personName, description, fundingAmount].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Required fields are missing or empty");
  }

  try {
    const completed = await Completed.create({
      challengerName,
      personName,
      position: position || "",
      linkedinProfile: linkedinProfile || "",
      description,
      fundingAmount,
      image: image || "",
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          completed,
          "Completed challenge created successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      400,
      "Failed to create completed challenge: " + error.message
    );
  }
});

const updateCompletedChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid completed challenge ID");
  }

  try {
    const completed = await Completed.findById(id);

    if (!completed) {
      throw new ApiError(404, "Completed challenge not found");
    }

    // Update fields if provided
    if (updates.challengerName !== undefined)
      completed.challengerName = updates.challengerName;
    if (updates.personName !== undefined)
      completed.personName = updates.personName;
    if (updates.position !== undefined) completed.position = updates.position;
    if (updates.linkedinProfile !== undefined)
      completed.linkedinProfile = updates.linkedinProfile;
    if (updates.description !== undefined)
      completed.description = updates.description;
    if (updates.fundingAmount !== undefined)
      completed.fundingAmount = updates.fundingAmount;
    if (updates.image !== undefined) completed.image = updates.image;

    const updatedCompleted = await completed.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedCompleted,
          "Completed challenge updated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      400,
      "Failed to update completed challenge: " + error.message
    );
  }
});

const deleteCompletedChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid completed challenge ID");
  }

  try {
    const completed = await Completed.findByIdAndDelete(id);

    if (!completed) {
      throw new ApiError(404, "Completed challenge not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          completed,
          "Completed challenge deleted successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to delete completed challenge: " + error.message
    );
  }
});

export {
  getAllCompletedChallenges,
  getCompletedChallengeById,
  createCompletedChallenge,
  updateCompletedChallenge,
  deleteCompletedChallenge,
};
