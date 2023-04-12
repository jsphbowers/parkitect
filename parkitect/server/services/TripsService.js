import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TripsService {

  async createTrip(tripData) {
    const trip = await dbContext.Trips.create(tripData)
    return trip
  }

  async getTripById(tripId) {
    const trip = await dbContext.Trips.findById(tripId)
    if (!trip) {
      throw new BadRequest('Invalid tripId')
    }
    return trip
  }

}

export const tripsService = new TripsService()