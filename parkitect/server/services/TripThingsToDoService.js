import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

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

}

export const tripThingsToDoService = new TripThingsToDoService()