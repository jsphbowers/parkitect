import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TripParksService {
  async addTripPark(tripParkData) {
    const trip = await dbContext.Trips.findById(tripParkData.tripId)
    if (trip.isArchived == true) {
      throw new BadRequest('You cannot alter a trip that has been archived.')
    }
    const tripPark = await dbContext.TripParks.create(tripParkData)
    return tripPark
  }

  async getTripParks(tripId) {
    const tripParks = await dbContext.TripParks.find({ tripId })
    return tripParks
  }
}

export const tripParksService = new TripParksService()