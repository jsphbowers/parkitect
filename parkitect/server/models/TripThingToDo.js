import mongoose from "mongoose";

const Schema = mongoose.Schema

export const TripThingToDoSchema = new Schema({
  nativeThingToDoId: { type: String, required: true, maxLength: 500 },
  tripId: { type: Schema.Types.ObjectId, required: true, ref: "Trip" },
  title: { type: String, required: true, minLength: 0, maxLength: 100 },
  activities: { type: Array, max: 500 },
  parkCode: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } }
)
