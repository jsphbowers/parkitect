import mongoose from "mongoose";

const Schema = mongoose.Schema

export const TripSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  name: { type: String, required: true, minLength: 0, maxLength: 200 },
  description: { type: String, maxLength: 1000 },
  coverImg: { type: String, maxLength: 1000 },
  joinCode: { type: String, required: true, minLength: 6, maxLength: 6 },
  isArchived: { type: Boolean, required: true, default: false }
}, { timestamps: true, toJSON: { virtuals: true } })