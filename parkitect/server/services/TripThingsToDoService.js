import { dbContext } from "../db/DbContext.js"

class TripThingsToDoService {
  async addTripThingToDo(tripThingToDoData) {
    const tripThingToDo = await dbContext.TripThingsToDo.create(tripThingToDoData)
    return tripThingToDo
  }

  async getTripThingsToDo(tripId) {
    const tripThingsToDo = await dbContext.TripThingsToDo.find({ tripId })
    return tripThingsToDo
  }

}

export const tripThingsToDoService = new TripThingsToDoService()