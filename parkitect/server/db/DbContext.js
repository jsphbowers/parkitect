import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TripThingToDoSchema } from "../models/TripThingToDo.js";
import { TripSchema } from "../models/Trip.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  TripThingToDo = mongoose.model('TripThingToDo', TripThingToDoSchema);
  Trips = mongoose.model('Trip', TripSchema);
}

export const dbContext = new DbContext()
