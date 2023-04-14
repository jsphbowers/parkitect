import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

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

  async deleteTripPark(tripParkId, userId, tripId) {
    const trip = await dbContext.Trips.findById(tripId)
    if (!trip) {
      throw new BadRequest('Invalid tripId')
    }
    if (trip.creatorId != userId) {
      throw new Forbidden("You are not authorized to edit another user's trip")
    }
    if (trip.isArchived == true) {
      throw new BadRequest("You cannot edit an archived trip")
    }
    const tripPark = await dbContext.TripParks.findById(tripParkId)
    if (!tripPark) {
      throw new BadRequest('Invalid tripParkId')
    }
    tripPark.remove()
    return `${tripPark.fullName} has been removed from ${trip.name}`
  }
}

export const tripParksService = new TripParksService()