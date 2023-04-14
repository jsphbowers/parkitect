import { Schema } from "mongoose";

export const TripParkSchema = new Schema({
  nativeParkId: { type: String, required: true },
  fullName: { type: String, required: true },
  tripId: { type: Schema.Types.ObjectId, required: true, ref: 'Trip' },
  image: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } }
)