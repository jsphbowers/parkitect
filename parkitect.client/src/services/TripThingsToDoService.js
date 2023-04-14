import { AppState } from "../AppState.js"
import { TripThingToDo } from "../models/TripThingToDo.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TripThingsToDoService {

  async getTripThingsToDoByTripId(tripId) {
    const res = await api.get(`/trips/${tripId}/tripThingsToDo`)
    AppState.tripThingsToDo = res.data.map(ttd => new TripThingToDo(ttd))
    const dictionary = {}
    for (let i = 0; i < AppState.tripThingsToDo.length; i++) {
      if (!dictionary[AppState.tripThingsToDo[i].parkCode]) {
        dictionary[AppState.tripThingsToDo[i].parkCode] = []
        dictionary[AppState.tripThingsToDo[i].parkCode].push(AppState.tripThingsToDo[i])
      } else {
        dictionary[AppState.tripThingsToDo[i].parkCode].push(AppState.tripThingsToDo[i])
      }
    }
    logger.log('[APPSTATE TRIPTHINGSTODO]', AppState.tripThingsToDo)
    logger.log('[DICTIONARY]', dictionary)
    AppState.dictionary = dictionary
  }

}

export const tripThingsToDoService = new TripThingsToDoService()