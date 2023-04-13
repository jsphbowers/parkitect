import { dbContext } from "../db/DbContext.js"

class TripThingsToDoService {
  async addTripThingToDo(tripThingToDoData) {
    const tripThingToDo = await dbContext.TripThingsToDo.create(tripThingToDoData)
    return tripThingToDo
  }

}

export const tripThingsToDoService = new TripThingsToDoService()