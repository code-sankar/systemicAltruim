import mongoose, { Schema } from "mongoose";

const SubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
