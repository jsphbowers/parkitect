import mongoose from "mongoose";

const Schema = mongoose.Schema

export const TripSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  name: { type: String, required: true, minLength: 0, maxLength: 25 },
  description: { type: String, maxLength: 1000 },
  coverImg: { type: String, maxLength: 1000 },
  joinCode: { type: String, required: true, minLength: 6, maxLength: 6 },
  isArchived: { type: Boolean, required: true, default: false },
  start: { type: Date, required: true, },
  end: { type: Date, required: true },
  allDay: { type: Boolean, required: true, default: true },
  display: { type: String, required: true, default: 'auto' }
}, { timestamps: true, toJSON: { virtuals: true } })

TripSchema.virtual("tripCreator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id",
  justOne: true
})