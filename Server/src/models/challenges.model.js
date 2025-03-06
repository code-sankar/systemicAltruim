import mongoose, {Schema} from "mongoose";

const ChallengeSchema = new Schema(
  {
    logo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    fundingAmount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    }, // Determines if the challenge is visible to users
  },
  { timestamps: true }
);

export const Challenge = mongoose.model("Challenge", ChallengeSchema);
