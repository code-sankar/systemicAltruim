import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Founder } from "../models/founder.model.js";
import mongoose, { isValidObjectId } from "mongoose";

const getAllFounders = asyncHandler(async (req, res) => {
  try {
    const founders = await Founder.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json(new ApiResponse(200, founders, "Founders retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to fetch founders: " + error.message);
  }
});

const getFounderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid founder ID");
  }

  try {
    const founder = await Founder.findById(id);

    if (!founder) {
      throw new ApiError(404, "Founder not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, founder, "Founder details retrieved successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Error fetching founder: " + error.message);
  }
});

const createFounder = asyncHandler(async (req, res) => {
  const { name, position, description, linkedinProfile, image } = req.body;

  // Validate required fields
  if (!name?.trim() || !description?.trim()) {
    throw new ApiError(400, "Name and description are required fields");
  }

  try {
    const founder = await Founder.create({
      name,
      position: position || "",
      description,
      linkedinProfile: linkedinProfile || "",
      image: image || "",
    });

    return res
      .status(201)
      .json(new ApiResponse(201, founder, "Founder created successfully"));
  } catch (error) {
    throw new ApiError(400, "Failed to create founder: " + error.message);
  }
});

const updateFounder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid founder ID");
  }

  try {
    const founder = await Founder.findById(id);

    if (!founder) {
      throw new ApiError(404, "Founder not found");
    }

    // Update fields if provided
    if (updates.name !== undefined) founder.name = updates.name;
    if (updates.position !== undefined) founder.position = updates.position;
    if (updates.description !== undefined)
      founder.description = updates.description;
    if (updates.linkedinProfile !== undefined)
      founder.linkedinProfile = updates.linkedinProfile;
    if (updates.image !== undefined) founder.image = updates.image;

    const updatedFounder = await founder.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedFounder, "Founder updated successfully")
      );
  } catch (error) {
    throw new ApiError(400, "Failed to update founder: " + error.message);
  }
});

const deleteFounder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid founder ID");
  }

  try {
    const founder = await Founder.findByIdAndDelete(id);

    if (!founder) {
      throw new ApiError(404, "Founder not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, founder, "Founder deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to delete founder: " + error.message);
  }
});

export {
  getAllFounders,
  getFounderById,
  createFounder,
  updateFounder,
  deleteFounder,
};
