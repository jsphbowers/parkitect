import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

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

  async editTrip(tripId, tripEdits, userId) {
    const trip = await this.getTripById(tripId)
    if (trip.isArchived) {
      throw new BadRequest('You cannot edit an archived trip')
    }
    if (trip.creatorId != userId) {
      throw new Forbidden("You are not authorized to edit another user's trip")
    }
    trip.name = tripEdits.name ? tripEdits.name : trip.name
    trip.description = tripEdits.description ? tripEdits.description : trip.description
    trip.coverImg = tripEdits.coverImg ? tripEdits.coverImg : trip.coverImg
    await trip.save()
    return trip
  }

  async toggleArchiveTrip(tripId, userId) {
    const trip = await this.getTripById(tripId)
    if (trip.creatorId != userId) {
      throw new Forbidden("You are not authorized to edit another user's trip")
    }
    trip.isArchived = !trip.isArchived
    await trip.save()
    return trip
  }


}

export const tripsService = new TripsService()