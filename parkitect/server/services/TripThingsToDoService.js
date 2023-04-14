import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TripThingsToDoService {
  async addTripThingToDo(tripThingToDoData) {
    const trip = await dbContext.Trips.findById(tripThingToDoData.tripId)
    if (trip.isArchived == true) {
      throw new BadRequest('You cannot alter a trip that has been archived.')
    }
    const tripThingToDo = await dbContext.TripThingsToDo.create(tripThingToDoData)
    return tripThingToDo
  }

  async getTripThingsToDo(tripId) {
    const tripThingsToDo = await dbContext.TripThingsToDo.find({ tripId })
    return tripThingsToDo
  }

  async deleteTripThingToDo(tripId, userId, tripThingToDoId) {
    const trip = await dbContext.Trips.findById(tripId)
    if (!trip) {
      throw new BadRequest("Inavlid tripId")
    }
    if (trip.creatorId != userId) {
      throw new Forbidden("You are not authorized to edit another user's trip")
    }
    if (trip.isArchived == true) {
      throw new BadRequest("You cannot edit an archived trip")
    }
    const tripThingToDo = await dbContext.TripThingsToDo.findById(tripThingToDoId)
    if (!tripThingToDo) {
      throw new BadRequest("Invalid tripThingToDoId")
    }
    tripThingToDo.remove()
    return `${tripThingToDo.title} has been removed from ${trip.name}`
  }

}

export const tripThingsToDoService = new TripThingsToDoService()