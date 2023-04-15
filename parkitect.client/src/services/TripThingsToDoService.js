import { AppState } from "../AppState.js"
import { ThingToDo } from "../models/ThingToDo.js"
import { TripThingToDo } from "../models/TripThingToDo.js"
import { logger } from "../utils/Logger.js"
import { api, npsApi } from "./AxiosService.js"

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
    AppState.dictionary = dictionary
  }

  async setActiveThingToDo(nativeThingToDoId) {
    const res = await npsApi.get(`/thingstodo?id=${nativeThingToDoId}`)
    AppState.activeThingToDo = new ThingToDo(res.data.data[0])
  }

}

export const tripThingsToDoService = new TripThingsToDoService()