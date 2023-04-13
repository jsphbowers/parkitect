import { Schema } from "mongoose";

export const TripGoerSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  tripId: { type: Schema.Types.ObjectId, required: true, ref: "Trip" },
  isApproved: { type: Boolean, required: true, default: true },
}, { timestamps: true, toJSON: { virtuals: true } })

TripGoerSchema.virtual("trip", {
  localField: "tripId",
  ref: "Trip",
  foreignField: "_id",
  justOne: true
})

TripGoerSchema.virtual("account", {
  localField: "accountId",
  ref: "Account",
  foreignField: "_id",
  justOne: true
})