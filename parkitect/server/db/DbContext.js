import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TripThingToDoSchema } from "../models/TripThingToDo.js";
import { TripSchema } from "../models/Trip.js";
import { TripParkSchema } from "../models/TripPark.js";
import { TripGoerSchema } from "../models/TripGoer.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  TripThingsToDo = mongoose.model('TripThingToDo', TripThingToDoSchema);
  Trips = mongoose.model('Trip', TripSchema);
  TripParks = mongoose.model('TripPark', TripParkSchema);
  TripGoers = mongoose.model('TripGoer', TripGoerSchema)
}

export const dbContext = new DbContext()
