import { AppState } from "../AppState.js"
import { TripThingToDo } from "../models/TripThingToDo.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TripThingsToDoService {

  async getTripThingsToDoByTripId(tripId) {
    const res = await api.get(`/trips/${tripId}/tripThingsToDo`)
    AppState.tripThingsToDo = res.data.map(ttd => new TripThingToDo(ttd))
    logger.log('[APPSTATE TRIPTHINGSTODO]', AppState.tripThingsToDo)
  }

}

export const tripThingsToDoService = new TripThingsToDoService()