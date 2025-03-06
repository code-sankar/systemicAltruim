import mongoose, { Schema } from "mongoose";


const FounderSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  linkedinProfile: { type: String, required: true },
  image: { type: String } 
}, { timestamps: true });

export const Founder = mongoose.model('Founder', FounderSchema);