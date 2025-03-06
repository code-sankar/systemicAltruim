import mongoose, { Schema } from "mongoose";


const CompletedSchema = new Schema(
  {
    challengerName: { type: String, required: true },
    personName: { type: String, required: true },
    position: { type: String, required: true },
    linkedinProfile: { type: String, required: true },
    description: { type: String, required: true },
    fundingAmount: { type: Number, required: true },
    image: { type: String }, // URL or path to the image for the completed challenge
  },
  { timestamps: true }
);

export const Completed = mongoose.model("Completed", CompletedSchema);
