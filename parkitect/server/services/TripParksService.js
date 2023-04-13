import { dbContext } from "../db/DbContext.js"

class TripParksService {
  async addTripPark(tripParkData) {
    const tripPark = await dbContext.TripParks.create(tripParkData)
    return tripPark
  }

  async getTripParks(tripId) {
    const tripParks = await dbContext.TripParks.find({ tripId })
    return tripParks
  }
}

export const tripParksService = new TripParksService()