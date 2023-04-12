import { Schema } from "mongoose";

export const TripParkSchema = new Schema({
  nativeParkId: { type: String, required: true },
  fullName: { type: String, required: true },
  tripId: { type: Schema.Types.ObjectId, required: true, ref: 'Trip' }
}, { timestamps: true, toJSON: { virtuals: true } }
)